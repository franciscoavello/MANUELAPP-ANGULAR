var myApp = angular.module('myApp');

myApp.controller('CursoCtrlAyudante',function ($http,$scope,$state,$rootScope){
  $scope.cantidadAlumnos=0;
  $scope.cantidadGrupos=0;
  $scope.cantidadEvaluaciones=0;
  $http.get("http://manuel-api.herokuapp.com/buscar_alumnos_curso?curso_id="+$rootScope.mi_curso.id)
    .success(function(data) {
      console.log(data);
      $scope.cantidadAlumnos=data.length;
      
    });
  $http.get("http://manuel-api.herokuapp.com/evaluaciones_curso?curso_id="+$rootScope.mi_curso.id)
    .success(function(data) {
      console.log(data);
      $scope.cantidadEvaluaciones=data.length;
    });
  $http.get("http://manuel-api.herokuapp.com/grupos_curso?id="+$rootScope.mi_curso.id)
    .success(function(data) {
      console.log(data);
      $scope.cantidadGrupos=data.length;
    });
});

myApp.controller('AlumnoCtrlAyudante',function ($http,$scope,$state,$rootScope){
  $scope.grupos=[];
  $scope.alertaEliminacionAlumno=false;
  $http.get("http://manuel-api.herokuapp.com/grupos_alumno?correo="+$rootScope.mi_alumno.correo)
    .success(function(data) {
      console.log(data);
      if(data.length>0){
        for(grupo in data){
          if(data[grupo].curso_id==$rootScope.mi_curso.id){
            $scope.grupos.push(data[grupo]);
            console.log($scope.grupos);
          }
        }
      }
    }).error(function(err){
      console.log(err);
    });
  $scope.eliminarAlumnoDetalle = function () {
    $http.delete("http://manuel-api.herokuapp.com/borrar_alumno_curso?alumno_id="+$rootScope.mi_alumno.id+"&curso_id="+$rootScope.mi_curso.id)
      .success(function() {
        $scope.alertaEliminacionAlumno=true;
        go('detalle-curso-ayudante.alumnos');
      });
  };        
      
});

myApp.controller('GrupoCtrlAyudante',function ($http,$scope,$state,$rootScope){
  $scope.integrantes=[];
  $scope.alertaEliminacionAlumno=false;
  $scope.alertaEliminacionGrupo=false;
  $scope.alertaAsignacionJefe=false;
  $http.get("http://manuel-api.herokuapp.com/buscar_por_grupo?grupo_id="+$rootScope.mi_grupo.id)
  .success(function(data) {
    console.log(data);
    if(data.length>0){
      $scope.integrantes = data;
    }
  });
  $scope.eliminarGrupo = function () {
    $http.delete("http://manuel-api.herokuapp.com/grupos/"+$rootScope.mi_grupo.id)
      .success(function() {
        $scope.alertaEliminacionGrupo=true;
        $state.go("detalle-curso-ayudante.grupos");
      });
  };
  $scope.eliminarAlumnoGrupo = function (index) {
    var id_alumno = $scope.integrantes[index].id;
    $http.delete("http://manuel-api.herokuapp.com/borrar_alumno?alumno_id="+id_alumno+"&grupo_id="+$rootScope.mi_grupo.id)
      .success(function() {
        $scope.alertaEliminacionAlumno=true;
        $state.go('detalle-curso-ayudante.detalle-grupo');
      });
  };
  $scope.asignarJefe = function (index) {
    var id_alumno = $scope.integrantes[index].id;
    $http.post("http://manuel-api.herokuapp.com/jefe_grupo?grupo_id="+$rootScope.mi_grupo.id+"&alumno_id="+id_alumno)
      .success(function() {
        $scope.alertaAsignacionJefe=true;
      });
  };
});

myApp.controller('EvaluacionCtrlAyudante',function ($scope,$state,$rootScope){
  
});

myApp.controller('VerCursosAyudante', function ($rootScope,$http, $scope, $state) {
  $scope.cursos = [];
  $http.get("http://manuel-api.herokuapp.com/cursos_profesor?profesor_id="+$scope.usuario[0].id)
    .success(function(data) {
      console.log(data);
      if(data.length>0){
        $scope.cursos=data;   
      }
    });
  $scope.id_curso_seleccionado =-1;
  $scope.nombreCurso="curso";
  $scope.seleccionarCurso = function (id) {
      $scope.id_curso_seleccionado = id;
      console.log("id_curso: "+$scope.id_curso_seleccionado);
      $rootScope.mi_curso=$scope.cursos[$scope.id_curso_seleccionado];
      console.log($rootScope.mi_curso.nombre);
      $state.go('detalle-curso-ayudante.perfil');
  }

});

myApp.controller('VerGruposAyudante', function ($rootScope,$http, $scope, $state) {
  $scope.grupos = [];
  $http.get("http://manuel-api.herokuapp.com/grupos_curso?id="+$rootScope.mi_curso.id)
    .success(function(data) {
      console.log(data);
      if(data.length>0){
        $scope.grupos = data;
      }
    });
  $scope.id_grupo_seleccionado =-1;
  $scope.seleccionarGrupo = function (id) {
      console.log("id grupo: "+id);
      $scope.id_grupo_seleccionado = id ;
      $rootScope.mi_grupo=$scope.grupos[$scope.id_grupo_seleccionado];
      $state.go('detalle-curso-ayudante.detalle-grupo');
  }
});

