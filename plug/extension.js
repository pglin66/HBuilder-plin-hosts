var hx = require("hbuilderx");
var fs = require('fs');
var path = require('path');
var src = 'C:/Windows/System32/drivers/etc/hosts';
var nunjucks = require('nunjucks')


var html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8')
//读取host
var read = function(cb) {
	fs.readFile(src, function(err, file) {
		if (err) {
			throw err;
		}
		cb(file.toString());
	});
};
//写入host
var write = function(str, cb) {
	var err = fs.writeFile(src, str, function(err) {
		if (err) {
			if (err.errno in ERROR_MESSAGE) {
				alert(ERROR_MESSAGE[err.errno]);
			} else {
				alert("保存失败，未知错误");
			}
			throw err;
		}
		cb && cb();
	});
};

//该方法将在插件激活的时候调用
function activate(context) {
	console.log(111)
	let webviewPanel = hx.window.createWebView("WebViewswitchHosts", {
		enableScripts: true
	});
	var webview = webviewPanel.webView;
	var sh = fs.readFileSync(path.join(__dirname, 'sh.json'), 'utf-8')

	var res = nunjucks.renderString(html, {
		path: path.join(__dirname),
		sh: {
			"list": [{
				"id": "1598237093892-507653",
				"title": "My hosts",
				"content": "# My hosts\n127.0.0.1  shop.cc",
				"on": true,
				"children": []
			}, {
				"id": "1598237093892-254095",
				"title": "backup",
				"content": "# Copyright (c) 1993-2009 Microsoft Corp.\n#\n# This is a sample HOSTS file used by Microsoft TCP/IP for Windows.\n#\n# This file contains the mappings of IP addresses to host names. Each\n# entry should be kept on an individual line. The IP address should\n# be placed in the first column followed by the corresponding host name.\n# The IP address and the host name should be separated by at least one\n# space.\n#\n# Additionally, comments (such as these) may be inserted on individual\n# lines or following the machine name denoted by a '#' symbol.\n#\n# For example:\n#\n#      102.54.94.97     rhino.acme.com          # source server\n#       38.25.63.10     x.acme.com              # x client host\n \n# localhost name resolution is handled within DNS itself.\n#\t127.0.0.1       localhost\n#\t::1             localhost\n127.0.0.1 ieonline.Microsoft.com\n\n0.0.0.0 flash.cn\n0.0.0.0 www.flash.cn\n0.0.0.0 geo2.adobe.com\n",
				"on": false,
				"children": []
			}, {
				"id": "1598319488732-458582",
				"title": "001",
				"content": "# 001\n127.0.0.1  vue.tianzhuwuye.com\n\n\n\n127.0.0.1 cadclothes.com\n127.0.0.1 wx.com\n\n127.0.0.1 postapi.plin.cc\n127.0.0.1 login.plin.cc\n127.0.0.1 plin.cc\n127.0.0.1 blog.plin.cc",
				"on": true,
				"where": "local",
				"folder_mode": 0,
				"last_refresh": null,
				"refresh_interval": 0,
				"include": [],
				"children": []
			}],
			"version": [3, 5, 4, 5517]
		}

	});
	webview.html = res;
	webview.postMessage({
		command: "test"
	});
	webview.onDidReceiveMessage((msg) => {
		if (msg.command == 'alert') {
			hx.window.showInformationMessage(msg.text);
			console.log(111)
		}
		if (msg.command == 'onload') {
			read(function(host) {
				webview.postMessage({
					command: 'host',
					text: host
				}, "*");
			})
		}
	});

}
//该方法将在插件禁用的时候调用（目前是在插件卸载的时候触发）
function deactivate() {

}
module.exports = {
	activate,
	deactivate
}
