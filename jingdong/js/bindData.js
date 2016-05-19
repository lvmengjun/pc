~function bindProvince() {
    var provinceList = document.getElementById("provinceList");
    var str = "";
    for (var i = 0; i < jsonProvince.length; i++) {
        str += "<li>" + jsonProvince[i] + "</li>";
    }
    provinceList.innerHTML = str;
}();


~function bindSearchData() {
    var search = document.getElementById("search");
    var searchList = utils.getElementsByClass("search-main-list", search)[0];
    var str = "";
    for (var i = 0; i < jsonSearchList.length; i++) {
        str += "<li><span>" + jsonSearchList[i].name + "</span><a href='javascript:;'>约" + jsonSearchList[i].number + "个商品</a></li>"
    }
    searchList.innerHTML = str;
}();


~function bindHotwordsData() {
    var hotwords = document.getElementById("hotwords");
    var str = "";
    for (var i = 0; i < jsonHotwords.length; i++) {
        str += "<a href='javascript:;' target='_blank' class='" + (i === 0 ? "style-red" : null) + "'>" + jsonHotwords[i] + "</a>";
    }
    hotwords.innerHTML = str;
}();


~function bindMenuData() {
    var menuLeft = document.getElementById("menu-left");
    var str = "";
    for (var i = 0; i < jsonMenu.length; i++) {
        var cur = jsonMenu[i];

        str += "<li class='menuleft-li'>";
        str += "<a href='javascript:;'>" + cur["title"];
        str += "<div class='menu-main' style='top: " + -31 * i + "px" + ";'>";

        str += "<ul class='label-ul'>";
        for (j = 0; j < cur["label"].length; j++) {
            str += "<li>" + cur["label"][j] + "<span>></span></li>";
        }
        str += "</ul>";

        str += "<div class='label-list'>";

        for (k = 0; k < cur["list"].length; k++) {
            str += "<ul>"
            str += "<li class='first-list'><h2>" + cur["list"][k][0] + " ></h2></li>"
            for (var l = 1; l < cur["list"][k].length; l++) {
                str += "<li>" + cur["list"][k][l] + "</li>"
            }
            str += "</ul>"

        }


        str += "</div>";
        str += "<img src=" + cur["image"] + ">"


        str += "</div></a><i>&gt;</i>"
        str += "</li>";

    }
    menuLeft.innerHTML = str;
}();


~function bindMainSlideData() {
    var mainSlide = document.getElementById("mainSlide");
    var mainSlideInner = utils.getElementsByClass("slide-inner", mainSlide)[0];
    var mainSlideTip = utils.getElementsByClass("slide-tip", mainSlide)[0];
    var mainSlideTipList = mainSlideTip.getElementsByTagName("li");
    var str = "";
    for (var i = 0; i < jsonSlide.length; i++) {
        str += "<div><img style='border:0' trueImg='" + jsonSlide[i] + "'/></div>";
    }
    str += "<div><img style='border:0' trueImg='" + jsonSlide[0] + "'/></div>";
    mainSlideInner.style.width = 7 * 730 + "px";
    mainSlideInner.innerHTML = str;
    if (mainSlideTip) {
        str = "";
        for (var i = 0; i < jsonSlide.length; i++) {
            str += "<li>" + (i + 1) + "</li>";
        }
        mainSlideTip.innerHTML = str;
        //selectTip();
        mainSlideTipList[0].className = "select";
    }
}();


~function bindBottomSlideData() {
    var BottomSlide = document.getElementById("BottomSlide");
    var BottomSlideInner = utils.getElementsByClass("slide-inner", BottomSlide)[0];
    var str = "";
    for (var i = 0; i < jsonBottomSlide.length; i++) {
        str += "<div><img  src='" + jsonBottomSlide[i] + "'/></div>";
    }
    for (var i = 0; i < 4; i++) {
        str += "<div><img  src='" + jsonBottomSlide[i] + "'/></div>";
    }

    BottomSlideInner.style.width = 20 * 250 + "px";

    BottomSlideInner.innerHTML = str;
}();


~function bindNewsData() {
    var newsContent = document.getElementById("newsContent");
    var str = "";
    for (var i = 0; i < jsonNews.length; i++) {
        str += "<li><a href='javascript:;'><span>" + "[" + jsonNews[i].type + "]" + "</span>" + jsonNews[i].content + "</a></li>";
    }
    newsContent.innerHTML = str;
}();

