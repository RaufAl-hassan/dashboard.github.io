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

const monthLabel = [
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

const yearsLabel = [2015, 2016, 2017, 2018, 2019, 2020];
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
];
const yearBackgroundColor = [...yearsBackgroundColor];
const monthBackgroundColor = [
  ...yearsBackgroundColor,
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
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
};

//  create chart objz
const newChart = (chartUI, type, data, options) => {
  return new Chart(chartUI, {
    type,
    data,
    options,
  });
};

// display chart base on season
const changeSeasonChart = (season, chartUI, type, datus, options) => {
  switch (season) {
    case "day":
      return newChart(
        chartUI,
        type,
        data(daysLabel, datus.label, daysData, daysBackgroundColor),
        options
      );
    case "year":
      return newChart(
        chartUI,
        type,
        data(yearLabel, datus.label, yearData, yearBackgroundColor),
        options
      );
    case "years":
      return newChart(
        chartUI,
        type,
        data(yearsLabel, datus.label, yearsData, yearsBackgroundColor),
        options
      );
    case "month":
      return newChart(
        chartUI,
        type,
        data(monthLabel, datus.label, monthData, monthBackgroundColor),
        options
      );
    default:
      return newChart(
        chartUI,
        type,
        data(daysLabel, datus.label, daysData, daysBackgroundColor),
        options
      );
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

// handle changes when chartType or season changes
const manipulateChart = (e) => {
  // apply on orders chart
  if (e.target.closest(".orders-chart")) {
    // destroy chart
    ordersChart.destroy();

    // redraw chart
    ordersChart = changeSeasonChart(
      seasons[0].value,
      orderChartUI,
      chartTypes[0].value,
      { label: "orders" },
      options
    );
    return;
  }
  // apply on visitors chart
  if (e.target.closest(".visitors-chart")) {
    visitorChart.destroy();

    visitorChart = changeSeasonChart(
      seasons[1].value,
      vistorsChartUI,
      chartTypes[1].value,
      { label: "visitors" },
      options
    );
    return;
  }
};

chartsTypeUI.forEach((chartType) => {
  chartType.addEventListener("change", (e) => {
    manipulateChart(e);
  });
});

seasonsUI.forEach((season) => {
  season.addEventListener("change", (e) => {
    manipulateChart(e);
  });
});
