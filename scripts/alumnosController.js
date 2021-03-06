    var myApp = angular.module('myApp');

myApp.controller("VerEncuestasPendientes", function($scope,$http,$rootScope){
    $scope.tipoencuesta=[];
    $http.get("http://manuel-api.herokuapp.com/buscar_pendientes_alumno?correo="+$scope.usuario[0].correo)
    .success(function(data){
        $scope.encuestas=data;
    })
    .error(function(err){
    });
    $http.get("http://manuel-api.herokuapp.com/tipos_encuesta.json")
    .success(function(data){
        for(x=0; x<data.length; x++) {
            $scope.tipoencuesta.push(data[x].nombre);
        }
    })
    .error(function(err){
    });
    
    $scope.ingresarNombreEncuesta = function (nomEncuesta) {
        console.log($rootScope.matrizRespuestas);
        $rootScope.matrizRespuestas = []; 
        console.log($rootScope.matrizRespuestas);
        $rootScope.encuestaSeleccionada = nomEncuesta;
    };

});

myApp.controller("VerEncuestasCompletadas", function($scope,$http,$rootScope, $state){
    $scope.tipoencuesta=[];
    $http.get("http://manuel-api.herokuapp.com/tipos_encuesta.json")
    .success(function(data){
        for(x=0; x<data.length; x++) {
            $scope.tipoencuesta.push(data[x].nombre);
        }
    })
    .error(function(err){
    });
    $http.get("http://manuel-api.herokuapp.com/buscar_encuestas_alumno?correo="+$scope.usuario[0].correo)
    .success(function(data){
        $scope.encuestas = data;
        console.log($scope.encuestas);
    })
    .error(function(err){
    });

    $scope.ingresarNombreEncuesta = function (nomEncuesta, idEncuesta) {
        $rootScope.encuestaSeleccionada  = nomEncuesta;
        $scope.idEncuesta = idEncuesta;
        $scope.soyjefe=false;
        $scope.soyjefeProyecto=false;
        if($rootScope.correoUsuarioLogueado=='claudia.guzmans@usach.cl'){
            $scope.soyjefeProyecto=true;
        }
        $scope.ingresarNombre = function (idGrupo) {
            $rootScope.idGrupoSeleccionado = idGrupo;
        };
        $scope.ingresarNombreAlumno = function (idAlumno) {
            $rootScope.idAlumnoSeleccionado = idAlumno;
        };
        $http.get("http://manuel-api.herokuapp.com/encuestas_jefe?correo="+$rootScope.correoUsuarioLogueado)
        .success(function(data){
                for(i=0;i<data.length;i++){
                    if(data[i].id==$scope.idEncuesta){
                        $scope.soyjefe=true;
                    }
                }
                console.log($scope.soyjefe);
                if($scope.soyjefe){
                    $state.go('encuestas.estadisticasJefe',{idEncuesta: $scope.idEncuesta});
                }
                else if($scope.soyjefeProyecto){
                    $state.go('encuestas.estadisticasJefeProyecto',{idEncuesta: $scope.idEncuesta});
                }
                else{
                    $state.go('encuestas.estadisticas',{idEncuesta: $scope.idEncuesta});
                }

            })
        .error(function(err){
        });
    };

});

myApp.controller("ResponderEncuesta", function($scope,$http,$rootScope,$state){
    document.body.scrollTop = 0;
    if($rootScope.matrizRespuestas == undefined) {
        $rootScope.matrizRespuestas = [];
    }
    if($scope.datosGrupo == undefined) {
        $http.get("http://manuel-api.herokuapp.com/buscar_por_grupo?grupo_id=23")
        .success(function(data2){
            $scope.datosGrupo = data2;
            console.log(data2);
            $scope.contestaron = data2;
            $rootScope.cantidadAlGrupos=data2.length;
        })
        .error(function(err){

        });
    }

    $scope.pasarContestado = function (idAlumnoEncuestado) {
        for(i=0;i<$scope.datosGrupo.length;i++){
            if($scope.datosGrupo[i].id==idAlumnoEncuestado){
                $scope.datosGrupo.splice(i,1);
            }
        }
        $state.go('encuestas.responder360');  
    };

    $scope.ingresarNombreAlumno = function (idAlumno, nomAlumno,apAlumno,amAlumno) {
        $rootScope.alumnoSeleccionado = nomAlumno+" "+apAlumno+" "+amAlumno;
        $rootScope.idAlumnoSeleccionado = idAlumno;
    };
    
    $scope.completarEncuesta = function (){          
        $http.get("http://manuel-api.herokuapp.com/datos_alumno?correo="+$rootScope.correoUsuarioLogueado)
        .success(function(data){
            $http.put("http://manuel-api.herokuapp.com/actualizar_encuesta", {
                estado: true,
                alumno_id: data[0].id,
                encuesta_id: $scope.idEncuesta
            })
            .success(function() { 
                $rootScope.matrizRespuestas = [];             
            });
        })
        .error(function(err){
        });
    };
});

