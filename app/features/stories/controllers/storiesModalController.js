var app = angular.module('scrum.storiesModal',
    [
        'scrum.teamStoriesServices'
    ]);

app.controller('StoriesModalController', [
    '$scope', '$element', 'title', 'close', 'TeamStoriesServices',
    function($scope, $element, title, close, TeamStoriesServices) {
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

            $scope.ownerOfStory = TeamStoriesServices.getResources();

            if(_.isUndefined(title)) {
                $scope.status = $scope.statusOfTasks[0];
                $scope.estimation = $scope.estimationStages[0];
                $scope.owner = $scope.ownerOfStory[0];
            }
        }

        function hideModal() {
            $element.modal('hide');
        }

        function closeModal(story) {
            close(story, 500);
        }

    }]);