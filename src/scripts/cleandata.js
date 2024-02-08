export function cleanMSNData(data) {
        
    data = data.filter((object) => object.value !== 'Not Available')

    for (let i = 0; i < data.length; i++) {
        let object = data[i]
        object.value = parseFloat(object.value)
        switch (object.msn) {
            case "CLETPUS":
                object.msn = "COAL"
                break;
            case "ELETPUS":
                object.msn = "TOTAL"
                break;
            case "GEETPUS":
                object.msn = "GEOTHERMAL"
                break;
            case "HPETPUS":
                object.msn = "HYDROELECTRIC PUMPED"
                break;
            case "HVETPUS":
                object.msn = "CONVENTIONAL HYDROELECTRIC"
                break;
            case "NGETPUS":
                object.msn = "NATURAL GAS"
                break;
            case ("PAETPUS"):
                object.msn = "PETROLEUM"
                break
            case ("SOETPUS"):
                object.msn = "SOLAR"
                break
            case ("WDETPUS"):
                object.msn = "WOOD"
                break
            case ("WYETPUS"):
                object.msn = "WIND"
                break
            case ("NUETPUS"):
                object.msn = "NUCLEAR"
                break
            case ("BMTCBUS"):
                object.msn = "BioMass Consumption"
                break
            case ("CLTCBUS"):
                object.msn = "Coal Consumption"
                break
            case ("FFTCBUS"):
                object.msn = "Fossil Fuels Consumption"
                break
            case ("RETCBUS"):
                object.msn = "Renewable Energy Consumption"
                break
            default:
                break;
        }
    }
    return data
}