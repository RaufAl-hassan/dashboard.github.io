const yearLabel = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const yearData = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];

const daysLabel = ["mon", "tues", "wens", "thurs", "fri", "sat", "sun"];
const daysData = [10, 20, 30, 40, 50, 60, 5];

const month = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
];
const monthData = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
];

const years = [2015, 2016, 2017, 2018, 2019, 2020];
const yearsData = [1, 2, 3, 4, 5, 6];

// charts bg
const daysBackgroundColor = [
  "lightblue",
  "royalblue",
  "steelblue",
  "blue",
  "purple",
  "pink",
  "lightpink",
];
const yearsBackgroundColor = [
  ...daysBackgroundColor,
  "violet",
  "indigo",
  "gold",
  "orange",
  "yellow",
  "lightyellow",
  "black",
  "#333",
  "#1e1e1e",
  "#445",
  "#753762",
  "#972",
  "#421",
  "#142",
  "#000",
  "#777",
  "#888",
  "#999",
  "#222",
  "#444",
  "red",
  "#535",
  "#135",
  "#555",
];
const yearBackgroundColor = [yearsBackgroundColor];
const monthBackgroundColor = [...yearsBackgroundColor];

let orderChartUI = document.querySelector("#orders-chart").getContext("2d");
let vistorsChartUI = document.querySelector("#visitors-chart").getContext("2d");
const seasonsUI = document.querySelectorAll(".season");
const chartsTypeUI = document.querySelectorAll(".chart-type");

// global data
let chartTypes = [],
  seasons = [];

seasonsUI.forEach((season) => {
  seasons.push(season);
});
chartsTypeUI.forEach((chart) => {
  chartTypes.push(chart);
});

// chart config
const data = (labels, label, data, backgroundColor) => {
  return {
    labels,
    datasets: [
      {
        label,
        data,
        backgroundColor,
        borderWidth: 1,
      },
    ],
  };
};

const options = () => {
  return {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      XAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
};

//  create chart obj

const newChart = (chartUI, type, data, options) => {
  return new Chart(chartUI, {
    type,
    data,
    options,
  });
};

// display chart base on season
const getSeasonData = (season) => {
  switch (season) {
    case "day":
      return;
    default:
      return;
  }
};

//instantiate chart obj
let ordersChart = newChart(
  orderChartUI,
  chartTypes[0].value,
  data(daysLabel, "orders", daysData, daysBackgroundColor),
  options
);
let visitorChart = newChart(
  vistorsChartUI,
  chartTypes[1].value,
  data(daysLabel, "visitors", daysData, daysBackgroundColor),
  options
);

// handle charts
seasonsUI.forEach((season) => {
  season.addEventListener("change", (e) => {
    if (e.target.closest(".orders-chart")) {
      return;
    }

    if (e.target.closest(".visitors-chart")) {
      return;
    }
  });
});
chartsTypeUI.forEach((chartType) => {
  chartType.addEventListener("change", (e) => {
    if (e.target.closest(".orders-chart")) {
      ordersChart.destroy();

      ordersChart = newChart(
        orderChartUI,
        e.target.value,
        data(daysLabel, "orders", daysData, daysBackgroundColor),
        options()
      );
      return;
    }
    if (e.target.closest(".visitors-chart")) {
      visitorChart.destroy();

      visitorChart = newChart(
        vistorsChartUI,
        e.target.value,
        data(daysLabel, "visitors", daysData, daysBackgroundColor),
        options()
      );
      return;
    }
  });
});