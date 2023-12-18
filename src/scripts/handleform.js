import { drawNetTotalEnergyChart } from "./charts/draw-net-total-energy";



export async function netEnergyHandleFormClick(event) {
        event.preventDefault();
        const form = document.getElementById('energy-chart-form-form')
        const formData = new FormData(form);
        const startYear = formData.get('startYear');
        const endYear = formData.get('endYear');
        const selectedEnergyTypes = formData.getAll('energyTypes');
        console.log(selectedEnergyTypes)
        console.log(startYear)
        
        if (endYear <= startYear) {
            alert("End Year must be greater than Start Year");
            return
        }
        hideNetEnergyForm()

        drawNetTotalEnergyChart(startYear.toString(), endYear.toString(), selectedEnergyTypes)
}

export function showNetEnergyForm() {
    document.getElementById('energy-chart-form-form').style.display ='block'
}

export function hideNetEnergyForm() {
    document.getElementById('energy-chart-form-form').style.display = 'none'
}