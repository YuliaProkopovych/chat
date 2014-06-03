var chat = function() {
	var secureUser;
	var blackUsers;
	var socket;
	var user;
	this.user = user;
	this.blackUsers = [];
	this.socket = socket;
	this.secureUser = undefined;
};
chat();
chat.blackUsers = [];
var chatUrl = 'http://chaty.st.lviv.ua:5000';


function Emoticon(text, regExp, path) {
  this.text = text;
  this.path = path;
  this.regExp = regExp;
}

Emoticon.prototype.getHtml = function() {
	return '<span><img src="' + this.path + '"></span>';
};
var emoticons = [new Emoticon(':)', /:\)/g, 'images/smile.png'), 
				new Emoticon(';)', /;\)/g, 'images/wink.png'),
				new Emoticon(':(', /:\(/g, 'images/sadsmile.png'),
				new Emoticon(';(', /;\(/g, 'images/crying.png'),
				new Emoticon(':D', /:D/g, 'images/bigsmile.png'),
				new Emoticon(':d', /:d/g, 'images/bigsmile.png'),
				new Emoticon(':P', /:P/g, 'images/tongueout.png'),
				new Emoticon(':p', /:p/g, 'images/tongueout.png'),
				new Emoticon(':\*', /:\*/g, 'images/kiss.png')
				]