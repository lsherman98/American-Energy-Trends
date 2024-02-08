import * as d3 from "d3"
import { totalConsumption } from "../data"

export async function drawTotalConsumption() {
    const raw_data = await totalConsumption()


    const labels = ["BioMass", "Coal", "Fossil Fuels", "Renewables"]
    const colors = ["#d62728", "#ff7f0e", "#1f77b4", "#2ca02c"]

    let dataByYear = {}
    let selectedYear = '2022';
    for (let i = 0; i < raw_data.length; i += 4) {
        let year = raw_data[i].period.toString()
        let yearly_data = [
            raw_data[i].value,
            raw_data[i + 1].value,
            raw_data[i + 2].value,
            raw_data[i + 3].value,
        ]
        dataByYear[year] = yearly_data
    }

    let data = dataByYear[selectedYear]

    const pie = d3.pie()
    const arc = d3.arc().innerRadius(125).outerRadius(250)

    const local = d3.local()

    const svg = d3.select('#total-consumption-chart')
        .append("svg")
        .attr("viewBox", `0 0 700 700`)
        .append('g')
        .attr('transform', 'translate(350, 350)')


    const path = svg.selectAll('path')
        .data(pie(data))
        .enter().append('path')
        .attr('d', arc)
        .attr('fill', (d, i) => colors[i])
        .each(function (d) {
            local.set(this, d)
        })
        

    const label = svg.selectAll('text')
        .data(pie(data))
        .enter().append('text')
        .attr("classed", "pie-label")
        .attr("transform", function (d) {
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(function (d, i) {
            return labels[i];
        });
        

    const slider = d3.select('#pie-chart-slider')

    slider
        .attr("min", d3.min(raw_data, d => d.period))
        .attr("max", d3.max(raw_data, d => d.period))
        .on('input', (e) => {
            selectedYear = e.target.value
            document.getElementById('selected-year').textContent = selectedYear

            data = dataByYear[selectedYear]

            path.data(pie(data)).transition().duration(500)
                .attrTween('d', function (d) {
                    const i = d3.interpolate(local.get(this), d)
                    local.set(this, i(0))
                    return function (t) {
                        return arc(i(t))
                    }
                })

            svg.selectAll('text')
                .data(pie(data))
                .transition().duration(500)
                .attr("transform", function (d) {
                    return "translate(" + arc.centroid(d) + ")";
                });
        })

}
