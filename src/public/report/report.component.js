(function(module) {




    function reportController($log, apiService, localStorage) {
        var ctrl = this;



          ctrl.$onInit = function(){
           $log.debug( ctrl);
           ctrl.showDiv = true;
          ctrl.revenueChart = null;
          ctrl.isDisabled = true;
          ctrl.columns = [];
          ctrl.chartTypes = {
              "area2d": "Area Chart",
              "bar2d": "Bar Chart",
              "bar3d": "Bar 3D Chart",
              "column3d": "Column 3D Chart",
              "line": "Line Chart"
          };
          ctrl.chartType = "column3d";
          ctrl.error ="";
          apiService.getData(ctrl.reportDetails.form.url).then(function(data)
          {

            var columns = apiService.getColumns(ctrl.reportDetails.form.url)
                            .then(function(response){
                                  ctrl.columns = response;
                                  ctrl.isDisabled = false;
                              })
                              .catch(function(error){
                                ctrl.error = "Error Fetching data columns " +  error.statusText;
                                 $log.debug(error);
                              });

            //loadChart(data, columns);
          })
          .catch(function(error){
            ctrl.error = "Error Fetching data " +  error.statusText;
             $log.debug(error);
          });
        }




        var loadChart = function(data, columns) {
            var _data = [];
            var selectedCols = [];
            angular.forEach(columns, function(col) {

                if (col.selected === true)
                    selectedCols.push(col.name);
            });
            angular.forEach(data, function(item) {
                _data.push({
                    label: item[selectedCols[0]],
                    value: item[selectedCols[1]]
                });
            });
             $log.debug("Selected columns", selectedCols);
             $log.debug("Selected data", _data);
            if (ctrl.revenueChart === null) {
               $log.debug("Creating new Chart");
                ctrl.revenueChart = new FusionCharts({
                    id: 'revenue-chart_' + ctrl.num,
                    type: ctrl.chartType,
                    renderAt: 'chart-container_' + ctrl.num,
                    dataFormat: 'json',
                    width: "100%",
                    dataSource: {
                        chart: {
                            caption: ctrl.reportDetails.form.title,
                            subCaption: "",
                            theme: "fint"
                        },
                        data: _data
                    }
                });
            } else {
               $log.debug("Updating Chart");
                var chartData = {
                    chart: {
                        caption: "Top 5 stores in last month by revenue",
                        subCaption: "Harry's SuperMart",
                        theme: "fint"
                    },
                    data: _data
                };
                ctrl.revenueChart.setChartData(chartData, "json");
            }
            ctrl.revenueChart.chartType(ctrl.chartType);
            ctrl.revenueChart.render();
        }


        //EVENTS
        ctrl.changeChartType = function() {
             $log.debug("Chart Type", ctrl.chartType);
            ctrl.revenueChart.chartType(ctrl.chartType);
            ctrl.revenueChart.render();
             ctrl.showDiv = false;
        }
        ctrl.update = function() {
             $log.debug("update here");
            apiService.getData(ctrl.reportDetails.form.url)
                      .then(function(data){
                              loadChart( data, ctrl.columns);
                      }).catch(function(error){
                        ctrl.error = error;
                      });
            ctrl.showDiv = false;

        };



    };

    reportController.$inject = ['$log','apiService', 'localStorage'];
    module.component("report", {
        templateUrl: "src/public/report/report.template.html",
        controller: reportController,
        bindings: {
            num: '<',
            reportDetails : '<',
            remove :'&'
        }
    });
}(angular.module('public')));
