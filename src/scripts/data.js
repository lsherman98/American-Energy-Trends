import { fetchCentsPerKWH, fetchNetTotalEnergy, fetchTotalConsumption } from "./api";
import { cleanMSNData } from "./cleandata";

export async function netTotalEnergy(startYear, endYear, selectedEnergyTypes) {
    try {
        let data = await fetchNetTotalEnergy(startYear, endYear, selectedEnergyTypes)
        return cleanMSNData(data)
    } catch (error) {
        console.error('Error in netTotalEnergy:', error);
        throw error;
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



