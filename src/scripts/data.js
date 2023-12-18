import { fetchCentsPerKWH, fetchEmissionsToGDP, fetchNetTotalEnergy, fetchTotalConsumption } from "./api";
import { cleanMSNData } from "./cleandata";

let data;
export async function netTotalEnergy(startYear, endYear, selectedEnergyTypes) {
    if (data) {
        return data.filter((d) => {
            return d.period >= startYear && d.period <= endYear && selectedEnergyTypes.includes(d.msn)
        })
    } else {
        try {
            data = await fetchNetTotalEnergy()
            return cleanMSNData(data)
        } catch (error) {
            console.error('Error in netTotalEnergy:', error);
            throw error;
        }
    }
}

export async function centsPerKWH() {
    try {
        let data = await fetchCentsPerKWH()
        return data
    } catch (error) {
        console.error('Error in centsPerKWH:', error);
        throw error;
    }
}

export async function totalConsumption() {
    try {
        let data = await fetchTotalConsumption()
        return data
    } catch (error) {
        console.error('Error in totalConsumption:', error);
        throw error;
    }
}



export async function emissionsToGDP() {
    try {
        let data = await fetchEmissionsToGDP()
        return data
    } catch (error) {
        console.error('Error in energyConsumptionPerDollarGDP:', error);
        throw error;
    }
}


