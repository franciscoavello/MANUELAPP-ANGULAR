
var myApp = angular.module('myApp');

myApp.controller("verEncuestas", function($scope,$http,$rootScope){
      $http.get("http://manuel-api.herokuapp.com/mostrar_encuestas")
        .success(function(data){
          $scope.encuestas = data;          
        })
        .error(function(err){
        });
});

myApp.controller("verTiposEncuestas", function($scope,$http,$rootScope){
      $http.get("http://manuel-api.herokuapp.com/mostrar_tipos_encuestas")
        .success(function(data){
          $scope.tipos = data;          
        })
        .error(function(err){
        });
});

myApp.controller("verProfesores", function($scope,$http){
 $http.get("http://manuel-api.herokuapp.com/buscar_por_rol?rol=1")
    .success(function(data) {
      $scope.profesores = data;
    });

});



myApp.controller('verAlumnos', function ($http, $scope, $state) {
  $http.get("http://manuel-api.herokuapp.com/buscar_por_rol?rol=2")
    .success(function(data) {
      $scope.alumnos = data;
    });
  
});

myApp.controller('verCursos', function ($http, $scope, $state) {
  $http.get("http://manuel-api.herokuapp.com/mostrar_cursos")
    .success(function(data) {
      $scope.cursos = data;
    });
  
});



myApp.controller('agregarAlumno', ['$scope','$http', function($scope,$http) {
 $scope.SendData = function () {
          var alumno={
            nombre:$scope.nombre,
            apellido_paterno: $scope.apellido_paterno,
            apellido_materno: $scope.apellido_materno,
            correo: $scope.correo,
            rut: $scope.rut,
            rol: 2

          }
    $http.post("http://manuel-api.herokuapp.com/usuarios",alumno)
      .success(function() {
        $scope.alertaAgregarAlumno=true;
      });

        };
}]);

myApp.controller('agregarProfesor', ['$scope','$http', function($scope,$http) {
  $scope.agregarProfe = function(){

    $http.post("http://manuel-api.herokuapp.com/usuarios", {
        rut: $scope.rut,
        nombre: $scope.nombre,
        apellido_paterno:$scope.apellido_paterno,
        apellido_materno:  $scope.apellido_materno,
        correo: $scope.correo,
        rol: 1
    }).success(function() {
        
      });
  }
}]);

myApp.controller('agregarCurso', ['$scope','$http', function($scope,$http) {

  $scope.agregar = function() {
    $http.post("http://manuel-api.herokuapp.com/cursos", {
        profesor_id: "1",
        nombre: $scope.nombre,
        semestre: $scope.semestre,
        año: $scope.ano,
        descripcion: $scope.descripcion
}).success(function(data) {
      //console.log(data);
      //$scope.cantidadGrupos=data.length;
    });
  };

  $scope.reset = function(form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    } 
    $scope.encuesta = angular.copy($scope.master);
  };

  $scope.reset();
}]);

myApp.controller('agregarEncuesta', ['$scope','$http', function($scope,$http) {
  

  $scope.update = function() {
    $http.post("http://manuel-api.herokuapp.com/encuesta", {
        estado: true,
        nombre: $scope.nombre,
        descripcion: $scope.descripcion,
        tipo_encuesta_id: 1
    }).success(function(data) {
      //console.log(data);
      //$scope.cantidadGrupos=data.length;
    });
  };

  $scope.reset = function(form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    } 
    $scope.encuesta = angular.copy($scope.master);
  };

  $scope.reset();
}]);


myApp.controller('agregartEncuesta', ['$scope','$http', function($scope,$http) {
  

  $scope.agregar = function() {
    $http.post("http://manuel-api.herokuapp.com/tipos_encuesta", {
        nombre: $scope.nombre,
        descripcion: $scope.descripcion 
      }).success(function(data) {
      //console.log(data);
      //$scope.cantidadGrupos=data.length;
    });
  };

  $scope.reset = function(form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    } 
    $scope.encuesta = angular.copy($scope.master);
  };

  $scope.reset();
}]);

