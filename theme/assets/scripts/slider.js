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
});
