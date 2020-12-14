$(function () {
    function showCard(selected, elementToDisplay) {
        selected.animate({ opacity: 0 }, 750, null, function () {
            selected.css('display', 'none');
            elementToDisplay.addClass('card-review--selected');
            elementToDisplay.css('display', 'block');
            elementToDisplay.animate({ opacity: 1 }, 750);
        });
    }

    $('.block .slider-arrow').on('click', function () {
        var arrow = $(this);
        var cards = arrow.siblings('.cards');
        var selected = cards.children('.card-review--selected');
        selected.removeClass('card-review--selected');

        var elementToDisplay = null;
        if (arrow.hasClass('slider-arrow--left')) {
            elementToDisplay = selected.prev('.card-review');
            if (elementToDisplay.length === 0) {
                elementToDisplay = cards.children('.card-review:last');
            }
        } else if (arrow.hasClass('slider-arrow--right')) {
            elementToDisplay = selected.next('.card-review');
            if (elementToDisplay.length === 0) {
                elementToDisplay = cards.children('.card-review:first');
            }
        }
        showCard(selected, elementToDisplay);
    });

    function swipeHandler(selected, elementToDisplay, edgeSelector) {
        selected.removeClass('card-review--selected');
        if (elementToDisplay.hasClass('card-review')) {
            showCard(selected, elementToDisplay);
        } else {
            var edge = selected.parent().children(edgeSelector);
            showCard(selected, edge);
        }
    }

    $('.block .card-review').on('swipeleft', function () {
        swipeHandler($(this), $(this).next(), '.card-review:first');
    });

    $('.block .card-review').on('swiperight', function () {
        swipeHandler($(this), $(this).prev(), '.card-review:last');
    });

    $('.block .slider-arrow--left').on('mousemove', function () {
        $(this).siblings('.slider-arrow--right').css('visibility', 'hidden');
    });

    $('.block .slider-arrow--left').on('mouseout', function () {
        $(this).siblings('.slider-arrow--right').css('visibility', 'visible');
    });

    $('.block .slider-arrow--right').on('mousemove', function () {
        $(this).siblings('.slider-arrow--left').css('visibility', 'hidden');
    });

    $('.block .slider-arrow--right').on('mouseout', function () {
        $(this).siblings('.slider-arrow--left').css('visibility', 'visible');
    });

    var coverItems = $('.block--cover-items');
    if (coverItems.length > 0) {
        var animateBlock = function (block, element, classIndicator, animationClass, useCoverClassPrefix) {
            for (var classname of element.classList) {
                if (classname.startsWith(classIndicator) && !classname.endsWith('--scrolled')) {
                    block.toggleClass(animationClass);
                    block.toggleClass(useCoverClassPrefix ? `block--${classname}` : classname);
                }
            }
        };

        var mouseWheelHandler = function (e) {
            var delta = e.deltaY || e.detail || e.wheelDelta;
            if (delta > 0) {
                e.preventDefault();
                var target = $(e.currentTarget);
                if (!target.hasClass('morph-show') && !target.hasClass('morph-hide')) {
                    target.trigger('swipedown');
                }
            }
        };

        var isMozillaBrowser = /Firefox/i.test(navigator.userAgent);
        var mozillaMouseEventName = 'DOMMouseScroll';

        coverItems.on('swipedown', function () {
            var block = $(this);
            var lastScrolled = block.find('.cover-item--scrolled:last');
            var next = lastScrolled.next();
            if (next.length > 0) {
                next.addClass('cover-item--scrolled');
                block.toggleClass('morph-hide');
                lastScrolled.animate({ opacity: 0 }, 750, null, function () {
                    animateBlock(block, block[0], 'block--cover-item-', 'morph-hide');
                    lastScrolled.css('display', 'none');
                    animateBlock(block, next[0], 'cover-item-', 'morph-show', true);
                    next.css('display', 'flex');
                    next.animate({ opacity: 1 }, 750, null, () => block.toggleClass('morph-show'));
                });
            } else {
                if (isMozillaBrowser) {
                    block[0].removeEventListener(mozillaMouseEventName, mouseWheelHandler);
                } else {
                    block[0].onmousewheel = null;
                }
            }
        });

        for (var item of coverItems) {
            if (isMozillaBrowser) {
                item.addEventListener(mozillaMouseEventName, mouseWheelHandler);
            } else {
                item.onmousewheel = mouseWheelHandler;
            }
        }
    }
});
