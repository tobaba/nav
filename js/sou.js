
// 搜索引擎列表【预设】
var se_list_preinstall = {
    '1': {
        id: 1,
        title: "必应",
        url: "https://cn.bing.com/search",
        name: "q",
        img: "./icon/bing.png"
    },
    '2': {
        id: 2,
        title: "谷歌",
        url: "https://www.google.com/search",
        name: "q",
        img: "./icon/google.png"
    },
    '3': {
        id: 3,
        title: "百度",
        url: "https://www.baidu.com/s",
        name: "wd",
        img: "./icon/baidu.png"
    }
};

// 主页快捷方式【预设】
var quick_list_preinstall = {
    '1': {
        title: "油管视频",
        url: "https://www.youtube.com/",
        img: "./icon/youtube.png",
        explain: "YouTube~"
    },
    '2': {
        title: "GitHub啦",
        url: "https://github.com/",
        img: "./icon/github.png",
        explain: "GitHub"
    },
    '3': {
        title: "TikTok吧",
        url: "https://www.tiktok.com/foryou?lang=es",
        img: "./icon/tiktok.png",
        explain: "TikTok"
    },
    '4': {
        title: "维基百科",
        url: "https://zh.wikipedia.org/wiki",
        img: "./icon/wiki.png",
        explain: "Wiki"
    },
    '5': {
        title: "ChatGPT",
        url: "https://chatgpt.com",
        img: "./icon/gpt.png",
        explain: "ChatGPT"
    },
    '6': {
        title: "百度助手",
        url: "https://chat.baidu.com/",
        img: "./icon/baiduai.png",
        explain: "百度AI助手"
    },
    '7': {
        title: "Yandex",         
        url: "https://yandex.com",
        img: "./icon/yandex.png",
        explain: "yandex"
    },
    '8': {
        title: "看看中国",
        url: "https://www.secretchina.com/",
        img: "./icon/vt.png",
        explain: "secretchina"
    },
    '9': {
        title: "纽约时报",
        url: "https://cn.nytimes.com/",
        img: "./icon/nytimes.ico",
        explain: "纽约时报"
    },
    '10': {
        title: "BBC中文",
        url: "https://www.bbc.com/zhongwen/simp",
        img: "./icon/BBC.png",
        explain: "BBC中文"
    }
};

// 主题方案【预设】
var themes_preinstall = {
    '1': {
        'name': '明亮', // 主题名称
        'bg': "#f5f5f5", // 背景色
        'pop_bg': "#ffffff", // 弹窗背景色
        'shadow': "#d8d7d7", // 阴影
        'bottom_bg': "#ddd", // 按钮背景
        'text_color': "#777777", // 文本颜色
        'bg_img': "", // 背景图片
    },
    '2': {
        'name': '黑暗',
        'bg': "#2b2b2b",
        'pop_bg': "#3c3f41",
        'shadow': "#211f1f",
        'bottom_bg': "#4c5052",
        'text_color': "#bbbbbb",
        'bg_img': "" // 背景图片
    }
};

// 背景图片预设
var bg_img_preinstall = {
    "type": "3", // 1:使用主题默认背景图片, 2:关闭背景图片, 3:自定义背景图片
    "path": "./icon/bg.png" // 背景图片路径
};

// 获取背景图片
function getBgImg() {
    var bg_img_local = localStorage.getItem('bg_img');
    if (bg_img_local && bg_img_local !== "{}") {
        return JSON.parse(bg_img_local);
    } else {
        setBgImg(bg_img_preinstall);
        return bg_img_preinstall;
    }
}

// 设置背景图片
function setBgImg(bg_img) {
    if (bg_img) {
        localStorage.setItem('bg_img', JSON.stringify(bg_img));
        return true;
    }
    return false;
}

// 初始化背景图片设置
function setBgImgInit() {
    var bg_img = getBgImg();
    $("input[name='wallpaper-type'][value=" + bg_img["type"] + "]").click();
    if (bg_img["type"] === "3") {
        $("#wallpaper-url").val(bg_img["path"]);
        $("#wallpaper_url").show();
    } else {
        $("#wallpaper_url").hide();
    }
}

