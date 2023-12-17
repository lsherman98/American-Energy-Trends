import { fetchNetTotalEnergy } from "./api";
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



