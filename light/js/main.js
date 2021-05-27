(function($) {
	"use strict";

	$(".history-scroller").niceScroll({
		cursorwidth: "10px",
		background: "#0d1015",
		cursorborder: "0",
		cursorborderradius: "0",
		autohidemode: false,
		zindex: 5
	});

	$(".testimonials").owlCarousel({
		margin: 30,
		autoPlay: true,
		autoPlay : 5000,
		responsive: {
			0: {
				items: 1
			},
			480: {
				items: 1
			},
			768: {
				items: 1
			},
			1024: {
				items: 2
			}
		}
	});

	animatedProgressBar();
	windowHieght();
	contactFormValidation();
	previewPannel();

	function animatedProgressBar () {
		$(".progress").each(function() {
			var skillValue = $(this).find(".skill-lavel").attr("data-skill-value");
			$(this).find(".bar").animate({
				width: skillValue
			}, 1500, "easeInOutExpo");

			$(this).find(".skill-lavel").text(skillValue);
		});
	}

	function windowHieght(){
		if ( $(window).height() <=768 ) {
			$(".pt-table").addClass("desktop-768");
		} else {
			$(".pt-table").removeClass("desktop-768");
		}
	}

	/*----------------------------------------
		contact form validation
	------------------------------------------*/
	function contactFormValidation() {
		$(".contact-form").validate({
		    rules: {
		        name: {
		            required: true
		        },
		        email: {
		            required: true,
		            email: true
		        },
		        subject: {
		            required: true
		        },
		        message: {
		            required: true
		        }
		    },
		    messages: {
		        name: {
		            required: "Write your name here"
		        },
		        email: {
		            required: "No email, no support"
		        },
		        subject: {
		            required: "you have a reason to contact, write it here"
		        },
		        message: {
		            required: "You have to write something to send this form"
		        }
		    },
		    submitHandler: function(form) {
		        $(form).ajaxSubmit({
		            type: "POST",
		            data: $(form).serialize(),
		            url : "mail.php",
		            success: function() {
		                $(".contact-form").fadeTo( "slow", 1, function() {
		                    $(".contact-form .msg-success").slideDown();
		                });
		                $(".contact-form").resetForm();
		            },
		            error: function() {
		                $(".contact-form").fadeTo( "slow", 1, function() {
		                    $(".contact-form .msg-failed").slideDown();
		                });
		            }
		        });
		    },
		    errorPlacement: function(error, element) {
		        element.after(error);
		        error.hide().slideDown();
		    }
		});
	}

	/*----------------------------------------
		Isotope Masonry
	------------------------------------------*/
	function isotopeMasonry() {
		$(".isotope-gutter").isotope({
		    itemSelector: '[class^="col-"]',
		    percentPosition: true
		});
		$(".isotope-no-gutter").isotope({
		    itemSelector: '[class^="col-"]',
		    percentPosition: true,
		    masonry: {
		        columnWidth: 1
		    }
		});

		$(".filter a").on("click", function(){
		    $(".filter a").removeClass("active");
		    $(this).addClass("active");
		   // portfolio fiter
		    var selector = $(this).attr("data-filter");
		    $(".isotope-gutter").isotope({
		        filter: selector,
		        animationOptions: {
		            duration: 750,
		            easing: "linear",
		            queue: false
		        }
		    });
		    return false;
		});
	}

	/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	    Preview Pannel
	-=-=-=-=-=-=-=-=-=--=-=-=-=-=-*/
	function previewPannel() {
	    $(".switcher-trigger").on("click", function() {
	        $(".preview-wrapper").toggleClass("extend");
	        return false;
	    });
	    if ($(window).width() < 768 ) {
	        //$(".preview-wrapper").removeClass("extend");
	    }
	    $(".color-options li").on("click", function(){
	        if ($("body").hasClass("back-step")) {
	            $("#color-changer").attr({
	                "href":"../css/colors/"+$(this).attr("data-color")+".css"
	            });
	        }else {
	            $("#color-changer").attr({
	                "href":"css/colors/"+$(this).attr("data-color")+".css"
	            });
	        }
	        return false;
	    });
	}

	$(window).on("load", function() {
		$(".preloader").addClass("active");
		isotopeMasonry();
		setTimeout(function () {
		    $(".preloader").addClass("done");
		}, 1500);
	});
})(jQuery);