// 获取搜索引擎列表
function getSeList() {
    var se_list_local = localStorage.getItem('se_list');
    if (se_list_local && se_list_local !== "{}") {
        return JSON.parse(se_list_local);
    } else {
        setSeList(se_list_preinstall);
        return se_list_preinstall;
    }
}

// 设置搜索引擎列表
function setSeList(se_list) {
    if (se_list) {
        localStorage.setItem('se_list', JSON.stringify(se_list));
        return true;
    }
    return false;
}

// 获取默认搜索引擎
function getSeDefault() {
    return localStorage.getItem('se_default') || "1";
}

// 主题初始化
function themesInit() {
    var bg_img = getBgImg();
    var themes = getThemes();
    var key = getThemesDefault();
    var theme = themes[key];

    applyBackgroundImage(bg_img, theme);
    applyThemeStyles(theme);
}

// 应用背景图片
function applyBackgroundImage(bg_img, theme) {
    switch (bg_img["type"]) {
        case "1":
            $("body").css("background-image", theme["bg_img"] ? "url(\"" + theme["bg_img"] + "\")" : "none");
            break;
        case "2":
            $("body").css("background-image", "none");
            break;
        case "3":
            $("body").css("background-image", "url(\"" + bg_img["path"] + "\")");
            break;
    }
}

// 应用主题样式
function applyThemeStyles(theme) {
    $("body").css("background-color", theme["bg"]);
    $(".con .sou form .wd").css({
        "border": "1px solid " + theme["bottom_bg"],
        "color": theme["text_color"]
    });
    $(".search-engine").css({
        "background-color": theme["pop_bg"],
        "box-shadow": "0 5px 20px 0 " + theme["shadow"]
    });
    $("#keywords").css({
        "background-color": theme["pop_bg"],
        "box-shadow": "0 5px 20px 0 " + theme["shadow"],
        "color": theme["text_color"]
    });
    $(".search-engine-list .se-li").css({
        "background-color": theme["bottom_bg"],
        "color": theme["text_color"]
    });
    $(".search-engine-tip").css({
        "border-bottom": "8px solid " + theme["pop_bg"]
    });
    $(".quick").css({ "background-color": theme["bottom_bg"] });
    $(".quick a").css({ "color": theme["text_color"] });
    $(".foot").css({ "color": theme["text_color"] });
}

// 获取默认主题
function getThemesDefault() {
    return localStorage.getItem('theme_default') || "1";
}

// 设置默认主题
function setThemesDefault(key) {
    localStorage.setItem('theme_default', key);
    return true;
}

// 获取主题方案列表
function getThemes() {
    var themes_local = localStorage.getItem('themes');
    if (themes_local && themes_local !== "{}") {
        return JSON.parse(themes_local);
    } else {
        setThemes(themes_preinstall);
        return themes_preinstall;
    }
}

// 设置主题列表
function setThemes(themes) {
    if (themes) {
        localStorage.setItem('themes', JSON.stringify(themes));
        return true;
    }
    return false;
}

// 初始化主题方案列表
function setThemesInit() {
    var themes = getThemes();
    var theme_default = getThemesDefault();
    var html = generateThemeButtons(themes, theme_default);
    $("#themes").html(html);
}

// 生成主题按钮 HTML
function generateThemeButtons(themes, theme_default) {
    var html = "";
    for (var i in themes) {
        if (i === theme_default) {
            html += "<input type=\"button\" class=\"but-ordinary but-active\" value=\"" + themes[i]["name"] + "\">";
        } else {
            html += "<button class=\"but-ordinary set-theme\" data-id=\"" + i + "\">" + themes[i]["name"] + "</button>";
        }
    }
    return html;
}

// 搜索框高亮
function focusWd() {
    var themes = getThemes();
    var key = getThemesDefault();
    var theme = themes[key];

    $(".wd").css({
        "background-color": theme["pop_bg"],
        "box-shadow": "0 1px 6px 0 " + theme["shadow"],
    });//输入框
}

// 搜索框取消高亮
function blurWd() {
    $(".wd").css({
        "background-color": "",
        "box-shadow": "",
    });//输入框
}

