import { drawCentsPerKWH } from "./scripts/charts/draw-cents-per-kwh";
// import { drawEmissionsToGDP } from "./scripts/charts/draw-emissions-to-gdp";
import { drawNetTotalEnergyChart } from "./scripts/charts/draw-net-total-energy";
import { drawTotalConsumption } from "./scripts/charts/draw-total-fuel-consumption";
import { netEnergyHandleFormChange } from "./scripts/handleform";



const loadingScreen = document.getElementById('loading-screen');

await renderCentsPerKWH()
await renderTotalConsumption()
await renderNetTotalEnergy()

loadingScreen.style.display = 'none'

showChart('cents-per-kwh-chart-container')

document.getElementById('energy-chart-form').addEventListener('input', netEnergyHandleFormChange)


function showChart(chartId) {
    
    document.getElementById('cents-per-kwh-chart-container').style.display = 'none'
    document.getElementById('total-consumption-chart-container').style.display = 'none'
    document.getElementById('net-energy-chart-container').style.display = 'none'

    const selectedChart = document.getElementById(chartId);
    selectedChart.style.display = 'flex';
}

async function renderCentsPerKWH() {
    await drawCentsPerKWH()
    
    document.getElementById('cents-per-kwh-chart-btn').innerText = "Average Cost per Kilowatt Hour"
    document.getElementById('cents-per-kwh-chart-btn').addEventListener('click', function () {
        showChart('cents-per-kwh-chart-container')
    })
}

async function renderTotalConsumption() {
    await drawTotalConsumption()
    document.getElementById('total-consumption-chart-btn').innerText = "Total Fuel Consumption"

    document.getElementById('total-consumption-chart-btn').addEventListener('click', function () {
        showChart('total-consumption-chart-container')
    })
}

// async function renderEmissionToGDP() {
//     await drawEmissionsToGDP()
//     document.getElementById('emissions-to-gdp-btn').innerText = "Emissions & GDP"

//     document.getElementById('emissions-to-gdp-btn').addEventListener('click', function () {
//         showChart('emissions-to-gdp')
//     })
// }

async function renderNetTotalEnergy() {
    await drawNetTotalEnergyChart()
    document.getElementById('net-energy-btn').innerText = "Net Energy by Type"

    document.getElementById('net-energy-btn').addEventListener('click', function () {
        showChart('net-energy-chart-container')
    })
}

