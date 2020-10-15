var storefrontApp = angular.module('storefrontApp');

storefrontApp.service('newsSubscriberService', ['$http', '$cookies', '$q', function ($http, $cookies, $q) {
    return {
        subscribe: function (email) {
            var deferred = $q.defer();

            var formData = {
                formId: event.target.form.id,
                ip: $cookies.get('current_ip'),
                email: email
            };
            $http({
                method: 'POST',
                url: `/${shopId}/${cultureName}/call`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-XSRF-TOKEN': $cookies.get('XSRF-TOKEN'),
                    service: 'GateLA'
                },
                data: Object.entries(formData).map(elem => `${elem[0]}=${elem[1]}`).join('&')
            })
            .success(() => deferred.resolve('success'))
            .error(() => deferred.reject('error'));

            return deferred.promise;
        }
    }
}]);

storefrontApp.controller('newsSubscriberController', ['$scope', 'newsSubscriberService', function ($scope, newsSubscriberService) {
    $scope.isSubscribing = false;
    $scope.email = '';
    $scope.emailPattern = new RegExp(/((^|((?!^)([,;]|\r|\r\n|\n)))([a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*))+$/);

    $scope.subscribe = function (form) {
        $scope.isSubscribing = true;
        if (form.$valid) {
            newsSubscriberService.subscribe($scope.email).then(() => $scope.isSubscribing = false, () => $scope.isSubscribing = false);
        } else {
            event.preventDefault();
            $scope.isSubscribing = false;
        }
    };
}]);
