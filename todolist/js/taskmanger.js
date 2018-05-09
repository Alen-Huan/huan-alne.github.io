function TaskManager(){
	//增
	this.add=function(task){
			var add_newtask=JSON.parse(localStorage.getItem('data'));//取数据并将数据转换成json格式
			if (add_newtask!=null) {
					add_newtask.unshift(task);//在获取到数据好（数组）添加一个对象
				}else{
					add_newtask=[task];
				}
			localStorage.setItem('data',JSON.stringify(add_newtask));// 存数据
	}
	//删
	this.delete=function(i){
		var remove_array=JSON.parse(localStorage.getItem('data'));
		remove_array.splice(i,1);//删除一条数据
		localStorage.setItem('data',JSON.stringify(remove_array));
	}
	//改
	this.update=function(i,status){
		var change_array=JSON.parse(localStorage.getItem('data'));
		if (change_array[i].status=='no') {
			change_array[i].status='yes';
		}else{
			change_array[i].status='no';
		}
		localStorage.setItem('data',JSON.stringify(change_array));
	}
	//查
	this.query=function(){
		if (localStorage.getItem('data')!=null) {//通过key获取value
			var task_array=JSON.parse(localStorage.getItem('data')); //假设localStorage里面已经存在值
			return task_array;
		}else{
			return [];//返回空数组
		}
  }
  //清空所有
  this.clear_localStorage=function(){
  	localStorage.clear();//清空所有数据
  }
} 

//静态方法
TaskManager.getInstance=function(){
		var instance;
		if (!instance) {
			instance = new TaskManager();
		}
		return instance;
}
