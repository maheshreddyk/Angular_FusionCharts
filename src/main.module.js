(function() {
"use strict";

/**
 * Main module that includes the public module as a dependency
 */
angular.module('app', ['public'])
.config(config);



config.$inject = ['$urlRouterProvider', '$logProvider'];
function config($urlRouterProvider, $logProvider) {
  // If user goes to a path that doesn't exist, redirect to public root
  $urlRouterProvider.otherwise('/');
   $logProvider.debugEnabled(true);
}

})();
