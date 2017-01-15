var app = angular.module('scrum.storiesModal', []);

app.controller('StoriesModalController', [
    '$scope', '$element', 'title', 'close',
    function($scope, $element, title, close) {
        $scope.description = title && title.description;
        $scope.estimation = title && title.estimation;
        $scope.owner = title && title.owner;
        $scope.status = title && title.status;

        initializeData();

        $scope.submitForm = function() {
            hideModal();
            closeModal({
                storyId: title && title.storyId,
                description: $scope.description,
                estimation: $scope.estimation,
                owner: $scope.owner,
                status: $scope.status
            })
        };

        $scope.cancel = function() {
            hideModal();
            closeModal()
        };

        function initializeData() {
            if(_.isUndefined(title)) {
                $scope.status = 'backlog';
                $scope.estimation = 'small';
                $scope.owner = 'Mahlatse - Product Owner'
            }

            $scope.statusOfTasks = [
                'backlog',
                'todo',
                'in progress',
                'done'
            ];

            $scope.estimationStages = [
                'small',
                'medium',
                'large'
            ];

            $scope.ownerOfStory = [
                'Mahlatse - Product Owner',
                'Sharon - BA',
                'William - The developer'
            ];
        }

        function hideModal() {
            $element.modal('hide');
        }

        function closeModal(story) {
            close(story, 500);
        }

    }]);