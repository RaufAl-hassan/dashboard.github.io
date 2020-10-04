// generate random data for chart
const generateData = (dataLength, max = 1000) => {
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
const daysDataforUsers = [...generateData(7)];
const daysDataforSales = [...generateData(7)];
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
const yearDataForVisitors = [...generateData(12)];
const yearDataForOrders = [...generateData(12)];
const yearDataForUsers = [...generateData(12)];
const yearDataForSales = [...generateData(12)];
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
const monthDataForUsers = [...generateData(31)];
const monthDataForSales = [...generateData(31)];
const monthBackgroundColor = [...generateBackgroundColor(31)];

const yearsLabel = [2015, 2016, 2017, 2018, 2019, 2020];
const yearsDataForOrders = [...generateData(6)];
const yearsDataForVisitors = [...generateData(6)];
const yearsDataForUsers = [...generateData(6)];
const yearsDataForSales = [...generateData(6)];
const yearsBackgroundColor = [...generateBackgroundColor(6)];

const ordersChartUI = document.querySelector("#orders-chart").getContext("2d");
const vistorsChartUI = document
  .querySelector("#visitors-chart")
  .getContext("2d");
const usersChartUI = document.querySelector("#users-chart").getContext("2d");
const salesChartUI = document.querySelector("#sales-chart").getContext("2d");
const seasonsUI = document.querySelectorAll(".season");
const chartsTypeUI = document.querySelectorAll(".chart-type");
const changeAllChartType = document.querySelector(".change-all-chart-type");
const changeAllChartSeason = document.querySelector(".change-all-chart-season");

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
        backgroundColor: backgroundColor,
        borderWidth: 1,
        borderColor: "#111",
        borderHover: 0.5,
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

// determine chart color
const chartBackground = (
  type,
  backgroundColor,
  defaultBackground = "lightblue"
) => {
  if (type === "bar" || type === "horizontalBar" || type === "line")
    return defaultBackground;

  return backgroundColor;
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
const changeSeasonChart = (season, chartUI, type, datus, options) => {
  // display data on charts section
  const displayDataBaseOnSection = (season, datus) => {
    // display data
    const renderDataBaseOnSeason = (data) => {
      if (datus.label === "orders") return data;
      if (datus.label === "visitors") return data;
      if (datus.label === "users") return data;
      if (datus.label === "sales") return data;
    };

    switch (season) {
      case "days":
        return renderDataBaseOnSeason(daysDataForOrders);
      case "year":
        return renderDataBaseOnSeason(yearDataForVisitors);
      case "month":
        return renderDataBaseOnSeason(monthDataForVisitors);
      case "years":
        return renderDataBaseOnSeason(yearsDataForOrders);

      default:
        return undefined;
    }
  };

  switch (season) {
    case "days":
      return newChart(
        chartUI,
        type,
        data(
          daysLabel,
          datus.label,
          displayDataBaseOnSection(season, datus),
          chartBackground(type, daysBackgroundColor)
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
          chartBackground(type, yearBackgroundColor)
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
          chartBackground(type, yearsBackgroundColor)
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
          chartBackground(type, monthBackgroundColor)
        ),
        options
      );
    default:
      return null;
  }
};

//instantiate chart obj
let ordersChart, visitorsChart, usersChart, salesChart;

const initChart = (
  type,
  label = {
    days: daysLabel,
    month: monthLabel,
    year: yearLabel,
    years: yearsLabel,
  },
  bg = {
    days: daysBackgroundColor,
    month: monthBackgroundColor,
    year: yearBackgroundColor,
    years: yearsBackgroundColor,
  },
  labelData = {
    orders: {
      days: daysDataForOrders,
      month: monthDataForOrders,
      year: yearDataForOrders,
      years: yearsDataForOrders,
    },
    visitors: {
      days: daysDataforVistors,
      month: monthDataForVisitors,
      year: yearDataForVisitors,
      years: yearsDataForVisitors,
    },
    users: {
      days: daysDataforUsers,
      month: monthDataForVisitors,
      year: yearDataForVisitors,
      years: yearsDataForVisitors,
    },
    sales: {
      days: daysDataforSales,
      month: monthDataForSales,
      year: yearDataForSales,
      years: yearsDataForSales,
    },
  },
  labelDataSelector = changeAllChartSeason.value
) => {
  ordersChart = newChart(
    ordersChartUI,
    type ? type : chartTypes[0].value,
    data(
      label[labelDataSelector],
      "orders",
      labelData.orders[labelDataSelector],
      chartBackground(type ? type : chartTypes[0].value, bg[labelDataSelector])
    ),
    options
  );
  visitorsChart = newChart(
    vistorsChartUI,
    type || chartTypes[1].value,
    data(
      label[labelDataSelector],
      "visitors",
      labelData.visitors[labelDataSelector],
      chartBackground(type ? type : chartTypes[1].value, bg[labelDataSelector])
    ),
    options
  );
  usersChart = newChart(
    usersChartUI,
    type ? type : chartTypes[2].value,
    data(
      label[labelDataSelector],
      "Users",
      labelData.users[labelDataSelector],
      chartBackground(type ? type : chartTypes[2].value, bg[labelDataSelector])
    ),
    options
  );
  salesChart = newChart(
    salesChartUI,
    type ? type : chartTypes[3].value,
    data(
      label[labelDataSelector],
      "sales",
      labelData.sales[labelDataSelector],
      chartBackground(type ? type : chartTypes[3].value, bg[labelDataSelector])
    ),
    options
  );
};

initChart();

// hanlde chage all chart type
changeAllChartType.addEventListener("change", (e) => {
  // destroy all chart
  [ordersChart, visitorsChart, usersChart, salesChart].forEach((chart) => {
    chart.destroy();
  });
  initChart(e.target.value);
});
// hanlde change all chart season
changeAllChartSeason.addEventListener("change", (e) => {
  // destroy all chart
  [ordersChart, visitorsChart, usersChart, salesChart].forEach((chart) => {
    chart.destroy();
  });
  initChart(changeAllChartType.value);
});

// handle changes when chartType or season changes
const manipulateChart = (e) => {
  if (e.target.closest(".orders-chart")) {
    ordersChart.destroy();

    ordersChart = changeSeasonChart(
      seasons[0].value,
      ordersChartUI,
      chartTypes[0].value,
      { label: "orders" },
      options
    );
    return;
  }
  // apply on visitors chart
  if (e.target.closest(".visitors-chart")) {
    visitorsChart.destroy();

    visitorsChart = changeSeasonChart(
      seasons[1].value,
      vistorsChartUI,
      chartTypes[1].value,
      { label: "visitors" },
      options
    );
    return;
  }
  // apply on users chart
  if (e.target.closest(".users-chart")) {
    usersChart.destroy();

    usersChart = changeSeasonChart(
      seasons[2].value,
      usersChartUI,
      chartTypes[2].value,
      { label: "users" },
      options
    );
    return;
  }
  // apply on sales chart
  if (e.target.closest(".sales-chart")) {
    salesChart.destroy();

    salesChart = changeSeasonChart(
      seasons[3].value,
      salesChartUI,
      chartTypes[3].value,
      { label: "sales" },
      options
    );
    return;
  }
};

//
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
