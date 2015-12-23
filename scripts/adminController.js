
var myApp = angular.module('myApp');

myApp.controller("verEncuestas", function($scope,$http,$rootScope){
      $http.get("http://localhost:3000/mostrar_encuestas")
        .success(function(data){
          $scope.encuestas = data;          
        })
        .error(function(err){
        });
});

myApp.controller("verTiposEncuestas", function($scope,$http,$rootScope){
      $http.get("http://localhost:3000/mostrar_tipos_encuestas")
        .success(function(data){
          $scope.tipos = data;          
        })
        .error(function(err){
        });
});

myApp.controller("verProfesores", function($scope,$http){
 $http.get("http://localhost:3000/buscar_por_rol?rol=1")
    .success(function(data) {
      $scope.profesores = data;
    });

});



myApp.controller('verAlumnos', function ($http, $scope, $state) {
  $http.get("http://localhost:3000/buscar_por_rol?rol=2")
    .success(function(data) {
      $scope.alumnos = data;
    });
  
});

myApp.controller('verCursos', function ($http, $scope, $state) {
  $http.get("http://localhost:3000/mostrar_grupos")
    .success(function(data) {
      $scope.cursos = data;
    });
  
});



myApp.controller('agregarAlumno', ['$scope', function($scope) {
  $scope.master = {};

  $scope.update = function(user) {
    $scope.master = angular.copy(user);
  };

  $scope.reset = function(form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    } 
    $scope.user = angular.copy($scope.master);
  };

  $scope.reset();
}]);

myApp.controller('agregarProfesor', ['$scope', function($scope) {
  $scope.master = {};

  $scope.update = function(user) {
    $scope.master = angular.copy(user);
  };

  $scope.reset = function(form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    } 
    $scope.user = angular.copy($scope.master);
  };

  $scope.reset();
}]);

myApp.controller('agregarCurso', ['$scope', function($scope) {
  $scope.master = {};

  $scope.update = function(curso) {
    $scope.master = angular.copy(curso);
  };

  $scope.reset = function(form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    } 
    $scope.curso = angular.copy($scope.master);
  };

  $scope.reset();
}]);  

myApp.controller('agregarEncuesta', ['$scope', function($scope) {
  $scope.master = {};

  $scope.update = function(encuesta) {
    $scope.master = angular.copy(encuesta);
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


