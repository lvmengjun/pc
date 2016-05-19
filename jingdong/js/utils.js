/*
 * utils class v1.0:The common methods used in our JS are included.
 * by Roger on 2016/01/20
 */

var utils = {

    //listToArray:实现将类数组转换为数组
    listToArray: function (likeAry) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeAry);
        } catch (e) {
            for (var i = 0; i < likeAry.length; i++) {
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    },

    //toJSON:Converts a string of JSON format to an object in the JSON format
    toJSON: function (str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    },

    //offSet:获取当前元素距离body的偏移量(上偏移top 和 左偏移left)
    offSet: function (curEle) {
        var t = curEle.offsetTop, l = curEle.offsetLeft, p = curEle.offsetParent;
        while (p) {
            if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
                t += p.clientTop;
                l += p.clientLeft;
            }
            t += p.offsetTop;
            l += p.offsetLeft;
            p = p.offsetParent;
        }
        return {top: t, left: l};
    },

    //win:设置或者获取浏览器的盒子模型信息
    win: function (attr, value) {
        if (value === undefined) {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    },

    //prev:获取当前元素的上一个兄弟元素节点
    prev: function prev(curEle) {
        if ("previousElementSibling" in curEle) {
            return curEle.previousElementSibling;
        }
        var pre = curEle.previousSibling;
        if (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling;
        }
        return pre;
    },

    //prevAll:获取所有哥哥兄弟元素节点
    prevAll: function prevAll(curEle) {
        var ary = [];
        var pre = this.prev(curEle);
        while (pre) {
            ary.unshift(pre);
            pre = this.prev(pre);
        }
        return ary;
    },

    //next:获取当前元素的下一个兄弟元素节点
    next: function next(curEle) {
        if ("nextElementSibling" in curEle) {
            return curEle.nextElementSibling;
        }
        var next = curEle.nextSibling;
        while (next && next.nodeType !== 1) {
            next = next.nextSibling;
        }
        return next;
    },

    //nextAll:获取所有弟弟兄弟元素节点
    nextAll: function nextAll(curEle) {
        var ary = [];
        var nex = this.next(curEle);
        while (nex) {
            ary.push(nex);
            nex = this.next(nex);
        }
        return ary;
    },

    //sibling:获取相邻的两个兄弟元素节点
    sibling: function sibling(curEle) {
        var ary = [], pre = this.prev(curEle), nex = this.next(curEle);
        pre ? ary[ary.length] = pre : null;
        nex ? ary[ary.length] = nex : null;
        return ary;
    },

    //siblings:获取所有兄弟元素节点
    siblings: function siblings(curEle) {
        return this.prevAll(curEle).concat(this.nextAll(curEle));
    },

    //getIndex:获取当前元素的索引
    getIndex: function getIndex(curEle) {
        return this.prevAll(curEle).length;
    },

    //hasClass:判断当前元素是否包含某个样式类名
    hasClass: function hasClass(curEle, cName) {
        var reg = new RegExp("(?:^| +)" + cName + "(?: +|$)");
        return reg.test(curEle.className);
    },

    //addClass:给当前的元素增加样式类名
    addClass: function addClass(curEle, cName) {
        if (!this.hasClass(curEle, cName)) {
            curEle.className += " " + cName;
        }
    },

    //removeClass:给当前的元素移除某一个样式类名
    removeClass: function removeClass(curEle, cName) {
        if (this.hasClass(curEle, cName)) {
            var reg = new RegExp("(?:^| +)" + cName + "(?: +|$)", "g");
            curEle.className = curEle.className.replace(reg, " ");
        }
    },

    //children:获取当前元素下所有指定标签名的元素子节点集合
    children: function children(curEle, tag) {
        var ary = [];
        var nodeList = curEle.childNodes;
        for (var i = 0; i < nodeList.length; i++) {
            var cur = nodeList[i];
            if (cur.nodeType === 1) {
                if (tag !== "undefined") {
                    var reg = new RegExp("^" + tag + "$", "i");
                    reg.test(cur.tagName) ? ary[ary.length] = cur : null;
                    continue;
                }
                ary[ary.length] = cur;
            }
        }
        return ary;
    },

    //getElementsByClass:通过元素的样式类名,在指定的上下文中获取相关的元素
    getElementsByClass: function getElementsByClass(strClass, context) {
        var context = context || document;
        if ("getElementsByClassName" in document) {
            return this.listToArray(context.getElementsByClassName(strClass));
        }
        var ary = [];
        var tagList = context.getElementsByTagName("*");
        strClass = strClass.replace(/(^ +)|( +$)/g, "").split(/ +/);

        for (var i = 0; i < tagList.length; i++) {
            var curTag = tagList[i];
            var curTagClass = curTag.className;
            var flag = true;
            for (var j = 0; j < strClass.length; i++) {
                var reg = new RegExp("(?:^| +)" + strClass[k] + "(?: +|$)");
                if (!reg.test(curTagClass)) {
                    flag = false;
                    break;
                }
            }
            flag ? ary[ary.length] = curTag : null;
        }
        return ary;
    },

    //getCss:获取当前元素的样式
    getCss: function (curEle, attr) {
        var val = reg = null;
        if ("getComputedStyle" in window) {
            val = window.getComputedStyle(curEle, null)[attr];
        } else {
            if (attr === "opacity") {
                val = curEle.currentStyle["filter"];
                reg = /^alpha\(opacity=(\d+(\.\d+)?)\)$/;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = curEle.currentStyle[attr];
            }
        }
        reg = /^-?\d+(\.\d+)?(px|pt|em|rem)?$/;
        return reg.test(val) ? parseFloat(val) : val;
    },

    //setCss:设置当前元素的样式
    setCss: function (curEle, attr, value) {
        if (attr === "float") {
            curEle["style"]["cssFloat"] = value;
            curEle["style"]["styleFloat"] = value;
            return;
        }
        if (attr === "opacity") {
            value > 1 ? value = 1 : null;
            value < 0 ? value = 0 : null;

            curEle["style"]["opacity"] = value;
            curEle["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
            return;
        }
        var reg = /^(width|height|top|left|right|bottom|((margin|padding)(Top|Left|Right|Bottom)?))$/;
        if (reg.test(value)) {
            reg = /^-?\d+(\.\d+)?$/;
            if (reg.test(value)) {
                curEle["style"][attr] = value + "px";
                return;
            }
        }
        curEle["style"][attr] = value;
    },

    //setGroupCss:批量设置当前元素的样式
    setGroupCss: function setGroupCss(curEle,options) {
        if(Object.prototype.toString.call(options) !== "[object Object]"){
            return;
        }
        for(var key in options){
            if(options.hasOwnProperty(key)){
                this.setCss(curEle, key, options[key]);
            }
        }
    }
}