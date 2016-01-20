
var myApp = angular.module('myApp');


myApp.controller("verEncuestas", function($scope,$http,$rootScope){
    $scope.newField = {};
    $scope.editando = false;
    $scope.loading = true;
    $scope.alertaEditarEncuesta = false;
      $http.get("http://manuel-api.herokuapp.com/mostrar_encuestas")
        .success(function(data){
          $scope.encuestas = data;          
          $scope.loading = false;
        })
        .error(function(err){
        });
  
    $scope.editarEncuesta = function(field) {
        $scope.editando = $scope.encuestas.indexOf(field);
        $scope.newField[$scope.editando] = angular.copy(field);
    }
    
    $scope.obtenerEncuesta= function(index){
      $scope.detalle = $scope.encuestas[index];
      $scope.preguntas = [];
      $http.get("http://manuel-api.herokuapp.com/preguntas_encuesta_opciones?encuesta_id="+index)
        .success(function(data){
          $scope.preguntas = data;          
          $scope.loadingDetalle = false;
        })
        .error(function(err){
        });
    };

    $scope.guardarCampo = function(index) {
        //if ($scope.editing !== false) {
            //$scope.encuestas[$scope.editando] = $scope.newField;

      $http.put("http://manuel-api.herokuapp.com/encuesta/"+index, {
          nombre: $scope.newField[$scope.editando].nombre, 
          descripcion: $scope.newField[$scope.editando].descripcion
       }).success(function() {
        $scope.alertaEditarEncuesta = true;
      });
            //$scope.editing = false;
        //}       
   };
    
    $scope.cancel = function(index) {
        //if ($scope.editing !== false) {
            $scope.encuestas[index] = $scope.newField[index];
            $scope.editando = false;
        //}       
    };

  $scope.eliminarEncuesta = function(index){
    $scope.alertaEliminarEncuesta=false;

    $http.delete("http://manuel-api.herokuapp.com/encuesta/"+$scope.encuestas[index].id)
      .success(function(){
        $scope.alertaEliminarEncuesta=true;
        $state.go('adminencuestas.ver');
        setTimeout(function(){

          $rootScope.alertaEliminarEncuesta=false;
          console.log("alertaEliminarEncuesta=false");
        },2000);
      })
        .error(function(err){
      });
      $scope.alertaEliminarEncuesta = true;
      $scope.encuestas.splice(index,1);
  }
        
});

myApp.controller("verTiposEncuestas", function($scope,$http,$rootScope){
    $scope.newField = [];
  $scope.loading=true;


  $http.get("http://manuel-api.herokuapp.com/mostrar_tipos_encuestas")
    .success(function(data){
        $scope.tipos = data;   
        $scope.loading = false;      
     })
     .error(function(err){
     });
  $scope.editado=false;
  $scope.alertaEditarTipo=false;
  $scope.alertaEliminacionTipo=false;

  $scope.editarTipoEncuesta = function(field) {
        $scope.editando = $scope.tipos.indexOf(field);
        $scope.newField[$scope.editando] = angular.copy(field);
    }
      
      $scope.obtenerTEncuesta= function(index){
      $scope.detalle = $scope.tipos[index];
    };

    $scope.guardarCampo = function(index) {
        //if ($scope.editing !== false) {
            //$scope.encuestas[$scope.editando] = $scope.newField;

      $http.put("http://manuel-api.herokuapp.com/tipos_encuesta/"+index, {
          nombre: $scope.newField[$scope.editando].nombre, 
          descripcion: $scope.newField[$scope.editando].descripcion
       }).success(function() {
        $scope.alertaEditarTipo = true;
      });
            //$scope.editing = false;
        //}       
   };
    
    $scope.cancelar = function(index) {
        //if ($scope.editing !== false) {
            $scope.tipos[index] = $scope.newField[index];
            $scope.editando = false;
        //}       
    };

  $scope.eliminarTipoDeEncuesta = function(index){
    $scope.alertaEliminacionTipo=false;

    $http.delete("http://manuel-api.herokuapp.com/tipos_encuesta/"+$scope.tipos[index].id)
      .success(function(){
        $scope.alertaEliminacionTipo=true;
        $state.go('admintencuestas.ver');
        setTimeout(function(){

          $rootScope.alertaEliminacionTipo=false;
          console.log("alertaEliminacionTipo=false");
        },2000);
      })
        .error(function(err){
      });
      $scope.alertaEliminacionTipo = true;
      $scope.tipos.splice(index,1);
  }
});

