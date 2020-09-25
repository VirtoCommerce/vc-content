(function ($) {
	if (!!$.validator) {
		$.validator.unobtrusive.adapters.addBool("mandatory", "required");
	}
} (jQuery));

$(function () {
    $('.header .nav__item').on('click', function () {
        var self = $(this);

        $('.dropdown-overlay').remove();
        $('body').prepend('<div class="dropdown-overlay"></div>');

        $('.header .nav__item').removeClass('nav__item--active');
        $('.dropdown-menu').removeClass('opened');

        if (self.hasClass('nav__item--active')) {
            self.removeClass('nav__item--active');
            $('.dropdown-menu', self).removeClass('opened');
            $('.dropdown-overlay').remove();
        }
        else {
            self.addClass('nav__item--active');
            $('.dropdown-menu', self).addClass('opened');
        }
    });

    $('.header-toggle').on('click', function () {
        $('body').addClass('swipe-open').prepend('<div class="overlay"></div>');
        $('.swipe').addClass('opened');
    });

    $('.swipe__close').on('click', function () {
        $('body').removeClass('swipe-open');
        $('.swipe').removeClass('opened');
        $('.overlay').remove();
    });

    $(':not(.nav__content) .nav__item').on('click', function () {
        var self = $(this);
        self.addClass('nav__item--active').siblings().removeClass('nav__item--active').addClass('nav__item--animated');
        self.removeClass('nav__item--animated');
        $('.nav__content').removeClass('nav__content--opened').eq(self.index()).addClass('nav__content--opened');

        $('.swipe__nav-item').removeClass('swipe__nav-item--show');
        $('.swipe__nav-item:nth-child(2)').addClass('swipe__nav-item--show');
    });

    $('.swipe__back').on('click', function () {
        $('.swipe__nav-item').removeClass('swipe__nav-item--show');
        $('.swipe__nav-item:nth-child(1)').addClass('swipe__nav-item--show');
        $('.nav__content').removeClass('nav__content--opened');
        $('.nav__item').removeClass('nav__item--animated nav__item--active');
    });

    $('body').delegate('.dropdown-overlay', 'click', function () {
        $('.header .nav__item').removeClass('nav__item--active');
        $('.dropdown-menu').removeClass('opened');
        $('.dropdown-overlay').remove();
    });

    $('.footer__nav').click(function () {
        var nav = $(this).children('.footer__t');
        if (nav.hasClass('footer__t--opened')) {
            nav.removeClass('footer__t--opened');
        } else {
            nav.addClass('footer__t--opened');
        }
    });

    $(document).on('click', '[data-target-show]', function (event) {
        event.preventDefault();
        var target = $(this).data('target-show');
        $("#" + target).show();
        $(this).parent().remove();
    });

    var links = $('.list--team .list__descr a');

    for (var i = 0; i < links.length; i++)
        links[i].dataset.num = i;

    var members = $('.member');

    links.on('click', function () {
        var name = $(this).parent().siblings('.list__t').text();
        $('.modal-header text').text(name);
        members.hide();
        members.eq(this.dataset.num).show();
        $('body').addClass('modal-open');
        $('.modal').css('display', 'block');
    });

    $('.modal-close').click(function () {
        $('.modal').css('display', 'none');
        $('body').removeClass('modal-open');
    });

    var requestDemoForm = $(".section--request form");
    if (requestDemoForm.length) {
        var requestDemoSegmentName = requestDemoForm.data("segment-name");
        $.validator.unobtrusive.parseElement($(".section--request form #agree"), true);

        $(document).on("change", ".section--request form input[name='access']", function () {
            if (this.id === "access1" && this.checked) {
                requestDemoForm.attr("data-segment-name", requestDemoSegmentName);
            } else {
                requestDemoForm.attr("data-segment-name", null);
            }
        });

        $(document).on("change", ".section--request #agree", function () {
            $(this).val(this.checked);
        });

        $(document).on("change", ".section--request form input[name='fullname']", function () {
            var value = $(this).val().trim();
            var firstName = value;
            var lastName = '';
            var index = value.indexOf(' ');
            if (index !== -1) {
                firstName = value.substring(0, index);
                lastName = value.substring(index + 1);
            }
            var form = $(this).closest('form').get(0);
            form.firstName.value = firstName;
            form.lastName.value = lastName;
        });

        requestDemoForm.on('submit', function () {
            if (requestDemoForm.valid()) {
                var checkedItems = $("[data-target-url]:checked", requestDemoForm);
                if (checkedItems.length) {
                    var targetUrl = checkedItems.data('target-url');
                    if (!!targetUrl) {
                        document.location.assign(targetUrl);
                    }
                }
            }
        });
    }

    var replatformForm = $('#replatform-form');
    if (replatformForm.length) {

        replatformForm.submit(function (event) {
            event.preventDefault();
            if (this.checkValidity())
                window.location.href = '/thank-you-replatforming-whitepaper';
        });

        $(document).on('change', '#replatform-form input[name="username"]', function () {
            var value = $(this).val().trim();
            var firstName = value;
            var lastName = '';
            var index = value.indexOf(' ');
            if (index !== -1) {
                firstName = value.substring(0, index);
                lastName = value.substring(index + 1);
            }
            var form = $(this).closest('form').get(0);
            form.firstname.value = firstName;
            form.lastname.value = lastName;
        });
    }

    function caseStudyFormHandler(formSelector, caseStudyRedirectUrl) {
        var form = $(formSelector);
        if (form.length) {
            form.submit(function (event) {
                event.preventDefault();
                if (!this.agree.checked) {
                    $('#agree-error').parent().show();
                    return;
                }
                else
                    $('#agree-error').parent().hide();

                if (this.checkValidity())
                    if (caseStudyRedirectUrl !== undefined) {
                        window.location.href = caseStudyRedirectUrl;
                    } else {
                        return true;
                    }
            });
        }
    }

    caseStudyFormHandler('#asset-form-wp01', 'asset-download-thank-you');
    caseStudyFormHandler('#asset-form-cs01', 'asset-download-thank-you');
    caseStudyFormHandler('#asset-form-cs02', 'asset-download-thank-you');
    caseStudyFormHandler('#asset-form-cs03', 'asset-download-thank-you');
    caseStudyFormHandler('#asset-form-cs04', 'asset-download-thank-you');

    var blockForms = $('.block .form');
    if (blockForms.length) {
        $(document).on('change', '.form-checkbox__input', function () {
            $(this).val(this.checked);
        });

        //$.validator.addMethod('email-is-business', function (value) {
        //    var notAllowedDomains = ['gmail', 'yahoo', 'hotmail', 'aol', 'msn', 'wanadoo', 'orange', 'comcast', 'live', 'rediffmail', 'free', 'gmx', 'web', 'ymail', 'yandex', 'libero', 'outlook', 'uol', 'bol', 'mail', 'cox', 'sbcglobal', 'sfr', 'verizon', 'googlemail', 'ig', 'bigpond', 'terra', 'neuf', 'alice', 'rocketmail', 'att', 'laposte', 'facebook', 'bellsouth', 'charter', 'rambler', 'tiscali', 'shaw', 'sky', 'earthlink', 'optonline', 'freenet', 't-online', 'aliceadsl', 'virgilio', 'home', 'qq', 'telenet', 'me', 'voila', 'planet', 'tin', 'ntlworld', 'arcor', 'frontiernet', 'hetnet', 'zonnet', 'club-internet', 'juno', 'optusnet', 'blueyonder', 'bluewin', 'skynet', 'sympatico', 'windstream', 'mac', 'centurytel', 'chello', 'aim', 'gmx.de'];
        //    value = value.toLowerCase();
        //    for (var domain of notAllowedDomains) {
        //        if (value.indexOf('@' + domain) > -1)
        //            return false;
        //    }
        //    return true;
        //}, 'You have entered the personal email instead of the work email. Please, use your business email.');

        blockForms.submit(function (e) {
            if ($(e.target).valid()) {
                switch (e.target.id) {
                    case 'request_demo_form':
                        dataLayer.push({
                            'event': 'request_demo_form_success',
                            'form': (e.target.elements.product_name) ? e.target.elements.product_name.value : 'no field with name product_name'
                        });
                        break;
                    case 'contact_us_form':
                        dataLayer.push({
                            'event': 'contact_us_form_success',
                            'form': (document.location.pathname === '/contact-us') ? 'Main' : 'Agile'
                        });
                        break;
                    case 'asset_download_form':
                        dataLayer.push({
                            'event': 'asset_download_form_success',
                            'form': (e.target.elements.asset_id) ? e.target.elements.asset_id.value : 'no field with name asset_id'
                        });
                        break;
                }

                var redirectUrl = e.target.dataset.targetUrl;
                if (redirectUrl && redirectUrl != '') {
                    document.location.href = redirectUrl;
                }

                return true;
            } else {
                switch (e.target.id) {
                    case 'request_demo_form':
                        dataLayer.push({
                            'event': 'request_demo_form_fail',
                            'form': (e.target.elements.product_name) ? e.target.elements.product_name.value : 'no field with name product_name'
                        });
                        break;
                    case 'contact_us_form':
                        dataLayer.push({
                            'event': 'contact_us_form_fail',
                            'form': (document.location.pathname === '/contact-us') ? 'Main' : 'Agile'
                        });
                        break;
                    case 'asset_download_form':
                        dataLayer.push({
                            'event': 'asset_download_form_fail',
                            'form': (e.target.elements.asset_id) ? e.target.elements.asset_id.value : 'no field with name asset_id'
                        });
                        break;
                }

                $(e.target).find('.form-error').show();
            }
        });
    }

    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        var linkHref = $(this).attr('href');
        var anchorId = linkHref.substr(linkHref.indexOf('#'));
        var header = $('.header').height();
        var finalOffset = parseInt($(anchorId).offset().top - header) + 'px';
        $('html, body').animate({ scrollTop: finalOffset }, 1250);
    });

    var autopilotWatcher = setInterval(function () {
        if (Autopilot._inited) {
            clearInterval(autopilotWatcher);
            $('button,input[type="submit"][disabled]').removeAttr('disabled');
        }
    }, 1000);

    $('#company').on('change', function () {
        var form = $(this).closest('form');
        var submitBtn = form.children('[type=submit]');
        var targetAccId = "is_target_account";

        $.ajax({
            type: 'GET',
            url: `${targetAccountServiceUrl}&CompanyName=${$(this).val()}`,
            beforeSend: function () {
                form.children(`input[id="${targetAccId}"]`).remove();
                submitBtn.attr('disabled', true);
            },
            success: function (data) {
                form.append(`<input type="text" id="${targetAccId}" name="${targetAccId}" value="${data}" style="display: none" />`);
            },
            complete: function () {
                submitBtn.removeAttr('disabled');
            }
        });
    });
  
	// ?utm_source=asset_downloads&
	//  utm_medium=email&
	//  utm_term=--Asset Type--&
	//  utm_content=--Asset Name--&
	//  utm_campaign=--Campaign--

	if (false) {
		var files = {};
		files['lavazza'] = '/assets/files/lavazza-case-study.pdf';
		var params = parseUrl();
		var attachUrl = files[params.utm_content];
		if (attachUrl) {
			window.location.assign(attachUrl);
		}
		
		function parseUrl() {
			var result = {};
			var vars = document.location.search.substring(1).split('&');
			for (var i = 0; i < vars.length; i++) {
				var pair = vars[i].split('=');
				result[pair[0]] = decodeURIComponent(pair[1]);
			}
			return result;
		}
	}
});
