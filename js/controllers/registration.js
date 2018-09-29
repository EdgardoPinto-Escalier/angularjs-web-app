myApp.controller('RegistrationController', 
['$scope', 'Authentication', 

function($scope, Authentication) {
// Login method where we excecute the login function.
$scope.login = function() {
  Authentication.login($scope.user);
};

// Logout method where we excecute the logout function.
$scope.logout = function() {
  Authentication.logout();
};

// register method where we excecute the register function.
$scope.register = function() {
  Authentication.register($scope.user);
};

}]);