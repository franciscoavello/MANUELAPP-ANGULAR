var myApp = angular.module('myApp', [
  'ngCookies', 'auth0', 'ngRoute', 'angular-storage', 'angular-jwt', 'ui.router','ui.materialize', 'nvd3ChartDirectives']);

// Aqui van las rutas que tendra la aplicación.
// requiresLogin significa que se necesita que haya iniciado sesión.

myApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/404");
  $stateProvider
  .state('root', {
    url: "",
    templateUrl: "views/inicio.html",
  })
  .state('inicioAdmin', {
    url: "/inicioAdmin",
    templateUrl: "views/inicioAdmin.html",
    controller: 'LoginCtrl',
    authenticate: true
  })
  .state('inicioProfesor', {
    url: "/inicioProfesor",
    templateUrl: "views/inicioProfesor.html",
    controller: 'LoginCtrl',
    authenticate: true
  })
  .state('inicioAlumno',   {
    url: '/inicioAlumno',
    templateUrl: 'views/inicioAlumno.html',
    controller: 'LoginCtrl',
    authenticate: true
  })
  .state('encuestas', {
      url: "/encuestas",
      templateUrl: "views/alumno/encuestas.html",
      authenticate: true,
    })
    .state('encuestas.recordatorios', {
      url: "/recordatorios",
      templateUrl: "views/alumno/alumnos-recordatorios.html",
      parent: 'encuestas',
      authenticate: true
    })
    .state('encuestas.pendientes', {
      url: "/pendientes",
      templateUrl: "views/alumno/alumnos-pendientes.html",
      parent: 'encuestas',
      authenticate: true
    })
    .state('encuestas.completadas', {
      url: "/completadas",
      templateUrl: "views/alumno/alumnos-completadas.html",
      parent: 'encuestas',
      authenticate: true
    })
    .state('encuestas.responder', {
      url: "/responder",
      templateUrl: "views/alumno/responder-encuestas.html",
      parent: 'encuestas',
      authenticate: true
    })
    .state('encuestas.responder.preguntas', {
      url: "/preguntas",
      templateUrl: "views/alumno/preguntas-encuesta.html",
      parent: 'encuestas.responder',
      authenticate: true
    })
  .state('404',   {
    url: '/404',
    templateUrl: 'views/404.html'
  })
  .state('noAutorizado',   {
    url: '/noAutorizado',
    templateUrl: 'views/noAutorizado.html'
  })
  .state('500',   {
    url: '/500',
    templateUrl: 'views/500.html'
  });
});

myApp.config(function ($routeProvider, authProvider, $httpProvider,
  jwtInterceptorProvider) {

    authProvider.init({
    domain: 'franciscoavello.auth0.com',
    clientID: 'hxAwRC2DqVpgB7STEkgGWSN59gNtUNix',
    loginUrl: '500'
  });

  jwtInterceptorProvider.tokenGetter = function(store) {
    return store.get('token');
  }

// Solo configuracion del login

  $httpProvider.interceptors.push('jwtInterceptor');
}).run(function($rootScope, auth, store, jwtHelper, $location, $state) {
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    if (toState.authenticate && !auth.isAuthenticated){
      // User isn’t authenticated
      $state.go('500');
      event.preventDefault();
    }
  });
});
