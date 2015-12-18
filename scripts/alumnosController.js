var myApp = angular.module('myApp');

myApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('recordatorios', {
      url: "/recordatorios",
      templateUrl: "views/alumno/alumnos-recordatorios.html"
    })
    .state('pendientes', {
      url: "/pendientes",
      templateUrl: "views/alumno/alumnos-pendientes.html"
    })
    .state('completadas', {
      url: "/completadas",
      templateUrl: "views/alumno/alumnos-completadas.html"
    })
    .state('responder', {
      url: "/responder",
      templateUrl: "views/alumno/responder-encuestas.html"
    });
});