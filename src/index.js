import { drawCentsPerKWH } from "./scripts/charts/draw-cents-per-kwh";
import { drawNetTotalEnergyChart } from "./scripts/charts/draw-net-total-energy";
import { drawTotalConsumption } from "./scripts/charts/draw-total-fuel-consumption";
import { netEnergyHandleFormClick } from "./scripts/handleform";

// await drawNetTotalEnergyChart()
// await drawCentsPerKWH()

await drawTotalConsumption()
document.getElementById('generate-chart-submit').addEventListener('click', netEnergyHandleFormClick)