myApp.controller('VerAlumnosAyudante', function ($rootScope,$http, $scope, $state) {
  $scope.alumnos = [];
  $scope.alertaEliminacionAlumno=false;
  $http.get("http://manuel-api.herokuapp.com/buscar_alumnos_curso?curso_id="+$rootScope.mi_curso.id)
    .success(function(data) {
      if(data.length>0){
        console.log(data);
        $scope.alumnos = data;
      }
    });
  $scope.copiarAlumnos = function(){
    $rootScope.alumnosCurso=$scope.alumnos;
  }
  $scope.seleccionarAlumno = function (id) {
      $scope.id_alumno_seleccionado = id;
      console.log("id_alumno: "+$scope.id_alumno_seleccionado);
      $rootScope.mi_alumno=$scope.alumnos[$scope.id_alumno_seleccionado];
      console.log($rootScope.mi_alumno.nombre);
      $state.go('detalle-curso-ayudante.detalle-alumno');
  }
  $scope.eliminarAlumnoCurso = function (index) {
    var id_alumno = $scope.integrantes[index].id;
    $http.delete("http://manuel-api.herokuapp.com/borrar_alumno_curso?alumno_id="+id_alumno+"&curso_id="+$rootScope.mi_curso.id)
      .success(function() {
        $scope.alertaEliminacionAlumno=true;
        $state.go('detalle-curso-ayudante.alumnos');
      });
  };
});

myApp.controller('VerEvaluacionesAyudante', function ($rootScope,$http, $scope, $state) {
  $scope.evaluaciones = [];
  $scope.encuestas = [];
  $scope.alertaEliminacionEncuesta=false;
  $http.get("http://manuel-api.herokuapp.com/evaluaciones_curso?curso_id="+$rootScope.mi_curso.id)
    .success(function(data) {
      console.log(data);
      if(data.length>0){
        for(i in data){
          if(data[i].id==null){
            $scope.encuestas.push(data[i]);
          }else{
            $scope.evaluaciones.push(data[i]);
          }
        }
      }
    });
  $scope.seleccionarEvaluacion = function (id) {
      $scope.id_evaluacion_seleccionado = id;
      console.log("id_evaluacion: "+$scope.id_evaluacion_seleccionado);
      $rootScope.mi_evaluacion=$scope.evaluaciones[$scope.id_evaluacion_seleccionado];
      $rootScope.mi_encuesta=$scope.encuestas[$scope.id_evaluacion_seleccionado];
      $state.go('detalle-curso-ayudante.detalle-evaluacion');
  }
  $scope.eliminarEncuesta = function (index) {
    var encuesta_id = $scope.evaluaciones[index].id;
    $http.post("http://manuel-api.herokuapp.com/borrar_encuesta?encuesta_id="+encuesta_id)
      .success(function() {
        $scope.alertaEliminacionEncuesta=true;
      });
  }
});

myApp.controller('AgregarAlumnoAyudante', function ($rootScope,$http, $scope, $state) {
  $scope.alumnosFaltantes = [];
  $scope.grupos = [];
  $scope.alertaAgregarAlumno=false;
  $scope.alertaAsignarGrupo=false;
  $http.get("http://manuel-api.herokuapp.com/buscar_por_rol?rol=2")
    .success(function(data) {
      console.log(data);
      console.log($rootScope.alumnosCurso);
      if(data.length>0){
        for(i in data){
          var bandera=0;
          for(j in $rootScope.alumnosCurso){
            if($rootScope.alumnosCurso[j].id==data[i].id){
              bandera=1;
            }
          }
          if(bandera==0){
            $scope.alumnosFaltantes.push(data[i]);
            break;
          }
        }
      }
    });
  $http.get("http://manuel-api.herokuapp.com/grupos_curso?id="+$rootScope.mi_curso.id)
    .success(function(data) {
      console.log(data);
      $scope.grupos=data;
    });
  $scope.jefe=false;
  $scope.id_grupo_seleccionado=-1;
  $scope.agregarAlumno = function (index) {
    $scope.nuevo_alumno_id = $scope.alumnosFaltantes[index].id;
    var arreglo={curso_id:$rootScope.mi_curso.id,alumno_id:$scope.nuevo_alumno_id}
    $http.post("http://manuel-api.herokuapp.com/curso_alumnos",arreglo)
      .success(function() {
        $scope.alertaAgregarAlumno=true;
      });
  }
  $scope.asignarGrupo = function (){
    var arreglo = {alumno_id: $scope.nuevo_alumno_id , grupo_id: $scope.id_grupo_seleccionado, jefe: $scope.jefe }
    $http.post("http://manuel-api.herokuapp.com/grupo_alumnos",arreglo)
      .success(function() {
        $scope.alertaAsignarGrupo=true;
      });
  }
  $scope.asignarValor = function (index){
    $scope.id_grupo_seleccionado=grupos[index].id;
  }
  $scope.asignarJefe = function (valor){
    $scope.jefe=valor;
  }
});

myApp.controller('NuevaEncuestaAyudante', function ($rootScope,$http, $scope, $state) {
  $scope.tipos = [];
  $scope.alertaNuevaEncuesta=false;
  $http.get("http://manuel-api.herokuapp.com/mostrar_tipos_encuestas")
    .success(function(data) {
      console.log(data);
      if(data.length>0){
        $scope.tipos=data;
      }
    });
  $scope.nuevaEncuesta = function (index) {
    var alumno_id = $scope.alumnosFaltantes[index].id;
    $http.post("http://manuel-api.herokuapp.com/ingresar_alumno_curso?alumno_id="+alumno_id+"&curso_id="+$rootScope.mi_curso.id)
      .success(function() {
        $scope.alertaNuevaEncuesta=true;
      });
  }
});