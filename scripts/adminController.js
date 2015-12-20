var myApp = angular.module('myApp');

myApp.controller("verEncuestas", function($scope,$http){
      $scope.encuestas = [
        {
          id: 1,
          nombre: "Encuesta PINGESO",
          tipo: "Encuesta 360",
          curso: "Proyecto de Ingeniería de Software",
          fecha: "25/11/2015",
          estado: "finalizada",
          grupo: "1",
          jefe: "Juan Peréz"
        },
        { 
          id: 2,
          nombre: "Encuesta IHC",
          tipo: "Encuesta 360",
          curso: "Interfaz humano-computador",
          fecha: "15/11/2015",
          estado: "pendiente",
          grupo: "3",
          jefe: "Francisco Riquelme"
        },
        {
          id: 3,
          nombre: "Encuesta IHC",
          tipo: "Encuesta Liderazgo",
          curso: "Interfaz humano-computador",
          fecha: "18/11/2015",
          estado: "pendiente",
          grupo: "3",
          jefe: "Francisco Riquelme"
        },
        {
          id: 4,
          nombre: "Encuesta PBD",
          tipo: "Encuesta 360",
          curso: "Proyecto de Base de Datos",
          fecha: "01/11/2015",
          estado: "finalizada",
          grupo: "4",
          jefe: "Pedro Paredes"
        }

      ];
      $scope.cursos = [];


});


myApp.controller("verProfesores", function($scope,$http){
        $scope.profesores = [
        {
          id: 1,
          nombre: "Jorge Salas",
          curso: "Algoritmos Avanzados",
          
        },
        { 
          id: 2,
          nombre: "Pedro Guzman",
          curso: "Calculo Avanzado",
        },
        {
          id: 3,
          nombre: "Carlos Antillanca",
          curso: "Topicos de Matematica",
        },
        {
          id: 4,
          nombre: "Eduardo Gamboa",
          curso: "Futbol Avanzado",
          
        }
      ];

});



myApp.controller("verAlumnos", function($scope,$http){
        $scope.profesores = [
        {
          id: 1,
          nombre: "Sergio Carmona",
          
        },
        { 
          id: 2,
          nombre: "Manuel Guzman",
          
        },
        {
          id: 3,
          nombre: "Carlos Salas",
          
        },
        {
          id: 4,
          nombre: "Claudio Bravo",
          
        }
      ];

});


