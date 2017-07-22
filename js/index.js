// 获取ID号
function id(obj) {
    return document.getElementById(obj);
}
function bind(obj, ev, fn) { 
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent('on' + ev, function() {
            fn.call(obj);
        });
    }
}
// 获取屏幕宽度高度
function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}
// 添加class
function addClass(obj, sClass) { 
    var aClass = obj.className.split(' ');
    if (!obj.className) {
        obj.className = sClass;
        return;
    }
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) return;
    }
    obj.className += ' ' + sClass;
}
// 删除class
function removeClass(obj, sClass) { 
    var aClass = obj.className.split(' ');
    if (!obj.className) return;
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) {
            aClass.splice(i, 1);
            obj.className = aClass.join(' ');
            break;
        }
    }
}



// 多个页面自动加载方法
function fnLoad(){
    var iTime = new Date().getTime();
    // alert(iTime);
    var oW = id("welcome");
    var arr = [""];
    var bImgLoad = true;
    var bTime = false;
    var oTime = 0;
    bind(oW, "transitionend", end);
    bind(oW, "webkitTransitionEnd", end);
    setInterval(function(){
        if(new Date().getTime() - iTime >= 4000)
        {
            // alert(iTime);
            bTime = true;

        }
        if(bImgLoad && bTime)
        {
            clearInterval(oTime);
            // alert("这行跳转");
            oW.style.opacity = 0;
        }
    }, 1000);
    function end(){
        // alert("动画执行完毕");
        removeClass(oW, "pageShow");
        fnTab();
    }
    /*for(let i = 0; i < arr.length; i++)
    {
        var oImg = new Image():
        oImg.src = arr[i];
        oImg.onload = function()
        {

        }
    }*/
}

// 首页面的方法
// bind(document, "touchmove", function(ev){
//     ev.preventDefault();
// });
function fnTab(){
    var oTab = id("tabPic");
    var oList = id("picList");
    var aNav = oTab.getElementsByTagName("nav")[0].children;
    var pPi = oTab.getElementsByTagName("span")[0].children;
    console.log(pPi.length);
    console.log(pPi);
    console.log(pPi.toString());
    console.log(aNav.toString());
    var iNow = 0;
    var iX = 0;
    var iW = view().w;
    // alert(iW);
    var oTimer = 0;
    var iStartTouchX = 0;
    var iStartX = 0;
    auto();

    // 防止事件重复调用
    if(!window.wfnScore)
    {
        fnScore();
        window.wfnScore = true;
    }

    // fnScore();

    // 拖拽 touchstart移动端时间事件
    bind(oTab, "touchstart", fnStart);
    bind(oTab, "touchmove", fnMove);
    bind(oTab, "touchend", fnEnd);

    // 图片轮播到尾 从头轮播判断 取模设置
    function auto(){
        oTimer = setInterval(function()
        {
            iNow++;
            iNow = iNow%aNav.length;
            // pPi = iNow%pPi.length;
            tab();
        }, 2000);
    }
   
    function fnStart(ev)
    {
        oList.style.transition = "none";
        ev = ev.changedTouches[0];  // 比如多个手指触碰 也只是读取第一个手指的位置信息
        // console.log(ev);
        iStartTouchX = ev.pageX;
        iStartX = iX;
        clearInterval(oTimer);
        // alert("aaa");
    }
    function fnMove(ev)
    {
        ev = ev.changedTouches[0];  // 比如多个手指触碰 也只是读取第一个手指的位置信息
        var iDis = ev.pageX - iStartTouchX;   // 手指在屏幕移动的距离 pagex现在的 减去 iStartTouchX
        iX = iStartX + iDis;   // 手指在屏幕上移动多少距离 就跟着移动多少距离
        oList.style.WebkitTransform = oList.style.transform="translateX(" + iX + "px)";
    }

    function fnEnd(ev)
    {
        iNow = iX / iW;
        console.log(iNow);
        // iNow = Math.abs(iX / iW);  // 获取拖拽是距离大小比

        iNow = -Math.round(iNow);    //一个数字舍入为最接近的整数。
        console.log(iNow);
        if (iNow < 0) 
        {
            iNow = 0;
        }
        if(iNow > aNav.length-1)
        {
            iNow = aNav.length-1;
        }
        // iNow = iNow%aNav.length;
        console.log(iNow);
        tab();
        auto();
    }

    // 控制图片轮播
    function tab(){
        iX = -iNow * iW;
        oList.style.transition = "0.5s";
        oList.style.WebkitTransform = oList.style.transform="translateX(" + iX + "px)";
        // alert(oList.style.transform);
        // 这里是控制nav几个点的的
        for(let i = 0; i <aNav.length; i++)
        {
            console.log(pPi);
            console.log(aNav[i]);
            removeClass(aNav[i], "active");

            removeClass(pPi[i], "piShow");
        }
        addClass(aNav[iNow], "active");
        addClass(pPi[iNow], "piShow");
    }
}



