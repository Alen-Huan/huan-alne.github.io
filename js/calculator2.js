window.onload=function(){
var btn_txt=document.getElementsByTagName('input');//获取清空按钮和回退按钮
for (var i = btn_txt.length-1; i >= 0; i--) {
	btn_txt[i].addEventListener('click', function click(){
		out_click(this.value);
	 },false);
	}
}
var result_txt=document.getElementsByTagName('textarea')[0];//获取屏幕的值,只有一个
var show_history=document.getElementById("box");
var leftNum='';//左加数
var rightNum='';//加数右
var operation='';//符号 
var sum=0;
//点击事件
function out_click(value){
	if (value=='AC') {
		leftNum='';
		rightNum='';
		operation='';
		result_txt.innerHTML='';//清空
		show_history.innerHTML='';
	}
	else if (value=='DEL'){
		del();//回退
	}
	else if (value=='=') {
		equal();//求和
		//show_history.innerHTML=leftNum+operation+rightNum+"="+result_txt.innerHTML;
		//document.write(num);
		//document.write("<p>"+'leftNum'+"operation"+ 'rightNum'+"="+sum+"</p>");
		//showhistory();
	}
	else if (value=='+' || value=='-' || value=='*' || value=='/') {
		operation+=value;//操作符
		result_txt.innerHTML+=value;
	}
	else if(operation==''){
		if(leftNum=='' && value=='.')
			return;
			leftNum+=value;//左加数
			result_txt.innerHTML=result_txt.innerHTML+value;
	}
	else{
			if(rightNum=='' && value=='.')
			return;
			rightNum+=value;//右加数
			result_txt.innerHTML=result_txt.innerHTML+value;
		}
}
//当为del时就进行回退
function del(){
		if(rightNum!=''){
				//substring（开始位置，结束位置的下一个位置）
			//substr(开始位置，截取长度)
			rightNum=rightNum.substr(0,rightNum.length-1);
			result_txt.innerHTML=result_txt.innerHTML.substr(0, result_txt.innerHTML.length-1);
		}else if(operation!=''){
			operation='';
			result_txt.innerHTML=result_txt.innerHTML.substr(0, result_txt.innerHTML.length-1);
		}else if(leftNum!=''){
			leftNum=leftNum.substr(0,leftNum.length-1);
			result_txt.innerHTML=result_txt.innerHTML.substr(0, result_txt.innerHTML.length-1);
		}
	//result_txt.innerHTML='';
	/*result_txt.innerHTML=result_txt.innerHTML.substring(0, result_txt.innerHTML.length-1);
	if(rightNum!=''){
			rightNum=rightNum.substring(0, rightNum.length-1);
		}
		else if(operation!=''){
			operation='';
		}
		else{
			leftNum=leftNum.substring(0, leftNum.length-1);
		}*/
}

//当为等号时就进行判断操作符号进行计算0
function equal(){
	switch (operation) {
			case "+":
			sum=parseInt(leftNum)+parseInt(rightNum);//字符串强转为数字
			break;
			case "-":
			sum=parseInt(leftNum)-parseInt(rightNum);
			break;
			case "*":
			sum=parseInt(leftNum)*parseInt(rightNum);
			break;
			case "/":
			sum=parseInt(leftNum)/parseInt(rightNum);
			break;
	}
	result_txt.innerHTML=sum;//显示在屏幕上
	showhistory();//打印历史
	leftNum=sum;//结果赋给左边
	rightNum='';//右边清空
	operation='';
}
/*function addelementp(){
	var para=document.createElement("p");
	var node=document.createTextNode("111");
	para.appendChild(node);
	show_history.appendChild(para);
}*/
function showhistory(){
	if (result_txt.innerHTML!='') {
		switch (operation) {
			case "+":
			show_history.innerHTML+="<p>"+leftNum+operation+rightNum+"="+result_txt.innerHTML+"</p>";
			break;
			case "-":
			show_history.innerHTML+="<p>"+leftNum+operation+rightNum+"="+result_txt.innerHTML+"</p>"
			break;
			case "*":
			show_history.innerHTML+="<p>"+leftNum+operation+rightNum+"="+result_txt.innerHTML+"</p>"
			break;
			case "/":
			show_history.innerHTML+="<p>"+leftNum+operation+rightNum+"="+result_txt.innerHTML+"</p>"
			break;
		}
	}
}