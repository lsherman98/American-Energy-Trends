import { drawNetTotalEnergyChart } from "./charts/draw-net-total-energy";



export async function netEnergyHandleFormChange(event) {
        event.preventDefault();
        const form = document.getElementById('energy-chart-form')
        const formData = new FormData(form);
        const startYear = formData.get('startYear');
        const endYear = formData.get('endYear');
        const selectedEnergyTypes = formData.getAll('energyTypes');
        
        if (endYear <= startYear) {
            alert("End Year must be greater than Start Year");
            return
        }

        drawNetTotalEnergyChart(startYear.toString(), endYear.toString(), selectedEnergyTypes)
}

