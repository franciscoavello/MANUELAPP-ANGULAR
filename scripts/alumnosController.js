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

myApp.controller("VerEncuestasCompletadas", function($scope,$http,$rootScope){
      $http.get("http://localhost:3000/buscar_encuestas_alumno?correo="+$scope.usuario[0].correo)
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
  $http.get("http://localhost:3000/preguntas_encuesta?encuesta_id="+$scope.idEncuesta)
    .success(function(data){
      $scope.preguntas = data;
      $http.get("http://localhost:3000/preguntas_encuesta_opciones?encuesta_id="+$scope.idEncuesta)
        .success(function(data){
          $scope.respuestas = data;
          var j=0;
          for (var i = 1; j < $scope.preguntas.length; i++) {
              var k=0;
              $scope.preguntas[j].respPreg={};
              while($scope.respuestas[i].pregunta_id!= undefined){
                $scope.preguntas[j].respPreg[k] = $scope.respuestas[i];

                i++;

                if(i==$scope.respuestas.length){
                  break;
                }
                k++;
              }
              j++;
              
          }
        })
        .error(function(err){

        });
    })
    .error(function(err){

    });
});

myApp.controller("BarCtrl", function ($scope) {
  $scope.labels = ['Pregunta 1', 'Pregunta 2', 'Pregunta 3', 'Pregunta 4'];
  $scope.series = ['Promedio grupo', 'Promedio curso'];

  $scope.data = [
    [4, 5, 6, 5],
    [3, 2, 4, 6]
  ];
});