// 星星评分效果设置
function fnScore(){
    var oScore = id("score");
    // 先获取li 因为每个li都是一个分组
    var aLi = oScore.getElementsByTagName("li");
    // 用一个数组承载一个评分等级 用于hidden提交数据
    var arr = ["失望", "中等", "一般", "良好", "棒极了"];
    // 通过循环操作li里面的a
    for(let i = 0; i < aLi.length; i++)
    {
        fn(aLi[i]);
    }
    function fn(oLi)
    {
        var aNav = oLi.getElementsByTagName("a");
        var oInput = oLi.getElementsByTagName("input")[0];
        // alert(aNav.length);
        for(let i = 0; i < aNav.length; i++)
        {
            aNav[i].index = i;
            bind(aNav[i], "touchstart", function(){
                // alert(this.index);
                for(let i = 0; i < aNav.length; i++)
                {
                    if (i <= this.index) 
                    {
                        addClass(aNav[i], "active");
                    }
                    else
                    {
                        removeClass(aNav[i], "active");
                    }
                }
                // 提交评分数据 input hidden
                // oInput.value = this.index + 1;
                oInput.value = arr[this.index];
            });
        }
    }

    // 防止事件重复调用
    if(!window.wfnIndex)
    {
        fnIndex();
        window.wfnIndex = true;
    }

    // fnIndex();
}

// info弹出信息方法
function fnInfo(oInfo, sInfo)
{
    oInfo.innerHTML = sInfo;
    oInfo.style.WebkitTransform = oInfo.style.transform = "scale(1)";
    oInfo.style.opacity = 1;
    setTimeout(function(){
        oInfo.style.WebkitTransform = oInfo.style.transform = "scale(0)";
      oInfo.style.opacity = 0;
    }, 1000)
}

// index页面的验证提交
function fnIndex()
{
    var oIndex = id("index");
    var oBtn = oIndex.getElementsByClassName("btn")[0];
    var oInfo = oIndex.getElementsByClassName("info")[0];
    bind(oBtn, "touchend", fnEnd);
    var bScore = false;
    function fnEnd()
    {
        // alert("试一试能不能弹出东西来");
        bScore = fnScoreChecked();
        console.log(bScore);
        if(bScore)
        {
            if(bTag())
            {
                // alert("执行跳转页面");
                fnIndexOut();
            }
            else{
                fnInfo(oInfo, "给景区添加标签");
            }
        }
        else
        {
            fnInfo(oInfo, "给景区评分");
        }
    }

    // 判断有木有评分ddddd
    function fnScoreChecked()
    {
        var oScore = id("score");
        var aInput = oScore.getElementsByTagName("input");
        var bS = true;
        for(let i = 0; i < aInput.length; i++)
        {
            if(aInput[i].value == 0)
            {
                return false;
            }
        }
        return true;
    }
    // 评论单选框有木有被选中
    function bTag()
    {
        var oTag = id("indexTag");
        var aInput = oTag.getElementsByTagName("input");
        for(let i = 0; i < aInput.length; i++)
        {
            if(aInput[i].checked)
            {
                return true;
            }
        }
        return false;
    }
}


