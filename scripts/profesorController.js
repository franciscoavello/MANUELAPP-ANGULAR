var myApp = angular.module('myApp');

myApp.controller('AyudanteCtrl',function ($http,$scope,$state,$rootScope){
  $scope.ayudante=[];
  $http.get("http://manuel-api2.herokuapp.com/datos_ayudante?curso_id="+$rootScope.mi_curso.id)
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
  $http.get("http://manuel-api2.herokuapp.com/datos_ayudante?curso_id="+$rootScope.mi_curso.id)
    .success(function(data) {
      console.log(data);
      if(data.length>0){
        $scope.ayudante=data;
        $http.get("http://manuel-api2.herokuapp.com/listar_func_ayu?alumno_id="+$scope.ayudante[0].id+"&curso_id="+$rootScope.mi_curso.id)
          .success(function(data) {
            $rootScope.sinAyudante=false;
            console.log(data);  
            var strValue1 = JSON.stringify(data);
            $scope.selected=JSON.parse(strValue1);
            var strValue2 = JSON.stringify(data);
            $scope.funcionalidadesAntiguas=JSON.parse(strValue2);
          });
      }
    }).error(function(err){
      console.log(err);
      $rootScope.sinAyudante=true;
    });
  $http.get("http://manuel-api2.herokuapp.com/funcionalidads.json")
    .success(function(data) {
      console.log(data);
      $scope.funcionalidades=data;
    });

  $http.get("http://manuel-api2.herokuapp.com/buscar_alumnos_curso?curso_id="+$rootScope.mi_curso.id)
    .success(function(data) {
      if(data.length>0){
        console.log(data);
        $scope.alumnos = data;
      }
    });

  $scope.toggle=function(item){
    for(i in $scope.selected){
      if(item.id==$scope.selected[i].funcionalidad_id){
        if ($scope.selected[i].permitido==false){
          $scope.selected[i].permitido=true;
        }
        else $scope.selected[i].permitido=false;
      }
    }
  };
  $scope.exists = function (item){
    for(i in $scope.selected){
      if(item.id==$scope.selected[i].funcionalidad_id){
        return $scope.selected[i].permitido;
      }
    }
  }
  $scope.asignarAyudante = function () {
    //se debe quitar el ayudante anterior
    if($scope.ayudante.length>0){
      $http.put("http://manuel-api2.herokuapp.com/es_ayudante", {
          alumno_id: $scope.ayudante[0].id,
          curso_id: $rootScope.mi_curso.id,
          ayudante: "false"
       });
      $scope.ayudante.splice(0,1);
    }
    console.log($scope.respuesta.alumno);
    var alumno = JSON.parse($scope.respuesta.alumno);
    $scope.ayudante.push(alumno);
    $rootScope.sinAyudante=false;
    //se asigna el ayudante
    console.log("Se va a asignar como ayudante a "+alumno.nombre);
    $http.put("http://manuel-api2.herokuapp.com/es_ayudante", {
          alumno_id: alumno.id,
          curso_id: $rootScope.mi_curso.id,
          ayudante: true
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
      if($scope.funcionalidadesAntiguas[i].permitido!=$scope.selected[i].permitido){
        console.log($scope.selected[i].id);
        $http.post("http://manuel-api2.herokuapp.com/funcionalidad_ayudante",{
          alumno_id: $scope.ayudante[0].id,
          curso_id: $rootScope.mi_curso.id,
          funcionalidad_id: $scope.selected[i].funcionalidad_id
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
  $http.get("http://manuel-api2.herokuapp.com/buscar_alumnos_curso?curso_id="+$rootScope.mi_curso.id)
    .success(function(data) {
      console.log(data);
      $scope.cantidadAlumnos=data.length;
      
    });
  $http.get("http://manuel-api2.herokuapp.com/evaluaciones_curso?curso_id="+$rootScope.mi_curso.id)
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
  $http.get("http://manuel-api2.herokuapp.com/grupos_curso?id="+$rootScope.mi_curso.id)
    .success(function(data) {
      console.log(data);
      $scope.cantidadGrupos=data.length;
    });
  $http.get("http://manuel-api2.herokuapp.com/datos_ayudante?curso_id="+$rootScope.mi_curso.id)
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
  $http.get("http://manuel-api2.herokuapp.com/grupos_alumno?correo="+$rootScope.mi_alumno.correo)
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
    $http.delete("http://manuel-api2.herokuapp.com/borrar_alumno_curso?alumno_id="+$rootScope.mi_alumno.id+"&curso_id="+$rootScope.mi_curso.id)
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

myApp.controller('AgregarAlumnosGrupo',function ($http,$scope,$state,$rootScope){
  $scope.integrantes=[];
  $scope.alumnos=[];
  $scope.alumnosFueraGrupo=[];
  $http.get("http://manuel-api2.herokuapp.com/buscar_por_grupo?grupo_id="+$rootScope.mi_grupo.id)
  .success(function(data) {
    console.log(data);
    $scope.integrantes = data;
    $http.get("http://manuel-api2.herokuapp.com/buscar_alumnos_curso?curso_id="+$rootScope.mi_curso.id)
      .success(function(data) {
        if(data.length>0){
          $scope.alumnos = data;
          console.log($scope.alumnos);
          for(i in $scope.alumnos){
            var contador=1;
            for(j in $scope.integrantes){
              if($scope.alumnos[i].id==$scope.integrantes[j].id){
                contador=0;
                break;
              }
            }
            if(contador==1){
              $scope.alumnosFueraGrupo.push($scope.alumnos[i]);
            }
          }
        }
      });
  });

  $scope.selected=[];

  console.log($scope.alumnosFueraGrupo);
  $scope.toggle=function(item, list){
    var id = list.indexOf(item);
    if (id>-1) list.splice(id,1);
    else list.push(item);
  };
  $scope.exists = function (item, list){
    return list.indexOf(item) > -1;
  }
  $scope.asignarAlumnos = function () {
    for(i in $scope.selected){
      console.log($scope.selected[i]);
      $http.post("http://manuel-api2.herokuapp.com/grupo_alumnos", { 
        alumno_id: $scope.selected[i].id, 
        grupo_id: $rootScope.mi_grupo.id,
        jefe: false
      }).success(function() {
        $rootScope.alertaAgregarAlumnosGrupo=true;
        $state.go("detalle-curso.detalle-grupo");
        setTimeout(function(){
          $rootScope.alertaAgregarAlumnosGrupo=false;
          console.log("El alumno "+$scope.selected[i].nombre+" se agregó correctamente");
        },2000);
      })
    }
  };
});

myApp.controller('GrupoCtrl',function ($http,$scope,$state,$rootScope){
  $scope.integrantes=[];
  $scope.jefeGrupo=[];
  $rootScope.alertaErrorEliminacionGrupo=false;
  $rootScope.alertaEliminacionAlumno=false;
  $rootScope.alertaEliminacionGrupo=false;
  $rootScope.alertaAsignacionJefe=false;
  $http.get("http://manuel-api2.herokuapp.com/buscar_por_grupo?grupo_id="+$rootScope.mi_grupo.id)
  .success(function(data) {
    console.log(data);
    if(data.length>0){
      $scope.integrantes = data;
      $http.get("http://manuel-api2.herokuapp.com/datos_jefe?grupo_id="+$rootScope.mi_grupo.id)
        .success(function(data){
          console.log(data);
          if(data.length>0){
            $scope.jefeGrupo=data;
            for(i in $scope.integrantes){
              $scope.integrantes[i].jefe=false;
              if($scope.integrantes[i].id==$scope.jefeGrupo[0].id){
                console.log($scope.integrantes[i].nombre+" es el jefe de grupo")
                $scope.integrantes[i].jefe=true;
              }
            }
          }else{
            for(i in $scope.integrantes){
              $scope.integrantes[i].jefe=false;
            }
          }
        });
    }
  });



  $scope.eliminarGrupo = function () {

    $http.delete("http://manuel-api2.herokuapp.com/grupos/"+$rootScope.mi_grupo.id)
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
  $scope.eliminarAlumnoGrupo = function (integrante) {
    console.log("se va a borrar el alumno "+integrante.nombre+" del grupo "+$rootScope.mi_grupo.id);
    $http.delete("http://manuel-api2.herokuapp.com/borrar_alumno?alumno_id="+integrante.id+"&grupo_id="+$rootScope.mi_grupo.id)
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
      $scope.indice=$scope.integrantes.indexOf(integrante);
      console.log("Se va a eliminar el indice "+$scope.indice);
      $scope.integrantes.splice($scope.indice,1);
  };
  $scope.asignarJefe = function (integrante) {
    if($scope.jefeGrupo.length>0){
      $http.put("http://manuel-api2.herokuapp.com/es_jefe", {
        alumno_id: $scope.jefeGrupo[0].id,
        grupo_id: $rootScope.mi_grupo.id,
        jefe: false
      })
    }
    console.log("se va a asignar como jefe al alumno "+integrante.nombre+" del grupo "+$rootScope.mi_grupo.id);
    $http.put("http://manuel-api2.herokuapp.com/es_jefe", {
      alumno_id: integrante.id,
      grupo_id: $rootScope.mi_grupo.id,
      jefe: true
    })
      .success(function() {
        $rootScope.alertaAsignacionJefe=true;
        setTimeout(function(){
          $rootScope.alertaAsignacionJefe=false;
          console.log("alertaAsignacionJefe=false");
        },2000);
      })
      .error(function(err){
        $rootScope.alertaErrorAsignacionJefe=true;
        setTimeout(function(){
          $rootScope.alertaErrorAsignacionJefe=false;
          console.log("alertaErrorAsignacionJefe=false");
        },2000);
      });
    for(i in $scope.integrantes){
      if($scope.integrantes[i].id==integrante.id){
        console.log($scope.integrantes[i].nombre+" es el jefe de grupo")
        $scope.integrantes[i].jefe=true;
      }else{
        $scope.integrantes[i].jefe=false;
      }
    }
  };
});

myApp.controller('EvaluacionCtrl',function ($scope,$state,$rootScope){
  
});

myApp.controller('VerCursos', function ($rootScope,$http, $scope, $state) {
  $scope.cursos = [];
  $http.get("http://manuel-api2.herokuapp.com/cursos_profesor?profesor_id="+$scope.usuario[0].id)
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
  $http.get("http://manuel-api2.herokuapp.com/grupos_curso?id="+$rootScope.mi_curso.id)
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
  $rootScope.alumnosCurso = [];
  $scope.alertaEliminacionAlumno=false;
  $http.get("http://manuel-api2.herokuapp.com/buscar_alumnos_curso?curso_id="+$rootScope.mi_curso.id)
    .success(function(data) {
      if(data.length>0){
        $rootScope.alumnosCurso = data;
        console.log($rootScope.alumnosCurso);
      }
    });
  $scope.seleccionarAlumno = function (id) {
      $scope.id_alumno_seleccionado = id;
      console.log("id_alumno: "+$scope.id_alumno_seleccionado);
      $rootScope.mi_alumno=$rootScope.alumnosCurso[$scope.id_alumno_seleccionado];
      console.log($rootScope.mi_alumno.nombre);
      $state.go('detalle-curso.detalle-alumno');
  }
  $scope.eliminarAlumnoCurso = function (index) {
    var id_alumno = $rootScope.alumnosCurso[index].id;
    $http.delete("http://manuel-api2.herokuapp.com/borrar_alumno_curso?alumno_id="+id_alumno+"&curso_id="+$rootScope.mi_curso.id)
      .success(function() {
        $rootScope.alertaEliminacionAlumno=true;
        $state.go('detalle-curso.alumnos');
        setTimeout(function(){
          $rootScope.alertaEliminacionAlumno=false;
          console.log("alertaEliminacionAlumno=false");
        },2000);
      });
    $rootScope.alumnosCurso.splice(index,1);

  };
});

myApp.controller('VerEvaluaciones', function ($rootScope,$http, $scope, $state) {
  $rootScope.encuestas = [];
  $rootScope.encuestas.evaluaciones = [];
  $rootScope.alertaEliminacionEncuesta=false;
  $http.get("http://manuel-api2.herokuapp.com/evaluaciones_curso?curso_id="+$rootScope.mi_curso.id)
    .success(function(data) {
      console.log(data);
      if(data.length>0){
        for(i in data){
          if(data[i].id==null){
            $rootScope.encuestas.push(data[i]);
          }else{
            $rootScope.encuestas.evaluaciones.push(data[i]);
          }
        }
              console.log("");
      }
    });
  $scope.seleccionarEvaluacion = function (id) {
      $scope.id_evaluacion_seleccionado = id;
      console.log("id_evaluacion: "+$scope.id_evaluacion_seleccionado);
      $rootScope.mi_evaluacion=$scope.evaluaciones[$scope.id_evaluacion_seleccionado];
      $rootScope.mi_encuesta=$rootScope.encuestas[$scope.id_evaluacion_seleccionado];
      $state.go('detalle-curso.detalle-evaluacion');
  }
  
});

myApp.controller('AgregarAlumno', function ($rootScope,$http, $scope, $state) {
  $scope.alumnosFaltantes = [];
  $scope.grupos = [];
  $rootScope.alertaAgregarAlumno=false;
  $rootScope.alertaAsignarGrupo=false;
  $http.get("http://manuel-api2.herokuapp.com/alumnos.json")
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
  $http.get("http://manuel-api2.herokuapp.com/grupos_curso?id="+$rootScope.mi_curso.id)
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
      var arreglo={curso_id:$rootScope.mi_curso.id,alumno_id:$scope.selected[i].id,estado:false,jefe_proyecto:false};
      console.log(arreglo);
      $http.post("http://manuel-api2.herokuapp.com/curso_alumnos",arreglo)
        .success(function() {
          $rootScope.alertaAgregarAlumno=true;
          $rootScope.alumnosCurso.push($scope.selected[i]);
        })
        .error(function(err){
          console.log("No se pudo agregar al curso al alumno"+$scope.selected[i].nombre);
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
  $http.get("http://manuel-api2.herokuapp.com/encuestas_profesor?profesor_id="+$scope.usuario[0].id)
  .success(function(data) {
    console.log(data);
    if(data.length>0){
      $scope.encuestas=data;
    }
  });
  $scope.nuevaEncuesta = function (){
    console.log($scope.entrada);
    //hace un post y publica encuesta
    $http.post("http://manuel-api2.herokuapp.com/evaluaciones",{
      contestada: false,
      curso_id: $rootScope.mi_curso.id,
      encuesta_id: $scope.entrada.encuesta_id,
      nombre: $scope.entrada.nombre
    })
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
  $scope.agregarGrupo = function (){
    console.log($scope.entrada.nombreGrupo+" "+$scope.entrada.descripcionGrupo);
    var arreglo={nombre:$scope.entrada.nombreGrupo,curso_id:$rootScope.mi_curso.id,descripcion:$scope.entrada.descripcionGrupo};
    $http.post("http://manuel-api2.herokuapp.com/grupos",arreglo)
      .success(function() {
        $rootScope.alertaAgregarGrupo=true;
        $state.go("detalle-curso.grupos");
        setTimeout(function(){
          $rootScope.alertaAgregarGrupo=false;
          console.log("AlertaAgregarGrupo=false");
        },2000);
      });
  }
});

myApp.controller("RadarCtrl_profesor", function ($scope,$http,$rootScope) {

    $http.get("http://manuel-api2.herokuapp.com/grupos_curso?id="+$rootScope.mi_curso.id)
    .success(function(data){
        $scope.datosCurso = data;
    })
    .error(function(err){

    });
    $http.get("http://manuel-api2.herokuapp.com/preguntas_encuesta?encuesta_id="+$rootScope.mi_evaluacion.encuesta_id)
    .success(function(data){
        var label= [];
        var enunciados= [];
        for(x=0; x<data.length; x++){
            label.push(x+1);
            enunciados.push(data[x]);
        }
        $scope.labels = label;
        $scope.colores = [{ 
          "fillColor": "rgba(167, 208, 167, 0.5)",
          "strokeColor": "rgba(0,128,0,0.8)"
        },
        { 
          "fillColor": "rgba(255, 115, 53, 0.4)",
          "strokeColor": "rgba(255,115,53,0.8 )"
        }];
        $scope.enunciados = enunciados;

        $scope.series = ['Promedio grupo', 'Promedio curso'];    
      
        var datos= [];
        var datos1= [];
        var datos2= [];
        var datos3= [];
        for(x=0; x<data.length; x++) {
            datos1.push(Math.floor((Math.random() * 5) + 1));
        }
        for(x=0; x<data.length; x++) {
            datos3.push(Math.floor((Math.random() * 5) + 1));
        }
        for(x=data.length-1; x>-1; x--) {
            datos2.push(data[x].id);
        }
        datos1[0]=5;
        datos2[0]=2;
        datos3[0]=4;
        $scope.valoresAlumno=datos1;
        $scope.valoresCurso=datos2;
        $scope.valoresGrupo=datos3;
           
        
        datos.push(datos1);
        
        datos.push(datos2);
        var totalSuma=0;
        
            for(i=0;i<datos1.length;i++){
                totalSuma = totalSuma + (datos1[i]-datos2[i]);
            }
            $scope.modulo=totalSuma/datos1.length;
        
        $scope.data = datos;
    })
    .error(function(err){
    });
});