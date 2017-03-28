(function(module) {

    var apiService = function($http, $q, $log, localStorage) {
        var getData = function(url) {
            var localData = localStorage.get(url + "_data");
            if (localData == null) {
                 $log.debug("Fetching Data from Server");
                return $http.get(url)
                    .then(function(response) {
                         $log.debug("Apiservice service reponse", response);
                        var columns = generateColumns(response.data.responseTable);
                        localStorage.add(url + "_columns", columns);
                        localStorage.add(url + "_data", response.data.responseTable)
                        return response.data.responseTable;
                    });
            } else {
                 $log.debug("Fetching Data from Cache");
                return $q.resolve(localData);
                //var deferred = $q;
                //deferred.resolve(localData);
                //return deferred.promise;
            }

        }

        var generateColumns = function(table) {
            var columns = [];
            if (table.length > 0) {
                var item = table[0];
                angular.forEach(item, function(value, key) {
                    columns.push({
                        name: key,
                        selected: false
                    });
                });
            }
            return columns;
        }
        var getColumns = function(url) {
            var columns = localStorage.get(url + "_columns");
            if (columns == null) {
                 $log.debug("Fetching Columns from Server");
                return $http.get(url)
                    .then(function(response) {
                        var columns = generateColumns(response.data.responseTable);
                        localStorage.add(url + "_columns", columns);
                        return columns;
                    });

            } else {
                 $log.debug("Fetching Columns from Cache");
                return $q.resolve(columns);
                //var deferred = $q;
                //deferred.resolve(columns);
                //return deferred.promise;
            }
        }

        return {
            getData: getData,
            getColumns: getColumns
        }
    };

    apiService.$inject = ['$http', '$q','$log', 'localStorage'];
    module.service("apiService", apiService);

}(angular.module('public')));
