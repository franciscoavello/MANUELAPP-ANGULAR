var myApp = angular.module('myApp');

myApp.controller('AyudanteCtrl',function ($http,$scope,$state,$rootScope){
  $scope.ayudante=[];
  $http.get("http://manuel-api.herokuapp.com/datos_ayudante?curso_id="+$rootScope.mi_curso.id)
    .success(function(data) {
      console.log(data);
      $scope.ayudante=data;
    });

});

myApp.controller('AsignarAyudante',function ($http,$scope,$state,$rootScope){
  $scope.alumnos=[];
  //revisa si ya está asignado un ayudante
  $scope.ayudante=[];
  $rootScope.sinAyudante=true;
  $scope.selected=[];
  $scope.funcionalidadesAntiguas=[];
  $rootScope.alertaAsignacionFuncionalidades=false;
  $http.get("http://manuel-api.herokuapp.com/datos_ayudante?curso_id="+$rootScope.mi_curso.id)
    .success(function(data) {
      console.log(data);
      if(data.length>0){
        $scope.ayudante=data;
        $http.get("http://manuel-api.herokuapp.com/listar_func_ayu?alumno_id="+$scope.ayudante[0].id+"&curso_id="+$rootScope.mi_curso.id)
          .success(function(data) {
            $rootScope.sinAyudante=false;
            console.log(data);
            $scope.funcionalidadesAyudante=data;
            for(i in data){
              for(j in $scope.funcionalidades){
                if($scope.funcionalidades[j].id==data[i].funcionalidad_id){
                  $scope.selected.push($scope.funcionalidades[j]);
                  $scope.funcionalidadesAntiguas.push($scope.funcionalidades[j]);
                  break;
                }
              }
            }
          });
      }
    }).error(function(err){
      console.log(err);
      $rootScope.sinAyudante=true;
    });
  $http.get("http://manuel-api.herokuapp.com/funcionalidads.json")
    .success(function(data) {
      console.log(data);
      $scope.funcionalidades=data;
    });

  $http.get("http://manuel-api.herokuapp.com/buscar_alumnos_curso?curso_id="+$rootScope.mi_curso.id)
    .success(function(data) {
      if(data.length>0){
        console.log(data);
        $scope.alumnos = data;
      }
    });

  $scope.toggle=function(item, list){
    var id = list.indexOf(item);
    if (id>-1) list.splice(id,1);
    else list.push(item);
  };
  $scope.exists = function (item, list){
    return list.indexOf(item) > -1;
  }
  $scope.asignarAyudante = function () {
    //se debe quitar el ayudante anterior
    if($scope.ayudante.length>0){
      $http.put("http://manuel-api.herokuapp.com/es_ayudante", {
          alumno_id: $scope.ayudante[0].id,
          curso_id: $rootScope.mi_curso.id,
          ayudante: "false"
       })
    }
    
    $http.put("http://manuel-api.herokuapp.com/es_ayudante", {
          alumno_id: $scope.respuesta.alumno_id,
          curso_id: $rootScope.mi_curso.id,
          ayudante: "true"
       })
      .success(function() {
        $scope.alertaEliminacionAlumno=true;
        go('detalle-curso.alumnos');
        setTimeout(function(){
          $rootScope.alertaEliminacionAlumno=false;
          console.log("alertaEliminacionAlumno=false");
        },2000);
      });
  };
  $scope.asignarFuncionalidades = function (){
    console.log("Se van a asignar las funcionalidades");
    for(i in $scope.selected){
      //hacer el post por cada funcionalidad seleccionada
      if($scope.funcionalidadesAntiguas.indexOf($scope.selected[i])<0){
        console.log($scope.selected[i].id);
        $http.post("http://manuel-api.herokuapp.com/funcionalidad_ayudante",{
          alumno_id: $scope.ayudante[0].id,
          curso_id: $rootScope.mi_curso.id,
          funcionalidad_id: $scope.selected[i].id
        })
          .success(function(){
            $rootScope.alertaAsignacionFuncionalidades=true;
            setTimeout(function(){
              $rootScope.alertaAsignacionFuncionalidades=false;
              console.log("alertaAsignacionFuncionalidades=false");
            },2000);

          });
      }
    }
  $state.go('detalle-curso.ayudante');
  }
});

myApp.controller('CursoCtrl',function ($http,$scope,$state,$rootScope){
  $scope.hayAyudante=false;
  $scope.cantidadAlumnos=0;
  $scope.cantidadGrupos=0;
  $scope.cantidadEvaluaciones=0;
  $scope.ayudante=[];
  $http.get("http://manuel-api.herokuapp.com/buscar_alumnos_curso?curso_id="+$rootScope.mi_curso.id)
    .success(function(data) {
      console.log(data);
      $scope.cantidadAlumnos=data.length;
      
    });
  $http.get("http://manuel-api.herokuapp.com/evaluaciones_curso?curso_id="+$rootScope.mi_curso.id)
    .success(function(data) {
      console.log(data);
      if(data.length>0){
        for(i in data){
          if(data[i].id==null){
            $scope.cantidadEvaluaciones++;
          }
        }
      }
    });
  $http.get("http://manuel-api.herokuapp.com/grupos_curso?id="+$rootScope.mi_curso.id)
    .success(function(data) {
      console.log(data);
      $scope.cantidadGrupos=data.length;
    });
  $http.get("http://manuel-api.herokuapp.com/datos_ayudante?curso_id="+$rootScope.mi_curso.id)
    .success(function(data) {
      console.log(data);
      if(data.length>0){
        $scope.hayAyudante=true;
        $scope.ayudante=data;
      }else {
        $scope.hayAyudante=false;
      }
    });
});

