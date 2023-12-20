import * as d3 from "d3"
import {centsPerKWH} from "../data"

export async function drawCentsPerKWH() {

    let data = await centsPerKWH()
    data = data.filter((d) => {
        return typeof d.value === 'number'
    })

    const margin = { top: 100, right: 60, bottom: 50, left: 100 };
    const width = 1600 - margin.left - margin.right;
    const height = 800 - margin.top - margin.bottom;
    

    const x = d3.scaleTime()
        .range([0, width]);

    const y = d3.scaleLinear()
        .range([height, 0]);

    const svg = d3.select("#cents-per-kwh-chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    
    const tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip");

    const gradient = svg.append("defs")
        .append("linearGradient")
        .attr("id", "gradient")
        .attr("x1", "0%")
        .attr("x2", "0%")
        .attr("y1", "0%")
        .attr("y2", "100%")
        .attr("spreadMethod", "pad");

    gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#85bb65")
        .attr("stop-opacity", 1);

    gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#85bb65")
        .attr("stop-opacity", 0);

    const parseDate = d3.timeParse("%Y-%m");
    data.forEach(d => {
        d.period = parseDate(d.period);
        d.value= +d.value;
    });

    x.domain(d3.extent(data, d => d.period));
    y.domain([0, d3.max(data, d => d.value)]);


    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .style("font-size", "14px")
        .call(d3.axisBottom(x)
            .tickValues(x.ticks(d3.timeYear.every(2)))
            .tickFormat(d3.timeFormat("%Y")))
        .selectAll(".tick line")
        .style("stroke-opacity", 1)
    svg.selectAll(".tick text")
        .attr("fill", "#777");

    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${width},0)`)
        .style("font-size", "14px")
        .call(d3.axisRight(y)
            .ticks(10)
            .tickFormat(d => {
                if (isNaN(d)) return "";
                return `${d}¢`;
            }))
        .selectAll(".tick text")
        .style("fill", "#777");

    const line = d3.line()
        .x(d => x(d.period))
        .y(d => y(d.value));

    const area = d3.area()
        .x(d => x(d.period))
        .y0(height)
        .y1(d => y(d.value));

    svg.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area)
        .style("fill", "url(#gradient)")
        .style("opacity", .5);

    const path = svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "#85bb65")
        .attr("stroke-width", 1)
        .attr("d", line);

    const circle = svg.append("circle")
        .attr("r", 0)
        .attr("fill", "red")
        .style("stroke", "white")
        .attr("opacity", 0.7)
        .style("pointer-events", "none");

    const tooltipLineX = svg.append("line")
        .attr("class", "tooltip-line")
        .attr("id", "tooltip-line-x")
        .attr("stroke", "red")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "2,2");

    const tooltipLineY = svg.append("line")
        .attr("class", "tooltip-line")
        .attr("id", "tooltip-line-y")
        .attr("stroke", "red")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "2,2");

    const listeningRect = svg.append("rect")
        .attr("class", "listening-rect")
        .attr("width", width)
        .attr("height", height);

    listeningRect.on("mousemove", function (event) {
        const [xCoord] = d3.pointer(event, this);
        const bisectDate = d3.bisector(d => d.period).left;
        const x0 = x.invert(xCoord);
        const i = bisectDate(data, x0, 1);
        const d0 = data[i - 1];
        const d1 = data[i];
        const d = x0 - d0.period > d1.period - x0 ? d1 : d0;
        const xPos = x(d.period);
        const yPos = y(d.value);

    circle.attr("cx", xPos).attr("cy", yPos)

    circle.transition()
        .duration(50)
        .attr("r", 5);

    tooltipLineX.style("display", "block").attr("x1", xPos).attr("x2", xPos).attr("y1", 0).attr("y2", height);
    tooltipLineY.style("display", "block").attr("y1", yPos).attr("y2", yPos).attr("x1", 0).attr("x2", width);

    tooltip
        .style("display", "block")
        .style("left", `${width + 90}px`)
        .style("top", `${yPos + 195}px`)
        .html(`${d.value}¢`);
    });

    listeningRect.on("mouseleave", function () {
        circle.transition().duration(50).attr("r", 0);
        tooltip.style("display", "none");
        tooltipLineX.attr("x1", 0).attr("x2", 0);
        tooltipLineY.attr("y1", 0).attr("y2", 0);
        tooltipLineX.style("display", "none");
        tooltipLineY.style("display", "none");
    });

}