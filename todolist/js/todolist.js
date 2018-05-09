
var doc_todolist=document.getElementById("todolist");//未做的
var doc_donelist=document.getElementById("donelist");//已完成
var doc_todocount=document.getElementById("todocount");//未完成计数
var doc_donecount=document.getElementById("donecount");//已完成计数

//加载页面
window.load=my_load();
//Task类
function Task(name){
	 debugger
  //静态变量(公共所有)
  Task.STATUS_TODO = 'no';
	Task.STATUS_DONE = 'yes';
//实例变量（每个对象拥有不一样的属性）
  this.name=name;//传进来的name赋给task的name
  this.status=Task.STATUS_TODO;//初始状态为no
}
//记载页面事件
function my_load(){
	var task_array=TaskManager.getInstance().query();//通过taskmanager调用localstorage
	if (task_array!=null) {
			var noString='';//未完成
			var yesString='';//完成
			var todocount=0;//未完成计数
			var donecount=0;//已完成计数
			for(var i=0;i<task_array.length;i++){
					if (task_array[i].status=='no'){
						noString+="<li draggable='true' id='li-"+i+"' ondragstart='drag(event)' ><input type='checkbox' onchange='change("+i+",\"no\")' />"
				+"<p id='p-"+i+"' onclick='edit("+i+")'>"+task_array[i].name+"</p>"
				+"<a href='javascript:remove("+i+")'>-</a></li>";
				todocount++;//计数（未完成）
					}else{
						yesString+="<li draggable='true' ondragstart='drag(event)'  id='li-"+i+"'><input type='checkbox' onchange='change("+i+",\"yes\")' checked='checked' />"
				+"<p id='p-"+i+"' onclick='edit("+i+")'>"+task_array[i].name+"</p>"
				+"<a href='javascript:remove("+i+")'>-</a></li>";
				donecount++;//计数（已经完成）
					}
			}
			doc_todolist.innerHTML=noString;//未完成
			doc_todocount.innerHTML=todocount;//计数
			doc_donelist.innerHTML=yesString;//已完成
			doc_donecount.innerHTML=donecount;//计数
	}else{
		doc_todolist.innerHTML='';
		doc_todocount.innerHTML=0;
		doc_donelist.innerHTML='';
		doc_donecount.innerHTML=0;
	}
}
//规定将被拖地数据放在何处，默认地无法将数据放在其他元素中
function allowDrop(event){
	event.preventDefault();//阻止默认事件发生
}
//拖拽规定了被拖数据的值（数据类型，可拖动元素的id）
function drag(event){
	event.dataTransfer.setData("id", event.target.id);
}
/*调用 preventDefault() 来避免浏览器对数据的默认处理（drop 事件的默认行为是以链接形式打开）
通过 dataTransfer.getData("Text") 方法获得被拖的数据。该方法将返回在 setData() 方法中设置为相同类型的任何数据。
被拖数据是被拖元素的 id ("drag1")
把被拖元素追加到放置元素（目标元素）中*/
function drop(event,can){
	event.preventDefault();
	var li=document.getElementById(event.dataTransfer.getData("id"));
	var checkbox=li.getElementsByTagName('input')[0];
	if (checkbox.checked) {
		checkbox.removeAttribute('checked');//移除属性既不设置checked
	}else{
		checkbox.setAttribute('checked','checked');//设置checked属性
	}
	can.appendChild(li);//追加到ul标签里面
	/*var id=li.getAttribute("id");
	//var status=can.children[0].children[0].status;
	event.addEventListener()
	change(id,status);*/
}
function function_name (argument) {
	// body... 
}
//获取键盘输入事件
var input_name=document.getElementById("input_name");//获取输入框
input_name.addEventListener("keydown",input_add,false);//false在冒泡阶段执行
function input_add(event){
	 if (event.keyCode=='13') {//event对象
	 	 var task =new Task(input_name.value);//new一个新的任务
	 	 var add_newtask=TaskManager.getInstance().add(task);
	 }
}
//修改状态
function change(i,status){
	var change_array=TaskManager.getInstance().update(i,status);
	my_load();
}
//编辑名字
function edit(i){
	var p_name=document.getElementById('p-'+i);
	p_name.innerHTML="<input id='input-"+i+"' value='"+p_name.innerHTML+"'/>";//将p替换成input标签
	var input_name=document.getElementById('input-'+i);
	input_name.setSelectionRange(0,input_name.value.length);//全选整个input标签的value值
	input_name.focus();//获得焦点
	input_name.onblur=function(){//失去焦点
	var edit_array=JSON.parse(localStorage.getItem('data'));
	edit_array[i].name=input_name.value;
	localStorage.setItem('data',JSON.stringify(edit_array));
	my_load();
	}
}
//删除数据
function remove(i){
 var remove_array=TaskManager.getInstance().delete(i);
 my_load();
}
//
function clear(){
	TaskManager.getInstance().clear_localStorage();
	my_load();//重新加载
}