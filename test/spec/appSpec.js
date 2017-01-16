describe('Unit Test for app config', function () {
    beforeEach(angular.mock.module('scrum'));

    var locationProvider, routeProvider;
    beforeEach(inject(function ($route) {
        routeProvider = $route;
    }));

    describe('routes', function () {
        it('should associate team template with provided / route', function () {
            expect(routeProvider.routes['/'].templateUrl).toEqual('features/teams/views/scrumTeams.html');
        });

        it('should associate team controller with provided / route', function () {
            expect(routeProvider.routes['/'].controller).toEqual('TeamController');
        });

        it('should associate stories template with provided /stories route', function () {
            expect(routeProvider.routes['/stories'].templateUrl).toEqual('features/stories/views/stories.html');
        });

        it('should associate stories controller with provided /stories route', function () {
            expect(routeProvider.routes['/stories'].controller).toEqual('StoriesController');
        });

        it('should redirect to / route when url is invalid', function () {
            expect(routeProvider.routes[''].redirectTo).toEqual('/');
        });
    });
});