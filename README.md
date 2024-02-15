# American Energy Trends

The [American Energy Trends](https://lsherman98.github.io/American-Energy-Trends/) website is a data visualization project looking at trends in US energy consumption and generation over the years. It looks at four different data relationships and has an interactive visualization for each relationship. On visiting the website, it fetches the data from the API, renders the charts, and lands you on the first chart. Using the easy to use navigation bar you can extremely quickly switch between the different charts. Interacting with the charts was also designed to be extremely intuitive, with instant reaction from the webpage. No need to wait around for the chart to re-render. 

## Cost per Kilowatt Hour
![Cost per Kilowatt Hour](./assests/2.png)

The first visual of the website is an area chart visualizing the cost of energy over time. You can interact it while hovering your pointer over anyhere on the line and it will draw lines straight out to the x and y axis showing exactly what year that point is referencing and its value. 


## Total Consumption by Fuel
![Total Consumption by Fuel](./assests/3.png)

This fun pie chart shows you the amount of a specific fuel the US consumes relative to other types. Moving the slider left or right lets you choose from which year the data on the chart will represent. Moving it to the left brings you closer to 1949, the earliest data is available for, and moving it to the right brings you closer to 2022, the latest year data was available for at the time.  

```
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

```

The code above is what allows the chart to animate in real time and show new data based on the position of the slider. The slider is a simple html input element that sends a value in the form of a year. The chart takes that value, filters out the data for just that year and renders the new chart as well as animating the transition between the old and the new. 


 ## Net Total Energy Generation
![Net Total Energy Generation](./assests/4.png)

The Net Total Energy line chart allows for the most control in choosing which data gets shown. With a simple and easy to use options selector, you can pick a range of years and up to 10 different types of fuel. The chart will adjust in real time based on your selections. You can also hover over any line on the chart and it will display what fuel that line represents.

```
export async function netEnergyHandleFormChange(event) {
        event.preventDefault();
        const form = document.getElementById('energy-chart-form')
        const formData = new FormData(form);
        const startYear = formData.get('startYear');
        const endYear = formData.get('endYear');
        const selectedEnergyTypes = formData.getAll('energyTypes');
        
        if (endYear <= startYear) {
            alert("End Year must be greater than Start Year");
            return
        }

        drawNetTotalEnergyChart(startYear.toString(), endYear.toString(), selectedEnergyTypes)
}
```

The code above is what handles the data from the options form. It grabs the start year, end year, and fuel types hash map, which all then gets passed into the function that actually draws the chart. The first line of code when drawing the chart is to another function that returns the filtered data based on the passed in options the user selected. All the data is already loaded behind the scenes and stored locally so there is no time wasted making multiple API calls. 

```
  let data;
  export async function netTotalEnergy(startYear, endYear, selectedEnergyTypes) {
      if (data) {
          return data.filter((d) => {
              return d.period >= startYear && d.period <= endYear && selectedEnergyTypes.includes(d.msn)
          })
      } else {
          try {
              data = await fetchNetTotalEnergy()
              return cleanMSNData(data)
          } catch (error) {
              console.error('Error in netTotalEnergy:', error);
              throw error;
          }
      }
  }
```

If the data hasnt been loaded yet, we make a call the API and fetch the proper data. Once the data is loaded every call to grab data from the drawing function is extremely fast. We take our data, which has been stored localy, filter out what we need, and send it back to the drawing function. 

```
  const total = data.filter(d => d.msn === 'TOTAL')

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
                .style("top", `${yCoord + 200}px`)
                .text("Total")
        })
        .on("mouseout", e => {
            tooltip.style("display", "none");
        });
```


The returned data gets seperated out into distinct variables, allowing us to draw each line onto the chart. 


## Technologies, Libraries, APIs
This project has been implemented using the following technologies: 
  - All the data used to implement the charts comes from the [EIA Open Data API](https://www.eia.gov/opendata/). 
  - The D3 Javascript Library was used for all data visualizations and animations. 
  - Webpack to bundle and transpile the source JavaScript code.
  - NPM to manage project dependencies.


## Future Features
  - More ability to customize which data each chart dispays to the user.
  - Render different size charts depending on current viewport size. Make the site mobile friendly, etc
  - Option to download high resolution PDFs or JPEGs of the chart currenty being displayed. 