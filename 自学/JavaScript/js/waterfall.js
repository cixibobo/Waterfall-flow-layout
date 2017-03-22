window.onload=function(){
    waterfall('main','box');
    var dataInt={
      'data': [
      {
          'src': '1.jpg'
      },
      {
          'src': '2.jpg'
      },
      {
          'src': '3.jpg'
      },
      {
          'src': '4.jpg'
      },
      {
          'src': '5.jpg'
      },
      {
          'src': '6.jpg'
      },
      {
          'src': '7.jpg'
      },
      {
          'src': '8.jpg'
      },
      {
          'src': '9.jpg'
      },
      {
          'src': '10.jpg'
      }
      ]
  }
    //先判断是否满足scroll要求
    window.onscroll=function(){
        if(checkIsScroll()){
            var oParent = document.getElementById('main');
            for(var i=0;i<dataInt.data.length;i++){
                var oBox = document.createElement('div');
                oBox.className='box';
                var oPic = document.createElement('div');
                oPic.className='pic';
                var oImg = document.createElement('img');
                oImg.src="./images/"+dataInt.data[i].src;
                oPic.appendChild(oImg);
                oBox.appendChild(oPic);
                oParent.appendChild(oBox);
            }
            waterfall('main','box');
        }
    } 
    

}
/**
 * 瀑布式布局，元素等宽，不等高;
 * 取第一行高度最小的，把第二行的元素放在最小的下面
 * @param  {[type]} parent [description]
 * @param  {[type]} aid    [description]
 * @return {[type]}        [description]
 */
 function waterfall(parent,aid){
    var oparent = document.getElementById(parent);     //父级对象
    var obox = document.getElementsByClassName(aid);   //获取每个单列模块
    var oboxW = obox[0].offsetWidth;  //一个块的宽度
    var num = document.documentElement.clientWidth/oboxW //屏幕的宽度/每个宽度
    //取最接近num的整数,math.floor
    num = Math.floor(num);
    oparent.style.cssText="width:"+oboxW*num+"px;margin:0 auto;" // 设置父元素在显示器中居中
    var oboxArr=[]; //用来存储，每列中的所有块框相加的高度；
    for(var i=0;i<obox.length;i++){
        var boxH=obox[i].offsetHeight;
        if(i<num){
           oboxArr[i]= boxH;
           //第一行中的num个块框，放入到oboxArr中
       }else{
            var minH = Math.min.apply(null,oboxArr);//获取数组中最低的高度
            var minHIndex=getminHIndex(oboxArr,minH);//获取数组中最低的高度的index
            obox[i].style.position="absolute"; //设置绝对定位
            obox[i].style.top=minH+"px";
            obox[i].style.left=obox[minHIndex].offsetLeft+"px";
            oboxArr[minHIndex]=oboxArr[minHIndex]+obox[i].offsetHeight;
           // console.log(oboxArr);
           // break; 重复循环oboxArr中最小的值,最小的值会持续变化；
            //oboxArr[minHIndex]+=obox[i].offsetHeight;//更新添加了块框后的列高
        }//数组 最小高元素的高 + 添加上的abox[i]块框高

    }
}
/**
 * 获取 box 最小值的索引index
 */
 function getminHIndex(arr,minH){
    for(var i in arr){
        if(arr[i]==minH){
            return i;
        }
    }
}
/**
 * 先判断是否满足scroll要求
 * 当最后一张图片的一半的时候，开始scroll
 */
 function checkIsScroll(){
    var oParent = document.getElementById('main');
    var aBox = document.getElementsByClassName('box');
    var lastbox = aBox[aBox.length-1];
    var lastH = lastbox.offsetTop+Math.floor(lastbox.offsetHeight/2);
    //鼠标滑动上下距离，注意解决兼容性
    var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
    var documentH = document.documentElement.clientHeight;//页面高度
    return (lastH<scrollTop+documentH)?true:false;
}