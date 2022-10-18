import { Chart } from "frappe-charts/dist/frappe-charts.min.esm";
const button = document.getElementById("submit-data");
button.addEventListener("click", async () => {
  const input = document.getElementById("input-area").value;
  console.log(input);
  let alueKoodi = await getMun();
  console.log(alueKoodi);
  let nimi = alueKoodi.variables[1].valueTexts;
  let koodi = alueKoodi.variables[1].values;
  let vaihto = nimi.indexOf(input);
  let uusiAlue = alueKoodi.variables[1].values[vaihto];
  if (!uusiAlue) {
    return;
  }
  jsonQuery = {
    query: [
      {
        code: "Vuosi",
        selection: {
          filter: "item",
          values: [
            "2000",
            "2001",
            "2002",
            "2003",
            "2004",
            "2005",
            "2006",
            "2007",
            "2008",
            "2009",
            "2010",
            "2011",
            "2012",
            "2013",
            "2014",
            "2015",
            "2016",
            "2017",
            "2018",
            "2019",
            "2020",
            "2021"
          ]
        }
      },
      {
        code: "Alue",
        selection: {
          filter: "item",
          values: [uusiAlue]
        }
      },
      {
        code: "Tiedot",
        selection: {
          filter: "item",
          values: ["vaesto"]
        }
      }
    ],
    response: {
      format: "json-stat2"
    }
  };

  buildChart();
});
const getMun = async () => {
  let url = new URL(
    "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px"
  );
  const data = await fetch(url);
  if (!data.ok) {
    return;
  }
  const data2 = await data.json();
  return data2;
};

let jsonQuery = {
  query: [
    {
      code: "Vuosi",
      selection: {
        filter: "item",
        values: [
          "2000",
          "2001",
          "2002",
          "2003",
          "2004",
          "2005",
          "2006",
          "2007",
          "2008",
          "2009",
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021"
        ]
      }
    },
    {
      code: "Alue",
      selection: {
        filter: "item",
        values: ["SSS"]
      }
    },
    {
      code: "Tiedot",
      selection: {
        filter: "item",
        values: ["vaesto"]
      }
    }
  ],
  response: {
    format: "json-stat2"
  }
};
const getData = async () => {
  let url = new URL(
    "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px"
  );
  const data = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(jsonQuery)
  });
  if (!data.ok) {
    return;
  }
  const data2 = await data.json();
  return data2;
};

const buildChart = async () => {
  const data = await getData();
  const vakiluku = Object.values(data.value);
  const vuosi = Object.values(data.dimension.Vuosi.category.label);
  const chartData = {
    labels: vuosi,
    datasets: [
      {
        values: vakiluku
      }
    ]
  };
  const chart = new Chart("#chart", {
    title: "Population",
    data: chartData,
    type: "line",
    height: 450,
    colors: ["#eb5146"]
  });
};
buildChart();
