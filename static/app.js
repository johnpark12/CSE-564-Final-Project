

function drawCharts(){

d3.csv("static/updated.csv", function(data) {
    console.log(data)
    var country = getSelectedCountry()
    var new_data = data.filter(function(d){
        return d.country == country
    })
    console.log(country)
    console.log(new_data)
    var filtered_data = new_data.map(function(d) {
        return {
          date: +d.year,  // using year temporarily will need to change to dates later
          gdp: +d.gdppercap,
          urbanization: +d.urbanpop,
          inflation: +d.inflation,
          unemployment: +d.vulnerableEmployment,
        }
      });
    console.log(filtered_data)
    draw_line_chart(filtered_data)

    var table_data = []
    new_data.forEach(function(d, i){
      table_data.push([d.protesteridentity, d.protesterdemands, d.stateresponses]);  // will have to change this later
    });

    TableSort(
      "#table",
      [{text:"Protestor Identity", sort: TableSort.alphabet}, 
      {text:"Protester Demand", sort: TableSort.alphabet},
      {text:"State Response",sort: TableSort.alphabet}],
      table_data,
      {width:"500px",height:"300px"}
      );
})

}