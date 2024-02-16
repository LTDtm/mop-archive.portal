/*
 global.js version 278 (09.07.2009)
 Differences from origin:
 1. Change:
   - http://static.wowhead.com/images/icons/    ->  images/icons/
   - http://static.wowhead.com/images/  ->  templates/wowhead/images/
 2. In function M(aa, W) of class $WowheadPower:
   - commented locale definition from host
   - chaned Y calculation to use locale.id
 3. In fucntion b(W, S, X, Q, T) of class $WowheadPower:
   - commented host definition
 4. In function g_initHeaderMenus()
   - commented old (host-based) locale definition
   - added new (locale.id-based) locale definition
   - changed language-menu to include only English and Russian
   - changed Russian locale.id to 8 (like in WoW-client)
 5. In g_locales array:
   - Changed id of ruru locale to 8
 6. Change to relative path:
   - ?      ->      ?   (104)
 7. Changed LiveSearch
   - relocate ?search to opensearch.php?search
 8. Added this.applySort(); in Listview prototype. May be it unneeded in some case, but i can't find such examples.
 9. Changed items percents handling.
   - backported support of negative probabilities for quest items
*/
var U_GROUP_TESTER = 1;
var U_GROUP_ADMIN = 2;
var U_GROUP_EDITOR = 4;
var U_GROUP_MOD = 8;
var U_GROUP_BUREAU = 16;
var U_GROUP_DEV = 32;
var U_GROUP_VIP = 64;
var U_GROUP_BLOGGER = 128;
var U_GROUP_PREMIUM = 256;
var U_GROUP_LOCALIZER = 512;
var U_GROUP_SALESAGENT = 1024;
var U_GROUP_SCREENSHOT = 2048;
var U_GROUP_VIDEO = 4096;
var U_GROUP_APIONLY = 8192;
var U_GROUP_PENDING = 16384;
var U_GROUP_STAFF = U_GROUP_ADMIN | U_GROUP_EDITOR | U_GROUP_MOD | U_GROUP_BUREAU | U_GROUP_DEV | U_GROUP_BLOGGER | U_GROUP_LOCALIZER | U_GROUP_SALESAGENT;
var U_GROUP_EMPLOYEE = U_GROUP_ADMIN | U_GROUP_BUREAU | U_GROUP_DEV;
var U_GROUP_GREEN_TEXT = U_GROUP_MOD | U_GROUP_BUREAU | U_GROUP_DEV;
var U_GROUP_MODERATOR = U_GROUP_ADMIN | U_GROUP_MOD | U_GROUP_BUREAU;
var U_GROUP_COMMENTS_MODERATOR = U_GROUP_BUREAU | U_GROUP_MODERATOR | U_GROUP_LOCALIZER;
var U_GROUP_PREMIUM_PERMISSIONS = U_GROUP_PREMIUM | U_GROUP_STAFF | U_GROUP_VIP;

var g_staticUrl = "http://mop-static.tauri.hu";

isset = function (a) {
    return typeof window[a] != "undefined"
}
function $_(c) {
    if (arguments.length > 1) {
        var b = [];
        var a;
        for (var d = 0, a = arguments.length; d < a; ++d) {
            b.push($_(arguments[d]))
        }
        return b
    }
    if (typeof c == "string") {
        c = ge(c)
    }
    return c
}

function $E(a) {
    if (!a) {
        if (typeof event != "undefined") {
            a = event
        } else {
            return null
        }
    }
    if (a.which) {
        a._button = a.which
    } else {
        a._button = a.button;
        if (Browser.ie) {
            if (a._button & 4) {
                a._button = 2
            } else {
                if (a._button & 2) {
                    a._button = 3
                }
            }
        } else {
            a._button = a.button + 1
        }
    }
    a._target = a.target ? a.target : a.srcElement;
    a._wheelDelta = a.wheelDelta ? a.wheelDelta : -a.detail;
    return a
}

function $A(c) {
    var e = [];
    for (var d = 0, b = c.length; d < b; ++d) {
        e.push(c[d])
    }
    return e
}
Function.prototype.bind = function () {
    var c = this,
        a = $A(arguments),
        b = a.shift();
    return function () {
        return c.apply(b, a.concat($A(arguments)))
    }
};

function strcmp(d, c) {
    if (d == c) {
        return 0
    }
    if (d == null) {
        return -1
    }
    if (c == null) {
        return 1
    }
    return d < c ? -1 : 1
}

function stringCompare(d, c) {
    if (d == c) {
        return 0
    }
    if (d == null) {
        return -1
    }
    if (c == null) {
        return 1
    }
    var f = parseFloat(d);
    var e = parseFloat(c);
    if (!isNaN(f) && !isNaN(e) && f != e) {
        return f < e ? -1 : 1
    }
    if (typeof d == "string" && typeof c == "string") {
        return d.localeCompare(c)
    }
    return d < c ? -1 : 1
}

function trim(a) {
    return a.replace(/(^\s*|\s*$)/g, "")
}

function dO(a) {
    function b() {}
    b.prototype = a;
    return new b
}

function rtrim(c, d) {
    var b = c.length;
    while (--b > 0 && c.charAt(b) == d) {}
    c = c.substring(0, b + 1);
    if (c == d) {
        c = ""
    }
    return c
}

function sprintf(b) {
    var a;
    for (a = 1, len = arguments.length; a < len; ++a) {
        b = b.replace("$" + a, arguments[a])
    }
    return b
}

function sprintfa(b) {
    var a;
    for (a = 1, len = arguments.length; a < len; ++a) {
        b = b.replace(new RegExp("\\$" + a, "g"), arguments[a])
    }
    return b
}

function sprintfo(c) {
    if (typeof c == "object" && c.length) {
        var a = c;
        c = a[0];
        var b;
        for (b = 1; b < a.length; ++b) {
            c = c.replace("$" + b, a[b])
        }
        return c
    }
}

function str_replace(e, d, c) {
    while (e.indexOf(d) != -1) {
        e = e.replace(d, c)
    }
    return e
}

function urlencode(a) {
    a = encodeURIComponent(a);
    a = str_replace(a, "+", "%2B");
    return a
}

function urlencode2(a) {
    a = encodeURIComponent(a);
    a = str_replace(a, "%20", "+");
    return a
}

function number_format(a) {
    a = "" + parseInt(a);
    if (a.length <= 3) {
        return a
    }
    return number_format(a.substr(0, a.length - 3)) + "," + a.substr(a.length - 3)
}

function in_array(c, g, h, e) {
    if (c == null) {
        return -1
    }
    if (h) {
        return in_arrayf(c, g, h, e)
    }
    for (var d = e || 0, b = c.length; d < b; ++d) {
        if (c[d] == g) {
            return d
        }
    }
    return -1
}

function in_arrayf(c, g, h, e) {
    for (var d = e || 0, b = c.length; d < b; ++d) {
        if (h(c[d]) == g) {
            return d
        }
    }
    return -1
}

function array_walk(d, h, c) {
    var g;
    for (var e = 0, b = d.length; e < b; ++e) {
        g = h(d[e], c, d, e);
        if (g != null) {
            d[e] = g
        }
    }
}

function array_apply(d, h, c) {
    var g;
    for (var e = 0, b = d.length; e < b; ++e) {
        h(d[e], c, d, e)
    }
}

function ge(a) {
    return document.getElementById(a)
}

function gE(a, b) {
    return a.getElementsByTagName(b)
}

function ce(c, b) {
    var a = document.createElement(c);
    if (b) {
        cOr(a, b)
    }
    return a
}

function de(a) {
    a.parentNode.removeChild(a)
}

function ae(a, b) {
    if (!a)
        return b;
    return a.appendChild(b)
}

function aef(a, b) {
    return a.insertBefore(b, a.firstChild)
}

function ee(a, b) {
    if (!b) {
        b = 0
    }
    while (a.childNodes[b]) {
        a.removeChild(a.childNodes[b])
    }
}

function ct(a) {
    return document.createTextNode(a)
}

function st(a, b) {
    if (a.firstChild && a.firstChild.nodeType == 3) {
        a.firstChild.nodeValue = b
    } else {
        aef(a, ct(b))
    }
}

function nw(a) {
    a.style.whiteSpace = "nowrap"
}

function rf() {
    return false
}

function rf2(a) {
    a = $E(a);
    if (a.ctrlKey || a.shiftKey || a.altKey || a.metaKey) {
        return
    }
    return false
}

function tb() {
    this.blur()
}

function ac(c, d) {
    var a = 0,
        g = 0,
        b;
    while (c) {
        a += c.offsetLeft;
        g += c.offsetTop;
        b = c.parentNode;
        while (b && b != c.offsetParent && b.offsetParent) {
            if (b.scrollLeft || b.scrollTop) {
                a -= (b.scrollLeft | 0);
                g -= (b.scrollTop | 0);
                break
            }
            b = b.parentNode
        }
        c = c.offsetParent
    }
    if (Lightbox.isVisible()) {
        d = true
    }
    if (d && !Browser.ie6) {
        var f = g_getScroll();
        a += f.x;
        g += f.y
    }
    var e = [a, g];
    e.x = a;
    e.y = g;
    return e
}

function aE(b, c, a) {
    if (Browser.ie) {
        b.attachEvent("on" + c, a)
    } else {
        b.addEventListener(c, a, false)
    }
}

function dE(b, c, a) {
    if (Browser.ie) {
        b.detachEvent("on" + c, a)
    } else {
        b.removeEventListener(c, a, false)
    }
}

function sp(a) {
    if (!a) {
        a = event
    }
    if (Browser.ie) {
        a.cancelBubble = true
    } else {
        a.stopPropagation()
    }
}

function sc(h, i, d, f, g) {
    var e = new Date();
    var c = h + "=" + escape(d) + "; ";
    e.setDate(e.getDate() + i);
    c += "expires=" + e.toUTCString() + "; ";
    if (f) {
        c += "path=" + f + "; "
    }
    if (g) {
        c += "domain=" + g + "; "
    }
    document.cookie = c;
    gc.C[h] = d
}

function dc(a) {
    sc(a, -1);
    gc.C[a] = null
}

function gc(f) {
    if (gc.I == null) {
        var e = unescape(document.cookie).split("; ");
        gc.C = {};
        for (var c = 0, a = e.length; c < a; ++c) {
            var g = e[c].indexOf("="),
                b,
                d;
            if (g != -1) {
                b = e[c].substr(0, g);
                d = e[c].substr(g + 1)
            } else {
                b = e[c];
                d = ""
            }
            gc.C[b] = d
        }
        gc.I = 1
    }
    if (!f) {
        return gc.C
    } else {
        return gc.C[f]
    }
}

function ns(a) {
    if (Browser.ie) {
        a.onfocus = tb;
        a.onmousedown = a.onselectstart = a.ondragstart = rf
    }
}

function eO(b) {
    for (var a in b) {
        delete b[a]
    }
}

function cO(f, c, b) {
    for (var e in c) {
        if (b && typeof c[e] == "object" && c[e].length) {
            f[e] = c[e].slice(0)
        } else {
            f[e] = c[e]
        }
    }
}

function cOr(f, c, b) {
    for (var e in c) {
        if (typeof c[e] == "object") {
            if (b && c[e].length) {
                f[e] = c[e].slice(0)
            } else {
                if (!f[e]) {
                    f[e] = {}
                }
                cOr(f[e], c[e], b)
            }
        } else {
            f[e] = c[e]
        }
    }
}
var Browser = {
    ie: !!(window.attachEvent && !window.opera),
    opera: !!window.opera,
    safari: navigator.userAgent.indexOf("Safari") != -1,
    firefox: navigator.userAgent.indexOf("Firefox") != -1,
    chrome: navigator.userAgent.indexOf("Chrome") != -1
};
Browser.ie9 = Browser.ie && navigator.userAgent.indexOf("MSIE 9.0") != -1;
Browser.ie8 = Browser.ie && navigator.userAgent.indexOf("MSIE 8.0") != -1 && !Browser.ie9;
Browser.ie7 = Browser.ie && navigator.userAgent.indexOf("MSIE 7.0") != -1 && !Browser.ie8;
Browser.ie6 = Browser.ie && navigator.userAgent.indexOf("MSIE 6.0") != -1 && !Browser.ie7;
Browser.ie67 = Browser.ie6 || Browser.ie7;
Browser.ie678 = Browser.ie67 || Browser.ie8;
Browser.ie6789 = Browser.ie678 || Browser.ie9;
navigator.userAgent.match(/Gecko\/([0-9]+)/);
Browser.geckoVersion = parseInt(RegExp.$1) | 0;
var OS = {
    windows: navigator.appVersion.indexOf("Windows") != -1,
    mac: navigator.appVersion.indexOf("Macintosh") != -1,
    linux: navigator.appVersion.indexOf("Linux") != -1
};
var DomContentLoaded = new

function () {
    var a = [];
    this.now = function () {
        array_apply(a, function (b) {
            b()
        });
        DomContentLoaded = null
    };
    this.addEvent = function (b) {
        a.push(b)
    }
};

function g_getWindowSize() {
    var a = 0,
        b = 0;
    if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        a = document.documentElement.clientWidth;
        b = document.documentElement.clientHeight
    } else {
        if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
            a = document.body.clientWidth;
            b = document.body.clientHeight
        } else {
            if (typeof window.innerWidth == "number") {
                a = window.innerWidth;
                b = window.innerHeight
            }
        }
    }
    return {
        w: a,
        h: b
    }
}

function g_getScroll() {
    var a = 0,
        b = 0;
    if (typeof (window.pageYOffset) == "number") {
        a = window.pageXOffset;
        b = window.pageYOffset
    } else {
        if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
            a = document.body.scrollLeft;
            b = document.body.scrollTop
        } else {
            if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
                a = document.documentElement.scrollLeft;
                b = document.documentElement.scrollTop
            }
        }
    }
    return {
        x: a,
        y: b
    }
}

function g_getCursorPos(c) {
    var a, d;
    if (window.innerHeight) {
        a = c.pageX;
        d = c.pageY
    } else {
        var b = g_getScroll();
        a = c.clientX + b.x;
        d = c.clientY + b.y
    }
    return {
        x: a,
        y: d
    }
}

function g_scrollTo(c, b) {
    var l, k = g_getWindowSize(),
        m = g_getScroll(),
        i = k.w,
        e = k.h,
        g = m.x,
        d = m.y;
    c = $_(c);
    if (b == null) {
        b = []
    } else {
        if (typeof b == "number") {
            b = [b]
        }
    }
    l = b.length;
    if (l == 0) {
        b[0] = b[1] = b[2] = b[3] = 0
    } else {
        if (l == 1) {
            b[1] = b[2] = b[3] = b[0]
        } else {
            if (l == 2) {
                b[2] = b[0];
                b[3] = b[1]
            } else {
                if (l == 3) {
                    b[3] = b[1]
                }
            }
        }
    }
    l = ac(c);
    var a = l[0] - b[3],
        h = l[1] - b[0],
        j = l[0] + c.offsetWidth + b[1],
        f = l[1] + c.offsetHeight + b[2];
    if (j - a > i || a < g) {
        g = a
    } else {
        if (j - i > g) {
            g = j - i
        }
    }
    if (f - h > e || h < d) {
        d = h
    } else {
        if (f - e > d) {
            d = f - e
        }
    }
    scrollTo(g, d)
}

function g_setTextNodes(c, b) {
    if (c.nodeType == 3) {
        c.nodeValue = b
    } else {
        for (var a = 0; a < c.childNodes.length; ++a) {
            g_setTextNodes(c.childNodes[a], b)
        }
    }
}

function g_getTextContent(c) {
    var a = "";
    for (var b = 0; b < c.childNodes.length; ++b) {
        if (c.childNodes[b].nodeValue) {
            a += c.childNodes[b].nodeValue
        } else {
            if (c.childNodes[b].nodeName == "BR") {
                if (Browser.ie) {
                    a += "\r"
                } else {
                    a += "\n"
                }
            }
        }
        a += g_getTextContent(c.childNodes[b])
    }
    return a
}

function g_setSelectedLink(c, b) {
    if (!g_setSelectedLink.groups) {
        g_setSelectedLink.groups = {}
    }
    var a = g_setSelectedLink.groups;
    if (a[b]) {
        a[b].className = a[b].className.replace("selected", "")
    }
    c.className += " selected";
    a[b] = c
}

function g_toggleDisplay(a) {
    if (a.style.display == "none") {
        a.style.display = "";
        return true
    } else {
        a.style.display = "none";
        return false
    }
}

function g_enableScroll(a) {
    if (!a) {
        aE(document, "mousewheel", g_enableScroll.F);
        aE(window, "DOMMouseScroll", g_enableScroll.F)
    } else {
        dE(document, "mousewheel", g_enableScroll.F);
        dE(window, "DOMMouseScroll", g_enableScroll.F)
    }
}
g_enableScroll.F = function (a) {
    if (a.stopPropagation) {
        a.stopPropagation()
    }
    if (a.preventDefault) {
        a.preventDefault()
    }
    a.returnValue = false;
    a.cancelBubble = true;
    return false
};

function g_getGets() {
    if (g_getGets.C != null) {
        return g_getGets.C
    }
    var e = {};
    if (location.search) {
        var f = decodeURIComponent(location.search.substr(1)).split("&");
        for (var c = 0, a = f.length; c < a; ++c) {
            var g = f[c].indexOf("="),
                b,
                d;
            if (g != -1) {
                b = f[c].substr(0, g);
                d = f[c].substr(g + 1)
            } else {
                b = f[c];
                d = ""
            }
            e[b] = d
        }
    }
    g_getGets.C = e;
    return e
}

function g_createRect(d, c, a, b) {
    return {
        l: d,
        t: c,
        r: d + a,
        b: c + b
    }
}

function g_intersectRect(d, c) {
    return !(d.l >= c.r || c.l >= d.r || d.t >= c.b || c.t >= d.b)
}

function g_getMajorHeading(g, f, e, c) {
    if (isNaN(f) || f < 1 || f > 6) {
        f = 2
    }
    if (isNaN(e) || e < 1 || e > 6) {
        e = f
    }
    var b = ["heading-size-" + e];
    return g_constructHeading("h" + f, g, b, c)
}
function g_getImitationHeading(f, e, c) {
    if (isNaN(e) || e < 1 || e > 6) {
        e = 2
    }
    var b = ["imitation-heading", "heading-size-" + e];
    return g_constructHeading("div", f, b, c)
}
function g_constructHeading(b, g, f, e) {
    if (typeof e != "object") {
        e = {}
    }
    if (typeof e.classes == "string") {
        f.push(e.classes)
    }
    var h = ce(b);
    h.className = f.join(" ");
    if (typeof e.styles == "string") {
        h.style = e.styles
    }
    if (typeof e.id == "string") {
        h.id = e.id
    }
    if (typeof g == "string") {
        h.innerHTML = g
    } else {
        if (g.nodeType === 1 || g.nodeType === 3) {
            h.appendChild(g)
        } else {
            $(h).append(g)
        }
    }
    if (e.asString) {
        var c = ce("div");
        ae(c, h);
        return c.innerHTML
    }
    return h
}
function g_createRange(c, a) {
    range = {};
    for (var b = c; b <= a; ++b) {
        range[b] = b
    }
    return range
}

function g_sortIdArray(a, b, c) {
    a.sort(c ?
        function (e, d) {
            return strcmp(b[e][c], b[d][c])
        } : function (e, d) {
            return strcmp(b[e], b[d])
        })
}

function g_sortJsonArray(e, d, f, a) {
    var c = [];
    for (var b in e) {
        if (d[b] && (a == null || a(d[b]))) {
            c.push(b)
        }
    }
    if (f != null) {
        c.sort(f)
    } else {
        g_sortIdArray(c, d)
    }
    return c
}

function g_urlize(a, b) {
    a = str_replace(a, "'", "");
    a = trim(a);
    if (b) {
        a = str_replace(a, " ", "-")
    } else {
        a = a.replace(/[^a-z0-9]/i, "-")
    }
    a = str_replace(a, "--", "-");
    a = str_replace(a, "--", "-");
    a = rtrim(a, "-");
    a = a.toLowerCase();
    return a
}

function g_getLocale(a) {
    if (a && g_locale.id == 25) {
        return 0
    }
    return g_locale.id
}

function g_createReverseLookupJson(b) {
    var c = {};
    for (var a in b) {
        c[b[a]] = a
    }
    return c
}

function g_initHeader(c) {
    var l = ce("dl"),
        p = (c == 5);
    for (var k = 0, m = mn_path.length; k < m; ++k) {
        var g = ce("dt");
        var q = ce("a");
        var n = ce("ins");
        var h = ce("big");
        var f = ce("span");
        var o = mn_path[k][0];
        var j = (o == c);
        var e = (!j && mn_path[k][3]);
        if (p && o == 5) {
            e = true;
            mn_path[k][3] = mn_profiles
        }
        if (e) {
            q.menu = mn_path[k][3];
            q.onmouseover = Menu.show;
            q.onmouseout = Menu.hide
        } else {
            q.onmouseover = Menu._hide
        }
        if (mn_path[k][2]) {
            q.href = mn_path[k][2]
        } else {
            q.href = "javascript:;";
            ns(q);
            q.style.cursor = "default"
        }
        if (j) {
            q.className = "selected"
        }
        ae(h, ct(mn_path[k][1].charAt(0)));
        ae(n, h);
        ae(n, ct(mn_path[k][1].substr(1)));
        ae(q, n);
        ae(q, f);
        ae(g, q);
        ae(l, g)
    }
    ae(ge("ptewhjkst46"), l);
    var b = ge("kbl34h6b43");
    if (c != null && c >= 0 && c < mn_path.length) {
        switch (c) {
        case 0:
            Menu.addButtons(b, Menu.explode(mn_database));
            break;
        case 1:
            Menu.addButtons(b, mn_tools);
            break;
        case 2:
            Menu.addButtons(b, Menu.explode(mn_more));
            break;
        case 3:
            Menu.addButtons(b, Menu.explode(mn_forums));
            break;
        case 5:
            pr_initTopBarSearch();
            break
        }
    } else {
        ae(b, ct(String.fromCharCode(160)))
    }
    var r = ge("oh2345v5ks");
    var s = r.previousSibling;
    var d = r.parentNode;
    ns(s);
    s.onclick = function () {
        this.parentNode.onsubmit()
    };
    if (Browser.ie) {
        setTimeout(function () {
                r.value = ""
            },
            1)
    }
    if (r.value == "") {
        r.className = "search-database"
    }
    r.onmouseover = function () {
        if (trim(this.value) != "") {
            this.className = ""
        }
    };
    r.onfocus = function () {
        this.className = ""
    };
    r.onblur = function () {
        if (trim(this.value) == "") {
            this.className = "search-database";
            this.value = ""
        }
    };
    d.onsubmit = function () {
        var a = this.elements[0].value;
        if (trim(a) == "") {
            return false
        }
        this.submit()
    }
}

function g_initHeaderMenus() {
    var c = ge("toptabs-menu-user");
    if (c) {
        c.menu = [
            [0, LANG.userpage, "?user=" + g_user.name],
            [0, LANG.settings, "?account"],
            [0, LANG.signout, "?account=signout"]
        ];
        if (location.href.match(new RegExp("?user=" + g_user.name + "$", "i"))) {
            c.menu[0].checked = 1
        } else {
            if (location.href.indexOf("?account") != -1) {
                c.menu[1].checked = 1
            }
        }
        c.onmouseover = Menu.show;
        c.onmouseout = Menu.hide;
        c.href = "?user=" + g_user.name
    }
    c = ge("toptabs-menu-profiles");
    if (c) {
        c.menu = [];
        if (g_user.characters) {
            c.menu.push([, LANG.tab_characters]);
            for (var f = 0, b = g_user.characters.length; f < b; ++f) {
                var h = g_user.characters[f],
                    e = [0, h.name + " (" + h.realmname + LANG.hyphen + h.region.toUpperCase() + ")", "?profile=" + h.region + "." + h.realm + "." + g_cleanCharacterName(h.name)];
                e.smallIcon = h.icon ? h.icon : "chr_" + g_file_races[h.race] + "_" + g_file_genders[h.gender] + "_" + g_file_classes[h.classs] + "0" + (h.level > 59 ? (Math.floor((h.level - 60) / 10) + 2) : 1);
                c.menu.push(e)
            }
        }
        c.menu.push([, LANG.tab_profiles]);
        if (g_user.profiles) {
            for (var f = 0, b = g_user.profiles.length; f < b; ++f) {
                var h = g_user.profiles[f],
                    e = [0, h.name, "?profile=" + h.id];
                e.smallIcon = h.icon ? h.icon : "chr_" + g_file_races[h.race] + "_" + g_file_genders[h.gender] + "_" + g_file_classes[h.classs] + "0" + (h.level > 59 ? (Math.floor((h.level - 60) / 10) + 2) : 1);
                c.menu.push(e)
            }
        }
        var e = [0, "(" + LANG.button_new + ")", "?profile&new"];
        e.smallIcon = "inv_misc_questionmark";
        c.menu.push(e);
        c.menu.rightAligned = 1;
        c.onmouseover = Menu.show;
        c.onmouseout = Menu.hide;
        c.href = "?user=" + g_user.name + "#profiles"
    }
    c = ge("toptabs-menu-language");
    if (c) {
        var g = "www",
            d = location.href,
            j = location.hostname.indexOf(".");
        if (j != -1 && j <= 5) {
            g = location.hostname.substr(0, j)
        }
        j = d.indexOf("#");
        if (j != -1) {
            d = d.substr(0, j)
        }
        c.menu = [
            [1, "English", (g_locale.id != 0 ? "?locale=0" : null)],
            [2, "Magyar", (g_locale.id != 8 ? "?locale=8" : null)]
        ];
        c.menu.rightAligned = 1;
        if (g_locale.id != 25) {
            c.menu[{
                0: 0,
                8: 1
            }[g_locale.id]].checked = 1
        }
        c.onmouseover = Menu.show;
        c.onmouseout = Menu.hide
    }
}

function g_initPath(p, f) {
    var h = mn_path,
        c = null,
        k = null,
        o = 0,
        l = ge("main-precontents"),
        n = ce("div");
    ee(l);
    if (g_initPath.lastIt) {
        g_initPath.lastIt.checked = null
    }
    n.className = "path";
    if (f != null) {
        var m = ce("div");
        m.className = "path-right";
        var q = ce("a");
        q.href = "javascript:;";
        q.id = "fi_toggle";
        ns(q);
        q.onclick = fi_toggle;
        if (f) {
            q.className = "disclosure-on";
            ae(q, ct(LANG.fihide))
        } else {
            q.className = "disclosure-off";
            ae(q, ct(LANG.fishow))
        }
        ae(m, q);
        ae(l, m)
    }
    for (var g = 0; g < p.length; ++g) {
        var q, b, r = 0;
        for (var e = 0; e < h.length; ++e) {
            if (h[e][0] == p[g]) {
                r = 1;
                h = h[e];
                h.checked = 1;
                break
            }
        }
        if (!r) {
            o = 1;
            break
        }
        q = ce("a");
        b = ce("span");
        if (h[2]) {
            q.href = h[2]
        } else {
            q.href = "javascript:;";
            ns(q);
            q.style.textDecoration = "none";
            q.style.color = "white";
            q.style.cursor = "default"
        }
        if (g < p.length - 1 && h[3]) {
            b.className = "menuarrow"
        }
        ae(q, ct(h[1]));
        if (g == 0) {
            q.menu = mn_path
        } else {
            q.menu = c[3]
        }
        q.onmouseover = Menu.show;
        q.onmouseout = Menu.hide;
        ae(b, q);
        ae(n, b);
        k = b;
        c = h;
        h = h[3];
        if (!h) {
            o = 1;
            break
        }
    }
    if (o && k) {
        k.className = ""
    } else {
        if (c && c[3]) {
            k.className = "menuarrow";
            q = ce("a");
            b = ce("span");
            q.href = "javascript:;";
            ns(q);
            q.style.textDecoration = "none";
            q.style.paddingRight = "16px";
            q.style.color = "white";
            q.style.cursor = "default";
            ae(q, ct("..."));
            q.menu = c[3];
            q.onmouseover = Menu.show;
            q.onmouseout = Menu.hide;
            ae(b, q);
            ae(n, b)
        }
    }
    var m = ce("div");
    m.className = "clear";
    ae(n, m);
    ae(l, n);
    g_initPath.lastIt = c
}

function g_formatTimeElapsed(e) {
    function c(m, l, i) {
        if (i && LANG.timeunitsab[l] == "") {
            i = 0
        }
        if (i) {
            return m + " " + LANG.timeunitsab[l]
        } else {
            return m + " " + (m == 1 ? LANG.timeunitssg[l] : LANG.timeunitspl[l])
        }
    }
    var g = [31557600, 2629800, 604800, 86400, 3600, 60, 1];
    var a = [1, 3, 3, -1, 5, -1, -1];
    e = Math.max(e, 1);
    for (var f = 3, h = g.length; f < h; ++f) {
        if (e >= g[f]) {
            var d = f;
            var k = Math.floor(e / g[d]);
            if (a[d] != -1) {
                var b = a[d];
                e %= g[d];
                var j = Math.floor(e / g[b]);
                if (j > 0) {
                    return c(k, d, 1) + " " + c(j, b, 1)
                }
            }
            return c(k, d, 0)
        }
    }
    return "(n/a)"
}

function g_formatDateSimple(g, c) {
    function a(b) {
        return (b < 10 ? "0" + b : b)
    }
    var i = "",
        j = g.getDate(),
        f = g.getMonth() + 1,
        h = g.getFullYear();
    i += sprintf(LANG.date_simple, a(j), a(f), h);
    if (c == 1) {
        var k = g.getHours() + 1,
            e = g.getMinutes() + 1;
        i += LANG.date_at + a(k) + ":" + a(e)
    }
    return i
}

function g_cleanCharacterName(e) {
    var d = "";
    for (var c = 0, a = e.length; c < a; ++c) {
        var b = e.charAt(c).toLowerCase();
        if (b >= "a" && b <= "z") {
            d += b
        } else {
            d += e.charAt(c)
        }
    }
    return d
}

function g_createGlow(a, h) {
    var e = ce("span");
    for (var c = -1; c <= 1; ++c) {
        for (var b = -1; b <= 1; ++b) {
            var g = ce("div");
            g.style.position = "absolute";
            g.style.whiteSpace = "nowrap";
            g.style.left = c + "px";
            g.style.top = b + "px";
            if (c == 0 && b == 0) {
                g.style.zIndex = 4
            } else {
                g.style.color = "black";
                g.style.zIndex = 2
            }
            ae(g, ct(a));
            ae(e, g)
        }
    }
    e.style.position = "relative";
    e.className = "glow" + (h != null ? " " + h : "");
    var f = ce("span");
    f.style.visibility = "hidden";
    ae(f, ct(a));
    ae(e, f);
    return e
}

function g_createProgressBar(c) {
    if (c == null) {
        c = {}
    }
    if (!c.text) {
        c.text = " "
    }
    if (c.color == null) {
        c.color = "rep0"
    }
    if (c.width == null) {
        c.width = 100
    }
    var d, e;
    if (c.hoverText) {
        d = ce("a");
        d.href = "javascript:;"
    } else {
        d = ce("span")
    }
    d.className = "progressbar";
    if (c.text || c.hoverText) {
        e = ce("div");
        e.className = "progressbar-text";
        if (c.text) {
            var a = ce("del");
            ae(a, ct(c.text));
            ae(e, a)
        }
        if (c.hoverText) {
            var b = ce("ins");
            ae(b, ct(c.hoverText));
            ae(e, b)
        }
        ae(d, e)
    }
    e = ce("div");
    e.className = "progressbar-" + c.color;
    e.style.width = c.width + "%";
    ae(e, ct(String.fromCharCode(160)));
    ae(d, e);
    return d
}

function g_createReputationBar(g) {
    var f = g_createReputationBar.P;
    if (!g) {
        g = 0
    }
    g += 42000;
    if (g < 0) {
        g = 0
    } else {
        if (g > 84999) {
            g = 84999
        }
    }
    var e = g,
        h, b = 0;
    for (var d = 0, a = f.length; d < a; ++d) {
        if (f[d] > e) {
            break
        }
        if (d < a - 1) {
            e -= f[d];
            b = d + 1
        }
    }
    h = f[b];
    var c = {
        text: g_reputation_standings[b],
        hoverText: e + " / " + h,
        color: "rep" + b,
        width: parseInt(e / h * 100)
    };
    return g_createProgressBar(c)
}
g_createReputationBar.P = [36000, 3000, 3000, 3000, 6000, 12000, 21000, 999];

function g_createAchievementBar(a, c) {
    if (!a) {
        a = 0
    }
    var b = {
        text: a + (c > 0 ? " / " + c : ""),
        color: (c > 700 ? "rep7" : "ach" + (c > 0 ? 0 : 1)),
        width: (c > 0 ? parseInt(a / c * 100) : 100)
    };
    return g_createProgressBar(b)
}

function g_createCaptcha(c) {
    var b = ce("a");
    b.href = "javascript:;";
    b.className = "captcha";
    b.title = LANG.tooltip_captcha;
    if (c & 1) {
        b.style.marginLeft = b.style.marginRight = "auto"
    }
    if (Browser.ie6) {
        var d = ce("img");
        d.src = "?captcha&foo=" + Math.random();
        ae(b, d);
        b.onclick = function () {
            de(this.firstChild);
            var a = ce("img");
            a.src = "?captcha&foo=" + Math.random();
            ae(b, a);
            this.blur()
        }
    } else {
        b.style.backgroundImage = "url(?captcha&foo=" + Math.random() + ")";
        b.onclick = function () {
            this.style.backgroundImage = "url(?captcha&foo=" + Math.random() + ")"
        }
    }
    return b
}

function g_revealCaptcha(a) {
    if ((g_user.permissions & 1) == 0) {
        var c = ge("klrbetkjerbt46");
        if (!c.firstChild) {
            var b = g_createCaptcha(a);
            ae(c, b);
            c.parentNode.style.display = ""
        }
    }
}

function g_convertRatingToPercent(b, e, j, a) {
    var g = {12:1.5,13:20.7,14:20.7,15:6.9,16:8,17:8,18:8,19:14,20:14,21:14,25:9.29154,26:9.29154,27:9.29154,28:10,29:10,30:10,31:8,32:14,34:9.29154,35:9.29154,36:10,37:8,44:0.929154,49:14,57:12.0214},
        f = {80:3.2789989471436,81:4.3056015014648,82:5.6539749145508,83:7.4275451660156,84:9.7527236938477,85:12.8057174456713,86:16.2,87:20.8,88:26.4,89:33.6,90:42.5},
        h = {12:[4.9185,6.4584,8.48096,11.1413,14.6291,19.2086,24,31,40,50,65],13:[67.8753,89.126,117.037,153.75,201.881,265.078,335,430,545,700,885],14:[67.8753,89.126,117.037,153.75,201.881,265.078,335,430,545,700,885],15:[22.6251,29.7087,39.0124,51.2501,67.2938,88.3594,112,143,182,233,295],16:[26.232,34.4448,45.2318,59.4204,78.0218,102.446,130,166,211,269,340],17:[26.232,34.4448,45.2318,59.4204,78.0218,102.446,130,166,211,269,340],18:[26.232,34.4448,45.2318,59.4204,78.0218,102.446,130,166,211,269,340],19:[45.906,60.2784,79.1556,103.986,136.538,179.28,228,290,370,470,600],20:[45.906,60.2784,79.1556,103.986,136.538,179.28,228,290,370,470,600],21:[45.906,60.2784,79.1556,103.986,136.538,179.28,228,290,370,470,600],25:[30.467,38.0293,47.4688,59.2512,73.9583,92.3158,115,150,190,245,310],26:[30.467,38.0293,47.4688,59.2512,73.9583,92.3158,115,150,190,245,310],27:[30.467,38.0293,47.4688,59.2512,73.9583,92.3158,115,150,190,245,310],28:[32.79,43.056,56.5397,74.2755,97.5272,128.057,162,208,264,336,425],29:[32.79,43.056,56.5397,74.2755,97.5272,128.057,162,208,264,336,425],30:[32.79,43.056,56.5397,74.2755,97.5272,128.057,162,208,264,336,425],31:[26.232,34.4448,45.2318,59.4204,78.0218,102.446,130,166,211,269,340],32:[45.906,60.2784,79.1556,103.986,136.538,179.28,228,290,370,470,600],34:[30.467,38.0293,47.4688,59.2512,73.9583,92.3158,115,150,190,245,310],35:[30.467,38.0293,47.4688,59.2512,73.9583,92.3158,115,150,190,245,310],36:[32.79,43.056,56.5397,74.2755,97.5272,128.057,162,208,264,336,425],37:[26.232,34.4448,45.2318,59.4204,78.0218,102.446,130,166,211,269,340],49:[45.906,60.2784,79.1556,103.986,136.538,179.28,228,290,370,470,600],57:[39.4182,49.2023,61.4151,76.6593,95.6872,119.438,150,195,245,315,400]};

    if (b < 0) {
        b = 1
    } else {
        if (b > 90) {
            b = 90
        }
    }
    if ((e == 12 || e == 13 || e == 14 || e == 15) && b < 34) {
        b = 34
    }
    if ((e == 28 || e == 36) && (a == 2 || a == 6 || a == 7 || a == 11)) {
        g[e] /= 1.3
    }
    if (j < 0) {
        j = 0
    }
    if (h && h[e] && (b >= 80) && (b - 80 < h[e].length)) {
        return (j / h[e][b - 80]) * (e == 36 && a == 1 ? 1.5 : 1)
    }
    var c;
    if (!g || g[e] == null) {
        c = 0
    } else {
        var k;
        if (b > 80) {
            k = f[b]
        } else {
            if (b > 70) {
                k = (82 / 52) * Math.pow((131 / 63), ((b - 70) / 10))
            } else {
                if (b > 60) {
                    k = (82 / (262 - 3 * b))
                } else {
                    if (b > 10) {
                        k = ((b - 8) / 52)
                    } else {
                        k = 2 / 52
                    }
                }
            }
        }
        c = j / g[e] / k
    }
    return c
};

function g_setRatingLevel(f, e, b, c) {
    var d = prompt(sprintf(LANG.prompt_ratinglevel, 1, 90), e);
    if (d != null) {
        d |= 0;
        if (d != e && d >= 1 && d <= 90) {
            e = d;
            var a = g_convertRatingToPercent(e, b, c);
            a = (Math.round(a * 100) / 100);
            if (b != 12 && b != 37) {
                a += "%"
            }
            f.innerHTML = sprintf(LANG.tooltip_combatrating, a, e);
            f.onclick = g_setRatingLevel.bind(0, f, e, b, c)
        }
    }
}
function g_getMoneyHtml(b, j, g, c, o) {
    var m = 0
      , f = "";
    if (j == 1 || j == "alliance") {
        j = 1
    } else {
        if (j == 2 || j == "horde") {
            j = 2
        } else {
            j = 3
        }
    }
    if (b >= 10000) {
        m = 1;
        var k = Math.floor(b / 10000);
        f += '<span class="moneygold">' + number_format(k) + "</span>";
        b %= 10000
    }
    if (b >= 100) {
        if (m) {
            f += " "
        } else {
            m = 1
        }
        var k = Math.floor(b / 100);
        f += '<span class="moneysilver">' + k + "</span>";
        b %= 100
    }
    if (b >= 1) {
        if (m) {
            f += " "
        } else {
            m = 1
        }
        f += '<span class="moneycopper">' + b + "</span>"
    }
    if (g != null ) {
        for (var e = 0; e < g.length; ++e) {
            if (m) {
                f += " "
            } else {
                m = 1
            }
            var p = g[e][0];
            var h = g[e][1];
            var l = (g_items[p] && g_items[p].icon ? g_items[p].icon : "inv_misc_questionmark");
            f += '<a href="?item=' + p + '" class="moneyitem" style="background-image: url(' + g_staticUrl + "/images/icons/tiny/" + l.toLowerCase() + '.png)">' + h + "</a>"
        }
    }
    if (c != null ) {
        for (var e = 0; e < c.length; ++e) {
            if (m) {
                f += " "
            } else {
                m = 1
            }
            var n = c[e][0];
            var h = c[e][1];
            var l = (g_gatheredcurrencies[n] && g_gatheredcurrencies[n].icon ? g_gatheredcurrencies[n].icon : ["inv_misc_questionmark", "inv_misc_questionmark"]);
            if (j == 3 && l[0] == l[1]) {
                j = 1
            }
            f += '<a href="?currency=' + n + '" class="icontinyr tip q1" onmouseover="Listview.funcBox.moneyCurrencyOver(' + n + ", " + h + ', event)" onmousemove="Tooltip.cursorUpdate(event)" onmouseout="Tooltip.hide()" style="background-image: url(' + g_staticUrl + "/images/icons/tiny/" + l[(j == 3 ? 1 : j - 1)].toLowerCase() + '.png)">' + (j == 3 ? '<span class="icontinyr" style="background-image: url(' + g_staticUrl + "/images/icons/tiny/" + l[0].toLowerCase() + '.png)">' : "") + h + (j == 3 ? "</span>" : "") + "</a>"
        }
    }
    if (o > 0) {
        if (m) {
            f += " "
        } else {
            m = 1
        }
        f += '<span class="moneyachievement tip" onmouseover="Listview.funcBox.moneyAchievementOver(event)" onmousemove="Tooltip.cursorUpdate(event)" onmouseout="Tooltip.hide()">' + number_format(o) + "</span>"
    }
    return f
}

function g_getPatchVersion(e) {
    var d = g_getPatchVersion;
    var b = 0,
        c = d.T.length - 2,
        a;
    while (c > b) {
        a = Math.floor((c + b) / 2);
        if (e >= d.T[a] && e < d.T[a + 1]) {
            return d.V[a]
        }
        if (e >= d.T[a]) {
            b = a + 1
        } else {
            c = a - 1
        }
    }
    a = Math.ceil((c + b) / 2);
    return d.V[a]
}
//g_getPatchVersion.V=["1.12.0","1.12.1","1.12.2","2.0.1","2.0.3","2.0.4","2.0.5","2.0.6","2.0.7","2.0.8","2.0.10","2.0.12","2.1.0","2.1.1","2.1.2","2.1.3","2.2.0","2.2.2","2.2.3","2.3.0","2.3.2","2.3.3","2.4.0","2.4.1","2.4.2","2.4.3","3.0.2","3.0.3","3.0.8","3.0.9","3.2.2","3.3.2","???"];
//g_getPatchVersion.T=[1153540800000,1159243200000,1160712000000,1165294800000,1168318800000,1168578000000,1168750800000,1169528400000,1171342800000,1171602000000,1173157200000,1175572800000,1179806400000,1181016000000,1182225600000,1184040000000,1190692800000,1191297600000,1191902400000,1194930000000,1199768400000,1200978000000,1206417600000,1207022400000,1210651200000,1216094400000,1223956800000,1225774800000,1232427600000,1234242000000,1259215200000,1269471600000,9999999999999]; //1239681600000,1240286400000,9999999999999];
g_getPatchVersion.V = ["2.0.12", "2.3.3", "2.4.1", "2.4.2", "2.4.3", "3.0.3", "3.0.8", "3.0.9", "3.1.3", "3.2.2a", "3.3.3", "3.3.5", "3.3.5a", "4.3.4", "5.4.8", "???"];
g_getPatchVersion.T = [1177884000, 1204153200, 1209420000, 1211407200, 1232146799, 1232146800, 1252015198, 1252015199, 1252015200, 1259103600, 1287439199, 1287439200, 1287439201, 1404259200, 1482969600, 9999999999999];

function g_expandSite() {
    ge("wrapper").className = "nosidebar";
    //Ads.removeAll();
    var a = ge("topbar-expand");
    if (a) {
        de(a)
    }
    a = ge("sidebar");
    if (a) {
        de(a)
    }
}

function g_insertTag(d, a, i, j) {
    var b = $_(d);
    b.focus();
    if (b.selectionStart != null) {
        var l = b.selectionStart,
            h = b.selectionEnd,
            k = b.scrollLeft,
            c = b.scrollTop;
        var g = b.value.substring(l, h);
        if (typeof j == "function") {
            g = j(g)
        }
        b.value = b.value.substr(0, l) + a + g + i + b.value.substr(h);
        b.selectionStart = b.selectionEnd = h + a.length;
        b.scrollLeft = k;
        b.scrollTop = c
    } else {
        if (document.selection && document.selection.createRange) {
            var f = document.selection.createRange();
            if (f.parentElement() != b) {
                return
            }
            var g = f.text;
            if (typeof j == "function") {
                g = j(g)
            }
            f.text = a + g + i
        }
    }
    if (b.onkeyup) {
        b.onkeyup()
    }
}

function g_getLocaleFromDomain(a) {
    var c = g_getLocaleFromDomain.L;
    if (a) {
        var b = a.indexOf(".");
        if (b != -1) {
            a = a.substring(0, b)
        }
    }
    return (c[a] ? c[a] : 0)
}
g_getLocaleFromDomain.L = {
    fr: 2,
    de: 3,
    es: 6,
    ru: 7,
    ptr: 25
};

function g_getDomainFromLocale(a) {
    var b;
    if (g_getDomainFromLocale.L) {
        b = g_getDomainFromLocale.L
    } else {
        b = g_getDomainFromLocale.L = g_createReverseLookupJson(g_getLocaleFromDomain.L)
    }
    return (b[a] ? b[a] : "www")
}

function g_getIdFromTypeName(a) {
    var b = g_getIdFromTypeName.L;
    return (b[a] ? b[a] : -1)
}
g_getIdFromTypeName.L = {
    npc: 1,
    object: 2,
    item: 3,
    itemset: 4,
    quest: 5,
    spell: 6,
    zone: 7,
    faction: 8,
    pet: 9,
    achievement: 10,
    currency: 11,
    holiday: 12,
    profile: 100,
    "pet-ability": 200
};

function g_getIngameLink(a, c, b) {
    prompt(LANG.prompt_ingamelink, '/script DEFAULT_CHAT_FRAME:AddMessage("' + sprintf(LANG.message_ingamelink, "\\124c" + a + "\\124H" + c + "\\124h[" + b + ']\\124h\\124r");'))
}

function g_isEmailValid(a) {
    return a.match(/^([a-z0-9._-]+)(\+[a-z0-9._-]+)?(@[a-z0-9.-]+\.[a-z]{2,4})$/i) != null
}

function g_onAfterTyping(a, d, c) {
    var e;
    var b = function () {
        if (e) {
            clearTimeout(e);
            e = null
        }
        e = setTimeout(d, c)
    };
    a.onkeyup = b
}

function g_onClick(c, d) {
    var b = 0;

    function a(e) {
        if (b) {
            if (b != e) {
                return
            }
        } else {
            b = e
        }
        d(true)
    }
    c.oncontextmenu = function () {
        a(1);
        return false
    };
    c.onmouseup = function (f) {
        f = $E(f);
        if (f._button == 3 || f.shiftKey || f.ctrlKey) {
            a(2)
        } else {
            if (f._button == 1) {
                d(false)
            }
        }
        return false
    }
}

function g_createOrRegex(c) {
    var e = c.split(" "),
        d = "";
    for (var b = 0, a = e.length; b < a; ++b) {
        if (b > 0) {
            d += "|"
        }
        d += e[b]
    }
    return new RegExp("(" + d + ")", "gi")
}

function g_addPages(l, b) {
    function o(q, d) {
        var i;
        if (q == b.page) {
            i = ce("span");
            i.className = "selected"
        } else {
            i = ce("a");
            i.href = (q > 1 ? b.url + b.sep + q + b.pound : b.url + b.pound)
        }
        ae(i, ct(d != null ? d : q));
        return i
    }
    if (!b.pound) {
        b.pound = ""
    }
    if (!b.sep) {
        b.sep = "."
    }
    if (b.allOrNothing && b.nPages <= 1) {
        return
    }
    var c = (b.align && b.align == "left");
    var e = ce("div"),
        k,
        p = ce("var");
    e.className = "pages";
    if (c) {
        e.className += " pages-left"
    }
    if (b.nPages > 1) {
        k = ce("div");
        k.className = "pages-numbers";
        var n = Math.max(2, b.page - 3);
        var h = Math.min(b.nPages - 1, b.page + 3);
        var m = [];
        if (b.page != b.nPages) {
            m.push(o(b.page + 1, LANG.lvpage_next + String.fromCharCode(8250)))
        }
        m.push(o(b.nPages));
        if (h < b.nPages - 1) {
            var a = ce("span");
            ae(a, ct("..."));
            m.push(a)
        }
        for (var g = h; g >= n; --g) {
            m.push(o(g))
        }
        if (n > 2) {
            var a = ce("span");
            ae(a, ct("..."));
            m.push(a)
        }
        m.push(o(1));
        if (b.page != 1) {
            m.push(o(b.page - 1, String.fromCharCode(8249) + LANG.lvpage_previous))
        }
        if (c) {
            m.reverse()
        }
        for (var g = 0, j = m.length; g < j; ++g) {
            ae(k, m[g])
        }
        k.firstChild.style.marginRight = "0";
        k.lastChild.style.marginLeft = "0"
    }
    var p = ce("var");
    ae(p, ct(sprintf(LANG[b.wording[b.nItems == 1 ? 0 : 1]], b.nItems)));
    if (b.nPages > 1) {
        var a = ce("span");
        ae(a, ct(String.fromCharCode(8211)));
        ae(p, a);
        var f = ce("a");
        f.className = "gotopage";
        f.href = "javascript:;";
        ns(f);
        if (Browser.ie) {
            ae(f, ct(" "))
        }
        f.onclick = function () {
            var d = prompt(sprintf(LANG.prompt_gotopage, 1, b.nPages), b.page);
            if (d != null) {
                d |= 0;
                if (d != b.page && d >= 1 && d <= b.nPages) {
                    document.location.href = (d > 1 ? b.url + b.sep + d + b.pound : b.url + b.pound)
                }
            }
        };
        f.onmouseover = function (d) {
            Tooltip.showAtCursor(d, LANG.tooltip_gotopage, 0, 0, "q")
        };
        f.onmousemove = Tooltip.cursorUpdate;
        f.onmouseout = Tooltip.hide;
        ae(p, f)
    }
    if (c) {
        ae(e, p);
        if (k) {
            ae(e, k)
        }
    } else {
        if (k) {
            ae(e, k)
        }
        ae(e, p)
    }
    ae(l, e)
}

function g_disclose(a, b) {
    b.className = "disclosure-" + (g_toggleDisplay(a) ? "on" : "off");
    return false
}

function co_addYourComment() {
    tabsContribute.focus(0);
    var a = gE(document.forms.addcomment, "textarea")[0];
    a.focus()
}

function co_cancelReply() {
    ge("replybox-generic").style.display = "none";
    document.forms.addcomment.elements.replyto.value = ""
}

function co_validateForm(b) {
    if (g_user.id == 0) {
        MessageBox(0, LANG.postlogin_tip);
        return false
    }

    var a = gE(b, "textarea")[0];
    if (Listview.funcBox.coValidate(a)) {
        if (g_user.permissions & 1) {
            return true
        }
        if (b.elements.captcha.value.length == 5) {
            return true
        } else {
            alert(LANG.message_codenotentered);
            b.elements.captcha.focus()
        }
    }
    return false
}

function ss_submitAScreenshot() {
    tabsContribute.focus(1)
}

function ss_validateForm(a) {
    if (!a.elements.screenshotfile.value.length) {
        alert(LANG.message_noscreenshot);
        return false
    }
    return true
}

function ss_appendSticky() {
    /*var m = ge("infobox-sticky");
    var i = g_pageInfo.type;
    var h = g_pageInfo.typeId;
    var k = in_array(lv_screenshots, 1, function (a) {
        return a.sticky
    });
    if (k != -1) {
        var c = lv_screenshots[k];
        var l = ce("a");
        l.href = "#screenshots:id=" + c.id;
        l.onclick = function (a) {
            ScreenshotViewer.show({
                screenshots: lv_screenshots,
                pos: k
            });
            return rf2(a)
        };
        var f = ce("img"),
            e = Math.min(150 / c.width, 150 / c.height);
        f.src = "http://static.wowhead.com/uploads/screenshots/thumb/" + c.id + ".png";
        f.className = "border";
        ae(l, f);
        ae(m, l);
        var g = ce("div");
        var n = ce("small");
        l = ce("a");
        if (g_user.id > 0) {
            l.href = "javascript:;";
            l.onclick = ss_submitAScreenshot
        } else {
            l.href = "?account=signin"
        }
        ae(l, ct(LANG.infobox_submitone));
        ae(n, l);
        ae(n, ct(" " + String.fromCharCode(160)));
        var j = ce("b");
        ae(j, ct("|"));
        ae(n, j);
        ae(n, ct(String.fromCharCode(160) + " "));
        l = ce("a");
        l.href = "javascript:;";
        l.onclick = function () {
            tabsRelated.focus(-1);
            return false
        };
        ae(l, ct(sprintf(LANG.infobox_showall, lv_screenshots.length)));
        ae(n, l);
        ae(g, n);
        ae(m, g)
    } else {
        var l;
        if (g_user.id > 0) {
            l = '<a href="javascript:;" onclick="ss_submitAScreenshot(); return false">'
        } else {
            l = '<a href="?account=signin">'
        }
        m.innerHTML = sprintf(LANG.infobox_noneyet, l + LANG.infobox_submitone + "</a>")
    }*/
}

function ss_appendStickyId(id) {
    var m = ge(id);
    var i = g_pageInfo.type;
    var h = g_pageInfo.typeId;
    var k = in_array(lv_screenshots, 1, function (a) {
        return a.sticky
    });
    if (k != -1) {
        var c = lv_screenshots[k];
        var l = ce("a");
        l.href = "#screenshots:id=" + c.id;
        l.onclick = function (a) {
            ScreenshotViewer.show({
                screenshots: lv_screenshots,
                pos: k
            });
            return rf2(a)
        };
        var f = ce("img"),
            e = Math.min(150 / c.width, 150 / c.height);
        f.src = "http://static.wowhead.com/uploads/screenshots/thumb/" + c.id + ".png";
        f.className = "border";
        ae(l, f);
        ae(m, l);
        var g = ce("div");
        var n = ce("small");
        l = ce("a");
        if (g_user.id > 0) {
            l.href = "javascript:;";
            l.onclick = ss_submitAScreenshot
        } else {
            l.href = "?account=signin"
        }
        ae(l, ct(LANG.infobox_submitone));
        ae(n, l);
        ae(n, ct(" " + String.fromCharCode(160)));
        var j = ce("b");
        ae(j, ct("|"));
        ae(n, j);
        ae(n, ct(String.fromCharCode(160) + " "));
        l = ce("a");
        l.href = "javascript:;";
        l.onclick = function () {
            tabsRelated.focus(-1);
            return false
        };
        ae(l, ct(sprintf(LANG.infobox_showall, lv_screenshots.length)));
        ae(n, l);
        ae(g, n);
        ae(m, g)
    } else {
        var l;
        if (g_user.id > 0) {
            l = '<a href="javascript:;" onclick="ss_submitAScreenshot(); return false">'
        } else {
            l = '<a href="?account=signin">'
        }
        m.innerHTML = sprintf(LANG.infobox_noneyet, l + LANG.infobox_submitone + "</a>")
    }
}

function su_addToSaved(b, a) {
    if (!b) {
        return
    }
    var d = gc("compare_groups"),
        c = "?compare";
    if (!d || confirm(LANG.confirm_addtosaved)) {
        if (d) {
            b = d + ";" + b
        }
        sc("compare_groups", 20, b, "/", ".wowhead.com")
    } else {
        c += "=" + b
    }
    if (a) {
        window.open(c)
    } else {
        location.href = c
    }
}

function Ajax(b, c) {
    if (!b) {
        return
    }
    var a;
    try {
        a = new XMLHttpRequest()
    } catch (d) {
        try {
            a = new ActiveXObject("Msxml2.XMLHTTP")
        } catch (d) {
            try {
                a = new ActiveXObject("Microsoft.XMLHTTP")
            } catch (d) {
                if (window.createRequest) {
                    a = window.createRequest()
                } else {
                    alert(LANG.message_ajaxnotsupported);
                    return
                }
            }
        }
    }
    this.request = a;
    cO(this, c);
    this.method = this.method || (this.params && "POST") || "GET";
    a.open(this.method, b, this.async == null ? true : this.async);
    a.onreadystatechange = Ajax.onReadyStateChange.bind(this);
    if (this.method.toUpperCase() == "POST") {
        a.setRequestHeader("Content-Type", (this.contentType || "application/x-www-form-urlencoded") + "; charset=" + (this.encoding || "UTF-8"))
    }
    a.send(this.params)
}
Ajax.onReadyStateChange = function () {
    if (this.request.readyState == 4) {
        if (this.request.status == 0 || (this.request.status >= 200 && this.request.status < 300)) {
            this.onSuccess != null && this.onSuccess(this.request, this)
        } else {
            this.onFailure != null && this.onFailure(this.request, this)
        }
        if (this.onComplete != null) {
            this.onComplete(this.request, this)
        }
    }
};

function g_ajaxIshRequest(b) {
    var c = document.getElementsByTagName("head")[0],
        a = g_getGets();
    if (a.refresh != null) {
        b += "&refresh"
    }
    ae(c, ce("script", {
        type: "text/javascript",
        src: b
    }))
}
var Menu = {
    iframes: [],
    divs: [],
    selection: [],
    show: function () {
        try {
            clearTimeout(Menu.timer);
            if (Menu.currentLink) {
                Menu._show(this)
            } else {
                if (this.className.indexOf("open") == -1) {
                    this.className += " open"
                }
                Menu.timer = setTimeout(Menu._show.bind(0, this), 100)
            }
        } catch (a) {}
    },
    _show: function (b) {
        if (Menu.currentLink != b) {
            var a = ac(b);
            Menu._hide();
            Menu.selection = [-1];
            Menu.currentLink = b;
            Menu.showDepth(0, b.menu, a[0], a[1] + b.offsetHeight + 1, b.offsetHeight + 8, b.offsetWidth, a[1], false);
            if (b.className.indexOf("open") == -1) {
                b.className += " open"
            }
        } else {
            Menu.truncate(0);
            Menu.clean(0)
        }
    },
    showAtCursor: function (b, a, d) {
        clearTimeout(Menu.timer);
        Menu._hide();
        Menu.selection = [-1];
        Menu.currentLink = null;
        if (!(a && d)) {
            b = $E(b);
            var c = g_getCursorPos(b);
            a = c.x;
            d = c.y
        }
        if (Browser.ie6) {
            a -= 2;
            d -= 2
        }
        Menu.showDepth(0, this.menu, a, d, 0, 0, 0, true)
    },
    hide: function () {
        try {
            clearTimeout(Menu.timer);
            if (Menu.currentLink) {
                Menu.timer = setTimeout(Menu._hide, 333)
            } else {
                this.className = this.className.replace("open", "")
            }
        } catch (a) {}
    },
    _hide: function () {
        for (var b = 0, a = Menu.selection.length; b < a; ++b) {
            Menu.divs[b].style.display = "none";
            Menu.divs[b].style.visibility = "hidden";
            if (Browser.ie6) {
                Menu.iframes[b].style.display = "none"
            }
        }
        Menu.selection = [];
        if (Menu.currentLink) {
            Menu.currentLink.className = Menu.currentLink.className.replace("open", "")
        }
        Menu.currentLink = null
    },
    sepOver: function () {
        var b = this.d;
        var a = b.i;
        Menu.truncate(a);
        Menu.clean(a);
        Menu.selection[a] = -1
    },
    elemOver: function () {
        var g = this.d;
        var f = g.i;
        var e = this.i;
        var a = this.k;
        var b = this.firstChild.className == "menusub";
        Menu.truncate(f + b);
        if (b && a != Menu.selection[f]) {
            var h = ac(this);
            Menu.selection[f + 1] = -1;
            Menu.showDepth(f + 1, g.menuArray[e][3], h[0], h[1] - 2, this.offsetHeight, this.offsetWidth - 3, 0, false)
        }
        Menu.clean(f);
        Menu.selection[f] = a;
        if (this.className.length) {
            this.className += " open"
        } else {
            this.className = "open"
        }
    },
    elemClick: function (a) {
        Menu._hide();
        a()
    },
    getIframe: function (a) {
        var b;
        if (Menu.iframes[a] == null) {
            b = ce("iframe");
            b.src = "javascript:0;";
            b.frameBorder = 0;
            ae(ge("layers"), b);
            Menu.iframes[a] = b
        } else {
            b = Menu.iframes[a]
        }
        return b
    },
    getDiv: function (a, b) {
        var c;
        if (Menu.divs[a] == null) {
            c = ce("div");
            c.className = "menu_old";
            ae(ge("layers"), c);
            Menu.divs[a] = c
        } else {
            c = Menu.divs[a]
        }
        c.i = a;
        c.menuArray = b;
        return c
    },
    _tauriShootShowVersion: function(url) {
        var params = window.location.href.split("?");
        return "http://" + url + "-shoot.tauri.hu" + (params[1] ? ("?" + params[1]) : "");
    },
    showDepth: function (M, c, C, B, N, F, z, v) {
        var W, T = Menu.getDiv(M, c);
        while (T.firstChild) {
            de(T.firstChild)
        }
        var u = ce("table"),
            A = ce("tbody"),
            R = ce("tr"),
            e = ce("td"),
            P = ce("div"),
            J = ce("div");
        var I = 999;
        var b = g_getWindowSize(),
            l = g_getScroll(),
            f = b.w,
            n = b.h,
            V = l.x,
            O = l.y;
        if (N > 0 && (M > 0 || c.length > 20)) {
            if ((25 + 1) * c.length > n - 25 - z) {
                for (var L = 2; L < 4; ++L) {
                    if (N / L * c.length + 30 < n - z) {
                        break
                    }
                }
                I = Math.floor(c.length / L)
            }
        }
        var r = 0;
        var K = 0;
        for (var L = 0, t = c.length; L < t; ++L) {
            var Q = c[L];
            if (Q[0] == null) {
                var q = ce("span");
                q.className = "separator";
                ns(q);
                ae(q, ct(Q[1]));
                q.d = T;
                q.onmouseover = Menu.sepOver;
                ae(J, q)
            } else {
                var U = ce("a");
                U.d = T;
                U.k = K++;
                U.i = L;
                if (Q[2]) {
                    if (Menu.currentLink && Menu.currentLink.menuappend) {
                        if (Q[2].indexOf(Menu.currentLink.menuappend) == -1) {
                            U.href = Q[2] + Menu.currentLink.menuappend
                        } else {
                            U.href = Q[2]
                        }
                    } else {
                        if (typeof Q[2] == "function") {
                            U.href = "javascript:;";
                            U.onclick = Menu.elemClick.bind(0, Q[2]);
                            ns(U)
                        } else {
                            U.href = Q[2]
                        }
                    }
                } else {
                    U.href = "javascript:;";
                    U.style.cursor = "default";
                    ns(U)
                }
                U.onmouseover = Menu.elemOver;
                var G = ce("span"),
                    S = ce("span");
                if (Q[3] != null) {
                    G.className = "menusub"
                }
                if (Q.checked) {
                    S.className = "menucheck"
                }
                if (Q.newWindow) {
                    U.target = "_blank"
                }

                if (Q[4] != null && Q[4].className) {
                    U.className = Q[4].className;
                }

                if (Q[4] != null && Q[4].versionLink) {
                    U.href = Menu._tauriShootShowVersion(Q[4].versionLink);
                    U.rel = "np";
                    U.style.cursor = "pointer";
                }

                if (Q.tinyIcon) {
                    S.style.background = "url(http://mop-static.tauri.hu/images/icons/tiny/" + Q.tinyIcon.toLowerCase() + ".png) left center no-repeat"
                } else if (Q[4] != null && Q[4].tinyIcon) {
                    S.style.background = "url(http://mop-static.tauri.hu/images/icons/tiny/" + Q[4].tinyIcon.toLowerCase() + ".png) left center no-repeat"
                } else if (Q[4] != null && Q[4].customIcon) {
                    S.style.background = "url(" + Q[4].customIcon + ") left center no-repeat"
                    S.style.backgroundSize = "15px auto";
                } else {
                    if (Q.socketColor) {
                        S.className += " socket-" + g_file_gems[Q.socketColor]
                    } else {
                        if (Q.smallIcon) {
                            U.style.padding = 0;
                            S.style.padding = "4px 18px 4px 28px";
                            S.style.background = "url(templates/wowhead/images/icon_border_small.png) left center no-repeat transparent";
                            G.style.background = "url(http://mop-static.tauri.hu/images/icons/small/" + Q.smallIcon.toLowerCase() + ".png) 4px 3px no-repeat transparent"
                        }
                    }
                }
                ae(S, ct(Q[1]));
                ae(G, S);
                ae(U, G);
                ae(J, U)
            }
            if (r++ == I) {
                P.onmouseover = Menu.divOver;
                P.onmouseout = Menu.divOut;
                ae(P, J);
                if (!Browser.ie6) {
                    var H = ce("p");
                    ae(H, ce("em"));
                    ae(H, ce("var"));
                    ae(H, ce("strong"));
                    ae(H, P);
                    ae(e, H)
                } else {
                    ae(e, P)
                }
                ae(R, e);
                e = ce("td");
                H = ce("p");
                P = ce("div");
                J = ce("div");
                r = 0
            }
        }
        P.onmouseover = Menu.divOver;
        P.onmouseout = Menu.divOut;
        P.onclick = Menu._hide;
        ae(P, J);
        if (!Browser.ie6) {
            if (I != 999) {
                var H = ce("p");
                ae(H, ce("em"));
                ae(H, ce("var"));
                ae(H, ce("strong"));
                ae(H, P);
                ae(e, H)
            } else {
                ae(T, ce("em"));
                ae(T, ce("var"));
                ae(T, ce("strong"));
                ae(e, P)
            }
        } else {
            ae(e, P)
        }
        ae(R, e);
        ae(A, R);
        ae(u, A);
        ae(T, u);
        T.style.left = T.style.top = "-2323px";
        T.style.display = "";
        var g = u.offsetWidth,
            o = u.offsetHeight,
            E = true,
            D = true;
        if (!Browser.ie6) {
            g += 5;
            o += 6
        }
        if (C + g > f + V || c.rightAligned) {
            E = false
        }
        if (E) {
            if (C + F + g > f) {
                C = Math.max(0, C - g)
            } else {
                if (M > 0) {
                    C += F
                }
            }
        } else {
            C = C + F - g;
            if (Browser.ie) {
                C -= 3
            }
        }
        if ((M > 0 || v) && B + o > n + O) {
            B = Math.max(O + 5, n + O - o)
        }
        T.style.left = C + "px";
        T.style.top = B + "px";
        if (Browser.ie6) {
            W = Menu.getIframe(M);
            W.style.left = C + "px";
            W.style.top = B + "px";
            W.style.width = g + "px";
            W.style.height = o + "px";
            W.style.display = "";
            W.style.visibility = "visible"
        }
        T.style.visibility = "visible";
        if (Browser.opera) {
            T.style.display = "none";
            T.style.display = ""
        }
    },
    divOver: function () {
        clearTimeout(Menu.timer)
    },
    divOut: function () {
        clearTimeout(Menu.timer);
        Menu.timer = setTimeout(Menu._hide, 333)
    },
    truncate: function (b) {
        var c;
        while (Menu.selection.length - 1 > b) {
            c = Menu.selection.length - 1;
            Menu.divs[c].style.display = "none";
            Menu.divs[c].style.visibility = "hidden";
            if (Browser.ie6) {
                Menu.iframes[c].style.display = "none"
            }
            Menu.selection.pop()
        }
    },
    clean: function (b) {
        for (var c = b; c < Menu.selection.length; ++c) {
            if (Menu.selection[c] != -1) {
                var e = gE(Menu.divs[c], "a")[Menu.selection[c]];
                if (e.className.indexOf("sub") != -1) {
                    e.className = "sub"
                } else {
                    $(e).removeClass("sub open")
                }
                Menu.selection[c] = -1
            }
        }
    },
    append: function (b, c) {
        b[2] += c;
        if (b[3] != null) {
            Menu._append(b[3], c)
        }
    },
    _append: function (b, d) {
        var e, g = 0;
        for (var c = 0; c < b.length; ++c) {
            var f = b[c][2].indexOf("&filter=");
            if (f != -1 && d.indexOf("&filter=") == 0) {
                d = Menu._fixCollision(b[c][2].substr(f), d)
            }
            b[c][2] += d;
            if (b[c][3]) {
                Menu._append(b[c][3], d)
            }
        }
    },
    _splitFilter: function (b) {
        var g = b.substr(8).split(";"),
            c = {};
        for (var e = 0, a = g.length; e < a; ++e) {
            var h = g[e].indexOf("="),
                d,
                f;
            if (h != -1) {
                d = g[e].substr(0, h);
                f = g[e].substr(h + 1)
            } else {
                d = g[e];
                f = ""
            }
            c[d] = f
        }
        return c
    },
    _fixCollision: function (d, a) {
        var b = Menu._splitFilter(d),
            c = Menu._splitFilter(a);
        a = "";
        for (var e in c) {
            if (!b[e] && e != "sl" && e != "cl") {
                a += ";";
                a += e + "=" + c[e]
            }
        }
        return a
    },
    fixUrls: function (g, c, e, b, f) {
        if (!f) {
            f = 0
        }
        for (var d = 0, a = g.length; d < a; ++d) {
            if (g[d][2] == null) {
                g[d][2] = c + g[d][0] + (e ? e : "")
            }
            if (g[d][3]) {
                if (b == true || (typeof b == "object" && b[f] == true)) {
                    Menu.fixUrls(g[d][3], c, e, b, f + 1)
                } else {
                    Menu.fixUrls(g[d][3], c + g[d][0] + ".", e, b, f + 1)
                }
            }
        }
    },
    addButtons: function (h, g) {
        for (var e = 0, b = g.length; e < b; ++e) {
            if (g[e][0] == null) {
                continue
            }
            var c = ce("a"),
                f = ce("span");
            var islink = typeof g[e][2] == "string" && g[e][2] != "";
            if (islink) {
                c.href = g[e][2]
            } else {
                c.href = "javascript:;";
                c.style.cursor = "default";
                c.style.textDecoration = "none";
                ns(c)
            }
            if (g[e][3] != null) {
                f.className = "menuarrowd";
                c.menu = g[e][3];
                c.onmouseover = Menu.show;
                c.onmouseout = Menu.hide
            } else {
                c.onmouseover = Menu._hide
            }

            if (g[e][4] != null && "className" in g[e][4])
                c.className = g[e][4].className;

            ae(f, ct(g[e][1]));
            ae(c, f);
            ae(h, c)
        }
    },
    addButtons_maps: function (h, g) {
        for (var e = 0, b = g.length; e < b; ++e) {
            if (g[e][0] == null) {
                continue
            }
            var c = ce("a"),
                f = ce("span");
            var islink = typeof g[e][2] == "string" && g[e][2] != "";
            if (islink) {
                c.href = g[e][2]
            } else {
                c.href = "javascript:;";
                c.style.cursor = "default";
                c.style.textDecoration = "none";
                ns(c)
            }
            if (g[e][3] != null) {
                f.className = "menuarrowd";
                c.menu = g[e][3];
                c.onmouseover = Menu.show;
                c.onmouseout = Menu.hide;
            } else {
                c.onmouseover = Menu._hide;
            }
            if (g[e][2] != null)
                c.onclick = g[e][2];
            ae(f, ct(g[e][1]));
            ae(c, f);
            ae(h, c)
        }
    },
    explode: function (f) {
        var d = [],
            e = null,
            c;
        for (var b = 0, a = f.length; b < a; ++b) {
            if (f[b][0] != null) {
                if (e != null) {
                    c.push(f[b])
                } else {
                    d.push(f[b])
                }
            }
            if (e != null && (f[b][0] == null || b == a - 1)) {
                d.push([0, e[1], , c, e[4]])
            }
            if (f[b][0] == null) {
                e = f[b];
                c = []
            }
        }
        return d
    }
};

function Tabs(a) {
    cO(this, a);
    if (this.parent) {
        this.parent = $_(this.parent)
    } else {
        return
    }
    this.oldMode = (Browser.geckoVersion > 20000000 && Browser.geckoVersion <= 20060414);
    this.selectedTab = -1;
    this.uls = [];
    this.tabs = [];
    this.nShows = 0;
    if (this.poundable == null) {
        this.poundable = 1
    }
    this.poundedTab = null;
    if (this.onLoad == null) {
        this.onLoad = Tabs.onLoad.bind(this)
    }
    if (this.onShow == null) {
        this.onShow = Tabs.onShow.bind(this)
    }
    if (this.onHide) {
        this.onHide = this.onHide.bind(this)
    }

    this.noHashChange = false;
    var thisTab = this;
    $(window).bind('hashchange', function() {
        if (thisTab.noHashChange) {
            thisTab.noHashChange = false;
            return;
        }

        $.each(thisTab.tabs, function(index, tab) {
            if (tab.id == window.location.hash.substr(1)) {
                thisTab.show(tab.index, 0);
                return false;
            }
        });
    });
}
Tabs.prototype = {
    add: function (a, d) {
        var c, b = this.tabs.length;
        c = {
            caption: a,
            index: b,
            owner: this
        };
        cO(c, d);
        this.tabs.push(c);
        return b
    },
    del: function (a) {
        if (this.tabs[a]) {
            ge("tab-" + this.tabs[a].id).style.display = "none";
            this.selectedTab = -1;
            this.uls = [];
            this.tabs.splice(a, 1);
            this.nShows = 0;
            while (this.parent.firstChild) {
                de(this.parent.firstChild)
            }
            this.flush()
        }
    },
    focus: function (a) {
        if (a < 0) {
            a = this.tabs.length + a
        }
        this.forceScroll = 1;
        gE(this.uls[this.oldMode ? 0 : 2], "a")[a].onclick({},
            true);
        this.forceScroll = null
    },
    show: function (c, e) {
        var b;
        if (isNaN(c) || c < 0) {
            c = 0
        } else {
            if (c >= this.tabs.length) {
                c = this.tabs.length - 1
            }
        }
        if (e == null && c == this.selectedTab) {
            return
        }
        if (this.selectedTab != -1) {
            b = this.tabs[this.selectedTab];
            if (this.onHide && !this.onHide(b)) {
                return
            }
            if (b.onHide && !b.onHide()) {
                return
            }
        }++this.nShows;
        var a = this.oldMode ? 0 : 3;
        for (var d = 0; d <= a; ++d) {
            b = gE(this.uls[d], "a");
            if (this.selectedTab != -1) {
                b[this.selectedTab].className = ""
            }
            b[c].className = "selected"
        }
        b = this.tabs[c];
        if (b.onLoad) {
            b.onLoad();
            b.onLoad = null
        }
        this.onShow(this.tabs[c], this.tabs[this.selectedTab]);
        if (b.onShow) {
            b.onShow(this.tabs[this.selectedTab])
        }
        this.selectedTab = c
    },
    flush: function (p) {
        if (this.oldMode) {
            var m, s, e, r;
            m = ce("ul");
            m.className = "old-tabs";
            for (var k = 0; k < this.tabs.length; ++k) {
                var f = this.tabs[k];
                s = ce("li");
                e = ce("div");
                r = ce("a");
                if (this.poundable) {
                    r.href = "#" + f.id
                } else {
                    r.href = "javascript:;"
                }
                ns(r);
                r.onclick = Tabs.onClick.bind(f, r);
                ae(r, ct(f.caption));
                ae(s, e);
                ae(s, r);
                ae(m, s)
            }
            this.uls[0] = m;
            ae(this.parent, m);
            var t = ce("div");
            t.style.cssFloat = t.style.styleFloat = "left";
            ae(this.parent, t)
        } else {
            var t, g, r, q, o, c;
            var n = ce("div");
            n.className = "tabs-container";
            o = ce("div");
            o.style.visibility = "hidden";
            this.uls[0] = ce("ul");
            this.uls[0].className = "tabs";
            ae(o, this.uls[0]);
            ae(n, o);
            o = ce("div");
            o.className = "tabs-levels";
            for (var k = 1; k <= 3; ++k) {
                c = ce("div");
                c.className = "tabs-level";
                this.uls[k] = ce("ul");
                this.uls[k].className = "tabs";
                this.uls[k].style.top = (-30 * (3 - k)) + "px";
                ae(c, this.uls[k]);
                ae(o, c)
            }
            ae(n, o);
            for (var k = 0; k < this.tabs.length; ++k) {
                var f = this.tabs[k];
                for (var h = 0; h <= 3; ++h) {
                    g = ce("li");
                    r = ce("a");
                    q = ce("b");
                    if (this.poundable) {
                        r.href = "#" + f.id
                    } else {
                        r.href = "javascript:;"
                    }
                    if (h > 0) {
                        ns(r);
                        r.onclick = Tabs.onClick.bind(f, r)
                    }
                    if (!Browser.ie6) {
                        o = ce("div");
                        ae(o, ct(f.caption));
                        ae(r, o)
                    }
                    ae(q, ct(f.caption));
                    ae(r, q);
                    ae(g, r);
                    ae(this.uls[h], g)
                }
            }
            ae(this.parent, n)
        }
        if (this.onLoad) {
            t = this.onLoad();
            if (t != null) {
                this.poundedTab = p = t
            }
        }
        this.show(p)
    },
    setTabName: function (d, c) {
        var a = this.oldMode ? 0 : 3;
        this.tabs[d].caption = c;
        for (var e = 0; e <= a; ++e) {
            var b = gE(this.uls[e], "a");
            g_setTextNodes(b[d], c)
        }
    },
    setTabPound: function (d, a) {
        if (!this.poundable) {
            return
        }
        var b = this.oldMode ? 0 : 3;
        for (var e = 0; e <= b; ++e) {
            var c = gE(this.uls[e], "a");
            c[d].href = "#" + this.tabs[d].id + ":" + a
        }
    },
    getSelectedTab: function () {
        return this.selectedTab
    }
};
Tabs.onClick = function (b, g, f) {
    if (f == null && this.index == this.owner.selectedTab) {
        return
    }
    var d = rf2(g);
    if (d == null) {
        return
    }
    this.owner.noHashChange = true;
    this.owner.show(this.index, f);
    if (this.owner.poundable) {
        var c = b.href.indexOf("#");
        c != -1 && location.replace(b.href.substr(c))
    }
    return d
};
Tabs.onLoad = function () {
    if (!this.poundable || !location.hash.length) {
        return
    }
    var a = location.hash.substr(1).split(":")[0];
    if (a) {
        return in_array(this.tabs, a, function (b) {
            return b.id
        })
    }
};
Tabs.onShow = function (d, e) {
    var b;
    if (e) {
        ge("tab-" + e.id).style.display = "none"
    }
    b = ge("tab-" + d.id);
    b.style.display = "";
    if ((this.nShows == 1 && this.poundedTab != null && this.poundedTab >= 0) || this.forceScroll) {
        var c, a;
        if (this.__st) {
            c = this.__st;
            a = 15
        } else {
            c = b;
            a = this.parent.offsetHeight + 15
        }
        if (Browser.ie) {
            setTimeout(g_scrollTo.bind(this, c, a), 1)
        } else {
            g_scrollTo(c, a)
        }
    }
};
var Icon = {
    sizes: ["small", "medium", "large"],
    sizes2: [18, 36, 56],
    create: function (c, k, h, b, e, j) {
        var g = ce("div"),
            d = ce("ins"),
            f = ce("del");
        if (k == null) {
            k = 1
        }
        g.className = "icon" + Icon.sizes[k];
        ae(g, d);
        ae(g, f);
        Icon.setTexture(g, k, c);
        if (b) {
            var i = ce("a");
            i.href = b;
            ae(g, i)
        } else {
            g.ondblclick = Icon.onDblClick
        }
        Icon.setNumQty(g, e, j);
        return g
    },
    setTexture: function (d, c, b) {
        if (!b) {
            return
        }
        var a = d.firstChild.style;
        a.borderRadius = "6px";
        if (b.indexOf("?") != -1) {
            a.backgroundImage = "url(" + b + ")"
        } else if (b.indexOf("#gs:") != -1) {
            a.backgroundImage = "url(http://mop-static.tauri.hu/images/icons/" + Icon.sizes[c] + "/" + b.toLowerCase() + ".png)";
            a.style.filter = "grayscale(100%)";
            a.style.WebkitFilter = "grayscale(100%)";
        } else {
            a.backgroundImage = "url(http://mop-static.tauri.hu/images/icons/" + Icon.sizes[c] + "/" + b.toLowerCase() + ".png)";
        }
        Icon.moveTexture(d, c, 0, 0)
    },
    moveTexture: function (d, c, a, e) {
        var b = d.firstChild.style;
        if (a || e) {
            b.backgroundPosition = (-a * Icon.sizes2[c]) + "px " + (-e * Icon.sizes2[c]) + "px"
        } else {
            if (b.backgroundPosition) {
                b.backgroundPosition = ""
            }
        }
    },
    setNumQty: function (e, c, f) {
        var b = gE(e, "span");
        for (var d = 0, a = b.length; d < a; ++d) {
            if (b[d]) {
                de(b[d])
            }
        }
        if (c != null && ((c > 1 && c < 2147483647) || c.length)) {
            b = g_createGlow(c, "q1");
            b.style.right = "0";
            b.style.bottom = "0";
            b.style.position = "absolute";
            ae(e, b)
        }
        if (f != null && f > 0) {
            b = g_createGlow("(" + f + ")", "q");
            b.style.left = "0";
            b.style.top = "0";
            b.style.position = "absolute";
            ae(e, b)
        }
    },
    getLink: function (a) {
        return gE(a, "a")[0]
    },
    onDblClick: function () {
        if (this.firstChild) {
            var b = this.firstChild.style;
            if (b.backgroundImage.length && b.backgroundImage.indexOf("url(http://static.wowhead.com") == 0) {
                var c = b.backgroundImage.lastIndexOf("/"),
                    a = b.backgroundImage.indexOf(".png");
                if (c != -1 && a != -1) {
                    prompt("", b.backgroundImage.substring(c + 1, a))
                }
            }
        }
    }
};

function Rectangle(f, e, b, c) {
    this.l = f;
    this.t = e;
    this.r = f + b;
    this.b = e + c
}
Rectangle.prototype = {
    intersectWith: function (b) {
        var c = !(this.l >= b.r || b.l >= this.r || this.t >= b.b || b.t >= this.b);
        return c
    },
    contains: function (b) {
        var c = (this.l <= b.l && this.t <= b.t && this.r >= b.r && this.b >= b.b);
        return c
    },
    containedIn: function (b) {
        return b.contains(this)
    }
};
var RedButton = {
    create: function (k, g, j) {
        var d = ce("a"),
            f = ce("em"),
            c = ce("b"),
            e = ce("i"),
            h = ce("span");
        d.href = "javascript:;";
        d.className = "button-red";
        ae(c, e);
        ae(f, c);
        ae(f, h);
        ae(d, f);
        RedButton.setText(d, k);
        RedButton.enable(d, g);
        RedButton.setFunc(d, j);
        return d
    },
    setText: function (a, b) {
        st(a.firstChild.childNodes[0].firstChild, b);
        st(a.firstChild.childNodes[1], b)
    },
    enable: function (a, b) {
        if (b || b == null) {
            a.removeAttribute("disabled");
        } else {
            if (!a.getAttribute("disabled")) {
                a.setAttribute("disabled", "true");
            }
        }
    },
    setFunc: function (a, b) {
        a.onclick = (b ? b : null)
    }
};
var RedButton2 = {
    create: function (l, h, k) {
        var e = ce("a"),
            g, c, f, j = ce("span");
        g = ce("em");
        c = ce("b");
        f = ce("i");
        e.href = "javascript:;";
        e.className = "button-red";
        ae(c, f);
        ae(g, c);
        ae(g, j);
        ae(e, g);
        RedButton2.setText(e, l);
        RedButton2.enable(e, h);
        RedButton2.setFunc(e, k);
        return e
    },
    setText: function (b, c) {
        st(b.firstChild.childNodes[0].firstChild, c);
        st(b.firstChild.childNodes[1], c);
    },
    enable: function (b, c) {
        if (c || c == null) {
            b.removeAttribute("disabled");
        } else {
            if (!b.getAttribute("disabled")) {
                b.setAttribute("disabled", "true");
            }
        }
    },
    setFunc: function (b, c) {
        $(b).unbind();
        if (c) {
            $(b).click(c)
        }
    }
};

function realWidth(o){
    var obj = $(o);
    var clone = obj.clone();
    clone.css("visibility","hidden");
    $('body').append(clone);
    var width = clone.outerWidth();
    clone.remove();
    return width;
}

var Tooltip = {
    simple: function(b, c, a, d) {
        if (d) {
            b.onmouseover = function(f) {
                Tooltip.show(b, c, false, false, a)
            }
        } else {
            b.onmouseover = function(f) {
                Tooltip.showAtCursor(f, c, false, false, a)
            };
            b.onmousemove = Tooltip.cursorUpdate
        }
        b.onmouseout = Tooltip.hide
    },
    create: function (h) {
        var f = ce("div"),
            k = ce("table"),
            b = ce("tbody"),
            e = ce("tr"),
            c = ce("tr"),
            a = ce("td"),
            j = ce("th"),
            i = ce("th"),
            g = ce("th");
        f.className = "tooltip";
        j.style.backgroundPosition = "top right";
        i.style.backgroundPosition = "bottom left";
        g.style.backgroundPosition = "bottom right";
        if (h) {
            a.innerHTML = h
        }
        ae(e, a);
        ae(e, j);
        ae(b, e);
        ae(c, i);
        ae(c, g);
        ae(b, c);
        ae(k, b);
        Tooltip.icon = ce("p");
        Tooltip.icon.style.visibility = "hidden";
        ae(Tooltip.icon, ce("div"));
        ae(f, Tooltip.icon);
        ae(f, k);
        return f
    },
    fix: function (d, b, f) {
        var e = gE(d, "table")[0],
            h = gE(e, "td")[0],
            g = h.childNodes;
        if (g.length >= 2 && g[0].nodeName == "TABLE" && g[1].nodeName == "TABLE") {
            g[0].style.whiteSpace = "nowrap";
            var a;
            if (realWidth(g[1]) > 300) {
                a = Math.max(300, realWidth(g[0])) + 50
            } else {
                a = Math.max(realWidth(g[0]), realWidth(g[1])) + 50
            }
            a = Math.min(320, a);
            if (a > 20) {
                d.className += " wowhead-tooltip-width-restriction wowhead-tooltip-width-" + a;
                d.style.width = a + "px";
                g[0].style.width = g[1].style.width = "100%";
                if (!b && d.offsetHeight > document.body.clientHeight) {
                    e.className = "shrink"
                }
            }
        }
        if (f) {
            d.style.visibility = "visible"
        }
        $('.tooltip-table').css('width', '100%');
    },
    fixSafe: function (c, b, a) {
        if (Browser.ie) {
            setTimeout(Tooltip.fix.bind(this, c, b, a), 1)
        } else {
            Tooltip.fix(c, b, a)
        }
    },
    append: function (c, b) {
        var c = $_(c);
        var a = Tooltip.create(b);
        ae(c, a);
        Tooltip.fixSafe(a, 1, 1)
    },
    prepare: function () {
        if (Tooltip.tooltip) {
            return
        }
        var b = Tooltip.create();
        b.style.position = "absolute";
        b.style.left = b.style.top = "-2323px";
        var a = ge("layers");
        ae(a, b);
        Tooltip.tooltip = b;
        Tooltip.tooltipTable = gE(b, "table")[0];
        Tooltip.tooltipTd = gE(b, "td")[0];
        if (Browser.ie6) {
            b = ce("iframe");
            b.src = "javascript:0;";
            b.frameBorder = 0;
            ae(a, b);
            Tooltip.iframe = b
        }
    },
    set: function (b) {
        var a = Tooltip.tooltip;
        a.style.width = "550px";
        a.style.left = "-2323px";
        a.style.top = "-2323px";
        Tooltip.tooltipTd.innerHTML = b;
        a.style.display = "";
        Tooltip.fix(a, 0, 0)
    },
    moveTests: [
        [null, null],
        [null, false],
        [false, null],
        [false, false]
    ],
    move: function (m, l, d, n, c, a) {
        if (!Tooltip.tooltipTable) {
            return
        }
        var k = Tooltip.tooltip,
            g = Tooltip.tooltipTable.offsetWidth,
            b = Tooltip.tooltipTable.offsetHeight,
            o;

        if (k.style.width == "550px")
            k.style.width = g + "px";
        var j, e;
        for (var f = 0, h = Tooltip.moveTests.length; f < h; ++f) {
            o = Tooltip.moveTests[f];
            j = Tooltip.moveTest(m, l, d, n, c, a, o[0], o[1]);
            e = true;
            break
        }
        k.style.left = j.l + "px";
        k.style.top = j.t + "px";
        k.style.visibility = "visible";
        if (Browser.ie6 && Tooltip.iframe) {
            var o = Tooltip.iframe;
            o.style.left = j.l + "px";
            o.style.top = j.t + "px";
            o.style.width = g + "px";
            o.style.height = b + "px";
            o.style.display = "";
            o.style.visibility = "visible"
        }
    },
    moveTest: function (e, l, n, w, c, a, m, b) {
        var k = e,
            v = l,
            f = Tooltip.tooltip,
            i = Tooltip.tooltipTable.offsetWidth,
            p = Tooltip.tooltipTable.offsetHeight,
            g = g_getWindowSize(),
            j = g_getScroll(),
            h = g.w,
            o = g.h,
            d = j.x,
            u = j.y,
            t = d,
            s = u,
            r = d + h,
            q = u + o;
        if (m == null) {
            m = (e + n + i <= r)
        }
        if (b == null) {
            b = (l - p >= s)
        }
        if (m) {
            e += n + c
        } else {
            e = Math.max(e - i, t) - c
        }
        if (b) {
            l -= p + a
        } else {
            l += w + a
        }
        if (e < t) {
            e = t
        } else {
            if (e + i > r) {
                e = r - i
            }
        }
        if (l < s) {
            l = s
        } else {
            if (l + p > q) {
                l = Math.max(u, q - p)
            }
        }
        if (Tooltip.iconVisible) {
            if (k >= e - 48 && k <= e && v >= l - 4 && v <= l + 48) {
                l -= 48 - (v - l)
            }
        }
        return g_createRect(e, l, i, p)
    },
    show: function (f, e, d, b, c) {
        if (Tooltip.disabled) {
            return
        }
        if (!d || d < 1) {
            d = 1
        }
        if (!b || b < 1) {
            b = 1
        }
        if (c) {
            e = '<span class="' + c + '">' + e + "</span>"
        }
        var a = ac(f);
        Tooltip.prepare();
        Tooltip.set(e);
        Tooltip.move(a.x, a.y, f.offsetWidth, f.offsetHeight, d, b)
    },
    showAtCursor: function (d, f, c, a, b) {
        if (Tooltip.disabled) {
            return
        }
        if (d == null) {
            return;
        }
        if (!c || c < 10) {
            c = 10
        }
        if (!a || a < 10) {
            a = 10
        }
        if (b) {
            f = '<span class="' + b + '">' + f + "</span>"
        }
        d = $E(d);
        var g = g_getCursorPos(d);
        Tooltip.prepare();
        Tooltip.set(f);
        Tooltip.move(g.x, g.y, 0, 0, c, a)
    },
    showAtXY: function (d, a, e, c, b) {
        if (Tooltip.disabled) {
            return
        }
        Tooltip.prepare();
        Tooltip.set(d);
        Tooltip.move(a, e, 0, 0, c, b)
    },
    cursorUpdate: function (b, a, d) {
        if (Tooltip.disabled || !Tooltip.tooltip) {
            return
        }
        b = $E(b);
        if (!a || a < 10) {
            a = 10
        }
        if (!d || d < 10) {
            d = 10
        }
        var c = g_getCursorPos(b);
        Tooltip.move(c.x, c.y, 0, 0, a, d)
    },
    hide: function () {
        if (Tooltip.tooltip) {
            Tooltip.tooltip.style.display = "none";
            Tooltip.tooltip.visibility = "hidden";
            Tooltip.tooltipTable.className = "";
            if (Browser.ie6) {
                Tooltip.iframe.style.display = "none"
            }
            Tooltip.setIcon(null);
        }
    },
    setIcon: function (a) {
        Tooltip.prepare();
        if (a) {
            Tooltip.icon.style.backgroundImage = "url(http://mop-static.tauri.hu/images/icons/medium/" + a.toLowerCase() + ".png)";
            Tooltip.icon.style.visibility = "visible"
        } else {
            Tooltip.icon.style.backgroundImage = "none";
            Tooltip.icon.style.visibility = "hidden"
        }
        Tooltip.iconVisible = a ? 1 : 0
    }
};

function g_GetStaffColorFromRoles(b) {
    if (b & U_GROUP_ADMIN) {
        return "comment-blue"
    }
    if (b & U_GROUP_GREEN_TEXT) {
        return "comment-green"
    }
    if (b & U_GROUP_VIP) {
        return "comment-gold"
    }
    return ""
}

function g_safeFocus(b) {
    if (!Platform.isTouch()) {
        $(b).focus()
    }
}

var g_listviews = {};
Listview.funcBox = {
    smartNoDataSearchText: function(b) {
        b.innerHTML = this.noteTopFormIsEmpty && this.noteTopFormIsEmpty() ? LANG.lv_search : LANG.lvnodata2
    },
    getCurrentItemBonuses: function(g) {
        var k = [];
        var l = g.bonuses ? g.bonuses : (this.itemBonusesFromDD ? this.itemBonusesFromDD : null);
        var h = !g.bonuses && this.itemBonusesFromDD;
        var f = h ? this.validateBonuses : [];
        if ((!l || !l.length) && g.context) {
            var c = Listview.funcBox.getBonusDataForContext.call(this, g.context);
            if (c.length == 2) {
                l = c[0];
                f = c[1];
                h = true
            }
        }
        if (l) {
            for (var b in l) {
                var j = l[b];
                if ((in_array(k, j) == -1) && (!h || (in_array(g.bonustrees, f[b]) != -1))) {
                    k.push(j)
                }
            }
        }
        return k
    },
    getItemLevelWithBonuses: function(f) {
        var c = f.level;
        var h = Listview.funcBox.getCurrentItemBonuses.call(this, f);
        if (h.length > 0 && isset("g_itembonuses")) {
            for (var b in h) {
                var g = h[b];
                if (g_itembonuses[g]) {
                    array_walk(g_itembonuses[g], function(j) {
                        if (j[0] == 1) {
                            c += j[1]
                        }
                    })
                }
            }
        }
        return c
    },
    filterByClass: function(c) {
        if (c) {
            localStorage.set("dynamic_quest_class", c);
            this.classFilter = function(g) {
                for (var f in g.specs) {
                    if (in_array(g_chr_specs_by_class[c], g.specs[f]) != -1) {
                        return true
                    }
                }
                return false
            };
            if (!isset("g_filterByClassAchievement")) {
                if (!(isset("g_user") && g_user.id)) {
                    return
                }
                $.ajax({
                    url: "/website-achievement-explored",
                    data: {
                        trigger: "bosslootfilter"
                    },
                    success: function() {
                        AchievementCheck()
                    },
                    type: "POST"
                });
                window.g_filterByClassAchievement = true
            }
        } else {
            localStorage.remove("dynamic_quest_class");
            this.classFilter = null;
            for (var b in this.data) {
                this.data[b].__tr = null
            }
        }
        this.updateFilters(1);
        this.applySort();
        this.refreshRows(true)
    },
    createSimpleCol: function(f, g, b, c) {
        return {
            id: f,
            name: (LANG[g] !== undefined ? LANG[g] : g),
            width: b,
            value: c
        }
    },
    initLootTable: function(c) {
        var b;
        if (this._totalCount != null) {
            b = this._totalCount
        } else {
            b = c.outof
        }
        if (b == 0) {
            if (c.count != -1) {
                c.percent = c.count
            } else {
                c.percent = 0
            }
        } else {
            c.percent = c.count / b * 100
        }(Listview.funcBox.initModeFilter.bind(this, c))()
    },
    initModeFilter: function(c) {
        if (this._lootModes == null) {
            this._lootModes = {
                99: 0
            }
        }
        if (this._distinctModes == null) {
            this._distinctModes = {
                99: 0
            }
        }
        if ((!c.modes || c.modes.mode == 4) && c.classs != 12 && c.commondrop) {
            this._lootModes[99]++;
            this._distinctModes[99]++
        } else {
            if (c.modes) {
                for (var b = -2; b <= 24; ++b) {
                    if (this._lootModes[b] == null) {
                        this._lootModes[b] = 0
                    }
                    if (c.modes.mode & 1 << parseInt(b) + 2) {
                        this._lootModes[b]++
                    }
                }
                if (this._distinctModes[c.modes.mode] == null) {
                    this._distinctModes[c.modes.mode] = 0
                }
                this._distinctModes[c.modes.mode]++
            }
        }
    },
    addModeIndicator: function() {
        var b = 0;
        for (var n in this._distinctModes) {
            if (this._distinctModes[n]) {
                b++
            }
        }
        if (this._distinctModes[4] && b < 2) {
            return
        }
        var h = location.hash.match(/:mode=([^:]+)/),
            g = [0, -1, -2, 23, 24, 1, 3, 2, 4, 5, 14, 15, 16, 17, 99],
            q = {
                "-2": LANG.tab_heroic,
                "-1": LANG.tab_normal,
                0: LANG.tab_noteworthy,
                1: sprintf(LANG.tab_normalX, 10),
                2: sprintf(LANG.tab_normalX, 25),
                3: sprintf(LANG.tab_heroicX, 10),
                4: sprintf(LANG.tab_heroicX, 25),
                5: LANG.tab_raidfinder,
                14: LANG.tab_normal,
                15: LANG.tab_heroic,
                16: LANG.tab_mythic,
                17: LANG.tab_raidfinder,
                23: LANG.tab_mythic,
                24: LANG.tab_timewalking,
                99: ""
            },
            s = {};
        this.diffLangref = {};
        $.extend(this.diffLangref, q);
        if (WAS.showAds()) {
            s[1] = q[1];
            s[2] = q[2];
            s[3] = q[3];
            s[4] = q[4];
            s[5] = q[5];
            q[1] = LANG.lvitem_normal + 10;
            q[2] = LANG.lvitem_normal + 25;
            q[3] = LANG.lvitem_heroic + 10;
            q[4] = LANG.lvitem_heroic + 25;
            q[5] = LANG.lvitem_lfr;
            q[14] = LANG.lvitem_normal;
            q[15] = LANG.lvitem_heroic;
            q[16] = LANG.lvitem_mythic;
            q[17] = LANG.lvitem_lfr;
            q[23] = LANG.lvitem_mythic;
            q[24] = LANG.lvitem_timewalking
        }
        var k = this,
            c = [],
            r;
        var p = function(v, f, j) {
            g_setSelectedLink(this, "lootmode-" + k.tabIndex);
            k.selectedDifficulty = f;
            var u = Listview.funcBox.getItemBonusesForDifficulty.call(k, f);
            k.itemBonusesFromDD = u[0];
            k.validateBonuses = u[1];
            k.customPound = k.id + (f != null ? ":mode=" + g_urlize(q[f].replace(" ", "")) : "");
            k.customFilter = function(w) {
                return Listview.funcBox.filterMode(w, k._totalCount, v)
            };
            k.updateFilters(1);
            k.applySort();
            k.refreshRows(true);
            if (j) {
                k.updatePound(1)
            }
        };
        var m = null;
        for (var l = 0, o = g.length; l < o; ++l) {
            var n = g[l];
            if (!this._lootModes[n]) {
                continue
            }
            r = $("<a><span>" + q[n] + "</span> (" + this._lootModes[n] + ")</a>");
            r[0].f = p.bind(r[0], 1 << n + 2, n, 1);
            r.click(r[0].f);
            if (n == -2 || n == 3 || n == 4 || n == 15 || n == 16 || n == 23) {
                r.addClass("icon-heroic")
            }
            c.push({
                indicator: $('<span class="indicator-mode"></span>').append(r).append($("<b" + (n < -1 || n > 2 ? ' class="icon-heroic"' : "") + ">" + q[n] + " (" + this._lootModes[n] + ")</b>")),
                tooltip: s[n]
            });
            if (c.length == 1) {
                m = p.bind(r[0], 1 << n + 2, n, 0)
            }
            if (h && h[1] == g_urlize(q[n].replace(" ", ""))) {
                (r[0].f)()
            }
        }
        if (m && (!g_setSelectedLink.groups || !g_setSelectedLink.groups["lootmode-" + k.tabIndex])) {
            m()
        }
        var t = false;
        for (var n = 0, o = c.length; n < o; ++n) {
            r = $("a", c[n].indicator);
            if (!$("span", r).html() && c.length == 3) {
                t = true
            } else {
                this.createIndicator(c[n].indicator, null, r[0].f, c[n].tooltip)
            }
        }
        if (t) {
            m()
        }
        if (this.showLootSpecs) {
            this.classSelectorDiv.style.marginTop = "0px"
        }
        $(this.noteTop).append($('<div class="clear"></div>'))
    },
    filterMode: function(g, c, f) {
        if (c != null && g.count != null) {
            if (g._count == null) {
                g._count = g.count
            }
            var b = g._count;
            if (f != null && g.modes[f]) {
                b = g.modes[f].count;
                c = g.modes[f].outof
            }
            g.__tr = null;
            g.count = b;
            g.outof = c;
            if (c) {
                g.percent = b / c * 100
            } else {
                g.percent = b
            }
        }
        return (f != null ? ((!g.modes || g.modes.mode == 4) && g.classs != 12 && g.commondrop ? (f == 32) : (g.modes && (g.modes.mode & f))) : true)
    },
    getItemBonusesForDifficulty: function(c) {
        var b = [];
        if (c && isset("g_pageInfo")) {
            var g = c < 0 ? -c : c;
            var h = 0;
            var j = g_pageInfo.typeId;
            switch (g_pageInfo.type) {
                case 1:
                    h = (g_npcs[j] && g_npcs[j].hasOwnProperty("location")) ? g_npcs[j].location[0] : 0;
                    break;
                case 7:
                    h = j;
                    break;
                default:
                    break
            }
            var f = 0;
            if (isset("g_mapdifficulties") && g_mapdifficulties[h] && g_mapdifficulties[h][g]) {
                f = g_mapdifficulties[h][g]
            } else {
                if (isset("g_difficulties") && g_difficulties[g]) {
                    f = g_difficulties[g].order
                }
            }
            b = Listview.funcBox.getBonusDataForContext.call(this, f)
        }
        return b
    },
    getBonusDataForContext: function(j) {
        var f = [];
        if (j && isset("g_item_bonuscontexts") && g_item_bonuscontexts[j]) {
            var k = [];
            var g = [];
            for (var h in g_item_bonuscontexts[j]) {
                var c = g_item_bonuscontexts[j][h];
                k.push(c[1]);
                g.push(c[0])
            }
            f = [k, g]
        }
        return f
    },
    initSubclassFilter: function(c) {
        var b = c.classs || 0;
        if (this._itemClasses == null) {
            this._itemClasses = {}
        }
        if (this._itemClasses[b] == null) {
            this._itemClasses[b] = 0
        }
        this._itemClasses[b]++
    },
    addSubclassIndicator: function() {
        var m = location.hash.match(/:type=([^:]+)/),
            b = [];
        for (var l in g_item_classes) {
            b.push({
                i: l,
                n: g_item_classes[l]
            })
        }
        b.sort(function(j, f) {
            return strcmp(j.n, f.n)
        });
        var o = function(j, f) {
            g_setSelectedLink(this, "itemclass");
            g.customPound = g.id + (j != null ? ":type=" + j : "");
            g.customFilter = function(q) {
                return j == null || j == q.classs
            };
            g.updateFilters(1);
            g.applySort();
            g.refreshRows();
            if (f) {
                g.updatePound(1)
            }
        };
        var g = this,
            c = [],
            p;
        p = $("<a><span>" + LANG.su_note_all + "</span></a>");
        p[0].f = o.bind(p[0], null, 1);
        p.click(p[0].f);
        var k = o.bind(p[0], null, 0);
        k();
        c.push($('<span class="indicator-mode"></span>').append(p).append($("<b>" + LANG.su_note_all + "</b>")));
        for (var h = 0, n = b.length; h < n; ++h) {
            var l = b[h].i;
            if (!this._itemClasses[l]) {
                continue
            }
            p = $("<a><span>" + g_item_classes[l] + "</span> (" + this._itemClasses[l] + ")</a>");
            p[0].f = o.bind(p[0], l, 1);
            p.click(p[0].f);
            c.push($('<span class="indicator-mode"></span>').append(p).append($("<b>" + g_item_classes[l] + " (" + this._itemClasses[l] + ")</b>")));
            if (m && m[1] == g_urlize(l)) {
                (p[0].f)()
            }
        }
        if (c.length > 2) {
            for (var l = 0, n = c.length; l < n; ++l) {
                this.createIndicator(c[l], null, $("a", c[l])[0].f)
            }
        }
    },
    initStatisticFilter: function(b) {
        if (this._achievTypes == null) {
            this._achievTypes = {}
        }
        if (this._achievTypes[b.type] == null) {
            this._achievTypes[b.type] = 0
        }
        this._achievTypes[b.type]++
    },
    addStatisticIndicator: function() {
        var l = location.hash.match(/:type=([^:]+)/),
            b = [];
        for (var k in g_achievement_types) {
            b.push({
                i: k,
                n: g_achievement_types[k]
            })
        }
        b.sort(function(j, f) {
            return strcmp(j.n, f.n)
        });
        var o = function(j, f) {
            g_setSelectedLink(this, "achievType");
            c.customPound = c.id + (j != null ? ":type=" + j : "");
            c.customFilter = function(q) {
                return j == null || j == q.type
            };
            c.updateFilters(1);
            c.applySort();
            c.refreshRows();
            if (f) {
                c.updatePound(1)
            }
        };
        var c = this,
            n = [],
            p;
        p = $("<a><span>" + LANG.su_note_all + "</span></a>");
        p[0].f = o.bind(p[0], null, 1);
        p.click(p[0].f);
        var h = o.bind(p[0], null, 0);
        h();
        n.push($('<span class="indicator-mode"></span>').append(p).append($("<b>" + LANG.su_note_all + "</b>")));
        for (var g = 0, m = b.length; g < m; ++g) {
            var k = b[g].i;
            if (!this._achievTypes[k]) {
                continue
            }
            p = $("<a><span>" + g_achievement_types[k] + "</span> (" + this._achievTypes[k] + ")</a>");
            p[0].f = o.bind(p[0], k, 1);
            p.click(p[0].f);
            n.push($('<span class="indicator-mode"></span>').append(p).append($("<b>" + g_achievement_types[k] + " (" + this._achievTypes[k] + ")</b>")));
            if (l && l[1] == k) {
                (p[0].f)()
            }
        }
        if (n.length > 2) {
            for (var k = 0, m = n.length; k < m; ++k) {
                this.createIndicator(n[k], null, $("a", n[k])[0].f)
            }
        }
    },
    initQuestFilter: function(c) {
        if (this._questTypes == null) {
            this._questTypes = {}
        }
        for (var b = 1; b <= 4; ++b) {
            if (this._questTypes[b] == null) {
                this._questTypes[b] = 0
            }
            if (c._type && (c._type & 1 << b - 1)) {
                this._questTypes[b]++
            }
        }
    },
    addQuestIndicator: function() {
        var j = location.hash.match(/:type=([^:]+)/);
        var l = function(n, f) {
            g_setSelectedLink(this, "questType");
            m.customPound = m.id + (n != null ? ":type=" + n : "");
            m.customFilter = function(o) {
                return n == null || (o._type & 1 << n - 1)
            };
            m.updateFilters(1);
            m.applySort();
            m.refreshRows();
            if (f) {
                m.updatePound(1)
            }
        };
        var m = this,
            h = [],
            c;
        c = $("<a><span>" + LANG.su_note_all + "</span></a>");
        c[0].f = l.bind(c[0], null, 1);
        c.click(c[0].f);
        var k = l.bind(c[0], null, 0);
        k();
        h.push($('<span class="indicator-mode"></span>').append(c).append($("<b>" + LANG.su_note_all + "</b>")));
        for (var g = 1; g <= 4; ++g) {
            if (!this._questTypes[g]) {
                continue
            }
            c = $("<a><span>" + g_quest_indicators[g] + "</span> (" + this._questTypes[g] + ")</a>");
            c[0].f = l.bind(c[0], g, 1);
            c.click(c[0].f);
            h.push($('<span class="indicator-mode"></span>').append(c).append($("<b>" + g_quest_indicators[g] + " (" + this._questTypes[g] + ")</b>")));
            if (j && j[1] == g) {
                (c[0].f)()
            }
        }
        if (h.length > 2) {
            for (var g = 0, b = h.length; g < b; ++g) {
                this.createIndicator(h[g], null, $("a", h[g])[0].f)
            }
        }
    },
    initSpellFilter: function(c) {
        if (this._spellTypes == null) {
            this._spellTypes = {}
        }
        if (this._spellTypes[c.cat] == null) {
            this._spellTypes[c.cat] = 0
        }
        this._spellTypes[c.cat]++;
        if (c.talentspec && c.talentspec.length) {
            switch (c.cat) {
                case -14:
                case -12:
                case -2:
                    if (this._spellSpecs == null) {
                        this._spellSpecs = {}
                    }
                    for (var b = 0; b < c.talentspec.length; b++) {
                        if (this._spellSpecs[c.talentspec[b]] == null) {
                            this._spellSpecs[c.talentspec[b]] = 0
                        }
                        this._spellSpecs[c.talentspec[b]]++
                    }
                    break
            }
        }
    },
    addSpellIndicator: function() {
        var l = location.hash.match(/:type=([^:]+)/);
        var m = location.hash.match(/:spec=([^:]+)/);
        var q = function(t, f) {
            g_setSelectedLink(this, "spellType");
            var v = location.hash.match(/:spec=([^:]+)/);
            var u = v ? v[1] : null;
            h.customPound = h.id + (t != null ? ":type=" + t : "") + (u != null ? ":spec=" + u : "");
            h.customFilter = function(w) {
                return (u == null || (in_array(w.talentspec, u) != -1) || (w.cat == -13 && w.rank && w.rank.indexOf(g_chr_specs[u]) >= 0)) && (t == null || w.cat == t)
            };
            h.updateFilters(1);
            h.applySort();
            h.refreshRows();
            if (f) {
                h.updatePound(1)
            }
        };
        var n = function(v, f) {
            g_setSelectedLink(this, "spellSpec");
            var u = location.hash.match(/:type=([^:]+)/);
            var t = u ? u[1] : null;
            h.customPound = h.id + (t != null ? ":type=" + t : "") + (v != null ? ":spec=" + v : "");
            h.customFilter = function(w) {
                return (v == null || (in_array(w.talentspec, v) != -1) || (w.cat == -13 && w.rank && w.rank.indexOf(g_chr_specs[v]) >= 0)) && (t == null || w.cat == t)
            };
            h.updateFilters(1);
            h.applySort();
            h.refreshRows();
            if (f) {
                h.updatePound(1)
            }
        };
        var h = this,
            p = [],
            s;
        s = $("<a><span>" + LANG.su_note_all + "</span></a>");
        s[0].f = q.bind(s[0], null, 1);
        s.click(s[0].f);
        var j = q.bind(s[0], null, 0);
        j();
        p.push($('<span class="indicator-mode"></span>').append(s).append($("<b>" + LANG.su_note_all + "</b>")));
        for (var k in g_spell_categories) {
            if (!this._spellTypes[k]) {
                continue
            }
            s = $("<a><span>" + g_spell_categories[k] + "</span> (" + this._spellTypes[k] + ")</a>");
            s[0].f = q.bind(s[0], k, 1);
            s.click(s[0].f);
            p.push($('<span class="indicator-mode"></span>').append(s).append($("<b>" + g_spell_categories[k] + " (" + this._spellTypes[k] + ")</b>")));
            if (l && l[1] == k) {
                (s[0].f)()
            }
        }
        var g = -1;
        var b = [];
        if (this._wowClass) {
            b = g_chr_specs_by_class[this._wowClass]
        } else {
            for (k in g_chr_specs) {
                if (g_chr_specs.hasOwnProperty(k)) {
                    b.push(k)
                }
            }
        }
        for (var r = 0; r < b.length; r++) {
            k = b[r];
            if (!this._spellSpecs[k]) {
                continue
            }
            if (g == -1) {
                s = $("<a><span>" + LANG.su_note_all + "</span></a>");
                s[0].f = n.bind(s[0], null, 1);
                s.click(s[0].f);
                n.call(s[0], null, 0);
                p.push($('<span class="indicator-mode"></span>').append(s).append($("<b>" + LANG.su_note_all + "</b>")));
                g = p.length - 1
            }
            s = $("<a><span>" + g_chr_specs[k] + "</span> (" + this._spellSpecs[k] + ")</a>");
            s[0].f = n.bind(s[0], k, 1);
            s.click(s[0].f);
            p.push($('<span class="indicator-mode"></span>').append(s).append($("<b>" + g_chr_specs[k] + " (" + this._spellSpecs[k] + ")</b>")));
            if (m && m[1] == k) {
                (s[0].f)()
            }
        }
        var c;
        if (p.length > 2) {
            for (var k = 0, o = p.length; k < o; ++k) {
                c = this.createIndicator(p[k], null, $("a", p[k])[0].f);
                if (k > 0 && k == g) {
                    c.style.clear = "left"
                }
            }
        }
    },
    initComparisonFilter: function(h, c) {
        if (h.__deleted) {
            return
        }
        if (this._comparisonSources == null) {
            this._comparisonSources = {
                all: 0,
                identical: 0,
                similar: 0,
                extra: 0,
                missing: 0
            }
        }
        if (h.compare.data.length < 2) {
            return
        }
        this._comparisonSources.all++;
        if (h.compare.progress == 1) {
            this._comparisonSources.identical++
        } else {
            if (h.compare.progress > 0) {
                this._comparisonSources.similar++
            } else {
                if (h.compare.primary == this.dataSource) {
                    this._comparisonSources.extra++
                } else {
                    this._comparisonSources.missing++
                }
            }
        }
        if (this._comparisonCategories == null) {
            this._comparisonCategories = {
                total: [0, 0, 0, 0, {}, 0]
            }
        }
        if (!this.compareSummary) {
            return
        }
        if (h.compare.primary != this.dataSource) {
            this._comparisonCategories.total[0]++
        }
        if (h.compare.progress == 1) {
            this._comparisonCategories.total[h.compare.auxiliary ? 5 : 1]++
        } else {
            if (h.compare.progress > 0) {
                this._comparisonCategories.total[2] += (c ? 1 : h.compare.progress);
                this._comparisonCategories.total[3]++
            }
        }
        if (!this.compareSummary.categoryId) {
            return
        }
        var f, g, b = h[this.compareSummary.categoryId];
        if (!is_array(b)) {
            b = [b]
        }
        for (g = 0; g < b.length; g++) {
            f = b[g];
            if (this.compareSummary.names[f]) {
                if (this._comparisonCategories[f] == null) {
                    this._comparisonCategories[f] = [0, 0, 0, 0, {
                        all: 0,
                        identical: 0,
                        similar: 0,
                        extra: 0,
                        missing: 0
                    }, 0]
                }
                if (h.compare.primary != this.dataSource) {
                    this._comparisonCategories[f][0]++
                }
                this._comparisonCategories[f][4].all++;
                if (h.compare.progress == 1) {
                    this._comparisonCategories[f][h.compare.auxiliary ? 5 : 1]++;
                    this._comparisonCategories[f][4].identical++
                } else {
                    if (h.compare.progress > 0) {
                        this._comparisonCategories[f][2] += (c ? 1 : h.compare.progress);
                        this._comparisonCategories[f][3]++;
                        this._comparisonCategories[f][4].similar++
                    } else {
                        if (h.compare.primary == this.dataSource) {
                            this._comparisonCategories[f][4].extra++
                        } else {
                            this._comparisonCategories[f][4].missing++
                        }
                    }
                }
            }
        }
    },
    addComparisonFilter: function() {
        this.removeIndicators();
        this.removeProgressBars();
        Listview.funcBox.addComparisonIndicator.call(this);
        Listview.funcBox.addComparisonProgressBars.call(this)
    },
    addComparisonIndicator: function() {
        if (!this._comparisonSources || !this._comparisonSources.all) {
            return
        }
        var m = location.hash.match(/:compare=([^:]+)/);
        var o = function(y, f) {
            g_setSelectedLink(this, j.id + "-compareSource");
            var u = location.hash.match(/:catg=([^:]+)/);
            var w = (u && u[1]) ? u[1] : null;
            var v = j.compareSummary.categoryId;
            j.customPound = j.id + (y != null ? ":compare=" + y : "") + (w != null ? ":catg=" + w : "");
            j.customFilter = function(z) {
                return ((y === null) || (y == "identical" && z.compare.progress == 1) || (y == "similar" && z.compare.progress > 0 && z.compare.progress < 1) || (y == "extra" && (z.compare.progress == -1 || (z.compare.progress == 0 && z.compare.primary == this.dataSource))) || (y == "missing" && z.compare.progress == 0 && z.compare.primary != this.dataSource)) && (w === null || w == z[v] || (is_array(z[v]) && in_array(z[v], w) >= 0))
            };
            j.updateFilters(1);
            j.applySort();
            j.refreshRows();
            if (f) {
                j.updatePound(1)
            }
        };
        var j = this,
            q = [],
            c = ["all", "identical", "similar", "extra", "missing"],
            s, t = this._comparisonSources;
        var g = location.hash.match(/:catg=([^:]+)/);
        var b = (g && g[1]) ? g[1] : null;
        var h = j.compareSummary.categoryId;
        if ((b !== null) && (this._comparisonCategories[b])) {
            t = this._comparisonCategories[b][4]
        }
        for (var l = 0; l < c.length; ++l) {
            var p = c[l];
            if (!t[p]) {
                continue
            }
            var r = this.completionMode ? this.completionText[p] : LANG["lvcomparison_" + p],
                k = "";
            if (p == "all") {
                p = null
            } else {
                k = " (" + t[p] + ")"
            }
            s = $("<a><span>" + r + "</span>" + k + "</a>");
            s[0].f = o.bind(s[0], p, 1);
            s.click(s[0].f);
            q.push($('<span class="indicator-mode"></span>').append(s).append($("<b>" + r + k + "</b>")));
            if (m && m[1] == p) {
                (s[0].f)()
            } else {
                if (p === null) {
                    (o.bind(s[0], p, 0))()
                }
            }
        }
        for (var l = 0, n = q.length; l < n; ++l) {
            this.createIndicator(q[l], null, $("a", q[l])[0].f)
        }
        if (this.onAfterAddComparison) {
            this.onAfterAddComparison.call(this)
        }
    },
    addComparisonProgressBars: function() {
        if (!this._comparisonCategories || !this._comparisonCategories.total || !this._comparisonCategories.total[0]) {
            return
        }
        var j = location.hash.match(/:catg=([^:]+)/),
            l = this,
            h = this.compareSummary.categoryId;
        var k = function(n, m) {
            g_setSelectedLink(this, l.id + "-category");
            var f = location.hash.match(/:compare=([^:]+)/);
            var o = (f && f[1]) ? f[1] : null;
            l.customPound = l.id + (o != null ? ":compare=" + o : "") + (n != null ? ":catg=" + n : "");
            l.customFilter = function(p) {
                return (n === null || n == p[h]) && ((o === null) || (o == "identical" && p.compare.progress == 1) || (o == "similar" && p.compare.progress > 0 && p.compare.progress < 1) || (o == "extra" && (p.compare.progress == -1 || (p.compare.progress == 0 && p.compare.primary == this.dataSource))) || (o == "missing" && p.compare.progress == 0 && p.compare.primary != this.dataSource))
            };
            l.updateFilters(1);
            l.applySort();
            l.refreshRows();
            if (m) {
                l.updatePound(1);
                ee(l.noteIndicators);
                Listview.funcBox.addComparisonIndicator.call(l)
            }
        };
        this.createProgressBar(LANG.overallprogress, this._comparisonCategories.total, k, [null, 1], 4);
        $("tr:last-child td:last-child", this.noteProgressBars).click();
        if (this.compareSummary.order) {
            for (var g = 0; g < this.compareSummary.order.length; ++g) {
                var c = this.compareSummary.order[g];
                if (!this.compareSummary.names[c] || !this._comparisonCategories[c]) {
                    continue
                }
                var b = this._comparisonCategories[c];
                if (!b[0]) {
                    if (!b[4].all) {
                        continue
                    }
                    b = [b[4].all, b[4].extra, 0, 0]
                }
                this.createProgressBar(this.compareSummary.names[c], b, k, [c, 1]);
                if (j && j[1] == c) {
                    $("tr:last-child td:last-child", this.noteProgressBars).click()
                }
            }
        }
    },
    addItemSummary: function() {
        if (!this.noteItemSummary) {
            this.noteItemSummary = ce("div");
            this.noteItemSummary.className = "listview-summary-wrapper";
            $(this.noteItemSummary).insertAfter($(this.noteTop))
        }
        ee(this.noteItemSummary);
        g_summaries["listview-summary-" + this.id] = null;
        var g = ce("div");
        g.className = "listview-summary-background";
        ae(this.noteItemSummary, g);
        var k = ce("div");
        k.className = "listview-summary";
        ae(g, k);
        var j = ce("div");
        j.className = "listview-summary-inner";
        ae(k, j);
        var b = ce("a");
        b.className = "listview-summary-left";
        b.onclick = function() {
            var m = $(this);
            var n = m.siblings(".listview-summary-inner");
            n.animate({
                scrollLeft: -1 * n.width()
            }, 1000);
            m.removeClass("show");
            m.siblings(".listview-summary-right").addClass("show")
        };
        ae(b, ce("span"));
        ae(k, b);
        b = ce("a");
        b.className = "listview-summary-right";
        b.onclick = function() {
            var m = $(this);
            var n = m.siblings(".listview-summary-inner");
            n.animate({
                scrollLeft: n.width()
            }, 1000);
            m.removeClass("show");
            m.siblings(".listview-summary-left").addClass("show")
        };
        ae(b, ce("span"));
        ae(k, b);
        var h = [];
        for (var f = 0; f < this.data.length; ++f) {
            if (this.data[f].raw[0] != 4 && this.data[f].raw[0] != 19) {
                var c = this.data[f].raw.slice(1, this.data[f].raw.length);
                c[8] = 0;
                h.push([c])
            }
        }
        this.attachedSummary = new Summary({
            id: "listview-summary-" + this.id,
            template: "listmanager",
            parent: j,
            groups: h,
            level: this.characterSettings.level,
            talentSpec: this.characterSettings.talentSpec,
            charClass: this.characterSettings.charClass,
            race: this.characterSettings.race,
            selectedTalents: this.characterSettings.selectedTalents,
            noMaxHighlight: this.compareSummaryNoMaxHighlight,
            totalName: this.compareSummaryTotalName
        });
        var l = function() {
            var n = $(this),
                m = $("table.grid", n);
            if (n.width() < m.width()) {
                n.siblings(".listview-summary-right").addClass("show")
            } else {
                n.siblings(".listview-summary-left, .listview-summary-right").removeClass("show")
            }
        };
        if (!this.summaryResizeAdded) {
            $(window).resize((function(m) {
                $(".listview .listview-summary-inner").each(m)
            }).bind(null, l));
            this.summaryResizeAdded = true
        }
        setTimeout((function(m, n) {
            $(".listview-summary-inner", m).each(n)
        }).bind(null, this.noteItemSummary, l), 0);
        if (this.showPaperdoll) {
            g.className += " has-paperdoll";
            Listview.funcBox.addPaperdoll.call(this, g)
        }
    },
    addPaperdoll: function(c) {
        if (!this.notePaperdoll || !ge(this.notePaperdoll.id)) {
            this.notePaperdoll = ce("div");
            this.notePaperdoll.id = "listview-paperdoll-" + this.id;
            this.notePaperdoll.className = "listview-paperdoll";
            if (c) {
                $(c).prepend(this.notePaperdoll)
            } else {
                $(this.notePaperdoll).insertAfter($(this.noteTop))
            }
        }
        ee(this.notePaperdoll);
        var g = $.extend({
            id: "paperdoll-" + this.id,
            parent: this.notePaperdoll.id,
            data: this.data,
            sheathMain: -1,
            sheathOff: -1
        }, this.characterSettings);
        if (this.onCreatePaperdollSlot) {
            g.onCreateSlot = this.onCreatePaperdollSlot
        }
        var h = {
            16: "Main",
            17: "Off"
        };
        for (var f = 0, b = g.data.length; f < b; f++) {
            if (g_items[g.data[f].id] && g_items[g.data[f].id].jsonequip && typeof g_items[g.data[f].id].jsonequip.sheathtype == "number") {
                if (g.data[f].raw && h.hasOwnProperty(g.data[f].raw[0])) {
                    g["sheath" + h[g.data[f].raw[0]]] = g_items[g.data[f].id].jsonequip.sheathtype
                }
            }
        }
        new Paperdoll(g)
    },
    assocArrCmp: function(g, f, c) {
        if (g == null) {
            return -1
        } else {
            if (f == null) {
                return 1
            }
        }
        var k = Math.max(g.length, f.length);
        for (var j = 0; j < k; ++j) {
            if (g[j] == null) {
                return -1
            } else {
                if (f[j] == null) {
                    return 1
                }
            }
            var h = strcmp(c[g[j]], c[f[j]]);
            if (h != 0) {
                return h
            }
        }
        return 0
    },
    assocBinFlags: function(h, b) {
        var g = [];
        for (var c in b) {
            if (!isNaN(c) && (h & 1 << c - 1)) {
                g.push(c)
            }
        }
        g.sort(function(j, f) {
            return strcmp(b[j], b[f])
        });
        return g
    },
    location: function(m, f, g) {
        if (m.location == null) {
            return -1
        }
        var c = g ? g : 3;
        var b = m.location.slice(0, c);
        if (b.length < m.location.length) {
            b.push(-1)
        }
        for (var h = 0, k = b.length; h < k; ++h) {
            if (h > 0) {
                ae(f, ct(LANG.comma))
            }
            var j = b[h];
            if (j == -1) {
                ae(f, ct(LANG.ellipsis))
            } else {
                var l = ce("a");
                l.className = ((isset("g_thottbot") && g_thottbot) ? "q" : "q1");
                l.href = "?zone=" + j;
                ae(l, ct(g_zones[j] ? g_zones[j] : ""));
                ae(f, l)
            }
        }
    },
    arrayText: function(c, h) {
        if (c == null) {
            return
        } else {
            if (!is_array(c)) {
                return h[c]
            }
        }
        var g = "";
        for (var f = 0, b = c.length; f < b; ++f) {
            if (f > 0) {
                g += " "
            }
            if (!h[c[f]]) {
                continue
            }
            g += h[c[f]]
        }
        return g
    },
    createCenteredIcons: function(b, h, m, c, k, t) {
        if (b != null) {
            var g = 0;
            var w = ce("div"),
                z = ce("div");
            ae(document.body, w);
            if (m && (b.length != 1 || c != 2)) {
                var s = ce("div");
                s.style.position = "relative";
                s.style.width = "1px";
                var A = ce("div");
                A.className = "q0";
                A.style.position = "absolute";
                A.style.right = "2px";
                A.style.lineHeight = "26px";
                A.style.fontSize = "11px";
                A.style.whiteSpace = "nowrap";
                ae(A, ct(m));
                ae(s, A);
                ae(w, s);
                w.style.paddingLeft = $(A).width() + "px"
            }
            var o = g_items;
            if (c == 1) {
                o = g_spells
            } else {
                if (c == 3) {
                    o = g_petabilities
                }
            }
            for (var q = 0, r = b.length; q < r; ++q) {
                if (t && g % t == 0) {
                    ae(w, ce("div", {
                        className: "clear-left"
                    }))
                }
                g++;
                var u;
                if (b[q] == null) {
                    u = ce("div");
                    u.style.width = u.style.height = "26px"
                } else {
                    var n, j, f;
                    if (typeof b[q] == "object") {
                        n = b[q][0];
                        j = b[q][1];
                        f = b[q][2]
                    } else {
                        n = b[q]
                    }
                    if (typeof n == "string") {
                        u = Icon.create(n, 0, null, f)
                    } else {
                        if (n) {
                            u = o.createIcon(n, 0, j)
                        } else {
                            u = Icon.create("inventoryslot_empty", 0, null, "javascript:;")
                        }
                    }
                    if (k) {
                        u.children[2].rel = k[q]
                    }
                }
                if (b.length == 1 && c == 2) {
                    if (n && g_items[n]) {
                        ee(w);
                        var v = g_items[n],
                            y = ce("a"),
                            p = ce("span");
                        p.style.paddingTop = "4px";
                        y.href = /*_getRelativeHostPrefix() + */"?item=" + n;
                        y.className = "q" + v.quality + " icontiny tinyspecial";
                        y.style.backgroundImage = "url(" + g_staticUrl + "/images/icons/tiny/" + v.icon.toLowerCase() + ".png)";
                        y.style.whiteSpace = "nowrap";
                        st(y, v["name_" + Locale.getName()]);
                        ae(p, y);
                        if (j > 1) {
                            ae(p, ct(" (" + j + ")"))
                        }
                        if (m) {
                            var s = ce("span");
                            s.className = "q0";
                            s.style.fontSize = "11px";
                            s.style.whiteSpace = "nowrap";
                            ae(s, ct(m));
                            ae(w, s);
                            if ($(A).length > 0) {
                                p.style.paddingLeft = $(A).width() + "px"
                            }
                        }
                        ae(w, p)
                    }
                } else {
                    u.style.cssFloat = u.style.styleFloat = "left";
                    ae(w, u);
                    w.style.margin = "0 auto";
                    w.style.textAlign = "left";
                    var l = b.length;
                    if (t && t < b.length) {
                        l = t
                    }
                    w.style.width = (26 * l) + "px"
                }
            }
            z.className = "clear";
            ae(h, w);
            ae(h, z);
            return true
        }
    },
    createSocketedIcons: function(c, g, f, j, p) {
        var o = 0,
            m = ce("div"),
            b = ce("div");
        for (var h = 0, k = c.length; h < k; ++h) {
            var n, l = f[h];
            if (g_items && g_items[l]) {
                n = g_items.createIcon(l, 0)
            } else {
                if (isset("g_gems") && g_gems && g_gems[l]) {
                    n = Icon.create(g_gems[l].icon, 0, null, g_getRelativeHostPrefix() + "/item=" + l)
                } else {
                    n = Icon.create(null, 0, null, "javascript:;")
                }
            }
            n.className += " iconsmall-socket-" + g_file_gems[c[h]] + (!f || !l ? "-empty" : "");
            n.style.cssFloat = n.style.styleFloat = "left";
            if (j && j[h]) {
                n.insertBefore(ce("var"), n.childNodes[1]);
                ++o
            }
            ae(m, n)
        }
        m.style.margin = "0 auto";
        m.style.textAlign = "left";
        m.style.width = (26 * c.length) + "px";
        b.className = "clear";
        ae(g, m);
        ae(g, b);
        if (p && o == c.length) {
            m = ce("div");
            m.style.paddingTop = "4px";
            ae(m, ct(p));
            ae(g, m)
        }
    },
    addBattlePetExpandedView: function(h, g, l, t, c) {
        if (!c) {
            c = h
        }
        var n = function() {
            setTimeout((function() {
                if (Platform.isTouch() && !$(".expanded-pet-view", this).is(":visible")) {
                    var A = $("a", this).attr("href");
                    if (A) {
                        location.href = A
                    }
                }
            }).bind(this), 5)
        };
        if (c.tagName == "TD") {
            c.onmouseover = function() {
                $(this).addClass("expand-pet-view");
                n.call(this)
            };
            c.onmouseout = function() {
                $(this).removeClass("expand-pet-view")
            }
        } else {
            c.onmouseover = function() {
                $(this).parents("td").addClass("expand-pet-view");
                n.call(this)
            };
            c.onmouseout = function() {
                $(this).parents("td").removeClass("expand-pet-view")
            }
        }
        var j = ce("div");
        j.className = "expanded-pet-view";
        if (g.compare) {
            ae(j, Listview.funcBox.getComparisonText(g.compare, this.completionMode, this.dataSource, this.completionText))
        }
        if (g.companion) {
            j.className += " companion"
        }
        if (g.untameable) {
            j.className += " untameable"
        }
        if (g.elite) {
            j.className += " elite"
        }
        var z = ce("img");
        z.src = g_staticUrl + "/npc/" + (g.model + "")[0] + "/creature-display-" + g.model + ".jpg";
        z.onerror = function() {
            z.src = g_staticUrl + "/npc/3/creature-display-31096.jpg";
        };
        z.height = z.width = 240;
        ae(j, z);
        var p = ce("div");
        p.className = "icon";
        ae(p, Icon.create(g.icon, 1, null, this.getItemLink(g)));
        ae(j, p);
        p = ce("div");
        p.className = "type";
        p.style.backgroundPosition = ((g.type - 1) * -35) + "px 0";
        p.onmouseover = function(B, A) {
            Tooltip.showAtCursor(A, g_battlepetability_types[g.type], 0, 0, "q")
        };
        p.onmousemove = Tooltip.cursorUpdate;
        p.onmouseout = Tooltip.hide;
        ae(j, p);
        var y = ce("div");
        y.className = "name";
        if (g.elite) {
            z = ce("img");
            z.src = "images/icons/boss.gif";
            z.height = 16;
            z.width = 12;
            z.style.verticalAlign = "middle";
            z.onmouseover = function(A) {
                Tooltip.showAtCursor(A, LANG.lvspecies_elite, 0, 0, "q")
            };
            z.onmousemove = Tooltip.cursorUpdate;
            z.onmouseout = Tooltip.hide;
            ae(y, z);
            ae(y, ct(" "))
        }
        var u = ce("a");
        u.href = this.getItemLink(g);
        u.className = "q" + l.quality;
        u.innerHTML = g.npc.name;
        ae(y, u);
        ae(j, y);
        var q = ce("div");
        q.className = "leveltype";
        if (g.elite) {
            q.innerHTML = (g.companion ? LANG.lvspecies_companion : sprintf(LANG.lvspecieselite_levelcombo, l.level, g_battlepetability_types[g.type]))
        } else {
            q.innerHTML = (g.companion ? LANG.lvspecies_companion : sprintf(LANG.lvspecies_levelcombo, l.level, g_battlepetability_types[g.type]))
        }
        ae(j, q);
        if (!g.companion) {
            var w = ce("table");
            w.className = "stats";
            var m = ["health", "power", "speed"],
                s = ce("tr"),
                r = ce("tr"),
                b, k;
            for (var o = 0; o < m.length; ++o) {
                b = ce("td");
                k = ce("span");
                k.className = m[o] + "-icon";
                b.onmouseover = (function(B, A) {
                    Tooltip.showAtCursor(A, B, 0, 0, "q")
                }).bind(null, LANG[m[o]]);
                b.onmousemove = Tooltip.cursorUpdate;
                b.onmouseout = Tooltip.hide;
                ae(b, k);
                ae(s, b);
                b = ce("td");
                b.innerHTML = t[m[o]];
                b.onmouseover = (function(B, A) {
                    Tooltip.showAtCursor(A, B, 0, 0, "q")
                }).bind(null, LANG[m[o]]);
                b.onmousemove = Tooltip.cursorUpdate;
                b.onmouseout = Tooltip.hide;
                ae(r, b)
            }
            ae(w, s);
            ae(w, r);
            ae(j, w);
            var f = ce("div");
            f.className = "abilities";
            if (g.untameable) {
                span = ce("div");
                span.className = "label q0";
                span.innerHTML = LANG.untameable;
                ae(f, span);
                for (var o = 0; o < g.abilities.length; ++o) {
                    p = ce("div");
                    p.className = "icon-" + (o + 1);
                    ae(p, Icon.create(g_petabilities[g.abilities[o]].icon, 0, null, "?pet-ability=" + g.abilities[o]));
                    ae(f, p)
                }
            } else {
                for (var o = 1; o <= 3; o++) {
                    p = ce("span");
                    p.className = "connector-" + o;
                    ae(f, p)
                }
                for (var o = 0; o < g.abilities.length; ++o) {
                    p = ce("div");
                    p.className = "icon-" + (o + 1);
                    if (o < 3 && l.level >= battlePetAbilityLevels[1]) {
                        p.className += " iconsmall-gold"
                    }
                    var v = null;
                    if (l.level < battlePetAbilityLevels[o] || battlePetAbilityLevels[o] > 1) {
                        v = battlePetAbilityLevels[o]
                    }
                    if (l.level < battlePetAbilityLevels[o]) {
                        p.className += " inactive"
                    }
                    ae(p, Icon.create(g_petabilities[g.abilities[o]].icon, 0, null, "?pet-ability=" + g.abilities[o], v));
                    ae(f, p)
                }
            }
            ae(j, f)
        }
        ae(h, j)
    },
    getItemType: function(f, b, c) {
        if (c != null && g_item_subsubclasses[f] != null && g_item_subsubclasses[f][b] != null) {
            return {
                url: g_getRelativeHostPrefix() + "/items=" + f + "." + b + "." + c,
                text: g_item_subsubclasses[f][b][c]
            }
        } else {
            if (b != null && g_item_subclasses[f] != null) {
                return {
                    url: g_getRelativeHostPrefix() + "/items=" + f + "." + b,
                    text: g_item_subclasses[f][b]
                }
            } else {
                return {
                    url: g_getRelativeHostPrefix() + "/items=" + f,
                    text: g_item_classes[f]
                }
            }
        }
    },
    getQuestCategory: function(b) {
        return g_quest_sorts[b]
    },
    getQuestReputation: function(g, c) {
        if (c.reprewards) {
            for (var f = 0, b = c.reprewards.length; f < b; ++f) {
                if (c.reprewards[f][0] == g) {
                    return c.reprewards[f][1]
                }
            }
        }
    },
    getFactionCategory: function(c, b) {
        if (c) {
            return g_faction_categories[c]
        } else {
            return g_faction_categories[b]
        }
    },
    createTextRange: function(c, b) {
        c |= 0;
        b |= 0;
        if (c > 1 || b > 1) {
            if (c != b && b > 0) {
                return c + "-" + b
            } else {
                return c + ""
            }
        }
        return null
    },
    coGetColor: function(g, c, b) {
        if (g.user && g_customColors[g.user]) {
            return " comment-" + g_customColors[g.user]
        }
        switch (c) {
            case -1:
                var f = null;
                if (!b) {
                    f = g.divPost.childNodes[1].className.match(/comment-([a-z]+)/)
                } else {
                    f = g.divBody[0].className.match(/comment-([a-z]+)/)
                }
                if (f != null) {
                    return " comment-" + f[1]
                }
                break;
            /*case 3:
                if (g.roles & U_GROUP_PATRONESQUE) {
                    return " comment-gold"
                }*/
            case 4:
                if (g.roles & U_GROUP_ADMIN) {
                    return " comment-blue"
                }
                if (g.roles & U_GROUP_GREEN_TEXT) {
                    return " comment-green"
                }
                if (g.roles & U_GROUP_VIP) {
                    return " comment-gold"
                }
                /*if (g.roles & U_GROUP_PATRONESQUE) {
                    return " comment-red"
                }*/
                break
        }
        if (g.roles & U_GROUP_ADMIN) {
            return " comment-blue"
        }
        if ((g.commentv2 && g.sticky) || (g.roles & U_GROUP_GREEN_TEXT) || (g.rating >= 10)) {
            return " comment-green"
        }
        if (g.rating && g.rating < -2) {
            return " comment-bt"
        }
        /*if (g.roles & U_GROUP_PATRONESQUE) {
            return " comment-gold"
        }*/
        return ""
    },
    coFlagUpOfDate: function(f) {
        var b = f.commentCell.find(".comment-notification");
        var c = f.user == g_user.name || ((g_user.roles & (U_GROUP_ADMIN | U_GROUP_MODERATOR)) != 0);
        if (!c) {
            return
        }
        if (confirm("Mark comment " + f.id + " as up to date?")) {
            f.container.removeClass("comment-outofdate");
            $.post("/comment=out-of-date", {
                id: f.id,
                remove: 1
            }, function(g) {
                if (g == "ok") {
                    MessageBox(b, LANG.lvcomment_uptodateresponse)
                } else {
                    MessageBox(b, "Error: " + g)
                }
            })
        }
        return
    },
    coFlagOutOfDate: function(g) {
        var b = g.commentCell.find(".comment-notification");
        var c = g.user == g_user.name || ((g_user.roles & (U_GROUP_ADMIN | U_GROUP_MODERATOR)) != 0);
        if (c) {
            if (confirm("Mark comment " + g.id + " as out of date?")) {
                g.container.addClass("comment-outofdate");
                $.post("/comment=out-of-date", {
                    id: g.id
                }, function(h) {
                    if (h == "ok") {
                        MessageBox(b, LANG.lvcomment_outofdateresponse)
                    } else {
                        MessageBox(b, "Error: " + h)
                    }
                })
            }
            return
        }
        var f = null;
        while (true) {
            f = prompt(LANG.lvcomment_outofdate_tip);
            if (f == null || f == false) {
                return
            } else {
                if (f.toString().length > 0) {
                    break
                }
            }
            alert(LANG.youmustprovideareason_stc)
        }
        $.post("/comment=out-of-date", {
            id: g.id,
            reason: f
        }, function(h) {
            if (h == "ok") {
                MessageBox(b, LANG.lvcomment_outofdateresponsequeued)
            } else {
                MessageBox(b, "Error: " + h)
            }
        })
    },
    coDelete: function(f) {
        var c = f.user == g_user.name || ((g_user.roles & (U_GROUP_ADMIN | U_GROUP_MOD | U_GROUP_BUREAU)) != 0);
        var b = f.commentCell.find(".comment-notification");
        if (c) {
            if (!confirm(LANG.confirm_deletecomment)) {
                return
            }
            $.post("?comment=delete", {
                id: f.id
            });
            if (!f.commentv2) {
                this.deleteRows([f]);
                return;
            }
            f.container.parent().remove();
            //MessageBox(b, LANG.commentdeleted_tip);
            f.deletedInfo = [g_serverTime, g_user.name];
            f.deleted = true;
            Listview.templates.comment.updateCommentCell(f);
            return
        }
    },
    coUndelete: function(f) {
        var c = f.user == g_user.name || ((g_user.roles & (U_GROUP_ADMIN | U_GROUP_MOD)) != 0);
        var b = f.commentCell.find(".comment-notification");
        if (confirm(LANG.votetoundelete_tip)) {
            $.post("/comment=undelete", {
                id: f.id
            });
            if (c) {
                MessageBox(b, "This comment has been restored.");
                if (f.commentv2) {
                    f.container.removeClass("comment-deleted");
                    f.deletedInfo = null;
                    f.deleted = false;
                    Listview.templates.comment.updateCommentCell(f)
                }
            } else {
                MessageBox(b, LANG.votedtodelete_tip)
            }
        }
    },
    coEdit: function(k, h, f) {
        if (f) {
            k.divBody.hide();
            k.divResponse.hide()
        }
        var j = $("<div/>");
        j.addClass("comment-edit");
        k.divEdit = j[0];
        if (h == -1) {
            if (g_users[k.user] != null) {
                k.roles = g_users[k.user].roles
            }
        }
        var b = Listview.funcBox.coEditAppend(j, k, h, f);
        var c = $("<div/>");
        c.addClass("comment-edit-buttons");
        var g = $("<button/>", {
            text: LANG.compose_save
        });
        g.click(Listview.funcBox.coEditButton.bind(g[0], k, true, h, f));
        c.append(g);
        c.append(ct(" "));
        g = $("<button/>", {
            text: LANG.compose_cancel
        });
        g.click(Listview.funcBox.coEditButton.bind(g[0], k, false, h, f));
        c.append(g);
        j.append(c);
        j.insertAfter(k.divBody);
        g_safeFocus(b)
    },
    coEditAppend: function(N, E, l, v, b, J) {
        if (g_user.id == 0)
            return;

        N.html('');
        var C = Listview.funcBox.coGetCharLimit(l);
        if (l == 1 || l == 3 || l == 4) {
            E.user = g_user.name;
            E.roles = g_user.roles;
            E.rating = 1
        } else {
            if (l == 2) {
                E.roles = g_user.roles;
                E.rating = 1
            }
        }
        if (b) {
            E.roles &= ~U_GROUP_PENDING
        }
        if (l == -1 || l == 0) {
            var k = $("<div/>", {
                text: LANG.compose_mode
            });
            k.addClass("comment-edit-modes");
            var G = $("<a/>", {
                href: "javascript:;",
                text: LANG.compose_edit
            });
            G.click(Listview.funcBox.coModeLink.bind(G[0], 1, l, E));
            G.addClass("selected");
            k.append(G);
            k.append(ct("|"));
            var M = $("<a/>", {
                href: "javascript:;",
                text: LANG.compose_preview
            });
            M.click(Listview.funcBox.coModeLink.bind(M[0], 2, l, E));
            k.append(M);
            N.append(k)
        }
        var j = $("<div/>", {
            css: {
                display: "none"
            }
        });
        j.addClass("text comment-body" + Listview.funcBox.coGetColor(E, l, v));
        var A = $("<div/>");
        A.addClass("comment-edit-body");
        var c = $('<div style="float: left" />');
        c.addClass("toolbar");
        var P = $('<div style="float: left" />');
        P.addClass("menu-buttons");
        var f = $("<textarea/>", {
            val: E.body,
            rows: 10,
            css: {
                clear: "left"
            }
        });
        f.addClass("comment-editbox");
        switch (l) {
            case 1:
                f.attr("name", "commentbody");
                //f.focus(g_revealCaptcha.bind(null, "klrbetkjerbt46", false, false, "Listview commentbody"));
                break;
            case 2:
                f.attr({
                    name: "desc",
                    originalValue: E.body
                });
                break;
            case 3:
                f.attr("name", "body");
                //f.focus(g_revealCaptcha.bind(null, "klrbetkjerbt46", false, false, "Listview body"));
                break;
            case 4:
                f.attr({
                    name: "sig",
                    originalValue: E.body,
                    rows: 3
                });
                f.css("height", "auto");
                break
        }
        if (l != -1 && l != 0) {
            var p = $("<a/>"),
                y = $("<div/>"),
                s = $("<div/>"),
                r = screen.availWidth <= 480;
            var u = Listview.funcBox.coLivePreview.bind(f[0], E, l, y[0]);
            p.addClass("disclosure-" + (r ? "off" : "on"));
            p.text(LANG.compose_livepreview);
            p.attr("href", "javascript:;");
            p.click(function() {
                u(1);
                var Q = g_toggleDisplay(y[0]);
                p.toggleClass("disclosure-on", Q);
                p.toggleClass("disclosure-off", !Q)
            });
            s.addClass("pad");
            j.append(g_getMajorHeading(p, 3, null, {
                classes: "first"
            }));
            j.append(y);
            j.append(s);
            g_onAfterTyping(f[0], u, 50);
            f.focus(function() {
                u();
                j.css("display", (r ? "none" : ""));
                if (l != 4 && !J) {
                    f.css("height", "22em")
                }
            })
        } else {
            if (l != 4 && !J) {
                f.focus(function() {
                    f.css("height", "22em")
                })
            }
        }
        var B = [{
            id: "b",
            icon: "bold",
            title: LANG.markup_b,
            pre: "[b]",
            post: "[/b]"
        }, {
            id: "i",
            icon: "italic",
            title: LANG.markup_i,
            pre: "[i]",
            post: "[/i]"
        }, {
            id: "u",
            icon: "underline",
            title: LANG.markup_u,
            pre: "[u]",
            post: "[/u]"
        }, {
            id: "s",
            icon: "strikethrough",
            title: LANG.markup_s,
            pre: "[s]",
            post: "[/s]"
        }, {
            id: "small",
            icon: "text-height",
            title: LANG.markup_small,
            pre: "[small]",
            post: "[/small]"
        }, {
            id: "url",
            icon: "link",
            title: LANG.markup_url,
            nopending: true,
            onclick: function() {
                var Q = prompt(LANG.prompt_linkurl, "http://");
                if (Q) {
                    g_insertTag(f[0], "[url=" + Q + "]", "[/url]")
                }
            }
        }, {
            id: "quote",
            icon: "quote-left",
            title: LANG.markup_quote,
            pre: "[quote]",
            post: "[/quote]"
        }, {
            id: "code",
            icon: "code",
            title: LANG.markup_code,
            pre: "[code]",
            post: "[/code]"
        }, {
            id: "ul",
            icon: "list-ul",
            title: LANG.markup_ul,
            pre: "[ul]\n[li]",
            post: "[/li]\n[/ul]",
            rep: function(Q) {
                return Q.replace(/\n/g, "[/li]\n[li]")
            }
        }, {
            id: "ol",
            icon: "list-ol",
            title: LANG.markup_ol,
            pre: "[ol]\n[li]",
            post: "[/li]\n[/ol]",
            rep: function(Q) {
                return Q.replace(/\n/g, "[/li]\n[li]")
            }
        }, {
            id: "li",
            icon: "circle",
            title: LANG.markup_li,
            pre: "[li]",
            post: "[/li]"
        }];
        if (!v) {
            for (var K = 0, t = B.length; K < t; ++K) {
                var D = B[K];
                if (l == 4 && D.id == "quote") {
                    break
                }
                if ((g_user.roles & U_GROUP_PENDING) && D.nopending) {
                    continue
                }
                var m = $("<button/>", {
                    click: function(Q, R) {
                        R.preventDefault();
                        (Q.onclick != null ? Q.onclick : g_insertTag.bind(0, f[0], Q.pre, Q.post, Q.rep))()
                    }.bind(null, D)
                });
                m[0].setAttribute("type", "button");
                m.attr("title", D.title);
                var n = $("<i/>", {
                    "class": "fa fa-" + D.icon
                });
                m.append(n);
                c.append(m)
            }
        } else {
            for (var K = 0, t = B.length; K < t; ++K) {
                var D = B[K];
                if ((g_user.rolls & U_GROUP_PENDING) && D.nopending) {
                    continue
                }
                var o = "tb-" + D.id;
                var m = $("<button/>", {
                    click: function(Q, R) {
                        R.preventDefault();
                        (Q.onclick != null ? Q.onclick : g_insertTag.bind(0, f[0], Q.pre, Q.post, Q.rep))()
                    }.bind(null, D),
                    "class": o,
                    title: D.title
                });
                m[0].setAttribute("type", "button");
                m.append("<ins/>");
                c.append(m)
            }
            c.addClass("formatting button sm")
        }
        var H = function(R, Q) {
            var S = prompt(sprintf(LANG.markup_prompt, R), "");
            if (S != null) {
                g_insertTag(f[0], "[" + Q + "=" + (parseInt(S) || 0) + "]", "")
            }
        };
        var L = LANG.ellipsis;
        var F = [
            [9, LANG.types[10][0] + L, H.bind(null, LANG.types[10][1], "achievement")],
            [7, LANG.types[8][0] + L, H.bind(null, LANG.types[8][1], "faction")],
            [0, LANG.types[3][0] + L, H.bind(null, LANG.types[3][1], "item")],
            [1, LANG.types[4][0] + L, H.bind(null, LANG.types[4][1], "itemset")],
            [2, LANG.types[1][0] + L, H.bind(null, LANG.types[1][1], "npc")],
            [3, LANG.types[2][0] + L, H.bind(null, LANG.types[2][1], "object")],
            [4, LANG.types[5][0] + L, H.bind(null, LANG.types[5][1], "quest")],
            [5, LANG.types[6][0] + L, H.bind(null, LANG.types[6][1], "spell")],
            [6, LANG.types[7][0] + L, H.bind(null, LANG.types[7][1], "zone")],
            [8, LANG.types[200][0] + L, H.bind(null, LANG.types[200][1], "pet-ability")]
        ];
        var z = [];
        z = z.concat(F);
        var O = [
            [0, LANG.markup_links, , z]
        ];
        A.append(c);
        A.append(P);
        A.append($('<div style="clear: left" />'));
        A.append(f);
        A.append($("<br/>"));
        Menu.addButtons(P[0], O);
        if (l == 4) {
            A.append(ct(sprintf(LANG.compose_limit2, C, 3)))
        } else {
            A.append(ct(sprintf(LANG.compose_limit, C)))
        }
        var w = $('<span class="comment-remaining"> ' + sprintf(LANG.compose_remaining, C - E.body.length) + "</span>");
        A.append(w);
        f.keyup(Listview.funcBox.coUpdateCharLimit.bind(0, f, w, C));
        f.keydown(Listview.funcBox.coUpdateCharLimit.bind(0, f, w, C));
        /*if ((l == -1 || l == 0) && g_user.roles & U_GROUP_MODERATOR) {
            var q = $("<div/>", {
                "class": "pad"
            });
            var g = $("<div/>", {
                text: (g_user.roles & U_GROUP_ADMIN ? "Admin" : "Moderator") + " response"
            });
            var I = $("<textarea/>", {
                val: E.response,
                rows: 3,
                css: {
                    height: "6em"
                }
            });
            A.append(q);
            A.append(g);
            A.append(I)
        }*/
        N.append(A);
        N.append(j);
        if (l != -1 && l != 0)
            N.append('<input type="submit" value="Submit">');
        $("<div/>").append('<div class="pad"/>').append(g_getMajorHeading($('<a class="disclosure-off"/>').text(LANG.compose_formattinghelp).click(function() {
            g_disclose(this.parentNode.nextSibling, this)
        }), 3, null, {
            classes: "first"
        })).append($('<div style="display: none"/>').append(Markup.toHtml("[markupdoc help=user]"))).insertAfter(N.parent());
        return f
    },
    coLivePreview: function(j, h, b, c) {
        if (c != 1 && b.style.display == "none") {
            return
        }
        var f = this,
            m = Listview.funcBox.coGetCharLimit(h),
            k = (f.value.length > m ? f.value.substring(0, m) : f.value);
        if (h == 4) {
            var l;
            if ((l = k.indexOf("\n")) != -1 && (l = k.indexOf("\n", l + 1)) != -1 && (l = k.indexOf("\n", l + 1)) != -1) {
                k = k.substring(0, l)
            }
        }
        var n = Markup.rolesToClass(j.roles);
        var g = Markup.toHtml(k, {
            allow: n,
            mode: Markup.MODE_COMMENT,
            roles: j.roles
        });
        if (g) {
            b.innerHTML = g
        } else {
            b.innerHTML = '<span class="q6">...</span>'
        }
    },
    coEditButton: function(l, c, k, o) {
        if (c) {
            var h = gE(l.divEdit, "textarea");
            var g = h[0];
            if (!Listview.funcBox.coValidate(g, k)) {
                return
            }
            if (g.value != l.body || (h[1] && h[1].value != l.response)) {
                var m = 0;
                if (l.lastEdit != null) {
                    m = l.lastEdit[1]
                }++m;
                l.lastEdit = [g_serverTime, m, g_user.name];
                if (!l.commentv2) {
                    Listview.funcBox.coUpdateLastEdit(l)
                }
                var n = Listview.funcBox.coGetCharLimit(k);
                var p = Markup.rolesToClass(l.roles);
                var j = Markup.toHtml((g.value.length > n ? g.value.substring(0, n) : g.value), {
                    allow: p,
                    mode: Markup.MODE_COMMENT,
                    roles: l.roles
                });
                var b = ((h[1] && h[1].value.length > 0) ? Markup.toHtml("[div][/div][wowheadresponse=" + g_user.name + " roles=" + g_user.roles + "]" + h[1].value + "[/wowheadresponse]", {
                        allow: Markup.CLASS_STAFF,
                        mode: Markup.MODE_COMMENT,
                        roles: g_user.roles
                    }) : "");
                if (l.commentv2) {
                    l.body = g.value;
                    if (g_user.roles & U_GROUP_MODERATOR && h[1]) {
                        l.response = h[1].value
                    }
                    Listview.templates.comment.updateCommentCell(l)
                } else {
                    if (!o) {
                        l.divBody.innerHTML = j;
                        l.divResponse.innerHTML = b
                    } else {
                        l.divBody.html(j);
                        l.divResponse.html(b)
                    }
                    l.body = g.value;
                    if (g_user.roles & U_GROUP_MODERATOR && h[1]) {
                        l.response = h[1].value
                    }
                }
                var f = "body=" + urlencode(l.body);
                if (l.response !== undefined) {
                    f += "&response=" + urlencode(l.response)
                }

                new Ajax("?comment=edit&id=" + l.id, {
                    method: "POST",
                    params: f
                })
            }
        }
        if (l.commentv2) {
            Listview.templates.comment.updateCommentCell(l)
        } else {
            if (!o) {
                l.divBody.style.display = "";
                l.divResponse.style.display = "";
                l.divLinks.firstChild.style.display = ""
            } else {
                l.divBody.show();
                l.divResponse.show()
            }
        }
        if (!l.commentv2) {
            de(l.divEdit);
            l.divEdit = null
        }
    },
    coGetCharLimit: function(b) {
        if (b == 2) {
            return 7500
        }
        if (b == 4) {
            return 250
        }
        if (g_user.roles & U_GROUP_STAFF) {
            return 16000000
        }
        var c = 1;
        if (g_user.premium) {
            c = 3
        }
        switch (b) {
            case 0:
            case 1:
                return 7500 * c;
            case -1:
            case 3:
                return 15000 * c
        }
    },
    coUpdateCharLimit: function(b, c, f) {
        var g = $(b).val();
        if (g.length > f) {
            $(b).val(g.substring(0, f))
        } else {
            $(c).html(" " + sprintf(LANG.compose_remaining, f - g.length)).removeClass("q10");
            if (g.length == f) {
                $(c).addClass("q10")
            }
        }
    },
    coModeLink: function(k, c, l) {
        var q = Listview.funcBox.coGetCharLimit(c);
        var f = Markup.MODE_COMMENT;
        array_walk(gE(this.parentNode, "a"), function(m) {
            m.className = ""
        });
        this.className = "selected";
        var j = gE(this.parentNode.parentNode, "textarea"),
            g = j[0],
            p = g.parentNode,
            b = $(".comment-body", p.parentNode)[0];
        if (c == 4) {
            f = Markup.MODE_SIGNATURE
        }
        switch (k) {
            case 1:
                p.style.display = "";
                b.style.display = "none";
                g_safeFocus(p.firstChild);
                break;
            case 2:
                p.style.display = "none";
                var n = (g.value.length > q ? g.value.substring(0, q) : g.value);
                if (c == 4) {
                    var o;
                    if ((o = n.indexOf("\n")) != -1 && (o = n.indexOf("\n", o + 1)) != -1 && (o = n.indexOf("\n", o + 1)) != -1) {
                        n = n.substring(0, o)
                    }
                }
                var r = Markup.rolesToClass(l.roles);
                var h = Markup.toHtml(n, {
                    allow: r,
                    mode: f,
                    roles: l.roles
                });
                if (j[1] && j[1].value.length > 0) {
                    h += Markup.toHtml("[div][/div][wowheadresponse=" + g_user.name + " roles=" + g_user.roles + "]" + j[1].value + "[/wowheadresponse]", {
                        allow: Markup.CLASS_STAFF,
                        mode: f,
                        roles: g_user.roles
                    })
                }
                b.innerHTML = h;
                b.style.display = "";
                break
        }
    },
    coValidate: function(b, f) {
        f |= 0;
        if (f == 1 || f == -1) {
            if (trim(b.value).length < 10) {
                alert(LANG.message_forumposttooshort);
                return false
            }
        } else {
            if (trim(b.value).length < 10) {
                alert(LANG.message_commenttooshort);
                return false
            }
        }
        var c = Listview.funcBox.coGetCharLimit(f);
        if (b.value.length > c) {
            if (!confirm(sprintf(f == 1 ? LANG.confirm_forumposttoolong : LANG.confirm_commenttoolong, c, b.value.substring(c - 30, c)))) {
                return false
            }
        }
        return true
    },
    coSortNewestFirst: function(b) {
        $(b).parent().find("a.selected").removeClass("selected");
        b.className = "selected";
        this.mainDiv.className += " listview-aci";
        this.setSort([-7], true, false)
    },
    coSortOldestFirst: function(b) {
        $(b).parent().find("a.selected").removeClass("selected");
        b.className = "selected";
        this.mainDiv.className += " listview-aci";
        this.setSort([7], true, false)
    },
    coSortHighestRatedFirst: function(b) {
        $(b).parent().find("a.selected").removeClass("selected");
        b.className = "selected";
        this.mainDiv.className = this.mainDiv.className.replace("listview-aci", "");
        this.setSort([-3, 7], true, false)
    },
    coFilterByPatchVersion: function(b) {
        this.minPatchVersion = b.value;
        this.refreshRows()
    },
    coUpdateLastEdit: function(j) {
        var c = j.divLastEdit;
        if (!c) {
            return
        }
        if (j.lastEdit != null) {
            var h = j.lastEdit;
            c.childNodes[1].firstChild.nodeValue = h[2];
            c.childNodes[1].href = "?user=" + h[2];
            var f = new Date(h[0]);
            var g = (g_serverTime - f) / 1000;
            if (c.childNodes[3].firstChild) {
                de(c.childNodes[3].firstChild)
            }
            g_formatDate(c.childNodes[3], g, f);
            var b = "";
            if (j.rating != null) {
                b += sprintf(LANG.lvcomment_patch, g_getPatchVersion(f))
            }
            if (h[1] > 1) {
                b += LANG.dash + sprintf(LANG.lvcomment_nedits, h[1])
            }
            c.childNodes[4].nodeValue = b;
            c.style.display = ""
        } else {
            c.style.display = "none"
        }
    },
    coFormatFileSize: function(f) {
        var c = -1;
        var b = "KMGTPEZY";
        while (f >= 1024 && c < 7) {
            f /= 1024;
            ++c
        }
        if (c < 0) {
            return f + " byte" + (f > 1 ? "s" : "")
        } else {
            return f.toFixed(1) + " " + b[c] + "B"
        }
    },
    dateEventOver: function(f, b, k) {
        var c = g_getEventNextDates(b, f),
            m = "";
        if (c[0] && c[1]) {
            var j = c[0],
                g = c[1],
                h, l;
            j.setFullYear(f.getFullYear(), f.getMonth(), f.getDate());
            g.setFullYear(f.getFullYear(), f.getMonth(), f.getDate());
            if (f.getFullYear() == c[0].getFullYear() && f.getMonth() == c[0].getMonth() && f.getDate() == c[0].getDate()) {
                h = true
            }
            if (f.getFullYear() == c[1].getFullYear() && f.getMonth() == c[1].getMonth() && f.getDate() == c[1].getDate()) {
                l = true
            }
            if (h && l) {
                m = g_formatTimeSimple(j, LANG.lvscreenshot_from, 1) + " " + g_formatTimeSimple(g, LANG.date_to, 1)
            } else {
                if (h) {
                    m = g_formatTimeSimple(j, LANG.tab_starts)
                } else {
                    if (l) {
                        m = g_formatTimeSimple(g, LANG.tab_ends)
                    } else {
                        m = LANG.allday
                    }
                }
            }
        }
        Tooltip.showAtCursor(k, '<span class="q1">' + b.name + "</span><br />" + m, 0, 0, "q")
    },
    comparisonTextOver: function(k, f, c, m, l) {
        var o = '<table class="compare"><tr>';
        var b;
        o += "<tr>";
        for (var h = 0; h < k.data.length; ++h) {
            b = (k.data[h].status == c ? "this" : "other");
            o += "<td><b>" + f ? m[b] : LANG["lvcomparison_" + b] + "</b></td>"
        }
        o += "</tr>";
        for (var h = 0; h < k.tooltip.length; ++h) {
            var n = 1;
            if (k.progress < 1) {
                n = (k.tooltip[h][k.data[0].status] ? 1 : 0);
                for (var g = 1; n && g < k.data.length; ++g) {
                    if (k.tooltip[h][k.data[g].status] == "&lt;" + LANG.fiany + "&gt;") {
                        continue
                    }
                    if (!k.tooltip[h][k.data[g].status] || k.tooltip[h][k.data[g].status] != k.tooltip[h][k.data[0].status]) {
                        n = 0
                    }
                }
            }
            o += "<tr>";
            for (var g = 0; g < k.data.length; ++g) {
                o += '<td class="q' + n + '">' + k.tooltip[h][k.data[g].status] + "</td>"
            }
            o += "</tr>"
        }
        o += "</table>";
        Tooltip.showAtCursor(l, o, 0, 0, "q")
    },
    ssCellOver: function() {
        this.className = "screenshot-caption-over"
    },
    ssCellOut: function() {
        this.className = "screenshot-caption"
    },
    ssCellClick: function(c, g) {
        g = $E(g);
        if (g.shiftKey || g.ctrlKey) {
            return
        }
        var b = 0,
            f = g._target;
        while (f && b < 3) {
            if (f.nodeName == "A") {
                return
            }
            if (f.nodeName == "IMG") {
                break
            }
            f = f.parentNode
        }
        ScreenshotViewer.show({
            screenshots: this.data,
            pos: c,
            hashname: this.id
        })
    },
    ssCreateCb: function(g, c) {
        if (c.__nochk) {
            return
        }
        var f = ce("div");
        f.className = "listview-cb";
        f.onclick = Listview.cbCellClick;
        var b = ce("input");
        b.type = "checkbox";
        b.onclick = Listview.cbClick;
        ns(b);
        if (c.__chk) {
            b.checked = true
        }
        c.__cb = b;
        ae(f, b);
        ae(g, f)
    },
    viCellClick: function(c, g) {
        g = $E(g);
        if (g.shiftKey || g.ctrlKey) {
            return
        }
        var b = 0,
            f = g._target;
        while (f && b < 3) {
            if (f.nodeName == "A") {
                return
            }
            if (f.nodeName == "IMG") {
                break
            }
            f = f.parentNode
        }
        VideoViewer.show({
            videos: this.data,
            pos: c
        })
    },
    moneyAchievementOver: function(b) {
        Tooltip.showAtCursor(b, "<b>" + LANG.tooltip_achievementpoints + "</b>", 0, 0, "q1")
    },
    moneyCurrencyOver: function(c, j, k) {
        var l = g_gatheredcurrencies[c]["name_" + Locale.getName()];
        switch (c) {
            case 395:
                var g = [
                    [80, 16, LANG.tooltip_ppbheroic],
                    [80, 23, LANG.tooltip_ppbraid],
                    [85, 75, LANG.tooltip_ppbheroic],
                    [90, 100, LANG.tooltip_ppbheroic]
                ];
                break;
            case 396:
                var g = [
                    [90, 40, sprintf(LANG.tooltip_ppb10man, LANG.tooltip_ppbraid)],
                    [90, 40, sprintf(LANG.tooltip_ppb25man, LANG.tooltip_ppbraid)]
                ];
                break;
            default:
                var g = [];
                break
        }
        if (g.length && j) {
            l += '<br /><span class="q">';
            for (var f = 0, b = g.length; f < b; ++f) {
                var h = Math.ceil(j / g[f][1]);
                if (f > 0) {
                    l += "<br />"
                }
                l += sprintf(LANG["tooltip_pointsperboss" + (h == 1 ? 1 : 2)], h, g[f][0], g[f][2])
            }
            l += "</span>"
        }
        Tooltip.showAtCursor(k, l, 0, 0, "q1")
    },
    appendMoney: function(k, b, j, g, c, q) {
        var o, n, m = 0;
        if (j == 1 || j == "alliance") {
            j = 1
        } else {
            if (j == 2 || j == "horde") {
                j = 2
            } else {
                j = 3
            }
        }
        if (b >= 10000) {
            m = 1;
            o = ce("span");
            o.className = "moneygold";
            ae(o, ct(number_format(Math.floor(b / 10000))));
            ae(k, o);
            b %= 10000
        }
        if (b >= 100) {
            if (m) {
                ae(k, ct(" "))
            } else {
                m = 1
            }
            o = ce("span");
            o.className = "moneysilver";
            ae(o, ct(Math.floor(b / 100)));
            ae(k, o);
            b %= 100
        }
        if (b >= 1) {
            if (m) {
                ae(k, ct(" "))
            } else {
                m = 1
            }
            o = ce("span");
            o.className = "moneycopper";
            ae(o, ct(b));
            ae(k, o)
        }
        if (g != null) {
            for (var f = 0; f < g.length; ++f) {
                if (m) {
                    ae(k, ct(" "))
                } else {
                    m = 1
                }
                var r = g[f][0];
                var h = g[f][1];
                var l = g_items.getIcon(r);
                o = ce("a");
                o.href = "?item=" + r;
                o.className = "moneyitem";
                o.style.backgroundImage = "url(" + g_staticUrl + "/images/icons/tiny/" + l.toLowerCase() + ".png)";
                ae(o, ct(h));
                ae(k, o)
            }
        }
        if (c != null) {
            for (var f = 0; f < c.length; ++f) {
                if (m) {
                    ae(k, ct(" "))
                } else {
                    m = 1
                }
                var p = c[f][0];
                var h = c[f][1];
                if (!g_gatheredcurrencies[p]) {
                    $.each(g_currencies, function(t, s) {
                        g_gatheredcurrencies[t] = [];
                        g_gatheredcurrencies[t]["name_" + Locale.getName()] = s[0];
                        g_gatheredcurrencies[t].icon = [];
                        g_gatheredcurrencies[t].icon.push(s[1]);
                        g_gatheredcurrencies[t].icon.push(s[1])
                    })
                }
                var l = g_gatheredcurrencies.getIcon(p, (j == 3 ? 0 : j - 1));
                if ((!l) && isset("g_currencies") && g_currencies.hasOwnProperty(p)) {
                    l = g_currencies[p].icon
                }
                if (!l) {
                    l = "inv_misc_questionmark"
                }
                o = ce("a");
                o.href = "?currency=" + p;
                o.className = "icontinyr tip q1";
                o.style.display = "inline-block";
                o.style.backgroundImage = "url(" + g_staticUrl + "/images/icons/tiny/" + l.toLowerCase() + ".png)";
                o.onmouseover = Listview.funcBox.moneyCurrencyOver.bind(o, p, h);
                o.onmousemove = Tooltip.cursorUpdate;
                o.onmouseout = Tooltip.hide;
                ae(k, o);
                ae(o, ct(number_format(h)))
            }
        }
        if (q > 0) {
            if (m) {
                ae(k, ct(" "))
            } else {
                m = 1
            }
            o = ce("span");
            o.className = "moneyachievement tip";
            o.onmouseover = Listview.funcBox.moneyAchievementOver;
            o.onmousemove = Tooltip.cursorUpdate;
            o.onmouseout = Tooltip.hide;
            ae(o, ct(number_format(q)));
            ae(k, o)
        }
    },
    viewColors: function(b, c) {
        if (c >= 50000) {
            b.css("color", "#FF4040");
            b.css("font-weight", "bold")
        } else {
            if (c >= 25000) {
                b.css("color", "#FF8000");
                b.css("font-weight", "bold")
            } else {
                if (c >= 10000) {
                    b.css("color", "#A335EE")
                } else {
                    if (c >= 5000) {
                        b.css("color", "#0070DD")
                    } else {
                        if (c >= 1000) {
                            b.css("color", "#1EFF00")
                        }
                    }
                }
            }
        }
    },
    getUpperSource: function(b, c) {
        switch (b) {
            case 2:
                if (c.bd) {
                    return LANG.source_bossdrop
                }
                if (c.z) {
                    return LANG.source_zonedrop
                }
                break;
            case 4:
                return LANG.source_quests;
            case 5:
                return LANG.source_vendors
        }
        return g_sources[b]
    },
    getLowerSource: function(b, g, f) {
        switch (b) {
            case 3:
                if (g.p && g_sources_pvp[g.p]) {
                    return {
                        text: g_sources_pvp[g.p]
                    }
                }
                break
        }
        switch (f) {
            case 0:
            case 1:
            case 2:
                if (g.z) {
                    var c = {
                        url: "?zone=" + g.z,
                        text: g_zones[g.z]
                    };
                    if (g.t && b == 5) {
                        c.pretext = LANG.lvitem_vendorin
                    }
                    if (g.dd && g.dd != 99) {
                        if (g.dd < 0) {
                            c.posttext = sprintf(LANG.lvitem_dd, "", (g.dd < -1 ? LANG.lvitem_heroic : LANG.lvitem_normal))
                        } else {
                            if (g.dd >= 14) {
                                c.posttext = (g.dd == 15 || g.dd == 16) ? LANG.lvitem_heroic : LANG.lvitem_normal
                            } else {
                                c.posttext = sprintf(LANG.lvitem_dd, (g.dd & 1 ? LANG.lvitem_raid10 : LANG.lvitem_raid25), (g.dd > 2 ? LANG.lvitem_heroic : LANG.lvitem_normal))
                            }
                        }
                    }
                    return c
                }
                break;
            case 5:
                return {
                    url: g_getRelativeHostPrefix() + "?quests=" + g.c2 + "." + g.c,
                    text: Listview.funcBox.getQuestCategory(g.c)
                };
                break;
            case 6:
                if (g.c && g.s) {
                    return {
                        url: g_getRelativeHostPrefix() + "?spells=" + g.c + "." + g.s,
                        text: g_spell_skills[g.s]
                    }
                } else {
                    return {
                        url: g_getRelativeHostPrefix() + "?spells=0",
                        text: "??"
                    }
                }
                break
        }
    },
    getExpansionText: function(b) {
        var c = "";
        if (b.expansion == 1) {
            c += " bc"
        } else {
            if (b.expansion == 2) {
                c += " wotlk wrath"
            } else {
                if (b.expansion == 3) {
                    c += " cat cata cataclysm"
                }
            }
        }
        return c
    },
    getComparisonText: function(h, c, b, k) {
        var n = ce("span");
        n.className = "compare-text";
        if (!c) {
            n.style.display = "block";
            n.style.margin = "0 auto";
            n.style.textAlign = "left";
            n.style.width = "53px"
        }
        if (!k) {
            k = LANG.lvcompletion
        }
        var f = h.hasOwnProperty("progressAmount") ? h.progressAmount : h.progress;
        if (f < 0) {
            f = 0
        }
        var l = ce("span");
        l.className = "progress-icon progress-" + (f == 1 ? "8" : Math.min(Math.round(f * 8), 7));
        var m = ce("span");
        if (c) {
            if (h.progress == 1) {
                st(m, k.identical)
            } else {
                if (h.progress == -1) {
                    st(m, k.duplicate)
                } else {
                    if (!h.progress && h.primary == b) {
                        st(m, k.extra)
                    } else {
                        if (!h.progress) {
                            st(m, k.missing)
                        } else {
                            var o = ce("span");
                            o.className = "tip";
                            st(o, Math.floor(h.progress * 100) + "%");
                            ae(m, ct(k.similar + " ("));
                            ae(m, o);
                            ae(m, ct(")"))
                        }
                    }
                }
            }
        } else {
            st(m, Math.floor(h.progress * 100) + "%")
        }
        var j = true;
        for (var g in h.tooltip) {
            j = j && (h.tooltip[g].length != h.data.length)
        }
        if (h.tooltip.length && j) {
            n.onmouseover = Listview.funcBox.comparisonTextOver.bind(n, h, c, b, k);
            n.onmousemove = Tooltip.cursorUpdate;
            n.onmouseout = Tooltip.hide;
            if (!c) {
                m.className = "tip"
            }
        }
        m.insertBefore(ct(" "), m.firstChild);
        m.insertBefore(l, m.firstChild);
        m.style.whiteSpace = "nowrap";
        ae(n, m);
        return n
    }
};

function Listview(a) {
    cO(this, a);
    if (this.id) {
        var m = (this.tabs ? "tab-" : "lv-") + this.id;
        if (this.parent) {
            var k = ce("div");
            k.id = m;
            ae($_(this.parent), k);
            this.container = k
        } else {
            this.container = ge(m)
        }
    } else {
        return
    }
    if (this.template && Listview.templates[this.template]) {
        this.template = Listview.templates[this.template]
    } else {
        return
    }
    g_listviews[this.id] = this;
    if (this.data == null) {
        this.data = []
    }
    if (this.poundable == null) {
        if (this.template.poundable != null) {
            this.poundable = this.template.poundable
        } else {
            this.poundable = true
        }
    }
    if (this.searchable == null) {
        if (this.template.searchable != null) {
            this.searchable = this.template.searchable
        } else {
            this.searchable = false
        }
    }
    if (this.filtrable == null) {
        if (this.template.filtrable != null) {
            this.filtrable = this.template.filtrable
        } else {
            this.filtrable = false
        }
    }
    if (this.data.length == 1) {
        this.filtrable = false;
        this.searchable = false
    }
    if (this.searchable && this.searchDelay == null) {
        if (this.template.searchDelay != null) {
            this.searchDelay = this.template.searchDelay
        } else {
            this.searchDelay = 333
        }
    }
    if (this.hideBands == null) {
        this.hideBands = this.template.hideBands
    }
    if (this.hideNav == null) {
        this.hideNav = this.template.hideNav
    }
    if (this.hideHeader == null) {
        this.hideHeader = this.template.hideHeader
    }
    if (this.hideCount == null) {
        this.hideCount = this.template.hideCount
    }
    if (this.getItemLink == null  && this.template.getItemLink != null ) {
        this.getItemLink = this.template.getItemLink
    }
    if (this.computeDataFunc == null && this.template.computeDataFunc != null) {
        this.computeDataFunc = this.template.computeDataFunc
    }
    if (this.createCbControls == null && this.template.createCbControls != null) {
        this.createCbControls = this.template.createCbControls
    }
    if (this.template.onBeforeCreate != null) {
        if (this.onBeforeCreate == null) {
            this.onBeforeCreate = this.template.onBeforeCreate
        } else {
            this.onBeforeCreate = [this.template.onBeforeCreate, this.onBeforeCreate]
        }
    }
    if (this.onAfterCreate == null && this.template.onAfterCreate != null) {
        this.onAfterCreate = this.template.onAfterCreate
    }
    if (this.createNote == null && this.template.createNote != null) {
        this.createNote = this.template.createNote
    }
    if (this.sortOptions == null && this.template.sortOptions != null) {
        this.sortOptions = this.template.sortOptions
    }
    if (this.customFilter == null && this.template.customFilter != null) {
        this.customFilter = this.template.customFilter
    }
    if (this.customFilter) {
        this.customFilter = this.customFilter.bind(this)
    }
    if (this.clip == null && this.template.clip != null) {
        this.clip = this.template.clip
    }
    if (this.mode == null) {
        this.mode = this.template.mode
    }
    if (this.nItemsPerPage == null) {
        if (this.template.nItemsPerPage != null) {
            this.nItemsPerPage = this.template.nItemsPerPage
        } else {
            this.nItemsPerPage = 50
        }
    }
    this.nItemsPerPage |= 0;
    if (this.nItemsPerPage <= 0) {
        this.nItemsPerPage = 0
    }
    this.nFilters = 0;
    this.resetRowVisibility();
    if (this.mode == Listview.MODE_TILED) {
        if (this.nItemsPerRow == null) {
            var q = this.template.nItemsPerRow;
            this.nItemsPerRow = (q != null ? q : 4)
        }
        this.nItemsPerRow |= 0;
        if (this.nItemsPerRow <= 1) {
            this.nItemsPerRow = 1
        }
    } else {
        this.nItemsPerRow = 1
    }
    this.columns = [];
    for (var e = 0, j = this.template.columns.length; e < j; ++e) {
        var p = this.template.columns[e],
            c = {};
        cO(c, p);
        this.columns.push(c)
    }
    if (this.extraCols != null) {
        for (var e = 0, j = this.extraCols.length; e < j; ++e) {
            var l = null;
            var b = this.extraCols[e];
            if (b.after || b.before) {
                var h = in_array(this.columns, (b.after ? b.after : b.before), function (d) {
                    return d.id
                });
                if (h != -1) {
                    l = (b.after ? h + 1 : h - 1)
                }
            }
            if (l == null) {
                l = this.columns.length
            }
            this.columns.splice(l, 0, b)
        }
    }
    this.visibility = [];
    var n = [],
        o = [];
    if (this.visibleCols != null) {
        array_walk(this.visibleCols, function (d) {
            n[d] = 1
        })
    }
    if (this.hiddenCols != null) {
        array_walk(this.hiddenCols, function (d) {
            o[d] = 1
        })
    }
    if ($.isArray(this.sortOptions)) {
        for (var r = 0, t = this.sortOptions.length; r < t; ++r) {
            var f = this.sortOptions[r];
            if (n[f.id] != null || (!f.hidden && o[f.id] == null)) {
                this.visibility.push(r)
            }
        }
    } else {
        for (var e = 0, j = this.columns.length; e < j; ++e) {
            var b = this.columns[e];
            if (n[b.id] != null || (!b.hidden && o[b.id] == null)) {
                this.visibility.push(e)
            }
        }
    }
    if (this.sort == null && this.template.sort) {
        this.sort = this.template.sort.slice(0)
    } else {
        if (this.sort != null) {
            var g = this.sort;
            this.sort = [];
            for (var e = 0, j = g.length; e < j; ++e) {
                var b = parseInt(g[e]);
                if (isNaN(b)) {
                    var f = 0;
                    if (g[e].charAt(0) == "-") {
                        f = 1;
                        g[e] = g[e].substring(1)
                    }
                    var h = in_array(this.columns, g[e], function (d) {
                        return d.id
                    });
                    if (h != -1) {
                        if (f) {
                            this.sort.push(-(h + 1))
                        } else {
                            this.sort.push(h + 1)
                        }
                    }
                } else {
                    this.sort.push(b)
                }
            }
        } else {
            this.sort = []
        }
    }
    if (this.tabs) {
        this.tabIndex = this.tabs.add(this.getTabName(), {
            id: this.id,
            onLoad: this.initialize.bind(this)
        })
    } else {
        this.initialize()
    }
}
Listview.MODE_DEFAULT = 0;
Listview.MODE_CHECKBOX = 1;
Listview.MODE_DIV = 2;
Listview.MODE_TILED = 3;
Listview.prototype = {
    initialize: function () {
        if (this.data.length) {
            if (this.computeDataFunc != null) {
                for (var d = 0, a = this.data.length; d < a; ++d) {
                    this.computeDataFunc(this.data[d])
                }
            }
        }
        if (this.tabs) {
            this.pounded = (this.tabs.poundedTab == this.tabIndex);
            if (this.pounded) {
                this.readPound()
            }
        } else {
            this.readPound()
        }
        this.updateSortIndex();
        var b;
        if (this.onBeforeCreate != null) {
            if (typeof this.onBeforeCreate == "function") {
                b = this.onBeforeCreate()
            } else {
                for (var d = 0; d < this.onBeforeCreate.length; ++d) {
                    (this.onBeforeCreate[d].bind(this))()
                }
            }
        }
        this.noData = ce("div");
        this.noData.className = "listview-nodata text";
        if (this.mode == Listview.MODE_DIV) {
            this.mainContainer = this.mainDiv = ce("div");
            this.mainContainer.className = "listview-mode-div"
        } else {
            this.mainContainer = this.table = ce("table");
            this.thead = ce("thead");
            this.tbody = ce("tbody");
            if (this.mode == Listview.MODE_TILED) {
                this.table.className = "listview-mode-tiled";
                var e = (100 / this.nItemsPerRow) + "%",
                    f = ce("colgroup"),
                    c;
                for (var d = 0; d < this.nItemsPerRow; ++d) {
                    c = ce("col");
                    c.style.width = e;
                    ae(f, c)
                }
                ae(this.mainContainer, f)
                if (this.sortOptions) {
                    setTimeout((function() {
                        this.updateSortArrow()
                    }).bind(this), 0)
                }
            } else {
                this.table.className = "listview-mode-default";
                this.createHeader();
                this.updateSortArrow()
            }
            ae(this.table, this.thead);
            ae(this.table, this.tbody);
            if (false /*this.mode == Listview.MODE_CHECKBOX */ && Browser.ie) {
                setTimeout(Listview.cbIeFix.bind(this), 1)
            }
        }
        this.createBands();
        if (this.customFilter != null) {
            this.updateFilters()
        }
        this.updateNav();
        this.applySort();
        this.refreshRows();
        if (this.onAfterCreate != null) {
            this.onAfterCreate(b)
        }
    },
    createHeader: function () {
        var h = ce("tr");
        if (false /*this.mode == Listview.MODE_CHECKBOX*/) {
            var g = ce("th"),
                j = ce("div"),
                c = ce("a");
            g.style.width = "33px";
            c.href = "javascript:;";
            c.className = "listview-cb";
            ns(c);
            ae(c, ct(String.fromCharCode(160)));
            ae(j, c);
            ae(g, j);
            ae(h, g)
        }
        for (var f = 0, b = this.visibility.length; f < b; ++f) {
            var e = this.visibility[f],
                d = this.columns[e],
                g = ce("th");
            j = ce("div"),
            c = ce("a"),
            outerSpan = ce("span"),
            innerSpan = ce("span");
            d.__th = g;
            c.href = "javascript:;";
            if (this.filtrable && (d.filtrable == null || d.filtrable)) {
                c.onmouseup = Listview.headerClick.bind(this, d, e);
                c.onclick = c.oncontextmenu = rf
            } else {
                c.onclick = this.sortBy.bind(this, e + 1)
            }
            c.onmouseover = Listview.headerOver.bind(this, c, d);
            c.onmouseout = Tooltip.hide;
            ns(c);
            if (d.width != null) {
                g.style.width = d.width
            }
            if (d.align != null) {
                g.style.textAlign = d.align
            }
            if (d.span != null) {
                g.colSpan = d.span
            }
            ae(innerSpan, ct(d.name));
            ae(outerSpan, innerSpan);
            ae(c, outerSpan);
            ae(j, c);
            ae(g, j);
            ae(h, g)
        }
        if (this.hideHeader) {
            this.thead.style.display = "none"
        }
        ae(this.thead, h)
    },
    createSortOptions: function(k) {
        if (!$.isArray(this.sortOptions)) {
            return
        }
        var g = ce("div");
        g.className = "listview-sort-options";
        g.innerHTML = LANG.lvnote_sort;
        var j = ce("span");
        j.className = "listview-sort-options-choices";
        var f = null;
        if ($.isArray(this.sort)) {
            f = this.sort[0]
        }
        var b;
        var c = [];
        for (var h = 0; h < this.sortOptions.length; h++) {
            if (this.sortOptions[h].hidden) {
                continue
            }
            b = ce("a");
            b.href = "javascript:;";
            b.innerHTML = this.sortOptions[h].name;
            b.onclick = this.sortGallery.bind(this, b, h + 1);
            if (f === h + 1) {
                b.className = "active"
            }
            c.push(b)
        }
        for (h = 0; h < c.length; h++) {
            ae(j, c[h])
        }
        ae(g, j);
        aef(k, g)
    },
    sortGallery: function(b, c) {
        var f = $(b);
        f.siblings("a").removeClass("active");
        f.addClass("active");
        this.sortBy(c)
    },
    createBands: function () {
        var h = ce("div"),
            j = ce("div"),
            k = ce("div"),
            i = ce("div");
        this.bandTop = h;
        this.bandBot = j;
        this.noteTop = k;
        this.noteBot = i;
        h.className = "listview-band-top";
        j.className = "listview-band-bottom";
        this.navTop = this.createNav(true);
        this.navBot = this.createNav(false);
        k.className = i.className = "listview-note";
        if (this.note) {
            k.innerHTML = this.note
        } else {
            if (this.createNote) {
                this.createNote(k, i)
            }
        }
        this.createSortOptions(k);
        if (!k.firstChild /* && this.mode != Listview.MODE_CHECKBOX*/) {
            ae(k, ct(String.fromCharCode(160)))
        }
       // if (this.mode != Listview.MODE_CHECKBOX) {
            ae(i, ct(String.fromCharCode(160)))
        //}
        ae(h, this.navTop);
        if (this.searchable) {
            var l = this.updateFilters.bind(this, true),
                d = (this._truncated ? "search-within-results2" : "search-within-results"),
                c = ce("span"),
                b = ce("em"),
                g = ce("a"),
                f = ce("input");
            c.className = "listview-quicksearch";
            ae(c, b);
            g.href = "javascript:;";
            g.onclick = function () {
                var a = this.nextSibling;
                a.value = "";
                a.className = d;
                l()
            };
            g.style.display = "none";
            ae(g, ce("span"));
            ae(c, g);
            ns(g);
            f.setAttribute("type", "text");
            f.className = d;
            f.style.width = (this._truncated ? "19em" : "15em");
            g_onAfterTyping(f, l, this.searchDelay);
            f.onmouseover = function () {
                if (trim(this.value) != "") {
                    this.className = ""
                }
            };
            f.onfocus = function () {
                this.className = ""
            };
            f.onblur = function () {
                if (trim(this.value) == "") {
                    this.className = d;
                    this.value = ""
                }
            };
            if (Browser.ie) {
                setTimeout(function () {
                        f.value = ""
                    },
                    1)
            }
            ae(c, f);
            this.quickSearchBox = f;
            this.quickSearchGlass = b;
            this.quickSearchClear = g;
            ae(h, c)
        }
        ae(h, k);
        ae(j, this.navBot);
        ae(j, i);
        if (false) {
            if (this.note) {
                k.style.paddingBottom = "5px"
            }
            this.cbBarTop = this.createCbBar(true);
            this.cbBarBot = this.createCbBar(false);
            ae(h, this.cbBarTop);
            ae(j, this.cbBarBot);
            if (!this.noteTop.firstChild && !this.cbBarTop.firstChild) {
                this.noteTop.innerHTML = "&nbsp;"
            }
            if (!this.noteBot.firstChild && !this.cbBarBot.firstChild) {
                this.noteBot.innerHTML = "&nbsp;"
            }
            if (this.noteTop.firstChild && this.cbBarTop.firstChild) {
                this.noteTop.style.paddingBottom = "6px"
            }
            if (this.noteBot.firstChild && this.cbBarBot.firstChild) {
                this.noteBot.style.paddingBottom = "6px"
            }
        }
        if (this.hideBands & 1) {
            h.style.display = "none"
        }
        if (this.hideBands & 2) {
            j.style.display = "none"
        }
        ae(this.container, this.bandTop);
        if (this.clip) {
            var e = ce("div");
            e.className = "listview-clip";
            e.style.width = this.clip.w + "px";
            e.style.height = this.clip.h + "px";
            this.clipDiv = e;
            ae(e, this.mainContainer);
            ae(e, this.noData);
            ae(this.container, e)
        } else {
            ae(this.container, this.mainContainer);
            ae(this.container, this.noData)
        }
        ae(this.container, this.bandBot)
    },
    createNav: function (g) {
        var c = ce("div"),
            d = ce("a"),
            b = ce("a"),
            a = ce("a"),
            j = ce("a"),
            i = ce("span"),
            h = ce("b"),
            f = ce("b"),
            e = ce("b");
        c.className = "listview-nav";
        d.href = b.href = a.href = j.href = "javascript:;";
        ae(d, ct(String.fromCharCode(171) + LANG.lvpage_first));
        ae(b, ct(String.fromCharCode(8249) + LANG.lvpage_previous));
        ae(a, ct(LANG.lvpage_next + String.fromCharCode(8250)));
        ae(j, ct(LANG.lvpage_last + String.fromCharCode(187)));
        ns(d);
        ns(b);
        ns(a);
        ns(j);
        d.onclick = this.firstPage.bind(this);
        b.onclick = this.previousPage.bind(this);
        a.onclick = this.nextPage.bind(this);
        j.onclick = this.lastPage.bind(this);
        ae(h, ct("a"));
        ae(f, ct("a"));
        ae(e, ct("a"));
        ae(i, h);
        ae(i, ct(LANG.hyphen));
        ae(i, f);
        ae(i, ct(LANG.lvpage_of));
        ae(i, e);
        ae(c, d);
        ae(c, b);
        ae(c, i);
        ae(c, a);
        ae(c, j);
        if (g) {
            if (this.hideNav & 1) {
                c.style.display = "none"
            }
        } else {
            if (this.hideNav & 2) {
                c.style.display = "none"
            }
        }
        return c
    },
    createCbBar: function (a) {
        var b = ce("div");
        if (this.createCbControls) {
            this.createCbControls(b, a)
        }
        if (b.firstChild) {
            b.className = "listview-withselected" + (a ? "" : "2")
        }
        return b
    },
    refreshRows: function () {
        var a = (this.mode == Listview.MODE_DIV ? this.mainContainer : this.tbody);
        ee(a);
        if (this.nRowsVisible == 0) {
            if (!this.filtered) {
                this.bandTop.style.display = this.bandBot.style.display = "none";
                this.mainContainer.style.display = "none"
            }
            this.noData.style.display = "";
            this.showNoData();
            return
        }
        var n, b, c;
        if (!(this.hideBands & 1)) {
            this.bandTop.style.display = ""
        }
        if (!(this.hideBands & 2)) {
            this.bandBot.style.display = ""
        }
        if (this.nItemsPerPage > 0) {
            n = this.rowOffset;
            b = Math.min(n + this.nRowsVisible, n + this.nItemsPerPage);
            if (this.filtered && this.rowOffset > 0) {
                for (var f = 0, g = 0; f < this.data.length && g < this.rowOffset; ++f) {
                    var o = this.data[f];
                    if (o.__hidden || o.__deleted) {
                        ++n
                    } else {
                        ++g
                    }
                }
                b += (n - this.rowOffset)
            }
        } else {
            n = 0;
            b = this.nRowsVisible
        }
        var h = b - n;
        if (this.mode == Listview.MODE_DIV) {
            for (var e = 0; e < h; ++e) {
                var f = n + e,
                    o = this.data[f];
                if (!o) {
                    break
                }
                if (o.__hidden || o.__deleted) {
                    ++h;
                    continue
                }
                ae(this.mainDiv, this.getDiv(f))
            }
        } else {
            if (this.mode == Listview.MODE_TILED) {
                var d = 0,
                    l = ce("tr");
                for (var e = 0; e < h; ++e) {
                    var f = n + e,
                        o = this.data[f];
                    if (!o) {
                        break
                    }
                    if (o.__hidden || o.__deleted) {
                        ++h;
                        continue
                    }
                    ae(l, this.getCell(f));
                    if (++d == this.nItemsPerRow) {
                        ae(this.tbody, l);
                        if (e + 1 < h) {
                            l = ce("tr")
                        }
                        d = 0
                    }
                }
                if (d != 0) {
                    for (; d < 4; ++d) {
                        var m = ce("td");
                        m.className = "empty-cell";
                        ae(l, m)
                    }
                    ae(this.tbody, l)
                }
            } else {
                for (var e = 0; e < h; ++e) {
                    var f = n + e,
                        o = this.data[f];
                    if (!o) {
                        break
                    }
                    if (o.__hidden || o.__deleted) {
                        ++h;
                        continue
                    }
                    ae(this.tbody, this.getRow(f))
                }
            }
        }
        this.mainContainer.style.display = "";
        this.noData.style.display = "none"
    },
    showNoData: function () {
        var b = this.noData;
        ee(b);
        var a = -1;
        if (this.template.onNoData) {
            a = (this.template.onNoData.bind(this, b))()
        }
        if (a == -1) {
            ae(this.noData, ct(this.filtered ? LANG.lvnodata2 : LANG.lvnodata))
        }
    },
    getDiv: function (a) {
        var b = this.data[a];
        if (b.__div == null || this.minPatchVersion != b.__minPatch) {
            this.createDiv(b, a)
        }
        return b.__div
    },
    createDiv: function (b, a) {
        var c = ce("div");
        b.__div = c;
        if (this.minPatchVersion) {
            b.__minPatch = this.minPatchVersion
        }
        (this.template.compute.bind(this, b, c, a))()
    },
    getCell: function (a) {
        var b = this.data[a];
        if (b.__div == null) {
            this.createCell(b, a)
        }
        return b.__td
    },
    createCell: function (b, a) {
        var c = ce("td");
        b.__td = c;
        (this.template.compute.bind(this, b, c, a))();
        if (this.template.getItemLink) {
            c.onclick = this.itemClick.bind(this, b)
        }
        if (Browser.ie6) {
            c.onmouseover = Listview.itemOver;
            c.onmouseout = Listview.itemOut
        }
    },
    getRow: function (a) {
        var b = this.data[a];
        if (b.__tr == null) {
            this.createRow(b)
        }
        return b.__tr
    },
    createRow: function (j) {
        var g = ce("tr");
        j.__tr = g;
        if (false /*this.mode == Listview.MODE_CHECKBOX*/) {
            var c = ce("td");
            if (!j.__nochk) {
                c.className = "listview-cb";
                c.onclick = Listview.cbCellClick;
                var b = ce("input");
                ns(b);
                b.type = "checkbox";
                b.onclick = Listview.cbClick;
                if (j.__chk) {
                    b.checked = true;
                    if (Browser.ie) {
                        b.defaultChecked = true
                    }
                }
                j.__cb = b;
                ae(c, b)
            }
            ae(g, c)
        }
        for (var d = 0, e = this.visibility.length; d < e; ++d) {
            var f = this.visibility[d],
                a = this.columns[f],
                c = ce("td"),
                h;
            if (a.align != null) {
                c.style.textAlign = a.align
            }
            if (a.compute) {
                h = (a.compute.bind(this, j, c, g, f))()
            } else {
                if (j[a.value] != null) {
                    h = j[a.value]
                } else {
                    h = -1
                }
            }
            if (h != -1 && h != null) {
                c.insertBefore(ct(h), c.firstChild)
            }
            ae(g, c)
        }
        /*
        if (this.mode == Listview.MODE_CHECKBOX && j.__chk) {
            g.className = "checked"
        }*/
        if (this.template.getItemLink) {
            g.onclick = this.itemClick.bind(this, j)
        }
        if (Browser.ie6) {
            g.onmouseover = Listview.itemOver;
            g.onmouseout = Listview.itemOut
        }
    },
    itemClick: function (d, c) {
        c = $E(c);
        var a = 0,
            b = c._target;
        while (b && a < 3) {
            if (b.nodeName == "A") {
                return
            }
            b = b.parentNode
        }
        location.href = this.template.getItemLink(d)
    },
    validatePage: function () {
        var c = this.nItemsPerPage,
            b = this.rowOffset,
            a = this.nRowsVisible;
        if (b < 0) {
            this.rowOffset = 0
        } else {
            this.rowOffset = this.getRowOffset(b + c > a ? a - 1 : b)
        }
    },
    getRowOffset: function (b) {
        var a = this.nItemsPerPage;
        return (a > 0 && b > 0 ? Math.floor(b / a) * a : 0)
    },
    resetRowVisibility: function () {
        for (var b = 0, a = this.data.length; b < a; ++b) {
            this.data[b].__hidden = false
        }
        this.filtered = false;
        this.rowOffset = 0;
        this.nRowsVisible = this.data.length
    },
    getColText: function (b, a) {
        if (a.getVisibleText) {
            return a.getVisibleText(b)
        }
        if (a.getValue) {
            return a.getValue(b)
        }
        if (a.value) {
            return b[a.value]
        }
        if (a.compute) {
            return a.compute(b)
        }
        return ""
    },
    updateFilters: function (d) {
        Tooltip.hide();
        this.resetRowVisibility();
        var w, q, c;
        if (this.searchable) {
            w = trim(this.quickSearchBox.value);
            if (w) {
                this.quickSearchGlass.style.display = "none";
                this.quickSearchClear.style.display = "";
                w = w.toLowerCase().replace(/\s+/g, " ");
                q = w.split(" ");
                c = q.length
            } else {
                this.quickSearchGlass.style.display = "";
                this.quickSearchClear.style.display = "none"
            }
        }
        if (!w && this.nFilters == 0 && this.customFilter == null) {
            if (d) {
                this.updateNav();
                this.refreshRows()
            }
            return
        }
        var z = {
            1: function (i, j) {
                return i > j
            },
            2: function (i, j) {
                return i == j
            },
            3: function (i, j) {
                return i < j
            },
            4: function (i, j) {
                return i >= j
            },
            5: function (i, j) {
                return i <= j
            },
            6: function (i, k, j) {
                return k <= i && i <= j
            }
        };
        var p = {
            1: function (j, i, k) {
                return i > k
            },
            2: function (j, i, k) {
                return j <= k && k <= i
            },
            3: function (j, i, k) {
                return j < k
            },
            4: function (j, i, k) {
                return i >= k
            },
            5: function (j, i, k) {
                return j <= k
            },
            6: function (j, i, B, k) {
                return B <= i && j <= k
            }
        };
        var o = 0;
        for (var u = 0, v = this.data.length; u < v; ++u) {
            var g = this.data[u],
                m = 0;
            nSearchMatches = 0,
            matches = [];
            g.__hidden = true;
            if (this.customFilter && !this.customFilter(g)) {
                continue
            }
            for (var t = 0, h = this.visibility.length; t < h; ++t) {
                var n = this.visibility[t];
                var e = this.columns[n];
                if (!e)
                    continue;
                if (e.__filter) {
                    var a = e.__filter,
                        b = false;
                    if (e.type == null || e.type == "num") {
                        var r = null;
                        if (e.getValue) {
                            r = e.getValue(g)
                        } else {
                            if (e.value) {
                                r = parseFloat(g[e.value])
                            }
                        }
                        if (!r) {
                            r = 0
                        }
                        b = (z[a.type])(r, a.value, a.value2)
                    } else {
                        if (e.type == "range") {
                            var A = e.getMinValue(g),
                                y = e.getMaxValue(g);
                            b = (p[a.type])(A, y, a.value, a.value2)
                        } else {
                            var l = this.getColText(g, e);
                            if (l) {
                                l = l.toString().toLowerCase();
                                if (a.invert) {
                                    b = l.match(a.regex) != null
                                } else {
                                    var x = 0;
                                    for (var s = 0, f = a.words.length; s < f; ++s) {
                                        if (l.indexOf(a.words[s]) != -1) {
                                            ++x
                                        } else {
                                            break
                                        }
                                    }
                                    b = (x == a.words.length)
                                }
                            }
                        }
                    }
                    if (a.invert) {
                        b = !b
                    }
                    if (b) {
                        ++m
                    } else {
                        break
                    }
                }
                if (w) {
                    var l = this.getColText(g, e);
                    if (l) {
                        l = l.toString().toLowerCase();
                        for (var s = 0, f = q.length; s < f; ++s) {
                            if (!matches[s]) {
                                if (l.indexOf(q[s]) != -1) {
                                    matches[s] = 1;
                                    ++nSearchMatches
                                }
                            }
                        }
                    }
                }
            }
            if ((this.nFilters == 0 || m == this.nFilters) && (!w || nSearchMatches == c)) {
                g.__hidden = false;
                ++o
            }
        }
        this.filtered = (o < this.data.length);
        this.nRowsVisible = o;
        if (d) {
            this.updateNav();
            this.refreshRows()
        }
    },
    changePage: function () {
        this.validatePage();
        this.refreshRows();
        this.updateNav();
        this.updatePound();
        var a = g_getScroll(),
            b = ac(this.container);
        if (a.y > b[1]) {
            scrollTo(a.x, b[1])
        }
    },
    firstPage: function () {
        this.rowOffset = 0;
        this.changePage();
        return false
    },
    previousPage: function () {
        this.rowOffset -= this.nItemsPerPage;
        this.changePage();
        return false
    },
    nextPage: function () {
        this.rowOffset += this.nItemsPerPage;
        this.changePage();
        return false
    },
    lastPage: function () {
        this.rowOffset = 99999999;
        this.changePage();
        return false
    },
    addSort: function (a, c) {
        var b = in_array(a, Math.abs(c), function (d) {
            return Math.abs(d)
        });
        if (b != -1) {
            c = a[b];
            a.splice(b, 1)
        }
        a.splice(0, 0, c)
    },
    sortBy: function (a) {
        var x = this.sortOptions || this.columns;
        if (a <= 0 || a > x.length) {
            return
        }
        if (Math.abs(this.sort[0]) == a) {
            this.sort[0] = -this.sort[0]
        } else {
            var b = -1;
            if (x[a - 1].type == "text") {
                b = 1
            }
            this.addSort(this.sort, b * a)
        }
        this.applySort();
        this.refreshRows();
        this.updateSortArrow();
        this.updatePound()
    },
    applySort: function () {
        if (this.sort.length == 0) {
            return
        }
        Listview.sort = this.sort;
        Listview.columns = this.columns;
        Listview.sortOptions = this.sortOptions;
        if (this.indexCreated) {
            this.data.sort(Listview.sortIndexedRows)
        } else {
            this.data.sort(Listview.sortRows)
        }
        this.updateSortIndex()
    },
    setSort: function(c, f, b) {
        this.searchSort = false;
        if (this.sort.toString() != c.toString()) {
            this.sort = c;
            this.applySort();
            if (f) {
                this.refreshRows()
            }
            if (b) {
                this.updatePound()
            }
        }
    },
    readPound: function () {
        if (!this.poundable || !location.hash.length) {
            return
        }
        var b = location.hash.substr(1);
        if (this.tabs) {
            var g = b.indexOf(":");
            if (g == -1) {
                return
            }
            b = b.substr(g + 1)
        }
        var a = parseInt(b);
        if (!isNaN(a)) {
            this.rowOffset = a;
            this.validatePage();
            if (this.poundable != 2) {
                var d = [];
                var f = b.match(/(\+|\-)[0-9]+/g);
                if (f != null) {
                    var g = this.sortOptions || this.columns;
                    for (var c = f.length - 1; c >= 0; --c) {
                        var e = parseInt(f[c]) | 0;
                        var b = Math.abs(e);
                        if (b <= 0 || b > g.length) {
                            break
                        }
                        this.addSort(d, e)
                    }

                    this.setSort(d, false, false)
                }
            }
            if (this.tabs) {
                this.tabs.setTabPound(this.tabIndex, this.getTabPound())
            }
        }
    },
    updateSortArrow: function () {
        if (!this.sort.length || !this.thead) {
            return
        }
        var a = in_array(this.visibility, Math.abs(this.sort[0]) - 1);
        if (a == -1) {
            return
        }
        /*if (this.mode == Listview.MODE_CHECKBOX) {
            a += 1
        }*/
        if (this.mode == Listview.MODE_TILED) {
            if (!this.sortOptions) {
                return
            }
            var f = $(".listview-sort-options a", this.noteTop).get(a);
            if (this.lsa && this.lsa != f) {
                this.lsa.className = ""
            }
            f.className = this.sort[0] < 0 ? "active sortdesc" : "active sortasc";
            this.lsa = f;
            return
        }
        var b = this.thead.firstChild.childNodes[a].firstChild.firstChild.firstChild;
        if (this.lsa && this.lsa != b) {
            this.lsa.className = ""
        }
        b.className = (this.sort[0] < 0 ? "sortdesc" : "sortasc");
        this.lsa = b
    },
    updateSortIndex: function () {
        var b = this.data;
        for (var c = 0, a = b.length; c < a; ++c) {
            b[c].__si = c
        }
        this.indexCreated = true
    },
    updateTabName: function () {
        if (this.tabs && this.tabIndex != null) {
            this.tabs.setTabName(this.tabIndex, this.getTabName())
        }
    },
    updatePound: function () {
        if (!this.poundable) {
            return
        }
        var a = this.getTabPound();
        if (this.tabs) {
            this.tabs.setTabPound(this.tabIndex, a);
            location.replace("#" + this.id + ":" + a)
        } else {
            location.replace("#" + a)
        }
    },
    updateNav: function () {
        var e = [this.navTop, this.navBot],
            j = this.nItemsPerPage,
            h = this.rowOffset,
            d = this.nRowsVisible,
            g = 0,
            b = 0,
            f = 0,
            k = 0;
        if (d > 0) {
            if (!(this.hideNav & 1)) {
                e[0].style.display = ""
            }
            if (!(this.hideNav & 2)) {
                e[1].style.display = ""
            }
        } else {
            e[0].style.display = e[1].style.display = "none"
        }
        if (j) {
            if (h > 0) {
                b = 1;
                if (h >= j + j) {
                    g = 1
                }
            }
            if (h + j < d) {
                f = 1;
                if (h + j + j < d) {
                    k = 1
                }
            }
        }
        for (var c = 0; c < 2; ++c) {
            var a = e[c].childNodes;
            a[0].style.display = (g ? "" : "none");
            a[1].style.display = (b ? "" : "none");
            a[3].style.display = (f ? "" : "none");
            a[4].style.display = (k ? "" : "none");
            a = a[2].childNodes;
            a[0].firstChild.nodeValue = h + 1;
            a[2].firstChild.nodeValue = j ? Math.min(h + j, d) : d;
            a[4].firstChild.nodeValue = d
        }
    },
    getTabName: function () {
        var a = this.name, b = 0;
        for (var i = 0; i < this.data.length; i++) {
            if (!this.data[i].__deleted)
                b++;
        }
        if (b > 0 && !this.hideCount) {
            a += sprintf(LANG.qty, b)
        }
        return a
    },
    getTabPound: function () {
        var a = "";
        a += this.rowOffset;
        if (this.poundable != 2 && this.sort.length) {
            a += ("+" + this.sort.join("+")).replace(/\+\-/g, "-")
        }
        return a
    },
    getCheckedRows: function () {
        var d = [];
        for (var c = 0, a = this.data.length; c < a; ++c) {
            var b = this.data[c];
            if ((b.__cb && b.__cb.checked) || (!b.__cb && b.__chk)) {
                d.push(b)
            }
        }
        return d
    },
    deleteRows: function (c) {
        if (!c || !c.length) {
            return
        }
        for (var b = 0, a = c.length; b < a; ++b) {
            var d = c[b];
            if (!d.__hidden && !d.__hidden) {
                this.nRowsVisible -= 1
            }
            d.__deleted = true
        }
        this.updateTabName();
        if (this.rowOffset >= this.nRowsVisible) {
            this.previousPage()
        } else {
            this.refreshRows();
            this.updateNav()
        }
    },
    setData: function (a) {
        this.data = a;
        this.indexCreated = false;
        this.resetRowVisibility();
        if (this.tabs) {
            this.pounded = (this.tabs.poundedTab == this.tabIndex);
            if (this.pounded) {
                this.readPound()
            }
        } else {
            this.readPound()
        }
        this.applySort();
        this.updateSortArrow();
        if (this.customFilter != null) {
            this.updateFilters()
        }
        this.updateNav();
        this.refreshRows()
    },
    getClipDiv: function () {
        return this.clipDiv
    },
    getNoteTopDiv: function () {
        return this.noteTop
    },
    focusSearch: function () {
        this.quickSearchBox.focus()
    },
    clearSearch: function () {
        this.quickSearchBox.value = ""
    }
};
Listview.sortRows = function (e, d) {
    var j = Listview.sort,
        k = Listview.sortOptions || Listview.columns;
    for (var h = 0, c = j.length; h < c; ++h) {
        var g, f = k[Math.abs(j[h]) - 1];
        if (f.sortFunc) {
            g = f.sortFunc(e, d, j[h])
        } else {
            g = stringCompare(e[f.value], d[f.value])
            //g = strcmp(e[f.value], d[f.value])
        }
        if (g != 0) {
            return g * j[h]
        }
    }
    return 0
},
Listview.sortIndexedRows = function (d, c) {
    var g = Listview.sort,
        h = Listview.sortOptions || Listview.columns,
        e = h[Math.abs(g[0]) - 1],
        f;
    if (e.sortFunc) {
        f = e.sortFunc(d, c, g[0])
    } else {
        f = stringCompare(d[e.value], c[e.value])
        //f = strcmp(d[e.value], c[e.value])
    }
    if (f != 0) {
        return f * g[0]
    }
    return (d.__si - c.__si)
},
Listview.cbSelect = function (b) {
    for (var d = 0, a = this.data.length; d < a; ++d) {
        var c = this.data[d];
        var f = b;
        if (!c.__nochk && c.__tr) {
            var e = c.__tr.firstChild.firstChild;
            if (f == null) {
                f = !e.checked
            }
            if (e.checked != f) {
                e.checked = f;
                c.__tr.className = (e.checked ? "checked" : "");
                if (Browser.ie) {
                    e.defaultChecked = f;
                    if (Browser.ie6) {
                        (Listview.itemOut.bind(c.__tr))()
                    }
                }
            }
        } else {
            if (f == null) {
                f = true
            }
        }
        c.__chk = f
    }
};
Listview.cbClick = function (a) {
    setTimeout(Listview.cbUpdate.bind(0, 0, this, this.parentNode.parentNode), 1);
    sp(a)
};
Listview.cbCellClick = function (a) {
    setTimeout(Listview.cbUpdate.bind(0, 1, this.firstChild, this.parentNode), 1);
    sp(a)
};
Listview.cbIeFix = function () {
    var d = gE(this.tbody, "tr");
    for (var c = 0, a = d.length; c < a; ++c) {
        var b = d[c].firstChild.firstChild;
        if (b) {
            b.checked = b.defaultChecked = false
        }
    }
};
Listview.cbUpdate = function (c, a, b) {
    if (c) {
        a.checked = !a.checked
    }
    b.className = (a.checked ? "checked" : "");
    if (Browser.ie) {
        a.defaultChecked = a.checked;
        if (Browser.ie6) {
            (Listview.itemOver.bind(b))()
        }
    }
};
Listview.itemOver = function () {
    this.style.backgroundColor = (this.className == "checked" ? "#2C2C2C" : "#202020")
};
Listview.itemOut = function () {
    this.style.backgroundColor = (this.className == "checked" ? "#242424" : "transparent")
};
Listview.headerClick = function (a, b, c) {
    c = $E(c);
    if (c._button == 3 || c.shiftKey || c.ctrlKey) {
        Tooltip.hide();
        setTimeout(Listview.headerFilter.bind(this, a, null), 1)
    } else {
        this.sortBy(b + 1)
    }
    return false
};
Listview.headerFilter = function (c, f) {
    var j = "";
    if (c.__filter) {
        if (c.__filter.invert) {
            j += "!"
        }
        j += c.__filter.text
    }
    if (f == null) {
        var f = prompt(sprintf(LANG.prompt_colfilter1 + (c.type == "text" ? LANG.prompt_colfilter2 : LANG.prompt_colfilter3), c.name), j)
    }
    if (f != null) {
        var e = {
            text: "",
            type: -1
        };
        f = trim(f.replace(/\s+/g, " "));
        if (f) {
            if (f.charAt(0) == "!" || f.charAt(0) == "-") {
                e.invert = 1;
                f = f.substr(1)
            }
            if (c.type == "text") {
                e.type = 0;
                e.text = f;
                if (e.invert) {
                    e.regex = g_createOrRegex(f)
                } else {
                    e.words = f.toLowerCase().split(" ")
                }
            } else {
                var i, b;
                if (f.match(/(>|=|<|>=|<=)\s*([0-9\.]+)/)) {
                    i = parseFloat(RegExp.$2);
                    if (!isNaN(i)) {
                        switch (RegExp.$1) {
                        case ">":
                            e.type = 1;
                            break;
                        case "=":
                            e.type = 2;
                            break;
                        case "<":
                            e.type = 3;
                            break;
                        case ">=":
                            e.type = 4;
                            break;
                        case "<=":
                            e.type = 5;
                            break
                        }
                        e.value = i;
                        e.text = RegExp.$1 + " " + i
                    }
                } else {
                    if (f.match(/([0-9\.]+)\s*\-\s*([0-9\.]+)/)) {
                        i = parseFloat(RegExp.$1);
                        b = parseFloat(RegExp.$2);
                        if (!isNaN(i) && !isNaN(b)) {
                            if (i > b) {
                                var g = i;
                                i = b;
                                b = g
                            }
                            if (i == b) {
                                e.type = 2;
                                e.value = i;
                                e.text = "= " + i
                            } else {
                                e.type = 6;
                                e.value = i;
                                e.value2 = b;
                                e.text = i + " - " + b
                            }
                        }
                    } else {
                        var d = f.toLowerCase().split(" ");
                        if (d.length == 1 && !isNaN(i = parseFloat(d[0]))) {
                            e.type = 2;
                            e.value = i;
                            e.text = "= " + i
                        } else {
                            if (c.type == "text") {
                                e.type = 0;
                                e.text = f;
                                if (e.invert) {
                                    e.regex = g_createOrRegex(f)
                                } else {
                                    e.words = d
                                }
                            }
                        }
                    }
                }
            }
            if (e.type == -1) {
                alert(LANG.message_invalidfilter);
                return
            }
        }
        if (!c.__filter || e.text != c.__filter.text || e.invert != c.__filter.invert) {
            var h = c.__th.firstChild.firstChild;
            if (f && e.text) {
                if (!c.__filter) {
                    h.className = "q5";
                    ++(this.nFilters)
                }
                c.__filter = e
            } else {
                if (c.__filter) {
                    h.className = "";
                    --(this.nFilters)
                }
                c.__filter = null
            }
            this.updateFilters(1)
        }
    }
};
Listview.headerOver = function (b, c, f) {
    var d = "";
    d += '<b class="q1">' + (c.tooltip ? c.tooltip : c.name) + "</b>";
    if (c.__filter) {
        d += "<br />" + sprintf((c.__filter.invert ? LANG.tooltip_colfilter2 : LANG.tooltip_colfilter1), c.__filter.text)
    }
    d += '<br /><span class="q2">' + LANG.tooltip_lvheader1 + "</span>";
    if (this.filtrable && (c.filtrable == null || c.filtrable)) {
        d += '<br /><span class="q2">' + (Browser.opera ? LANG.tooltip_lvheader3 : LANG.tooltip_lvheader2) + "</span>"
    }
    Tooltip.show(b, d, 0, 0, "q")
};
Listview.extraCols = {
    cost: {
        id: "cost",
        name: LANG.cost,
        getValue: function(b) {
            if (b.cost) {
                return (b.cost[2] && b.cost[2][0] ? b.cost[2][0][1] : 0) || (b.cost[1] && b.cost[1][0] ? b.cost[1][0][1] : 0) || b.cost[0]
            }
        },
        compute: function(h, j) {
            if (h.cost) {
                var f = h.cost[0];
                var e = null ;
                var c = h.cost[2];
                var b = h.cost[1];
                var g = 0;
                if (h.side != null ) {
                    e = h.side
                } else {
                    if (h.react != null ) {
                        if (h.react[0] == 1 && h.react[1] == -1) {
                            e = 1
                        } else {
                            if (h.react[0] == -1 && h.react[1] == 1) {
                                e = 2
                            }
                        }
                    }
                }
                Listview.funcBox.appendMoney(j, f, e, c, b, g)
            }
        },
        sortFunc: function(e, c, f) {
            if (e.cost == null ) {
                return -1
            } else {
                if (c.cost == null ) {
                    return 1
                }
            }
            var k = 0
              , j = 0
              , h = 0
              , g = 0;
            if (e.cost[2] != null ) {
                array_walk(e.cost[2], function(b, l, n, m) {
                    k += Math.pow(10, m) + b[1]
                }
                )
            }
            if (c.cost[2] != null ) {
                array_walk(c.cost[2], function(b, l, n, m) {
                    j += Math.pow(10, m) + b[1]
                }
                )
            }
            if (e.cost[1] != null ) {
                array_walk(e.cost[1], function(b, l, n, m) {
                    h += Math.pow(10, m) + b[1]
                }
                )
            }
            if (c.cost[1] != null ) {
                array_walk(c.cost[1], function(b, l, n, m) {
                    g += Math.pow(10, m) + b[1]
                }
                )
            }
            return strcmp(k, j) || strcmp(h, g) || strcmp(e.cost[0], c.cost[0])
        }
    },
    count: {
        id: "count",
        name: LANG.count,
        value: "count",
        compute: function(c, e) {
            if (!(this._totalCount > 0 || c.outof > 0)) {
                return
            }
            if (c.outof) {
                var b = ce("div");
                b.className = "small q0";
                ae(b, ct(sprintf(LANG.lvdrop_outof, c.outof)));
                ae(e, b)
            }
            return c.count > 0 ? c.count : "??"
        },
        getVisibleText: function(b) {
            var c = b.count;
            if (b.outof) {
                c += " " + b.outof
            }
            return c
        },
        sortFunc: function(e, c, f) {
            if (e.count == null ) {
                return -1
            } else {
                if (c.count == null ) {
                    return 1
                }
            }
            return strcmp(e.count, c.count)
        }
    },
    percent: {
        id: "percent",
        name: "%",
        width: "10%",
        value: "percent",
        compute: function (a, b) {
            if (a.isPersonal) {
                $(b).addClass("tip").mouseover(function(event) {
                    Tooltip.showAtCursor(event, LANG.personal_loot_tt, 0, 0, "q")
                }).mousemove(function(event) {
                    Tooltip.cursorUpdate(event)
                }).mouseout(function() {
                    Tooltip.hide()
                });
                return LANG.personal_loot_abbrev
            }
            if (a.count == -1) {
                return "??"
            }
            if (a.percent >= 1.95) {
                return a.percent.toFixed(0)
            } else if (a.percent < 0) {
                // Quest items have negative percents
                return ((-1 * a.percent.toFixed(2)) + ' (' + LANG.types[5][0] + ')')
            } else {
                var r = parseFloat(a.percent.toFixed(2));
                if (r === 0 && a.percent !== 0)
                    return "< 0.01";
                else
                    return r;
            }
        },
        // Correct comparison for negative percents of quest items
        sortFunc: function (d, c, e) {
            return strcmp(Math.abs(d.percent), Math.abs(c.percent));
        },
        getVisibleText: function (a) {
            if (a.count == -1) {
                return "??"
            }
            if (a.percent >= 1.95) {
                return a.percent.toFixed(0)
            } else if (a.percent < 0) {
                // Quest items have negative percents
                return ((-1 * a.percent) + ' (' + LANG.types[5][0] + ')')
            } else {
                return parseFloat(a.percent.toFixed(1))
            }
        }
    },
    stock: {
        id: "stock",
        name: LANG.stock,
        width: "10%",
        value: "stock",
        compute: function (a, b) {
            if (a.stock > 0) {
                return a.stock
            } else {
                b.style.fontFamily = "Verdana, sans-serif";
                return String.fromCharCode(8734)
            }
        },
        getVisibleText: function (a) {
            if (a.stock > 0) {
                return a.stock
            } else {
                return String.fromCharCode(8734) + " infinity"
            }
        }
    },
    currency: {
        id: "currency",
        name: LANG.currency,
        getValue: function(b) {
            if (b.currency) {
                return ( b.currency[0] ? b.currency[0][1] : 0) 
            }
        },
        compute: function(c, e) {
            if (c.currency) {
                var b = null ;
                if (c.side != null ) {
                    b = c.side
                } else {
                    if (c.react != null ) {
                        if (c.react[0] == 1 && c.react[1] == -1) {
                            b = 1
                        } else {
                            if (c.react[0] == -1 && c.react[1] == 1) {
                                b = 2
                            }
                        }
                    }
                }
                Listview.funcBox.appendMoney(e, null , b, null , c.currency)
            }
        },
        sortFunc: function(e, c, f) {
            if (e.currency == null ) {
                return -1
            } else {
                if (c.currency == null ) {
                    return 1
                }
            }
            var h = 0
              , g = 0;
            array_walk(e.currency, function(b, j, l, k) {
                h += Math.pow(10, k) + b[1]
            }
            );
            array_walk(c.currency, function(b, j, l, k) {
                g += Math.pow(10, k) + b[1]
            }
            );
            return strcmp(h, g)
        }
    },
    mode: {
        id: "mode",
        name: "Mode",
        after: "name",
        type: "text",
        compute: function(e, f) {
            if (e.modes && e.modes.mode) {
                if (this.validateBonuses) {
                    for (var b in this.validateBonuses) {
                        if (in_array(e.bonustrees, this.validateBonuses[b]) != -1) {
                            if (this.diffLangref && this.diffLangref[this.selectedDifficulty]) {
                                return this.diffLangref[this.selectedDifficulty]
                            } else {
                                break
                            }
                        }
                    }
                }
                if (e.bonustrees && this.diffLangref && this.diffLangref[this.selectedDifficulty]) {
                    return this.diffLangref[this.selectedDifficulty]
                }
                var c = [983040, 65784];
                if (((e.modes.mode & c[0]) == c[0]) || ((e.modes.mode & c[1]) == c[1]) || (e.modes.mode & 3) == 3) {
                    return LANG.su_note_all
                }
                return Listview.extraCols.mode.getVisibleText(e)
            }
        },
        getVisibleText: function(q) {
            var b = q.modes.mode & 983040;
            if (b) {
                switch (b) {
                case 65536:
                    return LANG.tab_normal;
                case 131072:
                    return LANG.tab_heroic;
                case 262144:
                    return LANG.tab_mythic;
                case 524288:
                    return LANG.tab_raidfinder;
                default:
                    break
                }
            } else {
                var g = !!(q.modes.mode & 26);
                var j = !!(q.modes.mode & 97);
                var l = !!(q.modes.mode & 33554432);
                var h = !!(q.modes.mode & 67108864);
                var o = !!(q.modes.mode & 40);
                var f = !!(q.modes.mode & 80);
                var e = !!(q.modes.mode & 128);
                var c = (q.modes.mode & 65787) == 128;
                var m = !!(q.modes.mode & 65536);
                var k = (q.modes.mode & 65787) == 65536;
                var n;
                if (o && !f) {
                    n = 10
                } else {
                    if (f && !o) {
                        n = 25
                    }
                }
                var p;
                if (g && !j && !l && !h) {
                    p = "normal"
                } else {
                    if (j && !g && !l && !h) {
                        p = "heroic"
                    } else {
                        if (l && !g && !j && !h) {
                            p = "mythic"
                        }
                    }
                }
                if (p && !e && !m) {
                    if (n && !l) {
                        return sprintf(LANG["tab_" + p + "X"], n)
                    } else {
                        return LANG["tab_" + p]
                    }
                }
                if (n && !e && !m) {
                    return sprintf(LANG.lvzone_xman, n)
                }
                if (c) {
                    return LANG.tab_raidfinder
                }
                if (k) {
                    return LANG.tab_flexible
                }
            }
            return LANG.su_note_all
        },
        sortFunc: function(e, c, f) {
            return -strcmp(Listview.extraCols.mode.compute.call(this, e), Listview.extraCols.mode.compute.call(this, c))
        }
    },
    requires: {
        id: "requires",
        name: LANG.requires,
        type: "text",
        compute: function(c, e) {
            if (c.achievement && g_achievements[c.achievement]) {
                nw(e);
                e.className = "small";
                e.style.lineHeight = "18px";
                var b = ce("a");
                b.href = "/achievement=" + c.achievement;
                b.className = "icontiny tinyspecial";
                b.style.backgroundImage = "url(" + g_staticUrl + "/images/icons/tiny/" + g_achievements[c.achievement].icon.toLowerCase() + ".png)";
                b.style.whiteSpace = "nowrap";
                st(b, g_achievements[c.achievement]["name_" + Locale.getName()]);
                ae(e, b)
            }
        },
        getVisibleText: function(b) {
            if (b.achievement && g_achievements[b.achievement]) {
                return g_achievements[b.achievement].name
            }
        },
        sortFunc: function(e, c, f) {
            return strcmp(this.getVisibleText(e), this.getVisibleText(c))
        }
    },
    reqskill: {
        id: "reqskill",
        name: LANG.skill,
        width: "10%",
        value: "reqskill",
        before: "yield"
    },
    count: {
        id: "count",
        name: LANG.count,
        width: "20%",
        compute: function(c, e) {
            if (c.mincount == c.maxcount)
                return c.maxcount;
            return c.mincount + " - " + c.maxcount;
        },

    },
};

function g_formatDate(f, n, b, g, o) {
    var j = new Date();
    var c = new Date();
    c.setTime(j.getTime() - (1000 * n));
    var h;
    var k = new Date(c.getYear(), c.getMonth(), c.getDate());
    var p = new Date(j.getYear(), j.getMonth(), j.getDate());
    var m = (p.getTime() - k.getTime());
    m /= 1000;
    m /= 86400;
    m = Math.round(m);
    if (n >= 2592000) {
        h = LANG.date_on + g_formatDateSimple(b, g)
    } else {
        if (m > 1) {
            h = sprintf(LANG.ddaysago, m);
            if (f) {
                var l = new Date();
                l.setTime(b.getTime() + (g_localTime - g_serverTime));
                f.className += ((isset("g_thottbot") && g_thottbot) ? "" : " tip");
                f.title = l.toLocaleString()
            }
        } else {
            if (n >= 43200) {
                if (j.getDay() == c.getDay()) {
                    h = LANG.today
                } else {
                    h = LANG.yesterday
                }
                h = g_formatTimeSimple(c, h);
                if (f) {
                    var l = new Date();
                    l.setTime(b.getTime() + (g_localTime - g_serverTime));
                    f.className += " tip";
                    f.title = l.toLocaleString()
                }
            } else {
                var h = sprintf(LANG.date_ago, g_formatTimeElapsed(n));
                if (f) {
                    var l = new Date();
                    l.setTime(b.getTime() + (g_localTime - g_serverTime));
                    f.className += " tip";
                    f.title = l.toLocaleString()
                }
            }
        }
    }
    if (o == 1) {
        h = h.substr(0, 1).toUpperCase() + h.substr(1)
    }
    if (f) {
        ae(f, ct(h))
    } else {
        return h
    }
}
function g_formatTimeSimple(j, b, g) {
    function f(k) {
        return (k < 10 ? "0" + k : k)
    }
    var c = j.getHours(),
        h = j.getMinutes();
    if (b == null) {
        b = ""
    }
    b += (g ? " " : LANG.date_at);
    if (c == 12) {
        b += LANG.noon
    } else {
        if (c == 0) {
            b += LANG.midnight
        } else {
            b += c + ":" + f(h)
        }
    }
    return b
}

function SetupReplies(b, c) {
    SetupAddEditComment(b, c, false);
    SetupShowMoreComments(b, c);
    b.find(".comment-reply-row").each(function() {
        SetupRepliesControls($(this), c)
    });
    b.find(".comment-reply-row").hover(function() {
        $(this).find("span").attr("data-hover", "true")
    }, function() {
        $(this).find("span").attr("data-hover", "false")
    })
}

function SetupAddEditComment(z, c, p) {
    var m = null;
    var s = null;
    var v = null;
    var B = null;
    var o = null;
    var G = null;
    var n = null;
    var D = 15;
    var u = 600;
    var r = false;
    var y = false;
    var h = false;
    var C = false;
    var q = z.find(".comment-replies > table");
    var t = z.find(".add-reply");
    var k = c.replies.length;
    if (p) {
        w()
    } else {
        t.click(function() {
            w()
        })
    }

    function f() {
        if (r) {
            return
        }
        r = true;
        var H = $("<tr/>");
        if (p) {
            H.addClass("comment-reply-row").addClass("reply-edit-row")
        }
        H.html('<td style="width: 0"></td><td class="comment-form"><form><table><form><table><tr><td style="width: 600px"><textarea required="required" name="body" cols="68" rows="3"></textarea></td><td><input type="submit" value="' + (p ? LANG.save : LANG.addreply) + '" /><img src="images/icons/ajax.gif" class="ajax-loader" /></td></tr><tr><td colspan="2"><span class="text-counter">Text counter placeholder</span></td></tr></table></form></td>');
        s = H.find(".comment-form textarea");
        v = H.find(".comment-form input[type=submit]");
        B = H.find(".comment-form span.text-counter");
        m = H.find(".comment-form form");
        o = H.find(".comment-form .ajax-loader");
        G = H.find(".comment-form");
        m.submit(function() {
            j();
            return false
        });
        l();
        s.keyup(function(I) {
            l()
        });
        s.keydown(function(I) {
            if (I.keyCode == 27) {
                A();
                return false
            }
        });
        s.keypress(function(I) {
            if (I.keyCode == 13) {
                j();
                return false
            }
        });
        if (p) {
            z.after(H);
            z.hide();
            m.find("textarea").text(c.replies[z.attr("data-idx")].body)
        } else {
            q.append(H)
        }
        n = H;
        g_safeFocus(m.find("textarea"))
    }

    function w() {
        if (!r) {
            f()
        }
        y = true;
        if (!p) {
            t.hide();
            z.find(".comment-replies").show();
            G.show()
        }
    }

    function A() {
        y = false;
        if (p) {
            if (n) {
                n.remove()
            }
            z.show();
            return
        }
        t.show();
        G.hide();
        if (k == 0) {
            z.find(".comment-replies").hide()
        }
    }

    function j() {
        if (!y || C) {
            return
        }
        if (s.val().length < D || s.val().length > u) {
            if (!h) {
                h = true;
                B.animate({
                    opacity: "0.0"
                }, 150);
                B.animate({
                    opacity: "1.0"
                }, 150, null, function() {
                    h = false
                })
            }
            return false
        }
        b();
        if (p)
            $.ajax({
                type: "POST",
                url: "?comment=edit",
                data: {
                    id: z.attr("data-replyid"),
                    body: s.val(),
                    replyTo: c.id,
                    expand: (c.nreplies == c.replies.length)
                },
                success: function(H) {
                    F(H)
                },
                dataType: "json",
                error: function(H) {
                    E(H.responseText)
                }
            });
        else
            $.ajax({
                type: "POST",
                url: "?comment=add",
                data: {
                    type: g_pageInfo.type,
                    typeid: g_pageInfo.typeId,
                    replyto: c.id,
                    commentbody: s.val()
                },
                success: function(H) {
                    F(H)
                },
                dataType: "json",
                error: function(H) {
                    E(H.responseText)
                }
            });
        return true
    }

    function b() {
        C = true;
        o.show();
        v.attr("disabled", true);
        G.find(".message-box").remove()
    }

    function g() {
        C = false;
        o.hide();
        v.attr("disabled", false)
    }

    function F(H) {
        c.replies = H;
        Listview.templates.comment.updateReplies(c)
    }

    function E(H) {
        g();
        MessageBox(G, H)
    }

    function l() {
        var K = "(error)";
        var J = "q0";
        var I = s.val().replace(/(\s+)/g, " ").replace(/^\s*/, "").replace(/\s*$/, "").length;
        var H = u - I;
        if (I == 0) {
            K = sprintf(LANG.replylength1_format, D)
        } else {
            if (I < D) {
                K = sprintf(LANG.replylength2_format, D - I)
            } else {
                K = sprintf(H == 1 ? LANG.replylength4_format : LANG.replylength3_format, H);
                if (H < 120) {
                    J = "q10"
                } else {
                    if (H < 240) {
                        J = "q5"
                    } else {
                        if (H < 360) {
                            J = "q11"
                        }
                    }
                }
            }
        }
        B.html(K).attr("class", J)
    }
}

function CreateAjaxLoader() {
    return $("<img>").attr("alt", "").attr("src", "images/icons/ajax.gif").addClass("ajax-loader")
}

function SetupShowMoreComments(c, j) {
    var g = c.find(".show-more-replies");
    var f = c.find(".comment-replies");
    g.click(function() {
        b()
    });

    function b() {
        g.hide();
        f.append(CreateAjaxLoader());
        $.ajax({
            type: "GET",
            url: "?comment=show-replies",
            data: {
                id: j.id
            },
            success: function(k) {
                j.replies = k;
                Listview.templates.comment.updateReplies(j)
            },
            dataType: "json",
            error: function() {
                h()
            }
        })
    }

    function h() {
        g.show();
        f.find(".ajax-loader").remove();
        MessageBox(f, "There was an error fetching the comments. Try refreshing the page.")
    }
}

function SetupRepliesControls(t, n) {
    var q = t.attr("data-replyid");
    var l = t.find(".reply-upvote");
    var r = t.find(".reply-downvote");
    //var m = t.find(".reply-report");
    var b = t.find(".reply-rating");
    var o = t.find(".reply-controls");
    var h = t.find(".reply-delete");
    var k = t.find(".reply-edit");
    var c = false;
    var s = false;
    k.click(function() {
        SetupAddEditComment(t, n, true)
    });
    /*m.click(function() {
        if (c || !confirm(LANG.replyreportwarning_tip)) {
            return
        }
        c = true;
        $.ajax({
            type: "POST",
            url: "/comment=flag-reply",
            data: {
                id: q
            },
            success: function() {
                j()
            },
            error: function(u) {
                f(u.responseText)
            }
        })
    });*/
    l.click(function() {
        if (l.attr("data-hasvoted") == "true" || l.attr("data-canvote") != "true" || c) {
            return
        }
        c = true;
        $.ajax({
            type: "GET",
            url: "?comment=vote",
            data: {
                id: q,
                rating: 1
            },
            success: function() {
                p(1)
            },
            error: function(u) {
                f(u.responseText)
            }
        })
    });
    r.click(function() {
        if (r.attr("data-hasvoted") == "true" || r.attr("data-canvote") != "true" || c) {
            return
        }
        c = true;
        $.ajax({
            type: "GET",
            url: "?comment=vote",
            data: {
                id: q,
                rating: -1
            },
            success: function() {
                p(-1)
            },
            error: function(u) {
                f(u.responseText)
            }
        })
    });
    h.click(function() {
        if (s) {
            return
        }
        if (!confirm(LANG.deletereplyconfirmation_tip)) {
            return
        }
        s = true;
        $.ajax({
            type: "POST",
            url: "?comment=delete-reply",
            data: {
                id: q
            },
            success: function() {
                g();
                $.each(lv_comments, function(i, c) {
                    $.each(c.replies, function(j, r) {
                        if (r.id == q)
                        {
                            c.nreplies--;
                            return false;
                        }
                    });
                });
            },
            error: function(u) {
                f(u.responseText)
            }
        })
    });

    function p(u) {
        var v = parseInt(b.text());
        v += u;
        b.text(v);
        if (u > 0) {
            l.attr("data-hasvoted", "true")
        } else {
            r.attr("data-hasvoted", "true")
        }
        l.attr("data-canvote", "false");
        r.attr("data-canvote", "false");
        /*if (ratingChance > 0) {
            m.remove()
        }*/
        c = false
    }

    function j() {
        c = false;
        //m.remove()
    }

    function g() {
        t.remove();
        s = false
    }

    function f(u) {
        c = false;
        s = false;
        if (!u) {
            u = "An error has occurred. Try refreshing the page."
        }
        MessageBox(o, u)
    }
}

function g_getPatchVersion(c, b) {
    return (g_getPatchVersionObject(c, b)).version
}

function g_getPatchVersionObject(f, b) {
    if (!b) {
        b = ((typeof g_hearthhead != "undefined") && g_hearthhead) ? "hearthstone" : "wow"
    }
    if (!f) {
        f = Date.now()
    }
    if (!g_getPatchVersionObject.hasOwnProperty("parsed")) {
        g_getPatchVersionObject.parsed = {}
    }
    if (!g_getPatchVersionObject.parsed.hasOwnProperty(b)) {
        g_getPatchVersionObject.parsed[b] = true;
        var c = function(q, m) {
            var n = m.split("|");
            var p = {
                game: b,
                build: parseInt(q, 10),
                timestamp: parseInt(n[0], 10) * 1000
            };
            if (n.length == 2) {
                p.version = n[1];
                p.versionnum = 0;
                var l = n[1].split(".");
                for (var k = 0; k < l.length; k++) {
                    p.versionnum += Math.max(99, parseInt(l[k], 10)) * Math.pow(10, 2 * (l.length - k - 1))
                }
            } else {
                if (n.length == 3) {
                    p.versionnum = parseInt(n[1], 10);
                    p.version = n[2]
                }
            }
            return p
        };
        for (var j in g_gameversions[b]) {
            if (!g_gameversions[b].hasOwnProperty(j)) {
                continue
            }
            g_gameversions[b][j] = c(j, g_gameversions[b][j])
        }
    }
    var h, g = {
        game: b,
        build: 999999,
        timestamp: 9999999999999,
        version: "?????",
        versionnum: 999999
    };
    for (var j in g_gameversions[b]) {
        if (!g_gameversions[b].hasOwnProperty(j)) {
            continue
        }
        h = g_gameversions[b][j];
        if ((h.timestamp <= f) && (g.version == "?????" || g.build < h.build)) {
            g = h
        }
    }
    return g
}

function MessageBox(b, f) {
    f = f.replace(/\<.*?\>/g, '');
    alert(f);
}

Listview.templates = {
    currency: {
        sort: [1],
        mode: 1,
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            span: 2,
            value: "name",
            compute: function(c, h, f) {
                var e = ce("td");
                e.style.width = "1px";
                e.style.paddingRight = "0";
                e.style.borderRight = "none";
                ae(e, Icon.create(c.icon, 0, null , this.getItemLink(c), c.stack ? c.stack : null ));
                ae(f, e);
                h.style.borderLeft = "none";
                var g = ce("div");
                var b = ce("a");
                b.className = "listview-cleartext";
                b.href = this.getItemLink(c);
                if (typeof c.name == "undefined") {
                    c.name = (typeof g_currencies[c.id] != "undefined") ? g_currencies[c.id][0] : ""
                }
                ae(b, ct(c.name));
                ae(g, b);
                ae(h, g)
            }
        }, {
            id: "category",
            name: LANG.category,
            type: "text",
            width: "15%",
            compute: function(c, e) {
                e.className = "small";
                var b = ce("a");
                b.className = "q1";
                b.href = "?currencies=" + c.category;
                ae(b, ct(g_currency_categories[c.category]));
                ae(e, b)
            },
            getVisibleText: function(b) {
                return g_currency_categories[b.category]
            },
            sortFunc: function(e, c, f) {
                return strcmp(g_currency_categories[e.category], g_currency_categories[c.category])
            }
        }],
        getItemLink: function(b) {
            return "?currency=" + b.id
        },
        createCbControls: function(e, c) {
            if (!c) {
                return
            }
            var b = ce("input");
            b.type = "button";
            b.value = (!this.characterSettings || !this.characterSettings.editable ? LANG.li_addtolist : LANG.li_addtoanotherlist);
            b.onclick = (function(f) {
                Listview.cbAddToList.call(this, f, "currency")
            }
            ).bind(this);
            ae(e, b)
        }
    },
    faction: {
        sort: [1],
        nItemsPerPage: -1,
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            value: "name",
            compute: function (d, e) {
                var b = ce("a");
                b.style.fontFamily = "Verdana, sans-serif";
                b.href = this.template.getItemLink(d);
                ae(b, ct(d.name));
                if (d.expansion) {
                    var c = ce("span");
                    switch (d.expansion) {
                    case 1:
                        c.className = "bc-icon";
                        break;
                    case 2:
                        c.className = "wotlk-icon";
                        break;
                    case 3:
                        c.className = "cata-icon";
                        break;
                    case 4:
                        c.className = "mop-icon";
                        break;
                    }
                    ae(c, b);
                    ae(e, c)
                } else {
                    ae(e, b)
                }
            },
            getVisibleText: function (a) {
                var b = a.name;
                switch (a.expansion) {
                case 1:
                    b += " bc";
                    break;
                case 2:
                    b += "wotlk wrath";
                    break;
                case 3:
                    b += "cata";
                    break;
                case 4:
                    b += "mop";
                    break;
                }
            }
        }, {
            id: "side",
            name: LANG.side,
            type: "text",
            width: "5%",
            compute: function (b, c) {
                if (b.side) {
                    var a = ce("span");
                    a.className = (b.side == 1 ? "alliance-icon" : "horde-icon");
                    ae(c, a)
                }
            },
            sortFunc: function (d, c, e) {
                return strcmp(g_sides[d.side], g_sides[c.side])
            }
        }, {
            id: "category",
            name: LANG.category,
            type: "text",
            width: "16%",
            compute: function (d, e) {
                if (d.category2 != null) {
                    e.className = "small q1";
                    var b = ce("a"),
                        c = "?factions=" + d.category2;
                    if (d.category) {
                        c += "." + d.category
                    }
                    b.href = c;
                    ae(b, ct(Listview.funcBox.getFactionCategory(d.category, d.category2)));
                    ae(e, b)
                }
            },
            getVisibleText: function (a) {
                return Listview.funcBox.getFactionCategory(a.category, a.category2)
            },
            sortFunc: function (d, c, f) {
                var e = Listview.funcBox.getFactionCategory;
                return strcmp(e(d.category, d.category2), e(c.category, c.category2))
            }
        }],
        getItemLink: function (a) {
            return "?faction=" + a.id
        }
    },
    holiday: {
        sort: [1],
        nItemsPerPage: -1,
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            value: "name",
            span: 2,
            compute: function(c, g, f) {
                var e = ce("td");
                e.style.width = "1px";
                e.style.paddingRight = "0";
                e.style.borderRight = "none";
                ae(e, g_holidays.createIcon(c.id, 0));
                ae(f, e);
                g.style.borderLeft = "none";
                var b = ce("a");
                b.className = "listview-cleartext";
                b.href = "?event=" + c.id;
                ae(b, ct(c.name));
                ae(g, b)
            },
            getVisibleText: function(b) {
                return b.name
            }
        }, {
            id: "category",
            name: LANG.category,
            type: "text",
            width: "16%",
            compute: function(e, f) {
                f.className = "small q1";
                var b = ce("a"),
                    c = "?events=" + e.category;
                b.href = c;
                ae(b, ct(g_holiday_categories[e.category]));
                ae(f, b)
            },
            getVisibleText: function(b) {
                return g_holiday_categories[b.category]
            },
            sortFunc: function(e, c, f) {
                return strcmp(g_holiday_categories[e.category], g_holiday_categories[c.category])
            }
        }],
        getItemLink: function(b) {
            return "?event=" + b.id
        }
    },
    item: {
        sort: [1],
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            span: 2,
            value: "name",
            compute: function (u, g, b) {
                if (u.upgraded) {
                    b.className = "upgraded"
                }
                var o = ce("td");
                o.style.width = "1px";
                o.style.padding = "4px 0 4px 10px";
                o.style.borderRight = "none";
                var h = null
                  , k = null;
                if (u.stack != null) {
                    h = Listview.funcBox.createTextRange(u.stack[0], u.stack[1])
                }
                if (u.avail != null) {
                    k = u.avail
                }
                if (u.id) {
                    ae(o, g_items.createIcon(u.id, (this.iconSize == null ? 1 : this.iconSize), h, k, u.bonuses))
                }
                ae(b, o);
                g.style.borderLeft = "none";
                var w, m;
                if (!isNaN(parseInt(u.name.charAt(0)))) {
                    w = u.name.substring(1);
                    m = 7-parseInt(u.name.charAt(0))
                } else {
                    w = u.name;
                    m = 1;
                    if (u.hasOwnProperty("quality")) {
                        m = u.quality
                    }
                }
                var v = ce("a");
                v.className = "q" + m + " listview-cleartext";
                v.href = this.getItemLink(u);
                if (u.frommerge == 1) {
                    v.className += " icon-merge-right"
                }
                if (u.rel) {
                    Icon.getLink(o.firstChild).rel = u.rel;
                    v.rel = u.rel
                }
                var j = "";
                if (u.nameSuffix) {
                    j = " " + u.nameSuffix
                }
                ae(v, ct(w + j));
                var e = ce("div");
                ae(e, v);
                if (u.reqclass) {
                    var t = ce("div");
                    t.className = "small2";
                    var r = Listview.funcBox.assocBinFlags(u.reqclass, g_chr_classes);
                    for (var o = 0, p = r.length; o < p; ++o) {
                        if (o > 0) {
                            ae(t, ct(", "))
                        }
                        var v = ce("span");
                        //v.href =  "?class=" + r[o];
                        v.className = "c" + r[o];
                        st(v, g_chr_classes[r[o]]);
                        ae(t, v)
                    }
                    ae(e, t)
                }
                if (typeof fi_nExtraCols == "number" && fi_nExtraCols >= 5) {
                    if (u.source != null && u.source.length == 1) {
                        if (u.reqclass) {
                            ae(t, ct(LANG.dash))
                        } else {
                            var t = ce("div");
                            t.className = "small2"
                        }
                        var q = (u.sourcemore ? u.sourcemore[0] : {});
                        var c = 0;
                        if (q.t) {
                            c = q.t;
                            var v = ce("a");
                            if (q.q != null) {
                                v.className = "q" + q.q
                            } else {
                                v.className = "q1"
                            }
                            v.href =  "?" + g_types[q.t] + "=" + q.ti;
                            if (q.n.length <= 30) {
                                ae(v, ct(q.n))
                            } else {
                                v.title = q.n;
                                ae(v, ct(trim(q.n.substr(0, 27)) + "..."))
                            }
                            ae(t, v)
                        } else {
                            ae(t, ct(Listview.funcBox.getUpperSource(u.source[0], q)))
                        }
                        var f = Listview.funcBox.getLowerSource(u.source[0], q, c);
                        if (f != null) {
                            ae(t, ct(LANG.hyphen));
                            if (f.pretext) {
                                ae(t, ct(f.pretext))
                            }
                            if (f.url) {
                                var v = ce("a");
                                v.className = "q1";
                                v.href = f.url;
                                ae(v, ct(f.text));
                                ae(t, v)
                            } else {
                                ae(t, ct(f.text))
                            }
                            if (f.posttext) {
                                ae(t, ct(f.posttext))
                            }
                        }
                        ae(e, t)
                    }
                }
                if (u.namedesc || u.heroic || u.reqrace || u.raidfinder || u.thunderforged || u.warforged || u.flexible) {
                    e.style.position = "relative";
                    var t = ce("div");
                    t.className = "listview-name-info";
                    var n = ce("span");
                    n.className = "q2";
                    if (u.namedesc) {
                        ae(n, ct(u.namedesc))
                    } else {
                        if (u.raidfinder) {
                            ae(n, ct(LANG.lvitem_raidfinderitem))
                        } else {
                            if (u.flexible) {
                                ae(n, ct(LANG.lvitem_flexibleitem))
                            } else {
                                if (u.thunderforged) {
                                    if (u.heroic) {
                                        ae(n, ct(LANG.lvitem_heroicitem + " " + LANG.lvitem_thunderforgeditem))
                                    } else {
                                        ae(n, ct(LANG.lvitem_thunderforgeditem))
                                    }
                                } else {
                                    if (u.warforged) {
                                        if (u.heroic) {
                                            ae(n, ct(LANG.lvitem_heroicitem + " " + LANG.lvitem_warforgeditem))
                                        } else {
                                            ae(n, ct(LANG.lvitem_warforgeditem))
                                        }
                                    } else {
                                        if (u.heroic) {
                                            ae(n, ct(LANG.lvitem_heroicitem))
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (!$(n).is(":empty")) {
                        ae(t, n)
                    }
                    if (u.reqrace) {
                        if ((u.reqrace & 1791) != 1101 && (u.reqrace & 1791) != 690) {
                            if (u.namedesc || u.heroic || u.raidfinder || u.thunderforged || u.warforged || u.flexible) {
                                ae(t, ce("br"));
                                t.style.bottom = "-6px"
                            }
                            var l = Listview.funcBox.assocBinFlags(u.reqrace, g_chr_races);
                            for (var o = 0, p = l.length; o < p; ++o) {
                                if (o > 0) {
                                    ae(t, ct(", "))
                                }
                                var v = ce("a");
                                v.href =  "?race=" + l[o];
                                st(v, g_chr_races[l[o]]);
                                ae(t, v)
                            }
                            t.className += ((isset("g_thottbot") && g_thottbot) ? " q" : " q1")
                        }
                    }
                    aef(e, t)
                }
                ae(g, e)
            },

            getVisibleText: function (c) {
                var e = c.name.substring(1);
                if (typeof fi_nExtraCols == "number" && fi_nExtraCols >= 5) {
                    if (c.source != null && c.source.length == 1) {
                        var d = (c.sourcemore ? c.sourcemore[0] : {});
                        var b = 0;
                        if (d.t) {
                            b = d.t;
                            e += " " + d.n
                        } else {
                            e += " " + Listview.funcBox.getUpperSource(c.source[0], d)
                        }
                        var a = Listview.funcBox.getLowerSource(c.source[0], d, b);
                        if (a != null) {
                            if (a.pretext) {
                                e += " " + a.pretext
                            }
                            e += " " + a.text;
                            if (a.posttext) {
                                e += " " + a.posttext
                            }
                        }
                    }
                }
                return e
            }
        }, {
            id: "level",
            name: LANG.level,
            value: "level"
        }, {
            id: "reqlevel",
            name: LANG.req,
            tooltip: LANG.tooltip_reqlevel,
            value: "reqlevel",
            compute: function (a, b) {
                if (a.reqlevel > 1) {
                    return a.reqlevel
                }
            }
        }, {
            id: "dps",
            name: LANG.dps,
            value: "dps",
            compute: function (a, b) {
                return (a.dps || 0).toFixed(1)
            },
            hidden: true
        }, {
            id: "speed",
            name: LANG.speed,
            value: "speed",
            compute: function (a, b) {
                return (a.speed || 0).toFixed(2)
            },
            hidden: true
        }, {
            id: "armor",
            name: LANG.armor,
            value: "armor",
            compute: function (a, b) {
                if (a.armor > 0) {
                    return a.armor
                }
            },
            hidden: true
        }, {
            id: "slot",
            name: LANG.slot,
            type: "text",
            compute: function (a, b) {
                nw(b);
                return g_item_slots[a.slot]
            },
            getVisibleText: function (a) {
                return g_item_slots[a.slot]
            },
            sortFunc: function (d, c, e) {
                return strcmp(g_item_slots[d.slot], g_item_slots[c.slot])
            },
            hidden: true
        }, {
            id: "slots",
            name: LANG.slots,
            value: "nslots",
            hidden: true
        }, {
            id: "skill",
            name: LANG.skill,
            value: "skill",
            hidden: true
        }, {
            id: "glyph",
            name: LANG.glyphtype,
            type: "text",
            value: "glyph",
            compute: function (a, b) {
                if (a.glyph) {
                    return g_item_glyphs[a.glyph]
                }
            },
            getVisibleText: function (a) {
                return g_item_glyphs[a.glyph]
            },
            sortFunc: function (d, c, e) {
                return strcmp(g_item_glyphs[d.glyph], g_item_glyphs[c.glyph])
            },
            hidden: true
        }, {
            id: "source",
            name: LANG.source,
            type: "text",
            compute: function (k, d) {
                if (this.iconSize == 0) {
                    d.className = "small"
                }
                if (k.source != null) {
                    if (k.source.length == 1) {
                        nw(d);
                        var c = (k.sourcemore ? k.sourcemore[0] : {});
                        var h = 0;
                        if (c.t) {
                            h = c.t;
                            var j = ce("a");
                            if (c.q != null) {
                                j.className = "q" + c.q
                            } else {
                                j.className = "q1"
                            }
                            j.href = "?" + g_types[c.t] + "=" + c.ti;
                            if (this.iconSize == 0 || c.n.length <= 20) {
                                ae(j, ct(c.n))
                            } else {
                                j.title = c.n;
                                ae(j, ct(trim(c.n.substr(0, 17)) + "..."))
                            }
                            ae(d, j)
                        } else {
                            ae(d, ct(Listview.funcBox.getUpperSource(k.source[0], c)))
                        }
                        var f = Listview.funcBox.getLowerSource(k.source[0], c, h);
                        if (this.iconSize != 0 && f != null) {
                            var b = ce("div");
                            b.className = "small2";
                            if (f.pretext) {
                                ae(b, ct(f.pretext))
                            }
                            if (f.url) {
                                var j = ce("a");
                                j.className = "q1";
                                j.href = f.url;
                                ae(j, ct(f.text));
                                ae(b, j)
                            } else {
                                ae(b, ct(f.text))
                            }
                            if (f.posttext) {
                                ae(b, ct(f.posttext))
                            }
                            ae(d, b)
                        }
                    } else {
                        var l = "";
                        for (var e = 0, g = k.source.length; e < g; ++e) {
                            if (e > 0) {
                                l += LANG.comma
                            }
                            l += g_sources[k.source[e]]
                        }
                        return l
                    }
                }
            },
            getVisibleText: function (c) {
                if (c.source != null) {
                    if (c.source.length == 1) {
                        var e = "";
                        var d = (c.sourcemore ? c.sourcemore[0] : {});
                        var b = 0;
                        if (d.t) {
                            b = d.t;
                            e += " " + d.n
                        } else {
                            e += " " + Listview.funcBox.getUpperSource(c.source[0], d)
                        }
                        var a = Listview.funcBox.getLowerSource(c.source[0], d, b);
                        if (a != null) {
                            if (a.pretext) {
                                e += " " + a.pretext
                            }
                            e += " " + a.text;
                            if (a.posttext) {
                                e += " " + a.posttext
                            }
                        }
                        return e
                    } else {
                        return Listview.funcBox.arrayText(c.source, g_sources)
                    }
                }
            },
            sortFunc: function (f, d) {
                var g = Listview.funcBox.assocArrCmp(f.source, d.source, g_sources);
                if (g != 0) {
                    return g
                }
                var e = (f.sourcemore && f.source.length == 1 ? f.sourcemore[0].n : null),
                    c = (d.sourcemore && d.source.length == 1 ? d.sourcemore[0].n : null);
                return strcmp(e, c)
            }
        }, {
            id: "type",
            name: LANG.type,
            type: "text",
            compute: function (d, e) {
                e.className = "small q1";
                nw(e);
                var b = ce("a");
                var c = Listview.funcBox.getItemType(d.classs, d.subclass, d.subsubclass);
                b.href = c.url;
                ae(b, ct(c.text));
                ae(e, b)
            },
            getVisibleText: function (a) {
                return Listview.funcBox.getItemType(a.classs, a.subclass, a.subsubclass).text
            },
            sortFunc: function (d, c, f) {
                var e = Listview.funcBox.getItemType;
                return strcmp(e(d.classs, d.subclass, d.subsubclass).text, e(c.classs, c.subclass, c.subsubclass).text)
            }
        }],
        getItemLink: function (a) {
            return "?item=" + a.id
        },
        onBeforeCreate: function () {
            var b = false;
            for (var c = 0, a = this.data.length; c < a; ++c) {
                var d = this.data[c];
                if (d.slot > 0 && d.slot != 18) {
                    ++b
                } else {
                    d.__nochk = 1
                }
            }
            if (b > 0) {
                this.mode = 1;
                this._nComparable = b
            }
        },
    },
    itemset: {
        sort: [1],
        nItemsPerPage: 75,
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            value: "name",
            compute: function (c, f) {
                var b = ce("a");
                b.className = "q" + (7 - parseInt(c.name.charAt(0)));
                b.style.fontFamily = "Verdana, sans-serif";
                b.href = this.template.getItemLink(c);
                ae(b, ct(c.name.substring(1)));
                ae(f, b);
                if (c.namedesc) {
                    var g = ce("div");
                    g.className = "listview-name-info q2";
                    ae(g, ct(c.namedesc));
                    ae(f, g)
                }
                if (c.note) {
                    var e = ce("div");
                    e.className = "small";
                    ae(e, ct(g_itemset_notes[c.note]));
                    ae(f, e)
                }
            },
            getVisibleText: function (a) {
                var b = a.name.substring(1);
                if (a.note) {
                    b += " " + g_itemset_notes[a.note]
                }
                return b
            }
        }, {
            id: "level",
            name: LANG.level,
            type: "range",
            getMinValue: function (a) {
                return a.minlevel
            },
            getMaxValue: function (a) {
                return a.maxlevel
            },
            compute: function (a, b) {
                if (a.minlevel > 0 && a.maxlevel > 0) {
                    if (a.minlevel != a.maxlevel) {
                        return a.minlevel + LANG.hyphen + a.maxlevel
                    } else {
                        return a.minlevel
                    }
                } else {
                    return -1
                }
            },
            sortFunc: function (d, c, e) {
                if (e > 0) {
                    return strcmp(d.minlevel, c.minlevel) || strcmp(d.maxlevel, c.maxlevel)
                } else {
                    return strcmp(d.maxlevel, c.maxlevel) || strcmp(d.minlevel, c.minlevel)
                }
            }
        }, {
            id: "pieces",
            name: LANG.pieces,
            getValue: function (a) {
                return a.pieces.length
            },
            compute: function (a, b) {
                b.style.padding = "0";
                Listview.funcBox.createCenteredIcons(a.pieces, b)
            },
            sortFunc: function (d, c) {
                var f = (d.pieces != null ? d.pieces.length : 0);
                var e = (c.pieces != null ? c.pieces.length : 0);
                return strcmp(f, e)
            }
        }, {
            id: "type",
            name: LANG.type,
            type: "text",
            compute: function (a, b) {
                return g_itemset_types[a.type]
            },
            sortFunc: function (d, c, e) {
                return strcmp(g_itemset_types[d.type], g_itemset_types[c.type])
            }
        }, {
            id: "classes",
            name: LANG.classes,
            type: "text",
            compute: function (c, e) {
                if (c.classes != null) {
                    var d = "";
                    for (var b = 0, a = c.classes.length; b < a; ++b) {
                        if (b > 0) {
                            d += LANG.comma
                        }
                        d += g_chr_classes[c.classes[b]]
                    }
                    return d
                }
            },
            sortFunc: function (d, c, e) {
                return Listview.funcBox.assocArrCmp(d.classes, c.classes, g_chr_classes)
            }
        }],
        getItemLink: function (a) {
            return "?itemset=" + a.id
        }
    },
    npc: {
        sort: [1],
        nItemsPerPage: 100,
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            value: "name",
            compute: function (c, f) {
                var b = ce("a");
                b.style.fontFamily = "Verdana, sans-serif";
                b.href = this.template.getItemLink(c);
                ae(b, ct(c.name));
                ae(f, b);
                if (c.tag != null) {
                    var e = ce("div");
                    e.className = "small";
                    ae(e, ct("<" + c.tag + ">"));
                    ae(f, e)
                }
            },
            getVisibleText: function (a) {
                var b = a.name;
                if (a.tag) {
                    b += " <" + a.tag + ">"
                }
                return b
            }
        }, {
            id: "level",
            name: LANG.level,
            type: "range",
            width: "10%",
            getMinValue: function (a) {
                return a.minlevel
            },
            getMaxValue: function (a) {
                return a.maxlevel
            },
            compute: function (a, c) {
                if (a.classification) {
                    var b = ce("div");
                    b.className = "small";
                    ae(b, ct(g_npc_classifications[a.classification]));
                    ae(c, b)
                }
                if (a.classification == 3) {
                    return "??"
                }
                if (a.minlevel > 0 && a.maxlevel > 0) {
                    if (a.minlevel != a.maxlevel) {
                        return a.minlevel + LANG.hyphen + a.maxlevel
                    } else {
                        return a.minlevel
                    }
                }
                return -1
            },
            getVisibleText: function (a) {
                var b = "";
                if (a.classification) {
                    b += " " + g_npc_classifications[a.classification]
                }
                if (a.minlevel > 0 && a.maxlevel > 0) {
                    b += " ";
                    if (a.minlevel != a.maxlevel) {
                        b += a.minlevel + LANG.hyphen + a.maxlevel
                    } else {
                        b += a.minlevel
                    }
                }
                return b
            },
            sortFunc: function (d, c, e) {
                if (e > 0) {
                    return strcmp(d.minlevel, c.minlevel) || strcmp(d.maxlevel, c.maxlevel) || strcmp(d.classification, c.classification)
                } else {
                    return strcmp(d.maxlevel, c.maxlevel) || strcmp(d.minlevel, c.minlevel) || strcmp(d.classification, c.classification)
                }
            }
        }, {
            id: "location",
            name: LANG.location,
            type: "text",
            compute: function (a, b) {
                return Listview.funcBox.location(a, b)
            },
            getVisibleText: function (a) {
                return Listview.funcBox.arrayText(a.location, g_zones)
            },
            sortFunc: function (d, c, e) {
                return Listview.funcBox.assocArrCmp(d.location, c.location, g_zones)
            }
        }, {
            id: "react",
            name: LANG.react,
            type: "text",
            width: "10%",
            value: "react",
            filtrable: 0,
            compute: function (b, g) {
                if (b.react == null) {
                    return -1
                }
                var d = [LANG.lvnpc_alliance, LANG.lvnpc_horde];
                var f = 0;
                for (var a = 0; a < 2; ++a) {
                    if (b.react[a] != null) {
                        if (f++ > 0) {
                            ae(g, ct(" "))
                        }
                        var e = ce("span");
                        e.className = (b.react[a] < 0 ? "q10" : (b.react[a] > 0 ? "q2" : "q"));
                        ae(e, ct(d[a]));
                        ae(g, e)
                    }
                }
            }
        }, {
            id: "skin",
            name: LANG.skin,
            type: "text",
            value: "skin",
            compute: function (c, d) {
                if (c.skin) {
                    var b = ce("a");
                    b.className = "q1";
                    b.href = "?npcs&filter=cr=35;crs=0;crv=" + c.skin;
                    ae(b, ct(c.skin));
                    ae(d, b)
                }
            },
            hidden: 1
        }, {
            id: "petfamily",
            name: LANG.petfamily,
            type: "text",
            width: "12%",
            compute: function (c, d) {
                d.className = "q1";
                var b = ce("a");
                b.href = "?pet=" + c.family;
                ae(b, ct(g_pet_families[c.family]));
                ae(d, b)
            },
            getVisibleText: function (a) {
                return g_pet_families[a.family]
            },
            sortFunc: function (d, c, e) {
                return strcmp(g_pet_families[d.family], g_pet_families[c.family])
            },
            hidden: 1
        }, {
            id: "type",
            name: LANG.type,
            type: "text",
            width: "12%",
            compute: function (c, d) {
                d.className = "small q1";
                var b = ce("a");
                b.href = "?npcs=" + c.type;
                var t = g_npc_types[c.type];
                ae(b, ct(!t ? "" : t));
                ae(d, b)
            },
            getVisibleText: function (a) {
                return g_npc_types[a.type]
            },
            sortFunc: function (d, c, e) {
                return strcmp(g_npc_types[d.type], g_npc_types[c.type])
            }
        }],
        getItemLink: function (a) {
            return "?npc=" + a.id
        }
    },
    object: {
        sort: [1],
        nItemsPerPage: 100,
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            value: "name",
            compute: function (c, d) {
                var b = ce("a");
                b.style.fontFamily = "Verdana, sans-serif";
                b.href = this.template.getItemLink(c);
                ae(b, ct(c.name));
                ae(d, b)
            }
        }, {
            id: "location",
            name: LANG.location,
            type: "text",
            compute: function (a, b) {
                return Listview.funcBox.location(a, b)
            },
            getVisibleText: function (a) {
                return Listview.funcBox.arrayText(a.location, g_zones)
            },
            sortFunc: function (d, c, e) {
                return Listview.funcBox.assocArrCmp(d.location, c.location, g_zones)
            }
        }, {
            id: "skill",
            name: LANG.skill,
            width: "10%",
            value: "skill",
            hidden: true
        }, {
            id: "type",
            name: LANG.type,
            type: "text",
            width: "12%",
            compute: function (c, d) {
                d.className = "small q1";
                var b = ce("a");
                b.href = "?objects=" + c.type;
                ae(b, ct(g_object_types[c.type] ? g_object_types[c.type] : ""));
                ae(d, b)
            },
            getVisibleText: function (a) {
                return g_object_types[a.type]
            },
            sortFunc: function (d, c, e) {
                return strcmp(g_object_types[d.type], g_object_types[c.type])
            }
        }],
        getItemLink: function (a) {
            return "?object=" + a.id
        }
    },
    quest: {
        sort: [1, 2],
        nItemsPerPage: 100,
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            value: "name",
            compute: function (c, d) {
                var x = $("<div/>");
                var b = ce("a");
                b.style.fontFamily = "Verdana, sans-serif";
                b.href = this.template.getItemLink(c);
                ae(b, ct(c.name));

                x.append(b);
                if (c.reqclass) {
                    var l = $("<div/>", {
                        "class": "small2"
                    });
                    var f = Listview.funcBox.assocBinFlags(c.reqclass, g_chr_classes);
                    for (var h = 0, j = f.length; h < j; ++h) {
                        if (h > 0) {
                            l.append(", ")
                        }
                        var m = $("<span/>", {
                            "class": "c" + f[h],
                            text: g_chr_classes[f[h]]
                        });
                        l.append(m)
                    }
                    x.append(l)
                }

                ae(d, x[0]);
            }
        }, {
            id: "level",
            name: LANG.level,
            width: "7%",
            value: "level",
            compute: function (a, c) {
                if (a.type || a.daily) {
                    var b = ce("div");
                    b.className = "small";
                    nw(b);
                    if (a.type && a.daily) {
                        ae(b, ct(sprintf(LANG.lvquest_daily, g_quest_types[a.type])))
                    } else {
                        if (a.daily) {
                            ae(b, ct(LANG.daily))
                        } else {
                            if (a.type) {
                                ae(b, ct(g_quest_types[a.type]))
                            }
                        }
                    }
                    ae(c, b)
                }
                return a.level
            },
            getVisibleText: function (a) {
                var b = "";
                if (a.type) {
                    b += " " + g_quest_types[a.type]
                }
                if (a.daily) {
                    b += " " + LANG.daily
                }
                if (a.level) {
                    b += " " + a.level
                }
                return b
            },
            sortFunc: function (d, c, e) {
                return strcmp(d.level, c.level) || strcmp(d.type, c.type)
            }
        }, {
            id: "reqlevel",
            name: LANG.req,
            tooltip: LANG.tooltip_reqlevel,
            width: "7%",
            value: "reqlevel"
        }, {
            id: "side",
            name: LANG.side,
            type: "text",
            width: "5%",
            compute: function (a, c) {
                if (a.side) {
                    var b = ce("span");
                    if (a.side == 1) {
                        b.className = "alliance-icon"
                    } else {
                        if (a.side == 2) {
                            b.className = "horde-icon"
                        }
                    }
                   // ae(b, ct(g_sides[a.side]));
                    ae(c, b)
                } else {
                    return -1
                }
            },
            sortFunc: function (d, c, e) {
                return strcmp(g_sides[d.side], g_sides[c.side])
            }
        }, {
            id: "rewards",
            name: LANG.rewards,
            compute: function(c, j) {
                var b = (c.itemchoices != null  || c.itemrewards != null );
                if (b) {
                    var h, g;
                    if (c.itemchoices && c.itemchoices.length > 1) {
                        h = LANG.lvquest_pickone;
                        if (c.itemrewards && c.itemrewards.length > 0) {
                            g = LANG.lvquest_alsoget
                        }
                    }
                    Listview.funcBox.createCenteredIcons(c.itemchoices, j, h, 2);
                    Listview.funcBox.createCenteredIcons(c.itemrewards, j, g, 2)
                }
                if (c.titlereward && g_titles[c.titlereward]) {
                    var f = g_titles[c.titlereward]["name_" + Locale.getName()];
                    f = f.replace("%s", '<span class="q0">&lt;' + LANG.name + "&gt;</span>");
                    var e = ce("a");
                    e.className = "q1";
                    //e.href = "?title=" + c.titlereward;
                    e.innerHTML = f;
                    ae(j, e);
                    ae(j, ce("br"))
                }
            },
            getVisibleText: function(b) {
                var c = "";
                if (b.itemchoices && b.itemchoices.length) {
                    c += " " + LANG.lvquest_pickone;
                    if (b.itemrewards && b.itemrewards.length) {
                        c += " " + LANG.lvquest_alsoget
                    }
                }
                if (b.titlereward && g_titles[b.titlereward]) {
                    c += " " + g_titles[b.titlereward]["name_" + Locale.getName()]
                }
                return c
            },
            sortFunc: function(e, c, g) {
                var k = (e.itemchoices != null  ? e.itemchoices.length : 0) + (e.itemrewards != null  ? e.itemrewards.length : 0);
                var j = (c.itemchoices != null  ? c.itemchoices.length : 0) + (c.itemrewards != null  ? c.itemrewards.length : 0);
                var f = (e.titlereward && g_titles[e.titlereward] ? g_titles[e.titlereward]["name_" + Locale.getName()] : "");
                var h = (c.titlereward && g_titles[c.titlereward] ? g_titles[c.titlereward]["name_" + Locale.getName()] : "");
                return strcmp(k, j) || strcmp(f, h)
            }
        }, {
            id: "experience",
            name: LANG.exp,
            value: "xp",
            sortFunc: function(e, c) {
                var a = e.xp.replace(".","");
                var b = c.xp.replace(".", "");
                return stringCompare(a, b);
            }
        }, {
            id: "money",
            name: LANG.money,
            compute: function(b, c) {
                if (b.money > 0 || b.currencyrewards != null ) {
                    if (b.money > 0) {
                        Listview.funcBox.appendMoney(c, b.money);
                        if (b.currencyrewards != null ) {
                            ae(c, ct(" + "))
                        }
                    }
                    if (b.currencyrewards != null ) {
                        Listview.funcBox.appendMoney(c, null , b.side, null , b.currencyrewards)
                    }
                }
            },
            getVisibleText: function(b) {
                var e = "";
                for (var c = 0; b.currencyrewards && c < b.currencyrewards.length; ++c) {
                    if (g_gatheredcurrencies[b.currencyrewards[c][0]]) {
                        e += " " + g_gatheredcurrencies[b.currencyrewards[c][0]]["name_" + Locale.getName()]
                    }
                }
                return e
            },
            sortFunc: function(e, c, f) {
                var h = 0
                  , g = 0;
                if (e.currencyrewards && e.currencyrewards.length) {
                    $.each(e.currencyrewards, function(b, j) {
                        h += j[1]
                    }
                    )
                }
                if (c.currencyrewards && c.currencyrewards.length) {
                    $.each(c.currencyrewards, function(b, j) {
                        g += j[1]
                    }
                    )
                }
                return strcmp(h, g) || strcmp(e.money, c.money)
            }
        }, {
            id: "reputation",
            name: LANG.reputation,
            width: "14%",
            value: "id",
            hidden: true
        }, {
            id: "category",
            name: LANG.category,
            type: "text",
            compute: function(c, e) {
                if (c.category != 0) {
                    e.className = "small q1";
                    var b = ce("a");
                    b.href = "?quests=" + c.category2 + "." + c.category;
                    var x = Listview.funcBox.getQuestCategory(c.category);

                    if (x)
                        ae(b, ct(x));
                    ae(e, b)
                }
            },
            getVisibleText: function(b) {
                return Listview.funcBox.getQuestCategory(b.category)
            },
            sortFunc: function(e, c, g) {
                var f = Listview.funcBox.getQuestCategory;
                return strcmp(f(e.category), f(c.category))
            }
        }],
        getItemLink: function (a) {
            return "?quest=" + a.id
        }
    },
    spell: {
        sort: [1, 2],
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            span: 2,
            value: "name",
            compute: function (g, e, k) {
                var f = ce("td"),
                    o;
                f.style.width = "44px";
                f.style.padding = "0";
                f.style.borderRight = "none";
                if (g.creates != null) {
                    o = g_items.createIcon(g.creates[0], 1, Listview.funcBox.createTextRange(g.creates[1], g.creates[2]))
                } else {
                    o = g_spells.createIcon(g.id, 1)
                }
                o.style.cssFloat = o.style.styleFloat = "left";
                ae(f, o);
                ae(k, f);
                e.style.borderLeft = "none";
                var b = ce("div");
                var n = ce("a");
                var l = g.name.charAt(0);
                if (l != "@") {
                    n.className = "q" + (7 - parseInt(l))
                }
                n.style.fontFamily = "Verdana, sans-serif";
                n.href = this.template.getItemLink(g);
                ae(n, ct(g.name.substring(1)));
                ae(b, n);
                if (g.rank) {
                    var j = ce("div");
                    j.className = "small2";
                    ae(j, ct(g.rank));
                    ae(b, j)
                }
                if (g.races != null) {
                    b.style.position = "relative";
                    var j = ce("div");
                    j.className = "small";
                    j.style.fontStyle = "italic";
                    j.style.position = "absolute";
                    j.style.right = j.style.bottom = "3px";
                    var m = g.races.toString();
                    if (m == "1,3,4,7,11") {
                        ae(j, ct(g_sides[1]))
                    } else {
                        if (m == "2,5,6,8,10") {
                            ae(j, ct(g_sides[2]))
                        } else {
                            for (var f = 0, h = g.races.length; f < h; ++f) {
                                if (f > 0) {
                                    ae(j, ct(LANG.comma))
                                }
                                ae(j, ct(g_chr_races[g.races[f]]))
                            }
                        }
                    }
                    ae(b, j)
                }
                ae(e, b)
            },
            getVisibleText: function (a) {
                var b = a.name;
                if (a.rank) {
                    b += " " + a.rank
                }
                if (a.races) {
                    b += " " + Listview.funcBox.arrayText(a.races, g_chr_races)
                }
                return b
            }
        }, {
            id: "level",
            name: LANG.level,
            width: "10%",
            value: "level",
            compute: function (a, b) {
                if (a.level > 0) {
                    return a.level
                }
            },
            hidden: true
        }, {
            id: "school",
            name: LANG.school,
            type: "text",
            width: "10%",
            hidden: true,
            compute: function (a, b) {
                return g_spell_resistances[a.school]
            },
            sortFunc: function (d, c, e) {
                return strcmp(g_spell_resistances[d.school], g_spell_resistances[c.school])
            }
        }, {
            id: "reagents",
            name: LANG.reagents,
            align: "center",
            width: "auto",
            getValue: function (a) {
                return (a.reagents ? a.reagents.length : 0)
            },
            compute: function (g, c) {
                var a = (g.reagents != null);
                if (a) {
                    c.style.padding = "0";
                    var k = ce("div");
                    var j = g.reagents;
                    k.style.width = (44 * j.length) + "px";
                    k.style.margin = "0 auto";
                    for (var e = 0, h = j.length; e < h; ++e) {
                        var b = j[e][0];
                        var f = j[e][1];
                        var l = g_items.createIcon(b, 1, f);
                        l.style.cssFloat = l.style.styleFloat = "left";
                        ae(k, l)
                    }
                    ae(c, k)
                }
            },
            sortFunc: function (d, c) {
                var f = (d.reagents != null ? d.reagents.length : 0);
                var e = (c.reagents != null ? c.reagents.length : 0);
                if (f > 0 && f == e) {
                    return strcmp(d.reagents.toString(), c.reagents.toString())
                } else {
                    return strcmp(f, e)
                }
            }
        }, {
            id: "tp",
            name: LANG.tp,
            tooltip: LANG.tooltip_trainingpoints,
            width: "7%",
            hidden: true,
            value: "tp",
            compute: function (a, b) {
                if (a.tp > 0) {
                    return a.tp
                }
            }
        }, {
            id: "source",
            name: LANG.source,
            type: "text",
            width: "12%",
            hidden: true,
            compute: function (b, e) {
                if (b.source != null) {
                    var d = "";
                    for (var c = 0, a = b.source.length; c < a; ++c) {
                        if (c > 0) {
                            d += LANG.comma
                        }
                        d += g_sources[b.source[c]]
                    }
                    return d
                }
            },
            sortFunc: function (d, c, e) {
                return Listview.funcBox.assocArrCmp(d.source, c.source, g_sources)
            }
        },{
            id: "skill",
            name: LANG.skill,
            type: "text",
            width: "20%",
            getValue: function(b) {
                return b.learnedat
            },
            compute: function(w, j, b, m) {
                if (w.skill != null ) {
                    this.skillsColumn = m;
                    var l = ce("div"), u;
                    l.className = "small";
                    for (var p = 0, r = w.skill.length; p < r; ++p) {
                        // skillvalue hax
                        var spl = w.skill[p].split(",");
                        w.skill[p] = spl[0];
                        var skillval = spl[1];

                        if (p > 0) {
                            ae(l, ct(LANG.comma))
                        }
                        if (w.skill[p] == -1) {
                            ae(l, ct(LANG.ellipsis))
                        } else {
                            if (in_array([-3, -5, -6, -7, 11, 9], w.cat) != -1) {
                                var h = "";
                                if ((w.cat == -3) && !(w.reqclass)) {
                                    for (var s = 0; s < mn_spells.length; s++) {
                                        if (mn_spells[s][0] == -3) {
                                            for (var q = 0; q < mn_spells[s][3].length; q++) {
                                                for (var o = 0; o < mn_spells[s][3][q][3].length; o++) {
                                                    if (mn_spells[s][3][q][3][o][0] == w.skill[p]) {
                                                        h = mn_spells[s][3][q][0] + "."
                                                    }
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    if (w.reqclass) {
                                        h = "" + (1 + Math.log(w.reqclass) / Math.LN2) + "."
                                    }
                                }
                                var u = ce("a");
                                u.className = ((isset("g_thottbot") && g_thottbot) ? "q" : "q1");
                                if (in_array([-5, -6], w.cat) != -1) {
                                    u.href = "?spells=" + w.cat
                                } else {
                                    u.href = "?spells=" + w.cat + "." + h + w.skill[p]
                                }
                                var t = g_getGets();
                                var f = (t.spells ? t.spells.split(".") : [false, false]);
                                if (w.reqclass && (w.cat == 7 || w.cat == -2)) {
                                    if (p < 1 && ((1 + Math.log(w.reqclass) / Math.LN2) != f[1])) {
                                        var v = ce("a");
                                        v.className = "q0";
                                        v.href = "?spells=" + w.cat + "." + (1 + Math.log(w.reqclass) / Math.LN2);
                                        ae(v, ct(g_chr_classes[(1 + Math.log(w.reqclass) / Math.LN2)]));
                                        ae(l, v);
                                        ae(l, ce("br"))
                                    }
                                }
                                ae(u, ct(g_spell_skills[w.skill[p]] + " (" + skillval + ")"));
                                ae(l, u)
                            } else {
                                if (in_array([-2, 7], w.cat) != -1) {
                                    var u = ce("a");
                                    u.className = ((isset("g_thottbot") && g_thottbot) ? "q" : "q1");
                                    u.href = "?spells=" + w.cat + "." + (w.reqclass ? (1 + Math.log(w.reqclass) / Math.LN2) : "");
                                    ae(u, ct(g_spell_skills[w.skill[p]] + " (" + skillval + ")"));
                                    ae(l, u)
                                } else {
                                    ae(l, ct(g_spell_skills[w.skill[p]] + " (" + skillval + ")"))
                                }
                            }
                        }
                    }
                    if (w.specialization && g_skill_specializations[w.specialization]) {
                        var k = u.href;
                        if (k) {
                            u = ce("a");
                            u.className = ((isset("g_thottbot") && g_thottbot) ? "q" : "q1");
                            u.href = k + "." + w.specialization;
                            ae(l, ct(": "));
                            ae(u, ct(g_skill_specializations[w.specialization]));
                            ae(l, u)
                        } else {
                            ae(l, ct(": " + g_skill_specializations[w.specialization]))
                        }
                    }
                    if (w.learnedat > 0) {
                        ae(l, ct(" ("));
                        var c = ce("span");
                        if (w.learnedat == 9999) {
                            c.className = "q0";
                            ae(c, ct("??"))
                        } else {
                            if (w.learnedat > 0) {
                                ae(c, ct(w.learnedat));
                                c.style.fontWeight = "bold"
                            }
                        }
                        ae(l, c);
                        ae(l, ct(")"))
                    }
                    ae(j, l);
                    if (w.colors != null ) {
                        this.columns[m].type = null ;
                        var e = w.colors
                          , n = 0;
                        for (var p = 0; p < e.length; ++p) {
                            if (e[p] > 0) {
                                ++n;
                                break
                            }
                        }
                        if (n > 0) {
                            n = 0;
                            l = ce("div");
                            l.className = "small";
                            l.style.fontWeight = "bold";
                            for (var p = 0; p < e.length; ++p) {
                                if (e[p] > 0) {
                                    if (n++ > 0) {
                                        ae(l, ct(" "))
                                    }
                                    var g = ce("span");
                                    g.className = "r" + (p + 1);
                                    ae(g, ct(e[p]));
                                    ae(l, g)
                                }
                            }
                            ae(j, l)
                        }
                    }
                } else {
                    if ((w.reqclass) && (in_array([-2, 7], w.cat) != -1)) {
                        var l = ce("div"), u;
                        l.className = "small";
                        var u = ce("a");
                        u.className = ((isset("g_thottbot") && g_thottbot) ? "q" : "q1");
                        u.href = "?spells=" + w.cat + "." + (w.reqclass ? (1 + Math.log(w.reqclass) / Math.LN2) : "");
                        ae(u, ct(g_chr_classes[(1 + Math.log(w.reqclass) / Math.LN2)]));
                        ae(l, u);
                        ae(j, l)
                    }
                }
            },
            getVisibleText: function(b) {
                var c = Listview.funcBox.arrayText(b.skill, g_spell_skills);
                if (b.specialization) {
                    c += " " + (g_skill_specializations[b.specialization])
                }
                if (b.learnedat > 0) {
                    c += " " + (b.learnedat == 9999 ? "??" : b.learnedat)
                }
                return c
            },
            sortFunc: function(f, c) {
                if (f.reqclass && c.reqclass) {
                    var j = strcmp(g_chr_classes[(1 + Math.log(f.reqclass) / Math.LN2)], g_chr_classes[(1 + Math.log(c.reqclass) / Math.LN2)]);
                    if (j) {
                        return j
                    }
                }
                var e = [f.learnedat, c.learnedat];
                for (var h = 0; h < 2; ++h) {
                    var k = (h == 0 ? f : c);
                    if (e[h] == 9999 && k.colors != null ) {
                        var g = 0;
                        while (k.colors[g] == 0 && g < k.colors.length) {
                            g++
                        }
                        if (g < k.colors.length) {
                            e[h] = k.colors[g]
                        }
                    }
                }
                var l = strcmp(e[0], e[1]);
                if (l != 0) {
                    return l
                }
                if (f.colors != null  && c.colors != null ) {
                    for (var g = 0; g < 4; ++g) {
                        if (f.hasOwnProperty("colors") && c.hasOwnProperty("colors") && f.colors.hasOwnProperty(g) && c.colors.hasOwnProperty(g)) {
                            l = strcmp(f.colors[g], c.colors[g])
                        }
                        if (l != 0) {
                            return l
                        }
                    }
                }
                return Listview.funcBox.assocArrCmp(f.skill, c.skill, g_spell_skills)
            }
        }, {
            id: "skillup",
            name: LANG.skillpoints,
            width: "10%",
            value: "nskillup",
            compute: function(b, c) {
                if (b.nskillup > 0) {
                    return b.nskillup
                }
            },
            hidden: true
        }],        
        getItemLink: function (a) {
            return "?spell=" + a.id
        }
    },
    zone: {
        sort: [1],
        nItemsPerPage: -1,
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            value: "name",
            compute: function (c, e) {
                var b = ce("a");
                b.style.fontFamily = "Verdana, sans-serif";
                b.href = this.template.getItemLink(c);
                ae(b, ct(c.name));
                if (c.expansion) {
                    var d = ce("span");
                    switch (c.expansion) {
                    case 1:
                        d.className = "bc-icon";
                        break;
                    case 2:
                        d.className = "wotlk-icon";
                        break;
                    case 3:
                        d.className = "cata-icon";
                        break;
                    case 4:
                        d.className = "mop-icon";
                        break;
                    }
                    ae(d, b);
                    ae(e, d)
                } else {
                    ae(e, b)
                }
            },
            getVisibleText: function (a) {
                var b = a.name;
                if (a.expansion) {
                    switch (a.expansion) {
                    case 1:
                        b += " bc";
                        break;
                    case 2:
                        b += "wotlk wrath";
                        break;
                    case 3:
                        b += "cata";
                        break;
                    case 4:
                        b += "mop";
                        break;
                    }
                }
                return b
            }
        }, {
            id: "level",
            name: LANG.level,
            type: "range",
            width: "10%",
            getMinValue: function (a) {
                return a.minlevel
            },
            getMaxValue: function (a) {
                return a.maxlevel
            },
            compute: function (a, b) {
                if (a.minlevel > 0 && a.maxlevel > 0) {
                    if (a.minlevel != a.maxlevel) {
                        return a.minlevel + LANG.hyphen + a.maxlevel
                    } else {
                        return a.minlevel
                    }
                }
            },
            sortFunc: function (d, c, e) {
                if (e > 0) {
                    return strcmp(d.minlevel, c.minlevel) || strcmp(d.maxlevel, c.maxlevel)
                } else {
                    return strcmp(d.maxlevel, c.maxlevel) || strcmp(d.minlevel, c.minlevel)
                }
            }
        }, {
            id: "territory",
            name: LANG.territory,
            type: "text",
            width: "13%",
            compute: function (a, c) {
                var b = ce("span");
                switch (a.territory) {
                case 0:
                    b.className = "alliance-icon";
                    break;
                case 1:
                    b.className = "horde-icon";
                    break;
                case 4:
                    b.className = "ffapvp-icon";
                    break
                }
                ae(b, ct(g_zone_territories[a.territory]));
                ae(c, b)
            },
            getVisibleText: function (a) {
                return g_zone_territories[a.territory]
            },
            sortFunc: function (d, c, e) {
                return strcmp(g_zone_territories[d.territory], g_zone_territories[c.territory])
            }
        }, {
            id: "players",
            name: "Players",
            type: "text",
            width: "13%",
            compute: function (a, c) {
                if (a.instance == 3 && a.nplayers == 0)
                    a.nplayers = "25"
                if (a.nplayers == 0) {
                    if (a.nplayers == -1) {
                        a.players = "5"
                    } else if (a.instance == 3)
                        a.nplayers = "25";
                    else if (a.nplayers == -2)
                        a.players = "10/25"
                    else
                        a.players = a.nplayers;
                } else {
                    if (a.nplayers == -2)
                        a.nplayers = "10/25"
                }
                var b = ce("span");
                ae(b, ct(a.nplayers == 0 ? '' : sprintf(LANG.lvzone_xman, a.nplayers)));
                ae(c, b);
            },
            getVisibleText: function (a) {
                return a.players
            },
            sortFunc: function (d, c, e) {
                return strcmp(d.players, c.players)
            }
        }, {
            id: "instancetype",
            name: LANG.instancetype,
            type: "text",
            width: "13%",
            compute: function (a, d) {
                if (a.instance > 0) {
                    /*if (a.instance == 7 || a.instance == 8 || a.instance == 5) {
                        var g = ce("span");
                        g.className = "heroic-icon";
                        ae(d, g);
                    }*/
                    var b = ce("span");
                    if ((a.instance >= 1 && a.instance <= 5) || a.instance == 7 || a.instance == 8) {
                        b.className = "instance-icon" + a.instance
                    }
                    var c = g_zone_instancetypes[a.instance];
                    /*if (a.nplayers > 0 && ((a.instance != 2 && a.instance != 5) || a.nplayers > 5)) {
                        c += " (";
                        if (a.instance == 4) {
                            c += sprintf(LANG.lvzone_xvx, a.nplayers, a.nplayers)
                        } else {
                            c += sprintf(LANG.lvzone_xman, a.nplayers)
                        }
                        c += ")"
                    }*/
                    ae(b, ct(c));
                    ae(d, b)
                }
            },
            getVisibleText: function (a) {
                if (a.instance > 0) {
                    var b = g_zone_instancetypes[a.instance];
                    if (a.nplayers && ((a.instance != 2 && a.instance != 5) || a.nplayers > 5)) {
                        if (a.instance == 4) {
                            b += " " + sprintf(LANG.lvzone_xvx, a.nplayers, a.nplayers)
                        } else {
                            if (a.instance != 7 && a.instance != 8)
                                b += " " + sprintf(LANG.lvzone_xman, a.nplayers)
                        }
                    }
                    return b
                }
            },
            sortFunc: function (d, c, e) {
                return strcmp(g_zone_instancetypes[d.instance], g_zone_instancetypes[c.instance]) || strcmp(d.instance, c.instance) || strcmp(d.nplayers, c.nplayers)
            }
        }, {
            id: "category",
            name: LANG.category,
            type: "text",
            width: "15%",
            compute: function (c, d) {
                d.className = "small q1";
                var b = ce("a");

                b.href = "?zones=";

                /*
                if (c.category == 2 || c.category == 5)
                    b.href += "instances.-1";
                else if (c.category == 7)
                    b.href += "instances.-2";

                if (c.category == 2 || c.category == 5)
                    ae(b, ct(g_zone_categories[2]));
                else if (c.category == 7 || c.category == 8)
                    ae(b, ct(g_zone_categories[3]));
                else
                    ae(b, ct(g_zone_categories[c.category]));
                */

                if (c.category >= 0 || c.category == -3) {
                    b.href += c.category == -3 ? "cities" : c.category;
                    ae(b, ct(g_zone_categories[c.category]));
                }

                ae(d, b)
            },
            getVisibleText: function (a) {
                return g_zone_categories[a.category]
            },
            sortFunc: function (d, c, e) {
                return strcmp(g_zone_categories[d.category], g_zone_categories[c.category])
            }
        }],
        getItemLink: function (a) {
            return "?zone=" + a.id;
        }
    },
    /*comment: {
        sort: [1],
        mode: 2,
        nItemsPerPage: 4,
        poundable: 2,
        columns: [{
            value: "number"
        }, {
            value: "id"
        }, {
            value: "rating"
        }],
        compute: function (t, H) {
            var L, s = new Date(t.date),
                F = (g_serverTime - s) / 1000,
                d = (g_user.roles & 26) != 0,
                I = t.rating < 0 || t.purged || t.deleted,
                C = d || t.user.toLowerCase() == g_user.name.toLowerCase(),
                v = C && t.deleted == 0,
                c = C && t.replyTo != t.id,
                J = ((t.roles & 190) == 0),
                D = t.purged == 0 && t.deleted == 0 && g_user.id && t.user.toLowerCase() != g_user.name.toLowerCase() && in_array(t.raters, g_user.id, function (M) {
                    return M[0]
                }) == -1,
                i = t.rating >= 0 && (g_user.id == 0 || D);
            t.ratable = D;
            H.className = "comment";
            if (t.indent) {
                H.className += " comment-indent"
            }
            var w = ce("div");
            var m = ce("div");
            var k = ce("div");
            t.divHeader = w;
            t.divBody = m;
            t.divLinks = k;
            w.className = (I ? "comment-header-bt" : "comment-header");
            var g = ce("div");
            g.className = "comment-rating";
            if (I) {
                var p = ce("a");
                p.href = "javascript:;";
                p.onclick = Listview.funcBox.coToggleVis.bind(p, t);
                ae(p, ct(LANG.lvcomment_show));
                ae(g, p);
                ae(g, ct(" " + String.fromCharCode(160) + " "))
            }
            var n = ce("b");
            ae(n, ct(LANG.lvcomment_rating));
            var q = ce("span");
            ae(q, ct((t.rating > 0 ? "+" : "") + t.rating));
            ae(n, q);
            ae(g, n);
            ae(g, ct(" "));
            var B = ce("span");
            var j = ce("a"),
                K = ce("a");
            if (D) {
                j.href = K.href = "javascript:;";
                j.onclick = Listview.funcBox.coRate.bind(j, t, 1);
                K.onclick = Listview.funcBox.coRate.bind(K, t, -1);
                if (d) {
                    var A = ce("a");
                    A.href = "javascript:;";
                    A.onclick = Listview.funcBox.coRate.bind(A, t, 0);
                    A.onmouseover = Listview.funcBox.coCustomRatingOver;
                    A.onmousemove = Tooltip.cursorUpdate;
                    A.onmouseout = Tooltip.hide;
                    ae(A, ct("[~]"));
                    ae(B, A);
                    ae(B, ct(" "))
                }
            } else {
                j.href = K.href = "?account=signin"
            }
            ae(j, ct("[+]"));
            j.onmouseover = Listview.funcBox.coPlusRatingOver;
            K.onmouseover = Listview.funcBox.coMinusRatingOver;
            j.onmousemove = K.onmousemove = Tooltip.cursorUpdate;
            j.onmouseout = K.onmouseout = Tooltip.hide;
            ae(K, ct("[-]"));
            ae(B, K);
            ae(B, ct(" "));
            ae(B, j);
            ae(g, B);
            if (!i) {
                B.style.display = "none"
            }
            ae(w, g);
            ae(w, ct(LANG.lvcomment_by));
            var G = ce("a");
            G.href = "?user=" + t.user;
            ae(G, ct(t.user));
            ae(w, G);
            ae(w, ct(" "));
            var a = ce("a");
            a.className = "q0";
            a.id = "comments:id=" + t.id;
            a.href = "#" + a.id;
            Listview.funcBox.coFormatDate(a, F, s);
            a.style.cursor = "pointer";
            ae(w, a);
            ae(w, ct(LANG.lvcomment_patch1 + g_getPatchVersion(s) + LANG.lvcomment_patch2));
            ae(H, w);
            m.className = "comment-body" + Listview.funcBox.coGetColor(t);
            if (t.indent) {
                m.className += " comment-body-indent"
            }
            m.innerHTML = Markup.toHtml(t.body, {
                mode: Markup.MODE_COMMENT,
                roles: t.roles
            });
            ae(H, m);
            if ((t.roles & 26) == 0 || g_user.roles & 26) {
                var E = ce("div");
                t.divLastEdit = E;
                E.className = "comment-lastedit";
                ae(E, ct(LANG.lvcomment_lastedit));
                var o = ce("a");
                ae(o, ct(" "));
                ae(E, o);
                ae(E, ct(" "));
                var z = ce("span");
                ae(E, z);
                ae(E, ct(" "));
                Listview.funcBox.coUpdateLastEdit(t);
                if (I) {
                    E.style.display = "none"
                }
                ae(H, E)
            }
            k.className = "comment-links";
            if (C) {
                var b = ce("span");
                var y = ce("a");
                ae(y, ct(LANG.lvcomment_edit));
                y.onclick = Listview.funcBox.coEdit.bind(this, t, 0);
                ns(y);
                y.href = "javascript:;";
                ae(b, y);
                ae(b, ct("|"));
                ae(k, b)
            }
            if (v) {
                var l = ce("span");
                var r = ce("a");
                ae(r, ct(LANG.lvcomment_delete));
                r.onclick = Listview.funcBox.coDelete.bind(this, t);
                ns(r);
                r.href = "javascript:;";
                ae(l, r);
                ae(l, ct("|"));
                ae(k, l)
            }
            if (c) {
                var x = ce("span");
                var e = ce("a");
                ae(e, ct(LANG.lvcomment_detach));
                e.onclick = Listview.funcBox.coDetach.bind(this, t);
                ns(e);
                e.href = "javascript:;";
                ae(x, e);
                ae(x, ct("|"));
                ae(k, x)
            }
            if (J) {
                var u = ce("span");
                var f = ce("a");
                ae(f, ct(LANG.lvcomment_report));
                if (g_user.id > 0) {
                    f.onclick = Listview.funcBox.coReportClick.bind(f, t, 0);
                    f.href = "javascript:;"
                } else {
                    f.href = "?account=signin"
                }
                ae(u, f);
                ae(u, ct("|"));
                ae(k, u)
            }
            var h = ce("a");
            ae(h, ct(LANG.lvcomment_reply));
            if (g_user.id > 0) {
                h.onclick = Listview.funcBox.coReply.bind(this, t);
                h.href = "javascript:;"
            } else {
                h.href = "?account=signin"
            }
            ae(k, h);
            if (I) {
                m.style.display = "none";
                k.style.display = "none"
            }
            ae(H, k)
        },
        createNote: function (g) {
            var f = ce("small");
            var b = ce("a");
            if (g_user.id > 0) {
                b.href = "javascript:;";
                b.onclick = co_addYourComment
            } else {
                b.href = "?account=signin"
            }
            ae(b, ct(LANG.lvcomment_add));
            ae(f, b);
            var e = ce("span");
            e.style.padding = "0 5px";
            e.style.color = "white";
            ae(e, ct("|"));
            ae(f, e);
            ae(f, ct(LANG.lvcomment_sort));
            var c = ce("a");
            c.href = "javascript:;";
            ae(c, ct(LANG.lvcomment_sortdate));
            //c.onclick = Listview.funcBox.coSortDate.bind(this, c);
            ae(f, c);
            ae(f, ct(LANG.comma));
            var d = ce("a");
            d.href = "javascript:;";
            ae(d, ct(LANG.lvcomment_sortrating));
            d.onclick = Listview.funcBox.coSortHighestRatedFirst.bind(this, d);
            ae(f, d);
            //c.onclick();
            ae(g, f)
        },
        onNoData: function (c) {
            if (typeof g_pageInfo == "object" && g_pageInfo.type > 0) {
                var a = "<b>" + LANG.lvnodata_co1 + '</b><div class="pad2"></div>';
                if (g_user.id > 0) {
                    var b = LANG.lvnodata_co2;
                    b = b.replace("<a>", '<a href="javascript:;" onclick="co_addYourComment()" onmousedown="return false">');
                    a += b
                } else {
                    var b = LANG.lvnodata_co3;
                    b = b.replace("<a>", '<a href="?account=signin">');
                    b = b.replace("<a>", '<a href="?account=signup">');
                    a += b
                }
                c.style.padding = "1.5em 0";
                c.innerHTML = a
            }
        },
        onBeforeCreate: function () {
            if (location.hash && location.hash.match(/:id=([0-9]+)/) != null) {
                var a = in_array(this.data, parseInt(RegExp.$1), function (b) {
                    return b.id
                });
                this.rowOffset = this.getRowOffset(a);
                return this.data[a]
            }
        },
        onAfterCreate: function (a) {
            if (a != null) {
                var b = a.__div;
                this.tabs.__st = b;
                b.firstChild.style.border = "1px solid #505050"
            }
        }
    },*/
    /*commentpreview: {
        sort: [3],
        nItemsPerPage: 75,
        columns: [{
            id: "subject",
            name: LANG.subject,
            align: "left",
            value: "subject",
            compute: function (f, e) {
                var b = ce("a");
                b.style.fontFamily = "Verdana, sans-serif";
                b.href = this.template.getItemLink(f);
                ae(b, ct(f.subject));
                ae(e, b);
                var c = ce("div");
                c.className = "small";
                ae(c, ct(LANG.types[f.type][0]));
                ae(e, c)
            }
        }, {
            id: "preview",
            name: LANG.preview,
            align: "left",
            width: "50%",
            value: "preview",
            compute: function (j, i) {
                var g = ce("div");
                g.className = "crop";
                if (j.rating >= 10) {
                    g.className += " comment-green"
                }
                ae(g, ct(Markup.removeTags(j.preview, {
                    mode: (j.rating != null ? Markup.MODE_COMMENT : Markup.MODE_ARTICLE)
                })));
                ae(i, g);
                var e = j.rating != null;
                var f = j.user != null;
                if (e || f) {
                    g = ce("div");
                    g.className = "small3";
                    if (f) {
                        ae(g, ct(LANG.lvcomment_by));
                        var b = ce("a");
                        b.href = "?user=" + j.user;
                        ae(b, ct(j.user));
                        ae(g, b);
                        if (e) {
                            ae(g, ct(LANG.hyphen))
                        }
                    }
                    if (e) {
                        ae(g, ct(LANG.lvcomment_rating + (j.rating > 0 ? "+" : "") + j.rating));
                        var c = ce("span"),
                            h = "";
                        c.className = "q10";
                        if (j.deleted) {
                            h = LANG.lvcomment_deleted
                        } else {
                            if (j.purged) {
                                h = LANG.lvcomment_purged
                            }
                        }
                        ae(c, ct(h));
                        ae(g, c)
                    }
                    ae(i, g)
                }
            }
        }, {
            id: "posted",
            name: LANG.posted,
            width: "16%",
            value: "elapsed",
            compute: function (e, d) {
                var a = new Date(e.date),
                    c = (g_serverTime - a) / 1000;
                var b = ce("span");
                Listview.funcBox.coFormatDate(b, c, a, 0, 1);
                ae(d, b)
            }
        }],
        getItemLink: function (a) {
            return "?" + g_types[a.type] + "=" + a.typeId + (a.id != null ? "#comments:id=" + a.id : "")
        }
    },*/
    screenshot: {
        sort: [],
        mode: 3,
        nItemsPerPage: 40,
        nItemsPerRow: 4,
        poundable: 2,
        columns: [],
        compute: function (k, e, l) {
            var u, o = new Date(k.date),
                f = (g_serverTime - o) / 1000;
            e.className = "screenshot-cell";
            e.vAlign = "bottom";
            var q = ce("a");
            q.href = "#screenshots:id=" + k.id;
            q.onclick = rf2;
            var v = ce("img"),
                t = Math.min(150 / k.width, 150 / k.height);
            v.src = "http://static.wowhead.com/uploads/screenshots/thumb/" + k.id + ".png";
            ae(q, v);
            ae(e, q);
            var p = ce("div");
            p.className = "screenshot-cell-user";
            var m = (k.user != null && k.user.length);
            if (m) {
                q = ce("a");
                q.href = "?user=" + k.user;
                ae(q, ct(k.user));
                ae(p, ct(LANG.lvscreenshot_from));
                ae(p, q);
                ae(p, ct(" "))
            }
            var j = ce("span");
            if (m) {
                Listview.funcBox.coFormatDate(j, f, o)
            } else {
                Listview.funcBox.coFormatDate(j, f, o, 0, 1)
            }
            ae(p, j);
            ae(e, p);
            p = ce("div");
            p.style.position = "relative";
            p.style.height = "1em";
            if (g_getLocale(true) != 0 && k.caption) {
                k.caption = ""
            }
            var h = (k.caption != null && k.caption.length);
            var g = (k.subject != null && k.subject.length);
            if (h || g) {
                var r = ce("div");
                r.className = "screenshot-caption";
                if (g) {
                    var c = ce("small");
                    ae(c, ct(LANG.types[k.type][0] + LANG.colon));
                    var b = ce("a");
                    ae(b, ct(k.subject));
                    b.href = "?" + g_types[k.type] + "=" + k.typeId;
                    ae(c, b);
                    ae(r, c);
                    if (h && k.caption.length) {
                        ae(c, ct(" (...)"))
                    }
                    ae(c, ce("br"))
                }
                if (h) {
                    aE(e, "mouseover", Listview.funcBox.ssCellOver.bind(r));
                    aE(e, "mouseout", Listview.funcBox.ssCellOut.bind(r));
                    var n = ce("span");
                    n.innerHTML = k.caption;
                    ae(r, n)
                }
                ae(p, r)
            }
            aE(e, "click", Listview.funcBox.ssCellClick.bind(this, l));
            ae(e, p)
        },
        createNote: function (d) {
            if (typeof g_pageInfo == "object" && g_pageInfo.type > 0) {
                var c = ce("small");
                var b = ce("a");
                if (g_user.id > 0) {
                    b.href = "javascript:;";
                    b.onclick = ss_submitAScreenshot
                } else {
                    b.href = "?account=signin"
                }
                ae(b, ct(LANG.lvscreenshot_submit));
                ae(c, b);
                ae(d, c)
            }
        },
        onNoData: function (c) {
            if (typeof g_pageInfo == "object" && g_pageInfo.type > 0) {
                var a = "<b>" + LANG.lvnodata_ss1 + '</b><div class="pad2"></div>';
                if (g_user.id > 0) {
                    var b = LANG.lvnodata_ss2;
                    b = b.replace("<a>", '<a href="javascript:;" onclick="ss_submitAScreenshot()" onmousedown="return false">');
                    a += b
                } else {
                    var b = LANG.lvnodata_ss3;
                    b = b.replace("<a>", '<a href="?account=signin">');
                    b = b.replace("<a>", '<a href="?account=signup">');
                    a += b
                }
                c.style.padding = "1.5em 0";
                c.innerHTML = a
            } else {
                return -1
            }
        },
        onBeforeCreate: function () {
            if (location.hash && location.hash.match(/:id=([0-9]+)/) != null) {
                var a = in_array(this.data, parseInt(RegExp.$1), function (b) {
                    return b.id
                });
                this.rowOffset = this.getRowOffset(a);
                return a
            }
        },
        onAfterCreate: function (a) {
            if (a != null) {
                setTimeout((function () {
                    ScreenshotViewer.show({
                        screenshots: this.data,
                        pos: a
                    })
                }).bind(this), 1)
            }
        }
    },
    pet: {
        sort: [1],
        nItemsPerPage: -1,
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            value: "name",
            span: 2,
            compute: function (b, k, g) {
                var e = ce("td");
                e.style.width = "1px";
                e.style.padding = "0";
                e.style.borderRight = "none";
                ae(e, Icon.create(b.icon, 0));
                ae(g, e);
                k.style.borderLeft = "none";
                var j = ce("div");
                var c = ce("a");
                c.style.fontFamily = "Verdana, sans-serif";
                c.href = this.template.getItemLink(b);
                ae(c, ct(b.name));
                if (b.expansion) {
                    var f = ce("span");
                    f.className = (b.expansion == 1 ? "bc-icon" : "wotlk-icon");
                    ae(f, c);
                    ae(j, f)
                } else {
                    ae(j, c)
                }
                if (b.exotic) {
                    j.style.position = "relative";
                    var h = ce("div");
                    h.className = "small";
                    h.style.fontStyle = "italic";
                    h.style.position = "absolute";
                    h.style.right = "3px";
                    h.style.bottom = "0px";
                    ae(h, ct(LANG.lvpet_exotic));
                    ae(j, h)
                }
                ae(k, j)
            },
            getVisibleText: function (a) {
                var b = a.name;
                if (a.expansion == 1) {
                    b += " bc"
                } else {
                    if (a.expansion == 2) {
                        b += "wotlk wrath"
                    }
                }
                if (a.exotic) {
                    b += " " + LANG.lvpet_exotic
                }
                return b
            }
        }, {
            id: "level",
            name: LANG.level,
            type: "range",
            getMinValue: function (a) {
                return a.minlevel
            },
            getMaxValue: function (a) {
                return a.maxlevel
            },
            compute: function (a, b) {
                if (a.minlevel > 0 && a.maxlevel > 0) {
                    if (a.minlevel != a.maxlevel) {
                        return a.minlevel + LANG.hyphen + a.maxlevel
                    } else {
                        return a.minlevel
                    }
                } else {
                    return -1
                }
            },
            sortFunc: function (d, c, e) {
                if (e > 0) {
                    return strcmp(d.minlevel, c.minlevel) || strcmp(d.maxlevel, c.maxlevel)
                } else {
                    return strcmp(d.maxlevel, c.maxlevel) || strcmp(d.minlevel, c.minlevel)
                }
            }
        }, {
            id: "damage",
            name: LANG.damage,
            value: "damage",
            compute: function (a, b) {
                ae(b, this.template.getStatPct(a.damage))
            }
        }, {
            id: "armor",
            name: LANG.armor,
            value: "armor",
            compute: function (a, b) {
                ae(b, this.template.getStatPct(a.armor))
            }
        }, {
            id: "health",
            name: LANG.health,
            value: "health",
            compute: function (a, b) {
                ae(b, this.template.getStatPct(a.health))
            }
        }, {
            id: "abilities",
            name: LANG.abilities,
            type: "text",
            getValue: function (b) {
                if (!b.spells) {
                    return ""
                }
                if (b.spells.length > 0) {
                    var d = "";
                    for (var c = 0, a = b.spells.length; c < a; ++c) {
                        if (b.spells[c]) {
                            d += g_spells[b.spells[c]]["name_" + g_locale.name]
                        }
                    }
                    return d
                }
            },
            compute: function (a, b) {
                if (!a.spells) {
                    return ""
                }
                if (a.spells.length > 0) {
                    b.style.padding = "0";
                    Listview.funcBox.createCenteredIcons(a.spells, b, "", 1)
                }
            },
            sortFunc: function (d, c) {
                if (!d.spells || !c.spells) {
                    return 0
                }
                return strcmp(d.spellCount, c.spellCount) || strcmp(d.spells, c.spells)
            },
            hidden: true
        }, {
            id: "diet",
            name: LANG.diet,
            type: "text",
            compute: function (a, e) {
                if (e) {
                    e.className = "small"
                }
                var b = 0,
                    c = "";
                for (var d in g_pet_foods) {
                    if (a.diet & d) {
                        if (b++ > 0) {
                            c += LANG.comma
                        }
                        c += g_pet_foods[d]
                    }
                }
                return c
            },
            sortFunc: function (d, c) {
                return strcmp(c.foodCount, d.foodCount) || Listview.funcBox.assocArrCmp(d.diet, c.diet, g_pet_foods)
            }
        }, {
            id: "type",
            name: LANG.type,
            type: "text",
            compute: function (b, d) {
                if (b.type != null) {
                    d.className = "small q1";
                    var c = ce("a");
                    c.href = "?pets=" + b.type;
                    ae(c, ct(g_pet_types[b.type]));
                    ae(d, c)
                }
            },
            getVisibleText: function (a) {
                if (a.type != null) {
                    return g_pet_types[a.type]
                }
            },
            sortFunc: function (d, c, e) {
                return strcmp(g_pet_types[d.type], g_pet_types[c.type])
            }
        }],
        getItemLink: function (a) {
            return "?pet=" + a.id
        },
        getStatPct: function (b) {
            var a = ce("span");
            if (!isNaN(b) && b > 0) {
                a.className = "q2";
                ae(a, ct("+" + b + "%"))
            } else {
                if (!isNaN(b) && b < 0) {
                    a.className = "q10";
                    ae(a, ct(b + "%"))
                }
            }
            return a
        }
    },
    achievement: {
        sort: [1, 2],
        nItemsPerPage: 100,
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            value: "name",
            span: 2,
            compute: function (c, j, g) {
                var b = null;
                if (c.who && c.completed) {
                    b = "who=" + c.who + "&when=" + c.completed.getTime()
                }
                var f = ce("td");
                f.style.width = "1px";
                f.style.padding = "0";
                f.style.borderRight = "none";
                ae(f, g_achievements.createIcon(c.id, 1));
                Icon.getLink(f.firstChild).rel = b;
                ae(g, f);
                j.style.borderLeft = "none";
                var e = ce("a");
                e.style.fontFamily = "Verdana, sans-serif";
                e.href = this.template.getItemLink(c);
                e.rel = b;
                ae(e, ct(c.name));
                ae(j, e);
                if (c.description != null) {
                    var h = ce("div");
                    h.className = "small";
                    ae(h, ct(c.description));
                    ae(j, h)
                }
            },
            getVisibleText: function (a) {
                var b = a.name;
                if (a.description) {
                    b += " " + a.description
                }
                return b
            }
        }, {
            id: "location",
            name: LANG.location,
            type: "text",
            width: "15%",
            compute: function (b, d) {
                if (b.zone) {
                    var c = ce("a");
                    c.className = "q1";
                    c.href = "?zone=" + b.zone;
                    ae(c, ct(g_zones[b.zone]));
                    ae(d, c)
                }
            },
            getVisibleText: function (a) {
                return Listview.funcBox.arrayText(a.zone, g_zones)
            },
            sortFunc: function (d, c, e) {
                return Listview.funcBox.assocArrCmp(d.zone, c.zone, g_zones)
            }
        }, {
            id: "side",
            name: LANG.side,
            type: "text",
            width: "5%",
            compute: function (a, c) {
                if (a.side) {
                    var b = ce("span");
                    if (a.side == 1) {
                        b.className = "alliance-icon"
                    } else {
                        if (a.side == 2) {
                            b.className = "horde-icon"
                        }
                    }
                    ae(c, b)
                } else {
                    return -1
                }
            },
            sortFunc: function (d, c, e) {
                return strcmp(g_sides[d.side], g_sides[c.side])
            }
        }, {
            id: "points",
            name: LANG.points,
            type: "number",
            width: "10%",
            value: "points",
            compute: function (a, b) {
                if (a.points) {
                    //Listview.funcBox.appendMoney(b, 0, null, 0, 0, 0, a.points)
                    // most pedig haxoljunk egy jót
                    var x = ce('div');
                    x.innerHTML = '<span class="moneyachievement tip" onmouseover="Listview.funcBox.moneyAchievementOver(event)" onmousemove="Tooltip.cursorUpdate(event)" onmouseout="Tooltip.hide()">' + a.points + '</span>';
                    ae(b, x);
                }
            }
        }, {
            id: "rewards",
            name: LANG.rewards,
            type: "text",
            width: "20%",
            value: "rewards",
            compute: function (a, c) {
                if (a.rewards) {
                    c.className = "small q1";
                    var b = ce("span");
                    ae(b, ct(a.rewards));
                    ae(c, b)
                }
            },
            getVisibleText: function (a) {
                if (a.rewards) {
                    return a.rewards
                }
            },
            sortFunc: function (d, c, e) {
                return strcmp(d.rewards, c.rewards)
            }
        }, {
            id: "category",
            name: LANG.category,
            type: "text",
            width: "15%",
            compute: function (b, d) {
                d.className = "small q1";
                var c = ce("a");
                c.href = "?achievements=" + b.category;
                ae(c, ct(g_achievement_categories[b.category]));
                ae(d, c)
            },
            getVisibleText: function (a) {
                return g_achievement_categories[a.category]
            },
            sortFunc: function (d, c, e) {
                return strcmp(g_achievement_categories[d.category], g_achievement_categories[c.category])
            },
            hidden: true
        }],
        getItemLink: function (a) {
            return "?achievement=" + a.id
        }
    },
    profile: {
        sort: [],
        nItemsPerPage: 50,
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            value: "name",
            type: "text",
            align: "left",
            span: 2,
            compute: function (f, c, h) {
                if (f.level) {
                    var e = ce("td");
                    e.style.width = "1px";
                    e.style.padding = "0";
                    e.style.borderRight = "none";
                    ae(e, Icon.create(f.icon ? f.icon : "chr_" + g_file_races[f.race] + "_" + g_file_genders[f.gender] + "_" + g_file_classes[f.classs] + "0" + (f.level > 59 ? (Math.floor((f.level - 60) / 10) + 2) : 1), 1));
                    ae(h, e);
                    c.style.borderLeft = "none"
                } else {
                    c.colSpan = 2
                }
                var b = ce("div");
                b.style.position = "relative";
                var k = ce("a");
                k.style.fontFamily = "Verdana, sans-serif";
                k.href = this.template.getItemLink(f);
                ae(k, ct(f.name));
                ae(b, k);
                var g = ce("div");
                g.className = "small";
                if (f.guild) {
                    var k = ce("a");
                    k.className = "q1";
                    k.href = "?profiles=" + f.region + "." + f.realm + "&filter=cr=9;crs=0;crv=" + str_replace(urlencode(f.guild), "%20", "+") + "&roster=1";
                    ae(k, ct(f.guild));
                    ae(g, ct("<"));
                    ae(g, k);
                    ae(g, ct(">"))
                } else {
                    if (f.description) {
                        ae(g, ct(f.description))
                    }
                }
                var l = ce("span"),
                    j = "";
                l.className = "q10";
                if (f.deleted) {
                    j = LANG.lvcomment_deleted
                }
                ae(l, ct(j));
                ae(g, l);
                ae(b, g);
                var g = ce("div");
                g.className = "small";
                g.style.fontStyle = "italic";
                g.style.position = "absolute";
                g.style.right = "3px";
                g.style.bottom = "0px";
                if (!f.published && !f.region && !f.realm) {
                    ae(g, ct(LANG.privateprofile))
                }
                ae(b, g);
                ae(c, b)
            },
            getVisibleText: function (a) {
                var b = a.name;
                if (a.guild) {
                    b += " " + a.guild
                }
                return b
            }
        }, {
            id: "faction",
            name: LANG.faction,
            type: "text",
            compute: function (a, f) {
                if (!a.size && !a.members && !a.level) {
                    return
                }
                var e = ce("div"),
                    c = ce("div"),
                    b;
                b = Icon.create("faction_" + g_file_factions[a.faction + 1], 0);
                b.onmouseover = function (d) {
                    Tooltip.showAtCursor(d, g_sides[a.faction + 1], 0, 0, "q")
                };
                b.onmousemove = Tooltip.cursorUpdate;
                b.onmouseout = Tooltip.hide;
                b.style.cssFloat = b.style.syleFloat = "left";
                e.style.margin = "0 auto";
                e.style.textAlign = "left";
                e.style.width = "26px";
                c.className = "clear";
                ae(e, b);
                ae(f, e);
                ae(f, c)
            },
            getVisibleText: function (a) {
                return g_sides[a.faction + 1]
            },
            sortFunc: function (d, c, e) {
                return strcmp(this.getVisibleText(d), this.getVisibleText(c))
            }
        }, {
            id: "members",
            name: LANG.members,
            value: "members",
            hidden: 1
        }, {
            id: "size",
            name: "Size",
            value: "size",
            hidden: 1
        }, {
            id: "rank",
            name: "Rank",
            value: "rank",
            hidden: 1
        }, {
            id: "race",
            name: LANG.race,
            type: "text",
            compute: function (a, f) {
                if (a.race) {
                    var e = ce("div"),
                        c = ce("div"),
                        b;
                    b = Icon.create("race_" + g_file_races[a.race] + "_" + g_file_genders[a.gender], 0);
                    b.onmouseover = function (d) {
                        Tooltip.showAtCursor(d, g_chr_races[a.race], 0, 0, "q")
                    };
                    b.onmousemove = Tooltip.cursorUpdate;
                    b.onmouseout = Tooltip.hide;
                    b.style.cssFloat = b.style.syleFloat = "left";
                    e.style.margin = "0 auto";
                    e.style.textAlign = "left";
                    e.style.width = "26px";
                    c.className = "clear";
                    ae(e, b);
                    ae(f, e);
                    ae(f, c)
                }
            },
            getVisibleText: function (a) {
                return g_file_genders[a.gender] + " " + g_chr_races[a.race]
            },
            sortFunc: function (d, c, e) {
                return strcmp(g_chr_races[d.race], g_chr_races[c.race])
            },
            hidden: 1
        }, {
            id: "classs",
            name: LANG.classs,
            type: "text",
            compute: function (a, f) {
                if (a.classs) {
                    var e = ce("div"),
                        c = ce("div"),
                        b;
                    b = Icon.create("class_" + g_file_classes[a.classs], 0);
                    b.onmouseover = function (d) {
                        Tooltip.showAtCursor(d, g_chr_classes[a.classs], 0, 0, "q")
                    };
                    b.onmousemove = Tooltip.cursorUpdate;
                    b.onmouseout = Tooltip.hide;
                    b.style.cssFloat = b.style.syleFloat = "left";
                    e.style.margin = "0 auto";
                    e.style.textAlign = "left";
                    e.style.width = "26px";
                    c.className = "clear";
                    ae(e, b);
                    ae(f, e);
                    ae(f, c)
                } else {
                    return -1
                }
            },
            getVisibleText: function (a) {
                if (a.classs) {
                    return g_chr_classes[a.classs]
                }
            },
            sortFunc: function (d, c, e) {
                return strcmp(this.getVisibleText(d), this.getVisibleText(c))
            },
            hidden: 1
        }, {
            id: "level",
            name: LANG.level,
            value: "level",
            hidden: 1
        }, {
            id: "talents",
            name: LANG.talents,
            type: "text",
            compute: function (e, j) {
                if (!e.level) {
                    return
                }
                var i = [e.talenttree1, e.talenttree2, e.talenttree3],
                    f = pr_getSpecFromTalents(e.classs, i),
                    c,
                    g,
                    b = ce("a");
                var h = ce("div");
                h.style.width = "82px";
                h.style.height = "23px";
                h.style.margin = "0 auto";
                h.style.lineHeight = "23px";
                h.style.backgroundImage = "url(" + f.icon + ")";
                h.style.backgroundRepeat = "no-repeat";
                h.style.backgroundPosition = "left";
                var b = ce("a");
                b.className = "small q1";
                b.style.padding = "7px 0 7px 28px";
                b.style.fontWeight = "bold";
                b.rel = "np";
                b.href = this.template.getItemLink(e) + "#talents";
                b.onmouseover = function (a) {
                    Tooltip.showAtCursor(a, f.name, 0, 0, "q")
                };
                b.onmousemove = Tooltip.cursorUpdate;
                b.onmouseout = Tooltip.hide;
                ae(b, ct(e.talenttree1 + " / " + e.talenttree2 + " / " + e.talenttree3));
                ae(h, b);
                ae(j, h)
            },
            getVisibleText: function (a) {
                if (a.talenttree1 || a.talenttree2 || a.talenttree3) {
                    if (a.talentspec > 0) {
                        return g_chr_specs[a.classs][a.talentspec - 1]
                    } else {
                        return g_chr_specs[0]
                    }
                } else {
                    return g_chr_specs["-1"]
                }
            },
            sortFunc: function (d, c, e) {
                return strcmp(this.getVisibleText(d), this.getVisibleText(c))
            },
            hidden: 1
        }, {
            id: "gearscore",
            name: LANG.gearscore,
            value: "gearscore",
            compute: function (a, c) {
                var b = (a.level ? a.level : (a.members ? 80 : 0));
                if (isNaN(a.gearscore) || !b) {
                    return
                }
                c.className = "q" + pr_getGearScoreQuality(b, a.gearscore, (in_array([2, 6, 7, 11], a.classs) != -1));
                return (a.gearscore ? number_format(a.gearscore) : 0)
            },
            hidden: 1
        }, {
            id: "achievementpoints",
            name: LANG.points,
            value: "achievementpoints",
            compute: function (a, b) {
                if (a.achievementpoints) {
                    Listview.funcBox.appendMoney(b, 0, null, 0, 0, 0, a.achievementpoints)
                }
            },
            hidden: 1
        }, {
            id: "wins",
            name: LANG.wins,
            value: "wins",
            hidden: 1
        }, {
            id: "losses",
            name: LANG.losses,
            compute: function (a, b) {
                return a.games - a.wins
            },
            hidden: 1
        }, {
            id: "guildrank",
            name: LANG.guildrank,
            value: "guildrank",
            compute: function (c, d) {
                if (c.guildrank > 0) {
                    return sprintf(LANG.rankno, c.guildrank)
                } else {
                    if (c.guildrank == 0) {
                        var a = ce("b");
                        ae(a, ct(LANG.guildleader));
                        ae(d, a)
                    }
                }
            },
            sortFunc: function (d, c, e) {
                return strcmp((d.guildrank >= 0 ? d.guildrank : 11), (c.guildrank >= 0 ? c.guildrank : 11))
            },
            hidden: 1
        }, {
            id: "rating",
            name: LANG.rating,
            value: "rating",
            compute: function (a, b) {
                if (a.roster) {
                    return a.arenateam[a.roster].rating
                }
                return a.rating
            },
            sortFunc: function (d, c, e) {
                if (d.roster && c.roster) {
                    return strcmp(d.arenateam[d.roster].rating, c.arenateam[c.roster].rating)
                }
                return strcmp(d.rating, c.rating)
            },
            hidden: 1
        }, {
            id: "location",
            name: LANG.location,
            type: "text",
            compute: function (c, e) {
                var b;
                if (c.region) {
                    if (c.realm) {
                        b = ce("a");
                        b.className = "q1";
                        b.href = "?profiles=" + c.region + "." + c.realm;
                        ae(b, ct(c.realmname));
                        ae(e, b);
                        ae(e, ce("br"))
                    }
                    var d = ce("small");
                    b = ce("a");
                    b.className = "q1";
                    b.href = "?profiles=" + c.region;
                    ae(b, ct(c.region.toUpperCase()));
                    ae(d, b);
                    if (c.battlegroup) {
                        ae(d, ct(LANG.hyphen));
                        b = ce("a");
                        b.className = "q1";
                        b.href = "?profiles=" + c.region + "." + c.battlegroup;
                        ae(b, ct(c.battlegroupname));
                        ae(d, b)
                    }
                    ae(e, d)
                }
            },
            getVisibleText: function (a) {
                var b = "";
                if (a.region) {
                    b += " " + a.region
                }
                if (a.battlegroup) {
                    b += " " + a.battlegroup
                }
                if (a.realm) {
                    b += " " + a.realm
                }
                return trim(b)
            },
            sortFunc: function (d, c, e) {
                if (d.region != c.region) {
                    return strcmp(d.region, c.region)
                }
                if (d.battlegroup != c.battlegroup) {
                    return strcmp(d.battlegroup, c.battlegroup)
                }
                return strcmp(d.realm, c.realm)
            }
        }, {
            id: "guild",
            name: LANG.guild,
            value: "guild",
            type: "text",
            compute: function (c, d) {
                if (!c.region || !c.battlegroup || !c.realm || !c.guild) {
                    return
                }
                var b = ce("a");
                b.className = "q1";
                b.href = "?profiles=" + c.region + "." + c.realm + "&filter=cr=9;crs=0;crv=" + str_replace(urlencode(c.guild), "%20", "+") + "&roster=1";
                ae(b, ct(c.guild));
                ae(d, b)
            }
        }],
        getItemLink: function (a) {
            if (a.size) {
                return "?profiles=" + a.region + "." + a.realm + "&filter=cr=" + (a.size == 2 ? 12 : (a.size == 3 ? 15 : 18)) + ";crs=0;crv=" + str_replace(urlencode(a.name), "%20", "+") + "&roster=" + (a.size == 5 ? 4 : a.size)
            } else {
                if (a.members) {
                    return "?profiles=" + a.region + "." + a.realm + "&filter=cr=9;crs=0;crv=" + str_replace(urlencode(a.name), "%20", "+") + "&roster=1"
                } else {
                    if (a.region && a.realm) {
                        return "?profile=" + a.region + "." + a.realm + "." + g_cleanCharacterName(a.name)
                    } else {
                        return "?profile=" + a.id
                    }
                }
            }
        }
    },
    model: {
        sort: [],
        mode: 3,
        nItemsPerPage: 40,
        nItemsPerRow: 4,
        poundable: 2,
        columns: [],
        compute: function (c, k, e) {
            k.className = "screenshot-cell";
            k.vAlign = "bottom";
            var j = ce("div");
            j.className = "pet-model";
            var b = ce("a");
            b.className = "pet-zoom";
            b.href = "javascript:;";
            b.onclick = this.template.modelShow.bind(this.template, c.npcId, c.displayId);
            ae(j, b);
            var g = ce("div");
            g.id = "pm" + c.displayId;
            ae(j, g);
            ae(k, j);
            j = ce("div");
            j.className = "screenshot-cell-user";
            b = ce("a");
            b.href = this.template.getItemLink(c);
            ae(b, ct(c.skin));
            ae(j, b);
            ae(j, ct(" (" + c.count + ")"));
            ae(k, j);
            j = ce("div");
            j.style.position = "relative";
            j.style.height = "1em";
            var h = ce("div");
            h.className = "screenshot-caption";
            var f = ce("small");
            ae(f, ct(LANG.level + ": "));
            ae(f, ct(c.minLevel + (c.minLevel == c.maxLevel ? "" : LANG.hyphen + (c.maxLevel == 9999 ? "??" : c.maxLevel))));
            ae(f, ce("br"));
            ae(h, f);
            ae(j, h);
            ae(k, j);
            setTimeout(this.template.appendFlash.bind(g, c), 1)
        },
        getItemLink: function (a) {
            return "?npcs=1&filter=" + (a.family ? "fa=" + a.family + ";" : "") + "minle=1;cr=35;crs=0;crv=" + a.skin
        },
        modelShow: function (b, a) {
            ModelViewer.show({
                type: 1,
                typeId: b,
                displayId: a,
                noPound: 1
            })
        },
        appendFlash: function (a) {
            var c = {
                model: a.displayId,
                modelType: 8,
                contentPath: "http://static.wowhead.com/modelviewer/",
                blur: (OS.mac ? "0" : "1")
            };
            var b = {
                quality: "high",
                allowscriptaccess: "always",
                menu: false,
                wmode: "opaque",
                bgcolor: "#101010"
            };
            swfobject.embedSWF("http://static.wowhead.com/modelviewer/ModelView.swf", this.id, "100%", "100%", "10.0.0", "http://static.wowhead.com/modelviewer/expressInstall.swf", c, b)
        }
    }
};
Listview.templates.commentpreview = {
    sort: [4],
    nItemsPerPage: 75,
    columns: [{
        id: "subject",
        name: LANG.subject,
        align: "left",
        value: "subject",
        compute: function(g, f) {
            var b = ce("a");
            b.className = "listview-cleartext" + (typeof g.quality == "number" ? " q" + g.quality : "");
            b.href = this.getItemLink(g);
            if (g.icon) {
                b.className += " icontiny tinyspecial";
                b.style.backgroundImage = 'url("' + g_staticUrl + "/images/wow/icons/tiny/" + g.icon.toLowerCase() + '.gif")'
            }
            ae(b, ct(g.subject));
            ae(f, b);
            if (LANG.types[g.type]) {
                var c = ce("div");
                c.className = "small";
                ae(c, ct(LANG.types[g.type][0]));
                ae(f, c)
            }
        }
    }, {
        id: "preview",
        name: LANG.preview,
        align: "left",
        width: "50%",
        value: "preview",
        compute: function(j, h, c) {
            var f = ce("div");
            f.className = "crop";
            if (j.rating >= 10) {
                f.className += " comment-green"
            }
            ae(f, ct(Markup.removeTags(j.preview, {
                mode: Markup.MODE_ARTICLE
            })));
            ae(h, f);
            f = ce("div");
            f.className = "small3";
            if (j.rating) {
                ae(f, ct(LANG.lvcomment_rating + (j.rating > 0 ? "+" : "") + j.rating))
            }
            var b = ce("span"),
                g = "";
            b.className = "q10";
            if (j.deleted) {
                g = LANG.lvcomment_deleted
            }
            ae(b, ct(g));
            ae(f, b);
            c.__status = b;
            ae(h, f)
        }
    }, {
        id: "author",
        name: LANG.author,
        value: "user",
        compute: function(f, c) {
            c.className = ((isset("g_thottbot") && g_thottbot) ? "q" : "q1");
            var b = ce("a");
            b.href = "?user=" + f.user;
            ae(b, ct(f.user));
            ae(c, b)
        }
    }, {
        id: "posted",
        name: LANG.posted,
        width: "16%",
        value: "elapsed",
        compute: function(h, g) {
            var b = new Date(h.date),
                f = (g_serverTime - b) / 1000;
            var c = ce("span");
            g_formatDate(c, f, b, 0, 1);
            ae(g, c)
        }
    }],
    getItemLink: function(f) {
        var b = /*(f.type in g_types_host) ? g_types_host[f.type] :*/ "";
        var c = /*g_getCommentDomain(f.domain)*/"";
        if ((c == "") && f.hasOwnProperty("locale") && (f.locale != Locale.getId())) {
            c = "//" + Locale.locales[f.locale].domain.replace(/wowhead\.com$/, b)
        }
        if (c == "") {
            c = g_getRelativeHostPrefix(b)
        }
        if (f.url) {
            return /*c + "/" +*/ f.url
        }
        /*if (!g_types[f.type]) {
            return c + "/go-to-comment&id=" + f.id
        }*/
        return /*c + "/" + */"?" + g_types[f.type] + "=" + f.typeId + (f.id != null ? "#comments:id=" + f.id : "")
    }
};

Listview.templates.comment = {
    sort: [-3, 7],
    mode: 2,
    nItemsPerPage: 15,
    poundable: 2,
    columns: [{
        value: "number"
    }, {
        value: "id"
    }, {
        value: "rating"
    }, {
        value: "deleted"
    }, {
        value: "sticky"
    }, {
        value: "outofdate"
    }, {
        value: "date"
    }],
    compute: function(h, g, c) {
        var f = $("<div></div>");
        var b = (h.__minPatch && (h.__minPatch > new Date(h.date)));
        h.locale = (this.id == "english-comments" ? "www" : "");
        f.append('<table><tr><td class="vote-column"><p class="upvote"><span class="fa fa-chevron-up"></span></p><div class="rating-container"></div><p class="downvote"><span class="fa fa-chevron-down"></span></p><p class="comment-sticky" title="' + LANG.stickycomment_tip + '">STICKY</p></td><td class="main-body"><div class="comment-header"><table><tr><td class="comment-author"></td><td class="comment-controls"></td><td class="comment-notification"></td></tr></table></div><div class="text comment-body"></div><div class="comment-replies"></div><p class="comment-replies-control" style="display: none"></p></td></tr></table>');
        h.colorClass = "comment" + (c % 2);
        f.addClass("comment").addClass(h.colorClass);
        if (h.rating < -4) {
            f.addClass("comment-lowrated")
        }
        if (h.deleted) {
            f.addClass("comment-deleted")
        }
        if (h.outofdate) {
            f.addClass("comment-outofdate")
        }
        h.container = f;
        h.voteCell = f.find(".vote-column");
        h.commentCell = f.find(".main-body");
        h.repliesCell = f.find(".comment-replies");
        h.repliesControl = f.find(".comment-replies-control");
        h.headerCell = f.find(".comment-header");
        h.commentBody = f.find(".comment-body");
        h.commentAuthor = f.find(".comment-author");
        h.commentControls = f.find(".comment-controls");
        this.template.updateVoteCell(h);
        this.template.updateCommentCell(h);
        this.template.updateStickyStatus(h);
        this.template.updateReplies(h);
        if (h.deleted || h.rating < -4) {
            h.headerCell.css("cursor", "pointer");
            h.headerCell.bind("click", function() {
                h.voteCell.toggle();
                h.repliesCell.toggle();
                h.commentBody.toggle()
            })
        }
        $(g).addClass("comment-wrapper").html(f);
        if (b) {
            $(g).hide()
        } else {
            $(g).show()
        }
    },
    updateReplies: function(g) {
        this.updateRepliesCell(g);
        this.updateRepliesControl(g);
        SetupReplies(g.container, g);
        if (!g.alreadyLoadedBefore) {
            g.alreadyLoadedBefore = true;
            var f = location.hash.match("#comments:id=([0-9]+):reply=([0-9]+)");
            if (f) {
                var c = f[1];
                var b = f[2];
                if (g.id == c) {
                    this.highlightReply(g, b)
                }
            }
        }
    },
    highlightReply: function(k, f, g) {
        var j = null;
        for (var c in k.replies) {
            if (k.replies[c].id == f) {
                j = k.replies[c];
                break
            }
        }
        if (!j) {
            if (g) {
                return
            }
            $.ajax({
                type: "GET",
                url: "?comment=show-replies",
                data: {
                    id: k.id
                },
                success: function(l) {
                    k.replies = l;
                    Listview.templates.comment.updateReplies(k);
                    Listview.templates.comment.highlightReply(k, f, true)
                },
                dataType: "json"
            });
            return
        }
        var h = k.repliesCell.find(".comment-reply-row[data-replyid=" + f + "]");
        var b = "#242424";
        if (k.deleted) {
            b = "#402424"
        } else {
            if (k.outofdate) {
                b = "#322C1C"
            }
        }
        h.css("background-color", "#581111");
        setTimeout(function() {
            h.animate({
                backgroundColor: b
            }, 1500)
        }, 1500)
    },
    updateStickyStatus: function(b) {
        if (b.sticky) {
            b.voteCell.find(".comment-sticky").show()
        } else {
            b.voteCell.find(".comment-sticky").hide()
        }
    },
    updateRepliesCell: function(k) {
        var m = k.repliesCell;
        var q = $("<table></table>");
        m.html("");
        if (!k.replies.length) {
            m.append(q).hide();
            return
        }
        for (var j = 0; j < k.replies.length; ++j) {
            var f = k.replies[j];
            var t = $('<tr class="comment-reply-row"><td class="reply-controls"><p class="reply-upvote"><span class="fa fa-chevron-up"></span></p><p class="reply-rating"></p><p class="reply-downvote"><span class="fa fa-chevron-down"></span></p></td><td class="reply-text"></td></tr>');
            var s = $('<p class="comment-reply-author"></p>');
            var o = $("<a></a>");
            var h = new Date(f.creationdate);
            var n = (g_serverTime - h) / 1000;
            var p = t.find(".reply-upvote");
            var r = t.find(".reply-downvote");
            var l = (g_user.name == f.username) || (g_user.roles & U_GROUP_COMMENTS_MODERATOR) != 0;
            var b = l;
            t.attr("data-replyid", f.id);
            t.attr("data-idx", j);
            t.find(".reply-text").addClass(g_GetStaffColorFromRoles(f.roles));
            var c = $("<a></a>");
            c.text(g_formatDate(null, n, h));
            c.attr("href", "#comments:id=" + k.id + ":reply=" + f.id);
            c.attr("id", "comments:id=" + k.id + ":reply=" + f.id);
            c.addClass("when");
            o.attr("href", "?user=" + f.username);
            o.text(f.username);
            if (parseInt(f.roles) & U_GROUP_STAFF)
                s.append('<img src="templates/wowhead/images/tauri-mop.png" style="vertical-align: -3px"> ');
            s.append(o);
            s.append(" ").append(c).append(" ").append(sprintf(LANG.lvcomment_patch, g_getPatchVersion(h)));
            var g = Markup.toHtml(f.body, {
                allow: Markup.CLASS_USER,
                mode: Markup.MODE_REPLY,
                roles: 0,
                locale: k.locale
            });
            /*if (g_user.canUpvote && g_user.name != f.username && !f.reportedByUser) {
                g += ' <span class="reply-report title="' + LANG.reportthisreply_stc + '"><span class="fa fa-warning"></span></span>'
            }*/
            if (b) {
                g += ' <span class="reply-edit title="' + LANG.editthisreply_stc + '"><span class="fa fa-pencil"></span></span>'
            }
            if (l) {
                g += ' <span class="reply-delete title="' + LANG.deletethisreply_stc + '"><span class="fa fa-times"></span></span>'
            }
            t.find(".reply-text").html(s).append(g);
            t.find(".reply-rating").text(f.rating);
            if (f.votedByUser) {
                p.attr("data-hasvoted", "true")
            }
            if (g_user.canUpvote && g_user.name != f.username && !f.votedByUser && !f.downvotedByUser) {
                p.attr("data-canvote", "true")
            }
            if (f.downvotedByUser) {
                r.attr("data-hasvoted", "true")
            }
            if (g_user.canDownvote && g_user.name != f.username && !f.votedByUser && !f.downvotedByUser) {
                r.attr("data-canvote", "true")
            }
            q.append(t)
        }
        m.html(q);
        if (k.deleted || k.rating < -4) {
            k.repliesCell.hide()
        }
    },
    updateRepliesControl: function(f) {
        var b = f.repliesControl;
        b.html("").hide().unbind().attr("class", "comment-replies-control");
        var c = Math.max(f.nreplies - f.replies.length, 0);
        if ((f.deleted || f.outofdate || f.rating < -4) || (!g_user.canPostReplies && !c)) {
            return
        }
        if (g_user.canPostReplies) {
            if (!c) {
                b.text(LANG.addreply_stc).addClass("add-reply")
            } else {
                b.text(sprintf(c == 1 ? LANG.addshow1morereply_stc : LANG.addshowmorereplies_format, c)).addClass("show-more-replies")
            }
        } else {
            b.text(sprintf(c == 1 ? LANG.show1morereply_stc : LANG.showmorereplies_format, c)).addClass("show-more-replies")
        }
        b.addClass("btn btn-small");
        b.show()
    },
    updateCommentCell: function(b) {
        b.commentCell.find(".comment-edit").remove();
        this.updateCommentBody(b, b.commentBody);
        this.updateCommentAuthor(b, b.commentAuthor);
        this.updateCommentControls(b, b.commentControls)
    },
    updateCommentAuthor: function(h, g) {
        var c = g_users[h.user];
        var b = new Date(h.date);
        var f = (g_serverTime - b) / 1000;
        g.html("");
        g.append(LANG.lvcomment_by);
        if (parseInt(h.roles) & U_GROUP_STAFF)
            g.append('<img src="templates/wowhead/images/tauri-mop.png" style="vertical-align: -3px"> ');
        g.append(sprintf('<a href="?user=$1">$2</a>', h.user, h.user));
        //g.append(g_getReputationPlusAchievementText(c.gold, c.silver, c.copper, c.reputation));
        g.append(sprintf(' <a class="q0" id="comments:id=$1" href="#comments:id=$2">$3</a>', h.id, h.id, g_formatDate(null, f, b)));
        g.append(sprintf(LANG.lvcomment_patch, g_getPatchVersion(b)))
    },
    updateCommentControls: function(h, k) {
        var n = [];
        var b = (g_user.roles & U_GROUP_COMMENTS_MODERATOR) != 0 || (h.user.toLowerCase() == g_user.name.toLowerCase() && !g_user.commentban);
        var j = (g_user.roles & U_GROUP_COMMENTS_MODERATOR) != 0 || (h.user.toLowerCase() == g_user.name.toLowerCase() && !g_user.commentban);
        var l = (g_user.roles & U_GROUP_COMMENTS_MODERATOR) != 0;
        if (b) {
            if (!h.outofdate && !h.deleted) {
                n.push({
                    extraClass: "fa fa-pencil",
                    name: LANG.lvcomment_edit,
                    func: Listview.funcBox.coEdit.bind(this, h, 0, false)
                })
            }
        }
        if (j && !h.deleted) {
            n.push({
                extraClass: "fa fa-times delete",
                name: LANG.lvcomment_delete,
                func: Listview.funcBox.coDelete.bind(this, h)
            })
        }
        if (l && h.deleted) {
            n.push({
                extraClass: "fa fa-times undelete",
                name: LANG.lvcomment_undelete,
                func: Listview.funcBox.coUndelete.bind(this, h)
            })
        }
        /*if (l && h.outofdate) {
            n.push({
                extraClass: "fa fa-clock-o uptodate",
                name: LANG.lvcomment_uptodate,
                func: Listview.funcBox.coFlagUpOfDate.bind(this, h)
            })
        }
        if (g_user.id != 0 && !h.outofdate && !h.deleted) {
            n.push({
                extraClass: "fa fa-clock-o outofdate",
                name: LANG.lvcomment_outofdate,
                func: Listview.funcBox.coFlagOutOfDate.bind(this, h)
            })
        }
        if (l && !h.sticky && !h.outofdate && !h.deleted) {
            n.push({
                extraClass: "fa fa-thumb-tack sticky",
                name: "Sticky",
                func: this.sticky.bind(this, h)
            })
        }
        if (l && h.sticky && !h.outofdate && !h.deleted) {
            n.push({
                extraClass: "fa fa-thumb-tack unsticky",
                name: "Unsticky",
                func: this.sticky.bind(this, h)
            })
        }
        if (!h.outofdate && !h.deleted) {
            n.push({
                extraClass: "fa fa-warning",
                tooltip: LANG.report_tooltip,
                name: LANG.lvcomment_report,
                func: ContactTool.show.bind(ContactTool, {
                    mode: 1,
                    comment: h
                })
            })
        }*/
        k.html("");
        for (var m in n) {
            var g = n[m];
            var f = $("<a></a>");
            var c = $("<span></span>");
            f.click(g.func);
            if (g.extraClass) {
                f.addClass(g.extraClass)
            }
            if (g.tooltip) {
                Tooltip.simple(f.get(0), g.tooltip, "q2")
            } else {
                if (g.name) {
                    Tooltip.simple(f.get(0), g.name, "q2")
                }
            }
            c.append(f);
            k.append(c)
        }
    },
    updateCommentBody: function(g, c) {
        var f = Markup.rolesToClass(g.roles);
        c.removeClass("comment-green");
        c.addClass(Listview.funcBox.coGetColor(g));
        c.html(Markup.toHtml(g.body, {
            allow: f,
            mode: Markup.MODE_COMMENT,
            roles: g.roles,
            locale: g.locale
        }));
        if (g.response) {
            var b = $("<div></div>");
            b.addClass("text comment-body");
            b.html(Markup.toHtml("[div][/div][wowheadresponse=" + g.responseuser + " roles=" + g.responseroles + "]" + g.response + "[/wowheadresponse]", {
                allow: Markup.CLASS_STAFF,
                roles: g.responseroles,
                uid: "resp-" + g.id
            }));
            c.append(b)
        }
        if (g.lastEdit) {
            this.addEditedByOrDeletedByText(c, LANG.lvcomment_lastedit, g.lastEdit[2], g.lastEdit[0])
        }
        if (g.deletedInfo) {
            this.addEditedByOrDeletedByText(c, LANG.lvcomment_deletedby, g.deletedInfo[1], g.deletedInfo[0])
        }
        g.divBody = c[0];
        if (g.deleted || g.rating < -4) {
            c.hide()
        }
    },
    addEditedByOrDeletedByText: function(j, k, h, b) {
        var f = new Date(b);
        var g = (g_serverTime - f) / 1000;
        var c = $("<div></div>");
        c.addClass("comment-lastedit");
        c.html(sprintf("$1 <a></a> $2 $3", k, g_formatDate(null, g, f), sprintf(LANG.lvcomment_patch, g_getPatchVersion(f))));
        c.find("a").text(h).attr("href", "?user=" + h);
        j.append(c)
    },
    updateVoteCell: function(k) {
        var g = k.voteCell.find(".upvote");
        var f = k.voteCell.find(".downvote");
        var j = k.voteCell.find(".rating-container");
        var c = $('<p class="rating"></p>');
        var b = this;
        j.html(c);
        var h = k.hasOwnProperty("langOverride") ? k.langOverride : LANG;
        if (k.userRating > 0) {
            g.attr("data-hasvoted", "true").attr("title", h.upvoted_tip)
        } else {
            g.attr("data-hasvoted", "false").attr("title", h.upvote_tip)
        }
        if (k.userRating < 0) {
            f.attr("data-hasvoted", "true").attr("title", h.downvoted_tip)
        } else {
            f.attr("data-hasvoted", "false").attr("title", h.downvote_tip)
        }
        c.unbind();
        g.unbind();
        f.unbind();
        c.text(k.rating);
        /*c.click(function() {
            b.showVoteBreakdown(k, j)
        });*/
        g.click(function() {
            b.vote(k, 1)
        });
        f.click(function() {
            b.vote(k, -1)
        });
        if (k.deleted || k.rating < -4) {
            k.voteCell.hide()
        }
    },
    vote: function(k, c) {
        if (!c) {
            return
        }
        var h = k.hasOwnProperty("langOverride") ? k.langOverride : LANG;
        if (!g_user.id) {
            this.voteError(k, h.votelogin_tip);
            return
        }
        if (k.deleted) {
            this.voteError(k, h.votedeleted_tip);
            return
        }
        if (g_user.name == k.user) {
            this.voteError(k, h.voteself_tip);
            return
        }
        if (!g_user.canUpvote && c > 0) {
            this.voteError(k, sprintf(h.upvotenorep_tip, g_user.upvoteRep));
            return
        }
        if (!g_user.canDownvote && c < 0) {
            this.voteError(k, sprintf(h.downvotenorep_tip, g_user.downvoteRep));
            return
        }
        if (c > 0) {
            c = g_user.superCommentVotes ? 2 : 1
        } else {
            if (c < 0) {
                c = g_user.superCommentVotes ? -2 : -1
            } else {
                return
            }
        }
        var j = k.rating;
        var g = k.userRating;
        var b = this;
        if ((k.userRating > 0 && c > 0) || (k.userRating < 0 && c < 0)) {
            k.rating -= k.userRating;
            k.userRating = 0
        } else {
            k.rating -= k.userRating;
            k.rating += c;
            k.userRating = c
        }
        this.updateVoteCell(k);
        var f = "?comment=vote";
        if (k.hasOwnProperty("voteUrl")) {
            f = k.voteUrl
        }
        $.get(f, {
            id: k.id,
            rating: c
        }, function(l) {
            /*
            if (l.error) {
                k.rating = j;
                k.userRating = g;
                b.updateVoteCell(k)
            }
            if (l.message) {
                b.voteError(k, l.message)
            }*/
        }, "json")
    },
    voteError: function(c, b) {
        MessageBox(c.voteCell, b)
    },
    showVoteBreakdown: function(f, c) {
        c.find("p").html('<img src="' + g_staticUrl + '/images/icons/ajax.gif" />');
        var b = "/comment=rating";
        if (f.hasOwnProperty("ratingUrl")) {
            b = f.ratingUrl
        }
        $.get(b + "&id=" + f.id, null, function(g) {
            if (g.success) {
                c.html(sprintf('<p class="rating-up">$1</p><div class="rating-separator"></div><p class="rating-down">$2</p>', (g.up ? ("+" + g.up) : 0), -g.down))
            } else {
                MessageBox(c, "An error has occurred while fetching vote counts. Try refreshing the page.")
            }
        }, "json")
    },
    sticky: function(c) {
        var b = c.commentCell.find(".comment-notification");
        c.sticky = !c.sticky;
        this.updateStickyStatus(c);
        this.updateCommentCell(c);
        if (c.sticky) {
            MessageBox(b, "This comment is now sticky.")
        } else {
            MessageBox(b, "This comment is no longer sticky.")
        }
        $.post("/comment=sticky", {
            id: c.id,
            sticky: c.sticky ? 1 : 0
        })
    },
    createNote: function(b) {
        var h = ce("small");
        if (!g_user.commentban) {
            var o = ce("a");
            if (g_user.id > 0) {
                o.href = "javascript:;";
                o.onclick = co_addYourComment
            } else {
                o.href = "/account=signin"
            }
            ae(o, ct(LANG.lvcomment_add));
            ae(h, o);
            var f = ce("span");
            f.style.padding = "0 5px";
            f.style.color = "white";
            ae(f, ct("|"));
            ae(h, f)
        }
        ae(h, ct(LANG.sort + ": "));
        var q = ce("a");
        q.href = "javascript:;";
        ae(q, ct(LANG.newestfirst_stc));
        q.onclick = Listview.funcBox.coSortNewestFirst.bind(this, q);
        ae(h, q);
        ae(h, ct(LANG.comma));
        var r = ce("a");
        r.href = "javascript:;";
        ae(r, ct(LANG.oldestfirst_stc));
        r.onclick = Listview.funcBox.coSortOldestFirst.bind(this, r);
        ae(h, r);
        ae(h, ct(LANG.comma));
        var s = ce("a");
        s.href = "javascript:;";
        ae(s, ct(LANG.highestrated_stc));
        s.onclick = Listview.funcBox.coSortHighestRatedFirst.bind(this, s);
        ae(h, s);
        var j = gc()["comments_sort"];
        switch (j) {
            case "1":
                q.onclick();
                break;
            case "2":
                r.onclick();
                break;
            default:
            case "3":
                s.onclick();
                break
        }
        var f = ce("span");
        f.style.padding = "0 5px";
        f.style.color = "white";
        ae(f, ct("|"));
        ae(h, f);
        var t = ce("select");
        var g = ce("option");
        g.value = 0;
        g.selected = "selected";
        ae(t, g);
        var n = {};
        for (var l = 0; l < this.data.length; ++l) {
            var k = g_getPatchVersionObject(new Date(this.data[l].date).getTime());
            if (k) {
                n[k.build] = k
            }
        }
        var m = [];
        for (var c in n) {
            m.push(c)
        }
        m.sort(function(u, p) {
            return p - u
        });
        for (var c = 0; c < m.length; ++c) {
            var g = ce("option");
            g.value = n[m[c]].timestamp;
            ae(g, ct(n[m[c]].version));
            ae(t, g)
        }
        t.onchange = Listview.funcBox.coFilterByPatchVersion.bind(this, t);
        ae(h, ct(LANG.lvcomment_patchfilter));
        ae(h, t);
        ae(b, h);
        if (this.tabClick) {
            $("a, select", h).click(this.tabClick)
        }
    },
    onNoData: function(f) {
        var b = "<b>" + LANG.lvnodata_co1 + '</b><div class="pad2"></div>';
        if (g_user.id > 0) {
            var c = LANG.lvnodata_co2;
            c = c.replace("<a>", '<a href="javascript:;" onclick="co_addYourComment()" onmousedown="return false">');
            b += c
        } else {
            var c = LANG.lvnodata_co3;
            c = c.replace("<a>", '<a href="/account=signin">');
            c = c.replace("<a>", '<a href="/account=signup">');
            b += c
        }
        f.style.padding = "1.5em 0";
        f.innerHTML = b
    },
    onBeforeCreate: function() {
        if (location.hash && location.hash.match(/:id=([0-9]+)/) != null) {
            var b = gc()["comments_sort"];
            switch (b) {
                case "1":
                    this.setSort([-7], false, false);
                    break;
                case "2":
                    this.setSort([7], false, false);
                    break;
                default:
                case "3":
                    this.setSort([-3, 7], false, false);
                    break
            }
            var c = in_array(this.data, parseInt(RegExp.$1), function(f) {
                return f.id
            });
            this.rowOffset = this.getRowOffset(c);
            return this.data[c]
        }
    },
    onAfterCreate: function(b) {
        if (b != null) {
            var c = b.__div;
            this.tabs.__st = c
        }
    }
};
Menu.fixUrls(mn_items, "?items=");
Menu.fixUrls(mn_itemSets, "?itemsets&filter=cl=", "#0-2+1");
Menu.fixUrls(mn_npcs, "?npcs=");
Menu.fixUrls(mn_objects, "?objects=");
Menu.fixUrls(mn_quests, "?quests=");
Menu.fixUrls(mn_spells, "?spells=");
Menu.fixUrls(mn_zones, "?zones=");
Menu.fixUrls(mn_pets, "?pets=");
Menu.fixUrls(mn_factions, "?factions=");
Menu.fixUrls(mn_holidays, "?events=");
Menu.fixUrls(mn_currencies, "?currencies=");
Menu.fixUrls(mn_achievements, "?achievements=");
Menu.fixUrls(mn_petCalc, "?petcalc=");
Menu.fixUrls(mn_battlepetabilities, "?pet-abilities=");
Menu.fixUrls(mn_battlepetspecies, "?battle-pets=");
Menu.fixUrls(mn_forums, "?forums&board=", null, true);
var g_dev = false;
var g_locale = {
    id: 0,
    name: "enus"
};
var g_localTime = new Date();
var g_user = {
    id: 0,
    name: "",
    roles: 0
};
var g_items = {};
var g_quests = {};
var g_spells = {};
var g_achievements = {};
var g_npcs = {},
g_objects = {},
g_itemsets = {},
g_gatheredzones = {},
g_gatheredcurrencies = {},
g_factions = {},
//g_pets = {},
g_currencies = {},
g_titles = {},
g_transmogsets = {},
g_holidays = {},
g_classes = {},
g_races = {},
g_skills = {};
var g_users = {};
var g_types = {
    1: "npc",
    2: "object",
    3: "item",
    4: "itemset",
    5: "quest",
    6: "spell",
    7: "zone",
    8: "faction",
    9: "pet",
    10: "achievement",
    11: "title",
    12: "event",
    13: "class",
    14: "race",
    15: "skill",
    17: "currency",
    19: "sound",
    20: "building",
    21: "follower",
    22: "mission-ability",
    23: "mission",
    25: "ship",
    26: "threat",
    27: "resource",
    28: "champion",
    29: "icon",
    30: "order-advancement",
    31: "follower_a",
    32: "follower_h",
    33: "ship_a",
    34: "ship_h",
    35: "champion_a",
    36: "champion_h",
    40: "affix",
    100: "guide",
    101: "transmog-set",
    110: "outfit",
    150: "gallery",
    200: "pet-ability"
};
var g_locales = {
    0: "enus"
};
var g_file_races = {
    10: "bloodelf",
    11: "draenei",
    3: "dwarf",
    7: "gnome",
    1: "human",
    4: "nightelf",
    2: "orc",
    6: "tauren",
    8: "troll",
    5: "scourge"
};
var g_file_classes = {
    6: "deathknight",
    11: "druid",
    3: "hunter",
    8: "mage",
    2: "paladin",
    5: "priest",
    4: "rogue",
    7: "shaman",
    9: "warlock",
    1: "warrior"
};
var g_file_genders = {
    0: "male",
    1: "female"
};
var g_file_factions = {
    1: "alliance",
    2: "horde"
};
var g_file_gems = {
    1: "meta",
    2: "red",
    4: "yellow",
    6: "orange",
    8: "blue",
    10: "purple",
    12: "gr0een",
    14: "prismatic"
};
var g_customColors = {
    Miyari: "pink"
};
g_items.add = function (b, a) {
    if (g_items[b] != null) {
        cO(g_items[b], a)
    } else {
        g_items[b] = a
    }
};
g_items.getIcon = function (a) {
    if (g_items[a] != null) {
        return g_items[a].icon
    } else {
        return "inv_misc_questionmark"
    }
};
g_items.createIcon = function (d, b, a, c) {
    return Icon.create(g_items.getIcon(d), b, null, "?item=" + d, a, c)
};
g_spells.getIcon = function (a) {
    if (g_spells[a] != null) {
        return g_spells[a].icon
    } else {
        return "inv_misc_questionmark"
    }
};
g_spells.createIcon = function (d, b, a, c) {
    return Icon.create(g_spells.getIcon(d), b, null, "?spell=" + d, a, c)
};
g_achievements.getIcon = function (a) {
    if (g_achievements[a] != null) {
        return g_achievements[a].icon
    } else {
        return "inv_misc_questionmark"
    }
};
g_achievements.createIcon = function (d, b, a, c) {
    return Icon.create(g_achievements.getIcon(d), b, null, "?achievement=" + d, a, c)
};

cO(g_classes, {getIcon: function(b) {
    if (g_file_classes[b]) {
        return "class_" + g_file_classes[b]
    } else {
        return "inv_misc_questionmark"
    }
},createIcon: function(f, c, b, e) {
    return Icon.create(g_classes.getIcon(f), c, null, "?class=" + f, b, e)
}});
cO(g_races, {getIcon: function(c, b) {
    if (b === undefined) {
        b = 0
    }
    if (g_file_races[c] && g_file_genders[b]) {
        return "race_" + g_file_races[c] + "_" + g_file_genders[b]
    } else {
        return "inv_misc_questionmark"
    }
},createIcon: function(f, c, b, e) {
    return Icon.create(g_races.getIcon(f), c, null, "?race=" + f, b, e)
}});
cO(g_holidays, {getIcon: function(b) {
    if (g_holidays[b] != null && g_holidays[b].icon) {
        return g_holidays[b].icon
    } else {
        return "inv_misc_questionmark"
    }
},createIcon: function(f, c, b, e) {
    return Icon.create(g_holidays.getIcon(f), c, null, "?event=" + f, b, e)
}});
cO(g_gatheredcurrencies, {getIcon: function(c, b) {
    if (g_gatheredcurrencies[c] != null  && g_gatheredcurrencies[c].icon) {
        if (g_gatheredcurrencies[c].icon.is_Array && !isNaN(b)) {
            return g_gatheredcurrencies[c].icon[b]
        }
        return g_gatheredcurrencies[c].icon
    } else {
        return "inv_misc_questionmark"
    }
},createIcon: function(f, c, b, e) {
        return Icon.create(g_gatheredcurrencies.getIcon(f, (b > 0 ? 0 : 1)), c, null , null , Math.abs(b), e)
}});
cO(g_skills, {getIcon: function(b) {
    if (g_skills[b] != null && g_skills[b].icon) {
        return g_skills[b].icon
    } else {
        return "inv_misc_questionmark"
    }
},createIcon: function(f, c, b, e) {
    return Icon.create(g_skills.getIcon(f), c, null, "?skill=" + f, b, e)
}});
cO(g_petabilities, {
    add: function (c, b) {
        if (g_petabilities[c] != null) {
            cO(g_petabilities[c], b)
        } else {
            g_petabilities[c] = b
        }
    }, getIcon: function (b) {
        if (g_petabilities[b] != null && g_petabilities[b].icon) {
            return g_petabilities[b].icon
        } else {
            return "inv_misc_questionmark"
        }
    }, createIcon: function (g, c, b, f) {
        return Icon.create(g_petabilities.getIcon(g), c, null, "?pet-ability=" + g, b, f)
    }
});
var $WowheadPower = new

function () {
    var e, D, H, q, J, B, z, g = 0,
        C = {},
        f = {},
        c = {},
        G = 0,
        E = 1,
        h = 2,
        r = 3,
        F = 4,
        s = 1,
        j = 2,
        v = 3,
        y = 5,
        t = 6,
        m = 10,
        _n = 11,
        i = 100,
        o = 15,
        x = 15,
        p = {
            1: [C, "npc"],
            2: [f, "object"],
            3: [g_items, "item"],
            5: [g_quests, "quest"],
            6: [g_spells, "spell"],
            10: [g_achievements, "achievement"],
            11: [g_currencies, "currency"],
            100: [c, "profile"],
            200: [g_petabilities, "pet-ability"]
        };

    function K() {
        aE(document, "mouseover", u)
    }

    function n(O) {
        var P = g_getCursorPos(O);
        B = P.x;
        z = P.y
    }

    function M(aa, W) {
        if (aa.nodeName != "A" && aa.nodeName != "AREA") {
            return -2323
        }
        if (!aa.href.length) {
            return
        }
        if (aa.rel.indexOf("np") != -1) {
            return
        }
        var T, S, Q, P, U = {};
        q = U;
        var O = function (ab, af, ad) {
            if (af == "buff" || af == "sock") {
                U[af] = true
            } else {
                if (af == "rand" || af == "ench" || af == "lvl" || af == "c") {
                    U[af] = parseInt(ad)
                } else {
                    if (af == "gems" || af == "pcs") {
                        U[af] = ad.split(":")
                    } else {
                        if (af == "who" || af == "domain") {
                            U[af] = ad
                        } else {
                            if (af == "when") {
                                U[af] = new Date(parseInt(ad))
                            }
                        }
                    }
                }
            }
        };
        S = 2;
        Q = 3;
        /*
        if (aa.href.indexOf("http://") == 0) {
            T = 1;
            P = aa.href.match(/http:\/\/(.+?)?\.?wowhead\.com\/\?(item|quest|spell|achievement|npc|object|profile)=([^&#]+)/)
        } else {
            P = aa.href.match(/()\?(item|quest|spell|achievement|npc|object|profile)=([^&#]+)/)
        }
*/
        P = aa.href.match(/()\?(item|quest|spell|achievement|currency|currencies|npc|object|profile|pet-ability)=([^&#]+)/)
        if (P == null && aa.rel) {
            T = 0;
            S = 1;
            Q = 2;
            P = aa.rel.match(/(item|quest|spell|achievement|currency|currencies|npc|object|profile|pet-ability).?([^&#]+)/)
        }
        if (aa.rel) {
            aa.rel.replace(/([a-zA-Z]+)=?([a-zA-Z0-9:-]*)/g, O);
            if (U.gems && U.gems.length > 0) {
                var V;
                for (V = Math.min(3, U.gems.length - 1); V >= 0; --V) {
                    if (parseInt(U.gems[V])) {
                        break
                    }
                }++V;
                if (V == 0) {
                    delete U.gems
                } else {
                    if (V < U.gems.length) {
                        U.gems = U.gems.slice(0, V)
                    }
                }
            }
        }
        if (P) {
            var Z, R = "www";
            J = aa;
            if (U.domain) {
                R = U.domain
            } else {
                if (T && P[T]) {
                    R = P[T]
                }
            }
            Z = g_locale.id; //g_getLocaleFromDomain(R);
            if (aa.href.indexOf("#") != -1 && document.location.href.indexOf(P[S] + "=" + P[Q]) != -1) {
                return
            }
            g = (aa.parentNode.className.indexOf("icon") == 0 ? 1 : 0);
            if (!aa.onmouseout) {
                if (g == 0) {
                    aa.onmousemove = a
                }
                aa.onmouseout = L
            }
            n(W);
            var Y = g_getIdFromTypeName(P[S]),
                X = P[Q];
            if (Y == i && !g_dev) {
                Z = 0
            }
            w(Y, X, Z, U)
        }
    }

    function u(Q) {
        Q = $E(Q);
        var P = Q._target;
        var O = 0;
        while (P != null && O < 3 && M(P, Q) == -2323) {
            P = P.parentNode;
            ++O
        }
    }

    function a(O) {
        O = $E(O);
        n(O);
        Tooltip.move(B, z, 0, 0, o, x)
    }

    function L() {
        e = null;
        J = null;
        Tooltip.hide()
    }

    function I(O) {
        return (q.buff ? "buff_" : "tooltip_") + g_locales[O]
    }

    function k(P, R, Q) {
        if (!p[P])
            return;

        var O = p[P][0];
        if (O[R] == null) {
            O[R] = {}
        }
        if (O[R].status == null) {
            O[R].status = {}
        }
        if (O[R].status[Q] == null) {
            O[R].status[Q] = G
        }
    }

    function w(P, T, R, S) {
        if (!S) {
            S = {}
        }
        var Q = d(T, S);
        e = P;
        D = Q;
        H = R;
        q = S;
        k(P, Q, R);

        if (!p[P])
            return;

        var O = p[P][0];
        if (O[Q].status[R] == F || O[Q].status[R] == r) {
            N(O[Q][I(R)], O[Q].icon)
        } else {
            if (O[Q].status[R] == E) {
                N(LANG.tooltip_loading)
            } else {
                b(P, T, R, null, S)
            }
        }
    }

    function b(W, S, X, Q, T) {
        var O = d(S, T);
        var V = p[W][0];
        if (V[O].status[X] != G && V[O].status[X] != h) {
            return
        }
        V[O].status[X] = E;
        if (!Q) {
            V[O].timer = setTimeout(function () {
                    l.apply(this, [W, O, X])
                },
                333)
        }
        var R = "";
        for (var U in T) {
            if (U != "rand" && U != "ench" && U != "gems" && U != "sock") {
                continue
            }
            if (typeof T[U] == "object") {
                R += "&" + U + "=" + T[U].join(":")
            } else {
                if (U == "sock") {
                    R += "&sock"
                } else {
                    R += "&" + U + "=" + T[U]
                }
            }
        }
        /*
        var P = "";
        if (!g_dev) {
            if (e == i) {
                P += "http://profiler.wowhead.com"
            } else {
                P += "http://" + g_getDomainFromLocale(X) + ".wowhead.com"
            }
        }
        P += "?" + p[W][1] + "=" + S + "&power" + R;
        */
        var P = "ajax/ajax.php?" + p[W][1] + "=" + S + "&power" + R;
        g_ajaxIshRequest(P)
    }

    function N(R, S) {
        if (J._fixTooltip) {
            R = J._fixTooltip(R, e, D, J)
        }
        if (!R) {
            R = LANG["tooltip_" + g_types[e] + "notfound"];
            S = "inv_misc_questionmark"
        } else {
            if (q != null) {
                if (q.pcs && q.pcs.length) {
                    var T = 0;
                    for (var Q = 0, P = q.pcs.length; Q < P; ++Q) {
                        var O;
                        if (O = R.match(new RegExp("<span><!--si([0-9]+:)*" + q.pcs[Q] + "(:[0-9]+)*-->"))) {
                            R = R.replace(O[0], '<span class="q8"><!--si' + q.pcs[Q] + "-->");
                            ++T
                        }
                    }
                    if (T > 0) {
                        R = R.replace("(0/", "(" + T + "/");
                        R = R.replace(new RegExp("<span>\\(([0-" + T + "])\\)", "g"), '<span class="q2">($1)')
                    }
                }
                if (q.c) {
                    R = R.replace(/<span class="c([0-9]+?)">(.+?)<\/span><br \/>/g, '<span class="c$1" style="display: none">$2</span>');
                    R = R.replace(new RegExp('<span class="c(' + q.c + ')" style="display: none">(.+?)</span>', "g"), '<span class="c$1">$2</span><br />')
                }
                if (q.lvl) {
                    R = R.replace(/\(<!--r([0-9]+):([0-9]+):([0-9]+)-->([0-9.%]+)(.+?)([0-9]+)\)/g, function (X, Z, Y, W, U, ab, V) {
                        var aa = g_convertRatingToPercent(q.lvl, Y, W);
                        aa = (Math.round(aa * 100) / 100);
                        if (Y != 12 && Y != 37) {
                            aa += "%"
                        }
                        return "(<!--r" + q.lvl + ":" + Y + ":" + W + "-->" + aa + ab + q.lvl + ")"
                    })
                }
                if (q.who && q.when) {
                    R = R.replace("<table><tr><td><br />", '<table><tr><td><br /><span class="q2">' + sprintf(LANG.tooltip_achievementcomplete, q.who, q.when.getMonth() + 1, q.when.getDate(), q.when.getFullYear()) + "</span><br /><br />");
                    R = R.replace(/class="q0"/g, 'class="r3"')
                }
            }
        }
        if (g == 1) {
            Tooltip.setIcon(null);
            Tooltip.show(J, R)
        } else {
            Tooltip.setIcon(S);
            Tooltip.showAtXY(R, B, z, o, x)
        }
    }

    function l(P, R, Q) {
        if (e == P && D == R && H == Q) {
            N(LANG.tooltip_loading);
            var O = p[P][0];
            O[R].timer = setTimeout(function () {
                    A.apply(this, [P, R, Q])
                },
                3850)
        }
    }

    function A(P, R, Q) {
        var O = p[P][0];
        O[R].status[Q] = h;
        if (e == P && D == R && H == Q) {
            N(LANG.tooltip_noresponse)
        }
    }

    function d(P, O) {
        return P + (O.rand ? "r" + O.rand : "") + (O.ench ? "e" + O.ench : "") + (O.gems ? "g" + O.gems.join(",") : "") + (O.sock ? "s" : "")
    }
    this.register = function (Q, S, R, P) {
        var O = p[Q][0];
        k(Q, S, R);
        if (O[S].timer) {
            clearTimeout(O[S].timer);
            O[S].timer = null
        }
        cO(O[S], P);
        if (O[S].status[R] == E) {
            if (O[S][I(R)]) {
                O[S].status[R] = F
            } else {
                O[S].status[R] = r
            }
        }
        if (e == Q && S == D && H == R) {
            N(O[S][I(R)], O[S].icon)
        }
    };
    this.registerNpc = function (Q, P, O) {
        this.register(s, Q, P, O)
    };
    this.registerObject = function (Q, P, O) {
        this.register(j, Q, P, O)
    };
    this.registerItem = function (Q, P, O) {
        this.register(v, Q, P, O)
    };
    this.registerQuest = function (Q, P, O) {
        this.register(y, Q, P, O)
    };
    this.registerSpell = function (Q, P, O) {
        this.register(t, Q, P, O)
    };
    this.registerAchievement = function (Q, P, O) {
        this.register(m, Q, P, O)
    };
    this.registerCurrency = function (Q, P, O) {
        this.register(_n, Q, P, O)
    };
    this.registerProfile = function (Q, P, O) {
        this.register(i, Q, P, O)
    };
    this.registerPetAbility = function (id, locale, json) {
        this.register(200, id, locale, json)
    };
    this.request = function (O, S, Q, R) {
        if (!R) {
            R = {}
        }
        var P = d(S, R);
        k(O, P, Q);
        b(O, S, Q, 1, R)
    };
    this.requestItem = function (P, O) {
        this.request(v, P, g_locale.id, O)
    };
    this.requestSpell = function (O) {
        this.request(t, O, g_locale.id)
    };
    this.getStatus = function (P, R, Q) {
        var O = p[P][0];
        if (O[R] != null) {
            return O[R].status[Q]
        } else {
            return G
        }
    };
    this.getItemStatus = function (P, O) {
        this.getStatus(v, P, O)
    };
    this.getSpellStatus = function (P, O) {
        this.getStatus(t, P, O)
    };
    K()
};
var LiveSearch = new

function () {
    var currentTextbox, lastSearch = {},
        lastDiv, timer, prepared, container, cancelNext, hasData, summary, selection;

    function setText(textbox, txt) {
        textbox.value = txt;
        textbox.selectionStart = textbox.selectionEnd = txt.length
    }

    function colorDiv(div, fromOver) {
        if (lastDiv) {
            lastDiv.className = lastDiv.className.replace("live-search-selected", "")
        }
        lastDiv = div;
        lastDiv.className += " live-search-selected";
        selection = div.i;
        if (!fromOver) {
            show();
            setTimeout(setText.bind(0, currentTextbox, g_getTextContent(div.firstChild.firstChild.childNodes[1])), 1);
            cancelNext = 1
        }
    }

    function aOver() {
        colorDiv(this.parentNode.parentNode, 1)
    }

    function isVisible() {
        if (!container) {
            return false
        }
        return container.style.display != "none"
    }

    function adjust(fromResize) {
        if (fromResize == 1 && !isVisible()) {
            return
        }
        if (currentTextbox == null) {
            return
        }
        var c = ac(currentTextbox);
        container.style.left = (c[0] - 2) + "px";
        container.style.top = (c[1] + currentTextbox.offsetHeight + 1) + "px";
        container.style.width = currentTextbox.offsetWidth + "px"
    }

    function prepare() {
        if (prepared) {
            return
        }
        prepared = 1;
        container = ce("div");
        container.className = "live-search";
        container.style.display = "none";
        ae(ge("layers"), container);
        aE(window, "resize", adjust.bind(0, 1));
        aE(document, "click", hide)
    }

    function show() {
        if (container && !isVisible()) {
            adjust();
            container.style.display = ""
        }
    }

    function hide() {
        if (container) {
            container.style.display = "none"
        }
    }

    function boldify(match) {
        return "<b>" + match + "</b>"
    }

    function display(textbox, search, suggz, dataz) {
        prepare();
        show();
        lastA = null;
        hasData = 1;
        selection = null;
        while (container.firstChild) {
            de(container.firstChild)
        }
        if (!Browser.ie6) {
            ae(container, ce("em"));
            ae(container, ce("var"));
            ae(container, ce("strong"))
        }
        search = search.replace(/[^a-z0-9\-]/i, " ");
        search = trim(search.replace(/\s+/g, " "));
        var regex = g_createOrRegex(search);
        for (var i = 0, len = suggz.length; i < len; ++i) {
            var pos = suggz[i].lastIndexOf("(");
            if (pos != -1) {
                suggz[i] = suggz[i].substr(0, pos - 1)
            }
            var type = dataz[i][0],
                typeId = dataz[i][1],
                param1 = dataz[i][2],
                param2 = dataz[i][3],
                a = ce("a"),
                sp = ce("i"),
                sp2 = ce("span"),
                div = ce("div"),
                div2 = ce("div");
            div.i = i;
            a.onmouseover = aOver;
            if (textbox._summary) {
                a.href = "javascript:;";
                a.onmousedown = Summary.addGroupItem.bind(g_summaries[textbox._summary], textbox._type, typeId);
                a.onclick = rf;
                a.rel = "?" + g_types[type] + "=" + typeId
            } else {
                if (textbox._profileslots) {
                    a.href = "javascript:;";
                    a.onmousedown = $WowheadProfiler.equipItem.bind(null, typeId, textbox._profileslots);
                    a.onclick = rf;
                    a.rel = g_types[type] + "=" + typeId
                } else {
                    a.href = "?" + g_types[type] + "=" + typeId
                }
            }
            if (textbox._append) {
                a.rel += textbox._append
            }
            if (type == 3 && param2 != null) {
                a.className += " q" + param2
            }
            if ((type == 3 || type == 6 || type == 9 || type == 10 || type == 12 || type == 17 || type == 200) && param1) {
                div.className += " live-search-icon";
                div.style.backgroundImage = "url(http://mop-static.tauri.hu/images/icons/small/" + param1.toLowerCase() + ".png)"
            } else {
                if (type == 5 && param1 >= 1 && param1 <= 2) {
                    div.className += " live-search-icon-quest-" + (param1 == 1 ? "alliance" : "horde")
                }
            }
            if (!textbox._summary && !textbox._profileslots) {
                ae(sp, ct(LANG.types[type][0]))
            }
            ae(a, sp);
            var buffer = suggz[i];
            buffer = buffer.replace(regex, boldify);
            sp2.innerHTML = buffer;
            ae(a, sp2);
            if (type == 6 && param2) {
                ae(a, ct(" (" + param2 + ")"))
            }
            ae(div2, a);
            ae(div, div2);
            ae(container, div)
        }
    }

    function receive(xhr, opt) {
        var text = xhr.responseText;
        if (text.charAt(0) != "[" || text.charAt(text.length - 1) != "]") {
            return
        }
        var a = eval(text);
        var search = a[0];
        if (search == opt.search) {
            if ((opt.textbox._summary || opt.textbox._profileslots) && a.length == 9) {
                for (var i = 0, len = a[8].length; i < len; ++i) {
                    if (opt.textbox._summary && in_array(g_summaries[opt.textbox._summary].data, a[8][i].id, function (x) {
                        return x.id
                    }) == -1) {
                        g_summaries[opt.textbox._summary].data.push(a[8][i]);
                        g_items.add(a[8][i].id, {
                            icon: a[8][i].icon
                        })
                    } else {
                        if (opt.textbox._profileslots) {
                            var _ = {};
                            _["name_" + g_locale.name] = a[8][i].name.substring(1);
                            cO(_, {
                                quality: parseInt(a[8][i].quality),
                                icon: a[8][i].icon,
                                displayid: a[8][i].displayid,
                                jsonequip: {},
                                itemset: 0
                            });
                            cO(_.jsonequip, a[8][i]);
                            g_items.add(a[8][i].id, _)
                        }
                    }
                }
                a.splice(8, 1)
            }
            if (a.length == 8) {
                display(opt.textbox, search, a[1], a[7])
            } else {
                hide()
            }
        }
    }

    function fetch(textbox, search) {
        //var url = "?search=" + urlencode(search) + "&opensearch";
        var url = "ajax/opensearch.php?search=" + urlencode(search);
        if (textbox._type) {
            url += "&type=" + textbox._type
        }
        if (textbox._profileslots) {
            url += "&slots=" + textbox._profileslots.join(":")
        }
        new Ajax(url, {
            onSuccess: receive,
            textbox: textbox,
            search: search
        })
    }

    function preFetch(textbox, search) {
        if (cancelNext) {
            cancelNext = 0;
            return
        }
        hasData = 0;
        if (timer > 0) {
            clearTimeout(timer);
            timer = 0
        }
        timer = setTimeout(fetch.bind(0, textbox, search), 333)
    }

    function cycle(dir) {
        if (!isVisible()) {
            if (hasData) {
                show()
            }
            return
        }
        var firstNode = (container.childNodes[0].nodeName == "EM" ? container.childNodes[3] : container.firstChild);
        var bakDiv = dir ? firstNode : container.lastChild;
        if (lastDiv == null) {
            colorDiv(bakDiv)
        } else {
            var div = dir ? lastDiv.nextSibling : lastDiv.previousSibling;
            if (div) {
                if (div.nodeName == "STRONG") {
                    div = container.lastChild
                }
                colorDiv(div)
            } else {
                colorDiv(bakDiv)
            }
        }
    }

    function onKeyUp(e) {
        e = $E(e);
        var textbox = e._target;
        switch (e.keyCode) {
        case 48:
        case 96:
        case 107:
        case 109:
            if (Browser.gecko && e.ctrlKey) {
                adjust(textbox);
                break
            }
            break;
        case 13:
            if ((textbox._summary || textbox._profileslots) && hasData && isVisible()) {
                var div = container.childNodes[(Browser.ie6 ? 0 : 3) + (selection | 0)];
                div.firstChild.firstChild.onmousedown();
                hide();
                if (textbox._summary) {
                    g_summaries.compare.toggleOptions()
                }
                return
            }
            break
        }
        var search = trim(textbox.value.replace(/\s+/g, " "));
        if (search == lastSearch[textbox.id]) {
            return
        }
        lastSearch[textbox.id] = search;
        if (search.length) {
            preFetch(textbox, search)
        } else {
            hide()
        }
    }

    function onKeyDown(e) {
        e = $E(e);
        var textbox = e._target;
        switch (e.keyCode) {
        case 27:
            hide();
            break;
        case 38:
            cycle(0);
            break;
        case 40:
            cycle(1);
            break
        }
    }

    function onFocus(e) {
        e = $E(e);
        var textbox = e._target;
        if (textbox != document) {
            currentTextbox = textbox
        }
    }
    this.attach = function (textbox) {
        if (textbox.getAttribute("autocomplete") == "off") {
            return
        }
        textbox.setAttribute("autocomplete", "off");
        aE(textbox, "focus", onFocus);
        aE(textbox, "keyup", onKeyUp);
        aE(textbox, Browser.opera ? "keypress" : "keydown", onKeyDown)
    };
    this.reset = function (textbox) {
        lastSearch[textbox.id] = null;
        textbox.value = "";
        hasData = 0;
        hide()
    };
    this.hide = function () {
        hide()
    }
};
var Lightbox = new

function () {
    var d, m, n, h = {},
        c = {},
        i, f;

    function o() {
        aE(d, "click", e);
        aE(m, "click", e);
        aE(document, Browser.opera ? "keypress" : "keydown", g);
        aE(window, "resize", a);
        if (Browser.ie6) {
            aE(window, "scroll", j)
        }
    }

    function l() {
        dE(d, "click", e);
        dE(document, Browser.opera ? "keypress" : "keydown", g);
        dE(window, "resize", a);
        if (Browser.ie6) {
            dE(window, "scroll", j)
        }
    }

    function b() {
        if (i) {
            return
        }
        i = 1;
        var p = ge("layers");
        d = ce("div");
        d.className = "lightbox-overlay";
        m = ce("div");
        m.className = "lightbox-outer";
        n = ce("div");
        n.className = "lightbox-inner";
        d.style.display = m.style.display = "none";
        ae(p, d);
        ae(m, n);
        ae(p, m)
    }

    function g(p) {
        p = $E(p);
        switch (p.keyCode) {
        case 27:
            e();
            break
        }
    }

    function a(p) {
        if (p != 1234) {
            if (c.onResize) {
                c.onResize()
            }
        }
        d.style.height = document.body.offsetHeight + "px";
        if (Browser.ie6) {
            j()
        }
    }

    function j() {
        var q = g_getScroll().y,
            p = g_getWindowSize().h;
        m.style.top = (q + p / 2) + "px"
    }

    function e() {
        l();
        if (c.onHide) {
            c.onHide()
        }
        d.style.display = m.style.display = "none";
        g_enableScroll(true)
    }

    function k() {
        d.style.display = m.style.display = h[f].style.display = ""
    }
    this.setSize = function (p, q) {
        /*n.style.visibility = "hidden";
        n.style.width = p + "px";
        n.style.height = q + "px";
        n.style.left = -parseInt(p / 2) + "px";
        n.style.top = -parseInt(q / 2) + "px";
        n.style.visibility = "visible"*/
    };
    this.show = function (t, s, p) {
        c = s || {};
        //Ads.hideAll();
        b();
        o();
        if (f != t && h[f] != null) {
            h[f].style.display = "none"
        }
        f = t;
        var r = 0,
            q;
        if (h[t] == null) {
            r = 1;
            q = ce("div", {
                className: "lightbox-frame"
            });
            ae(n, q);
            h[t] = q
        } else {
            q = h[t]
        }
        if (c.onShow) {
            c.onShow(q, r, p)
        }
        a(1234);
        k();
        g_enableScroll(false)
    };
    this.reveal = function () {
        k()
    };
    this.hide = function () {
        e()
    };
    this.isVisible = function () {
        return (d && d.style.display != "none")
    }
};
var ModelViewer = new

function () {
    var d, x, z = [],
        h,
        u,
        n,
        w,
        g,
        p,
        q,
        e,
        m,
        s,
        l,
        o = [{
            id: 10,
            name: g_chr_races[10],
            model: "bloodelf"
        }, {
            id: 11,
            name: g_chr_races[11],
            model: "draenei"
        }, {
            id: 3,
            name: g_chr_races[3],
            model: "dwarf"
        }, {
            id: 7,
            name: g_chr_races[7],
            model: "gnome"
        }, {
            id: 1,
            name: g_chr_races[1],
            model: "human"
        }, {
            id: 4,
            name: g_chr_races[4],
            model: "nightelf"
        }, {
            id: 2,
            name: g_chr_races[2],
            model: "orc"
        }, {
            id: 6,
            name: g_chr_races[6],
            model: "tauren"
        }, {
            id: 8,
            name: g_chr_races[8],
            model: "troll"
        }, {
            id: 5,
            name: g_chr_races[5],
            model: "scourge"
        }],
        i = [{
            id: 1,
            name: LANG.female,
            model: "female"
        }, {
            id: 0,
            name: LANG.male,
            model: "male"
        }];

    function v() {
        u.style.display = "none";
        n.style.display = "none";
        w.style.display = "none"
    }

    function a() {
        var A, B;
        if (p.style.display == "") {
            A = (p.selectedIndex >= 0 ? p.options[p.selectedIndex].value : "")
        } else {
            A = (q.selectedIndex >= 0 ? q.options[q.selectedIndex].value : "")
        }
        B = (e.selectedIndex >= 0 ? e.options[e.selectedIndex].value : 0);
        return {
            r: A,
            s: B
        }
    }

    function c(A, B) {
        return (!isNaN(A) && A > 0 && in_array(o, A, function (C) {
            return C.id
        }) != -1 && !isNaN(B) && B >= 0 && B <= 1)
    }

    function t() {
        if (s == 2 && !f()) {
            s = 0
        }
        if (s == 2) {
            var D = '<object id="3dviewer-plugin" type="application/x-zam-wowmodel" width="600" height="400"><param name="model" value="' + d + '" /><param name="modelType" value="' + x + '" /><param name="contentPath" value="http://static.wowhead.com/modelviewer/" />';
            if (x == 16 && z.length) {
                D += '<param name="equipList" value="' + z.join(",") + '" />'
            }
            D += '<param name="bgColor" value="#181818" /></object>';
            w.innerHTML = D;
            w.style.display = ""
        } else {
            if (s == 1) {
                var D = '<applet id="3dviewer-java" code="org.jdesktop.applet.util.JNLPAppletLauncher" width="600" height="400" archive="http://static.wowhead.com/modelviewer/applet-launcher.jar,http://download.java.net/media/jogl/builds/archive/jsr-231-webstart-current/jogl.jar,http://download.java.net/media/gluegen/webstart/gluegen-rt.jar,http://download.java.net/media/java3d/webstart/release/vecmath/latest/vecmath.jar,http://static.wowhead.com/modelviewer/ModelView510.jar"><param name="jnlp_href" value="http://static.wowhead.com/modelviewer/ModelView.jnlp"><param name="codebase_lookup" value="false"><param name="cache_option" value="no"><param name="subapplet.classname" value="modelview.ModelViewerApplet"><param name="subapplet.displayname" value="Model Viewer Applet"><param name="progressbar" value="true"><param name="jnlpNumExtensions" value="1"><param name="jnlpExtension1" value="http://download.java.net/media/jogl/builds/archive/jsr-231-webstart-current/jogl.jnlp"><param name="contentPath" value="http://static.wowhead.com/modelviewer/"><param name="model" value="' + d + '"><param name="modelType" value="' + x + '">';
                if (x == 16 && z.length) {
                    D += '<param name="equipList" value="' + z.join(",") + '">'
                }
                D += '<param name="bgColor" value="#181818"></applet>';
                n.innerHTML = D;
                n.style.display = ""
            } else {
                var G = {
                    model: d,
                    modelType: x,
                    contentPath: "http://static.wowhead.com/modelviewer/",
                    blur: (OS.mac ? "0" : "1")
                };
                var F = {
                    quality: "high",
                    allowscriptaccess: "always",
                    menu: false,
                    bgcolor: "#181818"
                };
                var A = {};
                if (x == 16 && z.length) {
                    G.equipList = z.join(",")
                }
                swfobject.embedSWF("http://static.wowhead.com/modelviewer/ModelView.swf", "dsjkgbdsg2346", "600", "400", "10.0.0", "http://static.wowhead.com/modelviewer/expressInstall.swf", G, F, A);
                u.style.display = ""
            }
        }
        var H = a(),
            C = H.r,
            E = H.s;
        if (!h.noPound) {
            var B = "#modelviewer";
            if (C && E) {
                B += ":" + C + "+" + E
            } else {
                B += ":"
            }
            if (h.extraPound != null) {
                B += ":" + h.extraPound
            }
            location.replace(rtrim(B, ":"))
        }
    }

    function b() {
        var E = a(),
            B = E.r,
            C = E.s;
        if (!B) {
            if (e.style.display == "none") {
                return
            }
            e.style.display = "none";
            d = z[1];
            switch (h.slot) {
            case 1:
                x = 2;
                break;
            case 3:
                x = 4;
                break;
            default:
                x = 1
            }
        } else {
            if (e.style.display == "none") {
                e.style.display = ""
            }
            if (q.style.display == "") {
                sc("modelviewer_model_race", 7, B, "/", ".wowhead.com");
                sc("modelviewer_model_sex", 7, C, "/", ".wowhead.com")
            }
            var E = function (F) {
                return F.id
            };
            var D = in_array(o, B, E);
            var A = in_array(i, C, E);
            if (D != -1 && A != -1) {
                d = o[D].model + i[A].model;
                x = 16
            }
        }
        v();
        t()
    }

    function j(A) {
        if (A == s) {
            return
        }
        g_setSelectedLink(this, "modelviewer-mode");
        v();
        if (s == null) {
            s = A;
            setTimeout(t, 50)
        } else {
            s = A;
            sc("modelviewer_mode", 7, A, "/", ".wowhead.com");
            t()
        }
    }

    function r(F, A) {
        var H = -1,
            I = -1,
            B, E;
        if (A.race != null && A.sex != null) {
            H = A.race;
            I = A.sex;
            g.style.display = "none";
            F = 0
        } else {
            g.style.display = ""
        }
        if (H == -1 && I == -1) {
            if (location.hash) {
                var G = location.hash.match(/modelviewer:([0-9]+)\+([0-9]+)/);
                if (G != null) {
                    if (c(G[1], G[2])) {
                        H = G[1];
                        I = G[2];
                        e.style.display = ""
                    }
                }
            }
        }
        if (F) {
            B = p;
            E = 1;
            p.style.display = "";
            p.selectedIndex = -1;
            q.style.display = "none";
            if (I == -1) {
                e.style.display = "none"
            }
        } else {
            if (H == -1 && I == -1) {
                var L = parseInt(gc("modelviewer_model_race")),
                    D = parseInt(gc("modelviewer_model_sex"));
                if (c(L, D)) {
                    H = L;
                    I = D
                } else {
                    H = 10;
                    I = 1
                }
            }
            B = q;
            E = 0;
            p.style.display = "none";
            q.style.display = "";
            e.style.display = ""
        }
        if (I != -1) {
            e.selectedIndex = I
        }
        if (H != -1 && I != -1) {
            var K = function (M) {
                return M.id
            };
            var J = in_array(o, H, K);
            var C = in_array(i, I, K);
            if (J != -1 && C != -1) {
                d = o[J].model + i[C].model;
                x = 16;
                J += E;
                if (Browser.opera) {
                    setTimeout(function () {
                            B.selectedIndex = J
                        },
                        1)
                } else {
                    B.selectedIndex = J
                }
                e.selectedIndex = C
            }
        }
    }

    function f() {
        var B = navigator.mimeTypes["application/x-zam-wowmodel"];
        if (B) {
            var A = B.enabledPlugin;
            if (A) {
                return true
            }
        }
        return false
    }

    function k() {
        if (!h.noPound) {
            if (m && m.indexOf("modelviewer") == -1) {
                location.replace(m)
            } else {
                location.replace("#.")
            }
        }
        if (h.onHide) {
            h.onHide()
        }
    }

    function y(M, H, E) {
        var D, B;
        Lightbox.setSize(620, 452);
        if (H) {
            M.className = "modelviewer";
            var L = ce("div");
            u = ce("div");
            n = ce("div");
            w = ce("div");
            var K = ce("div");
            K.id = "dsjkgbdsg2346";
            ae(u, K);
            L.className = "modelviewer-screen";
            u.style.display = n.style.display = w.style.display = "none";
            ae(L, u);
            ae(L, n);
            ae(L, w);
            ae(M, L);
            D = ce("a"),
            B = ce("a");
            D.className = "modelviewer-help";
            D.href = "?help=modelviewer";
            D.target = "_blank";
            ae(D, ce("span"));
            B.className = "modelviewer-close";
            B.href = "javascript:;";
            B.onclick = Lightbox.hide;
            ae(B, ce("span"));
            ae(M, B);
            ae(M, D);
            var J = ce("div"),
                C = ce("span"),
                D = ce("a"),
                B = ce("a");
            J.className = "modelviewer-quality";
            D.href = B.href = "javascript:;";
            ae(D, ct("Flash"));
            ae(B, ct("Java"));
            D.onclick = j.bind(D, 0);
            B.onclick = j.bind(B, 1);
            ae(C, D);
            ae(C, ct(" " + String.fromCharCode(160)));
            ae(C, B);
            if (f()) {
                var A = ce("a");
                A.href = "javascript:;";
                ae(A, ct("Plugin"));
                A.onclick = j.bind(A, 2);
                ae(C, ct(" " + String.fromCharCode(160)));
                ae(C, A)
            }
            ae(J, ce("div"));
            ae(J, C);
            ae(M, J);
            g = ce("div");
            g.className = "modelviewer-model";
            var K = function (O, N) {
                return strcmp(O.name, N.name)
            };
            o.sort(K);
            i.sort(K);
            p = ce("select");
            q = ce("select");
            e = ce("select");
            p.onchange = q.onchange = e.onchange = b;
            ae(p, ce("option"));
            for (var G = 0, I = o.length; G < I; ++G) {
                var F = ce("option");
                F.value = o[G].id;
                ae(F, ct(o[G].name));
                ae(p, F)
            }
            for (var G = 0, I = o.length; G < I; ++G) {
                var F = ce("option");
                F.value = o[G].id;
                ae(F, ct(o[G].name));
                ae(q, F)
            }
            for (var G = 0, I = i.length; G < I; ++G) {
                var F = ce("option");
                F.value = i[G].id;
                ae(F, ct(i[G].name));
                ae(e, F)
            }
            e.style.display = "none";
            ae(g, ce("div"));
            ae(g, p);
            ae(g, q);
            ae(g, e);
            ae(M, g);
            J = ce("div");
            J.className = "clear";
            ae(M, J)
        }
        switch (E.type) {
        case 1:
            g.style.display = "none";
            if (E.humanoid) {
                x = 32
            } else {
                x = 8
            }
            d = E.displayId;
            break;
        case 2:
            g.style.display = "none";
            x = 64;
            d = E.displayId;
            break;
        case 3:
            z = [E.slot, E.displayId];
            if (in_array([4, 5, 6, 7, 8, 9, 10, 16, 19, 20], E.slot) != -1) {
                r(0, E)
            } else {
                switch (E.slot) {
                case 1:
                    x = 2;
                    break;
                case 3:
                    x = 4;
                    break;
                default:
                    x = 1
                }
                d = E.displayId;
                r(1, E)
            }
            break;
        case 4:
            z = E.equipList;
            r(0, E)
        }
        if (H) {
            if (gc("modelviewer_mode") == "2" && f()) {
                A.onclick()
            } else {
                if (gc("modelviewer_mode") == "1") {
                    B.onclick()
                } else {
                    D.onclick()
                }
            }
        } else {
            v();
            setTimeout(t, 1)
        }
        m = location.hash
    }
    this.checkPound = function () {
        if (location.hash && location.hash.indexOf("#modelviewer") == 0) {
            if (l != null) {
                var A = location.hash.split(":");
                if (A.length == 3 && A[2]) {
                    l(A[2])
                }
            } else {
                var B = ge("dsgndslgn464d");
                if (B) {
                    B.onclick()
                }
            }
        }
    };
    this.addExtraPound = function (A) {
        l = A
    };
    this.show = function (A) {
        h = A;
        Lightbox.show("modelviewer", {
                onShow: y,
                onHide: k
            },
            A)
    };
    DomContentLoaded.addEvent(this.checkPound)
};
var g_screenshots = {};
var ScreenshotViewer = new

function () {
    var z, k, e, y, B, c, o, q = 0,
        u, b, n, i, w, x, t, h, v, j;

    function g(C) {
        var F = z[k];
        var D = Math.max(50, Math.min(618, g_getWindowSize().h - 72 - C));
        if (q != 1 || F.id || F.resize) {
            c = Math.min(772 / F.width, 618 / F.height);
            B = Math.min(772 / F.width, D / F.height)
        } else {
            c = B = 1
        }
        if (c > 1) {
            c = 1
        }
        if (B > 1) {
            B = 1
        }
        e = Math.round(B * F.width);
        y = Math.round(B * F.height);
        var E = Math.max(480, e);
        Lightbox.setSize(E + 20, y + 52 + C);
        if (Browser.ie6) {
            n.style.width = E + "px";
            if (z.length > 1) {
                w.style.height = x.style.height = y + "px"
            } else {
                t.style.height = y + "px"
            }
        }
        if (C) {
            i.firstChild.width = e;
            i.firstChild.height = y
        }
    }

    function d(E) {
        var D = z[E],
            C = "#screenshots:";
        if (q == 0) {
            C += "id=" + D.id
        } else {
            C += u + ":" + (E + 1)
        }
        return C
    }

    function s(F) {
        if (F && (B == c) && g_getWindowSize().h > b.offsetHeight) {
            return
        }
        b.style.visibility = "hidden";
        var C = z[k],
            I = (C.width > 772 || C.height > 618);
        g(0);
        var E = (C.url ? C.url : "http://static.wowhead.com/uploads/screenshots/" + (I ? "resized/" : "normal/") + C.id + ".png");
        var J = '<img src="' + E + '" width="' + e + '" height="' + y + '"';
        if (Browser.ie6) {
            J += ' galleryimg="no"'
        }
        J += ">";
        i.innerHTML = J;
        if (!F) {
            if (C.url) {
                h.href = E
            } else {
                h.href = "http://static.wowhead.com/uploads/screenshots/normal/" + C.id + ".png"
            }
            if (!C.user && typeof g_pageInfo == "object") {
                C.user = g_pageInfo.username
            }
            var L = (C.date && C.user),
                K = (z.length > 1);
            if (L) {
                var H = new Date(C.date),
                    N = (g_serverTime - H) / 1000;
                var M = v.firstChild.childNodes[1];
                M.href = "?user=" + C.user;
                M.innerHTML = C.user;
                var P = v.firstChild.childNodes[3];
                while (P.firstChild) {
                    de(P.firstChild)
                }
                Listview.funcBox.coFormatDate(P, N, H);
                v.firstChild.style.display = ""
            } else {
                v.firstChild.style.display = "none"
            }
            var P = v.childNodes[1];
            if (K) {
                var O = "";
                if (L) {
                    O += LANG.dash
                }
                O += (k + 1) + LANG.lvpage_of + z.length;
                P.innerHTML = O;
                P.style.display = ""
            } else {
                P.style.display = "none"
            }
            v.style.display = (L || K ? "" : "none");
            if (g_getLocale(true) != 0 && C.caption) {
                C.caption = ""
            }
            var D = (C.caption != null && C.caption.length);
            var G = (C.subject != null && C.subject.length && C.type && C.typeId);
            if (D || G) {
                var J = "";
                if (G) {
                    J += LANG.types[C.type][0] + LANG.colon;
                    J += '<a href="?' + g_types[C.type] + "=" + C.typeId + '">';
                    J += C.subject;
                    J += "</a>"
                }
                if (D) {
                    if (G) {
                        J += LANG.dash
                    }
                    J += C.caption
                }
                j.innerHTML = J;
                j.style.display = ""
            } else {
                j.style.display = "none"
            }
            if (z.length > 1) {
                w.href = d(r(-1));
                x.href = d(r(1));
                w.style.display = x.style.display = "";
                t.style.display = "none"
            } else {
                w.style.display = x.style.display = "none";
                t.style.display = ""
            }
            location.replace(d(k))
        }
        Lightbox.reveal();
        if (j.offsetHeight > 18) {
            g(j.offsetHeight - 18)
        }
        b.style.visibility = "visible"
    }

    function r(C) {
        var D = k;
        D += C;
        if (D < 0) {
            D = z.length - 1
        } else {
            if (D >= z.length) {
                D = 0
            }
        }
        return D
    }

    function a() {
        k = r(-1);
        s();
        return false
    }

    function p() {
        k = r(1);
        s();
        return false
    }

    function m(C) {
        C = $E(C);
        switch (C.keyCode) {
        case 37:
            a();
            break;
        case 39:
            p();
            break
        }
    }

    function f() {
        s(1)
    }

    function l() {
        if (z.length > 1) {
            dE(document, "keyup", m)
        }
        if (o && q == 0) {
            if (o.indexOf(":id=") != -1) {
                o = "#screenshots"
            }
            location.replace(o)
        } else {
            location.replace("#.")
        }
    }

    function A(C, G, D) {
        if (typeof D.screenshots == "string") {
            z = g_screenshots[D.screenshots];
            q = 1;
            u = D.screenshots
        } else {
            z = D.screenshots;
            q = 0;
            u = null
        }
        b = C;
        k = 0;
        if (D.pos && D.pos >= 0 && D.pos < z.length) {
            k = D.pos
        }
        if (G) {
            C.className = "screenshotviewer";
            n = ce("div");
            n.className = "screenshotviewer-screen";
            w = ce("a");
            x = ce("a");
            w.className = "screenshotviewer-prev";
            x.className = "screenshotviewer-next";
            w.href = "javascript:;";
            x.href = "javascript:;";
            var I = ce("span");
            ae(I, ce("b"));
            ae(w, I);
            var I = ce("span");
            ae(I, ce("b"));
            ae(x, I);
            w.onclick = a;
            x.onclick = p;
            t = ce("a");
            t.className = "screenshotviewer-cover";
            t.href = "javascript:;";
            t.onclick = Lightbox.hide;
            var I = ce("span");
            ae(I, ce("b"));
            ae(t, I);
            if (Browser.ie6) {
                ns(w);
                ns(x);
                w.onmouseover = x.onmouseover = t.onmouseover = function () {
                    this.firstChild.style.display = "block"
                };
                w.onmouseout = x.onmouseout = t.onmouseout = function () {
                    this.firstChild.style.display = ""
                }
            }
            ae(n, w);
            ae(n, x);
            ae(n, t);
            i = ce("div");
            ae(n, i);
            ae(C, n);
            var H = ce("a");
            H.className = "screenshotviewer-close";
            H.href = "javascript:;";
            H.onclick = Lightbox.hide;
            ae(H, ce("span"));
            ae(C, H);
            h = ce("a");
            h.className = "screenshotviewer-original";
            h.href = "javascript:;";
            h.target = "_blank";
            ae(h, ce("span"));
            ae(C, h);
            v = ce("div");
            v.className = "screenshotviewer-from";
            var E = ce("span");
            ae(E, ct(LANG.lvscreenshot_from));
            ae(E, ce("a"));
            ae(E, ct(" "));
            ae(E, ce("span"));
            ae(v, E);
            ae(v, ce("span"));
            ae(C, v);
            j = ce("div");
            j.className = "screenshotviewer-caption";
            ae(C, j);
            var F = ce("div");
            F.className = "clear";
            ae(C, F)
        }
        o = location.hash;
        if (z.length > 1) {
            aE(document, "keyup", m)
        }
        s()
    }
    this.checkPound = function () {
        if (location.hash && location.hash.indexOf("#screenshots") == 0) {
            if (!g_listviews.screenshots) {
                var D = location.hash.split(":");
                if (D.length == 3) {
                    var E = g_screenshots[D[1]],
                        C = parseInt(D[2]);
                    if (E && C >= 1 && C <= E.length) {
                        ScreenshotViewer.show({
                            screenshots: D[1],
                            pos: C - 1
                        })
                    }
                }
            }
        }
    };
    this.show = function (C) {
        Lightbox.show("screenshotviewer", {
                onShow: A,
                onHide: l,
                onResize: f
            },
            C)
    };
    DomContentLoaded.addEvent(this.checkPound)
};

function g_getHash() {
    return "#" + decodeURIComponent(location.href.split("#")[1] || "")
}


var MENU_IDX_ID = 0;
var MENU_IDX_NAME = 1;
var MENU_IDX_URL = 2;
var MENU_IDX_SUB = 3;
var MENU_IDX_OPT = 4;
var Menu_ = new function () {
    var aq = this;
    var T = null;
    var Q = [];
    var V = null;
    var aC = null;
    var ao = null;
    aq.getMenu = function () {
        return mn_path
    };
    aq.addTouch = function (aK, aL, aJ) {
        if (!aJ) {
            aJ = $.noop
        }
        var aI = $(aK);
        aI.data("menu", aL);
        aI.click(ai)
    };

    function ai() {
        var aI = $(this);
        if (aI.hasClass("active") || aI.hasClass("touch-menu-active")) {
            az.call(this)
        } else {
            Y.call(this)
        }
        return false
    }
    aq.add = function (aK, aL, aJ) {
        if (!aJ) {
            aJ = $.noop
        }
        var aI = $(aK);
        aI.data("menu", aL);
        if (Platform.isTouch()) {
            aI.click(ai);
            return
        }
        if (aJ.showAtCursor) {
            if (aJ.leftAndRightClick) {
                aK.oncontextmenu = rf;
                aI.click(function (aM) {
                    if (aM.which != 2) {
                        M.call(this, aM);
                        return false
                    }
                }).mouseup(function (aM) {
                    O.call(this, M, aM)
                })
            } else {
                if (aJ.rightClick) {
                    aK.oncontextmenu = rf;
                    aI.mouseup(function (aM) {
                        O.call(this, M, aM)
                    })
                } else {
                    aI.click(M)
                }
            }
        } else {
            if (aJ.showAtElement) {
                if (aJ.leftAndRightClick) {
                    aK.oncontextmenu = rf;
                    aI.click(function (aM) {
                        if (aM.which != 2) {
                            al.call(this, aM);
                            return false
                        }
                    }).mouseup(function (aM) {
                        O.call(this, al, aM)
                    }).mouseleave(e)
                } else {
                    if (aJ.rightClick) {
                        aK.oncontextmenu = rf;
                        aI.mouseup(function (aM) {
                            O.call(this, al, aM)
                        }).mouseleave(e)
                    } else {
                        aI.click(al).mouseleave(e)
                    }
                }
            } else {
                aI.mouseover(al).mouseout(e)
            }
        }
    };
    aq.remove = function (aI) {
        $(aI).data("menu", null).unbind("click", M).unbind("mouseover", al).unbind("mouseout", e)
    };
    aq.show = function (aK, aJ) {
        var aI = $(aJ);
        m(aK, aI)
    };
    aq.showAtCursor = function (aJ, aI) {
        ap(aJ, aI.pageX, aI.pageY)
    };
    aq.showAtXY = function (aJ, aI, aK) {
        ap(aJ, aI, aK)
    };
    aq.hide = function (aI) {
        if (Platform.isTouch()) {
            ac();
            return
        }
        e(null, aI)
    };
    aq.addButtons = function (aI, aK) {
        var aL = $(aI);
        if (!aL.length) {
            return
        }
        var aJ = $('<span class="menu-buttons"></span>');
        $.each(aK, function (aM, aO) {
            if (aA(aO)) {
                return
            }
            var aP = $("<a></a>");
            var aN = $("<span></span>", {
                text: aO[MENU_IDX_NAME]
            }).appendTo(aP);
            aq.linkifyItem(aO, aP);
            aP.data("menuItem", aO);
            if (D(aO)) {
                aN.addClass("hassubmenu");
                if (Platform.isTouch()) {
                    aq.addTouch(aP.get(0), aO[MENU_IDX_SUB])
                } else {
                    aq.add(aP, aO[MENU_IDX_SUB])
                }
            }
            aJ.append(aP)
        });
        aL.append(aJ)
    };
    aq.linkifyItem = function (aI, aL) {
        var aK = aq.getItemOpt(aI);
        if (!aI[MENU_IDX_URL]) {
            aL.attr("href", "javascript:;");
            aL.addClass("unlinked");
            return
        }
        if (typeof aI[MENU_IDX_URL] == "function") {
            aL.attr("href", "javascript:;");
            aL.click(ae);
            aL.click(aI[MENU_IDX_URL])
        } else {
            var aJ = aq.getItemUrl(aI);
            aL.attr("href", aJ);
            if (aK.newWindow || g_isExternalUrl(aJ)) {
                aL.attr("target", "_blank")
            }
            if (aK.rel) {
                aL.attr("rel", aK.rel)
            }
        }
        if (typeof aI[MENU_IDX_OPT] == "object" && aI[MENU_IDX_OPT].className) {
            aL.addClass(aI[MENU_IDX_OPT].className)
        }
    };
    aq.updateItem = function (aJ) {
        var aL = aJ.$a;
        if (!aL) {
            return
        }
        var aK = aq.getItemOpt(aJ);
        aL.removeClass("checked tinyicon icon");
        aL.css("background-image", "");
        if (aJ.checked) {
            aL.addClass("checked")
        } else {
            if (aK.tinyIcon) {
                aL.addClass("tinyicon");
                aL.css("background-image", "url(" + (aK.tinyIcon.indexOf("/") != -1 ? aK.tinyIcon : g_staticUrl + "/images/icons/tiny/" + aK.tinyIcon.toLowerCase() + ".png") + ")")
            } else {
                if (aK.icon) {
                    aL.addClass("icon");
                    aL.css("background-image", "url(" + aK.icon + ")")
                } else {
                    if (aK.socketColor && g_file_gems[aK.socketColor]) {
                        aL.addClass("socket-" + g_file_gems[aK.socketColor])
                    }
                }
            }
        }
        if (aK.np) {
            aL.attr("rel", "np")
        }
        var aI = (aK["class"] || aK.className);
        if (aI) {
            aL.addClass(aI)
        }
    };
    aq.hasMenu = function (aJ) {
        var aI = $(aJ);
        return aI.data("menu") != null
    };
    aq.modifyUrl = function (aI, aL, aK) {
        var aJ = {
            params: aL,
            opt: aK
        };
        A(aI, function (aM) {
            aM.modifyUrl = aJ
        });
        PageTemplate.updateBreadcrumb()
    };
    aq.fixUrls = function (aK, aI, aJ) {
        aJ = aJ || {};
        aJ.hash = (aJ.hash ? "#" + aJ.hash : "");
        c(aK, aI, aJ, 0)
    };
    aq.sort = function (aI) {
        if (J(aI)) {
            aa(aI)
        } else {
            z(aI)
        }
    };
    aq.sortSubmenus = function (aJ, aI) {
        $.each(aI, function (aK, aM) {
            var aL = aq.findItem(aJ, aM);
            if (aL && aL[MENU_IDX_SUB]) {
                aq.sort(aL[MENU_IDX_SUB])
            }
        })
    };
    aq.implode = function (aL, aI) {
        if (!aI) {
            aI = $.noop
        }
        var aK = [];
        var aJ;
        if (aI.createHeadinglessGroup) {
            aJ = [];
            aK.push([0, "", null, aJ])
        }
        $.each(aL, function (aM, aN) {
            if (aA(aN)) {
                aJ = [];
                aK.push([0, aN[MENU_IDX_NAME], null, aJ])
            } else {
                if (aJ) {
                    aJ.push(aN)
                } else {
                    aK.push(aN)
                }
            }
        });
        return aK
    };
    aq.findItem = function (aJ, aI) {
        return aq.getFullPath(aJ, aI).pop()
    };
    aq.getFullPath = function (aM, aL) {
        var aK = [];
        for (var aJ = 0; aJ < aL.length; ++aJ) {
            var aN = w(aM, aL[aJ]);
            if (aN != -1) {
                var aI = aM[aN];
                aI.parentMenu = aM;
                aM = aI[MENU_IDX_SUB];
                aK.push(aI)
            }
        }
        return aK
    };
    aq.getItemUrl = function (aI) {
        var aJ = aI[MENU_IDX_URL];
        if (!aJ) {
            return null
        }
        var aK = aq.getItemOpt(aI);
        //aJ = aJ.replace(/^:cata-shoot.tauri.hu/, g_getRelativeHostPrefix("cata-shoot.tauri.hu"));
        if (aI.modifyUrl) {
            aJ = g_modifyUrl(aJ, aI.modifyUrl.params, aI.modifyUrl.opt)
        }
        return aJ
    };
    aq.getItemOpt = function (aI) {
        if (!aI[MENU_IDX_OPT]) {
            aI[MENU_IDX_OPT] = {}
        }
        return aI[MENU_IDX_OPT]
    };
    aq.removeItemById = function (aI, aK) {
        var aJ = w(aI, aK);
        if (aJ != -1) {
            aI.splice(aJ, 1)
        }
    };
    var ag = 25;
    var o = 333;
    var aH = 4;
    var l = 6;
    var L = 6;
    var H = 3;
    var Z = 26;
    var E = false;
    var R;
    var W;
    var g = {};
    var N = {};
    var ak = {};
    var u = {};
    var S = 0;

    function ab() {
        if (E) {
            return
        }
        E = true;
        var aI = $('<div class="menu"><a href="#"><span>ohai</span></a></div>').css({
            left: "-1000px",
            top: "-1000px"
        }).appendTo(document.body);
        var aJ = aI.children("a").outerHeight();
        aI.remove();
        if (aJ > 15) {
            Z = aJ
        }
    }

    function m(aJ, aI) {
        if (W) {
            W.removeClass("open")
        }
        W = aI;
        W.addClass("open");
        b(aJ)
    }

    function ae() {
        if (Platform.isTouch()) {
            ac();
            return
        }
        if (W) {
            W.removeClass("open");
            W = null
        }
        am(0)
    }

    function ap(aJ, aI, aK) {
        clearTimeout(R);
        b(aJ, aI, aK)
    }

    function b(aJ, aI, aK) {
        v(0);
        ad(aJ, 0, aI, aK);
        am(1)
    }

    function ad(aK, aM, aQ, aP) {
        ab();
        an(aK);
        var aN = ah(aM);
        var aJ = B(aK);
        var aI = h(aJ, aM);
        aN.append(aI);
        var aL = !ax(aM);
        g[aM] = aN;
        var aO = av(aN, aM, aQ, aP);
        aN.css({
            left: aO.x + "px",
            top: aO.y + "px"
        });
        var aR = g_createRect(aO.x, aO.y, aN.width(), aN.height());
        //Ads.site.intersect(aR, true);
        aG(aN, aL)
    }

    function ah(aJ) {
        if (ak[aJ]) {
            var aI = ak[aJ];
            aI.children().detach();
            return aI
        }
        var aI = $('<div class="menu"></div>').mouseover(q).mouseleave(at).delegate("a", "mouseenter", {
            depth: aJ
        }, ay).delegate("a", "click", t);
        aI.appendTo(document.body);
        ak[aJ] = aI;
        return aI
    }

    function B(aL) {
        var aJ = p(aL);
        if (u[aJ]) {
            return u[aJ]
        }
        var aM;
        var aI = [];
        $.each(aL, function (aN, aO) {
            if (!aw(aO)) {
                return
            }
            $a = f(aO);
            if (aA(aO)) {
                aM = $a;
                return
            }
            if (aM) {
                aI.push(aM);
                aM = null
            }
            aI.push($a)
        });
        var aK = $(aI);
        u[aL] = aK;
        return aK
    }

    function f(aJ) {
        U(aJ);
        var aM = $("<a></a>");
        aJ.$a = aM;
        aM.data("menuItem", aJ);
        aq.linkifyItem(aJ, aM);
        aq.updateItem(aJ);
        if (aA(aJ)) {
            aM.addClass("separator");
            aM.text(aJ[MENU_IDX_NAME]);
            return aM
        }
        var aI;
        var aL = aJ[MENU_IDX_NAME],
            aK, aN, aO;
        if ((typeof aL == "object") && ("tagName" in aL) && (aL.tagName.toLowerCase() == "span")) {
            while (aK = aL.getElementsByTagName("span")[0]) {
                aN = document.createElement("div");
                aN.className = aK.className;
                $.extend(aN.style, aK.style);
                aN.style.display = "inline";
                while (aO = aK.firstChild) {
                    aO.parentNode.removeChild(aO);
                    aN.appendChild(aO)
                }
                aK.parentNode.insertBefore(aN, aK);
                aK.parentNode.removeChild(aK)
            }
            aI = $(aL)
        } else {
            aI = $("<span></span>");
            aI.text(aJ[MENU_IDX_NAME])
        }
        aI.appendTo(aM);
        if (D(aJ)) {
            aI.addClass("hassubmenu")
        }
        return aM
    }

    function h(aI, aT) {
        var aO = W;
        var aQ = $(window);
        var aX = aI.length;
        var aM = aQ.height() - (H * 2) - L;
        var aS = Math.floor(Math.max(0, aM) / Z);
        if (aS >= aX) {
            var aV = $('<div class="menu-outer"></div>');
            var aJ = $('<div class="menu-inner"></div>');
            aI.appendTo(aJ);
            aV.append(aJ);
            return aV
        }
        var aL = Math.min(aH, Math.ceil(aX / aS));
        var aW = Math.ceil(aX / aL);
        var aN = 0;
        var aY = aX;
        var aP = $("<div></div>");
        while (aY > 0) {
            var aV = $('<div class="menu-outer"></div>');
            var aJ = $('<div class="menu-inner"></div>');
            var aU = Math.min(aY, aW);
            var aK = aN;
            var aR = aK + aU;
            aI.slice(aK, aR).appendTo(aJ);
            aV.append(aJ);
            aP.append(aV);
            aN += aU;
            aY -= aU
        }
        return aP
    }

    function av(aJ, aK, aI, aL) {
        if (aK == 0) {
            return aF(aJ, aK, aI, aL)
        }
        return P(aJ, aK)
    }

    function aF(aR, aN, aU, aT) {
        var aQ = g_getViewport();
        var aJ = aR.width();
        var aO = aR.height();
        var aL = aJ + l;
        var aI = aO + L;
        var aP = (aU != null && aT != null);
        if (aP) {
            if (aT + aI > aQ.b) {
                aT = Math.max(aQ.t, aQ.b - aI)
            }
        } else {
            var aK = W;
            var aM = aK.offset();
            var aS = false;
            aU = aM.left;
            aT = aM.top + aK.outerHeight();
            if (aT + aI > aQ.b && aM.top >= aI) {
                aT = aM.top - aI
            }
            var aV = g_createRect(aU, aT, aL, aI);
            /*if (Ads.site.intersect(aV)) {
                aS = true
            }*/
            if (aS) {
                aU = aM.left + aK.outerWidth() - aJ
            }
        }
        if (aU + aL > aQ.r) {
            aU = Math.max(aQ.l, aQ.r - aL)
        }
        return {
            x: aU,
            y: aT
        }
    }

    function P(aQ, aN) {
        var aP = g_getViewport();
        var aJ = aQ.width();
        var aO = aQ.height();
        var aL = aJ + l;
        var aI = aO + L;
        var aK = N[aN - 1];
        var aM = aK.offset();
        var aR = false;
        x = aM.left + aK.outerWidth() - 5;
        y = aM.top - 2;
        if (x + aL > aP.r) {
            aR = true
        }
        if (aR) {
            x = Math.max(aP.l, aM.left - aJ)
        }
        if (y + aI > aP.b) {
            y = Math.max(aP.t, aP.b - aI)
        }
        return {
            x: x,
            y: y
        }
    }

    function aG(aJ, aI) {
        if (aI) {
            aJ.css({
                opacity: "0"
            }).show().animate({
                opacity: "1"
            }, "fast", null, aD)
        } else {
            aJ.show()
        }
    }

    function aD(aI) {
        $(this).css("opacity", "")
    }

    function am(aI) {
        while (g[aI]) {
            g[aI].stop().hide();
            g[aI] = null;
            ++aI
        }
        /*if (!g[0]) {
            Ads.restoreHidden()
        }*/
    }

    function v(aI) {
        while (N[aI]) {
            N[aI].removeClass("open");
            N[aI] = null;
            ++aI
        }
    }

    function ax(aI) {
        return g[aI || 0] != null
    }

    function j(aI) {
        return aI[MENU_IDX_ID]
    }

    function aA(aI) {
        return aI[MENU_IDX_ID] == null
    }

    function J(aI) {
        return in_array(aI, true, aA) != -1
    }

    function D(aI) {
        return aI[MENU_IDX_SUB] != null
    }

    function w(aI, aJ) {
        return in_array(aI, aJ, j)
    }

    function au(aI) {
        var aJ = aq.getItemOpt(aI);
        if (aJ && aJ.requiredAccess && !User.hasPermissions(aJ.requiredAccess)) {
            return false
        }
        return true
    }

    function aw(aI) {
        if (!au(aI)) {
            return false
        }
        if (D(aI)) {
            if (!X(aI[MENU_IDX_SUB])) {
                return false
            }
        }
        return true
    }

    function X(aI) {
        return in_array(aI, true, F) != -1
    }

    function F(aI) {
        return !aA(aI) && au(aI)
    }

    function p(aI) {
        if (aI.uniqueId == null) {
            aI.uniqueId = S++
        }
        return aI.uniqueId
    }

    function I(aJ, aI) {
        $.each(aJ, function (aK, aL) {
            A(aL, aI)
        })
    }

    function A(aI, aJ) {
        aJ(aI);
        if (D(aI)) {
            I(aI[MENU_IDX_SUB], aJ)
        }
    }

    function c(aL, aI, aJ, aK) {
        $.each(aL, function (aN, aO) {
            if (aO === undefined) {
                return
            }
            if (aA(aO)) {
                return
            }
            if (aJ.uniqueUrls && aJ.uniqueUrls[aO[MENU_IDX_ID]]) {
                aO[MENU_IDX_URL] = aJ.uniqueUrls[aO[MENU_IDX_ID]]
            } else {
                if (aO[MENU_IDX_URL] == null) {
                    aO[MENU_IDX_URL] = aI + aO[MENU_IDX_ID] + aJ.hash
                }
            }
            if (D(aO)) {
                var aM = true;
                if (aJ.useSimpleIds) {
                    aM = false
                } else {
                    if (aJ.useSimpleIdsAfter != null && aK >= aJ.useSimpleIdsAfter) {
                        aM = false
                    }
                }
                var aP = aI;
                if (aM) {
                    aP += aO[MENU_IDX_ID] + "."
                }
                c(aO[MENU_IDX_SUB], aP, aJ, aK + 1)
            }
        })
    }

    function z(aI) {
        aI.sort(function (aK, aJ) {
            return strcmp(aK[MENU_IDX_NAME], aJ[MENU_IDX_NAME])
        })
    }

    function aa(aJ) {
        var aI = aq.implode(aJ, {
            createHeadinglessGroup: true
        });
        $.each(aI, function (aK, aL) {
            z(aL[MENU_IDX_SUB])
        });
        n(aJ, aI)
    }

    function n(aJ, aI) {
        aJ.splice(0, aJ.length);
        $.each(aI, function (aK, aL) {
            if (aL[MENU_IDX_NAME]) {
                aJ.push([, aL[MENU_IDX_NAME]])
            }
            $.each(aL[MENU_IDX_SUB], function (aM, aN) {
                aJ.push(aN)
            })
        })
    }

    function U(aI) {
        var aJ = aq.getItemOpt(aI);
        if (aJ.checkedUrl && location.href.match(aJ.checkedUrl)) {
            aI.checked = true
        }
        if (typeof aJ.checkedFunc == "function") {
            aI.checked = aJ.checkedFunc(aI)
        }
    }

    function an(aI) {
        if (aI.onBeforeShow) {
            aI.onBeforeShow(aI)
        }
        $.each(aI, function (aJ, aK) {
            var aL = aq.getItemOpt(aK);
            if (aL.onBeforeShow) {
                aL.onBeforeShow(aK)
            }
        })
    }

    function al(aJ) {
        clearTimeout(R);
        var aI = $(this);
        if (!ax()) {
            R = setTimeout(m.bind(null, aI.data("menu"), aI), ag);
            return
        }
        m(aI.data("menu"), aI)
    }

    function e(aJ, aI) {
        clearTimeout(R);
        if (ax()) {
            if (aI) {
                ae()
            } else {
                R = setTimeout(ae, o)
            }
        }
    }

    function M(aI) {
        clearTimeout(R);
        aq.showAtCursor($(this).data("menu"), aI)
    }

    function O(aI, aJ) {
        aJ = $E(aJ);
        if (aJ._button == 3 || aJ.shiftKey || aJ.ctrlKey) {
            aI.call(this, aJ)
        }
    }

    function Y() {
        var aJ = $(this),
            aK = aJ.parent(),
            aL = aJ.data("menu"),
            aI = aJ.data("menuItem");
        if (ao) {
            ao.removeClass("touch-menu-active");
            ao = null
        }
        if (aK[0].tagName == "DT") {
            ac();
            aJ.addClass("active");
            T = null;
            Q = [aI[MENU_IDX_ID]];
            G(aL)
        } else {
            ao = aJ;
            ao.addClass("touch-menu-active");
            T = aL;
            Q = aI ? [aI[MENU_IDX_ID]] : [null];
            G(aL, {
                atElement: aJ
            })
        }
    }

    function G(aL, aT) {
        if (!aT) {
            aT = {}
        }
        var aK;
        if (aT.atElement) {
            var aJ = false;
            if (!V) {
                V = $("<div/>", {
                    className: "floating-touch-menu-container",
                    css: {
                        display: "none"
                    }
                });
                V.appendTo("body")
            } else {
                var aV = V.offset();
                aJ = aV.top
            }
            V.empty();
            aK = $("<div/>", {
                className: "floating-touch-menu"
            });
            aC = $("<div/>", {
                className: "floating-touch-menu-arrow"
            });
            aK.append(aC).appendTo(V);
            var aW = $("<a/>", {
                className: "floating-touch-menu-closer",
                text: "X"
            });
            aW.click(ac);
            V.append(aW);
            var aR = aT.atElement.offset();
            var aU = aR.top + aT.atElement.outerHeight();
            var aI = parseInt(aU + 7);
            var aP = aI != aJ;
            V.css({
                display: "block",
                top: (aP ? aI - 10 : aI) + "px"
            });
            var aN = aR.left + (aT.atElement.outerWidth() / 2);
            aC.css({
                display: "block",
                left: parseInt(aN - 10) + "px"
            });
            if (aP) {
                V.css({
                    opacity: "0"
                });
                setTimeout(function () {
                    V.animate({
                        opacity: "1",
                        top: "+=10px"
                    })
                }, 0)
            }
        } else {
            V = null;
            aC = null;
            aK = $("#topbar");
            aK.empty()
        }
        var aM = false;
        if (!aT.atElement || aT.atElement.data("menuItem")) {
            aM = true
        }
        if (aM) {
            if (V) {
                V.addClass("has-breadcrumb")
            }
            var aO = ce("ul");
            aO.className = "touch-menu-breadcrumb";
            aj(aO, Q)
        } else {
            if (V) {
                V.removeClass("has-breadcrumb")
            }
        }
        if (V) {
            if (aT.atElement && aT.atElement.parents("div.breadcrumb")) {
                V.addClass("from-breadcrumb")
            } else {
                V.removeClass("from-breadcrumb")
            }
        }
        var aQ = ce("div");
        aQ.className = "touch-menu-items";
        aQ.style.left = "0%";
        ar(aL, {
            target: aQ
        });
        var aS = ce("div");
        aS.className = "touch-menu-items-wrapper";
        ae(aS, aQ);
        if (aM) {
            aK.append(aO)
        }
        aK.append(aS).attr("class", "touch-menu")
    }

    function ar(aO, aL) {
        if (aL.animate) {
            var aN = $(".touch-menu-items");
            $(aL.animate).parent().addClass("chosen");
            aN.addClass("chosen");
            setTimeout(function () {
                var aP = ce("div");
                aP.className = "touch-menu-items";
                var aR = (Q.length - 2) * -10 + 2;
                aP.style.left = aR + "%";
                k(aP, aO);
                var aT = $(aP);
                var aQ = aN.last();
                aQ.after(aT);
                var aU = aQ.height();
                aN.each(function () {
                    var aV = $(this);
                    if (aV.data("height")) {
                        aV.css({
                            height: "1px"
                        }).animate({
                            left: "-=12%"
                        })
                    } else {
                        aV.data("height", aV.height()).css("height", aV.height() + "px").animate({
                            left: "-=12%",
                            height: "1px"
                        })
                    }
                });
                var aS = aT.height();
                aT.css("height", aU + "px").animate({
                    left: "-=12%",
                    height: aS + "px"
                })
            }, 100)
        } else {
            if (aL.reverse) {
                var aM = $(".touch-menu-items");
                var aI = $(aM.get(aL.targetPathIndex));
                var aK = aL.reverse * 12;
                var aJ = aM.last();
                aI.css({
                    height: aJ.height() + "px"
                }).animate({
                    left: "+=" + aK + "%",
                    height: aI.data("height") + "px"
                }, {
                    complete: function () {
                        $(this).css("height", "")
                    }
                });
                aJ.css({
                    height: "1px"
                });
                aM.not(aI).animate({
                    left: "+=" + aK + "%"
                }, {
                    complete: function () {
                        aI.removeClass("chosen");
                        $(".chosen", aI).removeClass("chosen");
                        aI.nextAll().stop().remove()
                    }
                })
            } else {
                if (aL.target) {
                    $(aL.target).empty();
                    k(aL.target, aO)
                }
            }
        }
    }

    function aj(aJ, aT, aR, aO) {
        var aK = Menu_.getMenu();
        var aI, aM, aN, aL;
        if (aR) {
            for (aN in Q) {
                aI = Q[aN];
                for (aL in aK) {
                    aM = aK[aL];
                    if (aM[MENU_IDX_ID] == aI) {
                        aK = aM[MENU_IDX_SUB];
                        break
                    }
                }
            }
            Q = Q.concat(aT)
        }
        var aQ, aS, aP;
        for (aN in aT) {
            aI = aT[aN];
            aQ = null;
            for (aL in aK) {
                aM = aK[aL];
                if (aM[MENU_IDX_ID] == aI) {
                    aQ = aM;
                    break
                }
            }
            if (!aQ) {
                break
            }
            aS = ce("li");
            aP = ce("a");
            aP.href = "javascript:;";
            aq.linkifyItem(aQ, $(aP));
            aP.innerHTML = aQ[MENU_IDX_NAME];
            aP.onclick = af;
            ae(aS, aP);
            ae(aJ, aS)
        }
    }

    function af() {
        var aM = $(this).parent();
        if (aM.is(":last-child")) {
            return true
        }
        var aK = aM.index();
        var aL = Menu_.getMenu();
        for (var aJ = 0; aJ <= aK; aJ++) {
            for (var aI in aL) {
                if (aL[aI][MENU_IDX_ID] == Q[aJ]) {
                    aL = aL[aI][MENU_IDX_SUB];
                    break
                }
            }
        }
        aM.nextAll().remove();
        ar(aL, {
            reverse: Q.length - aK - 1,
            targetPathIndex: aK
        });
        Q = Q.slice(0, aK + 1);
        return false
    }

    function k(aM, aL) {
        var aK = null,
            aI;
        for (var aJ in aL) {
            aI = aL[aJ];
            if (!aw(aI)) {
                continue
            }
            if (aA(aI)) {
                aB(aM, aI);
                aK = K(aM);
                continue
            }
            if (!aK) {
                aK = K(aM)
            }
            ae(aK, C(aI))
        }
    }

    function K(aJ) {
        var aI = ce("ul");
        ae(aJ, aI);
        return aI
    }

    function aB(aM, aJ) {
        var aL = ce("h2");
        var aK = ce("a");
        var aI = $(aK);
        aJ.$a = aI;
        aI.data("menuItem", aJ);
        aq.linkifyItem(aJ, aI);
        aq.updateItem(aJ);
        aI.text(aJ[MENU_IDX_NAME]);
        ae(aL, aI.get(0));
        ae(aM, aL)
    }

    function C(aM) {
        f(aM);
        U(aM);
        var aJ = $("<a></a>");
        aM.$a = aJ;
        aJ.data("menuItem", aM);
        aq.linkifyItem(aM, aJ);
        aq.updateItem(aM);
        var aL;
        var aQ = aE(aM),
            aP, aK, aI;
        if ((typeof aQ == "object") && ("tagName" in aQ) && (aQ.tagName.toLowerCase() == "span")) {
            while (aP = aQ.getElementsByTagName("span")[0]) {
                aK = document.createElement("div");
                aK.className = aP.className;
                $.extend(aK.style, aP.style);
                aK.style.display = "inline";
                while (aI = aP.firstChild) {
                    aI.parentNode.removeChild(aI);
                    aK.appendChild(aI)
                }
                aP.parentNode.insertBefore(aK, aP);
                aP.parentNode.removeChild(aP)
            }
            aL = $(aQ)
        } else {
            aL = $("<span></span>");
            aL.text(aE(aM))
        }
        aL.appendTo(aJ);
        var aO = ce("li");
        aJ.appendTo(aO);
        if (D(aM)) {
            aJ.addClass("has-sub");
            aL.addClass("has-sub");
            var aN = ce("a");
            aN.className = "view-sub";
            aN.href = "javascript:;";
            aN.onclick = r;
            $(aN).data("menuItem", aM);
            ae(aO, aN)
        }
        return aO
    }

    function aE(aI) {
        return aI[MENU_IDX_OPT].shortname || aI[MENU_IDX_NAME]
    }

    function r() {
        var aI = $(this).data("menuItem");
        var aJ = $(".touch-menu-breadcrumb");
        if (aJ.length) {
            aj(aJ.get(0), [aI[MENU_IDX_ID]], true)
        } else {
            Q.push(null)
        }
        ar(aI[MENU_IDX_SUB], {
            animate: this
        })
    }

    function az() {
        ac()
    }

    function ac() {
        $("#toptabs dt > a.active").removeClass("active");
        $("#topbar").removeClass("touch-menu").empty();
        if (V) {
            V.empty().css({
                display: "none"
            })
        }
        T = null;
        Q = [];
        aC = null;
        if (ao) {
            ao.removeClass("touch-menu-active")
        }
        ao = null
    }

    function q(aI) {
        clearTimeout(R)
    }

    function at(aI) {
        clearTimeout(R);
        R = setTimeout(ae, o)
    }

    function ay(aJ) {
        clearTimeout(R);
        var aK = $(this);
        var aL = aJ.data.depth;
        v(aL);
        var aI = aK.data("menuItem");
        var aM = aL;
        if (aI && D(aI)) {
            aK.addClass("open");
            N[aL] = aK;
            ad(aI[MENU_IDX_SUB], aL + 1);
            ++aM
        }
        am(aM + 1)
    }

    function t(aK) {
        var aL = $(this);
        var aI = aL.data("menuItem");
        if (!aI) {
            return
        }
        var aJ = aq.getItemOpt(aI);
        if (aJ.onClick) {
            aJ.onClick()
        }
    }
    $(window).keyup((function (aI, aJ) {
        if (aJ.keyCode == 27) {
            aI()
        }
    }).bind(null, ae))
};

function g_isThottbot() {
    return false
};
Platform = new function () {
    this.known = false;
    this.initialized = false;
    this.initSteps = {};
    var g = false;
    var f = false;
    var e = navigator.userAgent || navigator.vendor || window.opera;
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))) {
        g = true
    }
    if (!g) {
        if (/(android|ipad|playbook|silk)/i.test(e)) {
            f = true
        }
    }
    if (g_isThottbot()) {
        g = false;
        f = false
    }
    var j = g_getGets();
    if (typeof j.testmobile != "undefined") {
        g = true
    }
    if (typeof j.testtablet != "undefined") {
        f = true
    }
    this.known = true;
    this.preInit1 = function () {
        if (Platform.initSteps["1"]) {
            return
        }
        $("html").addClass(Platform.get() + "-layout");
        if (Platform.isTouch()) {
            c()
        }
        Platform.initSteps["1"] = true
    };
    this.preInit2 = function () {
        if (Platform.initSteps["2"]) {
            return
        }
        if (Platform.isTouch()) {
            b()
        }
        Platform.initSteps["2"] = true
    };
    this.init = function () {
        if (Platform.initSteps["3"] || Platform.initialized) {
            return
        }
        if (Platform.isTouch()) {
            k()
        }
        Platform.initSteps["3"] = true;
        Platform.initialized = true
    };
    this.isMobile = function () {
        return g
    };
    this.isTablet = function () {
        return f
    };
    this.isTouch = function () {
        return this.isMobile() || this.isTablet()
    };
    this.get = function () {
        if (this.isMobile()) {
            return "mobile"
        }
        if (this.isTablet()) {
            return "tablet"
        }
        return "default"
    };

    function c() {
        $("html").addClass("touch-layout");
        var n = Platform.get();
        var l = $("head");
        var m = $("body").hasClass("home") ? ".9" : "1";
        switch (n) {
        case "mobile":
            l.append('<meta name="viewport" content="width=768">');
            break;
        case "tablet":
            l.append('<meta name="viewport" content="width=768, initial-scale=' + m + '">');
            break
        }
    }

    function b() {
        Platform.preInit1();
        $("#layout").addClass("nosidebar");
        $("#sidebar").remove();
        var l = $(".header-bg");
        if (l.length) {
            var n = $("#main-precontents");
            if (!n.length) {
                n = $(".blog-precontents-alternate")
            }
            if (n.length) {
                var m = $("<div/>", {
                    className: "sub-main-precontents"
                });
                m.append(l);
                n.after(m)
            } else {
                l.hide();
                setTimeout(function () {
                    l.remove()
                }, 5000)
            }
        }
        $("#wrapper").prepend($(".topbar-search"));
        $("#header-expandsite").remove()
    }

    function k() {
        Platform.preInit1();
        Platform.preInit2();
        var l = ge("infobox-alternate");
        if (l) {
            var m = $(".infobox");
            m.appendTo(l);
            if (Platform.isTablet()) {
                h(m, {
                    rows: 2
                })
            }
        }
    }

    function h(m, p) {
        if (!p) {
            p = {}
        }
        if (!p.rows) {
            p.rows = 1
        }
        m = m.first();
        var q = [];
        $("table", m).each(function () {
            var r = this.parentNode;
            var t = $(this);
            t.detach();
            q.push([r, t])
        });
        var l = $("tr", m);
        var o;
        while (l.length > p.rows) {
            for (n = 0; n < p.rows; n++) {
                o = p.rows;
                $(l[n]).append($("th, td", l[o]));
                $(l[o]).remove();
                l.splice(o, 1)
            }
        }
        for (var n in q) {
            q[n][1].appendTo(q[n][0])
        }
    }
};

$(document).ready(Platform.init);

function g_getViewport() {
    var b = $(window);
    return new Rectangle(b.scrollLeft(), b.scrollTop(), b.width(), b.height())
}

function g_getRelativeHostPrefix(c) {
    var g = (typeof c == "undefined") ? "mop-shoot.tauri.hu" : c;
    if (!g_getRelativeHostPrefix.CACHE) {
        g_getRelativeHostPrefix.CACHE = {}
    }
    if (g in g_getRelativeHostPrefix.CACHE) {
        return g_getRelativeHostPrefix.CACHE[g]
    }
    var f = "";
    var b, e;
    if (location.hostname.indexOf(g) < 0 && !/^[0-9\.]+$/.test(location.hostname)) {
        b = /^([\w\W]*)\.[^\.]+\.hu$/.exec(location.hostname);
        b = b ? b[1] : "www";
        e = "";
        if (location.port) {
            e = location.port
        }
        if (e.substr(0, 1) != ":") {
            e = ":" + e
        }
        if (e == ":80") {
            e = ""
        }
        f = "http://" + b + "." + g + e
    }
    g_getRelativeHostPrefix.CACHE[g] = f;
    return f
}
if (!String.prototype.ltrim) {
    String.prototype.ltrim = function() {
        return this.replace(/^\s*/, "")
    }
}
if (!String.prototype.rtrim) {
    String.prototype.rtrim = function() {
        return this.replace(/\s*$/, "")
    }
}
if (!String.prototype.trim) {
    String.prototype.trim = function() {
        return this.ltrim().rtrim()
    }
}
if (!String.prototype.removeAllWhitespace) {
    String.prototype.removeAllWhitespace = function() {
        return this.replace("/s+/g", "")
    }
}

var g_createButton = function(n, d, k) {
    var b = "btn btn-site";
    var g = "";
    var f = "";
    var e = "";
    var o = "";
    var h = [];
    var m = [];
    if (!k) {
        k = {}
    }
    if (!k["no-margin"]) {
        m.push("margin-left:5px")
    }
    if (typeof d != "string" || d === "") {
        d = "javascript:;"
    }
    if (k["new-window"]) {
        g = ' target="_blank"'
    }
    if (typeof k.id == "string") {
        f = ' id="' + k.id + '"'
    }
    if (typeof k.size != "undefined") {
        switch (k.size) {
            case "small":
            case "large":
                h.push("btn-" + k.size);
                break
        }
    } else {
        h.push("btn-small")
    }
    if (typeof k["class"] == "string") {
        h.push(k["class"])
    }
    if (typeof k.type == "string") {
        switch (k.type) {
            case "default":
            case "gray":
                b = "btn";
                break;
            default:
                b = "btn btn-" + k.type
        }
    }
    if (k.disabled) {
        h.push("btn-disabled");
        d = "javascript:;"
    }
    if (h.length) {
        b += " " + h.join(" ")
    }
    if (b) {
        b = ' class="' + b + '"'
    }
    if (!(typeof k["float"] != "undefined" && !k["float"])) {
        m.push("float:right")
    }
    if (typeof k.style == "string") {
        m.push(k.style)
    }
    if (m.length) {
        e = ' style="' + m.join(";") + '"'
    }
    var j = '<a href="' + d + '"' + g + f + b + e + ">" + (n || "") + "</a>";
    var c = ce("div");
    c.innerHTML = j;
    var l = c.childNodes[0];
    if (typeof k.click == "function" && !k.disabled) {
        l.onclick = k.click
    }
    if (typeof k.tooltip != "undefined") {
        if (k.tooltip !== false) {
            l.setAttribute("data-whattach", "true")
        }
        if (k.tooltip === false) {
            l.rel = "np"
        } else {
            if (typeof k.tooltip == "string") {
                Tooltip.simple(l, k.tooltip, null, true)
            } else {
                if (typeof k.tooltip == "object" && k.tooltip["text"]) {
                    Tooltip.simple(l, k.tooltip["text"], k.tooltip["class"], true)
                }
            }
        }
    }
    return l
};

function g_isEqualSimpleObject(b, c) {
    for (var g in b) {
        if (typeof b[g] == "object") {
            if (typeof c[g] != "object") {
                return false
            }
            if (!g_isEqualSimpleObject(b[g], c[g])) {
                return false
            }
        } else {
            if (b[g] !== c[g]) {
                return false
            }
        }
    }
    for (var f in c) {
        if (typeof c[f] == "object") {
            if (typeof b[f] != "object") {
                return false
            }
            if (!g_isEqualSimpleObject(b[f], c[f])) {
                return false
            }
        } else {
            if (b[f] !== c[f]) {
                return false
            }
        }
    }
    return true
}

function Line(h, p, c, n, m) {
    var j = Math.min(h, c),
        s = Math.max(h, c),
        o = Math.min(p, n),
        l = Math.max(p, n),
        g = (s - j),
        q = (l - o),
        k = Math.sqrt(Math.pow(g, 2) + Math.pow(q, 2)),
        t = Math.atan2(q, g),
        b = Math.sin(t),
        f = Math.cos(t);
    var r = $('<span class="line" />').css({
        top: o.toFixed(2) + "px",
        left: j.toFixed(2) + "px",
        width: g.toFixed(2) + "px",
        height: q.toFixed(2) + "px"
    }).append($("<var />").css({
        width: k.toFixed(2) + "px",
        "-o-transform": "rotate(" + t + "rad)",
        "-moz-transform": "rotate(" + t + "rad)",
        "-webkit-transform": "rotate(" + t + "rad)",
        filter: "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', M11=" + f + ", M12=" + (-1 * b) + ", M21=" + b + ", M22=" + f + ")"
    }));
    if (!(h == j && p == o) && !(c == j && n == o)) {
        r.addClass("flipped")
    }
    if (m != null) {
        r.addClass("line-" + m)
    }
    return r[0]
}

function g_setInnerHtml(g, f, b) {
    if (g.nodeName.toLowerCase() == b) {
        g.innerHTML = f
    } else {
        for (var c = 0; c < g.childNodes.length; ++c) {
            g_setInnerHtml(g.childNodes[c], f, b)
        }
    }
}

var g_clearHash = function(c) {
    var f = "" + location.hash;
    var b = ("" + location.href).replace(/#.*/, "");
    if (c) {
        if (window.history && window.history.pushState) {
            window.history.pushState({}, "", b)
        } else {
            location.hash = "#."
        }
    } else {
        if (window.history && window.history.replaceState) {
            window.history.replaceState({}, "", b)
        } else {
            location.replace("#.")
        }
    }
    return f
};

function g_addTooltip(c, f, b) {
    if (!b && f.indexOf("<table>") == -1) {
        b = "q"
    }
    Tooltip.simple(c, f, b)
}

var is_array = function(b) {
    return !!(b && b.constructor == Array)
};

function iconlist_showhide(id) {
    var children = $(".criteria-childof-" + id),
        disclosure = $("#disclosure-" + id);

    if (children.css("display") == "none") {
        children.css("display", "table-row");
        disclosure.removeClass("disclosure-off").addClass("disclosure-on");
    } else {
        children.css("display", "none");
        disclosure.removeClass("disclosure-on").addClass("disclosure-off");
    }
}

function stringCompare(d, c) {
    if (d == c) {
        return 0
    }
    if (d == null) {
        return -1
    }
    if (c == null) {
        return 1
    }
    var f = parseFloat(d);
    var e = parseFloat(c);
    if (!isNaN(f) && !isNaN(e) && f != e) {
        return f < e ? -1 : 1
    }
    if (typeof d == "string" && typeof c == "string") {
        return d.localeCompare(c)
    }
    return d < c ? -1 : 1
};

/**
 * Turns a background sprite image into a draggable and rotatable 3D model viewer.
 *
 * Initialize using ModelRotator.factory();
 */
var ModelRotator = {

    /**
	 * DOM element objects.
	 */
    node: null,
    viewer: null,
    document: null,
    zoomButton: null,
    rotateButton: null,

    /**
	 * Timer for automatic rotation.
	 */
    timer: null,

    /**
	 * Is the model currently being dragged or rotated.
	 */
    rotating: false,
    dragging: false,

    /**
	 * Is this being used on a touch screen device?
	 */
    isTouch: /(iphone|ipad|ipod|android)/.exec(navigator.userAgent.toLowerCase()),

    /**
	 * Current state of the model.
	 */
    frame: 0,
    lastFrame: 0,
    offset: null,
    lastOffset: null,
    coords: null,
    xPosition: 0,
    yPosition: 0,
    canDrag: false,

    /**
	 * Custom configuration.
	 */
    config: {},

    /**
	 * Overwrites for specific keys.
	 *
	 * frame width, number of frames per sequence, xoffset, yoffset
	 */
    overwrites: {},

    /**
	 * Factory method for generating ModelRotator instances.
	 *
	 * @param node
	 * @param config
	 */
    factory: function (node, config) {
        var instance = Object.create(ModelRotator);
        instance.init(node, config);

        return instance;
    },

    /**
	 * Create draggable object.
	 *
	 * @constructor
	 * @param node
	 * @param config
	 */
    init: function (node, config) {
        node = $(node);

        if (!node.length) {
            return;
        }

        // Merge configuration
        this.config = $.extend({}, {
            key: '',
            frameWidth: 280,
            frameHeight: 280,
            sequenceWidth: 6720,
            totalFrames: 24,
            velocity: 10,
            rotateTimer: 100,
            yOffset: 0,
            xOffset: 0,
            viewerClass: '.viewer',
            rotate: true,
            rotateClass: '.rotate',
            zoom: true,
            zoomClass: '.zoom',
            zoomCallback: function (value) {
                return value.replace('rotate', 'zoom');
            },
            dragCallback: null,
            invert: true
        }, config);

        var cfg = this.config;

        // Grab objects
        this.node = node;
        this.viewer = node.find(cfg.viewerClass);
        this.document = $(document);
        this.zoomButton = node.find(cfg.zoomClass);
        this.rotateButton = node.find(cfg.rotateClass);

        // If touch device
        if (this.isTouch) {
            this.node.addClass('touch');
        }

        // Setup event binds
        if (cfg.rotate && this.rotateButton.length) {
            this.rotateButton.bind('click', $.proxy(this.rotate, this));
        } else {
            this.rotateButton.remove();
        }

        if (cfg.zoom && this.zoomButton.length) {
            this.zoomButton.bind('click', $.proxy(this.zoom, this));
        } else {
            this.zoomButton.remove();
        }

        if (this.viewer.length) {
            this.viewer.bind((this.isTouch ? 'touchstart' : 'mousedown'), $.proxy(this.down, this));
            this.document.bind((this.isTouch ? 'touchend' : 'mouseup'), $.proxy(this.up, this));
            this.document.bind((this.isTouch ? 'touchmove' : 'mousemove'), $.proxy(this.move, this));

        }

        // Overwrites?
        var map = this.overwrites;

        if (cfg.key && map[cfg.key]) {
            cfg.frameWidth = map[cfg.key][0];
            cfg.frameHeight = map[cfg.key][0];
            cfg.totalFrames = map[cfg.key][1];
            cfg.sequenceWidth = map[cfg.key][0] * map[cfg.key][1];
            cfg.xOffset = map[cfg.key][2] || 0;
            cfg.yOffset = map[cfg.key][3] || 0;
        }

        // Get frame position (switch for older IE that don't support background-position)
        var bgPos = 'background-position';
        bgPos = bgPos.replace('px', '').replace('%', '').replace('-', '').split(' ')[0];

        this.frame = this.lastFrame = Math.round(bgPos / cfg.frameWidth);

        // Verify image
        this.verifyImage();
    },

    /**
	 * Get background image (that works in all browsers).
	 *
	 * @return string
	 */
    backgroundImage: function () {
        var url = this.viewer.css('background-image');
        url = url.replace(/^url\(('|")?/, ''); // Remove leading url("
        url = url.replace(/('|")?\)$/, '');    // Remove trailing ")

        return url;
    },

    /**
	 * Triggered when mouse is pressed, initiates drag.
	 *
	 * @param e
	 */
    down: function (e) {
        if (!this.isTouch && e.which !== 1 || !this.canDrag) {
            return false;
        }

        // Disable auto-rotation
        if (this.rotating) {
            this.stop();
        }

        // We are now dragging!
        this.dragging = true;
        this.node.addClass('dragging');

        if (this.config.dragCallback) {
            this.config.dragCallback(true);
        }

        // Save mouse pointer coords on dragstart
        if (this.coords === null) {
            this.coords = this.mouseCoords(e);
        }

        return false;
    },

    /**
	 * Is it currently dragging.
	 *
	 * @return boolean
	 */
    isDragging: function () {
        return this.dragging;
    },

    /**
	 * Is it currently rotating.
	 *
	 * @return boolean
	 */
    isRotating: function () {
        return this.rotating;
    },

    /**
	 * Calculate mouse offset from passed in source coord.
	 *
	 * @param e
	 * @param coords
	 * @return object
	 */
    mouseOffset: function (e, coords) {
        var mousePos = this.mouseCoords(e);

        return {
            x: mousePos.x - coords.x,
            y: mousePos.y - coords.y
        };
    },

    /**
	 * Calculate mouse coordinates.
	 *
	 * @param e
	 * @return object
	 */
    mouseCoords: function (e) {
        if (this.isTouch) {
            e = e.touches[0];
        }

        if (e.pageX && e.pageY) {
            return {
                x: e.pageX,
                y: e.pageY
            };
        }

        return {
            x: e.clientX + (document.body.scrollLeft - document.body.clientLeft),
            y: e.clientY + (document.body.scrollTop - document.body.clientTop)
        };
    },

    /**
	 * Executes a timer that handles the rotation of the model.
	 *
	 * @param e
	 */
    move: function (e) {
        if (!this.dragging || this.rotating || this.timer || !this.canDrag) {
            return false;
        }

        // Fake a timer being used
        this.timer = true;

        // On mousemove calculate difference to dragstart coords
        this.offset = this.mouseOffset(e, this.coords);

        // Start drag rotation
        this._drag();

        return true;
    },

    /**
	 * Reset the viewer to defaults.
	 */
    reset: function () {
        this.node.removeClass('load-fail can-drag');

        this.stop();
        this.dragging = false;
        this.canDrag = false;
        this.frame = 0;
        this.lastFrame = 0;
        this.offset = null;
        this.lastOffset = null;
        this.coords = null;
        this.xPosition = 0;
        this.yPosition = 0;
    },

    /**
	 * Start or stop the automatic rotation.
	 *
	 * @param e
	 */
    rotate: function (e) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }

        if (this.timer !== null) {
            this.stop();
        } else {
            this.timer = setInterval($.proxy(this._rotate, this), this.config.rotateTimer);
            this.rotating = true;
            this.node.addClass('rotating');
        }
    },

    /**
	 * Set the drag callback.
	 *
	 * @param callback
	 */
    setDragCallback: function (callback) {
        if (Core.isCallback(callback))
            this.config.dragCallback = callback;
    },

    /**
	 * Set the image to use (for changing dynamically).
	 *
	 * @param src
	 */
    setImage: function (src) {
        this.reset();

        this.viewer.css({
            backgroundPosition: '0 0',
            backgroundImage: "url('" + src + "')"
        });

        this.verifyImage();
    },

    /**
	 * Stop the rotation.
	 */
    stop: function () {
        if (this.rotating) {
            clearInterval(this.timer);

            this.timer = null;
            this.rotating = false;
            this.node.removeClass('rotating');
        }
    },

    /**
	 * Triggered when mouse is released, disables drag and resets.
	 */
    up: function () {
        if (this.rotating || !this.canDrag) {
            return false;
        }

        this.lastFrame = this.frame;
        this.coords = null;

        // No longer dragging
        this.dragging = false;
        this.node.removeClass('dragging');

        if (this.config.dragCallback) {
            this.config.dragCallback(false);
        }

        return true;
    },

    /**
	 * Verify the image has loaded, else throw errors.
	 */
    verifyImage: function () {
        var path = this.viewer[0].style.backgroundImage || '';

        // Only verify if an image is actually set
        if (path.indexOf('.jpg') === -1 && path.indexOf('.png') === -1) {
            return;
        }

        var self = this,
			bgImg = new Image();

        bgImg.onerror = function () {
            self.node.addClass('load-fail');
        };

        bgImg.onload = function () {
            if (this.width > self.config.frameWidth) {
                self.node.addClass('can-drag');
                self.canDrag = true;
            }
        };

        bgImg.src = this.backgroundImage();
    },

    /**
	 * Zoom into an image by opening a lightbox.
	 *
	 * @param e
	 */
    zoom: function (e) {
        e.stopPropagation();
        e.preventDefault();

        Lightbox.loadImage([{
            src: this.config.zoomCallback(this.backgroundImage())
        }]);
    },

    /**
	 * Rotate through each frame using a timer.
	 */
    _rotate: function () {
        var config = this.config,
			frame = this.lastFrame + 1;

        if (frame >= config.totalFrames) {
            frame = 0;
        }

        var x = (frame * config.frameWidth) + config.xOffset,
			y = 0 + config.yOffset;

        // Save last coords for calculations
        this.frame = this.lastFrame = frame;
        this.xPosition = x;
        this.yPosition = y;

        // Set position
        this.viewer[0].style.backgroundPosition = '-' + x + 'px ' + y + 'px';
    },

    /**
	 * Drag the model horizontally and save the mouse coordinates and frame status.
	 */
    _drag: function () {
        var config = this.config;

        // Calculate how many frames should show depending on distance/velocity
        var lastFrame = this.lastFrame || 0,
			goToFrame;

        // If we inverting rotation, go opposite direction
        if (config.invert) {
            goToFrame = lastFrame + -Math.round(this.offset.x / config.velocity);
        } else {
            goToFrame = lastFrame + Math.round(this.offset.x / config.velocity);
        }

        // Is frame within range
        if (goToFrame >= config.totalFrames || goToFrame < 0) {
            goToFrame = goToFrame - (config.totalFrames * Math.floor(goToFrame / config.totalFrames));
        }

        // Calculate new X background position based on current X background position
        var x = (goToFrame * config.frameWidth) + config.xOffset,
			y = 0 + config.yOffset;

        // Set div's X background position to 0 if new X background postion exceeds image width
        if (x > config.sequenceWidth || x < -config.sequenceWidth) {
            x = 0 + config.xOffset;
        }

        // Save last coords for calculations
        this.frame = goToFrame;
        this.lastOffset = this.offset;
        this.xPosition = x;
        this.yPosition = y;
        this.timer = null;

        // Set position
        this.viewer[0].style.backgroundPosition = '-' + x + 'px ' + y + 'px';
    }

};

$(function () {
    Item.initialize();
});

var Item = {

    /**
	 * 3D model instance.
	 */
    model: null,

    /**
	 * Init elements on the item details page.
	 */
    initialize: function () {
        $('#wiki .sidebar .fact-list').each(function () {
            var self = $(this);

            if (self.find('li').length <= 0)
                self.parent().remove();
        });
    }
}

function changeDiff(diffId)
{
    $(".ndiff").css("display", "none");
    $(".ndiff-" + diffId).css("display", "block");
}

var _localStorage = {
    isSupported: function() {
        var a;
        try {
            a = "localStorage" in window && window.localStorage !== null
        } catch (b) {
            a = false
        }
        if (a) {
            try {
                localStorage.setItem("test", "123");
                a = localStorage.getItem("test") == "123";
                localStorage.removeItem("test")
            } catch (b) {
                a = false
            }
        }
        localStorage.isSupported = (function(c) {
            return c
        }).bind(null, a);
        return a
    },
    set: function(a, b) {
        if (!this.isSupported()) {
            return
        }
        localStorage.setItem(a, b)
    },
    get: function(a) {
        if (!this.isSupported()) {
            return
        }
        return localStorage.getItem(a)
    },
    remove: function(a) {
        if (!this.isSupported()) {
            return
        }
        localStorage.removeItem(a)
    }
};

function initQuestRewardPackage() {
    if (typeof dynamic_reward_data == "undefined") {
        return
    }
    $("#class-selector div.iconmedium a").bind("mouseover", function (b) {
        var d = parseInt($(b.target).attr("data-classid"));
        var c = g_chr_classes[d];
        Tooltip.showAtCursor(b, c, 0, 0, "c" + d)
    });
    $("#class-selector div.iconmedium").bind("mouseout", function (b) {
        Tooltip.hide()
    });
    $("#class-selector div.iconmedium a").bind("click", function (c) {
        var d = $(c.target).attr("data-classid");
        $("#class-selector .iconmedium").removeClass("active");
        $(c.target).parent().addClass("active");
        $.each($("#dynamic-rewards .glow"), function (e, f) {
            $(f).removeClass("glow")
        });
        $("#dynamic-rewards .dr-spec").children().remove();
        var b = dynamic_reward_data[d];
        if (b)
            $.each(b, function (f, h) {
                var j = "#icontab-icon" + h.item;
                var e = "#name-icontab-icon" + h.item;
                var g = "#spec-icontab-icon" + h.item;
                if (!$(j).hasClass("glow")) {
                    $(j).addClass("glow")
                }
                if (!$(e).hasClass("glow")) {
                    $(e).addClass("glow")
                }
                if (!$(g).hasClass("glow")) {
                    $(g).addClass("glow")
                }
                $(g).append('<div class="icontiny spec' + h.spec + '"><img src="' + g_staticUrl + "/images/icons/small/" + h.file + '.png" /></div>');
                $(g).find(".spec" + h.spec).bind("mouseover", function (i) {
                    Tooltip.showAtCursor(i, h.name, 0, 0, "q")
                });
                $(g).find(".spec" + h.spec).bind("mouseout", function (i) {
                    Tooltip.hide()
                })
            });
        _localStorage.set("dynamic_quest_class", d)
    });
    if (_localStorage.get("dynamic_quest_class")) {
        var a = _localStorage.get("dynamic_quest_class");
        $("#qcs-c" + a + " a").click()
    }
}

var g_battlepetcalcs = {};

function BattlePetCalc(b) {
    cO(this, b);
    if (this.id) {
        var a = this.id;
        if (this.parent) {
            var c = ce("div");
            c.id = a;
            ae(ge(this.parent), c);
            this.container = c
        } else {
            this.container = ge(a)
        }
    } else {
        return
    }
    this.unknown = {};
    this.breedOrder = [6, 4, 5, 7, 8, 9, 12, 10, 11, 3];
    if (typeof this.editable == "undefined") {
        this.editable = true
    }
    this.setSpecies(this.species);
    g_battlepetcalcs[this.id] = this;
    this.initialize()
}
BattlePetCalc.prototype = {
    initialize: function() {
        this.div = ce("div");
        this.div.className = "bpet-calc";
        this.table = ce("table");
        if (this.species.untameable) {
            this.table.className = "untameable"
        }
        var A = ["level", "health", "power", "speed"];
        var d = ce("tr");
        var t, k;
        for (var u in A) {
            t = ce("span");
            t.className = "bpet-" + A[u] + "-icon";
            t.title = LANG[A[u]];
            k = ce("td");
            ae(k, t);
            ae(d, k)
        }
        if (!(this.editable && !this.species.untameable)) {
            t = ce("span");
            t.className = "bpet-quality q" + this.quality;
            t.innerHTML = g_item_qualities[this.quality];
            k = ce("td");
            ae(k, t);
            ae(d, k);
            t = ce("span");
            t.className = "bpet-breed tip";
            var h = sprintf(LANG.npc_breedtip, this.breed, battlePetBreedStats[this.breed][0] * 50 + "%", battlePetBreedStats[this.breed][1] * 50 + "%", battlePetBreedStats[this.breed][2] * 50 + "%");
            t.onmouseover = (function(C, i) {
                Tooltip.showAtCursor(i, C, 0, 0, "q")
            }).bind(null, h);
            t.onmousemove = Tooltip.cursorUpdate;
            t.onmouseout = Tooltip.hide;
            t.innerHTML = LANG.breed + " <b>#" + this.breed + (g_pet_breed_abbrev[this.breed] ? (" " + g_pet_breed_abbrev[this.breed]) : "") + "</b>";
            k = ce("td");
            ae(k, t);
            ae(d, k)
        }
        ae(this.table, d);
        ae(this.div, this.table);
        if (this.editable && !this.species.untameable) {
            var c = ce("div");
            setTimeout((function(E) {
                var D = $(E).outerWidth();
                var C = D && D < 472 ? D : 472;
                var i = Slider.init(E, {
                    minValue: this.minLevel,
                    maxValue: this.maxLevel,
                    trackSize: C,
                    handleSize: 9,
                    onMove: this.updateLevel.bind(this)
                });
                Slider.setValue(i, this.level);
                i.onmouseover = function(F) {
                    Tooltip.showAtCursor(F, LANG.tooltip_changelevel2, 0, 0, "q2")
                };
                i.onmousemove = Tooltip.cursorUpdate;
                i.onmouseout = Tooltip.hide;
                i.input.onmouseover = function(F) {
                    Tooltip.showAtCursor(F, LANG.tooltip_changelevel, 0, 0, "q2")
                };
                i.input.onmousemove = Tooltip.cursorUpdate;
                i.input.onmouseout = Tooltip.hide
            }).bind(this, c), 1);
            ae(this.div, c);
            var m = ce("div");
            var l = ce("span");
            l.innerHTML = LANG.quality_colon + " ";
            if (this.unknown.quality) {
                t = ce("span");
                t.className = "unknown tip";
                t.innerHTML = LANG.npc_unknown;
                t.onmouseover = function(i) {
                    Tooltip.showAtCursor(i, LANG.npc_unknownqualitytip, 0, 0, "q")
                };
                t.onmousemove = Tooltip.cursorUpdate;
                t.onmouseout = Tooltip.hide;
                ae(m, t)
            }
            var y = ce("span");
            y.className = "bpet-calc-qualities";
            var q;
            for (var u = this.minQuality; u <= this.maxQuality; ++u) {
                q = ce("b");
                q.className = "q" + u;
                q.rel = u;
                q.innerHTML = g_item_qualities[u];
                if (this.quality == u) {
                    q.className += " active"
                }
                q.onmousedown = function() {
                    return false
                };
                q.onclick = function() {
                    var i = $(this);
                    i.siblings(".active").removeClass("active");
                    i.addClass("active");
                    var C = i.parents(".bpet-calc").parent().attr("id");
                    g_battlepetcalcs[C].quality = i.attr("rel");
                    g_battlepetcalcs[C].updateStats()
                };
                ae(y, q)
            }
            ae(m, l);
            ae(m, y);
            ae(this.div, m);
            var x = ce("div");
            x.className = "breeds-wrapper";
            var e = ce("span");
            e.className = "breed-id-display";
            e.id = this.id + "-breed-id-display";
            ae(x, e);
            var z = ce("div");
            z.innerHTML = LANG.breed_colon + " ";
            if (this.unknown.breeds) {
                t = ce("span");
                t.className = "unknown tip";
                t.innerHTML = LANG.npc_unknown;
                t.onmouseover = function(i) {
                    Tooltip.showAtCursor(i, LANG.npc_unknownbreedtip, 0, 0, "q")
                };
                t.onmousemove = Tooltip.cursorUpdate;
                t.onmouseout = Tooltip.hide;
                ae(x, t)
            }
            e = ce("b");
            e.className = "current-breed-id-display";
            e.id = this.id + "-current-breed-id-display";
            ae(z, e);
            e = ce("label");
            e.innerHTML = "Show breeds not available to this pet";
            var p = ce("input");
            p.type = "checkbox";
            p.onchange = function() {
                var C = $(this);
                var D = C.parent().parent().siblings(".bpet-calc-breeds");
                var i = $("> span", D);
                if (C.is(":checked")) {
                    D.addClass("show-all")
                } else {
                    D.removeClass("show-all")
                }
            };
            aef(e, p);
            ae(z, e);
            var B = ce("div");
            var n = [LANG.health, LANG.power, LANG.speed];
            var o, v, s, w, f, b, j;
            var r = 0;
            for (var u in this.breedOrder) {
                o = this.breedOrder[u];
                e = ce("span");
                e.className = "option";
                $(e).attr("rel", o);
                if (!(this.breeds & (1 << o - 3))) {
                    e.className += " unavailable"
                } else {
                    r++
                }
                if (this.breed == o) {
                    e.className += " active"
                }
                s = ce("table");
                w = ce("tr");
                j = 0;
                v = battlePetBreedStats[o];
                for (var a in v) {
                    if (v[a]) {
                        f = ce("td");
                        b = ce("span");
                        b.className = "bpet-" + n[a].toLowerCase() + "-icon";
                        b.innerHTML = v[a] * 50 + "%";
                        ae(f, b);
                        ae(w, f);
                        j++
                    }
                }
                ae(s, w);
                e.className += " has-col-" + j;
                s.className = "col-" + j;
                ae(e, s);
                ae(B, e);
                $(e).mouseenter(function() {
                    var C = $(this);
                    var D = C.parents(".bpet-calc").parent().attr("id");
                    var i = (g_pet_breed_abbrev[C.attr("rel")] ? (" " + g_pet_breed_abbrev[C.attr("rel")]) : "");
                    clearTimeout(breedFader);
                    $("#" + D + "-breed-id-display").html(LANG.breed + " #" + C.attr("rel") + i).stop().css({
                        display: "block",
                        opacity: 1,
                        visibility: "visible"
                    })
                }).mouseleave(function() {
                    var i = $(this).parents(".bpet-calc").parent().attr("id");
                    breedFader = setTimeout((function(C) {
                        $("#" + C + "-breed-id-display").fadeOut()
                    }).bind(null, i), 500)
                }).click(function() {
                    var C = $(this);
                    var i = C.attr("rel") | 0;
                    var D = C.parents(".bpet-calc").parent().attr("id");
                    g_battlepetcalcs[D].breed = i;
                    g_battlepetcalcs[D].updateStats();
                    $("#" + D + "-breed-display").html(g_battlepetcalcs[D].formatCurrentBreed(g_battlepetcalcs[D].breed));
                    C.parents(".bpet-calc-breeds").removeClass("show");
                    C.siblings(".active").removeClass("active");
                    C.addClass("active")
                })
            }
            B.className = "count-" + r;
            e = ce("span");
            e.className = "clear";
            ae(B, e);
            var g = ce("div");
            g.className = "bpet-calc-breeds";
            ae(g, B);
            ae(x, z);
            ae(x, g);
            ae(this.div, x)
        }
        ae(this.container, this.div);
        this.updateStats();
        if (this.callback != null) {
            this.callback()
        }
    },
    setSpecies: function(d) {
        var b = validateBpet(d, d.bpet),
            a = ["health", "power", "speed"];
        for (var c = 0; c < a.length; c++) {
            this[a[c]] = (d[a[c]] | 0)
        }
        this.minLevel = Math.max((d.minlevel | 0), 1);
        this.maxLevel = Math.min((d.maxlevel | 25), 25);
        this.level = b.level;
        this.minQuality = Math.max((d.minquality | 0), 0);
        this.maxQuality = Math.min((d.maxquality | 3), 4);
        this.quality = b.quality;
        this.unknown.breeds = (!d.breeds || isNaN(d.breeds));
        this.breeds = (d.breeds | 0) & ((1 << 10) - 1);
        this.breed = b.breed
    },
    formatCurrentBreed: function(c) {
        var f = battlePetBreedStats[c];
        var e = ce("span");
        e.innerHTML = "test";
        var d;
        var b = ["health", "power", "speed"];
        for (var a in b) {
            if (f[a]) {
                d = ce("span");
                d.className = "bpet-" + b[a] + "-icon";
                d.innerHTML = f[a] * 10;
                ae(e, d)
            }
        }
        return e
    },
    updateLevel: function(d, c, b) {
        var a = b.value;
        if (this.level != a) {
            this.level = a
        }
        this.updateStats();
        Tooltip.hide()
    },
    getStats: function() {
        return calcBattlePetStats(this.species, this.breed, this.quality, this.level, this.species.elite)
    },
    updateStats: function() {
        var a = this.getStats();
        a.level = LANG.level + " " + this.level;
        if (this.species.elite) {
            a.level += "<br><small>" + g_npc_classifications[1] + "</small>"
        }
        $("#" + this.id + "-current-breed-id-display").html("#" + this.breed + (g_pet_breed_abbrev[this.breed] ? (" " + g_pet_breed_abbrev[this.breed]) : ""));
        var c = $("#" + this.id + " > div > table");
        for (var b in a) {
            $(".bpet-" + b + "-icon", c).html(a[b])
        }
        if (this.onChange) {
            this.onChange({
                level: this.level,
                quality: this.quality,
                breed: this.breed
            }, this)
        }
    }
};

var validateBpet = function (species, d) {
    var a = 1, h = 25, k = 25, b = 0, f = 4, e = 3, l = (1 << 10) - 1, c = 3, g = $.extend({}, d);
    if (species.minlevel) {
        a = species.minlevel
    }
    if (species.maxlevel) {
        h = species.maxlevel
    }
    if (species.companion) {
        h = a
    }
    if (!g.level) {
        g.level = k
    }
    g.level = Math.min(Math.max(g.level, a), h);
    if (species.minquality) {
        b = species.minquality;
        if (species.untameable) {
            f = b
        }
    }
    if (species.maxquality) {
        f = species.maxquality
    }
    if (g.quality == null) {
        g.quality = e
    }
    g.quality = Math.min(Math.max(g.quality, b), f);
    if (species.companion) {
        delete (g.quality)
    }
    if (species.breeds > 0) {
        l = species.breeds & l
    }
    if (!(l & (1 << c - 3))) {
        c = Math.floor(3 + Math.log(l) / Math.LN2)
    }
    if (g.breed && g.breed >= 13) {
        g.breed -= 10
    }
    if (!g.breed || !(l & (1 << g.breed - 3))) {
        g.breed = c
    }
    return g
};

var calcBattlePetStats = function (species, breedID, quality, level, isElite) {
    if (!battlePetBreedStats[breedID]) {
        breedID = 3
    }
    var health = species.health;
    if (isNaN(health)) {
        health = 0
    }
    var power = species.power;
    if (isNaN(power)) {
        power = 0
    }
    var speed = species.speed;
    if (isNaN(speed)) {
        speed = 0
    }
    if (isNaN(quality)) {
        quality = 1
    }
    quality = Math.min(Math.max(0, quality), 5);
    if (isNaN(level)) {
        level = 1
    }
    level = Math.min(Math.max(1, level), 25);
    var stats = battlePetBreedStats[breedID];
    var factor = 1 + (quality / 10);
    health = ((health + stats[0]) * 5 * level * factor) + 100;
    power = (power + stats[1]) * level * factor;
    speed = (speed + stats[2]) * level * factor;
    if (isElite) {
        health = health * 5 / 6;
        power = power * 4 / 5
    }
    return {health: Math.round(health), power: Math.round(power), speed: Math.round(speed)}
};
var battlePetBreedStats = {
    3: [0.5, 0.5, 0.5],
    4: [0, 2, 0],
    5: [0, 0, 2],
    6: [2, 0, 0],
    7: [0.9, 0.9, 0],
    8: [0, 0.9, 0.9],
    9: [0.9, 0, 0.9],
    10: [0.4, 0.9, 0.4],
    11: [0.4, 0.4, 0.9],
    12: [0.9, 0.4, 0.4]
};
var battlePetAbilityLevels = [1, 2, 4, 10, 15, 20];

var Slider = new function() {
    var c, q, m;

    function p(s) {
        s = normalizeEvent(s);
        q = this;
        c = getCursorPos(s);
        aE(document, "mousemove", f);
        aE(document, "mouseup", l);
        return false
    }

    function f(u) {
        u = normalizeEvent(u);
        if (!c || !q) {
            return
        }
        var v = getCursorPos(u),
            w = v[q._dir] - c[q._dir],
            t = r(q, q._pos + w),
            s = b(q);
        if (s && q.input) {
            q.input.value = s.value
        }
        if (!t) {
            c = v
        }
        if (q.onMove) {
            q.onMove(u, q, s)
        }
    }

    function l(s) {
        s = normalizeEvent(s);
        if (q.onMove) {
            q.onMove(s, q, b(q))
        }
        q = null;
        c = null;
        dE(document, "mousemove", f);
        dE(document, "mouseup", l);
        return false
    }

    function o(v, u) {
        u = normalizeEvent(u);
        q = v;
        c = getCursorPos(u);
        var w = ac(q.parentNode),
            t = Math.floor(g(q) / 2);
        r(q, c[q._dir] - w[q._dir] - t);
        var s = b(q);
        if (s && q.input) {
            q.input.value = s.value
        }
        if (q.onMove) {
            q.onMove(u, q, s)
        }
        aE(document, "mousemove", f);
        aE(document, "mouseup", l);
        return false
    }

    function k(t, s) {
        if (m) {
            clearTimeout(m)
        }
        if (s.type == "change" || s.type == "keypress" && s.which == 13) {
            n(t, s)
        } else {
            m = setTimeout(n.bind(0, t, s), 1000)
        }
    }

    function n(v, u) {
        var t = v.input.value,
            s = b(v);
        if (isNaN(t)) {
            t = s.value
        }
        if (t > v._max) {
            t = v._max
        }
        if (t < v._min) {
            t = v._min
        }
        Slider.setValue(v, t);
        if (v.onMove) {
            v.onMove(u, v, b(v))
        }
    }

    function r(u, v) {
        var t = false;
        var s = j(u);
        if (v < 0) {
            v = 0;
            t = true
        } else {
            if (v > s) {
                v = s;
                t = true
            }
        }
        u.style[(u._dir == "y" ? "top" : "left")] = "calc(" + (parseInt(v) / s * 100) + "% - " + parseInt(g(u) / 2) + "px)";
        u._pos = v;
        return t
    }

    function j(s) {
        return h(s) - g(s) + 2
    }

    function b(v) {
        var t = v._pos / j(v),
            u = Math.round((t * (v._max - v._min)) + v._min),
            s = [t, u];
        s.percent = t;
        s.value = u;
        return s
    }

    function h(s) {
        if (s._tsz > 0) {
            return s._tsz
        }
        if (s._dir == "y") {
            return s.parentNode.offsetHeight
        }
        return s.parentNode.offsetWidth
    }

    function g(s) {
        if (s._hsz > 0) {
            return s._hsz
        }
        if (s._dir == "y") {
            return s.offsetHeight
        }
        return s.offsetWidth
    }
    this.setPercent = function(t, s) {
        r(t, s * j(t))
    };
    this.setValue = function(t, s) {
        if (s < t._min) {
            s = t._min
        } else {
            if (s > t._max) {
                s = t._max
            }
        }
        if (t.input) {
            t.input.value = s
        }
        this.setPercent(t, (s - t._min) / (t._max - t._min))
    };
    this.setSize = function(v, t) {
        var u = b(v),
            s = j(v);
        v.parentNode.style[(v._dir == "y" ? "height" : "width")] = t + "px";
        if (s != j(v)) {
            this.setValue(v, u.value)
        }
    };
    this.init = function(t, v) {
        var w = ce("a");
        w.href = "javascript:;";
        w.onmousedown = p;
        w.className = "handle";
        var s = ce("a");
        s.href = "javascript:;";
        s.onmousedown = o.bind(0, w);
        s.className = "track";
        ae(t, ce("span"));
        ae(t, s);
        ae(t, w);
        w._dir = "x";
        w._min = 1;
        w._max = 100;
        w._pos = 0;
        w._tsz = 0;
        w._hsz = 0;
        if (v != null) {
            if (v.direction == "y") {
                w._dir = "y"
            }
            if (v.minValue) {
                w._min = v.minValue
            }
            if (v.maxValue) {
                w._max = v.maxValue
            }
            if (v.onMove) {
                w.onMove = v.onMove
            }
            if (v.trackSize) {
                w._tsz = v.trackSize
            }
            if (v.handleSize) {
                w._hsz = v.handleSize
            }
            if (v.showLabels !== false) {
                var u = ce("div");
                u.innerHTML = w._min;
                u.className = "label min";
                ae(t, u);
                u = ce("div");
                u.innerHTML = w._max;
                u.className = "label max";
                ae(t, u);
                w.input = ce("input");
                $(w.input).attr({
                    value: w._max,
                    type: "text"
                }).bind("click", function() {
                    this.select()
                }).keypress(function(A) {
                    var y = [];
                    var z = A.which;
                    for (i = 48; i < 58; i++) {
                        y.push(i)
                    }
                    if (!(inArray(y, z) >= 0) && z != 13) {
                        A.preventDefault()
                    }
                }).bind("keyup keydown change", k.bind(0, w));
                w.input.className = "input";
                ae(t, w.input)
            }
        }
        t.className = "slider-" + w._dir + (v == null || v.showLabels !== false ? " has-labels" : "");
        return w
    }
};

var normalizeEvent = function (a) {
    if (!a) {
        if (typeof window.event != "undefined") {
            a = window.event
        } else {
            return null
        }
    }
    if (a.which) {
        a._button = a.which
    } else {
        a._button = a.button;
        if (Browser.ie6789 && a._button) {
            if (a._button & 4) {
                a._button = 2
            } else {
                if (a._button & 2) {
                    a._button = 3
                }
            }
        } else {
            a._button = a.button + 1
        }
    }
    a._target = a.target || a.srcElement;
    a._wheelDelta = a.wheelDelta || -a.detail;
    return a
};

var getCursorPos = function (c) {
    var b, d;
    if (window.innerHeight) {
        b = c.pageX;
        d = c.pageY
    } else {
        var a = WH.getScroll();
        b = c.clientX + a.x;
        d = c.clientY + a.y
    }
    return {x: b, y: d}
};

function BattlePetAbilityScaling(b) {
    cO(this, b);
    if (this.id) {
        var a = this.id;
        if (this.parent) {
            var c = ce("div");
            c.id = a;
            ae(ge(this.parent), c);
            this.container = c
        } else {
            this.container = ge(a)
        }
    } else {
        return
    }
    this.breedOrder = [6, 4, 5, 7, 8, 9, 12, 10, 11, 3];
    this.initialize()
}

BattlePetAbilityScaling.prototype = {
    initialize: function () {
        this.currentLevel = 25;
        this.currentQuality = 3;
        this.currentBreed = 3;
        this.allSpecies = this.species;
        this.currentSpecies = this.allSpecies[0];
        if (this.species.length == 0) {
            this.updateTooltip();
            return
        }
        var u;
        var g = this;
        this.div = ce("div");
        this.div.className = "bpet-calc";
        var h = ce("div");
        h.className = "species-wrapper";
        this.speciesTxt = ce("div");
        $(this.speciesTxt).click(function (i) {
            i.preventDefault();
            Lightbox.show("speciesPicker", {onShow: g._speciesPickerOnShow.bind(g)})
        });
        ae(h, this.speciesTxt);
        ae(this.div, h);
        this.levelSliderDiv = ce("div");
        ae(this.div, this.levelSliderDiv);
        var k = ce("div");
        var j = ce("span");
        j.innerHTML = LANG.quality_colon + " ";
        this.qualityOptions = ce("span");
        this.qualityOptions.className = "bpet-calc-qualities";
        var n;
        for (var p = 0; p <= 4; ++p) {
            n = ce("b");
            n.className = "q" + p;
            n.rel = p;
            n.innerHTML = g_item_qualities[p];
            n.onmousedown = function () {
                return false
            };
            n.onclick = function () {
                var i = $(this);
                i.siblings(".active").removeClass("active");
                i.addClass("active");
                var v = i.parents(".bpet-calc").parent().attr("id");
                g.currentQuality = parseInt(i.attr("rel"));
                g.updateTooltip()
            };
            ae(this.qualityOptions, n)
        }
        ae(k, j);
        ae(k, this.qualityOptions);
        ae(this.div, k);
        var r = ce("div");
        r.className = "breeds-wrapper";
        var c = ce("span");
        c.className = "breed-id-display";
        c.id = this.id + "-breed-id-display";
        ae(r, c);
        var t = ce("div");
        t.innerHTML = LANG.breed_colon + " ";
        c = ce("b");
        c.className = "current-breed-id-display";
        c.id = this.id + "-current-breed-id-display";
        ae(t, c);
        this.breedsOptionsInner = ce("div");
        var l = [LANG.health, LANG.power, LANG.speed];
        var m, q, o, s, d, b, f;
        this.breedOptions = [];
        for (var p in this.breedOrder) {
            m = this.breedOrder[p];
            this.breedOptions[p] = ce("span");
            $(this.breedOptions[p]).attr("rel", m);
            o = ce("table");
            s = ce("tr");
            f = 0;
            q = battlePetBreedStats[m];
            for (var a in q) {
                if (q[a]) {
                    d = ce("td");
                    b = ce("span");
                    b.className = "bpet-" + l[a].toLowerCase() + "-icon";
                    b.innerHTML = q[a] * 50 + "%";
                    ae(d, b);
                    ae(s, d);
                    f++
                }
            }
            ae(o, s);
            o.className = "col-" + f;
            ae(this.breedOptions[p], o);
            ae(this.breedsOptionsInner, this.breedOptions[p]);
            $(this.breedOptions[p]).mouseenter(function () {
                var v = $(this);
                var w = v.parents(".bpet-calc").parent().attr("id");
                var i = (g_pet_breed_abbrev[v.attr("rel")] ? (" " + g_pet_breed_abbrev[v.attr("rel")]) : "");
                clearTimeout(u);
                $("#" + w + "-breed-id-display").html(LANG.breed + " #" + v.attr("rel") + i).stop().css({
                    display: "block",
                    opacity: 1,
                    visibility: "visible"
                })
            }).mouseleave(function () {
                var i = $(this).parents(".bpet-calc").parent().attr("id");
                u = setTimeout((function (v) {
                    $("#" + v + "-breed-id-display").fadeOut()
                }).bind(null, i), 500)
            }).click(function () {
                var v = $(this);
                var i = v.attr("rel") | 0;
                var w = v.parents(".bpet-calc").parent().attr("id");
                g.currentBreed = i;
                g.updateBreed();
                v.parents(".bpet-calc-breeds").removeClass("show");
                v.siblings(".active").removeClass("active");
                v.addClass("active")
            })
        }
        c = ce("span");
        c.className = "clear";
        ae(this.breedsOptionsInner, c);
        var e = ce("div");
        e.className = "bpet-calc-breeds";
        ae(e, this.breedsOptionsInner);
        ae(r, t);
        ae(r, e);
        ae(this.div, r);
        ae(this.container, this.div);
        this.updateSpecies();
        if (this.callback != null) {
            this.callback()
        }
    }, _speciesPickerOnShow: function (c, j, g) {
        Lightbox.setSize(800, 564);
        var i;
        if (j) {
            c.className += " " + this.id + "-speciespicker";
            var f = [], h = ce("div"), b = ce("a");
            for (var e in this.allSpecies) {
                f.push({species: this.allSpecies[e], scaler: this})
            }
            h.className = "lightbox-content listview";
            ae(c, h);
            b.className = "dialog-x fa fa-times";
            b.href = "javascript:;";
            b.onclick = Lightbox.hide;
            ae(b, ct(LANG.close));
            ae(c, b);
            i = new Listview({template: "speciespicker", id: "species", parent: h, data: f});
            if (Browser.firefox) {
                aE(i.getClipDiv(), "DOMMouseScroll", pickerWheel)
            } else {
                i.getClipDiv().onmousewheel = pickerWheel
            }
        } else {
            i = g_listviews.species;
            if (i.searchable) {
                i.clearSearch()
            }
            i.updateFilters(true)
        }
        setTimeout(function () {
            if (i.searchable) {
                i.focusSearch()
            }
        }, 1)
    }, updateSpecies: function () {
        var e = this.currentSpecies.npc ? this.currentSpecies.npc.id : null;
        this.speciesTxt.innerHTML = LANG.showingvaluesforspecies + sprintf(" $1$2$3", e != null ? ('<a href="?npc=' + e + '">') : "", (this.currentSpecies.npc ? this.currentSpecies.npc.name : this.currentSpecies.name), e != null ? "</a>" : "");
        var f = Math.max(this.currentSpecies.minlevel || 1, 1);
        var a = Math.min(this.currentSpecies.maxlevel || 25, 25);
        $(this.levelSliderDiv).html("");
        $(this.levelSliderDiv).removeClass();
        if (f < a) {
            this.levelSlider = Slider.init(this.levelSliderDiv, {
                minValue: f,
                maxValue: a,
                trackSize: 472,
                handleSize: 9,
                onMove: this.updateLevel.bind(this)
            });
            Slider.setValue(this.levelSlider, a);
            this.levelSlider.onmouseover = function (g) {
                Tooltip.showAtCursor(g, LANG.tooltip_changelevel2, 0, 0, "q2")
            };
            this.levelSlider.onmousemove = Tooltip.cursorUpdate;
            this.levelSlider.onmouseout = Tooltip.hide;
            this.levelSlider.input.onmouseover = function (g) {
                Tooltip.showAtCursor(g, LANG.tooltip_changelevel, 0, 0, "q2")
            };
            this.levelSlider.input.onmousemove = Tooltip.cursorUpdate;
            this.levelSlider.input.onmouseout = Tooltip.hide
        }
        var d = Math.max(this.currentSpecies.minquality || 0, 0);
        var c = Math.min(this.currentSpecies.maxquality || 3, 4);
        if (this.currentSpecies.untameable) {
            c = d
        }
        $(this.qualityOptions).find("b").each(function (g) {
            if (c == g) {
                $(this).addClass("active")
            } else {
                $(this).removeClass("active")
            }
            if (g < d || g > c) {
                $(this).css("display", "none")
            } else {
                $(this).css("display", "inline")
            }
        });
        var b = validateBpet(this.currentSpecies, this.currentSpecies.bpet);
        this.currentBreed = b.breed;
        this.updateAvailableBreeds();
        this.updateBreed()
    }, updateAvailableBreeds: function () {
        var c = 0;
        for (var b in this.breedOrder) {
            var a = this.breedOrder[b];
            this.breedOptions[b].className = "option";
            if (!(this.currentSpecies.breeds & (1 << a - 3))) {
                this.breedOptions[b].className += " unavailable"
            } else {
                c++
            }
            if (this.currentBreed == a) {
                this.breedOptions[b].className += " active"
            }
        }
        this.breedsOptionsInner.className = "count-" + c
    }, updateBreed: function () {
        $("#" + this.id + "-current-breed-id-display").html("#" + this.currentBreed + (g_pet_breed_abbrev[this.currentBreed] ? (" " + g_pet_breed_abbrev[this.currentBreed]) : ""));
        this.updateTooltip()
    }, updateLevel: function (d, c, b) {
        var a = b.value;
        if (this.currentLevel != a) {
            this.currentLevel = a
        }
        this.updateTooltip();
        Tooltip.hide()
    }, getUnitPower: function () {
        return calcBattlePetStats(this.currentSpecies, this.currentBreed, this.currentQuality, this.currentLevel).power
    }, updateTooltip: function () {
        var b = 0;
        if (typeof this.currentSpecies != "undefined") {
            b = this.getUnitPower()
        }
        var c = g_petabilities[this.abilityId]["tooltip_" + Locale.getName()];
        c = c.replace(/<!--sca-->(\d+)/g, function (d, e) {
            return "<!--sca-->" + Math.floor(e * (1 + 0.05 * b))
        });
        $(this.tooltipDiv).html("<table><tr><td>" + c + '</td><th style="background-position: top right"></th></tr><tr><th style="background-position: bottom left"></th><th style="background-position: bottom right"></th></tr></table>');
        Tooltip.fixSafe(this.tooltipDiv, 1, 1);
        var a = g_petabilities[this.abilityId]["buff_" + Locale.getName()];
        a = a.replace(/<!--sca-->(\d+)/g, function (d, e) {
            return "<!--sca-->" + Math.floor(e * (1 + 0.05 * b))
        });
        $(this.buffDiv).html("<table><tr><td>" + a + '</td><th style="background-position: top right"></th></tr><tr><th style="background-position: bottom left"></th><th style="background-position: bottom right"></th></tr></table>');
        Tooltip.fixSafe(this.buffDiv, 1, 1)
    }
};

var pickerWheel = function(b) {
    b = normalizeEvent(b);
    if (b._wheelDelta < 0) {
        this.scrollTop += 27
    } else {
        this.scrollTop -= 27
    }
};

Listview.templates.speciespicker = {
    sort: [1],
    nItemsPerPage: -1,
    hideBands: 2,
    hideNav: 1 | 2,
    hideHeader: 1,
    searchable: 1,
    searchDelay: 100,
    poundable: 0,
    filtrable: 0,
    clip: {w: 780, h: 486},
    onBeforeCreate: function () {
        this.applySort()
    },
    onSearchSubmit: function (a) {
        if (this.nRowsVisible != 1) {
            return
        }
        a.scaler.currentSpecies = a.species;
        a.scaler.updateSpecies();
        Lightbox.hide()
    },
    columns: [{
        id: "name", name: LANG.name, type: "text", align: "left", span: 2, compute: function (g, e, m) {
            var q = g.species;
            var k = validateBpet(q, q.bpet), j = calcBattlePetStats(q, k.breed, k.quality, k.level, q.elite);
            var h = ce("td");
            h.style.width = "1px";
            h.style.paddingRight = "0";
            h.style.borderRight = "none";
            var n = Icon.create(q.icon, 0, null, "?npc=" + (g.species.npc ? g.species.npc.id : g.species.id));
            var f = Icon.getLink(n);
            f.onclick = rf;
            ae(h, n);
            ae(m, h);
            e.style.borderLeft = "none";
            if (q.elite) {
                e.className = "icon-boss-padded"
            }
            var b = ce("div");
            b.className = "expanded-pet-view-wrapper";
            var p = ce("span");
            var o = ce("a");
            o.href = "?npc=" + (g.species.npc ? g.species.npc.id : g.species.id);
            o.className = "q" + k.quality + " listview-cleartext";
            ae(o, ct(g.species.npc ? g.species.npc.name : g.species.name));
            ae(p, o);
            if (q.expansion) {
                var c = ce("span");
                c.className = getExpansionClassName(q.expansion);
                ae(c, p);
                ae(b, c)
            } else {
                ae(b, p)
            }
            if (q.untameable) {
                b.style.position = "relative";
                var l = ce("div");
                l.className = "small q10";
                l.style.fontStyle = "italic";
                l.style.position = "absolute";
                l.style.right = "3px";
                l.style.bottom = "0px";
                ae(l, ct(LANG.lvspecies_untameable));
                ae(b, l)
            } else {
                if (q.companion) {
                    b.style.position = "relative";
                    var l = ce("div");
                    l.className = "small q1";
                    l.style.fontStyle = "italic";
                    l.style.position = "absolute";
                    l.style.right = "3px";
                    l.style.bottom = "0px";
                    ae(l, ct(LANG.lvspecies_companion));
                    ae(b, l)
                }
            }
            ae(e, b);
            $(m).click(function (a) {
                if (a.which != 2 || a.target != o) {
                    a.preventDefault();
                    g.scaler.currentSpecies = g.species;
                    g.scaler.updateSpecies();
                    Lightbox.hide()
                }
            })
        }, getVisibleText: function (b) {
            var a = b.species;
            var c = a.npc ? a.npc.name : a.name + Listview.funcBox.getExpansionText(a);
            if (a.companion) {
                c += " " + LANG.lvspecies_companion
            }
            if (a.untameable) {
                c += " " + LANG.lvspecies_untameable
            }
            if (a.elite) {
                c += " " + LANG.lvspecies_elite
            }
            return c
        }, sortFunc: function (d, c, e) {
            return stringCompare(d.species.npc ? d.species.npc.name : d.species.name, c.species.npc ? c.species.npc.name : c.species.name)
        }
    }, {
        id: "level", name: LANG.level, type: "text", align: "center", value: "level", compute: function (b, d) {
            var a = validateBpet(b.species, b.species.bpet);
            if (b.species.elite) {
                ae(d, ct(a.level));
                var c = ce("div");
                c.className = "small";
                c.innerHTML = LANG.lvspecies_elite;
                ae(d, c);
                return
            }
            return a.level
        }
    }]
};

Listview.templates["pet-species-gallery"] = {
    sort: [1],
    mode: 3,
    nItemsPerPage: 40,
    nItemsPerRow: 4,
    searchable: 1,
    poundable: 1,
    sortOptions: [{
        id: "name",
        name: LANG.name,
        type: "text",
        sortFunc: function(f, c) {
            return stringCompare(f.name, c.name)
        }
    }, {
        id: "level",
        name: LANG.level,
        getValue: function(c) {
            var b = validateBpet(c, c.bpet);
            return b.level
        },
        sortFunc: function(f, c) {
            var h = validateBpet(f, f.bpet);
            var g = validateBpet(c, c.bpet);
            return stringCompare(h.level, g.level)
        }
    }, {
        id: "health",
        name: LANG.health,
        getValue: function(f) {
            var b = validateBpet(f, f.bpet),
                c = calcBattlePetStats(f, b.breed, b.quality, b.level, f.elite);
            return c.health
        },
        sortFunc: function(f, c) {
            var k = validateBpet(f, f.bpet);
            var j = validateBpet(c, c.bpet);
            var h = calcBattlePetStats(f, k.breed, k.quality, k.level, f.elite);
            var g = calcBattlePetStats(c, j.breed, j.quality, j.level, c.elite);
            return stringCompare(h.health, g.health)
        }
    }, {
        id: "power",
        name: LANG.power,
        getValue: function(f) {
            var b = validateBpet(f, f.bpet),
                c = calcBattlePetStats(f, b.breed, b.quality, b.level, f.elite);
            return c.power
        },
        sortFunc: function(f, c) {
            var k = validateBpet(f, f.bpet);
            var j = validateBpet(c, c.bpet);
            var h = calcBattlePetStats(f, k.breed, k.quality, k.level, f.elite);
            var g = calcBattlePetStats(c, j.breed, j.quality, j.level, c.elite);
            return stringCompare(h.power, g.power)
        }
    }, {
        id: "speed",
        name: LANG.speed,
        getValue: function(f) {
            var b = validateBpet(f, f.bpet),
                c = calcBattlePetStats(f, b.breed, b.quality, b.level, f.elite);
            return c.speed
        },
        sortFunc: function(f, c) {
            var k = validateBpet(f, f.bpet);
            var j = validateBpet(c, c.bpet);
            var h = calcBattlePetStats(f, k.breed, k.quality, k.level, f.elite);
            var g = calcBattlePetStats(c, j.breed, j.quality, j.level, c.elite);
            return stringCompare(h.speed, g.speed)
        }
    }, {
        id: "breeds",
        name: LANG.breed,
        getValue: function(c) {
            var b = validateBpet(c, c.bpet);
            return b.breed
        },
        sortFunc: function(f, c) {
            var h = validateBpet(f, f.bpet);
            var g = validateBpet(c, c.bpet);
            return stringCompare(h.breed, g.breed)
        }
    }, {
        id: "abilities",
        name: LANG.abilities,
        type: "text",
        sortFunc: function(f, c) {
            var g = f.abilities ? f.abilities.length : 0;
            var h = c.abilities ? c.abilities.length : 0;
            return stringCompare(g, h)
        }
    }, {
        id: "source",
        name: LANG.source,
        type: "text",
        sortFunc: function(f, c) {
            return stringCompare(g_battlepet_sources[f.category], g_battlepet_sources[c.category])
        }
    }, {
        id: "type",
        name: LANG.type,
        type: "text",
        sortFunc: function(f, c, g) {
            return stringCompare(g_battlepetability_types[f.type], g_battlepetability_types[c.type])
        }
    }, {
        id: "completed",
        name: LANG.completion,
        type: "text",
        hidden: true,
        sortFunc: function(f, c, g) {
            return stringCompare(this._speciesDoneFlags(f.npc.id), this._speciesDoneFlags(c.npc.id))
        },
        _speciesDoneFlags: function(b) {
            return getCompletionFlags("npc", b)
        }
    }],
    columns: [{
        value: "name",
        sortFunc: function(f, c) {
            return Listview.templates.petspeciesgallery.sortFunc(f, c)
        }
    }],
    compute: function(l, k, r) {
        k.className = "bpet-listview-cell";
        k.vAlign = "bottom";
        var o = validateBpet(l, l.bpet),
            t = calcBattlePetStats(l, o.breed, o.quality, o.level, l.elite);
        var h = ce("div");
        h.className = "cell-wrapper";
        if (this.createModifyButton) {
            var s = ce("a");
            s.href = "javascript:;";
            s.className = "modify-cell icon-edit";
            s.innerHTML = LANG.li_menu_modify;
            ae(h, this.createModifyButton(l, s))
        }
        var p = ce("div");
        p.className = "preview-wrapper";
        if (l.compare) {
            ae(p, Listview.funcBox.getComparisonText(l.compare, this.completionMode, this.dataSource, this.completionText))
        }
        var j = ce("div");
        j.className = "expand-wrapper expanded-pet-view-wrapper";
        var v = ce("img");
        v.src = g_staticUrl + "/npc/" + (l.model + "")[0] + "/creature-display-" + l.model + ".jpg";
        v.height = v.width = 150;
        v.onerror = function() {
            v.src = g_staticUrl + "/npc/3/creature-display-31096.jpg";
        };
        ae(j, v);
        if (l.elite || l.untameable || l.companion) {
            var n = "untameable";
            if (l.companion) {
                n = "companion"
            }
            var q = ce("span");
            q.className = "banner";
            q.style.backgroundImage = "url(images/pets/banner-" + n + ".png)";
            ae(j, q)
        }
        if (g_battlepetability_types[l.type] && l.npc) {
            Listview.funcBox.addBattlePetExpandedView.call(this, j, l, o, t)
        }
        ae(p, j);
        if (this.showSideData && l.npc) {
            var m = {
                family: l.type
            };
            if (!l.companion) {
                m.breed = "#" + o.breed;
                m.level = LANG.lvspecies_sidelevel + o.level;
                m.health = t.health;
                m.power = t.power;
                m.speed = t.speed
            }
            if (!$.isEmptyObject(m)) {
                var b = ce("div");
                var g = ce("div");
                b.className = "side-left";
                g.className = "side-right";
                var f = 0;
                for (var r in m) {
                    f++;
                    q = ce("span");
                    q.className = "side-" + r;
                    if (r == "family") {
                        var c = g_battlepetability_types[m[r]] + (l.companion ? " " + LANG.lvspecies_companion : "");
                        q.style.backgroundPosition = ((m[r] - 1) * -16) + "px 0"
                    } else {
                        if (r == "breed") {
                            var c = sprintf(LANG.lvspecies_breedtip, o.breed, battlePetBreedStats[o.breed][0] * 50 + "%", battlePetBreedStats[o.breed][1] * 50 + "%", battlePetBreedStats[o.breed][2] * 50 + "%");
                            q.className += " tip";
                            q.innerHTML = m[r]
                        } else {
                            var c = LANG[r];
                            q.innerHTML = m[r]
                        }
                    }
                    q.onmouseover = (function(y, w) {
                        Tooltip.showAtCursor(w, y, 0, 0, "q")
                    }).bind(null, c);
                    q.onmousemove = Tooltip.cursorUpdate;
                    q.onmouseout = Tooltip.hide;
                    ae(f > 3 ? g : b, q)
                }
                ae(p, b);
                ae(p, g)
            }
        }
        ae(h, p);
        var u = ce("div");
        u.className = "name";
        if (l.elite) {
            v = ce("img");
            v.src = "images/icons/boss.gif";
            v.height = 16;
            v.width = 12;
            v.style.verticalAlign = "middle";
            v.onmouseover = function(w) {
                Tooltip.showAtCursor(w, LANG.lvspecies_elite, 0, 0, "q")
            };
            v.onmousemove = Tooltip.cursorUpdate;
            v.onmouseout = Tooltip.hide;
            ae(u, v);
            ae(u, ct(" "))
        }
        s = ce("a");
        s.href = this.getItemLink(l);
        s.className = "q" + o.quality;
        s.innerHTML = l.name;
        ae(u, s);
        ae(h, u);
        ae(k, h)
    },
    getVisibleText: function(f) {
        var g = f.name;
        if (g_battlepetability_types[f.type] && f.npc) {
            g += " " + g_battlepetability_types[f.type] + " " + f.npc.name
        }
        if (f.companion) {
            g += " " + LANG.lvspecies_companion
        }
        if (f.untameable) {
            g += " " + LANG.lvspecies_untameable
        }
        if (f.elite) {
            g += " " + LANG.lvspecies_elite
        }
        if (!f.abilities) {
            return g
        }
        for (var c = 0, b = f.abilities.length; c < b; ++c) {
            if (g_petabilities[f.abilities[c]]) {
                g += " " + g_petabilities[f.abilities[c]]["name_" + Locale.getName()]
            }
        }
        return g
    },
    sortFunc: function(f, c) {
        return stringCompare(f.name, c.name)
    },
    getItemLink: function(b) {
        return "?npc=" + (b.npc ? b.npc.id : b.id)
    }
};
Listview.templates.petspeciesgallery = Listview.templates["pet-species-gallery"];
Listview.templates["pet-species"] = {
    sort: [1],
    mode: 1,
    nItemsPerPage: 100,
    searchable: 1,
    filtrable: 1,
    completionText: LANG.lvcompletion_battlepet,
    columns: [{
        id: "name",
        name: LANG.name,
        type: "text",
        align: "left",
        span: 2,
        compute: function(o, f, l) {
            var j = validateBpet(o, o.bpet),
                h = calcBattlePetStats(o, j.breed, j.quality, j.level, o.elite);
            var g = ce("td");
            g.style.width = "1px";
            g.style.padding = "3px 0 3px 3px";
            g.style.borderRight = "none";
            ae(g, Icon.create(o.icon, 1, null, this.getItemLink(o)));
            ae(l, g);
            f.style.borderLeft = "none";
            if (o.elite) {
                f.className = "icon-boss-padded"
            }
            var b = ce("div");
            b.className = "expanded-pet-view-wrapper";
            var n = ce("span");
            var m = ce("a");
            m.className = "q" + j.quality + " listview-cleartext";
            m.href = this.getItemLink(o);
            if (o.name && o.name != o.npc.name) {
                ae(m, ct(o.name + " <" + o.npc.name + ">"))
            } else {
                ae(m, ct(o.npc.name))
            }
            ae(n, m);
            if (o.expansion) {
                var c = ce("span");
                c.className = getExpansionClassName(o.expansion);
                ae(c, n);
                ae(b, c)
            } else {
                ae(b, n)
            }
            if (o.untameable) {
                var k = ce("div");
                k.className = "listview-name-info q10";
                ae(k, ct(LANG.lvspecies_untameable));
                aef(b, k)
            } else {
                if (o.companion) {
                    var k = ce("div");
                    k.className = "listview-name-info q1";
                    ae(k, ct(LANG.lvspecies_companion));
                    aef(b, k)
                }
            }
            if (j.hasOwnProperty("team") && j.team) {
                var k = ce("div");
                k.className = "listview-name-info fa fa-users";
                Tooltip.simple(k, LANG.filters_pet_abilities.team);
                aef(b, k)
            }
            if (j.hasOwnProperty("favorite") && j.favorite) {
                var k = ce("div");
                k.className = "listview-name-info fa fa-star";
                Tooltip.simple(k, LANG.favorite);
                aef(b, k)
            }
            ae(f, b)
        },
        getVisibleText: function(b) {
            var c = "";
            if (b.name && b.name != b.npc.name) {
                c += b.name + " <" + b.npc.name + ">"
            } else {
                c += b.npc.name
            }
            c += Listview.funcBox.getExpansionText(b);
            if (b.companion) {
                c += " " + LANG.lvspecies_companion
            }
            if (b.untameable) {
                c += " " + LANG.lvspecies_untameable
            }
            if (b.elite) {
                c += " " + LANG.lvspecies_elite
            }
            return c
        },
        sortFunc: function(f, c) {
            return stringCompare(f.name, c.name) || stringCompare(f.npc.name, c.npc.name)
        }
    }, {
        id: "level",
        name: LANG.level,
        getValue: function(c) {
            var b = validateBpet(c, c.bpet);
            return b.level
        },
        compute: function(c, g) {
            var b = validateBpet(c, c.bpet);
            if (c.elite) {
                ae(g, ct(b.level));
                var f = ce("div");
                f.className = "small";
                f.innerHTML = LANG.lvspecies_elite;
                ae(g, f);
                return
            }
            return b.level
        },
        sortFunc: function(f, c) {
            var h = validateBpet(f, f.bpet);
            var g = validateBpet(c, c.bpet);
            return stringCompare(h.level, g.level)
        }
    }, {
        id: "health",
        name: LANG.health,
        getValue: function(f) {
            var b = validateBpet(f, f.bpet),
                c = calcBattlePetStats(f, b.breed, b.quality, b.level, f.elite);
            return c.health
        },
        compute: function(f, g) {
            if (f.companion) {
                return
            }
            var b = validateBpet(f, f.bpet),
                c = calcBattlePetStats(f, b.breed, b.quality, b.level, f.elite);
            return c.health
        },
        sortFunc: function(f, c) {
            var k = validateBpet(f, f.bpet);
            var j = validateBpet(c, c.bpet);
            var h = calcBattlePetStats(f, k.breed, k.quality, k.level, f.elite);
            var g = calcBattlePetStats(c, j.breed, j.quality, j.level, c.elite);
            return stringCompare(h.health, g.health)
        }
    }, {
        id: "power",
        name: LANG.power,
        getValue: function(f) {
            var b = validateBpet(f, f.bpet),
                c = calcBattlePetStats(f, b.breed, b.quality, b.level, f.elite);
            return c.power
        },
        compute: function(f, g) {
            if (f.companion) {
                return
            }
            var b = validateBpet(f, f.bpet),
                c = calcBattlePetStats(f, b.breed, b.quality, b.level, f.elite);
            return c.power
        },
        sortFunc: function(f, c) {
            var k = validateBpet(f, f.bpet);
            var j = validateBpet(c, c.bpet);
            var h = calcBattlePetStats(f, k.breed, k.quality, k.level, f.elite);
            var g = calcBattlePetStats(c, j.breed, j.quality, j.level, c.elite);
            return stringCompare(h.power, g.power)
        }
    }, {
        id: "speed",
        name: LANG.speed,
        getValue: function(f) {
            var b = validateBpet(f, f.bpet),
                c = calcBattlePetStats(f, b.breed, b.quality, b.level, f.elite);
            return c.speed
        },
        compute: function(f, g) {
            if (f.companion) {
                return
            }
            var b = validateBpet(f, f.bpet),
                c = calcBattlePetStats(f, b.breed, b.quality, b.level, f.elite);
            return c.speed
        },
        sortFunc: function(f, c) {
            var k = validateBpet(f, f.bpet);
            var j = validateBpet(c, c.bpet);
            var h = calcBattlePetStats(f, k.breed, k.quality, k.level, f.elite);
            var g = calcBattlePetStats(c, j.breed, j.quality, j.level, c.elite);
            return stringCompare(h.speed, g.speed)
        }
    }, {
        id: "breeds",
        name: LANG.breed,
        compute: function(l, b) {
            if (l.companion) {
                return
            }
            var j = validateBpet(l, l.bpet);
            var m = [];
            for (var c = 1; c <= 10; c++) {
                if (l.breeds & 1 << c - 1) {
                    m.push(c + 2)
                }
            }
            if (m.length == 0) {
                return
            }
            if (m.length == 1) {
                return "#" + m[0] + (g_pet_breed_abbrev[m[0]] ? (" " + g_pet_breed_abbrev[m[0]]) : "")
            }
            var k;
            if (!(k = b.getElementsByTagName("span")[0])) {
                k = ce("span");
                /*k.style.borderBottom = "1px dotted";
                aE(k, "mouseover", function(n) {
                    Menu.showAtCursor(this.menu, n)
                });
                aE(k, "mouseout", function(n) {
                    Menu.hide()
                });*/
                ae(b, k)
            }
            var h = this,
                f = false;
            k.menu = [
                [, LANG.breed]
            ];
            for (var c in m) {
                var g = "#" + m[c] + (g_pet_breed_abbrev[m[c]] ? (" " + g_pet_breed_abbrev[m[c]]) : "");
                k.menu.push([m[c], g, (function(n) {
                    return function() {
                        if (!l.bpet) {
                            l.bpet = {}
                        }
                        l.bpet.breed = n;
                        delete l.__tr;
                        h.refreshRows()
                    }
                })(m[c])]);
                if (j.breed == m[c]) {
                    ee(k);
                    ae(k, ct(g));
                    f = true
                }
            }
            if ((!f) && m[0]) {
                ee(k);
                ae(k, ct("#" + m[0] + (g_pet_breed_abbrev[m[0]] ? (" " + g_pet_breed_abbrev[m[0]]) : "")))
            }
        },
        getValue: function(c) {
            var b = validateBpet(c, c.bpet);
            return b.breed
        },
        sortFunc: function(f, c) {
            var h = validateBpet(f, f.bpet);
            var g = validateBpet(c, c.bpet);
            return stringCompare(h.breed, g.breed)
        }
    }, {
        id: "abilities",
        name: LANG.abilities,
        type: "text",
        compute: function(f, g) {
            g.style.padding = "0";
            if (!f.abilities) {
                return
            }
            var b = [];
            for (var c = 0; c < f.abilities.length; c++) {
                b.push(f.abilities[c])
            }
            Listview.funcBox.createCenteredIcons(b, g, "", 3)
        },
        getVisibleText: function(f) {
            var g = "";
            if (!f.abilities) {
                return g
            }
            for (var c = 0, b = f.abilities.length; c < b; ++c) {
                if (g_petabilities[f.abilities[c]]) {
                    g += " " + g_petabilities[f.abilities[c]]["name_" + Locale.getName()]
                }
            }
            return g
        },
        sortFunc: function(f, c) {
            var g = f.abilities ? f.abilities.length : 0;
            var h = c.abilities ? c.abilities.length : 0;
            return stringCompare(g, h)
        }
    }, {
        id: "source",
        name: LANG.source,
        type: "text",
        compute: function(c, h) {
            noWrap(h);
            ae(h, ct(g_battlepet_sources[c.category]));
            var g = ce("div");
            g.className = "small2";
            if (c.category == 4 && c.npc) {
                Listview.funcBox.location(c.npc, g, 2)
            } else {
                if (c.source != null) {
                    var f = (c.sourcemore ? c.sourcemore[0] : {});
                    if (f.t) {
                        var b = ce("a");
                        if (f.q != null) {
                            b.className = "q" + f.q
                        } else {
                            b.className = "q1"
                        }
                        b.href = "/" + BattlePetAbilityScaling[f.t] + "=" + f.ti;
                        b.style.whiteSpace = "nowrap";
                        if (f.icon) {
                            b.className += " icontiny tinyspecial";
                            b.style.backgroundImage = 'url("' + g_staticUrl + "/images/wow/icons/tiny/" + f.icon.toLowerCase() + '.gif")'
                        }
                        ae(b, ct(f.n));
                        ae(g, b)
                    }
                }
            }
            if (!$(g).is(":empty")) {
                ae(h, g)
            }
        },
        getVisibleText: function(b) {
            var f = "";
            f += g_battlepet_sources[b.category];
            if (b.category == 4 && b.npc) {
                f += Listview.funcBox.arrayText(b.npc.location, g_zones)
            } else {
                if (b.source != null) {
                    var c = (b.sourcemore ? b.sourcemore[0] : {});
                    if (c.t) {
                        f += " " + c.n
                    }
                }
            }
            return f
        },
        sortFunc: function(f, c) {
            return stringCompare(g_battlepet_sources[f.category], g_battlepet_sources[c.category])
        }
    }, {
        id: "type",
        name: LANG.type,
        type: "text",
        compute: function(c, f) {
            f.className = "small q1";
            var b = ce("a");
            b.href = "/pet-species=" + c.type;
            ae(b, ct(g_battlepetability_types[c.type]));
            ae(f, b)
        },
        getVisibleText: function(b) {
            return g_battlepetability_types[b.type]
        },
        sortFunc: function(f, c, g) {
            return stringCompare(g_battlepetability_types[f.type], g_battlepetability_types[c.type])
        }
    }, {
        id: "completed",
        name: LANG.completion,
        hidden: true,
        compute: function(b, c) {
            addCompletionIcons(c, "npc", b.npc.id)
        },
        sortFunc: function(f, c, g) {
            return stringCompare(this._speciesDoneFlags(f.npc.id), this._speciesDoneFlags(c.npc.id))
        },
        getValue: function(f) {
            var h = 0;
            var g = g_completion.npc;
            for (var j in g_user.lists) {
                var b = g_user.lists[j];
                if (!(b.id in g)) {
                    continue
                }
                if (inArray(g[b.id], f.npc.id) != -1) {
                    h++
                }
            }
            return h
        },
        _speciesDoneFlags: function(b) {
            return getCompletionFlags("npc", b)
        }
    }],
    getItemLink: function(b) {
        return "?npc=" + (b.npc ? b.npc.id : b.id)
    },
    createCbControls: function(f, c) {
        if (!c) {
            return
        }
        var b = ce("input");
        b.type = "button";
        b.value = (!this.characterSettings || !this.characterSettings.editable ? LANG.li_addtolist : LANG.li_addtoanotherlist);
        b.onclick = (function(g) {
            Listview.cbAddToList.call(this, g, "npc")
        }).bind(this);
        ae(f, b)
    },
    onBeforeCreate: function() {
        for (var b in this.columns) {
            if ((this.columns[b].id == "completed") && (this.columns[b].hidden)) {
                if ((!(this.hasOwnProperty("completionMode") && this.completionMode)) && isSet("g_user") && ("lists" in g_user) && ("npc" in g_completion) && (inArray(this.hiddenCols, this.columns[b].id) == -1)) {
                    this.visibility.push(parseInt(b))
                }
            }
        }
    }
};
Listview.templates.petspecies = Listview.templates["pet-species"];

var isSet = function (a) {
    return typeof window[a] !== "undefined"
};

var noWrap = function (a) {
    a.style.whiteSpace = "nowrap"
};

Listview.templates["pet-ability"] = {
    sort: [1],
    nItemsPerPage: 100,
    searchable: 1,
    filtrable: 1,
    columns: [{
        id: "name",
        name: LANG.name,
        type: "text",
        align: "left",
        value: "name",
        span: 2,
        compute: function (h, g, f) {
            var c = ce("td");
            c.style.width = "1px";
            c.style.padding = "3px 0 3px 12px";
            c.style.borderRight = "none";
            if (h.icon) {
                ae(c, Icon.create(h.icon, (this.iconSize == null ? 1 : this.iconSize), null, "?pet-ability=" + h.id))
            } else {
                ae(c, Icon.create("inv_misc_questionmark", (this.iconSize == null ? 1 : this.iconSize), null, "?pet-ability=" + h.id))
            }
            ae(f, c);
            g.style.borderLeft = "none";
            var b = ce("a");
            b.className = "listview-cleartext";
            b.href = this.getItemLink(h);
            ae(b, ct(h.name));
            ae(g, b)
        },
        getVisibleText: function (c) {
            var b = c.name;
            return b
        },
        sortFunc: function (f, c, g) {
            return stringCompare(f.name, c.name)
        }
    }, {id: "level", name: LANG.level, value: "level", hidden: true}, {
        id: "damage",
        name: LANG.damage,
        value: "damage"
    }, {id: "healing", name: LANG.healing, value: "healing"}, {
        id: "duration",
        name: LANG.duration,
        value: "duration",
        compute: function (c, b) {
            if (c.duration) {
                return sprintf(c.duration == 1 ? LANG.durationturns_format_s : LANG.durationturns_format, c.duration)
            }
        }
    }, {
        id: "cooldown", name: LANG.cooldown, value: "cooldown", compute: function (c, b) {
            if (c.cooldown) {
                return sprintf(c.cooldown == 1 ? LANG.cooldownturns_format_s : LANG.cooldownturns_format, c.cooldown)
            }
        }
    }, {
        id: "accuracy", name: LANG.accuracy, value: "accuracy", compute: function (c, b) {
            if (c.accuracy) {
                return sprintf(LANG.accuracy_format, c.accuracy)
            }
        }
    }, {
        id: "type", name: LANG.type, type: "text", width: "12%", compute: function (g, f) {
            f.className = "small q1";
            var b = ce("a");
            b.href = "?pet-abilities=" + g.type;
            var c = g.type != -1 ? g_battlepetability_types[g.type + 1] : "Aura";
            ae(b, ct(c));
            ae(f, b)
        }, getVisibleText: function (b) {
            return g_battlepetability_types[b.type + 1]
        }, sortFunc: function (f, c, g) {
            return stringCompare(g_battlepetability_types[f.type + 1], g_battlepetability_types[c.type + 1])
        }
    }],
    getItemLink: function (b) {
        return "?pet-ability=" + b.id
    }
};
Listview.templates.petability = Listview.templates["pet-ability"];

function getMyTimeZoneNameAt(date) {
    // mert az időzóna neve az óraátállítás miatt függ a dátumtól
    var offset = date.getTimezoneOffset() / -60;
    var name = "UTC";

    if (offset < 0) {
        name += "-" + offset;
    } else if (offset > 0) {
        name += "+" + offset;
    }

    return name;
}