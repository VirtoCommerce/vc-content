$(function () {
    $(document).on('click', 'form[data-segment-name] button[type="submit"]', function (event) {
        var $form = $(this).closest('form');
        if ($form.hasClass('ng-valid')) {
            var eventName = $form.data('segment-name');
            if (eventName) {
                var props = {};
                $form.find('[data-segment-name]').each(function () {
                    var $this = $(this);
                    var propertyName = $(this).data('segment-name');
                    applyValue(props, propertyName, $this.val());
                });
                if (props.email) {
                    analytics.alias(props.email);
                    analytics.identify(props.email, props);
                }
                analytics.track(eventName, props);
            }
        }
    });

    function applyValue(obj, path, val) {
        if (path.indexOf('.') !== -1) {
            var parts = path.split('.');
            var currentObj = obj;
            for (var i = 0; i < parts.length - 1; i++) {
                var propertyName = parts[i];
                var prop = currentObj[propertyName] || {};
                currentObj[propertyName] = prop;
                currentObj = prop;
            }
            currentObj[parts[parts.length - 1]] = val;
        } else {
            obj[path] = val;
        }
    }
});