myApp.controller('AlumnoCtrl',function ($http,$scope,$state,$rootScope){
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
        $state.go('detalle-curso.alumnos');
        setTimeout(function(){
          $rootScope.alertaEliminacionAlumno=false;
          console.log("alertaEliminacionAlumno=false");
        },2000);
      });
  };        
      
});

myApp.controller('GrupoCtrl',function ($http,$scope,$state,$rootScope){
  $scope.integrantes=[];
  $rootScope.alertaErrorEliminacionGrupo=false;
  $rootScope.alertaEliminacionAlumno=false;
  $rootScope.alertaEliminacionGrupo=false;
  $rootScope.alertaAsignacionJefe=false;

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
        $rootScope.alertaEliminacionGrupo=true;
        $state.go("detalle-curso.grupos");
        setTimeout(function(){
          $rootScope.alertaEliminacionGrupo=false;
          console.log("alertaEliminacionGrupo=false");
        },2000);
      })
      .error(function(err){
        $rootScope.alertaErrorEliminacionGrupo=true;
        $state.go("detalle-curso.grupos");
        setTimeout(function(){
          $rootScope.alertaErrorEliminacionGrupo=false;
          console.log("alertaErrorEliminacionGrupo=false");
        },2000);
      });
  };
  $scope.eliminarAlumnoGrupo = function (index) {
    $scope.id_alumno=$scope.integrantes[index].id;
    console.log("se va a borrar el id_alumno "+$scope.id_alumno+" del grupo "+$rootScope.mi_grupo.id);
    $http.delete("http://manuel-api.herokuapp.com/borrar_alumno?alumno_id="+$scope.id_alumno+"&grupo_id="+$rootScope.mi_grupo.id)
      .success(function() {
        $rootScope.alertaEliminacionAlumno=true;
        $state.go('detalle-curso.grupos');
        setTimeout(function(){
          $rootScope.alertaEliminacionAlumno=false;
          console.log("alertaEliminacionAlumno=false");
        },2000);
      })
      .error(function(err){
        $rootScope.alertaErrorEliminacionAlumno=true;
        setTimeout(function(){
          $rootScope.alertaErrorEliminacionAlumno=false;
          console.log("alertaErrorEliminacionAlumno=false");
        },2000);
      });
  };
  $scope.asignarJefe = function (index) {
    $scope.id_alumno=$scope.integrantes[index].id;
    console.log("se va a asignar como jefe al id_alumno "+$scope.id_alumno+" del grupo "+$rootScope.mi_grupo.id);
    $http.put("http://manuel-api.herokuapp.com/es_jefe", {
      alumno_id: $scope.id_alumno,
      grupo_id: $rootScope.mi_grupo.id,
      jefe: true
    })
      .success(function() {
        $rootScope.alertaAsignacionJefe=true;
        $state.go('detalle-curso.grupos');
        setTimeout(function(){
          $rootScope.alertaAsignacionJefe=false;
          console.log("alertaAsignacionJefe=false");
        },2000);
      })
      .error(function(err){
        $rootScope.alertaErrorAsignacionJefe=true;
        $state.go('detalle-curso.grupos');
        setTimeout(function(){
          $rootScope.alertaErrorAsignacionJefe=false;
          console.log("alertaErrorAsignacionJefe=false");
        },2000);
      });
  };
});

myApp.controller('EvaluacionCtrl',function ($scope,$state,$rootScope){
  
});

myApp.controller('VerCursos', function ($rootScope,$http, $scope, $state) {
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
      $state.go('detalle-curso.perfil');
  }

});

myApp.controller('VerGrupos', function ($rootScope,$http, $scope, $state) {
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
      $state.go('detalle-curso.detalle-grupo');
  }
});

myApp.controller('VerAlumnos', function ($rootScope,$http, $scope, $state) {
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
      $state.go('detalle-curso.detalle-alumno');
  }
  $scope.eliminarAlumnoCurso = function (index) {
    var id_alumno = $scope.alumnos[index].id;
    $http.delete("http://manuel-api.herokuapp.com/borrar_alumno_curso?alumno_id="+id_alumno+"&curso_id="+$rootScope.mi_curso.id)
      .success(function() {
        $rootScope.alertaEliminacionAlumno=true;
        $state.go('detalle-curso.alumnos');
        setTimeout(function(){
          $rootScope.alertaEliminacionAlumno=false;
          console.log("alertaEliminacionAlumno=false");
        },2000);
      });
  };
});

