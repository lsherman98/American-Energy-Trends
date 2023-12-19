import * as d3 from "d3"
import { emissionsToGDP } from "../data"

export async function drawEmissionsToGDP() {
    let data = await emissionsToGDP()

    data = data.reduce((acc, item) => {
        const { period, msn, value } = item;

        if (!acc[period]) {
            acc[period] = {};
        }

        if (msn === "TETCEUS") {
            acc[period].emissions = value;
        } else if (msn === "GDPRVUS") {
            acc[period].gdp = value;
        }

        return acc;
    }, {});

    const margin = { top: 100, right: 60, bottom: 50, left: 80 };
    const width = 1700 - margin.left - margin.right;
    const height = 800 - margin.top - margin.bottom;

    // Create an SVG element
    const svg = d3.select("#emissions-to-gdp")
        .append("svg")
        .attr("width", width + 200)
        .attr("height", height);

    svg.append("text")
        .attr("class", "chart-title")
        .attr("x", margin.left)
        .attr("y", margin.top - 100)
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .style("font-family", "sans-serif")
        .text("Total CO2 Emissions & Total GDP");

    // Extract years from your data
    const years = Object.keys(data);

    // Define scales
    const xScale = d3.scaleLinear()
        .domain([d3.min(years), d3.max(years)])
        .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(Object.values(data), d => Math.max(d.emissions, d.gdp))])
        .range([height - margin.bottom, margin.top]);

    // Create area generators
    const emissionsArea = d3.area()
        .x(d => xScale(d.year))
        .y0(height - margin.bottom)
        .y1(d => yScale(d.emissions));

    const gdpArea = d3.area()
        .x(d => xScale(d.year))
        .y0(height - margin.bottom)
        .y1(d => yScale(d.gdp));

    // Convert your data object into an array of objects
    const dataArray = years.map(year => ({ year, ...data[year] }));

    // Create a group for the areas
    const areaGroup = svg.append("g");

    // Append the emissions area
    areaGroup.append("path")
        .data([dataArray])
        .attr("class", "emissions-area")
        .attr("d", emissionsArea)
        .attr("fill", "red")
         .attr("fill-opacity", 0.7)
    
    // Append the GDP area
    areaGroup.append("path")
        .data([dataArray])
        .attr("class", "gdp-area")
        .attr("d", gdpArea)
        .attr("fill", "blue")
        .attr("fill-opacity", 0.7)

    // Append axes
    const xAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format("d"));
    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(xAxis);

    svg.append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(yAxis);

    const legend = svg.append("g")
        .attr("transform", `translate(${width - margin.right - 10}, ${margin.top})`)
        .attr("class", "legend-item")
        

    // Legend for GDP
    // legend.append("rect")
    //     .attr("x", 0)
    //     .attr("y", 0)
    //     .attr("width", 10)
    //     .attr("height", 10)
    //     .attr("fill", "blue");

    legend.append("text")
        .attr("x", 15)
        .attr("y", 8)
        .text("GDP (in billions)")
        .attr("class", "gdp-text")
        .style('fill', 'blue')
        .on("mouseover", function () {
            d3.selectAll(".gdp-area")
                .attr("opacity", 1);
            d3.selectAll(".emissions-area")
                .attr("opacity", .3);
        })
        .on("mouseout", function () {
            d3.selectAll(".gdp-area")
                .attr("opacity", 1); 
            d3.selectAll(".emissions-area")
                .attr("opacity", 1)
        });

    // Legend for Emissions
    // legend.append("rect")
    //     .attr("x", 0)
    //     .attr("y", 20)
    //     .attr("width", 10)
    //     .attr("height", 10)
    //     .attr("fill", "red");

    legend.append("text")
        .attr("x", 15)
        .attr("y", 28)
        .text("Emissions (in millions)")
        .attr("class", "emissions-text")
        .style('fill', 'red')
        .on("mouseover", function () {
            d3.selectAll(".emissions-area")
                .attr("opacity", 1);
            d3.selectAll(".gdp-area")
                .attr("opacity", .3);
        })
        .on("mouseout", function () {
            d3.selectAll(".emissions-area")
                .attr("opacity", 1); // Reset opacity on mouseout
            d3.selectAll(".gdp-area")
                .attr("opacity", 1)
        });


}