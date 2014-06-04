$( document ).ready(function() {
	
	function loginUser(user) {
		/*$.ajax({
                    url: "http://chaty.st.lviv.ua:5000/api/users/login",
                    type: "POST",
                    dataType: "json",
                  //  contentType: "application/json",
                    data: { name: user.name, sex: user.sex, image: user.image },
                    success: function(secureUserObject) {
                        console.log("login request success");

                        chat.secureUser = secureUserObject; 
                        console.log("logging in new user");
						createSocket(secureUserObject);
                      //  openSocket(thisUser);
                    },
                    error: function(data) {
                        
                        console.log("failed to login: AJAX readystate = " + data.readyState);   
                        console.log(data);

                      
                    }
                });*/
	}
	var displayError = function(err) {

		$('.loggingIn').addClass('invisible');
		$('.loginView').removeClass('invisible');
		$('.conError').html('Ooops.. Server connection failed. Try again later!')
		console.log(err.message);
	}

	var chatClick = function() {

		if ( validateName() &&  $('#imageChoise').val() ) {
			user = { 
				name : $('#username').val(),
				sex :  $('input[name=sex]:checked').val(),
				image : $('#image').attr('src')
				//image: $('#imageChoise').val()
			}			
			$('.loginView').addClass('invisible');
			$('.loggingIn').removeClass('invisible');
			$('.thisUser').attr('src', user.image);
			loginUser(user);

			
		}			
	}
$(window).onbeforeunload = function() {
	logout();
};
	
	var chooseImage = function() {
		if(this.files[0]) {
			var ext = this.files[0].name.split('.').pop().toLowerCase();
			$('.imageError').html('');
			if($.inArray(ext, ['gif','png','jpeg', 'jpg']) == -1) {
	    		$('.imageError').html('File format must be jpg, png or gif!');
			} 
			else {
		        if(this.files[0].size > 500000) {
		        	$('.imageError').html('Image is too large!');
		        }
		        else {
		        	var reader = new FileReader();
			        reader.onload = function (e) {
			            //$('#image').attr('src', e.target.result);
		        	uploadDiv = $('.upload');
					uploadDiv.removeClass('invisible');
					
					    image_url = e.target.result;
					    image = new Image();
					    $(image).load(function () {
					        $('.wholeImage').attr('src', image_url);
					        var top = $('.wholeImage').position().top;
					 		var left = $('.wholeImage').position().left;
							var bottom = top + $('.wholeImage').height();
							var right = left + $('.wholeImage').width();
					        //var rect = element.getBoundingClientRect();
							//console.log(rect.top, rect.right, rect.bottom, rect.left);
					    	$('.croppable').drags({ 'top' : top,
					    		'bottom' : bottom,
					    		'right' : right,
					    		'left' : left 
					    		});
					    	$('.croppable').css({'top': top, 'left': left});
					    });
					    image.src = image_url;
					    var button = $('.cropAvatar');
					    if (!button.isBound('click', cutOffImage)) {
					    	console.log('not bounded');
					    	button.on('click',cutOffImage);
						}
			        }
			        console.log(this.files[0]);
			        reader.readAsDataURL(this.files[0]);

		        }
		    }
		}
	}
	function cutOffImage() {
		    var canvas = document.createElement('canvas');
            canvas.width = 100;
            canvas.height = 100;
            image = new Image($('.wholeImage').width(), $('.wholeImage').height());
            image.src = $('.wholeImage').attr('src');
            //image.height($('.wholeImage').height());// + 'px; height:' +
            	    //$('.wholeImage').height() + 'px');
            var context = canvas.getContext('2d');
            var startPointX = $('.croppable').position().left - $('.wholeImage').position().left + 1;
            var startPointY = $('.croppable').position().top- $('.wholeImage').position().top + 1;
            console.log(startPointX,startPointY);
            context.drawImage(image, startPointX, startPointY, 100, 100, 0, 0, canvas.width, canvas.height);
            uploadDiv.addClass('invisible');
            $('#image').attr('src',canvas.toDataURL());
	}
	var resetImage = function() {
		this.value = null;
	}

	var validateName = function() {
		var errors = [];
		var username = $('#username').val();
		if( username.length < 4 ) {
			errors.push('is too short')
		}
		else if ( username.length > 20 ) {
			errors.push('is too long')
		}
    	var pattern = /^\w*$/g;
    	if(!username.match(pattern)) {
    		errors.push('must contain only characters and digits')
    	}
    	if (usernameExists(username)) {
    		errors.push('already exists');
    	}
		if (errors.length > 0) {
			displayHint(errors);
			return false;
		}
		else {
			$('.nameError').html('');
			return true;
		}
	}
	function displayHint(errors) {
			var errMsg = 'Username ' + errors[0];
			for (var i = 1; i < errors.length; i++) {
				errMsg += ' and ' + errors[i];
			}
			errMsg += '!';
			$('.nameError').html(errMsg);
			$('.hint').removeClass('invisible');
			$('.text').html(errMsg);
	}

	var usernameExists = function(username) {
		var exists  = false;
			/*$.ajax({
				type: "GET",
				url: 'http://chaty.st.lviv.ua/api/users/isLoggedIn/' + username,
				success: function(res){exists = res.success},
				error: function(err){},
				dataType: 'json'
			});*/
			return exists;
	}
	var changeSex = function(e) {
		$('.icon').removeClass('checked');
		$(this).addClass('checked');
		console.log("input[name=mygroup][value=" + $(this).attr('sex') + "]");
		$("input[name=mygroup][value=" + $(this).attr('sex') + "]").prop('checked', true);
	}
	$('.icon').on('click', changeSex);
	
	$('#chatNow').on('click',chatClick);
	$('#imageChoise').on('change',chooseImage);
	$('#imageChoise').on('click',resetImage);
	$('#username').on('focusout',validateName);
	$('#selectImage').click(function(e) {
  		$('#imageChoise').click();
	});


	var getUsersList = function() {
		/*$.ajax({
    		type: "GET",
    		url: 'http://chaty.st.lviv.ua:5000/api/users',
    		success: displayUsers,
    		dataType: 'json'
		});*/
	}
	var displayUsers = function(data) {
		$('.users.online').html('');
		for (var i = 0; i < data.length; i++) {	
    		addUserToList(data[i]);
    	}
    	//console.log($('.user'));
    	makeUsersDrop();
    	
    	
	}
	var makeUsersDrop = function() {
		$('.listSettings').on('click',changeList);
		$('#sendButton').on('click',createMessage);
		$('#logOut').on('click',logout);
		$('#typeMessage').on('keypress', sendMessage);
		jQuery.event.props.push('dataTransfer');
		var dropZoneOne = $('.users.black');
		var dropZoneTwo = $('.users.online');
		var dragElements = $('.user');
		chat.blackUsers = [];
		var elementDragged = null;

		for (var i = 0; i < dragElements.length; i++) {
				makeDraggable(dragElements[i]);
			// Event Listener for when the drag interaction starts.
			
		};
		function makeDraggable(elem) {
			$(elem).on('dragstart', function(e) {
				e.dataTransfer.effectAllowed = 'move';
				e.dataTransfer.setData('text', this.innerHTML);
				elementDragged = $(this);
			});

			// Event Listener for when the drag interaction finishes.
			$(elem).on('dragend', function(e) {
				elementDragged = null;

				});
		}
		function prepareToDrop(e) {
			if (e.preventDefault) {
				e.preventDefault();
			}

			e.dataTransfer.dropEffect = 'move';
			return false;
		}
		function dropUser(e) {
			if (e.preventDefault) e.preventDefault(); 
	  		if (e.stopPropagation) e.stopPropagation(); 
			$(this).removeClass('over');
			if(!elementDragged.parent().hasClass('black')) {
				chat.blackUsers.push(elementDragged.attr('class').split(' ')[0]);
			} 
			$(this).append('<div class="' + elementDragged.attr('class') + '" draggable="true">'+elementDragged.html()+'</div>');
			// Remove the element from the list.
			makeDraggable('.'+elementDragged.attr('class').split(' ')[0]);
			elementDragged.remove();
			//document.querySelector('.users.online').removeChild(elementDragged);
			elementDragged = null;
			return false;
		}

		dropZoneTwo.on('dragover', prepareToDrop);
		dropZoneOne.on('dragover', prepareToDrop);

		dropZoneOne.on('dragenter', function(e) {
			$(this).addClass('over');
		});
		dropZoneTwo.on('dragenter', function(e) {
			$(this).addClass('over');
		});

		dropZoneOne.on('dragleave', function(e) {
			$(this).removeClass('over');
		});
		dropZoneTwo.on('dragleave', function(e) {
			$(this).removeClass('over');
		});
		dropZoneOne.on('drop', dropUser);
		dropZoneTwo.on('drop', dropUser);

	}

	var addUserToList = function(newUser) {
		    	var pattern = /^\w*$/g;
		newUser.name = pattern.exec(newUser.name);
		if (newUser.name != user.name) {
			var usersList = $('.users.online');
			var imagePath = newUser.imageUrl ? chatUrl + newUser.imageUrl : 'images/avatar.png';
			$('.users.online').append('<div draggable="true" class="' + newUser.name + 
				' user tile"><img class="img" src="'+ imagePath + '"><span>' + newUser.name + 
				'</span><span class="' + newUser.sex + '">&#8226;</span></div>');
		}
		$('.' + newUser.name).on('click',selectUser);
	}

	var selectUser = function(event) {
		var value = this.className.split(' ')[0]+', ';
		var tArea = $('textarea');
		tArea.val(value);		
		var strLength= tArea.val().length;
		tArea.focus();
		tArea[0].setSelectionRange(strLength, strLength);
	}

	var createSocket = function() {
		/*
		socket = io.connect('http://chaty.st.lviv.ua:5000');
		console.log(chat.secureUser);
		var userIDObject = {id: chat.secureUser.id};
		console.log(chat.secureUser.id);
		socket.on("connect", function() {
    		socket.emit("enterChat", userIDObject);
    		socket.on("message", postMessage);
    		socket.on("userOnline", welcomeNewUser);
			socket.on("userOffline", byebyeUser);
    		socket.on("chatEntered", function() {});
    		socket.on('error', function(err) {console.log(err)});
        	getUsersList();
        	socket.on('disconnect', function(){console.log('disconnect')});
        	$('.chatView').load('chat.html');
        	$('.loggingIn').addClass('invisible');
        	chat.blackUsers = [];
		 });*/
	}

	var replaceEmoticons = function(str) {
		for(var i = 0; i < emoticons.length; i++) {
			str = str.replace(emoticons[i].regExp, emoticons[i].getHtml());
		}
		return str;
	}

	function postMessage(msg) {
		var username = $("<div>").text(msg.user.name).html();
		if($.inArray(username, chat.blackUsers) === -1) {
			if(msg.isYourMessage) {
				username = 'me';
			}
			var safeMessage = $("<div>").text(msg.message).html();
			var msgText = username + ': ' + safeMessage.replace(/\r\n|\r|\n/g,'<br>')+'<br>';
			msgText = replaceEmoticons(msgText);
			$(".msgTexts").append('<div class="msgText">' + msgText + '</div>');
			$('.timeStamp').append('<div style="height:' + $('.msgText').last().css('height') + '">[' + getTime() + ']</div>');

			var d = $('.messages');
			d.scrollTop(d.prop("scrollHeight"));
		}
	}
	function getTime() {
			var time = new Date();
			var seconds = time.getSeconds() > 9 ? time.getSeconds() : '0' + time.getSeconds();
			var minutes = time.getMinutes() > 9 ? time.getMinutes() : '0' + time.getMinutes();
			var hours = time.getHours() > 9 ? time.getHours() : '0' + time.getHours();
			return hours + ':' + minutes + ':' + seconds;
	}

	function welcomeNewUser(newUser) {
		notify(newUser.name, true);
		addUserToList(newUser);
	}

	function byebyeUser(goneUser) {
		notify(goneUser.name, false);
		$( '.' + goneUser.name ).remove();

	}

	function notify(username, isNew) {

		var notif = $('.notification-text');
		notif.removeClass('dissapear');
		notif.addClass('appear');
		if (isNew) {
			notif.html(username+' is online!');
		} else {
			notif.html(username+' gone offline!');
		}
		setTimeout(function(){notif.removeClass('appear'); notif.addClass('dissapear'); }, 2000);	
	}

});
		var sendMessage = function (e) {
		var key = e.which;

		if (e.keyCode == 10 || e.keyCode == 13) {
			if (e.ctrlKey) {
				console.log('ctrl');
				$('#typeMessage').val($('#typeMessage').val()+'\r\n');
			}
    	else {
    		e.preventDefault();
    		createMessage();
        }
	}
}
		var changeList = function(e) {

				var list = $(this).attr('class').split(' ')[1];
				console.log(list);
				var users = $('.users.' + list);
				if($(users).hasClass('tile')) {
					 users.removeClass('tile');
					 users.addClass('list');
					//users.removeClass('tile');
					
				}
				else {
					users.removeClass('list');
					users.addClass('tile');
				}
		}

	var createMessage = function () {

		var msgText = $('#typeMessage').val();
		var myMessage = {user : chat.secureUser, message: msgText, isYourMessage: true};
		//socket.emit("postMessage", myMessage);
		$('#typeMessage').val('');
	}


	var logout = function() {
		/*
		if (chat.secureUser) {
			$.ajax({
				type: "POST",
				url: 'http://chaty.st.lviv.ua:5000/api/users/logout',
				data: chat.secureUser,
				success: finish,
				error: function(err, text, errorThrown){console.log(err.message); console.log(text); console.log(errorThrown);},
				dataType: 'json'
			});
		}
		else {
			console.log('no secureUser');
		}*/
	}
	var finish = function() {
		location.reload();
	}



