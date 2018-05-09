window.load=my_load();//加载页面（进入页面加载一次）
//加载页面方法
function my_load(){
	var doc_todolist=document.getElementById('todolist');
	var doc_donelist=document.getElementById('donelist');
	var doc_todocount=document.getElementById('todocount');
	var doc_donecount=document.getElementById('donecount');
	var todocount=0;//计数器
	var donecount=0;//计数器
	var data=JSON.parse(localStorage.getItem("data"));//获取到浏览器里面的数据（转成json格式的数据）

	var yesString='';//完成
	var noString='';//未完成
	if(data!=null){
		//循环遍历插入li（p,a）标签生成内容
		for (var i = data.length - 1; i >= 0; i--) {
			if (data[i].status=='no') {
				noString+="<li draggable='true'><input type='checkbox' onchange='change("+i+",\"no\")' />"
				+"<p id='p-"+i+"' onclick='edit("+i+")'>"+data[i].name+"</p>"
				+"<a href='javascript:remove("+i+")'>-</a></li>";
				todocount++;
			}else{
				yesString+="<li draggable='true'><input type='checkbox' onchange='change("+i+",\"yes\")' checked='checked' />"
				+"<p id='p-"+i+"' onclick='edit("+i+")'>"+data[i].name+"</p>"
				+"<a href='javascript:remove("+i+")'>-</a></li>";
				donecount++;
			}
		}
		//将数据显示在页面
		doc_todocount.innerHTML=todocount; 
		todolist.innerHTML=noString;
		doc_donecount.innerHTML=donecount;
		donelist.innerHTML=yesString;
	}
}


var title=document.getElementById('title');
title.addEventListener("keydown",add,false);
//添加键盘enter事件
function add(event){
	if (event.keyCode == '13') {
		  var task=new Task();
		  task.name=title.value;
		  task.status='no';
		  var data= JSON.parse(localStorage.getItem('data'));
			if(data!=null){
		  	data.push(task)
			}else{
				data=new Array(task);
			}
			localStorage.setItem('data',JSON.stringify(data));

			my_load();
	}
}
//点击p标签应该做的响应
function edit(i){
	var p = document.getElementById("p-"+i);
	var name = p.innerHTML;
	p.innerHTML="<input id='input-"+i+"' value='"+name+"' />";
	var input = document.getElementById("input-"+i);
	input.setSelectionRange(0,input.value.length);
	input.focus();
	input.onblur = function(){
		if(input.value.length == 0){
			p.innerHTML = name;
			alert("内容不能为空");
		}
		else{
			var data= JSON.parse(localStorage.getItem('data'));
			data[i].name=input.value;

			localStorage.setItem('data',JSON.stringify(data));

			my_load();
			}
		}
}
//移除li标签
function remove(i){
	var data= JSON.parse(localStorage.getItem('data'));
	data.splice(i,1);

	localStorage.setItem('data',JSON.stringify(data));

	my_load();
}
//改变p标签
function change(i,char){
	var data= JSON.parse(localStorage.getItem('data'));
	if (char=='yes') {
		data[i].status='no';
	}else{
		data[i].status='yes';
	}
}
//Task对象
function Task(){
	status:'';
	name:'';
}
//清空所有的东西并且重新加载
/*function clear(){
	localStorage.clear();
	my_load();
}*/