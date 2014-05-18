$(function(){

	$.ajax({
		url: "http://api.j3ui.com/jsonp/login.js",
		type: "get",
		dataType: "jsonp",
		success: function(data) {
			if(data['uid'] > 0){
				$("#header-info-login").hide();
				$("#header-info-users").show().find("span").text(data['username']);
			}
		}
	});
})