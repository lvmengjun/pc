var province = document.getElementById("province");
var provinceContent = document.getElementById("provinceContent");

//shortcut 省份切换
province.onmouseover = function (e) {
    e = e || window.event;
    e.target = e.target || e.srcElement;
    provinceContent.style.display = "block";
}

province.onmouseout = function (e) {
    e = e || window.event;
    e.target = e.target || e.srcElement;
    provinceContent.style.display = "none";
}

province.onclick = function (e) {
    e = e || window.event;
    e.target = e.target || e.srcElement;
    if (e.target.tagName.toLocaleLowerCase() === "li" && e.target.parentNode.id === "provinceList") {
        utils.children(this, "span")[0].innerHTML = e.target.innerHTML;
        provinceContent.style.display = "none";
        return;
    }
}

var searchInp = document.getElementById("searchInp");
var search = document.getElementById("search");
var searchList = utils.getElementsByClass("search-main", search)[0];

searchInp.onfocus = function (e) {

    var val = this.value.replace(/(^ +| +$)/);
    searchList.style.display = val.length > 0 ? "block" : "none";
}

searchInp.onkeyup = function (e) {
    var val = this.value.replace(/(^ +| +$)/);
    searchList.style.display = val.length > 0 ? "block" : "none";
}

document.body.onclick = function (e) {
    e = e || window.event;
    e.target = e.target || e.srcElement;

    if (e.target.tagName.toLocaleLowerCase() === "li" && e.target.parentNode.className === "search-main-list") {
        searchInp.value = utils.children(e.target, "span")[0].innerHTML;
        searchList.style.display = "none";
        return;
    }
    searchList.style.display = "none";
}

searchInp.onclick = function (e) {
    e = e || window.event;
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
}

var returnBtn = document.getElementById("return-top");
var oUl = document.getElementById("oUl");
var oLis = oUl.getElementsByTagName("li");
var oDivs = document.getElementsByClassName("product");

returnBtn.onclick = function () {

    returnBtn.style.display = "none";
    window.onscroll = null;

    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var step = (scrollTop / 1000) * 10;
    var timer = window.setInterval(function () {
        if (scrollTop <= 0) {
            window.clearInterval(timer);
            window.onscroll = onScroll;
            return;
        }
        scrollTop -= step;
        document.documentElement.scrollTop = scrollTop;
        document.body.scrollTop = scrollTop;
    }, 10);
}

~function menu() {

    for (var i = 0; i < oLis.length; i++) {
        (function (i) {
            var cur = oLis[i];

            cur.onclick = function () {

                var targetT = utils.offSet(oDivs[i]).top;
                var curScroll = document.documentElement.scrollTop || document.body.scrollTop;
                var step = ((targetT - curScroll) / 1000) * 10;
                var direction = (targetT - curScroll) > 0 ? 1 : -1;
                var timer = window.setInterval(function () {
                    if ((curScroll - targetT) * direction >= 0) {
                        document.documentElement.scrollTop = targetT;
                        document.body.scrollTop = targetT;
                        clearInterval(timer);
                        return;
                    }
                    curScroll += step;
                    document.documentElement.scrollTop = curScroll;
                    document.body.scrollTop = curScroll;
                }, 10);

                this.innerHTML = this.getAttribute("info");
            };
            cur.onmouseenter = function () {
                if (this.className === "select") {
                    return;
                }
                this.className = "hover";
                this.innerHTML = cur.getAttribute("info");
            }
            cur.onmouseleave = function () {
                if (this.className === "select") {
                    return;
                }
                this.className = "";
                this.innerHTML = cur.getAttribute("index");
            }
        })(i);
    }
}();

function onScroll() {

    ~function showNav() {

        var navT = utils.offSet(oDivs[0]).top - document.documentElement.clientHeight || document.body.clientHeight;
        var navB = utils.offSet(oDivs[oDivs.length - 1]).top + oDivs[oDivs.length - 1].offsetHeight;
        var winT = document.documentElement.scrollTop || document.body.scrollTop;
        if (winT > navT && winT < navB) {
            oUl.style.display = "block";
        }
        else {
            oUl.style.display = "none";
        }
    }();

    ~function showNowNav() {

        for (var i = 0; i < oDivs.length; i++) {
            (function (i) {
                var cur = oDivs[i];
                var boforeT = i === 0 ? 0 : (oDivs[i - 1].offsetHeight) / 2;
                var curT = utils.offSet(cur).top - boforeT;
                var curB = utils.offSet(cur).top + (cur.offsetHeight) / 2;
                var winT = document.documentElement.scrollTop || document.body.scrollTop;
                if (winT >= curT && winT <= curB) {
                    for (var j = 0; j < oLis.length; j++) {
                        oLis[j].innerHTML = oLis[j].getAttribute("index");
                        oLis[j].className = "";
                    }
                    oLis[i].innerHTML = oLis[i].getAttribute("info");
                    oLis[i].className = "select";
                }
            })(i);
        }
    }();

    ~function showReturnTopBtn() {

        var curT = document.documentElement.scrollTop || document.body.scrollTop;
        var winH = document.documentElement.clientHeight || document.body.clientHeight;
        if (curT > (winH / 2)) {
            returnBtn.style.display = "block";
        } else {
            returnBtn.style.display = "none";
        }
    }();
}

window.onscroll = onScroll;

var menuLeft = document.getElementById("menu-left");
var mainList = utils.getElementsByClass("menu-main", menuLeft);

menuLeft.onmouseover = function (e) {
    e = e || window.event;
    e.target = e.target || e.srcElement;

    if (e.target.tagName.toLocaleLowerCase() === "a" && e.target.parentNode.parentNode.id === "menu-left") {
        for (var i = 0; i < mainList.length; i++) {
            mainList[i].style.display = "none";
            utils.removeClass(mainList[i].parentNode, "hover")
        }
        }
        utils.children(e.target, "div")[0].style.display = "block";
        utils.addClass(e.target, "hover");
};

