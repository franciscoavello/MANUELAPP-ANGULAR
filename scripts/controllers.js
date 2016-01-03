var myApp = angular.module('myApp');

myApp.controller('MenuCtrl', function ($scope, $location) {
  $scope.go = function (target) {
    $location.path(target);
  };
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

myApp.controller('LoginCtrl', function (auth, $scope, $location, store, $http, $state, $rootScope) {
  $scope.user = '';
  $scope.pass = '';
  $scope.message = '';
  $scope.usuario = [];
  $scope.esAdmin=false
  $scope.esProfesor=false
  $scope.esAlumno=false

  function onLoginSuccess(profile, token) {
    if (profile.email.indexOf('@usach.cl') > -1) {
      $http.get("http://manuel-api.herokuapp.com/buscar_por_correo?correo="+profile.email) //A la espera de la api, se revisa directamente en rails.
        .success(function(data){
          console.log(data);
          var rolUser = -1;
          var indexUser=false;
          for (prop in data) {
            if(data[prop].correo == profile.email){
              rolUser=data[prop].rol;
              $rootScope.rolUserGlobal = rolUser;
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
              $scope.esAlumno=true
              store.set('profile', profile);
              store.set('token', token);
              $location.path('/inicioAlumno');
              $scope.logueado = !$scope.logueado;
              $scope.loading = false;
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
    } else {
      $scope.logueado = true;
      $scope.desloguearNoAutorizado();
    }
  }

  function onLoginFailed() {
      $scope.loading = false;
  }

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
      scope: 'openid name email',
      hd: 'usach.cl'
    }, onLoginSuccess, onLoginFailed);
  };

  $scope.desloguear = function (profile, token) {
    auth.signout();
    $scope.$parent.message = '';
    store.remove('profile');
    store.remove('token');
    $scope.logueado = !$scope.logueado;
    $scope.esAdmin=false
    $scope.esProfesor=false
    $scope.esAlumno=false
    $state.go('root2');
  };

  $scope.desloguearNoAutorizado = function (profile, token) {
    auth.signout();
    $scope.$parent.message = '';
    store.remove('profile');
    store.remove('token');
    $scope.logueado = !$scope.logueado;
    $scope.esAdmin=false
    $scope.esProfesor=false
    $scope.esAlumno=false
    $state.go('noAutorizado');
  };

});
