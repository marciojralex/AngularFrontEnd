var app = angular.module("rota", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "views/task.html",
        controller : "TaskController"
    }).otherwise({redirectTo : "/"});
});