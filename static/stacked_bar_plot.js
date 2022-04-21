function draw_stacked_bar_plot(violence_data, max_protest_participants, selected_country) {

    d3.select('#stacked_bar_chart').select('svg').remove()

    const data = Array.from(violence_data.values());
    const years = Array.from(violence_data.keys()).sort();
    const catergories = ['violent',
        'non_violent'];

    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 20, left: 80 },
        width = 1600 - margin.left - margin.right,
        height = 90 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#stacked_bar_chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // svg.append("text")
    //     .attr("text-anchor", "start")
    //     .attr("y", -5)
    //     .attr("x", 0)
    //     .text("V"
    var x = d3.scaleBand()
        .domain(years)
        .range([0, width])
        .padding([0.2])
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSizeOuter(0));


    const color = d3.scaleOrdinal()
        .domain(catergories)
        .range(['#e41a1c', '#4daf4a'])

    const y = d3.scaleLinear()
        .domain([0, max_protest_participants])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y).ticks(4));

    const stackedData = d3.stack()
        .keys(catergories)
        (data)
    console.log(stackedData)


    svg.append("g")
        .selectAll("g")
        // Enter in the stack data = loop key per key = group per group
        .data(stackedData)
        .enter().append("g")
        .attr("fill", function (d) { return color(d.key); })
        .selectAll("rect")
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data(function (d) { return d; })
        .enter().append("rect")
        .attr("x", function (d) { return x(d.data.year); })
        .attr("y", function (d) { return y(d[1]); })
        .attr("height", function (d) { return y(d[0]) - y(d[1]); })
        .attr("width", x.bandwidth())
}