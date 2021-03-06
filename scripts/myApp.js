var myApp = angular.module('myApp', [
  'ngCookies', 'auth0', 'ngRoute', 'angular-storage', 'angular-jwt', 'ui.router','ui.materialize', 'chart.js','ngAnimate']);

// Aqui van las rutas que tendra la aplicación.
// requiresLogin significa que se necesita que haya iniciado sesión.

myApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/404");
  $stateProvider
  .state('root', {
    url: "",
    templateUrl: "views/inicio.html",
  })
  .state('root2', {
    url: "/",
    templateUrl: "views/inicio.html",
  })
  .state('inicioAdmin', {
    url: "/inicioAdmin",
    templateUrl: "views/inicioAdmin.html",
    controller: 'LoginCtrl',
    authenticate: true,
    rolVista: 0
  })
  .state('inicioProfesor', {
    url: "/inicioProfesor",
    templateUrl: "views/inicioProfesor.html",
    controller: 'LoginCtrl',
    authenticate: true,
    rolVista: 1
  })
  .state('inicioAlumno',   {
    url: '/inicioAlumno',
    templateUrl: 'views/inicioAlumno.html',
    controller: 'LoginCtrl',
    authenticate: true,
    rolVista: 2
  })
  .state('inicioAyudante',   {
    url: '/inicioAyudante',
    templateUrl: 'views/inicioAyudante.html',
    controller: 'LoginCtrl',
    authenticate: true,
    rolVista: 4
  })
  .state('selectorAyudante',   {
    url: '/selectorAyudante',
    templateUrl: 'views/seleccionAyudante.html',
    controller: 'LoginCtrl',
    authenticate: true
  })
  .state('encuestas', {
      url: "/encuestas",
      templateUrl: "views/alumno/encuestas.html",
      authenticate: true,
      rolVista: 2
    })
    .state('encuestas.pendientes', {
      url: "/pendientes",
      templateUrl: "views/alumno/alumnos-pendientes.html",
      parent: 'encuestas',
      authenticate: true,
      rolVista: 2
    })
    .state('encuestas.completadas', {
      url: "/completadas",
      templateUrl: "views/alumno/alumnos-completadas.html",
      parent: 'encuestas',
      authenticate: true,
      rolVista: 2
    })
    .state('encuestas.estadisticas', {
      url: "/estadisticas",
      templateUrl: "views/alumno/encuesta-estadisticas.html",
      parent: 'encuestas',
      controller: function($scope, $stateParams) {
         $scope.idEncuesta = $stateParams.idEncuesta;
      },
      params: {
        idEncuesta: '0' //default category
      },
      authenticate: true,
      rolVista: 2
    })
    .state('encuestas.estadisticasJefe', {
      url: "/estadisticasJefe",
      templateUrl: "views/alumno/encuesta-estadisticasJefe.html",
      parent: 'encuestas',
      controller: function($scope, $stateParams) {
         $scope.idEncuesta = $stateParams.idEncuesta;
      },
      params: {
        idEncuesta: '0' //default category
      },
      authenticate: true,
      rolVista: 2
    })
    .state('encuestas.estadisticasJefe.graficoJefe', {
      url: "/graficoJefe",
      templateUrl: "views/alumno/encuesta-graficoJefe.html",
      parent: 'encuestas.estadisticasJefe',
      controller: function($scope, $stateParams) {
         $scope.idAlumno = $stateParams.idAlumno;
      },
      params: {
        idAlumno: '0' //default category
      },
      authenticate: true,
      rolVista: 2
    })
    .state('encuestas.estadisticasJefeProyecto', {
      url: "/estadisticasJefeProyecto",
      templateUrl: "views/alumno/encuesta-estadisticasJefeProyecto.html",
      parent: 'encuestas',
      controller: function($scope, $stateParams) {
         $scope.idEncuesta = $stateParams.idEncuesta;
      },
      params: {
        idEncuesta: '0' //default category
      },
      authenticate: true,
      rolVista: 2
    })
    .state('encuestas.estadisticasJefeProyecto.graficoJefeProyecto', {
      url: "/graficoJefeProyecto",
      templateUrl: "views/alumno/encuesta-graficoJefeProyecto.html",
      parent: 'encuestas.estadisticasJefeProyecto',
      controller: function($scope, $stateParams) {
         $scope.idGrupo = $stateParams.idGrupo;
      },
      params: {
        idGrupo: '0' //default category
      },
      authenticate: true,
      rolVista: 2
    })
    .state('encuestas.responder360', {
      url: "/responder360",
      templateUrl: "views/alumno/responder-encuestas-360.html",
      parent: 'encuestas',
      controller: function($scope, $stateParams) {
         $scope.idEncuesta = $stateParams.idEncuesta;
      },
      params: {
        idEncuesta: '0' //default category
      },
      authenticate: true,
      rolVista: 2
    })
    .state('encuestas.responder360.preguntas', {
      url: "/pregunta360",
      templateUrl: "views/alumno/preguntas-encuesta-360.html",
      parent: 'encuestas.responder360',
      controller: function($scope, $stateParams) {
         $scope.idEncuesta = $stateParams.idEncuesta;
         $scope.idAlumno = $stateParams.idAlumno;
      },
      params: {
        idEncuesta: '0', //default category
        idAlumno: '0'
      },
      authenticate: true,
      rolVista: 2
    })
    .state('encuestas.responder', {
      url: "/responder",
      templateUrl: "views/alumno/preguntas-encuesta.html",
      parent: 'encuestas',
      controller: function($scope, $stateParams) {
         $scope.idEncuesta = $stateParams.idEncuesta;
      },
      params: {
        idEncuesta: '0' //default category
      },
      authenticate: true,
      rolVista: 2
    })
  .state('cursos', {
      url: "/cursos",
      templateUrl: "views/profesor/cursos.html",
      authenticate: true,
      rolVista: 1
    })
  .state('detalle-curso', {
      url: "/detalle-curso",
      templateUrl: "views/profesor/detalle-curso.html",
      authenticate: true,
      rolVista: 1
    })
    .state('detalle-curso.perfil', {
      url: "/perfil",
      templateUrl: "views/profesor/profesor-perfil.html",
      authenticate: true,
      rolVista: 1
    })
    .state('detalle-curso.grupos', {
      url: "/grupos",
      templateUrl: "views/profesor/profesor-grupos.html",
      authenticate: true,
      rolVista: 1
    })

    .state('detalle-curso.alumnos', {
      url: "/alumnos",
      templateUrl: "views/profesor/profesor-alumnos.html",
      authenticate: true,
      rolVista: 1

    })
    .state('detalle-curso.evaluaciones', {
      url: "/evaluaciones",
      templateUrl: "views/profesor/profesor-evaluaciones.html",
      authenticate: true,
      rolVista: 1

    })
  .state('detalle-curso.detalle-grupo',{
    url:"/detalle-grupo",
    templateUrl: "views/profesor/detalle-grupo.html",
    authenticate: true,
    rolVista: 1

  })
  .state('detalle-curso.agregar-alumnos-grupo',{
    url:"/agregar-alumnos",
    templateUrl: "views/profesor/agregar-alumnos-grupo.html",
    authenticate: true,
    rolVista: 1

  })
  .state('detalle-curso.detalle-alumno',{
    url:"/detalle-alumno",
    templateUrl: "views/profesor/detalle-alumno.html",
    authenticate: true,
    rolVista: 1

  })
  .state('detalle-curso.detalle-evaluacion',{
    url:"/detalle-evaluacion",
    templateUrl: "views/profesor/detalle-evaluacion.html",
    authenticate: true,
    rolVista: 1

  })
  .state('detalle-curso.agregar-alumno',{
    url:"/agregar-alumno",
    templateUrl: "views/profesor/agregar-alumno.html",
    authenticate: true,
    rolVista: 1

  })
  .state('detalle-curso.agregar-grupo',{
    url:"/agregar-grupo",
    templateUrl: "views/profesor/agregar-grupo.html",
    authenticate: true,
    rolVista: 1

  })
  .state('detalle-curso.nueva-encuesta',{
    url:"/nueva-encuesta",
    templateUrl: "views/profesor/nueva-encuesta.html",
    authenticate: true,
    rolVista: 1

  })

  .state('detalle-curso.ayudante',{
    url:"/ayudante",
    templateUrl: "views/profesor/profesor-ayudante.html",
    authenticate: true,
    rolVista: 1

  })

    //  ADMIN ----------------------------------------------

    .state('adminalumnos', {
      url: "/adminalumnos",
      templateUrl: "views/admin/admin-alumnos.html",
      authenticate: true,
      rolVista: 0
    })

    .state('adminprofesores', {
      url: "/adminprofesores",
      templateUrl: "views/admin/admin-profesores.html",
      authenticate: true,
      rolVista: 0
    })

     .state('admincursos', {
      url: "/admincursos",
      templateUrl: "views/admin/admin-cursos.html",
      authenticate: true,
      rolVista: 0
    })
     .state('admincursos.nuevo', {
      url: "/nuevocurso",
      templateUrl: "views/admin/admin-cursos-nuevo.html",
      authenticate: true,
      rolVista: 0
    })
     .state('admincursos.ver', {
      url: "/vercursos",
      templateUrl: "views/admin/admin-cursos-ac.html",
      authenticate: true,
      rolVista: 0
    })

     .state('adminalumnos.ver', {
      url: "/adminveralumnos",
      templateUrl: "views/admin/admin-alumnos-ac.html",
      authenticate: true,
      rolVista: 0
    })

     .state('adminalumnos.nuevo', {
      url: "/adminnuevoalumno",
      templateUrl: "views/admin/admin-alumnos-nuevo.html",
      authenticate: true,
      rolVista: 0
    })

    .state('adminprofesores.ver', {
      url: "/adminverprofesores",
      templateUrl: "views/admin/admin-profesores-ac.html",
      authenticate: true,
      rolVista: 0
    })
    .state('adminprofesores.nuevo', {
      url: "/adminnuevoprofesor",
      templateUrl: "views/admin/admin-profesores-nuevo.html",
      authenticate: true,
      rolVista: 0
    })
    .state('adminencuestas', {
      url: "/adminencuestas",
      templateUrl: "views/admin/admin-encuestas.html",
      authenticate: true,
      rolVista: 0
    })
    .state('adminencuestas.ver', {
      url: "/adminverencuestas",
      templateUrl: "views/admin/admin-encuestas-ac.html",
      authenticate: true,
      rolVista: 0
    })
    .state('adminencuestas.nuevo', {
      url: "/adminencuestanueva",
      templateUrl: "views/admin/admin-encuestas-nuevo.html",
      authenticate: true,
      rolVista: 0
    })
    .state('admintencuestas', {
      url: "/admintencuestas",
      templateUrl: "views/admin/admin-tencuestas.html",
      authenticate: true,
      rolVista: 0
    })
    .state('admintencuestas.ver', {
      url: "/adminvertencuestas",
      templateUrl: "views/admin/admin-tencuestas-ac.html",
      authenticate: true,
      rolVista: 0
    })
    .state('admintencuestas.nuevo', {
      url: "/admintencuestasnueva",
      templateUrl: "views/admin/admin-te-nueva.html",
      authenticate: true,
      rolVista: 0
    })

    // FIN ADMIN -------------------------------------------
    
    // Ayudante
     .state('cursos-ayudante', {
      url: "/ayudante/cursos",
      templateUrl: "views/ayudante/cursos.html",
      authenticate: true,
      rolVista: 4
    })
  .state('detalle-curso-ayudante', {
      url: "/ayudante/detalle-curso",
      templateUrl: "views/ayudante/detalle-curso.html",
      authenticate: true,
      rolVista: 4
    })
    .state('detalle-curso-ayudante.perfil', {
      url: "/ayudante/perfil",
      templateUrl: "views/ayudante/profesor-perfil.html",
      authenticate: true,
      rolVista: 4
    })
    .state('detalle-curso-ayudante.grupos', {
      url: "/ayudante/grupos",
      templateUrl: "views/ayudante/profesor-grupos.html",
      authenticate: true,
      rolVista: 4
    })
    .state('detalle-curso-ayudante.alumnos', {
      url: "/ayudante/alumnos",
      templateUrl: "views/ayudante/profesor-alumnos.html",
      authenticate: true,
      rolVista: 4

    })
    .state('detalle-curso-ayudante.evaluaciones', {
      url: "/ayudante/evaluaciones",
      templateUrl: "views/ayudante/profesor-evaluaciones.html",
      authenticate: true,
      rolVista: 4

    })
  .state('detalle-curso-ayudante.detalle-grupo',{
    url:"/ayudante/detalle-grupo",
    templateUrl: "views/ayudante/detalle-grupo.html",
    authenticate: true,
    rolVista: 4

  })
  .state('detalle-curso-ayudante.detalle-alumno',{
    url:"/ayudante/detalle-alumno",
    templateUrl: "views/ayudante/detalle-alumno.html",
    authenticate: true,
    rolVista: 4

  })
  .state('detalle-curso-ayudante.detalle-evaluacion',{
    url:"/ayudante/detalle-evaluacion",
    templateUrl: "views/ayudante/detalle-evaluacion.html",
    authenticate: true,
    rolVista: 4

  })
  .state('detalle-curso-ayudante.agregar-alumno',{
    url:"/ayudante/agregar-alumno",
    templateUrl: "views/ayudante/agregar-alumno.html",
    authenticate: true,
    rolVista: 4

  })
  .state('detalle-curso-ayudante.agregar-grupo',{
    url:"/ayudante/agregar-grupo",
    templateUrl: "views/ayudante/agregar-grupo.html",
    authenticate: true,
    rolVista: 4

  })
  .state('detalle-curso-ayudante.nueva-encuesta',{
    url:"/ayudante/nueva-encuesta",
    templateUrl: "views/ayudante/nueva-encuesta.html",
    authenticate: true,
    rolVista: 4

  })

  .state('detalle-curso-ayudante.ayudante',{
    url:"/ayudante/ayudante",
    templateUrl: "views/ayudante/profesor-ayudante.html",
    authenticate: true,
    rolVista: 4

  })
  .state('404',   {
    url: '/404',
    templateUrl: 'views/404.html'
  })
  .state('noAutorizado',   {
    url: '/noAutorizado',
    templateUrl: 'views/noAutorizado.html'
  })
  .state('rolNoAutorizado',   {
    url: '/rolNoAutorizado',
    templateUrl: 'views/rolNoAutorizado.html'
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
    if((toState.rolVista != $rootScope.rolUserGlobal) && (toState.rolVista != undefined)){
      $state.go('rolNoAutorizado');
      event.preventDefault();
    }
  });
});

myApp.filter('capitalize', function() {
    return function(input) {
        return (!!input) ? input.split(' ').map(function(wrd){return wrd.charAt(0).toUpperCase() + wrd.substr(1).toLowerCase();}).join(' ') : '';
    }
});
