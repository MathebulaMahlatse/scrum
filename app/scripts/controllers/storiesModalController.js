var app = angular.module('scrum.storiesModal', []);

app.controller('StoriesModalController', [
    '$scope', '$element', 'title', 'close',
    function($scope, $element, title, story, close) {

        $scope.description = story && story.description;
        $scope.estimation = story && story.estimation;
        $scope.owner = story && story.owner;
        $scope.status = story && story.status;

        $scope.title = title;

        $scope.close = function() {
            close({
                description: $scope.description,
                estimation: $scope.estimation,
                owner: $scope.owner,
                status: $scope.status
            }, 500);
        };

        $scope.cancel = function() {
            $element.modal('hide');

            close({
                description: $scope.description,
                estimation: $scope.estimation,
                owner: $scope.owner,
                status: $scope.status
            }, 500);
        };

    }]);