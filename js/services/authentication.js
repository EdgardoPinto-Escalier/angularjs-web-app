myApp.factory('Authentication',
  ['$rootScope', '$location', '$firebaseObject', '$firebaseAuth',
  function($rootScope, $location, $firebaseObject, $firebaseAuth) {

  // We start by declaring some variables.
  var ref = firebase.database().ref();
  var dbAuth = $firebaseAuth();
  var appObject;

  dbAuth.$onAuthStateChanged(function(authUser) {
    if(authUser) {
      var userRef = ref.child('users').child(authUser.uid);
      var userObj = $firebaseObject(userRef);
      $rootScope.currentUser = userObj;
    } else {
      $rootScope.currentUser = '';
    }
  });

  appObject = {
    login: function(user) {
      dbAuth.$signInWithEmailAndPassword(
        user.email,
        user.password
      ).then(function(user) {
        $location.path('/success');
      }).catch(function(error) {
        $rootScope.message = error.message;
      });
    },

    // Logout function, here we tell the 
    // authentication method to use the $signOut() function. 
    logout: function() {
      return dbAuth.$signOut();
    },

    // function that will return the auth object with the $requireSignIn() method.
    // Here basically it'll require authentication.
    requireAuth: function() {
      return dbAuth.$requireSignIn();
    },

    // register function, here we create new users in the database.
    register: function(user) {
      dbAuth.$createUserWithEmailAndPassword(
        user.email,
        user.password
      ).then(function(regUser) {
        var regRef = ref.child('users')
          .child(regUser.uid).set({
            date: firebase.database.ServerValue.TIMESTAMP,
            regUser: regUser.uid,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
          });
          appObject.login(user);
      }).catch(function(error) {
        $rootScope.message = error.message;
      });
    }
  };

  // Finally we return the appObject.
  return appObject;
}]);