var app = angular.module('scrum.teamModal', []);

app.controller('TeamModalController', [
    '$scope', '$element', 'title', 'close',
    function($scope, $element, title, close) {
        $scope.title = title;
        $scope.teamName = null;

        $scope.close = function() {
            close({
                teamName: $scope.teamName
            }, 500);
        };

        $scope.cancel = function() {
            $element.modal('hide');
            close({
                teamName: $scope.teamName
            }, 500);
        };

    }]);