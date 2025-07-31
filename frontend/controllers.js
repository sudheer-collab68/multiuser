angular.module('todoApp').controller('TodoController', function($scope, $http) {
    $scope.users = ['alice', 'bob'];
    $scope.selectedUser = $scope.users[0];
    $scope.todos = [];

    $scope.loadTodos = function() {
        $http.get(`http://localhost:3000/api/${$scope.selectedUser}/todos`)
            .then(response => {
                $scope.todos = response.data;
            });
    };

    $scope.addTodo = function() {
        if (!$scope.newTodo) return;
        $http.post(`http://localhost:3000/api/${$scope.selectedUser}/todos`, {
            text: $scope.newTodo
        }).then(() => {
            $scope.newTodo = '';
            $scope.loadTodos();
        });
    };

    $scope.deleteTodo = function(index) {
        $http.delete(`http://localhost:3000/api/${$scope.selectedUser}/todos/${index}`)
            .then(() => $scope.loadTodos());
    };

    $scope.loadTodos();
});
