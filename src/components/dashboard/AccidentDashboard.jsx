import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const AccidentDashboard = () => {
  const accidentChartRef = useRef(null);
  const stackedChartRef = useRef(null);

  useEffect(() => {
    // URLs for the CSV files
    const csvFilePath = '/data/transformed_accident_data.csv';
    const drunkFilePath = '/data/yearly_drunk_driving_statistics.csv';

    // Dimensions for the line chart
    const margin = { top: 10, right: 30, bottom: 30, left: 20 },
      width = 600 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // Create the line chart SVG
    let lineSvg = d3.select(accidentChartRef.current).select("svg");
    if (lineSvg.empty()) {
      lineSvg = d3.select(accidentChartRef.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    } else {
      lineSvg.selectAll("*").remove();
    }

    // Read and plot the data for the line chart
    d3.csv(csvFilePath, function (d) {
      return { date: d3.timeParse("%Y-%m-%d")(d.date), value: +d.value };
    }).then(function (data) {
      const x = d3.scaleTime()
        .domain(d3.extent(data, function (d) { return d.date; }))
        .range([0, width]);
      lineSvg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

      const max = d3.max(data, function (d) { return +d.value; });

      const y = d3.scaleLinear()
        .domain([0, max])
        .range([height, 0]);
      lineSvg.append("g")
        .call(d3.axisLeft(y));

      lineSvg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function (d) { return x(d.date); })
          .y(function (d) { return y(d.value); })
        );
    });

    // Dimensions for the stacked bar chart
    const margin2 = { top: 10, right: 30, bottom: 30, left: 50 },
      width2 = 600 - margin2.left - margin2.right,
      height2 = 400 - margin2.top - margin2.bottom;

    // Create the stacked bar chart SVG
    let stackedSvg = d3.select(stackedChartRef.current).select("svg");
    if (stackedSvg.empty()) {
      stackedSvg = d3.select(stackedChartRef.current)
        .append("svg")
        .attr("width", width2 + margin2.left + margin2.right)
        .attr("height", height2 + margin2.top + margin2.bottom)
        .append("g")
        .attr("transform", `translate(${margin2.left},${margin2.top})`);
    } else {
      stackedSvg.selectAll("*").remove();
    }

    // Read and plot the data for the stacked bar chart
    d3.csv(drunkFilePath).then(function (data) {
      console.log("Loaded data:", data)


      const subgroups = data.columns.slice(1);
      console.log("Subgroup data:", subgroups)
      const groups = data.map(d => d.Year);
      console.log("Groups:", groups)



      const x = d3.scaleBand()
        .domain(groups)
        .range([0, width2])
        .padding([0.2]);
      stackedSvg.append("g")
        .attr("transform", `translate(0, ${height2})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

      const maxY = d3.max(data, d => +d.Deaths + +d.Injuries);
      const y = d3.scaleLinear()
        .domain([0, maxY])
        .range([height2, 0]);
      stackedSvg.append("g")
        .call(d3.axisLeft(y));

      const color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#e41a1c', '#ff7f00']);

      const stackedData = d3.stack()
        .keys(subgroups)
        (data);

      stackedSvg.append("g")
        .selectAll("g")
        .data(stackedData)
        .join("g")
        .attr("fill", d => color(d.key))
        .selectAll("rect")
        .data(d => d)
        .join("rect")
        .attr("x", d => x(d.data.Year))
        .attr("y", height2) // Start from the bottom of the chart
        .attr("width", x.bandwidth())
        .transition() // Apply a transition
        .duration(800) // Duration of the animation in milliseconds
        .delay((d, i) => i * 50) // Delay for each bar, increasing from left to right
        .attr("y", d => y(d[1])) // Animate to the final y position
        .attr("height", d => y(d[0]) - y(d[1])); // Animate to the final height
    });
  }, []);

  return (
    <div className='flex flex-col items-center justify-between'>
      <div id='accident-trend' className='shadow-lg p-6 rounded-2xl border-lsate-400' ref={accidentChartRef}></div>
      <div id='drunk-trend' className='shadow-lg p-6 rounded-2xl border-lsate-400' ref={stackedChartRef}></div>
    </div>
  );
};

export default AccidentDashboard;
