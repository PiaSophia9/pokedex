function renderChart() {
  const ctx = document.getElementById("myChart");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: statNames,
      datasets: [
        {
          label: "Pokemon stats",
          data: statValues,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }, // with this you can use in your css-file how big the chart should be.
      legend: {
        display: false,
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem) {
            console.log(tooltipItem);
            return tooltipItem.yLabel;
          },
        },
      }, // should remove lable, but does not
      indexAxis: "y",
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  const config = {
    type: "bar",
    options: {
      indexAxis: "y",
    },
  };
}