myApp.controller("verProfesores", function($scope,$http){
    $scope.newField = [];
  $scope.editando = false;
  $scope.loading = true;
  $scope.detalle = [];
  $scope.cursos = [];
  $scope.alertaEditarProfesor = false;
  $scope.avisoDeshabilitarProfesor= false;
  $scope.avisoHabilitarProfesor= false;
 $http.get("http://manuel-api.herokuapp.com/buscar_por_rol?rol=1")
    .success(function(data) {
      $scope.profesores = data;
      $scope.loading = false;
    });
  $scope.editarProfesor = function(field) {
        $scope.editando = $scope.profesores.indexOf(field);
        $scope.newField[$scope.editando] = angular.copy(field);
    }

    $scope.obtenerProfesor= function(index){
      $scope.detalle = $scope.profesores[index];
      $scope.loadingDetalle = true;
      $http.get("http://manuel-api.herokuapp.com/cursos_profesor?profesor_id="+index)
        .success(function(data) {
          $scope.cursos = data;
          $scope.loadingDetalle = false;
        });
    };
    
    $scope.guardarCampo = function(index) {
        //if ($scope.editing !== false) {
            //$scope.encuestas[$scope.editando] = $scope.newField;

      $http.put("http://manuel-api.herokuapp.com/profesores/"+index, {
          nombre: $scope.newField[$scope.editando].nombre, 
          apellido_paterno: $scope.newField[$scope.editando].apellido_paterno,
          apellido_materno: $scope.newField[$scope.editando].apellido_materno,
          correo: $scope.newField[$scope.editando].correo
       }).success(function() {
        $scope.alertaEditarProfesor = true;
      });
            //$scope.editing = false;
        //}       
   };
    
    $scope.cancelar = function(index) {
        //if ($scope.editing !== false) {
            $scope.profesores[index] = $scope.newField[index];
            $scope.editando = false;
        //}       
    };

    $scope.deshabilitarProfesor = function(index){
      $http.put("http://manuel-api.herokuapp.com/actualizar_profesor/", {
      id: index,
      estado: false
      }).success(function() {
        $scope.avisoDeshabilitarProfesor = true;
      });

    };

    $scope.habilitarProfesor = function(index){
      $http.put("http://manuel-api.herokuapp.com/actualizar_profesor/", {
      id: index,
      estado: true
      }).success(function() {
        $scope.avisoHabilitarProfesor = true;
      });

    };
  
});

