GetForum = function () {
    $("#typelist").hide();
    $("#serverlist").hide();
    var url = "http://msg.j3ui.com:10200/config.html"
    $.ajax({
        url: "./Data/getConfigData.aspx",
        type: "post",
        dataType: "json",
        data: "&ajaxurl=" + url + "&_=" + new Date().getTime(),
        success: function (data) {
            //LoadEnd();
            var b = '<option value=""></option><optgroup label="全区全服"><option>全区全服</option>';
            $.each(data.ServerList, function (i) {
                b += '<optgroup label="' + i + '">',
                $.each(data.ServerList[i], function (a) {
                    b += '<option>' + data.ServerList[i][a] + '</option>'
                }),
                b += '</optgroup>'
            }),
            $("#serverlist").html(b),
            b = '<option value=""></option><optgroup label="组队分类"><option>秦皇陵</option><option>风雪稻香村</option><option>血战天策</option><option>战宝军械库</option><option>大明宫</option><option>南诏皇宫</option><option>持国天王回忆录</option><option>会战唐门</option><option>烛龙殿</option><option>荻花洞窟</option><option>龙渊泽</option><option>荻花圣殿</option></optgroup><optgroup label="其他分类">';
            $.each(data.MenuList, function (i) {
                b += '<option>' + data.MenuList[i] + '</option>'
            }),
            b += '</optgroup>',
            $("#typelist").html(b);
            $("#typelist").show().chosen();
            $("#serverlist").show().chosen();
            $("#serverlist").chosen().change(function () {
                GetForumList($("#serverlist").val(), $("#typelist").val());
            });
            $("#typelist").chosen().change(function () {
                GetForumList($("#serverlist").val(), $("#typelist").val());
            });
        }
    })
}
open_pic = function () {
    //alert(1);
    $("body").append('<div class="big_img"><div class="ggp_img"></div><div class="ggp_close">×</div><div class="body_bg"></div></div>'),
    $(".ggp_img").load("views/login.html"),
    $(".ggp_close").click(function (e) {
        $(".big_img").remove();
    });
}
OpenListWindow = function (tid) {
    var iTop = (window.screen.availHeight - 30 - 570) / 2;
    //获得窗口的水平位置
    var iLeft = (window.screen.availWidth - 10 - 610) / 2;
    window.open('tid_view.html?tid=' + tid, tid, 'height=570,width=610,top=' + iTop + ',left=' + iLeft + ',toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
}
var colors = new Array(11);
colors[0] = "255, 255, 255",
colors[3] = "255, 111, 83",
colors[2] = "196, 152, 255",
colors[4] = "89, 224, 232",
colors[5] = "255, 129, 176",
colors[1] = "255, 178, 95",
colors[8] = "214, 249, 93",
colors[6] = "55, 147, 255",
colors[7] = "121, 183, 54",
colors[10] = "240, 70, 96",
colors[9] = "205,133,63";
var images = new Array(11);
images[1] = '',
images[1] = '<img style="height: 20px;" src="http://cache.j3ui.com/icon/playeravatar/sl.png">' ,
images[2] =  '<img style="height: 20px;" src="http://cache.j3ui.com/icon/playeravatar/wh.png">' ,
images[3] =  '<img style="height: 20px;" src="http://cache.j3ui.com/icon/playeravatar/tc.png">' ,
images[4] =  '<img style="height: 20px;" src="http://cache.j3ui.com/icon/playeravatar/cy.png">' ,
images[5] =  '<img style="height: 20px;" src="http://cache.j3ui.com/icon/playeravatar/qx.png">' ,
images[6] =  '<img style="height: 20px;" src="http://cache.j3ui.com/icon/playeravatar/wd.png">' ,
images[7] =  '<img style="height: 20px;" src="http://cache.j3ui.com/icon/playeravatar/tm.png">' ,
images[8] =  '<img style="height: 20px;" src="http://cache.j3ui.com/icon/playeravatar/cj.png">' ,
images[9] =  '<img style="height: 20px;" src="http://cache.j3ui.com/icon/playeravatar/gb.png">' ,
images[10] = '<img style="height: 20px;" src="http://cache.j3ui.com/icon/playeravatar/mj.png">'

GetForumList = function (a, b) {
    $("#ajax_config").html("<tr><td colspan=5>Loading...</td></tr>");
    if (a == null && b == null) {
        var url = "http://msg.j3ui.com:10200/list.php"
        $.ajax({
            url: "./Data/getConfigData.aspx",
            type: "post",
            dataType: "json",
            data: "&ajaxurl=" + url + "&t=&s=全区全服&_=" + new Date().getTime(),
            success: function (data) {
                LoadEnd();
                var c = "<tr><td colspan=5></td></tr>",
                    d = "";
                $.each(data.data, function (i) {
                    if (data.data[i]["col"] != null) {
                        //d += '<tr style="color:rgb(' + data.data[i]["col"] + ')"><td>' + data.data[i]["a"] + '</td><td><a style="color:rgb(' + data.data[i]["col"] + ')" href="javascript:;" onclick="OpenListWindow(' + data.data[i]["tid"] + ')">' + data.data[i]["m"] + '</a></td><td class="ta-c">' + TimeToDate(new Date().getTime()) + '</td>'
                        d += '<tr><td>' + images[data.data[i]["s"]] + data.data[i]["a"] + '</td><td><a href="javascript:;" onclick="OpenListWindow(' + data.data[i]["tid"] + ')">' + data.data[i]["m"] + '</a></td><td class="ta-c">' + TimeToDate(new Date().getTime()) + '</td>'
                    }
                    else {
                        d += '<tr><td>' + images[data.data[i]["s"]] + data.data[i]["a"] + '</td><td><a href="javascript:;" onclick="OpenListWindow(' + data.data[i]["tid"] + ')">' + data.data[i]["m"] + '</a></td><td class="ta-c">' + TimeToDate(data.data[i]["t"]) + '</td>'
                    }
                }),
                $("#ajax_config").html(c + d);
            }
        })
    }
    else {
        var url = "http://msg.j3ui.com:10200/list.php"
        var t = b;
        if (t == "请选择分类..." || t == "所有分类" || t == "" || t == null || t == "null")
            t = "";
        var s = a;
        if (s == "请选择大区..." || s == "")
            s = "全区全服"
        $.ajax({
            url: "./Data/getConfigData.aspx",
            type: "post",
            dataType: "json",
            data: "&ajaxurl=" + url + "&t=" + t + "&s=" + s + "&_=" + new Date().getTime(),
            success: function (data) {
                LoadEnd();
                var c = "<tr><td colspan=5></td></tr>",
                    d = "";
                $.each(data.data, function (i) {
                    if (data.data[i]["col"] != null) {
                        //d += '<tr style="color:rgb(' + data.data[i]["col"] + ')"><td>' + data.data[i]["a"] + '</td><td><a style="color:rgb(' + data.data[i]["col"] + ')" href="javascript:;" onclick="OpenListWindow(' + data.data[i]["tid"] + ')">' + data.data[i]["m"] + '</a></td><td class="ta-c">' + TimeToDate(new Date().getTime()) + '</td>'
                        d += '<tr><td>' + images[data.data[i]["s"]] + data.data[i]["a"] + '</td><td><a href="javascript:;" onclick="OpenListWindow(' + data.data[i]["tid"] + ')">' + data.data[i]["m"] + '</a></td><td class="ta-c">' + TimeToDate(new Date().getTime()) + '</td>'
                    }
                    else {
                        d += '<tr><td>' + images[data.data[i]["s"]] + data.data[i]["a"] + '</td><td><a href="javascript:;" onclick="OpenListWindow(' + data.data[i]["tid"] + ')">' + data.data[i]["m"] + '</a></td><td class="ta-c">' + TimeToDate(data.data[i]["t"]) + '</td>'
                    }
                }),
                $("#ajax_config").html(c + d);
            }
        })
    }
    var localauthor = $.cookie('username');
    //alert(localauthor);
    if (localauthor != null) {
        //alert(localauthor);
        $("#btn_login").css("display","none");
    }
}
function str2asc(strstr) {
    return ("0" + strstr.charCodeAt(0).toString(16)).slice(-2);
}
function asc2str(ascasc) {
    return String.fromCharCode(ascasc);
}
function UrlDecode(str) {
    var ret = "";
    for (var i = 0; i < str.length; i++) {
        var chr = str.charAt(i);
        if (chr == "+") {
            ret += " ";
        } else if (chr == "%") {
            var asc = str.substring(i + 1, i + 3);
            if (parseInt("0x" + asc) > 0x7f) {
                ret += asc2str(parseInt("0x" + asc + str.substring(i + 4, i + 6)));
                i += 5;
            } else {
                ret += asc2str(parseInt("0x" + asc));
                i += 2;
            }
        } else {
            ret += chr;
        }
    }
    return ret;
}
