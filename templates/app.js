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
    labels: ["1795", "922", "944", "2419", "1167", "2859", "2539", "2722", "482", "728"],
    values: [16.48, 9.18, 5.35, 3.91, 3.86, 3.65, 3.52, 2.74, 1.96, 1.86],
    growth: ["Bacteria;Firmicutes;Bacilli;Bacillales;Staphylococcaceae;Staphylococcus", 
    "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Corynebacteriaceae;Corynebacterium", 
    "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Corynebacteriaceae;Corynebacterium", 
    "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", 
    "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", 
    "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Peptoniphilus", 
    "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", 
    "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Finegoldia", 
    "Bacteria", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales"],
    type: 'pie'
     };
    var data = [trace_pie];
    var layout = {
    title: "OTU ID Chart",
    };
    Plotly.newPlot("plot", data, layout);
  };
  

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
init()