myApp.controller('verAlumnos', function ($http, $scope, $state) {
  $scope.loading = true;
  $scope.newField = [];
  $scope.detalle = [];
  $scope.editando = false;
  $scope.alertaEditarAlumno = false;
  $http.get("http://manuel-api.herokuapp.com/buscar_por_rol?rol=2")
    .success(function(data) {
      $scope.alumnos = data;
      $scope.loading = false;
    });

  $scope.editarAlumno = function(field) {
        $scope.editando = $scope.alumnos.indexOf(field);
        $scope.newField[$scope.editando] = angular.copy(field);
    }

    $scope.obtenerGrupos = function(field){
      $scope.indice = $scope.alumnos.indexOf(field);
      $scope.grupos= [];
      $scope.loadingDetalle = true;
      $http.put("http://manuel-api.herokuapp.com/grupos_alumno?correo="+$scope.alumnos[$scope.indice].correo, {

       }).success(function(data) {
        $scope.grupos = data;
        $scope.loadingDetalle = false;
      });

    };
    
    $scope.guardarCampo = function(index) {
        //if ($scope.editing !== false) {
            //$scope.encuestas[$scope.editando] = $scope.newField;

      $http.put("http://manuel-api.herokuapp.com/alumnos/"+index, {
          nombre: $scope.newField[$scope.editando].nombre, 
          apellido_paterno: $scope.newField[$scope.editando].apellido_paterno,
          apellido_materno: $scope.newField[$scope.editando].apellido_materno,
          correo: $scope.newField[$scope.editando].correo
       }).success(function() {
        $scope.alertaEditarAlumno = true;
      });
            //$scope.editing = false;
        //}       
   };

  $scope.deshabilitarAlumno = function (index){
      $http.put("http://manuel-api.herokuapp.com/actualizar_alumno/", {
        id: index,
        estado: false
        }).success(function() {
          $scope.avisoDeshabilitarAlumno = true;
        });

  };

  $scope.habilitarAlumno = function (index){
      $http.put("http://manuel-api.herokuapp.com/actualizar_alumno/", {
        id: index,
        estado: true
        }).success(function() {
          $scope.avisoHabilitarAlumno = true;
        });

  };


    $scope.obtenerAlumno= function(index){
      $scope.detalle = $scope.alumnos[index];      
    };


    $scope.cancelar = function(index) {
        //if ($scope.editing !== false) {
            $scope.alumnos[index] = $scope.newField[index];
            $scope.editando = false;
        //}       
    };

  $scope.eliminarAlumno = function(index){
    $scope.avisoDeshabilitarAlumno=false;

    $http.delete("http://manuel-api.herokuapp.com/alumnos/"+$scope.alumnos[index].id)
      .success(function(){
        $scope.avisoDeshabilitarAlumno=true;
        $state.go('adminalumnos.ver');
        setTimeout(function(){

          $rootScope.avisoDeshabilitarAlumno=false;
          console.log("avisoDeshabilitarAlumno=false");
        },2000);
      })
        .error(function(err){
      });
      $scope.avisoDeshabilitarAlumno = true;
      $scope.alumnos.splice(index,1);
  }

    
});

myApp.controller('verCursos', function ($http, $scope, $state) {
  $scope.loading = true;
    $scope.newField = [];
    $scope.alertaEditarCurso = true;
    $scope.editando = false;
    $scope.alumnos = [];
  $http.get("http://manuel-api.herokuapp.com/mostrar_cursos")
    .success(function(data) {
      $scope.cursos = data;
      $scope.loading = false;
    });


  
    $scope.editarCurso = function(field) {
        $scope.editando = $scope.cursos.indexOf(field);
        $scope.newField[$scope.editando] = angular.copy(field);
    }
    
    $scope.obtenerCurso= function(index){
      $scope.detalle = $scope.cursos[index];
      $scope.loadingDetalle = true;
      $http.get("http://manuel-api.herokuapp.com/buscar_alumnos_curso?curso_id="+index)
        .success(function(data) {
          $scope.alumnos = data;
          $scope.loadingDetalle = false;
        });
    };

    $scope.guardarCampo = function(index) {
        //if ($scope.editing !== false) {
            //$scope.encuestas[$scope.editando] = $scope.newField;

      $http.put("http://manuel-api.herokuapp.com/cursos/"+index, {
          nombre: $scope.newField[$scope.editando].nombre, 
          descripcion: $scope.newField[$scope.editando].descripcion,
          semestre: $scope.newField[$scope.editando].semestre,
          ano: $scope.newField[$scope.editando].ano
       }).success(function() {
        $scope.alertaEditarCurso = true;
      });
            //$scope.editing = false;
        //}       
   };
    
    $scope.cancelar = function(index) {
        //if ($scope.editing !== false) {
            $scope.cursos[index] = $scope.newField[index];
            $scope.editando = false;
        //}       
    };



  $scope.eliminarCurso = function(index){
    $scope.avisoEliminarCurso=false;

    $http.delete("http://manuel-api.herokuapp.com/cursos/"+$scope.cursos[index].id)
      .success(function(){
        $scope.avisoEliminarCurso=true;
        $state.go('admincursos.ver');
        setTimeout(function(){

          $rootScope.avisoEliminarCurso=false;
          console.log("avisoEliminarCurso=false");
        },2000);
      })
        .error(function(err){
      });
      $scope.avisoEliminarCurso = true;
      $scope.cursos.splice(index,1);
  }


});