// 关键字提示
function keywordReminder() {
    var keyword = $(".wd").val();
    if (keyword != "") {
        $.ajax({
            url: 'https://suggestion.baidu.com/su?wd=' + keyword,
            dataType: 'jsonp',
            jsonp: 'cb', //回调函数的参数名(键值)key
            success: function (data) {
                $("#keywords").empty().show();
                $.each(data.s, function (i, val) {
                    $('#keywords').append("<li class=\"keyword\" data-id=\"" + (i + 1) + "\">" + val + "</li>");
                });
                $("#keywords").attr("data-length", data.s["length"]);
            },
            error: function () {
                $("#keywords").empty().show();
                $("#keywords").hide();
            }
        })
    } else {
        $("#keywords").empty().show();
        $("#keywords").hide();
    }
}

// 搜索框数据加载
function searchData() {
    var se_default = getSeDefault();
    var se_list = getSeList();
    var defaultSe = se_list[se_default];
    if (defaultSe) {
        $(".search").attr("action", defaultSe["url"]);
        $(".se").attr("src", defaultSe["img"]);
        $(".wd").attr("name", defaultSe["name"]);
    }

    // 判断窗口大小，添加输入框自动完成
    var wid = $("body").width();
    if (wid < 640) {
        $(".wd").attr('autocomplete', 'off');
    } else {
        $(".wd").focus();
        focusWd();
    }
}

// 搜索引擎列表加载
function seList() {
    var html = "";
    var se_list = getSeList();
    for (var i in se_list) {
        html += "<li class='se-li' data-url='" + se_list[i]["url"] + "' data-name='" + se_list[i]["name"] + "' data-img='" + se_list[i]["img"] + "'><img src='" + se_list[i]["img"] + "'>" + se_list[i]["title"] + "</li>";
    }
    $(".search-engine-list").html(html);
}

// 设置-搜索引擎列表加载
function setSeInit() {
    var se_default = getSeDefault();
    var se_list = getSeList();
    var html = "";
    for (var i in se_list) {
        var tr = "<tr><td></td>";
        if (i === se_default) {
            tr = "<tr><td><span class='iconfont iconhome'></span></td>";
        }
        tr += "<td>" + i + ". " + se_list[i]["title"] + "</td><td><button class='set_se_default' value='" + i + "'><span class='iconfont iconstrore-add'></span></button> <button class='edit_se' value='" + i + "'><span class='iconfont iconbook-edit'></span></button> <button class='delete_se' value='" + i + "'><span class='iconfont icondelete'></span></button></td></tr>";
        html += tr;
    }
    $(".se_list_table").html(html);
}

// 获取快捷方式列表，如果没有自定义的则使用预设
function getQuickList() {
    var quick_list_local = localStorage.getItem('quick_list');
    if (quick_list_local && quick_list_local !== "{}") {
        return JSON.parse(quick_list_local);
    } else {
        setQuickList(quick_list_preinstall);
        return quick_list_preinstall;
    }
}

// 设置快捷方式列表
function setQuickList(quick_list) {
    if (quick_list) {
        // 计算10年后的日期
        var date = new Date();
        date.setFullYear(date.getFullYear() + 10);  // 设置10年后
        // 使用 JSON.stringify 将对象转换为字符串
        localStorage.setItem('quick_list', JSON.stringify(quick_list));
        return true;
    }
    return false;
}


// 快捷方式数据加载
function quickData() {
    var quick_list = getQuickList();
    var html = generateQuickListHTML(quick_list);
    $(".quick-ul").html(html);
}

// 生成快捷方式列表 HTML
function generateQuickListHTML(quick_list) {
    var html = "";
    for (var key in quick_list) {
        if (quick_list.hasOwnProperty(key)) {
            var item = quick_list[key];
            var title = escapeHTML(item.title);
            var explain = escapeHTML(item.explain);
            var url = escapeHTML(item.url);
            var img = escapeHTML(item.img);

            html += `
                <li class='quick' title='${explain}'>
                    <a target='_blank' href='${url}'>
                        <i style='background-image: url("${img}");'></i>
                        ${title}
                    </a>
                </li>
            `;
        }
    }
    return html;
}

