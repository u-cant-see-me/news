import { forecast } from "./fetchWeatherInfo";


let data = null;

export async function graphAll(elementId,unit = "c") {
    const templist = [];
    const datelist = [];
    if(!data){
        data = await forecast();
    }

    data.list.forEach(element => {
        const time = parseInt(element.dt_txt.split(" ")[1].split(":")[0]);

        templist.push((element.main.temp - 273.15).toFixed(1));
        datelist.push(
            time < 12
                ? time === 0
                    ? "12 am"
                    : `${time} am`
                : `${time - 12 || 12} pm`
        );
    });
    new Chart(elementId, {
        type: 'line',
        data: {
            labels: datelist,
            datasets: [{
                tension: 0.1,
                pointRadius: 2,
                data: templist,
                borderColor: function(context) {
                    const chart = context.chart;
                    const {ctx, chartArea} = chart;
            
                    if (!chartArea) {
                      // This case happens on initial chart load
                      return;
                    }
                    return getGradient(ctx, chartArea);
                  },
                borderWidth: 3,                
                hoverBorderColor: 'gold',
                hoverBorderWidth: 7,
            }]
        },
        options: {
            hover: {
                mode: 'nearest',
                intersect: true,
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'rgb(255, 255, 255)',
                        callback: function (value) {
                            return value + "°C";
                        },
                    },
                },
                x: {
                    ticks: {
                        color: 'rgb(218, 218, 218)',
                        maxRotation: 0,
                        minRotation: 0
                    },
                },
                responsive: false,
                maintainAspectRatio: false,
            },
            plugins: {
                legend: {
                    display: false,
                }
            }
        }
    });
}

export async function graphTemp(elementId) {
    const templist = [];
    const datelist = [];
    if(!data){
        data = await forecast();
    }

    data.list.slice(0, 12).forEach(element => {
        const time = parseInt(element.dt_txt.split(" ")[1].split(":")[0]);
        templist.push((element.main.temp - 273.15).toFixed(1));
        datelist.push(
            time < 12
                ? time === 0
                    ? "12 am"
                    : `${time} am`
                : `${time - 12 || 12} pm`
        );
    });

    const ctx = elementId.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);

    addTempGradient(gradient, data, templist.length - 1);
   
    new Chart(elementId, {
        type: 'line',
        data: {
            labels: datelist,
            datasets: [{
                tension: 0.1,
                pointRadius: 2,
                data: templist,
                borderColor:gradient,
                borderWidth: 3,
                backgroundColor: 'rgba(0, 0, 0, 0)',
                hoverBorderColor: 'gold',
                hoverBorderWidth: 7,
            }]
        },
        options: {
            hover: {
                mode: 'nearest',
                intersect: true,
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'rgb(184, 184, 184)',
                    }
                },
                x: {
                    ticks: {
                        color: 'rgb(185, 185, 185)',
                        callback: function (value, index) {
                            return index % 2 === 0 ? this.getLabelForValue(value) : '';
                        },
                        maxRotation: 0,
                        minRotation: 0
                    },
                },
                responsive: true,
                maintainAspectRatio: false,
            },
            plugins: {
                legend: {
                    display: false,
                }
            }
        }
    });

    return true;
}


function addTempGradient(gradient, data, length) {
    const factor = 1 / length;
    let color = "";

    for (let index = 0; index < length; index++) {
        const element = data.list[index];
        const temp = (element.main.temp - 273.15).toFixed(0);

        if (temp < -10) color = "#0000FF";
        else if (temp < -5) color = "#0099FF";
        else if (temp < 0) color = "#00FFFF";
        else if (temp < 5) color = "#00FF99";
        else if (temp < 10) color = "#00FF00";
        else if (temp < 15) color = "#99FF00";
        else if (temp < 20) color = "#FFFF00";
        else if (temp < 25) color = "#FFA500";
        else if (temp < 30) color = "#FF4500";
        else color = "#FF0000";

        gradient.addColorStop(index * factor, color);
    }
}

let width, height, gradient; // Variables to store dimensions and the gradient.
const Utils = {
    CHART_COLORS: {
      blue: '#0000FF',
      yellow: '#FFFF00',
      red: '#FF0000',
    },
  };
function getGradient(ctx, chartArea) {
  // Calculate chart dimensions.
  
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;

  // Check if a new gradient is needed (first render or size changed).
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    width = chartWidth; // Update stored width.
    height = chartHeight; // Update stored height.

    // Create a new linear gradient from bottom to top.
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, Utils.CHART_COLORS.blue); // Start: Blue.
    gradient.addColorStop(0.5, Utils.CHART_COLORS.yellow); // Midpoint: Yellow.
    gradient.addColorStop(1, Utils.CHART_COLORS.red); // End: Red.
  }

  return gradient; // Return the gradient for use in the chart.
}
