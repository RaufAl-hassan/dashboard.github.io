// generate random data for chart
const generateData = (dataLength, max = 100) => {
  const data = [];
  for (let i = 0; i < dataLength; i++) {
    data.push(Math.floor(Math.random() * max));
  }
  return data;
};

// generate random background colors
const generateBackgroundColor = (dataLength) => {
  const data = [];
  for (let i = 0; i < dataLength; i++) {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    data.push(`rgb(${r}, ${g}, ${b})`);
  }
  return data;
};

const daysLabel = ["mon", "tues", "wens", "thurs", "fri", "sat", "sun"];
const daysDataForOrders = [...generateData(7)];
const daysDataforVistors = [...generateData(7)];
const daysBackgroundColor = [...generateBackgroundColor(7)];

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
const yearDataForVistors = [...generateData(12)];
const yearDataForOrders = [...generateData(12)];
const yearBackgroundColor = [...generateBackgroundColor(12)];

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
const monthDataForOrders = [...generateData(31)];
const monthDataForVisitors = [...generateData(31)];
const monthBackgroundColor = [...generateBackgroundColor(31)];

const yearsLabel = [2015, 2016, 2017, 2018, 2019, 2020];
const yearsDataForOrders = [...generateData(6)];
const yearsDataForVisitors = [...generateData(6)];
const yearsBackgroundColor = [...generateBackgroundColor(6)];

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
  // display data on charts section
  const displayDataBaseOnSection = (season, datus) => {
    switch (season) {
      case "days":
        if (datus.label === "orders") return daysDataForOrders;
        if (datus.label === "visitors") return daysDataforVistors;
      case "year":
        if (datus.label === "orders") return yearDataForOrders;
        if (datus.label === "visitors") return yearDataForVistors;
      case "month":
        if (datus.label === "orders") return monthDataForOrders;
        if (datus.label === "visitors") return monthDataForVisitors;
      case "years":
        if (datus.label === "orders") return yearsDataForOrders;
        if (datus.label === "visitors") return yearsDataForVisitors;

      default:
        return;
    }
  };

  switch (season) {
    case "day":
      return newChart(
        chartUI,
        type,
        data(
          daysLabel,
          datus.label,
          displayDataBaseOnSection(season, datus),
          daysBackgroundColor
        ),
        options
      );
    case "year":
      return newChart(
        chartUI,
        type,
        data(
          yearLabel,
          datus.label,
          displayDataBaseOnSection(season, datus),
          yearBackgroundColor
        ),
        options
      );
    case "years":
      return newChart(
        chartUI,
        type,
        data(
          yearsLabel,
          datus.label,
          displayDataBaseOnSection(season, datus),
          yearsBackgroundColor
        ),
        options
      );
    case "month":
      return newChart(
        chartUI,
        type,
        data(
          monthLabel,
          datus.label,
          displayDataBaseOnSection(season, datus),
          monthBackgroundColor
        ),
        options
      );
    default:
      return newChart(
        chartUI,
        type,
        data(
          daysLabel,
          datus.label,
          displayDataBaseOnSection(season, datus),
          daysBackgroundColor
        ),
        options
      );
  }
};

//instantiate chart obj
let ordersChart = newChart(
  orderChartUI,
  chartTypes[0].value,
  data(daysLabel, "orders", daysDataForOrders, daysBackgroundColor),
  options
);
let visitorChart = newChart(
  vistorsChartUI,
  chartTypes[1].value,
  data(daysLabel, "visitors", daysDataforVistors, daysBackgroundColor),
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
