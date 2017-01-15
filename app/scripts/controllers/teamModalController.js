var app = angular.module('scrum.teamModal', []);

app.controller('TeamModalController', [
    '$scope', '$element', 'title', 'close',
    function($scope, $element, title, close) {
        $scope.title = title;
        $scope.name = null;

        $scope.submitForm = function() {
            hideModal();
            callBackOnClosingAModal({
                teamName: $scope.name
            });
        };

        $scope.cancel = function() {
            hideModal();
            callBackOnClosingAModal();
        };

        function hideModal() {
            $element.modal('hide')
        }

        function callBackOnClosingAModal(model) {
            close(model, 500);
        }
    }]);