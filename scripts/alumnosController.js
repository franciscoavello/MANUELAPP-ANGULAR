var myApp = angular.module('myApp');

myApp.controller("VerEncuestasPendientes", function($scope,$http,$rootScope){
      $http.get("http://localhost:3000/buscar_pendientes_alumno?correo="+$scope.usuario[0].correo)
        .success(function(data){
          $scope.encuestas = data;
          console.log($scope.encuestas);
        })
        .error(function(err){

        });

        $scope.ingresarNombreEncuesta = function (nomEncuesta) {
          $rootScope.encuestaSeleccionada = nomEncuesta;
        };

});

myApp.controller("ResponderEncuesta", function($scope,$http){

      $http.get("http://localhost:3000/buscar_por_grupo?grupo_id=1")
        .success(function(data){
          $scope.datosGrupo = data;
        })
        .error(function(err){

        });
});

myApp.controller("ObtenerPreguntas", function($scope,$http){
  $http.get("http://localhost:3000/preguntas_encuesta?encuesta_id=1")
    .success(function(data){
      $scope.preguntas = data;
    })
    .error(function(err){

    });
});
