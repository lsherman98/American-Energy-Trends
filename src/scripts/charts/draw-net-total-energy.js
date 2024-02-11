import * as d3 from "d3"
import {netTotalEnergy} from "../data"
import { net_data } from "./net_data"


export async function drawNetTotalEnergyChart(startYear, endYear, selectedEnergyTypes) {
    document.getElementById('net-energy-chart').innerHTML = ``
    const data = await netTotalEnergy(startYear, endYear, selectedEnergyTypes)
    const width = 1450;
    const height = 500

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

    const svg = d3.select("#net-energy-chart")
        .append("svg")
            // .attr("width", width + margin.left + margin.right + 200)
            // .attr("height", height + margin.top + margin.bottom)
        .attr("viewBox", `0 0 ${width + 125} ${height + 25}`)
        .append("g")
        .attr("transform", `translate(0, 0)`)

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - 80)
        .attr("x", 0 - height / 2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Net Generation in Million Kilowatthours");


    const tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")

    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x)
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
                .style("left", `${xCoord + 150}px`)
                .style("top", `${yCoord + 300}px`)
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
                .style("left", `${xCoord + 150}px`)
                .style("top", `${yCoord + 200}px`)
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
                .style("left", `${xCoord + 150}px`)
                .style("top", `${yCoord + 200}px`)
                .text("GeoThermal")
        })
        .on("mouseout", e => {
            tooltip.style("display", "none");
        });
      
    
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
                .style("left", `${xCoord + 150}px`)
                .style("top", `${yCoord + 200}px`)
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
                .style("left", `${xCoord + 150}px`)
                .style("top", `${yCoord + 200}px`)
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
                .style("left", `${xCoord + 150}px`)
                .style("top", `${yCoord + 200}px`)
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
                .style("left", `${xCoord + 150}px`)
                .style("top", `${yCoord + 200}px`)
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
                .style("left", `${xCoord + 150}px`)
                .style("top", `${yCoord + 200}px`)
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
                .style("left", `${xCoord + 150}px`)
                .style("top", `${yCoord + 200}px`)
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
                .style("left", `${xCoord + 150}px`)
                .style("top", `${yCoord + 200}px`)
                .text("Nuclear")
        })
        .on("mouseout", e => {
            tooltip.style("display", "none");
        });
   


    let legend_keys = ["Total", "Coal", "Geothermal", "Hydroelectric", "Natural Gas", "Solar", "Petroleum", 'Wood', "Wind", "Nuclear"]

    let lineLegend = svg.selectAll(".lineLegend")
        .data(legend_keys)
        .enter().append("g")
        .attr('margin', 10)
        .attr("class", "lineLegend")
        .attr("transform", function (d, i) {
            const legendX = width + 10; 
            const legendY = i * 20;
            return `translate(${legendX},${legendY + 5})`
        });

    lineLegend.append("text").text(function (d) { return d; })
        .attr("transform", "translate(15,9)"); 

    lineLegend.append("rect")
        .attr("fill", function (d, i) { return colorScale(i); })
        .attr("width", 10).attr("height", 10);



        
    }




