(function(module) {

    var publicController = function($log,  $http, apiService, localStorage) {
      var ctrl = this;
      ctrl.reports =[];
      ctrl.showDiv = true;
      ctrl.dataSourceTypes = {"json" : "Rest API"};
      ctrl.formReport ={ dataSourceType :"json",
                      url :"",
                     title : ""};

    ctrl.generateReport = function(){
      var last =  _.last(ctrl.reports);
      var newReport = {};
      if(_.isUndefined(last) === true)
      {
         newReport = { id : 1,
                          form : angular.copy(ctrl.formReport)};
      }
      else {
        newReport  ={ id : last.id +1,
                      form :angular.copy(ctrl.formReport)
                    };
      }
       $log.debug("New Report", newReport);
      ctrl.reports.push(newReport);
      ctrl.showDiv = false;

    }

    ctrl.removeReport = function(id){
       $log.debug("Remove report id", id);
      for(var i=0; i< ctrl.reports.length; i++)
      {
        if(ctrl.reports[i].id == id)
        {
          ctrl.reports.splice(i, 1);
          break;
        }
      }
    }



    };
    publicController.$inject = ['$log', '$http', 'apiService', 'localStorage'];
    module.controller('publicController', publicController);

}(angular.module('public')));