myApp.controller('agregarAlumno', ['$scope','$http', function($scope,$http) {
  $scope.avisoCrearAlumno = false;
 $scope.SendData = function () {
          var alumno={
            nombre:$scope.nombre,
            apellido_paterno: $scope.apellido_paterno,
            apellido_materno: $scope.apellido_materno,
            correo: $scope.correo,
            rut: $scope.rut,
            rol: 2
            
          }
    $http.post("http://manuel-api.herokuapp.com/usuarios",alumno)

      .success(function() {
        $scope.avisoCrearAlumno = true;
      });

        };
}]);

myApp.controller('agregarProfesor', ['$scope','$http', function($scope,$http) {
  $scope.avisoCrearProfesor = false;
  $scope.agregarProfe = function(){
    $scope.avisoCrearEncuesta = false;
    $http.post("http://manuel-api.herokuapp.com/usuarios", {
        
        rut: $scope.rut,
        nombre: $scope.nombre,
        apellido_paterno:$scope.apellido_paterno,
        apellido_materno:  $scope.apellido_materno,
        correo: $scope.correo,
        rol: 1
    }).success(function() {
        $scope.avisoCrearEncuesta = true;
        $scope.agregado = true;
        $scope.agregaProfesor.$setPristine();
      });

    $scope.cancelar = function(){
      $scope.agregaProfesor.$setPristine();
    }
  }
}]);

myApp.controller('agregarCurso', ['$scope','$http', function($scope,$http) {
$scope.profesores = [];
$http.get("http://manuel-api.herokuapp.com/buscar_por_rol?rol=1")
        .success(function(data){
          $scope.profesores = data;
        })
        .error(function(err){
        });


$scope.avisoCrearCurso = false;
  $scope.agregar = function() {
    $scope.avisoCrearCurso = false;
    $http.post("http://manuel-api.herokuapp.com/cursos", {
      
        profesor_id: $scope.profesor,
        nombre: $scope.nombre,
        semestre: $scope.semestre,
        año: $scope.ano,
        descripcion: $scope.descripcion
}).success(function(data) {
      console.log(response);
      $scope.id = response.value.data.id;

      $scope.avisoCrearCurso = true;
    // asignar profesor

      //$scope.cantidadGrupos=data.length;
      
    });
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

myApp.controller('agregarEncuesta', function($scope) {
  $scope.list1 = {title: 'Pregunta - Drag Me'};
  $scope.list2 = {};
});

/*
myApp.controller('agregarEncuesta', ['$scope','$http', function($scope,$http) {
  $scope.list1 = {title: 'Pregunta Tipo Prueba'};
  $scope.list2 = {};
$scope.avisoCrearEncuesta = false;
$scope.loading = true;
$http.get("http://manuel-api.herokuapp.com/mostrar_tipos_encuestas")
    .success(function(data){
        $scope.tipos = data;    
        $scope.loading = false;      
     })
     .error(function(err){
     });

  $scope.update = function() {
    $scope.avisoCrearEncuesta = false;
    $http.post("http://manuel-api.herokuapp.com/encuesta", {
      
        estado: true,
        nombre: $scope.nombre,
        descripcion: $scope.descripcion,
        tipo_encuesta_id: $scope.tipo 
    }).success(function(data) {
      $scope.avisoCrearEncuesta = true;
      //console.log(data);
      //$scope.cantidadGrupos=data.length;
    });
  };

  $scope.reset = function(form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    } 
    $scope.encuesta = angular.copy($scope.master);
  };

  $scope.reset();
}]);*/


myApp.controller('agregartEncuesta', ['$scope','$http', function($scope,$http) {
  
$scope.alertaCreacionTipo=false;
  $scope.agregar = function() {
    
      $http.post("http://manuel-api.herokuapp.com/tipos_encuesta", {
      
        nombre: $scope.nombre,
        descripcion: $scope.descripcion 
      }).success(function(data) {
          $scope.alertaCreacionTipo=true;
    });
  };

  $scope.reset = function(form) {
    $scope.alertaCreacionTipo=false
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    } 
    $scope.encuesta = angular.copy($scope.master);
  };

  $scope.reset();
}]);
