import { drawCentsPerKWH } from "./scripts/charts/draw-cents-per-kwh";
import { drawEmissionsToGDP } from "./scripts/charts/draw-emissions-to-gdp";
import { drawNetTotalEnergyChart } from "./scripts/charts/draw-net-total-energy";
import { drawTotalConsumption } from "./scripts/charts/draw-total-fuel-consumption";
import { netEnergyHandleFormChange } from "./scripts/handleform";

const loadingScreen = document.getElementById('loading-screen');
loadingScreen.style.display = 'flex';
await drawCentsPerKWH()
loadingScreen.style.display = 'none'
showChart('cents-per-kwh-chart')

document.getElementById('cents-per-kwh-chart-btn').addEventListener('click', function () {
    showChart('cents-per-kwh-chart')
})

document.getElementById('total-consumption-chart-btn').innerText = "Loading..."
document.getElementById('emissions-to-gdp-btn').innerText = "Loading..."
document.getElementById('net-energy-btn').innerText = "Loading..."

await drawTotalConsumption()
document.getElementById('total-consumption-chart-btn').innerText = "Total Fuel Consumption"

document.getElementById('total-consumption-chart-btn').addEventListener('click', function () {
    showChart('total-consumption-chart')
})

await drawEmissionsToGDP()
document.getElementById('emissions-to-gdp-btn').innerText = "Emissions & GDP"

document.getElementById('emissions-to-gdp-btn').addEventListener('click', function () {
    showChart('emissions-to-gdp')
})

await drawNetTotalEnergyChart()
document.getElementById('net-energy-btn').innerText = "Net Energy by Type"

document.getElementById('net-energy-btn').addEventListener('click', function () {
    showChart('net-energy')
})

document.getElementById('energy-chart-form').addEventListener('input', netEnergyHandleFormChange)


function showChart(chartId) {
    const charts = document.querySelectorAll('.chart');
    charts.forEach(chart => chart.style.display = 'none');  

    const selectedChart = document.getElementById(chartId);
    selectedChart.style.display = 'flex';
}



