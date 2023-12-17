import * as d3 from "d3"
import { hideForm, showForm } from "./handleform";
import {netTotalEnergy} from "./data"


export async function drawNetTotalEnergyChart(startYear, endYear, selectedEnergyTypes) {
    document.getElementById('chart-container').innerHTML = ``
    hideForm()

    const data = await netTotalEnergy(startYear, endYear, selectedEnergyTypes)
    // console.log(data)

    const margin = {top: 70, right: 30, bottom: 40, left: 80};
    const width = 1200 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const x = d3.scaleTime()
        .domain(d3.extent(data, d => d.period))
        .range([0, width])
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([height, 0])

    const coal = data.filter(d => d.msn === 'COAL')
    const total = data.filter(d => d.msn === 'TOTAL')
    const geothermal = data.filter(d => d.msn === 'GEOTHERMAL')
    const pumped_hydro = data.filter(d => d.msn === 'HYDROELECTRIC PUMPED')
    const conventional_hydro = data.filter(d => d.msn === 'CONVENTIONAL HYDROELECTRIC')
    const natgas = data.filter(d => d.msn === 'NATURAL GAS')
    const solar = data.filter(d => d.msn === 'SOLAR')
    const petroleum = data.filter(d => d.msn === 'PETROLEUM')
    const wood = data.filter(d => d.msn === 'WOOD')
    const wind = data.filter(d => d.msn === 'WIND')
    const nuclear = data.filter(d => d.msn === 'NUCLEAR')



    const svg = d3.select("#chart-container")
        .append("svg")
            .attr("width", width + margin.left + margin.right + 200)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)

    const tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")

    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x)
        // .ticks(d3.timeYear.every(5))
        .tickFormat(d3.format("d"))
        )

    svg.append("g")
        .call(d3.axisLeft(y))

   

    const line = d3.line()
        .x(d => x(d.period))
        .y(d => y(d.value))


    const colorScale = d3.scaleOrdinal(d3.schemeCategory10)

    svg.append("path")
        .datum(total)
        .attr("stroke", d => colorScale(d))
        .attr("fill", "none")
        .attr("stroke-width", 3)
        .attr("d", line)
        .clone()
        .attr("stroke", "transparent")
        .attr("stroke-width", 10)
        .on("mouseover", (e) => {
            const [xCoord, yCoord] = d3.pointer(e, this)

            tooltip
                .style("display", "block")
                .style("left", `${xCoord + margin.left}px`)
                .style("top", `${yCoord + margin.top}px`)
                .text("Total")
        })
        .on("mouseout", e => {
            tooltip.style("display", "none");
        });
 

    svg.append("path")
        .datum(coal)
        .attr("stroke", d => colorScale(d))
        .attr("fill", "none")
        .attr("stroke-width", 3)
        .attr("d", line)
        .clone()
        .attr("stroke", "transparent")
        .attr("stroke-width", 5)
        .on("mouseover", (e) => {
            const [xCoord, yCoord] = d3.pointer(e, this)

            tooltip
                .style("display", "block")
                .style("left", `${xCoord + margin.left}px`)
                .style("top", `${yCoord + margin.top}px`)
                .text("Coal")
        })
        .on("mouseout", e => {
            tooltip.style("display", "none");
        });
  
    svg.append("path")
        .datum(geothermal)
        .attr("stroke", d => colorScale(d))
        .attr("fill", "none")
        .attr("stroke-width", 3)
        .attr("d", line)
        .clone()
        .attr("stroke", "transparent")
        .attr("stroke-width", 10)
        .on("mouseover", (e) => {
            const [xCoord, yCoord] = d3.pointer(e, this)

            tooltip
                .style("display", "block")
                .style("left", `${xCoord + margin.left}px`)
                .style("top", `${yCoord + margin.top}px`)
                .text("GeoThermal")
        })
        .on("mouseout", e => {
            tooltip.style("display", "none");
        });
      
    
    // svg.append("path")
    //     .datum(pumped_hydro)
    //     .attr("stroke", d => colorScale(d))
    //     .attr("fill", "none")
    //     .attr("stroke-width", 2)
    //     .attr("d", line)
    //     .clone()
    //     .attr("stroke", "transparent")
    //     .attr("stroke-width", 5)
    //     .on("mouseover", (e) => {
    //         const [xCoord, yCoord] = d3.pointer(e, this)

    //         tooltip
    //             .style("display", "block")
    //             .style("left", `${xCoord + margin.left}px`)
    //             .style("top", `${yCoord + margin.top}px`)
    //             .text("Pumped HydroElectric")
    //     })
    //     .on("mouseout", e => {
    //         tooltip.style("display", "none");
    //     });
    
    svg.append("path")
        .datum(conventional_hydro)
        .attr("stroke", d => colorScale(d))
        .attr("fill", "none")
        .attr("stroke-width", 3)
        .attr("d", line)
        .clone()
        .attr("stroke", "transparent")
        .attr("stroke-width", 10)
        .on("mouseover", (e) => {
            const [xCoord, yCoord] = d3.pointer(e, this)

            tooltip
                .style("display", "block")
                .style("left", `${xCoord + margin.left}px`)
                .style("top", `${yCoord + margin.top}px`)
                .text("Conventional HydroElectric")
        })
        .on("mouseout", e => {
            tooltip.style("display", "none");
        });


    svg.append("path")
        .datum(natgas)
        .attr("stroke", d => colorScale(d))
        .attr("fill", "none")
        .attr("stroke-width", 3)
        .attr("d", line)
        .clone()
        .attr("stroke", "transparent")
        .attr("stroke-width", 10)
        .on("mouseover", (e) => {
            const [xCoord, yCoord] = d3.pointer(e, this)

            tooltip
                .style("display", "block")
                .style("left", `${xCoord + margin.left}px`)
                .style("top", `${yCoord + margin.top}px`)
                .text("Natural Gas")
        })
        .on("mouseout", e => {
            tooltip.style("display", "none");
        });


    svg.append("path")
        .datum(solar)
        .attr("stroke", d => colorScale(d))
        .attr("fill", "none")
        .attr("stroke-width", 3)
        .attr("d", line)
        .clone()
        .attr("stroke", "transparent")
        .attr("stroke-width", 10)
        .on("mouseover", (e) => {
            const [xCoord, yCoord] = d3.pointer(e, this)

            tooltip
                .style("display", "block")
                .style("left", `${xCoord + margin.left}px`)
                .style("top", `${yCoord + margin.top}px`)
                .text("Solar")
        })
        .on("mouseout", e => {
            tooltip.style("display", "none");
        });


    svg.append("path")
        .datum(petroleum)
        .attr("stroke", d => colorScale(d))
        .attr("fill", "none")
        .attr("stroke-width", 3)
        .attr("d", line)
        .clone()
        .attr("stroke", "transparent")
        .attr("stroke-width", 10)
        .on("mouseover", (e) => {
            const [xCoord, yCoord] = d3.pointer(e, this)

            tooltip
                .style("display", "block")
                .style("left", `${xCoord + margin.left}px`)
                .style("top", `${yCoord + margin.top}px`)
                .text("Petroleum")
        })
        .on("mouseout", e => {
            tooltip.style("display", "none");
        });
 

    svg.append("path")
        .datum(wood)
        .attr("stroke", d => colorScale(d))
        .attr("fill", "none")
        .attr("stroke-width", 3)
        .attr("d", line)
        .clone()
        .attr("stroke", "transparent")
        .attr("stroke-width", 10)
        .on("mouseover", (e) => {
            const [xCoord, yCoord] = d3.pointer(e, this)

            tooltip
                .style("display", "block")
                .style("left", `${xCoord + margin.left}px`)
                .style("top", `${yCoord + margin.top}px`)
                .text("Wood")
        })
        .on("mouseout", e => {
            tooltip.style("display", "none");
        });
    

    svg.append("path")
        .datum(wind)
        .attr("stroke", d => colorScale(d))
        .attr("fill", "none")
        .attr("stroke-width", 3)
        .attr("d", line)
        .clone()
        .attr("stroke", "transparent")
        .attr("stroke-width", 10)
        .on("mouseover", (e) => {
            const [xCoord, yCoord] = d3.pointer(e, this)

            tooltip
                .style("display", "block")
                .style("left", `${xCoord + margin.left}px`)
                .style("top", `${yCoord + margin.top}px`)
                .text("Wind")
        })
        .on("mouseout", e => {
            tooltip.style("display", "none");
        });

    svg.append("path")
        .datum(nuclear)
        .attr("stroke", d => colorScale(d))
        .attr("fill", "none")
        .attr("stroke-width", 3)
        .attr("d", line)
        .clone()
        .attr("stroke", "transparent")
        .attr("stroke-width", 10)
        .on("mouseover", (e) => {
            const [xCoord, yCoord] = d3.pointer(e, this)

            tooltip
                .style("display", "block")
                .style("left", `${xCoord + margin.left}px`)
                .style("top", `${yCoord + margin.top}px`)
                .text("Nuclear")
        })
        .on("mouseout", e => {
            tooltip.style("display", "none");
        });
   


    let legend_keys = ["Total", "Coal", "Geothermal", "Hydroelectric Conventional", "Natural Gas", "Solar", "Petroleum", 'Wood', "Wind", "Nuclear"]

    let lineLegend = svg.selectAll(".lineLegend")
        .data(legend_keys)
        .enter().append("g")
        .attr('margin', 10)
        .attr("class", "lineLegend")
        .attr("transform", function (d, i) {
            const legendX = width + 10; // Adjust the left margin by changing this value
            const legendY = i * 20;
            return `translate(${legendX},${legendY})`
        });

    lineLegend.append("text").text(function (d) { return d; })
        .attr("transform", "translate(15,9)"); //align texts with boxes

    lineLegend.append("rect")
        .attr("fill", function (d, i) { return colorScale(i); })
        .attr("width", 10).attr("height", 10);

    showForm()
    }