myApp.controller("ObtenerPreguntas", function($scope,$http, $state,$rootScope, $timeout){
    $scope.selected_ids = [];
    $scope.jefegrupo="";
    $scope.jefegrupoid=0;
    $http.get("http://manuel-api.herokuapp.com/grupo_encuesta_pendiente?correo="+$rootScope.correoUsuarioLogueado+"&encuesta_id="+$scope.idEncuesta)
    .success(function(data1){     
        $http.get("http://manuel-api.herokuapp.com/datos_jefe?grupo_id="+data1[0].id)
        .success(function(data2){
            $scope.jefegrupo=(data2[0].nombre+" "+data2[0].apellido_paterno+" "+data2[0].apellido_materno);
            $scope.jefegrupoid=(data2[0].id);
        })
        .error(function(err){
        });
    })
    .error(function(err){      
    });
    $http.get("http://manuel-api.herokuapp.com/preguntas_encuesta?encuesta_id="+$scope.idEncuesta)
    .success(function(data){
        $scope.preguntas = data;
        $http.get("http://manuel-api.herokuapp.com/preguntas_encuesta_opciones?encuesta_id="+$scope.idEncuesta)
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

    $scope.probar = function(idAlumno){
        $scope.selected_ids = [];
        $scope.selected_ids.push(idAlumno);
        angular.forEach($scope.preguntas, function(pregunta) {
            $scope.selected_ids.push(pregunta.id);
            $scope.selected_ids.push(pregunta.selected_id.id);
            $scope.selected_ids.push(pregunta.selected_id.val);
        });
        $rootScope.matrizRespuestas.push($scope.selected_ids);
        document.body.scrollTop = 0;
        if($rootScope.matrizRespuestas.length==$rootScope.cantidadAlGrupos){
            $scope.completarEncuesta(); 
        }
        else{
            $rootScope.message.text = 'Alumno evaluado correctamente';
            $rootScope.mostrarAvisoExitoLocal = true;
            $timeout($scope.desaparecer, 2000);
        }
    }  
    $scope.submitAnswers = function() {
        $scope.selected_ids = [];
        $scope.contador = 0;
        angular.forEach($scope.preguntas, function(pregunta) {
            $scope.selected_ids.push(pregunta.id);
            $scope.selected_ids.push(pregunta.selected_id.id);
            $scope.selected_ids.push(pregunta.selected_id.val);
        });
        console.log($scope.selected_ids);
        for (var i = 0; i < ($scope.selected_ids.length); i=i+3) {
            $http.post("http://manuel-api.herokuapp.com/respuestum_pregunta", {
                respuesta_id: $scope.selected_ids[i+1], 
                pregunta_id: $scope.selected_ids[i], 
                valor_opcion: $scope.selected_ids[i+2]
            }); 
        };
        $http.get("http://manuel-api.herokuapp.com/grupo_encuesta_pendiente?correo="+$rootScope.correoUsuarioLogueado+"&encuesta_id="+$scope.idEncuesta)
        .success(function(data1){
            $http.get("http://manuel-api.herokuapp.com/buscar_por_correo?correo="+$rootScope.correoUsuarioLogueado)
            .success(function(data2){
                $http.get("http://manuel-api.herokuapp.com/evaluaciones_curso_encuesta?curso_id="+data1[0].curso_id+"&encuesta_id="+$scope.idEncuesta)
                .success(function(data3){
                    $http.get("http://manuel-api.herokuapp.com/datos_alumno?correo="+$rootScope.correoUsuarioLogueado)
                    .success(function(data4){
                        console.log($scope.jefegrupoid);
                        console.log(data4[0].id);
                        console.log(data3[0].id);
                        $http.post("http://manuel-api.herokuapp.com/guardar_respuesta",{
                            encuestado_id:  $scope.jefegrupoid,
                            encuestador_id: data4[0].id,
                            evaluacion_id: data3[0].id
                        });
                    })
                    .error(function(err){
                    });
                })
                .error(function(err){
                });
            })
            .error(function(err){
            });
        })
        .error(function(err){
        });
        $scope.completarEncuesta();        
    }  

    $scope.submitAnswers360 = function(idAlumnoSeleccionado, alumnoSeleccionado) {
        $scope.selected_ids = [];
        $scope.contador = 0;
        angular.forEach($scope.preguntas, function(pregunta) {
            $scope.selected_ids.push(pregunta.id);
            $scope.selected_ids.push(pregunta.selected_id.id);
            $scope.selected_ids.push(pregunta.selected_id.val);
        });
        for (var i = 0; i < ($scope.selected_ids.length); i=i+3) {
            $http.post("http://manuel-api.herokuapp.com/respuestum_pregunta", {
                respuesta_id: $scope.selected_ids[i+1], 
                pregunta_id: $scope.selected_ids[i], 
                valor_opcion: $scope.selected_ids[i+2]
            }); 
        };
        $http.get("http://manuel-api.herokuapp.com/grupo_encuesta_pendiente?correo="+$rootScope.correoUsuarioLogueado+"&encuesta_id="+$scope.idEncuesta)
        .success(function(data1){
            $http.get("http://manuel-api.herokuapp.com/buscar_por_correo?correo="+$rootScope.correoUsuarioLogueado)
            .success(function(data2){
                $http.get("http://manuel-api.herokuapp.com/evaluaciones_curso_encuesta?curso_id="+data1[0].curso_id+"&encuesta_id="+$scope.idEncuesta)
                .success(function(data3){
                    $http.get("http://manuel-api.herokuapp.com/datos_alumno?correo="+$rootScope.correoUsuarioLogueado)
                    .success(function(data4){
                        $http.post("http://manuel-api.herokuapp.com/guardar_respuesta",{
                            encuestado_id: idAlumnoSeleccionado,
                            encuestador_id: data4[0].id,
                            evaluacion_id: data3[0].id
                        });
                    })
                    .error(function(err){
                    });
                })
                .error(function(err){
                });
            })
            .error(function(err){
            });
        })
        .error(function(err){
        });
        $state.go('encuestas.pendientes');  
        $rootScope.message.text = 'Encuesta enviada correctamente';
        $rootScope.mostrarAvisoExitoLocal = true;
        $timeout($scope.desaparecer, 2000);
        document.body.scrollTop = 0;
    }  


    $scope.completarEncuesta = function (){
        $http.get("http://manuel-api.herokuapp.com/datos_alumno?correo="+$rootScope.correoUsuarioLogueado)
        .success(function(data){
            $http.put("http://manuel-api.herokuapp.com/actualizar_encuesta", {
                estado: true,
                alumno_id: data[0].id,
                encuesta_id: $scope.idEncuesta
            })
            .success(function() {
              $state.go('encuestas.pendientes');  
              $rootScope.message.text = 'Encuesta enviada correctamente';
              $rootScope.mostrarAvisoExitoLocal = true;
              $timeout($scope.desaparecer, 2000);
              document.body.scrollTop = 0;
            });
        })
        .error(function(err){
        });
    };

    $scope.completarEncuestaLiderazgo = function (){
        $http.get("http://manuel-api.herokuapp.com/datos_alumno?correo="+$rootScope.correoUsuarioLogueado)
        .success(function(data){
            $http.put("http://manuel-api.herokuapp.com/actualizar_encuesta", {
                estado: true,
                alumno_id: data[0].id,
                encuesta_id: $scope.idEncuesta
            })
            .success(function() {
            });
        })
        .error(function(err){
        });
    };   
});

myApp.controller("RadarCtrl", function ($scope,$http,$rootScope) {
    $scope.soyjefeProyecto=false;
    if($rootScope.correoUsuarioLogueado=='claudia.guzmans@usach.cl'){
        $scope.soyjefeProyecto=true;
    }
    $http.get("http://manuel-api.herokuapp.com/encuestas_jefe?correo="+$rootScope.correoUsuarioLogueado)
    .success(function(data){
        for(i=0;i<data.length;i++){
            if(data[i].id==$scope.idEncuesta){
                $scope.soyjefe=true;
            }
        }
    })
    .error(function(err){
    });
    $http.get("http://manuel-api.herokuapp.com/grupo_encuesta_pendiente?correo="+$rootScope.correoUsuarioLogueado+"&encuesta_id="+$scope.idEncuesta)
    .success(function(data1){
        $http.get("http://manuel-api.herokuapp.com/buscar_por_grupo?grupo_id=23")
        .success(function(data2){
            $scope.datosGrupo = data2;
        })
        .error(function(err){

        });
    })
    .error(function(err){
    });
    $http.get("http://manuel-api.herokuapp.com/grupos_curso?id=1")
    .success(function(data){
        $scope.datosCurso = data;
    })
    .error(function(err){

    });
    $http.get("http://manuel-api.herokuapp.com/preguntas_encuesta?encuesta_id="+$scope.idEncuesta)
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
        if($scope.soyjefeProyecto){
            $scope.series = ['Promedio grupo', 'Promedio curso'];    
        }
        else{
            $scope.series = ['Promedio alumno', 'Promedio grupo'];   
        }
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
        if($scope.soyjefeProyecto){
            datos.push(datos3);
        }
        else{
            datos.push(datos1);
        }
        datos.push(datos2);
        var totalSuma=0;
        if($scope.soyjefeProyecto){
            for(i=0;i<datos3.length;i++){
                totalSuma = totalSuma + (datos3[i]-datos2[i]);
            }
            $scope.modulo=totalSuma/datos3.length;
            }
        else{
            for(i=0;i<datos1.length;i++){
                totalSuma = totalSuma + (datos1[i]-datos2[i]);
            }
            $scope.modulo=totalSuma/datos1.length;
        }
        $scope.data = datos;
    })
    .error(function(err){
    });
});