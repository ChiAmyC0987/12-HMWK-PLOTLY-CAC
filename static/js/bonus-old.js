function buildMetadata(sample) {

    // @TODO: Complete the following function that builds the metadata panel
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
  
  // Build a guage based on the sample (patient's)
      // wash frequency (sample.WFREQ) in the metadata set

      var data = [{
        domain: {
          x: [0, 1],
          y: [0, 1]}, 
          value: sample.WFREQ , 
        title: {
          text: "Weekly Cleaning"},
        type: "indicator", 
        mode: "gauge+number"}];
  
      var layout = {width: 500, height: 500, margin: {t: 0, b: 0}};
      Plotly.newPlot('gauge', data, layout);    
      });
    });
  };
  
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
  };
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  };
  
  // Initialize the dashboard
  init();