var interval = 1500;
var box = document.getElementById("box");
var screen = box.children[0];
var ul = screen.children[0];
var ol = screen.children[1];
//获取箭头的容器
var arr = box.children[1];
var arrLeft = arr.children[0];
var arrRight = arr.children[1];
// 获取图片宽度
// offsetWidth属性可以返回对象的padding+border+width属性值之和，style.width返回值就是定义的width属性值
var imgWidth = screen.offsetWidth;
console.log(imgWidth);

//1.动态生成ol li
var count = ul.children.length;
var i = 0;
for (; i < count; i++) {
    var li = document.createElement('li');
    ol.appendChild(li);
    //设置内容
    setInnerText(li, i + 1);
    // 3.点击序号切换图片

    // li记录自己的索引
    li.index = i;
    // 3.1给序号注册事件
    li.onclick = liClick;
    //3.4第一张默认选中
    if (i === 0) {
        li.className = "current";
    }
}

function liClick() {

    //3.2让图片以动画方式移动   this指向li
    animate(ul, -this.index * imgWidth);
    //3.3让所有的序号取消高亮显示，选中的高亮显示
    for (i = 0; i < count; i++) {
        li = ol.children[i];
        li.className = "";
    }
    this.className = "current";
    index = this.index;
}

//鼠标滑过
box.onmouseover = function () {
    arr.style.display = 'block';
    //停止定时器
    clearInterval(timerId);
}
box.onmouseout = function () {
    arr.style.display = 'none';
    timerId = setInterval(function () {
        arrRight.click();
    }, interval);
}


// 4.点击箭头实现上一张和下一张功能
//默认是第一张图片的索引
var index = 0;
//下一张
arrRight.onclick = function () {
    if (index === count) {
        index = 0;
        ul.style.left = '0px';
    }
    index++;
    if (index < count) {
        //动画移动
        //animate(ul, -index * imgWidth);
        //让对应的序号高亮显示
        ol.children[index].click();
    } else {
        //以动画的方式到克隆的第一张图片中
        animate(ul, -index * imgWidth);
        //3.3让所有的序号取消高亮显示，选中的高亮显示
        for (i = 0; i < count; i++) {
            li = ol.children[i];
            li.className = "";
        }
        ol.children[0].className = "current";
    }
}
//上一张
arrLeft.onclick = function () {
    if (index === 0) {
        index = count;
        ul.style.left = -index * imgWidth + "px";
    }
    index--;
    //动画移动
    //让对应的序号高亮显示
    ol.children[index].click();
}
//4.3无缝滚动
//复制一个li，并且添加到ul的最后
//true 会复制子元素
//false 不会复制子元素
var cloneLi = ul.children[0].cloneNode(true);
ul.appendChild(cloneLi);

//5.实现自动播放
var timerId = setInterval(function () {
    arrRight.click();
}, interval);