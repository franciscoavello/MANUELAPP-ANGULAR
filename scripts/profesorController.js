var myApp = angular.module('myApp');

myApp.controller('CursoCtrl',function ($scope,$state,$rootScope){

});

myApp.controller('VerCursos', function ($rootScope,$http, $scope, $state) {
  $scope.cursos = [];
  $http.get("http://localhost:3000/cursos_profesor?profesor_id="+$scope.usuario[0].id)
    .success(function(data) {
      console.log(data);
      if(data.length>0){
        $scope.cursos=data;   
      }
    });
  $scope.id_curso_seleccionado =-1;
  $scope.nombreCurso="curso";
  $scope.seleccionarCurso = function (id) {
      console.log("id_curso_sin_cambiar: "+id);
      $scope.id_curso_seleccionado = id;
      console.log("id_curso_modificado: "+$scope.id_curso_seleccionado);
      $rootScope.mi_curso=$scope.cursos[$scope.id_curso_seleccionado];
      console.log($rootScope.mi_curso.nombre);
      $state.go('detalle-curso.perfil');
  }

});


myApp.controller('VerGrupos', function ($http, $scope, $state) {
  $scope.grupos = [];
  $http.get("http://localhost:3000/grupos")
    .success(function(data) {
      console.log(data);
      if(data.length>0){
        for(prop in data){
          if($scope.usuario[0].id==data[prop].profesor_id){
            $scope.grupos.push(data[prop]);  
          } 
        }
      }
    });
  $scope.id_grupo_selecionado =-1;
  $scope.seleccionarCurso = function ($scope ,id) {
      console.log("id : "+id);
      $scope.id_grupo_seleccionado = id ;
      $state.go('detalle-grupo');
  }
});

myApp.controller('VerAlumnosDeCurso', function ($http, $scope, $state) {
  $scope.alumnos = [];
  $http.get("http://localhost:3000/curso_alumnos")
    .success(function(data) {
      console.log(data);
      if(data.length>0){
        for(prop in data){
          if(data[prop].curso_id == $scope.id_curso_seleccionado){
            $scope.alumnos.push(data[prop].alumno_id);
          }
        };
      }
    });
  
});