// HTML转义函数，防止XSS
function escapeHTML(str) {
    return String(str).replace(/[&<>"'`=\/]/g, function (s) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '/': '&#x2F;',
            '`': '&#x60;',
            '=': '&#x3D;'
        }[s];
    });
}

// 初始化快捷方式
function setQuickInit() {
    var quick_list = getQuickList();
    var html = generateQuickTableHTML(quick_list);
    $(".quick_list_table").html(html);
}

// 生成快捷方式表格 HTML
function generateQuickTableHTML(quick_list) {
    var html = "";
    for (var key in quick_list) {
        if (quick_list.hasOwnProperty(key)) {
            var item = quick_list[key];
            var title = escapeHTML(item.title);
            html += `
                <tr>
                    <td>${parseInt(key) + 1}.&nbsp;</td>
                    <td>${title}</td>
                    <td>
                        <button class='edit_quick' value='${key}'><span class='iconfont iconbook-edit'></span></button>
                        &nbsp;
                        <button class='delete_quick' value='${key}'><span class='iconfont icondelete'></span></button>
                    </td>
                </tr>
            `;
        }
    }
    return html;
}


/**
 * 下載文本为文件
 * @param filename 文件名
 * @param text     内容
 */
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}


// 侧边栏打开
function openSide() {
    $("#menu").addClass('on');
    $(".side").removeClass('closed');
}

// 侧边栏关闭
function closeSide() {
    $("#menu").removeClass('on');
    $(".side").addClass('closed');

    // 刷新主页数据
    seList();
    quickData();
    themesInit();
}

