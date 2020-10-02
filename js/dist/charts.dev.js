"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var yearLabel = ["Jan", "Feb", "March", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var yearData = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];
var daysLabel = ["mon", "tues", "wens", "thurs", "fri", "sat", "sun"];
var daysData = [10, 20, 30, 40, 50, 60, 5];
var monthLabel = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
var monthData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
var yearsLabel = [2015, 2016, 2017, 2018, 2019, 2020];
var yearsData = [1, 2, 3, 4, 5, 6]; // charts bg

var daysBackgroundColor = ["lightblue", "royalblue", "steelblue", "blue", "purple", "pink", "lightpink"];
var yearsBackgroundColor = [].concat(daysBackgroundColor, ["violet", "indigo", "gold", "orange", "yellow"]);

var yearBackgroundColor = _toConsumableArray(yearsBackgroundColor);

var monthBackgroundColor = [].concat(_toConsumableArray(yearsBackgroundColor), ["lightyellow", "black", "#333", "#1e1e1e", "#445", "#753762", "#972", "#421", "#142", "#000", "#777", "#888", "#999", "#222", "#444", "red", "#535", "#135", "#555"]);
var orderChartUI = document.querySelector("#orders-chart").getContext("2d");
var vistorsChartUI = document.querySelector("#visitors-chart").getContext("2d");
var seasonsUI = document.querySelectorAll(".season");
var chartsTypeUI = document.querySelectorAll(".chart-type"); // global data

var chartTypes = [],
    seasons = [];
seasonsUI.forEach(function (season) {
  seasons.push(season);
});
chartsTypeUI.forEach(function (chart) {
  chartTypes.push(chart);
}); // chart config

var data = function data(labels, label, _data, backgroundColor) {
  return {
    labels: labels,
    datasets: [{
      label: label,
      data: _data,
      backgroundColor: backgroundColor,
      borderWidth: 1
    }]
  };
};

var options = function options() {
  return {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
      XAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
}; //  create chart objz


var newChart = function newChart(chartUI, type, data, options) {
  return new Chart(chartUI, {
    type: type,
    data: data,
    options: options
  });
}; // display chart base on season


var changeSeasonChart = function changeSeasonChart(season, chartUI, type, datus, options) {
  switch (season) {
    case "day":
      return newChart(chartUI, type, data(daysLabel, datus.label, daysData, daysBackgroundColor), options);

    case "year":
      return newChart(chartUI, type, data(yearLabel, datus.label, yearData, yearBackgroundColor), options);

    case "years":
      return newChart(chartUI, type, data(yearsLabel, datus.label, yearsData, yearsBackgroundColor), options);

    case "month":
      return newChart(chartUI, type, data(monthLabel, datus.label, monthData, monthBackgroundColor), options);

    default:
      return newChart(chartUI, type, data(daysLabel, datus.label, daysData, daysBackgroundColor), options);
  }
}; //instantiate chart obj


var ordersChart = newChart(orderChartUI, chartTypes[0].value, data(daysLabel, "orders", daysData, daysBackgroundColor), options);
var visitorChart = newChart(vistorsChartUI, chartTypes[1].value, data(daysLabel, "visitors", daysData, daysBackgroundColor), options); // handle changes when chartType or season changes

var manipulateChart = function manipulateChart(e) {
  // apply on orders chart
  if (e.target.closest(".orders-chart")) {
    // destroy chart
    ordersChart.destroy(); // redraw chart

    ordersChart = changeSeasonChart(seasons[0].value, orderChartUI, chartTypes[0].value, {
      label: "orders"
    }, options);
    return;
  } // apply on visitors chart


  if (e.target.closest(".visitors-chart")) {
    visitorChart.destroy();
    visitorChart = changeSeasonChart(seasons[1].value, vistorsChartUI, chartTypes[1].value, {
      label: "visitors"
    }, options);
    return;
  }
};

chartsTypeUI.forEach(function (chartType) {
  chartType.addEventListener("change", function (e) {
    manipulateChart(e);
  });
});
seasonsUI.forEach(function (season) {
  season.addEventListener("change", function (e) {
    manipulateChart(e);
  });
});