var cntl = angular.module('task',['rota']);

cntl.controller('TaskController',['$scope','$http', function($scope,$http){

	$scope.atualizar = false;
	$scope.descricao = '';
	$scope.titulo = '';

	$scope.form = false;
	$scope.novo = function (){
		$scope.form = true;
		$scope.atualizar = false;

	}

	$scope.resposta = [];
	var taskList = function (){
		$http.get("http://localhost:8080/WebService/task/listar")
		.then(function(response){
			$scope.tarefas = response.data;
			console.log($scope.tarefas);

		},function(){
			alert("Ocorreu um erro, tente mais tarde");
			console.log("erro");
		});
	}

	$scope.enviar = function (){
		$http.get("http://localhost:8080/WebService/task/enviar/"+$scope.titulo+"/"+$scope.descricao).then(function (response){
			$scope.form = false;
			taskList();
		}, function(){
			alert("Ocorreu um erro, tente mais tarde");
		});
	}

	$scope.apagar = function(x){
		$http.get("http://localhost:8080/WebService/task/editar/"+x.titulo+"/"+x.descricao).then(function (response){
			taskList();
		}, function(){
			alert("Ocorreu um erro, tente mais tarde");
		});
	}

	$scope.editar = function(x){
		$scope.titulo = x.titulo;
		$scope.descricao = x.descricao;
		$scope.form = true;
		$scope.atualizar = true;
	}

	$scope.cancelar = function (){
		$scope.form = false;
		$scope.atualizar = false;

	}

	$scope.enviarEdicao = function(){
		$http.get("http://localhost:8080/WebService/task/remover/"+$scope.titulo+"/"+$scope.descricao).then(function (response){
			$scope.form = false;
			taskList();
		}, function(){
			alert("Ocorreu um erro, tente mais tarde");
		});
	}

	taskList();

}]);