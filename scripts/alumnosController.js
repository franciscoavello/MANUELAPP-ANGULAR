var myApp = angular.module('myApp');

myApp.controller("VerEncuestasPendientes", function($scope,$http,$rootScope){
    $http.get("http://manuel-api.herokuapp.com/buscar_pendientes_alumno?correo="+$scope.usuario[0].correo)
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
    $http.get("http://manuel-api.herokuapp.com/buscar_encuestas_alumno?correo="+$scope.usuario[0].correo)
    .success(function(data){
        $scope.encuestas = data;
        console.log($scope.encuestas);
    })
    .error(function(err){
    });

    $scope.ingresarNombreEncuesta = function (nomEncuesta) {
        $rootScope.encuestaSeleccionada  = nomEncuesta;
    };

});

myApp.controller("ResponderEncuesta", function($scope,$http,$rootScope){
    $http.get("http://manuel-api.herokuapp.com/grupo_encuesta_pendiente?correo="+$rootScope.correoUsuarioLogueado+"&encuesta_id="+$scope.idEncuesta)
    .success(function(data1){
        $http.get("http://manuel-api.herokuapp.com/buscar_por_grupo?grupo_id="+data1[0].id)
        .success(function(data2){
            $scope.datosGrupo = data2;
        })
        .error(function(err){

        });
    })
    .error(function(err){
    });

    $scope.ingresarNombreAlumno = function (idAlumno, nomAlumno,apAlumno,amAlumno) {
        $rootScope.alumnoSeleccionado = nomAlumno+" "+apAlumno+" "+amAlumno;
        $rootScope.idAlumnoSeleccionado = idAlumno;
    };
    
    $scope.completarEncuesta = function (){
        $http.get("http://manuel-api.herokuapp.com/datos_alumno?correo="+$rootScope.correoUsuarioLogueado)
        .success(function(data){
            console.log(data[0].id);
            console.log($scope.idEncuesta);
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
  
    $scope.submitAnswers = function() {
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
        $state.go('encuestas.pendientes');  
        $rootScope.message.text = 'Encuesta enviada correctamente';
        $rootScope.mostrarAvisoExito = true;
        $timeout($scope.desaparecer, 2000);
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
        $rootScope.mostrarAvisoExito = true;
        $timeout($scope.desaparecer, 2000);
    }  


    $scope.registrarEvaluacion = function (idAlumnoSeleccionado, alumnoSeleccionado) {
        
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

myApp.controller("RadarCtrl", function ($scope,$http) {
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
          "fillColor": "rgba(167, 208, 167  , 0.5)",
          "strokeColor": "rgba(0,128,0,0.8)",
          "pointColor": "rgba(220,220,220,1)",
          "pointStrokeColor": "#fff",
          "pointHighlightFill": "#fff",
          "pointHighlightStroke": "rgba(151,187,205,0.8)"
        },
        { 
          "fillColor": "rgba(255, 115, 53  , 0.4)",
          "strokeColor": "rgba(255,115,53,0.8 )",
          "pointColor": "rgba(220,220,220,1)",
          "pointStrokeColor": "#fff",
          "pointHighlightFill": "#fff",
          "pointHighlightStroke": "rgba(151,187,205,0.8)"
        }];
        $scope.enunciados = enunciados;
        $scope.series = ['Mi promedio', 'Promedio curso'];
        var datos= [];
        var datos1= [];
        var datos2= [];
        for(x=0; x<data.length; x++) {
            datos1.push(data[x].id);
        }
        for(x=data.length-1; x>-1; x--) {
            datos2.push(data[x].id);
        }
        datos1[0]=5;
        datos2[0]=2;
        $scope.valoresAlumno=datos1;
        $scope.valoresCurso=datos2;
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