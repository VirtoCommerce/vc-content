(function ($) {
    if (!!$.validator) {
        $.validator.unobtrusive.adapters.addBool("mandatory", "required");
    }
}(jQuery));

$(function () {
    var cookies = document.cookie.split(';');
    var currentIpCookie = null;
    var token = null;

    for (var cookie of cookies) {
        if (cookie.startsWith(' current_ip=')) {
            currentIpCookie = cookie;
        }
        if (cookie.startsWith(' XSRF-TOKEN=')) {
            token = cookie.replace(' XSRF-TOKEN=', '');
        }
    }

    var currentIp = null;
    if (currentIpCookie) {
        currentIp = currentIpCookie.replace(' current_ip=', '');
    } else {
        $.ajax({
            url: `https://api.ipdata.co?api-key=d55d3413982d00ce1d4ef0008d06578d74f3a96deed0ae2f0f6f10da&fields=ip`,
            success: function (data) {
                if (data.ip) {
                    currentIp = data.ip;
                    document.cookie = `current_ip=${currentIp}; max-age=86400`;
                }
            }
        });
    }

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

    $(':not(.nav__content) .nav__item:not(.nav__item--no-subitems)').on('click', function () {
        var self = $(this);
        if (self.find('.nav__t').length === 0) {
            self.addClass('nav__item--active').siblings().removeClass('nav__item--active').addClass('nav__item--animated');
            self.removeClass('nav__item--animated');
            $('.nav__content').removeClass('nav__content--opened').eq(self.index()).addClass('nav__content--opened');

            $('.swipe__nav-item').removeClass('swipe__nav-item--show');
            $('.swipe__nav-item:nth-child(2)').addClass('swipe__nav-item--show');
        }
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

    var blockForms = $('.block .form');
    if (blockForms.length) {
        $(document).on('change', '.form-checkbox__input', function () {
            $(this).val(this.checked);
        });

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

                var form = $(this);
                var submitBtn = form.children('[type=submit]');

                var request = $.ajax({
                    method: 'POST',
                    url: `/${shopId}/${cultureName}/call`,
                    data: {
                        formId: form.attr('id'),
                        ip: currentIp,
                        parameters: form.serialize()
                    },
                    headers: { 'X-XSRF-TOKEN': token, service: 'GateLA' },
                    beforeSend: () => submitBtn.attr('disabled', true),
                    error: function (jqXHR) {
                        var error = 'An error occurred at sending form. Please refresh the page and fill in the form again or try again later.';
                        if (jqXHR.status === 400) {
                            error = 'Your session has expired. Please refresh the page and fill in the form again.';
                        }

                        var reqError = form.children('.req-error');
                        if (reqError.length === 0) {
                            form.append($(`<span class="req-error form-error field-validation-valid" data-valmsg-replace="true">${error}</span>`));
                        } else {
                            reqError.text(error);
                        }
                    },
                    complete: () => submitBtn.removeAttr('disabled')
                });

                var fieldsets = $(this).closest('form').find('fieldset');
                if (fieldsets.length > 0) {
                    var results = $.map(fieldsets, function (element) {
                        var question = $(element).find('legend').text();
                        var variants = $.map($(element).find('input[value="true"]'), i => $(i).next().text()).join(', ');
                        return `${question}: ${variants}`;
                    }).join('; ');
                    
                    $.ajax({
                        method: 'POST',
                        url: `/${shopId}/${cultureName}/call`,
                        data: {
                            url: document.location.pathname,
                            formId: form.attr('id'),
                            results: results
                        },
                        headers: { 'X-XSRF-TOKEN': token, service: 'SurveyCollector' }
                    });
                }

                setTimeout(function () {
                    var requestIsSent = !request.status;
                    if (requestIsSent || (request.status && request.status >= 200 && request.status < 400)) {
                        var redirectUrl = form.data('targetUrl');
                        if (redirectUrl && redirectUrl !== '') {
                            document.location.href = redirectUrl;
                        }
                    }
                }, 2500);

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

    function scrollBody(toElement) {
        var header = $('.header').height();
        var finalOffset = parseInt($(toElement).offset().top - header) + 'px';
        $('html, body').animate({ scrollTop: finalOffset }, 1250);
    }

    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        var linkHref = $(this).attr('href');
        var anchorId = linkHref.substr(linkHref.indexOf('#'));
        scrollBody(anchorId);
    });

    $('.gradient-btn').on('click', function () {
        var url = $(this).children('.gradient-btn-link').attr('href');
        if (url) {
            document.location.assign(url);
        }
    });

    $('.more-button').on('click', function () {
        var list = $(this).siblings('.list');
        var pageSize = list.data('page-size');
        var items = list.children('.list__item[hidden]');
        var endOfItems = items.length <= pageSize;
        var end = endOfItems ? items.length : pageSize;
        for (var i = 0; i < end; i++) {
            items[i].removeAttribute('hidden');
        }
        scrollBody(items[0]);
        if (endOfItems) {
            $(this).remove();
        }
    });

    var headlinesWithFormAndBoundValueResult = $('[id*="headlinewithformandboundvalueresult"]');
    if (headlinesWithFormAndBoundValueResult.length > 0) {
        $.ajax({
            url: `https://api.ipdata.co?api-key=d55d3413982d00ce1d4ef0008d06578d74f3a96deed0ae2f0f6f10da&fields=country_code`,
            success: function (data) {
                if (data.country_code) {
                    $.ajax({
                        method: 'POST',
                        url: `/${shopId}/${cultureName}/call`,
                        data: {
                            country_code: data.country_code
                        },
                        headers: { 'X-XSRF-TOKEN': token, service: 'RegionByCountryCode' },
                        success: function (data) {
                            var ownerInfoValues = headlinesWithFormAndBoundValueResult.find('.owner-info[data-val]');
                            for (var ownerInfoValue of ownerInfoValues) {
                                var val = ownerInfoValue.dataset.val;
                                var values = val.split(';');
                                for (var value of values) {
                                    if (value === data) {
                                        var jqOwnerInfoValue = $(ownerInfoValue);
                                        jqOwnerInfoValue.toggleClass('d-none');
                                        jqOwnerInfoValue.animate({ opacity: 1 }, 750);
                                        break;
                                    }
                                }
                            }
                        }
                    });
                }
            }
        });
    }

    var blogSearchCriteria = {
        pageNumber: 2
    };

    function blogBtnToggleVisibility(length) {
        var olderBtn = $('.blog-older');
        if (length < blogSearchCriteria.pageSize) {
            olderBtn.addClass('d-none');
        } else {
            olderBtn.removeClass('d-none');
        }
    }

    $('.list--tags .list__item').on('click', function () {
        var self = $(this);
        if (self.is('[disabled]')) {
            event.preventDefault();
            return;
        }

        var list = self.closest('.list--tags');
        var items = list.children('.list__item');
        items.attr('disabled', true);
        items.filter('.list__item--active').toggleClass('list__item--active');
        self.toggleClass('list__item--active');

        var posts = $('.list.list--posts');
        blogSearchCriteria.category = self.data('category');
        blogSearchCriteria.pageNumber = 1;
        blogSearchCriteria.pageSize = posts.data('page-size');

        $.ajax({
            method: 'POST',
            url: `/storefrontapi/blog/news/search`,
            headers: { 'X-XSRF-TOKEN': token, 'Content-Type': 'application/json' },
            data: JSON.stringify(blogSearchCriteria),
            success: function (data) {
                posts.children().remove();
                blogBtnToggleVisibility(data.length);
                for (var item of data) {
                    posts.append(new BlogItem(item).toHTML());
                }
                blogSearchCriteria.pageNumber++;
            },
            complete: () => items.removeAttr('disabled')
        });
    });

    $('.blog-older').on('click', function () {
        var list = $(this).siblings('.list');

        blogSearchCriteria.pageSize = list.data('page-size');

        $.ajax({
            method: 'POST',
            url: `/storefrontapi/blog/news/search`,
            headers: { 'X-XSRF-TOKEN': token, 'Content-Type': 'application/json' },
            data: JSON.stringify(blogSearchCriteria),
            success: function (data) {
                blogBtnToggleVisibility(data.length);
                for (var item of data) {
                    list.append(new BlogItem(item).toHTML());
                }
                var indexOfFirstElementInTake = (blogSearchCriteria.pageNumber - 1) * blogSearchCriteria.pageSize;
                scrollBody(list.children('.list__item').eq(indexOfFirstElementInTake));
                blogSearchCriteria.pageNumber++;
            }
        });
    });

    $('.show-bio').one('click', function () {
        var showBio = $(this);
        showBio.next('.bio').removeClass('d-none');
        showBio.remove();
    });

    var subscribeNewsButtons = $('#subscribe_news, #subscribe_news_footer').children('[type="submit"]');
    subscribeNewsButtons.on('click', function (e) {
        var form = $(e.target.form);
        if (form.valid()) {
            $.ajax({
                method: 'POST',
                url: `/${shopId}/${cultureName}/call`,
                headers: { 'X-XSRF-TOKEN': token, service: 'GateLA' },
                data: {
                    formId: form.attr('id'),
                    ip: currentIp,
                    email: form.find('input[name*="email"]').val() || form.find('input[name*="Email"]').val()
                },
                beforeSend: () => subscribeNewsButtons.attr('disabled', true),
                success: function () {
                    form.find('input[type="text"]').val('');
                    if (form.attr('id') == 'subscribe_news') {
                        document.location.href = '/thank-you-newsletters';
                    }
                },
                complete: () => subscribeNewsButtons.removeAttr('disabled')
            });
        } else {
            e.preventDefault();
        }
    });
});
