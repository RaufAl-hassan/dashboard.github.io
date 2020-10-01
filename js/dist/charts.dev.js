"use strict";

var orderChartUI = document.querySelectorAll("#orders-chart");
var seasonUI = document.querySelector("#season");
var months = ["Jan", "Feb", "March", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var monthsData = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];
var days = ["mon", "tues", "wens", "thurs", "fri", "sat", "sun"];
var daysData = [10, 20, 30, 40, 50, 60, 70];
var daysCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
var daysCountdata = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
var years = [2015, 2016, 2017, 2018, 2019, 2020];
var options = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      },
      gridLines: {
        drawOnChartArea: false
      }
    }],
    xAxes: [{
      gridLines: {
        drawOnChartArea: false
      }
    }]
  }
};
var backgroundColor = ["steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue"];

var renderChart = function renderChart(labels, data, label) {
  return {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: data,
        backgroundColor: backgroundColor,
        borderWidth: 1
      }]
    },
    options: options
  };
}; // orders chart


var ordersChart;
ordersChart = new Chart(orderChartUI, renderChart(days, daysData, "order")); // handle chart

seasonUI.addEventListener("change", function (e) {
  var type = e.target.value;

  switch (type) {
    case "days":
      ordersChart.reset();
      ordersChart = new Chart(orderChartUI, renderChart(days, daysData, "order"));
      break;

    case "month":
      ordersChart.reset();
      ordersChart = new Chart(orderChartUI, renderChart(daysCount, daysData, "order"));
      break;

    case "year":
      ordersChart.reset();
      ordersChart = new Chart(orderChartUI, renderChart(months, monthsData, "order"));
      break;

    case "years":
      ordersChart.reset();
      ordersChart = new Chart(orderChartUI, renderChart(years, monthsData, "order"));
      break;

    default:
      ordersChart.reset();
      ordersChart = new Chart(orderChartUI, renderChart(days, daysData, "order"));
      break;
  }
});