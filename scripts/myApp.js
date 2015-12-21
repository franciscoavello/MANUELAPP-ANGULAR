var myApp = angular.module('myApp', [
  'ngCookies', 'auth0', 'ngRoute', 'angular-storage', 'angular-jwt', 'ui.router']);

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
      authenticate: true
    })
  .state('encuestas.recordatorios', {
      url: "/recordatorios",
      templateUrl: "views/alumno/alumnos-recordatorios.html",
      authenticate: true
    })
    .state('encuestas.pendientes', {
      url: "/pendientes",
      templateUrl: "views/alumno/alumnos-pendientes.html",
      authenticate: true
    })
    .state('encuestas.completadas', {
      url: "/completadas",
      templateUrl: "views/alumno/alumnos-completadas.html",
      authenticate: true
    })
    .state('encuestas.responder', {
      url: "/responder",
      templateUrl: "views/alumno/responder-encuestas.html",
      authenticate: true
    })

    //  ADMIN ----------------------------------------------

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

     .state('adminalumnos.ver', {
      url: "/adminveralumnos",
      templateUrl: "views/admin/admin-alumnos-ac.html",
      authenticate: true
    })

     .state('adminalumnos.nuevo', {
      url: "/adminnuevoalumno",
      templateUrl: "views/admin/admin-alumnos-nuevo.html",
      authenticate: true
    })

    .state('adminprofesores.ver', {
      url: "/adminverprofesores",
      templateUrl: "views/admin/admin-profesores-ac.html",
      authenticate: true
    })
    .state('adminprofesores.nuevo', {
      url: "/adminnuevoprofesor",
      templateUrl: "views/admin/admin-profesores-nuevo.html",
      authenticate: true
    })
    .state('adminencuestas', {
      url: "/adminencuestas",
      templateUrl: "views/admin/admin-encuestas.html",
      authenticate: true
    })
    .state('adminencuestas.ver', {
      url: "/adminverencuestas",
      templateUrl: "views/admin/admin-encuestas-ac.html",
      authenticate: true
    })
    .state('adminencuestas.nuevo', {
      url: "/encuestanueva",
      templateUrl: "views/admin/admin-encuestas-nuevo.html",
      authenticate: true
    })
    .state('admintencuestas', {
      url: "/admintencuestas",
      templateUrl: "views/admin/admin-tencuestas.html",
      authenticate: true
    })
    .state('admintencuestas.ver', {
      url: "/adminvertencuestas",
      templateUrl: "views/admin/admin-tencuestas-ac.html",
      authenticate: true
    })
    .state('admintencuestas.nuevo', {
      url: "/admintencuestasnueva",
      templateUrl: "views/admin/admin-te-nueva.html",
      authenticate: true
    })

    // FIN ADMIN -------------------------------------------
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
