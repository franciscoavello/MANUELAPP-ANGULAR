
var myApp = angular.module('myApp');

myApp.controller("verEncuestas", function($scope,$http,$rootScope){
    $scope.newField = [];
  $scope.editado = false;
      $scope.loading = true;
      $http.get("http://manuel-api.herokuapp.com/mostrar_encuestas")
        .success(function(data){
          $scope.encuestas = data;          
          $scope.loading = false;
        })
        .error(function(err){
        });
        $scope.editarDato = function(field){
    $scope.editado= $scope.encuestas.indexOf(field);
    $scope.newField[$scope.editado] = angular.copy(field);
  }

  $scope.guardar = function(index){
    $scope.encuestas[$scope.editado]= $scope.newField;
   
  }

  $scope.editarCancelar = function(index){
    //$scope.alumnos[index]= $scope.newField[index];
    $scope.editado = false;
  }
        
});

myApp.controller("verTiposEncuestas", function($scope,$http,$rootScope){
    $scope.newField = [];
  $scope.editado = false;
  $scope.loading = true;
  $scope.alertaEliminacionTipo = false;
      $http.get("http://manuel-api.herokuapp.com/mostrar_tipos_encuestas")
        .success(function(data){
          $scope.tipos = data;    
          $scope.loading = false;      
        })
        .error(function(err){
        });

        $scope.editarDato = function(field){
    $scope.editado= $scope.tipos.indexOf(field);
    $scope.newField[$scope.editado] = angular.copy(field);
  }

  $scope.eliminarTipoDeEncuesta = function(index){
    var tipo = $scope.tipos[index];
    $http.delete("http://manuel-api.herokuapp.com/tipos_encuesta/"+tipo.id)
      .success(function(){
        $scope.alertaEliminacionTipo=true;
        $state.go('admintencuestas.ver');
        })
        .error(function(err){
        });

  }

  $scope.guardar = function(index){
    $scope.tipos[$scope.editado]= $scope.newField;
   
  }

  $scope.editarCancelar = function(index){
    //$scope.alumnos[index]= $scope.newField[index];
    $scope.editado = false;
  }
});

myApp.controller("verProfesores", function($scope,$http){
    $scope.newField = [];
  $scope.editado = false;
  $scope.loading = true;
 $http.get("http://manuel-api.herokuapp.com/buscar_por_rol?rol=1")
    .success(function(data) {
      $scope.profesores = data;
      $scope.loading = false;
    });
    $scope.editarDato = function(field){
    $scope.editado= $scope.tipos.indexOf(field);
    $scope.newField[$scope.editado] = angular.copy(field);
  }

  $scope.guardar = function(index){
    $scope.tipos[$scope.editado]= $scope.newField;
   
  }

  $scope.editarCancelar = function(index){
    //$scope.alumnos[index]= $scope.newField[index];
    $scope.editado = false;
  }

});

myApp.controller('verAlumnos', function ($http, $scope, $state) {
  $scope.loading = true;
  $scope.newField = [];
  $scope.editado = false;
  $http.get("http://manuel-api.herokuapp.com/buscar_por_rol?rol=2")
    .success(function(data) {
      $scope.alumnos = data;
      $scope.loading = false;
    });

  $scope.editarDato = function(field){
    $scope.editado= $scope.alumnos.indexOf(field);
    $scope.newField[$scope.editado] = angular.copy(field);
  }

  $scope.guardar = function(index){
    $scope.alumnos[$scope.editado]= $scope.newField;
   
  }

  $scope.editarCancelar = function(index){
    //$scope.alumnos[index]= $scope.newField[index];
    $scope.editado = false;
  }
  
});

myApp.controller('verCursos', function ($http, $scope, $state) {
  $scope.loading = true;
    $scope.newField = [];
    $scope.editado = false;
  $http.get("http://manuel-api.herokuapp.com/mostrar_cursos")
    .success(function(data) {
      $scope.cursos = data;
      $scope.loading = false;
    });
  
    $scope.editarDato = function(field){
    $scope.editado= $scope.cursos.indexOf(field);
    $scope.newField[$scope.editado] = angular.copy(field);
  }

  $scope.guardar = function(index){
    $scope.cursos[$scope.editado]= $scope.newField;
   
  }

  $scope.editarCancelar = function(index){
    //$scope.alumnos[index]= $scope.newField[index];
    $scope.editado = false;
  }
});



myApp.controller('agregarAlumno', ['$scope','$http', function($scope,$http) {
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
        $scope.alertaAgregarAlumno=true;
      });

        };
}]);

myApp.controller('agregarProfesor', ['$scope','$http', function($scope,$http) {
  $scope.agregarProfe = function(){

    $http.post("http://manuel-api.herokuapp.com/usuarios", {
        rut: $scope.rut,
        nombre: $scope.nombre,
        apellido_paterno:$scope.apellido_paterno,
        apellido_materno:  $scope.apellido_materno,
        correo: $scope.correo,
        rol: 1
    }).success(function() {
        $scope.agregado = true;
        $scope.agregaProfesor.$setPristine();
      });

    $scope.cancelar = function(){
      $scope.agregaProfesor.$setPristine();
    }
  }
}]);

myApp.controller('agregarCurso', ['$scope','$http', function($scope,$http) {

  $scope.agregar = function() {
    $http.post("http://manuel-api.herokuapp.com/cursos", {
        profesor_id: "1",
        nombre: $scope.nombre,
        semestre: $scope.semestre,
        año: $scope.ano,
        descripcion: $scope.descripcion
}).success(function(data) {
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
}]);

myApp.controller('agregarEncuesta', ['$scope','$http', function($scope,$http) {
  

  $scope.update = function() {
    $http.post("http://manuel-api.herokuapp.com/encuesta", {
        estado: true,
        nombre: $scope.nombre,
        descripcion: $scope.descripcion,
        tipo_encuesta_id: 1
    }).success(function(data) {
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
}]);


myApp.controller('agregartEncuesta', ['$scope','$http', function($scope,$http) {
  

  $scope.agregar = function() {
    $http.post("http://manuel-api.herokuapp.com/tipos_encuesta", {
        nombre: $scope.nombre,
        descripcion: $scope.descripcion 
      }).success(function(data) {
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
}]);

