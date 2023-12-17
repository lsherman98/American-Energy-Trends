import { drawNetTotalEnergyChart } from "./draw";



export async function handleFormClick(event) {
        event.preventDefault();
        const form = document.getElementById('energyChartForm')
        const formData = new FormData(form);
        const startYear = formData.get('startYear');
        const endYear = formData.get('endYear');
        const selectedEnergyTypes = formData.getAll('energyTypes');
        console.log(selectedEnergyTypes)
        console.log(startYear)
        
        if (endYear <= startYear) {
            alert("End Year must be greater than Start Year");
            return; // Prevent form submission
        }
        hideForm()

        drawNetTotalEnergyChart(startYear.toString(), endYear.toString(), selectedEnergyTypes)
}

export function showForm() {
    document.getElementById('energyChartForm').style.display ='block'
}

export function hideForm() {
    document.getElementById('energyChartForm').style.display = 'none'
}