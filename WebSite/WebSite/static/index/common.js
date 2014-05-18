TimeToDate = function(a) {
	var d, e, f, g, h, i, j, b = Math.round((new Date).getTime() / 1e3),
	c = b - a;
	return 60 > c ? '<span class="f-coa">刚刚</span>': 3600 > c ? '<span class="f-cog">' + Math.floor(c / 60) + " 分钟前</span>": 86400 > c ? '<span class="f-coa">' + Math.floor(c / 3600) + " 小时前</span>": (d = new Date(1e3 * a), e = d.getHours(), f = d.getFullYear(), g = d.getMinutes(), h = d.getMonth() + 1, i = d.getDate(), 10 > h && (h = "0" + h), 10 > i && (i = "0" + i), 10 > e && (e = "0" + e), 10 > g && (g = "0" + g), j = f + "-" + h + "-" + i + " " + e + ":" + g)
};
var processHash = function() {
	var a = location.hash.replace("#", "");
	a = a ? a: "index",
	LoacPage(a)
};
LoadAjaxData = function(a, b, c) {
	$("#load").fadeIn(300),
	a(b, c)
},
LoadEnd = function() {
	$("#load").fadeOut(300)
},
GetVersion = function() {
	$.ajax({
		url: "http://api.j3ui.com/jsonp/version.js",
		type: "get",
		dataType: "jsonp",
		success: function(a) {
			var b, c;
			$("#sy-version").attr("href", "http://down.j3ui.com/download.php?version=" + a.version),
			$("#sy-version5").attr("href", "http://down.j3ui.com/download.php?version=" + a.version5),
			$("#sy-version").text($("#sy-version").text() + " V" + a.version),
			$("#sy-version2").text(a.version),
			$("#sy-dateline").html(TimeToDate(a.dateline)),
			$("#sy-downloads").text(a.downloads),
			$("#sy-log").attr("href", "http://www.j3ui.com/log.html/" + a.dateline),
			$("#sy-count-data").text(a.count.data),
			$("#sy-count-file").text(a.count.file),
			$("#u-iinfo").fadeIn(),
			a.ajaxinfo && $("#u-ajaxinfo").html(a.ajaxinfo),
			b = "http://down.j3ui.com/download.php?version=" + a.version,
			c = '<a href="' + b + '" title="数据可能更新较慢" class="brick-btn2 brick-btn2-white brick-btn2-large">下载官方版</a> ',
			$.each(a.Hot,
			function(b, d) {
				c += '<a href="http://down.j3ui.com/?id=' + d[0] + "&amp;e&amp;version=" + a.version + '" title="' + d[2] + '" class="brick-btn2 brick-btn2-white brick-btn2-large">下载' + d[3] + "版</a> "
			}),
			$("#sy-btn").html(c),
			LoadEnd()
		}
	})
},
GetConfig = function(a) {
	$("#ajax_config").html("<tr><td colspan=5>Loading...</td></tr>"),
	$.ajax({
		url: "http://api.j3ui.com/file/" + a + ".js",
		type: "get",
		dataType: "jsonp",
		success: function(b) {
			var c = "<tr><td colspan=5></td></tr>",
			d = "";
			90 == a ? ($.each(b.data[0],
			function(a, b) {
				d += '<tr><td><img class="brick-ico2" src="http://uc.j3ui.com/avatar.php?uid=' + b.uid + '&size=small"><a class="brick-table2-title" href="#member+' + b.uid + '">' + b.author + '</a></td><td><a class="brick-table2-title" href="http://forum.j3ui.com/thread-' + b.tid + '-1-1.html" target="_blank">[置顶] ' + b.subject + '</a></td><td class="ta-c">' + TimeToDate(b.dateline) + '</td><td class="ta-c"><a class="brick-btn2 brick-btn2-blue brick-btn2-small" target="_blank" href="http://down.j3ui.com/?id=' + b.aid + '">下载</a> <a class="brick-btn2 brick-btn2-red brick-btn2-small" target="_blank" href="http://analysis.j3ui.com/' + b.aid + '">查看</a> </td><td class="ta-c">' + b.downloads + "</td></tr>"
			}), d += c, $.each(b.data[1],
			function(a, b) {
				d += '<tr><td><img class="brick-ico2" src="http://uc.j3ui.com/avatar.php?uid=' + b.uid + '&size=small"><a class="brick-table2-title" href="#member+' + b.uid + '">' + b.author + '</a></td><td><a class="brick-table2-title" href="http://forum.j3ui.com/thread-' + b.tid + '-1-1.html" target="_blank">[主题] ' + b.subject + '</a></td><td class="ta-c">' + TimeToDate(b.dateline) + '</td><td class="ta-c"><a class="brick-btn2 brick-btn2-blue brick-btn2-small" target="_blank" href="http://down.j3ui.com/?id=' + b.aid + '">下载</a> <a class="brick-btn2 brick-btn2-red brick-btn2-small" target="_blank" href="http://analysis.j3ui.com/' + b.aid + '">查看</a> </td><td class="ta-c">' + b.downloads + "</td></tr>"
			})) : $.each(b.data[3],
			function(a, b) {
				d += '<tr><td><img class="brick-ico2" src="http://uc.j3ui.com/avatar.php?uid=' + b.uid + '&size=small"><a class="brick-table2-title" href="#member+' + b.uid + '">' + b.author + '</a></td><td><a class="brick-table2-title" href="http://forum.j3ui.com/thread-' + b.tid + '-1-1.html" target="_blank">[旧数据] ' + b.subject + '</a></td><td class="ta-c">' + TimeToDate(b.dateline) + '</td><td class="ta-c"><a class="brick-btn2 brick-btn2-blue brick-btn2-small" target="_blank" href="http://down.j3ui.com/?id=' + b.aid + '">下载</a> <a class="brick-btn2 brick-btn2-red brick-btn2-small" target="_blank" href="http://analysis.j3ui.com/' + b.aid + '">查看</a> </td><td class="ta-c">' + b.downloads + "</td></tr>"
			}),
			$("#ajax_config").html(d),
			LoadEnd()
		}
	})
},
GetRanklist = function() {
	$("#ajax_ranklist").html("<tr><td colspan=4>Loading...</td></tr>"),
	$.ajax({
		url: "http://api.j3ui.com/Get_PlayerCount.php",
		type: "get",
		dataType: "jsonp",
		success: function(a) {
			var b = "";
			$.each(a.data,
			function(a, c) {
				b += '<tr><td><img class="brick-ico2" src="http://uc.j3ui.com/avatar.php?uid=' + c.info.uid + '&size=small"><a class="brick-table2-title" href="#member+' + c.info.uid + '">' + c.info.username + '</a></td><td><a class="brick-table2-title" href="http://analysis.j3ui.com/' + c.aid + '" target="_blank">[文件] ' + c.info.filename + '</a></td> <td class="ta-c">' + c.bind + '</td> <td class="ta-c"><a class="brick-btn2 brick-btn2-blue brick-btn2-small" target="_blank" href="http://down.j3ui.com/?id=' + c.aid + '">下载</a></td></tr>'
			}),
			$("#ajax_ranklist").html(b),
			LoadEnd()
		}
	})
},
GetFileList = function(a, b) {
	var c;
	a = a ? a: isNaN($("#uid").text()) ? "": $("#uid").text(),
	b = b ? b: a ? "public": "private",
	c = "public" == b ? "公开数据列表": "私密数据列表",
	$("#type").text(c),
	$("#ajax_filelist").html("<tr><td colspan=5>Loading...</td></tr>"),
	$.ajax({
		url: "http://api.j3ui.com/Get_FileList.php",
		type: "get",
		data: {
			type: b,
			uid: a
		},
		dataType: "jsonp",
		success: function(a) {
			if (a) {
				if (401 == a.status) return LoacPage("login"),
				void 0;
				if ($("#username").text(a.users.username), $("#uid").text(a.users.uid), $("#useravatar").attr("src", "http://uc.j3ui.com/avatar.php?uid=" + a.users.uid + "&amp;size=middle"), a.data.length > 0) {
					var c = "";
					$.each(a.data,
					function(d, e) {
						var f = "public" == b ? "": ' <a class="brick-btn2 brick-btn2-white brick-btn2-small" target="_blank" href="http://forum.j3ui.com/forum.php?mod=post&action=edit&fid=18&tid=' + e.tid + "&pid=" + e.pid + '">编辑</a>',
						g = "public" == b ? "http://forum.j3ui.com/thread-" + e.tid + "-1-1.html": "http://analysis.j3ui.com/" + e.aid;
						c += '<tr><td><img class="brick-ico2" src="http://uc.j3ui.com/avatar.php?uid=' + a.users.uid + '&size=small">' + a.users.username + '</td><td><a class="brick-table2-title" href="' + g + '" target="_blank">[文件] ' + e.filename + '</a></td><td class="ta-c">' + TimeToDate(e.dateline) + '</td><td class="ta-c"><a class="brick-btn2 brick-btn2-blue brick-btn2-small" target="_blank" href="http://down.j3ui.com/?id=' + e.aid + '">下载</a> <a class="brick-btn2 brick-btn2-red brick-btn2-small" target="_blank" href="http://analysis.j3ui.com/' + e.aid + '">查看</a>' + f + '</td><td class="ta-c">' + e.downloads + "</td></tr>"
					}),
					$("#ajax_filelist").html(c)
				} else $("#ajax_filelist").html("<tr><td colspan=5>无权查看别人的私密内容，或没有发布过任何内容。</td></tr>")
			} else $("#username").text("用户不存在"),
			$("#ajax_filelist").html("<tr><td colspan=5>查询不到任何内容，用户不存在。</td></tr>");
			LoadEnd()
		}
	})
},
GetUnpak = function(a) {
	$("#ajax_unpak").html("<tr><td colspan=2>Loading...</td></tr>"),
	$.ajax({
		url: "http://api.j3ui.com/GetUnpak.php",
		type: "get",
		dataType: "jsonp",
		data: {
			path: a
		},
		success: function(a) {
			var b = "";
			return 401 == a.status ? (LoacPage("login"), void 0) : (200 == a.status ? ($.each(a.dir,
			function(a, c) {
				b += '<tr><td>文件夹</td><td><a href="' + location.href + "/" + c + '">' + c + "</a></td></tr>"
			}), $.each(a.file,
			function(a, c) {
				b += '<tr><td>文件</td><td><a href="http://api.j3ui.com/syntaxhighlighter/?path=' + location.hash.replace("#unpak", "") + "/" + c + '">' + c + "</td></tr>"
			}), $("#ajax_unpak").html(b)) : $("#ajax_unpak").html("<tr><td colspan=2>你蛋疼吗</td></tr>"), LoadEnd(), void 0)
		}
	})
},
GetTAG = function() {
	$("#ajax_tag_public").html("<tr><td colspan=5>Loading...</td></tr>"),
	$("#ajax_tag_private").html("<tr><td colspan=5>Loading...</td></tr>"),
	$.ajax({
		url: "http://tag.j3ui.com/index.php?info",
		type: "get",
		dataType: "jsonp",
		success: function(a) {
			var c, b = "";
			$.each(a["public"],
			function(a, c) {
				b += '<tr><td><img class="brick-ico2" src="http://uc.j3ui.com/avatar.php?uid=' + c.originator + '&size=small"><a class="brick-table2-title" href="#member+' + c.originator + '">' + c.username + '</a></td><td><a class="brick-table2-title" href="http://tag.j3ui.com/' + c.tid + '" target="_blank">[公开] ' + c.name + '</a></td><td class="ta-c">' + TimeToDate(c.ltime) + '</td><td class="ta-c"><a class="brick-btn2 brick-btn2-blue brick-btn2-small" target="_blank" href="http://down.j3ui.com/?tag=' + c.tid + '">下载</a> <a class="brick-btn2 brick-btn2-red brick-btn2-small" target="_blank" href="http://tag.j3ui.com/' + c.tid + '">查看</a> </td><td class="ta-c">' + c.downloads + "</td></tr>"
			}),
			$("#ajax_tag_public").html(b),
			a.users ? (c = "", $.each(a["private"],
			function(a, b) {
				c += '<tr><td><img class="brick-ico2" src="http://uc.j3ui.com/avatar.php?uid=' + b.originator + '&size=small"><a class="brick-table2-title" href="#member+' + b.originator + '">' + b.username + '</a></td><td><a class="brick-table2-title" href="http://tag.j3ui.com/' + b.tid + '" target="_blank">[私密] ' + b.name + '</a></td><td class="ta-c">' + TimeToDate(b.ltime) + '</td><td class="ta-c"><a class="brick-btn2 brick-btn2-red brick-btn2-small" target="_blank" href="http://tag.j3ui.com/' + b.tid + '">查看和管理</a> </td><td class="ta-c">' + b.downloads + "</td></tr>"
			}), $("#ajax_tag_private").html(c), $("#ajax_tag_private").append('<tr><td class="f-tac" colspan=5><form method="post" action="http://tag.j3ui.com/post/"><input class="brick-table2-title" type="hidden" name="addtag" value="未命名"><input class="brick-btn2 brick-btn2-red brick-btn2-small" type="submit" value="创建一个TAG"></form></td></tr>')) : $("#ajax_tag_private").html("<tr><td colspan=5>你没有登录...</td></tr>"),
			LoadEnd()
		}
	})
},
LoacPage = function(a) {
	var b, c, d, e;
	switch (0 == a.indexOf("location") && (a = "location", b = location.hash.replace("#location", "")), 0 == a.indexOf("member") && (a = "member", c = location.hash.replace("#member", "")), 0 == a.indexOf("unpak") && (a = "unpak", d = location.hash.replace("#unpak", "")), e = {
		download: !0,
		config: !0,
		upload: !0,
		log: !0,
		about: !0,
		TAG: !0,
		login: !0,
		location: !0,
		member: !0,
		log: !0,
		unpak: !0,
		ranklist: !0
	},
	e[a] || (a = "index"), $("[item_identifier=" + $("#url").val() + "]").removeClass("current"), $("[item_identifier=" + a + "]").addClass("current"), $("#load").fadeIn(300), a) {
	case "download":
		$(".main").load("views/download.htm",
		function() {
			LoadAjaxData(GetVersion)
		}),
		$(".footer").css("position", "static");
		break;
	case "upload":
		$(".main").load("views/upload.htm", LoadEnd),
		$(".footer").css("position", "static");
		break;
	case "config":
		$(".main").load("views/config.htm",
		function() {
			LoadAjaxData(GetConfig, 90)
		}),
		$(".footer").css("position", "static");
		break;
	case "about":
		$(".main").load("views/About.htm",
		function() {
			LoadAjaxData(GetVersion)
		}),
		$(".footer").css("position", "absolute");
		break;
	case "TAG":
		$(".main").load("views/TAG.htm",
		function() {
			LoadAjaxData(GetTAG)
		}),
		$(".footer").css("position", "static");
		break;
	case "log":
		$(".main").load("log.php", LoadEnd),
		$(".footer").css("position", "static");
		break;
	case "unpak":
		$(".main").load("views/unpak.htm",
		function() {
			LoadAjaxData(GetUnpak, d)
		}),
		$(".footer").css("position", "static");
		break;
	case "ranklist":
		$(".main").load("views/ranklist.htm",
		function() {
			LoadAjaxData(GetRanklist)
		}),
		$(".footer").css("position", "static");
		break;
	case "login":
		$(".main").load("views/login.htm", LoadEnd),
		$(".footer").css("position", "absolute");
		break;
	case "location":
		$(".main").load("views/location.htm",
		function() {
			if (!b) return alert("。。。"),
			void 0;
			var a = "http://j3ui.aliapp.com" + b + ".ali";
			$("#location_href").attr("href", a),
			setTimeout(function() {
				location.href = a
			},
			500)
		}),
		$(".footer").css("position", "static");
		break;
	case "member":
		$(".main").load("views/member.htm",
		function() {
			LoadAjaxData(GetFileList, c)
		}),
		$(".footer").css("position", "static");
		break;
	default:
		$(".main").load("views/index.htm",
		function() {
			LoadAjaxData(GetVersion)
		}),
		$(".footer").css("position", "absolute")
	}
	$("#url").val(a)
},
GetClientUrl = function() {
	var a = navigator.userAgent; - 1 != a.indexOf("Windows NT 5") ? window.confirm("使用更新器XP系统需要安装.net3.5运行库，是否跳转到安装页面？") && window.open("http://pan.baidu.com/share/link?shareid=2249454306&uk=86188990#dir/path=%2F%E6%9B%B4%E6%96%B0%E5%99%A8%E4%B8%8B%E8%BD%BD") : location.href = "http://dl2.j3ui.com/down/RaidGrid_EventScrutiny_Client.zip"
},
$(function() {
	window.onload = processHash,
	"onhashchange" in window && ("undefined" == typeof document.documentMode || 8 == document.documentMode) ? window.onhashchange = processHash: function(a) {
		var b = a.location,
		c = b.href,
		d = b.hash;
		setInterval(function() {
			var e = b.href,
			f = b.hash;
			f != d && "function" == typeof a.onhashchange && (a.onhashchange({
				type: "hashchange",
				oldURL: c,
				newURL: e
			}), c = e, d = f)
		},
		100),
		a.onhashchange = processHash
	} (this)
});