var myApp = angular.module('myApp');

myApp.controller('MsgCtrl', function ($rootScope, auth) {
  $rootScope.message = {text: ''};
});

myApp.controller('MenuCtrl', function ($scope, $location,$rootScope,$timeout) {
  $scope.go = function (target) {
    $location.path(target);
  };
  $scope.cambiarAAyudante = function () {
      $rootScope.rolUserGlobal = 4;
      $rootScope.esAyudante=true;
      console.log($rootScope.esAyudante);
      $rootScope.esAlumno=false;      
      $location.path('/inicioAyudante');
      $rootScope.message.text = 'Sesión de ayudante cargada correctamente';
      $rootScope.mostrarAvisoExito = true;
      console.log($rootScope.mostrarAvisoExito);
      $timeout($scope.desaparecer, 2000); 
      //$state.go('inicioAyudante');
  }

  $scope.cambiarAAlumno = function () {
      $rootScope.rolUserGlobal = 2;
      $rootScope.esAyudante=false;
      $rootScope.esAlumno=true;        
      $location.path('/inicioAlumno');
      $rootScope.message.text = 'Sesión de alumno cargada correctamente';
      $rootScope.mostrarAvisoExito = true;
      console.log($rootScope.mostrarAvisoExito);
      $timeout($scope.desaparecer, 2000);
      //$state.go('inicioAlumno');
  }
});

myApp.controller('RootCtrl', function (auth, $scope) {
  $scope.auth = auth;
  $scope.$watch('auth.profile.name', function(name) {
    if (!name) {
      return;
    }
  });
  $scope.$watch('auth.profile.picture', function(picture) {
    if (!picture) {
      return;
    }
    $scope.picture = auth.picture;
  });
});

myApp.controller('LoginCtrl', function (auth, $scope, $location, store, $http, $state, $rootScope, $timeout) {
  $scope.user = '';
  $scope.pass = '';
  $scope.usuario = [];
  
  if($rootScope.message==undefined){
      $rootScope.message = {text: ''};
  }
  if($rootScope.mostrarAvisoExito==undefined){
      $rootScope.mostrarAvisoExito=false;
  }
  if($rootScope.mostrarAvisoError==undefined){
      $rootScope.mostrarAvisoError=false;
  }
  if($rootScope.mostrarAvisoErrorLocal==undefined){
      $rootScope.mostrarAvisoErrorLocal=false;
  }
  if($rootScope.mostrarAvisoErrorLocal==undefined){
      $rootScope.mostrarAvisoErrorLocal=false;
  }

  $scope.desaparecer = function(){     
        $rootScope.mostrarAvisoExito = false;
        $rootScope.mostrarAvisoError = false;
        $rootScope.mostrarAvisoExitoLocal = false;
        $rootScope.mostrarAvisoErrorLocal = false;
        $rootScope.message.text = '';                 
  };

  function onLoginSuccess(profile, token) {
      $http.get("http://manuel-api2.herokuapp.com/buscar_por_correo?correo="+profile.email) //A la espera de la api, se revisa directamente en rails.
        .success(function(data){
          console.log(data);
          var rolUser = -1;
          var indexUser=false;
          for (prop in data) {
            if(data[prop].correo == profile.email){
              rolUser=data[prop].rol;
              $rootScope.rolUserGlobal = rolUser;
              $rootScope.correoUsuarioLogueado = data[prop].correo;
              indexUser=true;
            }
          };
          if(data.length>0 && indexUser==true){
            $scope.usuario = data;
            if(rolUser==0){
              $scope.esAdmin=true
              store.set('profile', profile);
              store.set('token', token);
              $location.path('/inicioAdmin');
              $scope.logueado = !$scope.logueado;
              $scope.loading = false;
            }
            if(rolUser==1){
              $scope.esProfesor=true
              store.set('profile', profile);
              store.set('token', token);
              $location.path('/inicioProfesor');
              $scope.logueado = !$scope.logueado;
              $scope.loading = false;

            }
            if(rolUser==2){
              $http.get("http://manuel-api2.herokuapp.com/ayudante_curso?correo="+$scope.usuario[0].correo)
              .success(function(data){
                $scope.datosAyudante = data;
                if($scope.datosAyudante.length > 0){  
                  $rootScope.respAyudante=true
                }
                if($rootScope.respAyudante){
                  $rootScope.permisosAyudante=[ 
                    1,                   
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10
                  ];
                  store.set('profile', profile);
                  store.set('token', token);
                  $location.path('/selectorAyudante');
                  $scope.logueado = !$scope.logueado;
                  $scope.loading = false;
                  $rootScope.message.text = 'Sesión iniciada correctamente';
                  $rootScope.mostrarAvisoExito = true;
                  $timeout($scope.desaparecer, 2000);
                }
                else{
                  $scope.permisosAyudante=[];
                  $rootScope.esAlumno=true;
                  store.set('profile', profile);
                  store.set('token', token);
                  $location.path('/inicioAlumno');
                  $scope.logueado = !$scope.logueado;
                  $scope.loading = false;
                }   
                console.log($scope.datosAyudante);
              })
              .error(function(err){

              });           
            }
          }
          else{
            $scope.logueado = true;
            $scope.desloguearNoAutorizado();
          }
        })
        .error(function(err){
            $scope.logueado = true;
            $scope.desloguearNoAutorizado();
        });
  }

  function onLoginFailed() {
      $scope.loading = false;
  }

  $scope.revisarFuncionalidad = function(funcionalidad) {
    for (var i = 0; i < ($rootScope.permisosAyudante.length); i++) {
        if($rootScope.permisosAyudante[i]==funcionalidad){
          return false;
        };
    };
    return true;
  };

  $scope.reset = function() {
    auth.reset({
      email: 'hello@bye.com',
      password: 'hello',
      connection: 'Username-Password-Authentication'
    });
  }

  $scope.submit = function () {
    $scope.loading = true;
    auth.signin({
      connection: 'Username-Password-Authentication',
      username: $scope.user,
      password: $scope.pass,
      authParams: {
        scope: 'openid name email'
      }
    }, onLoginSuccess, onLoginFailed);

  };

  $scope.doGoogleAuthWithPopup = function () {
    $scope.loading = true;
    auth.signin({
      popup: true,
      connection: 'google-oauth2',
      scope: 'openid name email'
    }, onLoginSuccess, onLoginFailed);
  };

  $scope.desloguear = function (profile, token) {
    auth.signout();
    $rootScope.message.text = '';
    store.remove('profile');
    store.remove('token');
    $scope.logueado = !$scope.logueado;
    $scope.esAdmin=false
    $scope.esProfesor=false
    $rootScope.esAlumno=false
    $rootScope.esAyudante=false
    $rootScope.respAyudante=false
    $state.go('root2');
  };

  $scope.desloguearNoAutorizado = function (profile, token) {
    auth.signout();
    $rootScope.message.text = '';
    store.remove('profile');
    store.remove('token');
    $scope.logueado = !$scope.logueado;
    $scope.esAdmin=false
    $scope.esProfesor=false
    $rootScope.esAlumno=false
    $rootScope.esAyudante=false
    $rootScope.respAyudante=false
    $state.go('noAutorizado');
  };

});

