////////// @TODO: Complete the following function that builds the metadata panel////////
/////////////////////////////////metadata//////////////////////////////////////////////
function buildMetadata(sample) {

  // Use `d3.json` to fetch the metadata for a sample
  var url = "/metadata/" + sample;
  d3.json(url).then(function(sample){

    // Use d3 to select the panel with id of `#sample-metadata`
    var sample_metadata = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    sample_metadata.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(sample).forEach(([key, value]) => {
      var row = sample_metadata.append("p");
      row.text(`${key}: ${value}`);
    })
  })
};


function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url = `/samples/${sample}`;
  d3.json(url).then(function(data) {
    var xValues = data.otu_ids;
    var yValues = data.sample_values;
    var tValues = data.otu_labels;
    var mSize = data.sample_values;
    var mClrs = data.otu_ids;

    /////////////// @TODO: Build a Pie Chart//////////////////////////////////////
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
   



    var trace_pie = {
    labels: ["1795", "922", "944", "2419", "1167", "2859", "2539", "2722", "482", "728"
  ],
    values: ["0.164847778162406", "0.0918068030681218", "0.053528157851586", "0.0391258403629275", "0.0386612494761965", "0.0365933645489825", "0.0352997977663199", "0.0274381911928143", "0.019676790496839", "0.018665622096307"
  ],
   type: "pie"
     };
    var data = [trace_pie];
    var layout = {
    title: "'Pie' Chart",
    };
    Plotly.newPlot("plot", data, layout);

    /////////////// @TODO: Build a Bubble Chart using the sample data////////////
    var trace_bubble = {    
      x: xValues,
      y: yValues,
      text: tValues,
      mode: 'markers',
      marker: {
        size: mSize,
        color: mClrs
      }
    };
    var data = [trace_bubble];
    var layout = {
      xaxis: {title: "OTU ID"}
    };
    Plotly.newPlot('bubble', data, layout);  
    //////////////////////// @TODO: End Bubble Chart using the sample data/////////
    
    //////////////////////// BONUS: Build the Gauge Chart/////////////////////////////
    // buildGauge(data.WFREQ);
    // Build a guage based on the sample (patient's)
    // wash frequency (sample.WFREQ) in the metadata set
    var data = [{domain: {x: [0, 1], y: [0, 1]}, value: sample.WFREQ , title: {text: "Weekly Cleaning"},
    type: "indicator", mode: "gauge+number"}];

    var layout = {width: 500, height: 500, margin: {t: 0, b: 0}};
    Plotly.newPlot('gauge', data, layout);
    ////////////////// @TODO: End Guage Chart using the sample data/////////////////

}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
