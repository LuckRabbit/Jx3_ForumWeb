function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
fasong = function () {
    var Request = new Object();
    Request = GetRequest();
    var tid = Request['tid'];
    var text = $(".views_text input").val();
    $(".views_text input").val("");
    var ajaxurl = "http://msg.j3ui.com:10200/reply.php";
    window.clearInterval(timer);
    $.ajax({
        url: "./Data/postReplyData.aspx",
        type: "post",
        data: "&ajaxurl=" + ajaxurl +"&m="+text+ "&o=init&tid=" + tid + "&_=" + new Date().getTime(),
        success: function (data) {
            if (data == "sucess")
            {
                LoadAjaxData();
                timer = setInterval(LoadAjaxData, 10000);
            }
            else
            {
                $(".views_text input").val(text);
            }
        }
    })
    //var text = $(".views_text input").val();
    //time();
    //$('<div class="views_time"> ' + views_time + '</div><div class="views_2"> <dl> <dt>我：</dt> <dd><em></em>' + text + '</dd> </dl> </div> <div class="clear"></div>').appendTo("#liaotian");
    //$(".views_text input").val("");
    //setTimeout(function () { scrollviews.refresh(); }, 200);
    //setTimeout(function () { scrollviews.scrollToElement('div.clear:last-child', 0); }, 210);
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
images[1] = '<img style="height: 20px;" src="http://cache.j3ui.com/icon/playeravatar/sl.png">',
images[2] = '<img style="height: 20px;" src="http://cache.j3ui.com/icon/playeravatar/wh.png">',
images[3] = '<img style="height: 20px;" src="http://cache.j3ui.com/icon/playeravatar/tc.png">',
images[4] = '<img style="height: 20px;" src="http://cache.j3ui.com/icon/playeravatar/cy.png">',
images[5] = '<img style="height: 20px;" src="http://cache.j3ui.com/icon/playeravatar/qx.png">',
images[6] = '<img style="height: 20px;" src="http://cache.j3ui.com/icon/playeravatar/wd.png">',
images[7] = '<img style="height: 20px;" src="http://cache.j3ui.com/icon/playeravatar/tm.png">',
images[8] = '<img style="height: 20px;" src="http://cache.j3ui.com/icon/playeravatar/cj.png">',
images[9] = '<img style="height: 20px;" src="http://cache.j3ui.com/icon/playeravatar/gb.png">',
images[10] = '<img style="height: 20px;" src="http://cache.j3ui.com/icon/playeravatar/mj.png">';
var timer;
var lastpid=0;
LoadAjaxData = function () {
    //alert(111);
    var Request = new Object();
    Request = GetRequest();
    var tid = Request['tid'];
    var localauthor = $.cookie('username');
    //alert(localauthor);
    var url = "http://msg.j3ui.com:10200/replylist.php";
    $.ajax({
        url: "./Data/getConfigData.aspx",
        type: "post",
        dataType: "json",
        data: "&ajaxurl=" + url + "&tid=" + tid + "&_=" + new Date().getTime(),
        success: function (data) {
            var ss = data.content;
            $(".hudong_tit").html(ss.substr(0, 8) + "....");
            if (data.data != null) {
                for (var i = data.data.length - 1; i >= 0; i--) {
                    if (parseInt(data.data[i]["pid"])> parseInt(lastpid))
                    {
                        lastpid = data.data[i]["pid"];
                        var text = data.data[i]["m"];
                        var author = data.data[i]["a"];
                        var time = TimeToDate(data.data[i]["t"]);
                        if (author == localauthor)
                        {
                            $('<div class="views_time"> ' + time + '</div><div class="views_2"> <dl> <dt>' + images[data.data[i]["s"]] + author + '：</dt> <dd><em></em>' + text + '</dd> </dl> </div> <div class="clear"></div>').appendTo("#liaotian").fadeIn(1000);
                        }
                        else
                        {
                            $('<div class="views_time"> ' + time + '</div><div class="views_1"> <dl> <dt>' + images[data.data[i]["s"]] + author + '：</dt> <dd><em></em>' + text + '</dd> </dl> </div> <div class="clear"></div>').appendTo("#liaotian").fadeIn(1000);
                        }
                        setTimeout(function () { scrollviews.refresh(); }, 200);
                        setTimeout(function () { scrollviews.scrollToElement('div.clear:last-child', 0); }, 210);
                    }
                }
                
            }
            else {
                lastpid = 0;
                $(".hudong_tit").html(ss.substr(0, 8) + "....");
            }
        }
    })
}
jQuery(document).ready(function () {
    var Request = new Object();
    Request = GetRequest();
    var tid = Request['tid'];
    var url = "http://msg.j3ui.com:10200/replylist.php";
    var localauthor = $.cookie('username');
    if (localauthor == null)
    {
        $(".views_box").addClass("hide");
    }
    $.ajax({
        url: "./Data/getConfigData.aspx",
        type: "post",
        dataType: "json",
        data: "&ajaxurl=" + url + "&tid=" + tid + "&_=" + new Date().getTime(),
        success: function (data) {
            var ss = data.content;
            $(".hudong_tit").html(ss.substr(0, 8) + "....");
            if (data.data != null) {
                lastpid = data.data[0]["pid"];
                for (var i = data.data.length - 1; i >= 0; i--) {
                    var text = data.data[i]["m"];
                    var author = data.data[i]["a"];
                    //alert(localauthor);
                    //alert(author);
                    var time = TimeToDate(data.data[i]["t"]);
                    if (author == localauthor)
                    {
                        //alert(localauthor);
                        //alert(author);
                        $('<div class="views_time"> ' + time + '</div><div class="views_2"> <dl> <dt>' + images[data.data[i]["s"]] + author + '：</dt> <dd><em></em>' + text + '</dd> </dl> </div> <div class="clear"></div>').appendTo("#liaotian");
                    }
                    else
                    {
                        $('<div class="views_time"> ' + time + '</div><div class="views_1"> <dl> <dt>' + images[data.data[i]["s"]] + author + '：</dt> <dd><em></em>' + text + '</dd> </dl> </div> <div class="clear"></div>').appendTo("#liaotian");
                    }
                    setTimeout(function () { scrollviews.refresh(); }, 200);
                    setTimeout(function () { scrollviews.scrollToElement('div.clear:last-child', 0); }, 210);
                }
            }
            else {
                lastpid = 0;
                $(".hudong_tit").html(ss.substr(0, 8) + "....");
            };
            timer = setInterval(LoadAjaxData,10000);
        }
    })

});