$(document).ready(function () {

    // 搜索框数据加载
    searchData();

    // 搜索引擎列表加载
    seList();

    // 快捷方式数据加载
    quickData();

    // 主题初始化(必须在页面元素都加载完成后再加载主题,每当页面元素改变时都应进行主题初始化)
    themesInit();

    // 点击事件
    $(document).on('click', function (e) {
        // 选择搜索引擎点击
        if ($(".search-engine").is(":hidden") && $(".se").is(e.target)) {
            if ($(".se").is(e.target)) {
                $(".search-engine").show();
            }
        } else {
            if (!$(".search-engine").is(e.target) && $(".search-engine").has(e.target).length === 0) {
                $(".search-engine").hide();
            }
        }

        // 自动提示隐藏
        if (!$(".sou").is(e.target) && $(".sou").has(e.target).length === 0) {
            $("#keywords").hide();
        }

    });

    // 搜索引擎列表点击
    $(".search-engine-list").on("click", ".se-li", function () {
        var url = $(this).attr('data-url');
        var name = $(this).attr('data-name');
        var img = $(this).attr('data-img');
        $(".search").attr("action", url);
        $(".wd").attr("name", name);
        $(".se").attr("src", img);
        $(".search-engine").hide();
    });

    // 搜索框获得焦点事件
    $(".wd").focus(function () {
        focusWd();
        keywordReminder();
    });

    // 搜索框失去焦点事件
    $(".wd").blur(function () {
        blurWd();
    });

    // 自动提示( 调用百度 api ）
    $('.wd').keyup(function (event) {
        var key = event.keyCode;
        // 屏蔽上下键
        var shieldKey = [38, 40];
        if (shieldKey.includes(key)) return;
        keywordReminder();
    });

    // 点击自动提示的关键字
    $("#keywords").on("click", "li", function () {
        var wd = $(this).text();
        $(".wd").val(wd);
        $(".search").submit();
    });

    // 自动提示键盘方向键选择操作
    $(".wd").keydown(function (event) {//上下键获取焦点
        var key = event.keyCode;
        if ($.trim($(this).val()).length === 0) return;

        var id = $(".keyword-active").attr("data-id");
        if (id === undefined) id = 0;

        if (key === 38) { /*向上按钮*/
            id--;
        } else if (key === 40) {/*向下按钮*/
            id++;
        } else {
            return;
        }
        var length = $("#keywords").attr("data-length");
        if (id > length) id = 1;
        if (id < 1) id = length;

        $(".keyword[data-id=" + id + "]").addClass("keyword-active").siblings().removeClass("keyword-active");
        $(".wd").val($(".keyword[data-id=" + id + "]").text());
    });

    // 菜单点击
    $("#menu").click(function (event) {
        if ($(this).attr("class") === "on") {
            closeSide();
        } else {
            openSide();

            // 设置内容加载
            setSeInit();//搜索引擎设置
            setQuickInit();//快捷方式设置
            setThemesInit();//主题方案
            setBgImgInit();//壁纸
        }
    });
    $("#content").click(function (event) {
        if ($("#menu").attr("class") === "on") {
            closeSide();
        }
        // 关闭关键字提示
        // $("#keywords").hide();
    });

    // 侧栏标签卡切换
    $(".side").rTabs({
        bind: 'click',
        animation: 'left'
    });

    // 修改默认搜索引擎
    $(".se_list_table").on("click", ".set_se_default", function () {
        var name = $(this).val();
        localStorage.setItem('se_default', name);
        setSeInit();
    });

    // 搜索引擎添加
    $(".set_se_list_add").click(function () {
        $(".se_add_content input").val("");
        $(".se_add_content").show();
    });

    // 搜索引擎保存
    $(".se_add_save").click(function () {
        var key_inhere = $(".se_add_content input[name='key_inhere']").val();
        var key = $(".se_add_content input[name='key']").val();
        var title = $(".se_add_content input[name='title']").val();
        var url = $(".se_add_content input[name='url']").val();
        var name = $(".se_add_content input[name='name']").val();
        var img = $(".se_add_content input[name='img']").val();

        var num = /^\+?[1-9][0-9]*$/;
        if (!num.test(key)) {
            alert("顺序：" + key + " 不是正数数！");
            return;
        }

        var se_list = getSeList();

        if (se_list[key]) {
            alert("顺序:" + key + " 已有数据，不可用");
            return;
        }

        if (key_inhere && key !== key_inhere) {
            delete se_list[key_inhere];
        }

        se_list[key] = {
            title: title,
            url: url,
            name: name,
            img: img,
        };
        setSeList(se_list);
        setSeInit();
        $(".se_add_content").hide();
    });

    // 关闭表单
    $(".se_add_cancel").click(function () {
        $(".se_add_content").hide();
    });

    // 搜索引擎修改
    $(".se_list").on("click", ".edit_se", function () {

        var se_list = getSeList();
        var key = $(this).val();
        $(".se_add_content input[name='key_inhere']").val(key);
        $(".se_add_content input[name='key']").val(key);
        $(".se_add_content input[name='title']").val(se_list[key]["title"]);
        $(".se_add_content input[name='url']").val(se_list[key]["url"]);
        $(".se_add_content input[name='name']").val(se_list[key]["name"]);
        $(".se_add_content input[name='img']").val(se_list[key]["img"]);

        $(".se_add_content").show();
    });

    // 搜索引擎删除
    $(".se_list").on("click", ".delete_se", function () {
        var se_default = getSeDefault();
        var key = $(this).val();
        if (key == se_default) {
            alert("默认搜索引擎不可删除！");
        } else {
            var r = confirm("顺序 " + key + " 是否删除！");
            if (r) {
                var se_list = getSeList();
                delete se_list[key];
                setSeList(se_list);
                setSeInit();
            }
        }
    });

    // 恢复预设搜索引擎
    $(".set_se_list_preinstall").click(function () {
        var r = confirm("现有设置和数据将被清空！");
        if (r) {
            setSeList(se_list_preinstall);
            localStorage.setItem('se_default', 1);
            setSeInit();
        }
    });

    // 设置-快捷方式添加
    $(".set_quick_list_add").click(function () {
        $(".quick_add_content input").val("");
        $(".quick_add_content").show();
    });

    // 设置-快捷方式保存
    $(".quick_add_save").click(function () {
        var key_inhere = $(".quick_add_content input[name='key_inhere']").val();
        var key = $(".quick_add_content input[name='key']").val();
        var title = $(".quick_add_content input[name='title']").val();
        var url = $(".quick_add_content input[name='url']").val();
        var img = $(".quick_add_content input[name='img']").val();

        var num = /^\+?[1-9][0-9]*$/;
        if (!num.test(key)) {
            alert("顺序：" + key + " 不是正数数！");
            return;
        }

        var quick_list = getQuickList();

        //         if (quick_list[key]) {
        //             alert("顺序:" + key + " 已有数据，不可用");
        //             return;
        //         }

        if (key_inhere && key != key_inhere) {
            delete quick_list[key_inhere];
        }

        quick_list[key] = {
            title: title,
            url: url,
            img: img,
        };
        setQuickList(quick_list);
        setQuickInit();
        $(".quick_add_content").hide();
    });

    // 设置-快捷方式关闭添加表单
    $(".quick_add_cancel").click(function () {
        $(".quick_add_content").hide();
    });

    //恢复预设快捷方式
    $(".set_quick_list_preinstall").click(function () {
        var r = confirm("现有设置和数据将被清空！");
        if (r) {
            setQuickList(quick_list_preinstall);
            setQuickInit();
        }
    });

    // 快捷方式修改
    $(".quick_list").on("click", ".edit_quick", function () {

        var quick_list = getQuickList();
        var key = $(this).val();
        $(".quick_add_content input[name='key_inhere']").val(key);
        $(".quick_add_content input[name='key']").val(key);
        $(".quick_add_content input[name='title']").val(quick_list[key]["title"]);
        $(".quick_add_content input[name='url']").val(quick_list[key]["url"]);
        $(".quick_add_content input[name='img']").val(quick_list[key]["img"]);

        $(".quick_add_content").show();
    });

    // 快捷方式删除
    $(".quick_list").on("click", ".delete_quick", function () {

        var key = $(this).val();

        var r = confirm("顺序 " + key + " 是否删除！");
        if (r) {
            var quick_list = getQuickList();
            delete quick_list[key];
            setQuickList(quick_list);
            setQuickInit();
        }
    });

    // 主题切换
    $("#themes").on("click", ".set-theme", function () {
        var key = $(this).attr("data-id");
        setThemesDefault(key);
        setThemesInit();
    });

    // 壁纸设置
    $("#wallpaper").on("click", ".set-wallpaper", function () {
        var type = $(this).val();
        var bg_img = getBgImg();

        if (type === "3") {
            $("#wallpaper_url").show();
            $("#wallpaper-url").val(bg_img["path"]);
        } else {
            $("#wallpaper_url").hide();
        }
        bg_img["type"] = type;
        setBgImg(bg_img);
    });

    // 壁纸自定义
    $(".wallpaper-submit").click(function () {
        var url = $("#wallpaper-url").val();
        var bg_img = getBgImg();
        bg_img["type"] = "3";
        bg_img["path"] = url;
        setBgImg(bg_img);
    });

    // 我的数据导出
    $("#my_data_out").click(function () {
        // 获取 localStorage 中的所有数据
        var localStorageData = {};
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            localStorageData[key] = localStorage.getItem(key);
        }

        // 将数据转换为 JSON 字符串
        var json = JSON.stringify(localStorageData);

        // 触发下载
        download("back-up-" + $.now() + ".json", json);
    });
    // 我的数据导入 点击触发文件选择
    $("#my_data_in").click(function () {
        $("#my_data_file").click();
    });
    // 选择文件后读取文件内容 
    $("#my_data_file").change(function () {
        var selectedFile = document.getElementById('my_data_file').files[0];
        //var name = selectedFile.name; //读取选中文件的文件名
        //var size = selectedFile.size; //读取选中文件的大小
        //console.log("文件名:" + name + " 大小:" + size);

        var reader = new FileReader(); // 这是核心,读取操作就是由它完成.
        reader.readAsText(selectedFile); // 读取文件的内容,也可以读取文件的URL
        reader.onload = function () {
            // 当读取完成后回调这个函数,然后此时文件的内容存储到了 result 中,直接操作即可
            //console.log(this.result);

            // json 格式校验
            var mydata;
            try {
                mydata = JSON.parse(this.result);
            } catch (e) {
                alert("数据解析异常");
                return;
            }
            if (typeof mydata !== 'object') {
                alert("数据格式错误");
                return;
            }

            if (confirm("当前数据将被覆盖！是否继续导入？")) {
                for (var key in mydata) {
                    // 将数据存入 localStorage 而不是 cookies
                    localStorage.setItem(key, mydata[key]);
                }
                alert("导入成功");
            }
        }
    });

});
