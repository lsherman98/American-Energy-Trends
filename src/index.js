import { drawCentsPerKWH } from "./scripts/charts/draw-cents-per-kwh";
import { drawEmissionsToGDP } from "./scripts/charts/draw-emissions-to-gdp";
import { drawNetTotalEnergyChart } from "./scripts/charts/draw-net-total-energy";
import { drawTotalConsumption } from "./scripts/charts/draw-total-fuel-consumption";
import { netEnergyHandleFormChange } from "./scripts/handleform";


// await drawNetTotalEnergyChart()
// await drawCentsPerKWH()
// await drawTotalConsumption()
// await drawEmissionsToGDP()

document.getElementById('energy-chart-form').addEventListener('input', netEnergyHandleFormChange)


