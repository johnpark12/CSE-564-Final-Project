

function drawCharts(){

d3.csv("static/updated.csv", function(data) {
    console.log(data)
    var country = getSelectedCountry()
    var start = getStartTime();
    var end = getEndTime();

    var new_data;

    //console.log(country)
    //console.log(isFinite(start))

    if(country=="" && start==Number.NEGATIVE_INFINITY ){
        //none are selected
    }
    else if(country!="" && !isFinite(start)){
        // only country is selected
        new_data= data.filter(function(d){
          return d.country == country
      })
    }
    else if(country=="" && start!=Number.NEGATIVE_INFINITY ){
        // only time is selected
        new_data = data.filter(function(d){
          return (d.year>=start) && (d.year<=end)
      })

    }
    else if(country!="" && start!=Number.NEGATIVE_INFINITY ){
      // both are selected
      var new_data_country = data.filter(function(d){
        return d.country == country
      })
      new_data = new_data_country.filter(function(d){
        return (d.year>=start) && (d.year<=end)
      })
    }

    // console.log(country)
    // console.log(new_data)
    var filtered_data = new_data.map(function(d) {
        return {
          date: +d.year,  // using year temporarily will need to change to dates later
          gdp: +d.gdppercap,
          urbanization: +d.urbanpop,
          inflation: +d.inflation,
          unemployment: +d.vulnerableEmployment,
          source: d.sources,
          note: d.notes
        }
      });

    console.log(filtered_data)

    draw_line_chart(filtered_data)

    var table_data = []
    filtered_data.forEach(function(d, i){
      table_data.push([d.note, d.source]);  
    });

    TableSort(
      "#table",
      [{text:"Description", sort: TableSort.alphabet}, 
      {text:"Sources", sort: TableSort.alphabet}
      ],
      table_data,
      {width:"500px",height:"300px"}
      );
})

}

function drawBarChart(){
  d3.csv("static/updated.csv", function(data) {

    const violence_data = new Map();
      let max_protest_participants = 0;
      data.forEach(function (d) {
        if (!violence_data.has(d.year)) {
          violence_data.set(d.year, {
            year: d.year,
            violent: 0,
            non_violent: 0,
          })
        };
  
        const toChange = violence_data.get(d.year);
        if (d.participants !== "nan") {
          if (+d.protesterviolence === 1) {
            toChange.violent += parseInt(d.participants);
            max_protest_participants = Math.max(max_protest_participants, toChange.violent);
          }
          if (+d.protesterviolence === 0) {
            toChange.non_violent += parseInt(d.participants);
            max_protest_participants = Math.max(max_protest_participants, toChange.non_violent);
          }
        }
  
      });
   
    draw_stacked_bar_plot(violence_data, max_protest_participants, selected_country);
  })
}

drawBarChart()

drawCharts()