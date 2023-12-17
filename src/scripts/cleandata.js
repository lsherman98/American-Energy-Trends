export function cleanMSNData(data) {
        
    data = data.filter((object) => typeof object.value === 'number')

    for (let i = 0; i < data.length; i++) {
        let object = data[i]
 
       

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
            default:
                break;
        }
    }
    return data
}