myApp.controller('VerEvaluaciones', function ($rootScope,$http, $scope, $state) {
  $scope.evaluaciones = [];
  $scope.encuestas = [];
  $rootScope.alertaEliminacionEncuesta=false;
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
      $state.go('detalle-curso.detalle-evaluacion');
  }
  $scope.eliminarEncuesta = function (index) {
    var encuesta_id = $scope.evaluaciones[index].id;
    $http.post("http://manuel-api.herokuapp.com/borrar_encuesta?encuesta_id="+encuesta_id)
      .success(function() {
        $rootScope.alertaEliminacionEncuesta=true;
        $state.go("detalle-curso.evaluaciones")
        setTimeout(function(){
          $rootScope.alertaEliminacionEncuesta=false;
          console.log("alertaEliminacionEncuesta=false");
        },2000);
      });
  }
});

myApp.controller('AgregarAlumno', function ($rootScope,$http, $scope, $state) {
  $scope.alumnosFaltantes = [];
  $scope.grupos = [];
  $rootScope.alertaAgregarAlumno=false;
  $rootScope.alertaAsignarGrupo=false;
  $http.get("http://manuel-api.herokuapp.com/alumnos.json")
    .success(function(data) {
      console.log(data);
      console.log($rootScope.alumnosCurso);
      if(data.length>0){
        for(i in data){
          var bandera=0;
          for(j in $rootScope.alumnosCurso){
            if($rootScope.alumnosCurso[j].id==data[i].id){
              bandera=1;
              break;
            }
          }
          if(bandera==0){
            $scope.alumnosFaltantes.push(data[i]);
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
  $scope.selected=[];
  $scope.toggle=function(item, list){
    var id = list.indexOf(item);
    if (id>-1) list.splice(id,1);
    else list.push(item);
  };
  $scope.exists = function (item, list){
    return list.indexOf(item) > -1;
  }
  $scope.agregarAlumno = function () {

    for(i in $scope.selected){
      var arreglo={curso_id:$rootScope.mi_curso.id,alumno_id:$scope.selected[i].id};
      console.log(arreglo);
      $http.post("http://manuel-api.herokuapp.com/curso_alumnos",arreglo)
        .success(function() {
          $rootScope.alertaAgregarAlumno=true;
        })
        .error(function(err){
          console.log(err);
        });
    }
      $state.go("detalle-curso.alumnos");
      setTimeout(function(){
        $rootScope.alertaAgregarAlumno=false;
        console.log("desactiva alarma");
      },2000);
  }
});

myApp.controller('NuevaEncuesta', function ($rootScope,$http, $scope, $state) {
  $rootScope.alertaNuevaEncuesta=false;
  $scope.encuestas=[];
  $http.get("http://manuel-api.herokuapp.com/mostrar_encuestas")
  .success(function(data) {
    console.log(data);
    if(data.length>0){
      $scope.encuestas=data;
    }
  });
  $scope.nuevaEncuesta = function (){
    console.log($scope.encuesta_id);
    //hace un post y publica encuesta
    var arreglo={contestada:0,curso_id:$rootScope.mi_curso.id,encuesta_id:$scope.encuesta_id};
    $http.post("http://manuel-api.herokuapp.com/evaluaciones",arreglo)
   	.success(function() {
   		$rootScope.alertaNuevaEncuesta=true;
  	  $state.go("detalle-curso.evaluaciones");
      setTimeout(function(){
        $rootScope.alertaNuevaEncuesta=false;
      },2000);
   	});

  }
});

myApp.controller('AgregarGrupo', function ($rootScope,$http, $scope, $state) {
  $rootScope.alertaAgregarGrupo=false;
  $scope.entrada={};
  $scope.selected=[];
  $scope.alumnos=[];
  $http.get("http://manuel-api.herokuapp.com/buscar_alumnos_curso?curso_id="+$rootScope.mi_curso.id)
    .success(function(data) {
      if(data.length>0){
        console.log(data);
        $scope.alumnos = data;
      }
    });
  $scope.toggle=function(item, list){
    var id = list.indexOf(item);
    if (id>-1) list.splice(id,1);
    else list.push(item);
  };
  $scope.exists = function (item, list){
    return list.indexOf(item) > -1;
  }
  $scope.agregarGrupo = function (){
    console.log($scope.entrada.nombreGrupo+" "+$scope.entrada.descripcionGrupo);
    var arreglo={nombre:$scope.entrada.nombreGrupo,curso_id:$rootScope.mi_curso.id,descripcion:$scope.entrada.descripcionGrupo}
    $http.post("http://manuel-api.herokuapp.com/grupos",arreglo)
      .success(function() {
        $rootScope.alertaAgregarGrupo=true;
        for(i in selected){
          $http.post("http://manuel-api.herokuapp.com/grupo_alumnos", { 
            alumno_id: $scope.selected[i].id, 
            grupo_id: ,
            jefe: false
          });
        }
        $state.go("detalle-curso.grupos");
        setTimeout(function(){
          $rootScope.alertaAgregarGrupo=false;
          console.log("AlertaAgregarGrupo=false");
        },2000);
      });

  }
});