function cutImageUp() {
	var image = new Image();
	image.onload = cutImageUp;
	image.src = 'myimage.png';
    var imagePieces = [];
    for(var x = 0; x < numColsToCut; ++x) {
        for(var y = 0; y < numRowsToCut; ++y) {
            var canvas = document.createElement('canvas');
            canvas.width = widthOfOnePiece;
            canvas.height = heightOfOnePiece;
            var context = canvas.getContext('2d');
            context.drawImage(image, x * widthOfOnePiece, y * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, canvas.width, canvas.height);
            imagePieces.push(canvas.toDataURL());
        }
    }
    var anImageElement = document.getElementById('myImageElementInTheDom');
    anImageElement.src = imagePieces[0];
}
		

(function($) {
	//from here http://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/
    $.fn.drags = function(opt) {

        opt = $.extend({handle:"",cursor:"move"}, opt);
        console.log('options ', opt);

        if(opt.handle === "") {
            var $el = this;
        } else {
            var $el = this.find(opt.handle);
        }

        return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
            if(opt.handle === "") {
                var $drag = $(this).addClass('draggable');
            } else {
                var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
            }
            var z_idx = $drag.css('z-index'),
                drg_h = $drag.outerHeight(),
                drg_w = $drag.outerWidth(),
                pos_y = $drag.offset().top + drg_h - e.pageY,
                pos_x = $drag.offset().left + drg_w - e.pageX;
            $drag.css('z-index', 1000).parents().on("mousemove", function(e) {
            	var topPos = Math.max(e.pageY + pos_y - drg_h, opt.top + drg_h);
            	topPos = Math.min(topPos, opt.bottom);
            	var leftPos = Math.max(e.pageX + pos_x - drg_w, opt.left);
                leftPos = Math.min(leftPos, opt.right -drg_w);
                $('.draggable').offset({
                    top: topPos,
                    left: leftPos
                }).on("mouseup", function() {
                    $(this).removeClass('draggable').css('z-index', z_idx);
                });
            });
            e.preventDefault(); // disable selection
        }).on("mouseup", function() {
            if(opt.handle === "") {
                $(this).removeClass('draggable');
            } else {
                $(this).removeClass('active-handle').parent().removeClass('draggable');
            }
        });

    }
    $.fn.isBound = function(type, fn) {
    	console.log($._data(this.get(0), "events"));

	    var data = $._data(this.get(0), "events");
	    if(data) {
	    	var handlers = data[type];
	    	if (data === undefined || data.length === 0) {
		        return false;
		    }
		    console.log(fn, handlers);
		    console.log(handlers.length);
		    for(var i = 0; i < handlers.length; i++) {
		    	console.log(handlers.handler);
		    	if(fn === handlers[i].handler) {
		    		return true;
		    	}
		    }
	    }
	    else {
	    	return false;
	    }

	}
})(jQuery);	


