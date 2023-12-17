import { drawNetTotalEnergyChart } from "./scripts/draw";
import { handleFormClick } from "./scripts/handleform";

await drawNetTotalEnergyChart()

document.getElementById('generateChartButton').addEventListener('click', handleFormClick)