menuLeft.onmouseleave = function (e) {
    e = e || window.event;
    e.target = e.target || e.srcElement;
    for (var i = 0; i < mainList.length; i++) {
        mainList[i].style.display = "none";
        utils.removeClass(mainList[i].parentNode, "hover");
    }
}

var guessyou = document.getElementById("guessyou");
var guessyouLis = utils.getElementsByClass("fore", guessyou);
var changeBtn = utils.getElementsByClass("changeBtn", guessyou)[0];

var n = 0;
var price = utils.getElementsByClass("guess-price", guessyou);
var pname = utils.getElementsByClass("p-name", guessyou);

changeBtn.onclick = function () {
    n++;
    n >= 4 ? n = 0 : null;
    for (var i = 0; i < guessyouLis.length; i++) {

        var curLi = utils.children(guessyouLis[i], "div")[0];
        var img = utils.children(curLi, "img")[0];

        img.setAttribute("src", jsonGuessyou[n][i]["src"]);
        pname[i].innerHTML = jsonGuessyou[n][i]["title"];
        price[i].innerHTML = jsonGuessyou[n][i]["price"];
    }
}

var floorContent = document.getElementById("floorContent");
var oTabs = utils.getElementsByClass("floor", floorContent);
for (var i = 0; i < oTabs.length; i++) {
    var oTab = oTabs[i];
    var oTabUl = utils.children(oTab, "ul")[0];

    var oTabLis = utils.children(oTabUl, "li");

    for (var k = 0; k < oTabLis.length; k++) {
        oTabLis[k].onmouseover = changeTab;
    }
}

function changeTab() {
    utils.addClass(this, "select");
    var siblingLi = utils.siblings(this);
    for (var i = 0; i < siblingLi.length; i++) {
        utils.removeClass(siblingLi[i], "select");
    }

    var divList = utils.getElementsByClass("tabCon-main", utils.next(this.parentNode));

    var index = utils.getIndex(this);

    for (i = 0; i < divList.length; i++) {
        var curDiv = divList[i];
        if (i === index) {
            utils.addClass(curDiv, "select");
        } else {
            utils.removeClass(curDiv, "select");
        }
    }
}

(function () {
    var slide = function (curEle, width, count, time) {
        var outer = utils.getElementsByClass("slide-outer", curEle)[0];
        var inner = utils.getElementsByClass("slide-inner", outer)[0];
        var imgList = inner.getElementsByTagName("img");
        var tip = utils.getElementsByClass("slide-tip", outer)[0];
        if (tip) {
            var tipList = tip.getElementsByTagName("li");
        }
        var btnLeft = utils.getElementsByClass("btnLeft", outer)[0];
        var btnRight = utils.getElementsByClass("btnRight", outer)[0];
        var count = count;
        var step = 0;
        var time = time || 10;

        function lazyImg() {
            for (var i = 0; i < imgList.length; i++) {
                (function (i) {
                    var curImg = imgList[i];
                    var oImg = new Image;
                    oImg.src = curImg.getAttribute("trueImg");
                    oImg.onload = function () {
                        curImg.src = this.src;
                        curImg.style.display = "block";
                        animate(curImg, {opacity: 1}, 500);
                    }
                })(i);
            }
        }

        window.setTimeout(lazyImg, 500);

        if (tip) {
            function selectTip() {
                var tempStep = step;
                tempStep >= tipList.length ? tempStep = 0 : null;
                for (var i = 0; i < tipList.length; i++) {
                    tipList[i].className = i === tempStep ? "select" : null;
                }
            }

            ~function tipMove() {
                for (var i = 0; i < tipList.length; i++) {
                    var curTip = tipList[i];
                    curTip.index = i;
                    curTip.onclick = function () {
                        window.clearInterval(autoTimer);
                        step = this.index;
                        animate(inner, {left: -step * width}, time);
                        selectTip();
                        autoTimer = window.setInterval(autoMove, 4000);
                    }
                }
            }();
        }

        if (btnLeft) {
            btnLeft.onclick = function () {
                window.clearInterval(autoTimer);
                step--;
                if (step < 0) {
                    step = count - 1;
                    inner.style.left = -count * width + "px";
                }
                animate(inner, {left: -step * width}, time);
                if (tip) {
                    selectTip();
                }
                autoTimer = setInterval(autoMove, 4000);
            }
        }

        if (btnRight) {
            btnRight.onclick = function () {
                window.clearInterval(autoTimer);
                autoMove();
                autoTimer = setInterval(autoMove, 4000);
            }
        }

        function autoMove() {
            step++;
            if (step > count) {
                step = 1;
                inner.style.left = 0;
            }
            animate(inner, {left: -step * width}, time);
            if (tip) {
                selectTip();
            }
        }

        var autoTimer = window.setInterval(autoMove, 4000);
    }
    window.slide = slide;
})()

//首页主轮播图
var mainSlide = document.getElementById("mainSlide");
slide(mainSlide, 730, 6);

//首页下方轮播图
var BottomSlide = document.getElementById("BottomSlide");
slide(BottomSlide, 1000, 4, 500);

//第一层轮播图
var floorslide1 = document.getElementById("floorslide1");
slide(floorslide1, 439, 4, 500);

//第二层轮播图
var floorslide2 = document.getElementById("floorslide2");
slide(floorslide2, 439, 4, 500);

//第三层轮播图
var floorslide3 = document.getElementById("floorslide3");
slide(floorslide3, 439, 4, 500);