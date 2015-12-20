myApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/404");
  $stateProvider
    .state('adminalumnos', {
      url: "/adminalumnos",
      templateUrl: "views/admin/admin-alumnos.html",
      authenticate: true
    })
    .state('adminprofesores', {
      url: "/adminprofesores",
      templateUrl: "views/admin/admin-profesores.html",
      authenticate: true
    })
    .state('adminencuestas', {
      url: "/adminencuestas",
      templateUrl: "views/admin/admin-encuestas.html",
      authenticate: true
    })
    .state('admintencuestas', {
      url: "/admintencuestas",
      templateUrl: "views/admin/admin-tencuestas.html",
      authenticate: true
    })
    .state('admintencuestasnueva', {
      url: "/admintencuestasnueva",
      templateUrl: "views/admin/admin-te-nueva.html",
      authenticate: true
    })
});