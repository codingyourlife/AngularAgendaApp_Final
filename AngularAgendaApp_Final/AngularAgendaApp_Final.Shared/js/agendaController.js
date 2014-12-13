(function () {

    // AngularJS Stuff
    var app = angular.module('app', ['ngRoute']);

    app.controller('AgendaController', function ($scope, $http) {
        $scope.Talks = [];

        $scope.talkisnow = function (talk) {
            var now = new Date();
            //var difference_Start_ms = now - new Date(2014, 11, 5);//talk.StartTime;
            //var difference_End_ms = /*talk.EndTime*/ new Date(2014, 11, 7) - now;
            var difference_Start_ms = now - new Date(talk.StartTime);
            var difference_End_ms = new Date(talk.EndTime) - now;
            return (difference_Start_ms > 0) && (difference_End_ms > 0);
        }

        $http.get('http://mdaw.azurewebsites.net/api/Agenda').
            success(function (data) {
                $scope.Talks = data.Talks;
            }).error(function () {
                debugger;
            });
    });

    app.controller('SpeakersController', function ($scope, $http) {
        $scope.Speakers = [];

        $http.get('http://mdaw.azurewebsites.net/api/Speakers').
            success(function (data) {
                $scope.Speakers = data.Speakers;
            }).error(function () {
                debugger;
            });
    });

    app.controller('SponsorsController', function ($scope, $http) {
        $scope.Sponsors = [];

        $http.get('http://mdaw.azurewebsites.net/api/Sponsors').
            success(function (data) {
                $scope.Sponsors = data.Sponsors;
            }).error(function () {
                debugger;
            });
    });

    app.controller('AgendaDetails', ['$scope', '$routeParams',
      function ($scope, $routeParams) {
          $scope.talkId = $routeParams.talkId;
      }]);

    app.directive('agendaHub', function () {
        return {
            restrict: 'E',
            templateUrl: 'directive/agenda-hub.html',
            compile: function (element) {
                var ui = WinJS.UI;
                ui.processAll(element[0]);
            }
        };
    });

    app.config(function ($routeProvider) {
        $routeProvider.
          when('/agenda', {
              template: '<agenda-hub></agenda-hub>'
          })
          .when('/talks/:talkId', {
              templateUrl: 'directive/agenda-details.html',
              controller: 'AgendaDetails'
          })
          .otherwise({
              redirectTo: '/agenda'
          });
    });
})();


