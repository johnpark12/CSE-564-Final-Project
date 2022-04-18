
var width = 900
var height = 480

var projection = d3.geoMercator()
    .translate([ width/2, height/2 ])

    let mouseOver = function(d) {
      d3.selectAll(".Country")
        .transition()
        .duration(200)
        .style("opacity", .5)
      d3.select(this)
        .transition()
        .duration(2)
        .style("opacity", 1)
        .style("stroke", "#7967ff")
    }
  
    let mouseLeave = function(d) {
      d3.selectAll(".Country")
        .transition()
        .duration(200)
        .style("opacity", .8)
      d3.select(this)
        .transition()
        .duration(2)
        .style("stroke", "#7967ff")
    }


var svg = d3.select("#bubble_map")
  .attr("class","mdl-shadow--2dp mdl-cell mdl-cell--6-col mdl-grid text-aligin--center")
  .append("svg")
  .attr("width", width)
  .attr("height", height)

// Need to add the bubbles once we get the data

var g = svg.append("g")
 
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson", function(data){

    g.selectAll("path")
    .data(data.features)
    .enter()
    .append("path")
      .attr("fill", "white")
      .attr("d", d3.geoPath()
          .projection(projection)
      )
    .style("stroke", "#7967ff")
    .style("opacity",0.3)
    .attr("class", function(d){ return "Country" } )
    .style("opacity", .8)
    .on("mouseover", mouseOver )
    .on("mouseleave", mouseLeave )
    
})

var zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on('zoom', function() {
          g.selectAll('path')
           .attr('transform', d3.event.transform);
});

svg.call(zoom);
