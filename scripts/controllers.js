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

myApp.controller('LoginCtrl', function (auth, $scope, $location, store, $http, $state) {
  $scope.user = '';
  $scope.pass = '';
  $scope.message = '';
  $scope.usuario = [];
  $scope.esAdmin=false
  $scope.esProfesor=false
  $scope.esAlumno=false

  function onLoginSuccess(profile, token) {
    if (profile.email.indexOf('@usach.cl') > -1) {
      $http.get("http://localhost:3000/buscar_por_correo?correo="+profile.email) //A la espera de la api, se revisa directamente en rails.
        .success(function(data){
          console.log(data);
          var rolUser = -1;
          var indexUser=false;
          for (prop in data) {
            if(data[prop].correo == profile.email){
              rolUser=data[prop].rol;
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
            $scope.desloguear();
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
    $state.go('root');  
  };

  $scope.desloguearNoAutorizado = function (profile, token) {
    auth.signout();
    $scope.$parent.message = '';
    store.remove('profile');
    store.remove('token'); 
    $scope.logueado = !$scope.logueado;
    $state.go('noAutorizado');  
  };  

});

myApp.controller('ExampleCtrl', function ($scope){
              $scope.exampleData = [
                  {
                      "key": "Series 1",
                      "values": [ [ 1025409600000 , 0] , [ 1028088000000 , -6.3382185140371] , [ 1030766400000 , -5.9507873460847] , [ 1033358400000 , -11.569146943813] , [ 1036040400000 , -5.4767332317425] , [ 1038632400000 , 0.50794682203014] , [ 1041310800000 , -5.5310285460542] , [ 1043989200000 , -5.7838296963382] , [ 1046408400000 , -7.3249341615649] , [ 1049086800000 , -6.7078630712489] , [ 1051675200000 , 0.44227126150934] , [ 1054353600000 , 7.2481659343222] , [ 1056945600000 , 9.2512381306992] ]
                  },
                  {
                      "key": "Series 2",
                      "values": [ [ 1025409600000 , 0] , [ 1028088000000 , 0] , [ 1030766400000 , 0] , [ 1033358400000 , 0] , [ 1036040400000 , 0] , [ 1038632400000 , 0] , [ 1041310800000 , 0] , [ 1043989200000 , 0] , [ 1046408400000 , 0] , [ 1049086800000 , 0] , [ 1051675200000 , 0] , [ 1054353600000 , 0] , [ 1056945600000 , 0] , [ 1059624000000 , 0] , [ 1062302400000 , 0] , [ 1064894400000 , 0] , [ 1067576400000 , 0] , [ 1070168400000 , 0] , [ 1072846800000 , 0] , [ 1075525200000 , -0.049184266875945] ]
                 },
                 {
                     "key": "Series 3",
                     "values": [ [ 1025409600000 , 0] , [ 1028088000000 , -6.3382185140371] , [ 1030766400000 , -5.9507873460847] , [ 1033358400000 , -11.569146943813] , [ 1036040400000 , -5.4767332317425] , [ 1038632400000 , 0.50794682203014] , [ 1041310800000 , -5.5310285460542] , [ 1043989200000 , -5.7838296963382] , [ 1046408400000 , -7.3249341615649] , [ 1049086800000 , -6.7078630712489] , [ 1051675200000 , 0.44227126150934] , [ 1054353600000 , 7.2481659343222] , [ 1056945600000 , 9.2512381306992] ]
                 },
                 {
                     "key": "Series 4",
                     "values": [ [ 1025409600000 , -7.0674410638835] , [ 1028088000000 , -14.663359292964] , [ 1030766400000 , -14.104393060540] , [ 1033358400000 , -23.114477037218] , [ 1036040400000 , -16.774256687841] , [ 1038632400000 , -11.902028464000] , [ 1041310800000 , -16.883038668422] , [ 1043989200000 , -19.104223676831] , [ 1046408400000 , -20.420523282736] , [ 1049086800000 , -19.660555051587] , [ 1051675200000 , -13.106911231646] , [ 1054353600000 , -8.2448460302143] , [ 1056945600000 , -7.0313058730976] ]
                 }
             ];
});

