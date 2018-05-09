/*计算器步骤：1.思考在页面加载需要做什么
2.获取所有的按钮进行操作
3.判断用户输入的值的value值
4.*/
//网页加载时给按钮添加点击事件
window.onload=function(){
	
	var element_array=document.getElementsByTagName('input');
	for (var i = element_array.length - 1; i >= 0; i--) {
		element_array[i].addEventListener('click', function click(){
			out_click(this.value);
		} , false);
	}

}

var doc_text=document.getElementsByTagName('textarea')[0];

var leftNum='';
var rightNum='';
var operater='';
var sum=0;

function out_click(value){
	if (value=='AC'){
		leftNum='';
		rightNum='';
		operater='';
		doc_text.innerHTML='';
	}
	else if (value=='DEL'){
		del();
	}
	else if(value=='='){
		equals();
	}
	else if (value=='+' || value=='-' || value=='*' || value=='/') {
		operater+=value;
		doc_text.innerHTML=doc_text.innerHTML+value;
	}
	else if(operater==''){
		if(leftNum=='' && value=='.')
			return;
		leftNum+=value;
		doc_text.innerHTML=doc_text.innerHTML+value;
	}
	else{
		if(rightNum=='' && value=='.')
			return;
		rightNum+=value;
		doc_text.innerHTML=doc_text.innerHTML+value;
	}
}

function equals(){
	if(operater=='+'){
		sum=parseInt(leftNum)+parseInt(rightNum);
	}
	else if(operater=='-'){
		sum=parseInt(leftNum)-parseInt(rightNum);
	}
	else if(operater=='*'){
		sum=parseInt(leftNum)*parseInt(rightNum);
	}
	else{
		sum=parseInt(leftNum)/parseInt(rightNum);
	}
	doc_text.innerHTML=sum;
	/*leftNum=sum;
	rightNum='';
	operater='';*/
}

function del(){
	doc_text.innerHTML=doc_text.innerHTML.substring(0, doc_text.innerHTML.length-1);
	if(rightNum!=''){
			rightNum=rightNum.substring(0, rightNum.length-1);
		}
		else if(operater!=''){
			operater='';
		}
		else{
			leftNum=leftNum.substring(0, leftNum.length-1);
		}
}