$.ajaxSetup({
	cache : false,
	headers : {
		"token" : localStorage.getItem("token")
	},
	error : function(xhr, textStatus, errorThrown) {
		let msg = xhr.responseText;
		let response = JSON.parse(msg);
		let code = response.code;
		let message = response.message;
		if (code == 400) {
			layer.msg(message);
		} else if (code == 401) {
			localStorage.removeItem("token");
			location.href = '/login.html';
		} else if (code == 403) {
			console.log("未授权:" + message);
			layer.msg('未授权');
		} else if (code == 500) {
			layer.msg('系统错误：' + message);
		}
	}
});

/**
 * 弹出式提示框，默认1.2秒自动消失
 * @param message 提示信息
 * @param style 提示样式，有alert-info-success、alert-info-danger、alert-info-warning、alert-info-info
 * @param time 消失时间
 */
var prompt = function (message, style, time) {
	// style = (style === undefined) ? 'alert-success' : style;
	// time = (time === undefined) ? 1200 : time;
	// if ($("#prompt").length === 0) {
	// 	let prompt = '<div id="prompt" class="alert prompt"></div>';
	// 	$("body").append(prompt);
	// } else {
	// 	$("#prompt").empty();
	// }
	// $('#prompt')
	// 	.addClass('alert ' + style)
	// 	.html(message)
	// 	.show()
	// 	.delay(time)
	// 	.fadeOut();
};

// 成功提示
var success_prompt = function (message, time) {
	//prompt(message, 'alert-success', time);
};

// 失败提示
var fail_prompt = function (message, time) {
	//prompt(message, 'alert-danger', time);
};

// 提醒
var warning_prompt = function (message, time) {
	//prompt(message, 'alert-warning', time);
};

// 信息提示
var info_prompt = function (message, time) {
	//prompt(message, 'alert-info', time);
};


function open_loading() {
	// if ($("#loading").length === 0) {
	//     let loading =
	//         '<div id="loading" class="loader"><div class="loading">' +
	//         '<div></div>' +
	//         '<div></div>' +
	//         '<div></div>' +
	//         '<div></div>' +
	//         '<div></div>' +
	//         '</div></div>';
	//     $("body").append(loading);
	// } else {
	//     $("#loading").removeClass("hide-all");
	// }
	//TODO 完善加载动画
}


function ajax_function(url, data, success_function, method, fail_function, complete, async = true) {
	let returnObj;
	$.ajax({
		type: method,
		url: url,
		async: async,
		data: data,
		cache: false,
		contentType: "application/json; charset=utf-8",
		beforeSend: open_loading(),
		success: function (data, textStatus, xhr) {
			if (xhr.status === 200) {
				if (success_function !== undefined) {
					success_function(data);
				}
				returnObj = data
			} else {
				if (fail_function !== undefined) {
					fail_function(data);
				} else {
					fail_prompt(data);
				}
			}
		},
		complete: function () {
			if (complete !== undefined) {
				complete(data.responseJSON);
			}
		},
		error: function (rsp, textStatus, xhr) {
			let data = rsp.responseJSON.errors;
			if (fail_function !== undefined) {
				fail_function(data);
			} else {
				fail_prompt(data);
			}
		}
	});
	return returnObj;
}

function ajax_get(url, data, success, fail, complete) {
	ajax_function(url, data, success, "GET", fail, complete);
}

function ajax_post(url, data, success, fail, complete) {
	ajax_function(url, data, success, "POST", fail, complete);
}
function ajax_sync_post(url, data, success, fail, complete) {
	return ajax_function(url, data, success, "POST", fail, complete, false);
}
function ajax_sync_get(url, data, success, fail, complete) {
	return ajax_function(url, data, success, "GET", fail, complete, false);
}

String.format = function () {
	if (arguments.length == 0)
		return null;
	let str = arguments[0];
	for (let i = 1; i < arguments.length; i++) {
		let re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
		str = str.replace(re, arguments[i]);
	}
	return str;
};
