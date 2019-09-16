    //////////////////////// BONUS: Build the Gauge Chart/////////////////////////////
    // buildGauge(data.WFREQ);
    // Build a guage based on the sample (patient's)
    // wash frequency (sample.WFREQ) in the metadata set
    var data = [{domain: {x: [0, 1], y: [0, 1]}, value: sample.WFREQ , title: {text: "Weekly Cleaning"},
    type: "indicator", mode: "gauge+number"}];

    var layout = {width: 500, height: 500, margin: {t: 0, b: 0}};
    Plotly.newPlot('gauge', data, layout);
    ////////////////// @TODO: End Guage Chart using the sample data/////////////////


