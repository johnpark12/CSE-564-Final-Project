
var width = 900
var height = 480

var projection = d3.geoMercator()
    .translate([ width/2, height/2 ])


var svg = d3.select("#bubble_map")
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
    
})

var zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on('zoom', function() {
          g.selectAll('path')
           .attr('transform', d3.event.transform);
});

svg.call(zoom);
