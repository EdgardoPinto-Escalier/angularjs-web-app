var myApp = angular.module('myApp', 
  ['ngRoute', 'firebase']);
  
// Here we trap the authentication event to see if the app has detected any routing errors.
myApp.run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
    if (error == 'AUTH_REQUIRED') {
      $rootScope.message = 'Sorry, you must log in to access that page';
      $location.path('/login');
    }
  });
}]);

// Next we set the routes configuration.
myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    // For the login page.
    when('/login', {
      templateUrl: 'views/login.html',
      controller: 'RegistrationController'
    }).
    // For the register page.
    when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegistrationController'
    }).
    // For the success page.
    when('/success', {
      templateUrl: 'views/success.html',
      controller: 'SuccessController',
      // Resolve user authenticated before accessing this route.
      resolve: {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        }
      }
    }).
    // If not authenticated send user to login page.
    otherwise({
      redirectTo: '/login'
    });
}]);