// 景区评分以后点击提交跳转页面  遮罩以后后面变模糊 3秒以后跳转页面
function fnIndexOut()
{
    var oMask = id("mask");
    //   遮罩以后后面变模糊
    var oIndex = id("index");

    var oNew = id("news");
    addClass(oMask, "pageShow");
    addClass(oNew, "pageShow");
    
    // 防止事件重复调用
    if(!window.wfnNews)
    {
        fnNews();
        window.wfnNews = true;
    }
    // fnNews();


    setTimeout(function(){
        oMask.style.opacity = 1;
        oIndex.style.WebkitFilter = oIndex.style.filter = "blur(7px)";  // 遮罩以后后面变模糊
    },14);

    // 设置3秒以后一切回归原点
    setTimeout(function(){
        oNew.style.transition = "0.5s";
        oMask.style.opacity = 0;
        oIndex.style.WebkitFilter = oIndex.style.filter = "blur(0px)";  // 遮罩以后后面变模糊
        oNew.style.opacity = 1;
        removeClass(oMask, "pageShow");
    },3000);
    
}


// 上传页面的info消息提示
function fnNews()
{
    var oNews = id("news");
    var oInfo = oNews.getElementsByClassName("info")[0];
    var aInput  = oNews.getElementsByTagName("input");
    // alert(aInput[0]);
    aInput[0].onchange = function()
    {
        // console.log(this.files);
        console.log(this.files[0].type);
        console.log(this.files[0].type.split("/")[0]);
        if (this.files[0].type.split("/")[0] == "video") 
        {
            fnNewsOut();

            // 设为空 不然选中同一个文件没反应 缓存
            this.value = "";
        }
        else
        {
            fnInfo(oInfo, "请上传视频");
        }
    }

    aInput[1].onchange = function()
    {
        // console.log(this.files);
        console.log(this.files[0].type);
        console.log(this.files[0].type.split("/")[0]);
        if (this.files[0].type.split("/")[0] == "image") 
        {
            fnNewsOut();
            this.value = "";
        }
        else
        {
            fnInfo(oInfo, "请上传图片");
        }
    }
}

// 点击上传以后跳转到的页面函数处理

function fnNewsOut()
{
    var oNews = id("news");
    var oForm = id("form");
    addClass(oForm, "pageShow");
    oNews.style.cssText = "";
    removeClass(oNews, "pageShow");

    // 防止事件重复调用
    if(!window.wformInput)
    {
        formInput();
        window.wformInput = true;
    }
    // formInput();
}


// 上传页面的 上传按钮方法
function formInput()
{
    var oForm = id("form");
    var oOver = id("over");
    var aFormTag = id("formTag").getElementsByTagName("label");
    var oBtn = oForm.getElementsByClassName("btn")[0];
    var bOff = false;
    for(let i = 0; i < aFormTag.length; i++)
    {
        bind(aFormTag[i], "touchend", function(){
            console.log(aFormTag[i]);
            bOff = true;
            addClass(oBtn, "submit");      // 当选中标签以后 把button变成submit
        })
    }

    bind(oBtn, "touchend", function()
    {
        if(bOff)
        {
            // 进入重选以后把以前选中的数据清空 flag止为false
            for(let i = 0; i < aFormTag.length; i++)
            {
                aFormTag[i].getElementsByTagName("input")[0].checked = false;
            }
            bOff = false;
            addClass(oOver, "pageShow");
            removeClass(oForm, "pageShow");
            removeClass(oBtn, "submit");


            if(!window.wover)
            {
                over();
                window.wover = true;
            }
            // over();
        }
    });
}


// 最后一个页面点击重新评价以后的方法
function over()
{
    var oOver = id("over");
    var oBtn = oOver.getElementsByClassName("btn")[0];
    bind(oBtn, "touchend", function(){
        removeClass(oOver, "pageShow");
    });
    
}