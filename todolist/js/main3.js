/*1.加载页面
*/
var doc_todolist=document.getElementById("todolist");//未做的
var doc_donelist=document.getElementById("donelist");//已完成
var doc_todocount=document.getElementById("todocount");//未完成计数
var doc_donecount=document.getElementById("donecount");//已完成计数
fu
window.load=my_load();
//加载页面
function my_load(){
	if (localStorage.getItem('data')!=null) {//通过key获取value
			var task_array=JSON.parse(localStorage.getItem('data')); //假设localStorage里面已经存在值
			var noString='';//未完成
			var yesString='';//完成
			var todocount=0;//未完成计数
			var donecount=0;//已完成计数
			for(var i=0;i<task_array.length;i++){
					if (task_array[i].status=='no'){
						noString+="<li draggable='true'><input type='checkbox' onchange='change("+i+",\"no\")' />"
				+"<p id='p-"+i+"' onclick='edit("+i+")'>"+task_array[i].name+"</p>"
				+"<a href='javascript:remove("+i+")'>-</a></li>";
				todocount++;//计数（未完成）
					}else{
						yesString+="<li draggable='true'><input type='checkbox' onchange='change("+i+",\"yes\")' checked='checked' />"
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
/*//拖拽
function allowdrop(ev){
	ev.preventDefault();//阻止默认事件发生
}
function drag(ev){
	ev.dataTransfer.setData("li", ev.target.id);
}
function drop(ev){
	ev.preventDefault();
	var data=ev.dataTransfer.getData("li");
	ev.target.appendChild(document.get)
}*/
//enter输入添加新任务
var input_name=document.getElementById("input_name");//获取输入框
input_name.addEventListener("keydown",input_add,false);//false在冒泡阶段执行  默认传一个默认值给函数input_aad()

function input_add(event){
	if (event.keyCode=='13') {//event对象
		   var task =new Task();//new一个新的任务
		   task.status='no';//新任务的转态值（默认值）
		   task.name=input_name.value;//新任务的名字
				var add_newtask=JSON.parse(localStorage.getItem('data'));//获取localStorage的数据,并将获取的json字符串转为数组
				if (add_newtask!=null) {
					add_newtask.unshift(task);//在获取到数据好（数组）末尾添加一个对象
				}else{
					add_newtask=[task];
				}
				
				localStorage.setItem('data',JSON.stringify(add_newtask));//在将这个数组转换成json格式，以（key,value）的方式存入localStorage
				my_load();//调用一次加载页面的方法
	}
}
//task对象
function Task(name){
	status='';
	name='';
  /*debugger
  //静态变量(公共所有)
  Task.STATUS_TODO = 'no';
	Task.STATUS_DONE = 'yes';
//实例变量（每个对象拥有不一样的属性）
  this.name=name;//传进来的name赋给task对象
  this.status=Task.STATUS_TODO;*/
	
}
//修改状态(传入参数（下标，状态）)
function change(i,status){
	var change_array=JSON.parse(localStorage.getItem('data'));
	if (change_array[i].status=='no'){
		change_array[i].status='yes';
	}else{
		change_array[i].status='no';
	}
	localStorage.setItem('data',JSON.stringify(change_array));
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
function remove(i){
 var remove_array=JSON.parse(localStorage.getItem('data'));
 remove_array.splice(i,1);
 localStorage.setItem('data',JSON.stringify(remove_array));
	my_load();
}
function clear(){
	localStorage.clear();//清空所有数据
	my_load();//重新加载
}