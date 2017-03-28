(function(module){

  var chartController = function(){

    var ctrl = this;
var _data ={
    "chart": {
        "caption": "Comparison of Quarterly Revenue",
        "xAxisname": "Quarter",
        "yAxisName": "Revenues (In USD)",
        "numberPrefix": "$",
        "plotFillAlpha": "80",
        "paletteColors": "#0075c2,#1aaf5d",
        "baseFontColor": "#333333",
        "baseFont": "Helvetica Neue,Arial",
        "captionFontSize": "14",
        "subcaptionFontSize": "14",
        "subcaptionFontBold": "0",
        "showBorder": "0",
        "bgColor": "#ffffff",
        "showShadow": "0",
        "canvasBgColor": "#ffffff",
        "canvasBorderAlpha": "0",
        "divlineAlpha": "100",
        "divlineColor": "#999999",
        "divlineThickness": "1",
        "divLineDashed": "1",
        "divLineDashLen": "1",
        "usePlotGradientColor": "0",
        "showplotborder": "0",
        "valueFontColor": "#ffffff",
        "placeValuesInside": "1",
        "showHoverEffect": "1",
        "rotateValues": "1",
        "showXAxisLine": "1",
        "xAxisLineThickness": "1",
        "xAxisLineColor": "#999999",
        "showAlternateHGridColor": "0",
        "legendBgAlpha": "0",
        "legendBorderAlpha": "0",
        "legendShadow": "0",
        "legendItemFontSize": "10",
        "legendItemFontColor": "#666666"
    },
    "categories": [
        {
            "category": [
                {
                    "label": "Q1"
                },
                {
                    "label": "Q2"
                },
                {
                    "label": "Q3"
                },
                {
                    "label": "Q4"
                }
            ]
        }
    ],
    "dataset": [
        {
            "seriesname": "Previous Year",
            "data": [
                {
                    "value": "10000"
                },
                {
                    "value": "11500"
                },
                {
                    "value": "12500"
                },
                {
                    "value": "15000"
                }
            ]
        },
        {
            "seriesname": "Current Year",
            "data": [
                {
                    "value": "25400"
                },
                {
                    "value": "29800"
                },
                {
                    "value": "21800"
                },
                {
                    "value": "26800"
                }
            ]
        },
        {
            "seriesname": "Future Year",
            "data": [
                {
                    "value": "25400"
                },
                {
                    "value": "29800"
                },
                {
                    "value": "21800"
                },
                {
                    "value": "26800"
                }
            ]
        }
    ]
};
    ctrl.revenueChart = new FusionCharts({
        id: 'revenue-chart',
        type: 'mscolumn2d',
        renderAt: 'chart-container',
        dataFormat: 'json',
        width: "100%",
        dataSource: _data
    });
      ctrl.revenueChart.render();
  };

  module.controller('chartController', chartController);

}(angular.module('public')));