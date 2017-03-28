(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider.state("home", {
                           url:"/",
                           templateUrl:"src/public/public.html"
     })
     .state("chart", { url:"/chart",
   templateUrl :"src/public/chart.html",
  controller :"chartController"});
}
})();
