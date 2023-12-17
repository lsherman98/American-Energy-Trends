const api_key = "&api_key=h65XN2xiPKqBCR2A7pZ1ja1FHsgHepsNLQzy5Teh"

const defaultFuel = {
   0: "CLETPUS",
   1: "NGETPUS",
   2: "GEETPUS",
   3: "WYETPUS",
   4: "WDETPUS",
   5: "PAETPUS",
   6: "NUETPUS",
   7: "SOETPUS",
   8: "EETPUS",
   9: "ELETPUS"
}




export function fetchNetTotalEnergy(startYear = '1949', endYear = '2023', selectedEnergyTypes = defaultFuel) {
    const baseUrl = "https://api.eia.gov/v2/total-energy/data/?frequency=annual&data[0]=value"
    let fuelParams = ""
    for (let i = 0; i < Object.keys(selectedEnergyTypes).length; i++) {
        fuelParams += `&facets[msn][]=${selectedEnergyTypes[i]}`
    }
    const yearRange = `&start=${startYear}&end=${endYear}`
    const sortParams = `&sort[0][column]=msn&sort[0][direction]=asc&sort[1][column]=period&sort[1][direction]=asc&offset=0&length=5000`

    const url = baseUrl + fuelParams + yearRange + sortParams + api_key

    return fetch(url, { headers: { 'Accept': 'application/json' } })
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                return Promise.reject(new Error('Something went wrong'))
            }
        })
        .then(resBody => {
            let data = resBody.response.data
            return data
        })
        .catch(error => console.log(error))
}

