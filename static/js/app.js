console.log("This is app.js");
// This assignment was based on Dom's demo on the Belly Button Biodiversity homework

// Global variable to hold URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// function for bar graph
function DrawBargraph(sampleId){
    console.log(`DrawBargraph(${sampleId})`);

    d3.json(url).then(data =>{
        console.log(data);

        let samples = data.samples;
        let resultArray = samples.filter(s => s.id == sampleId);
        let result = resultArray[0];

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        let yticks = otu_ids.slice(0,10).map(otuId => `OTU ${otuId}`).reverse();
        
        // Create a trace object
        let barData = {
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            type : "bar",
            text : otu_labels.slice(0,10).reverse(),
            orientation: "h"
        };

        // Put the trace object into an array
        let barArray = [barData];

        // Create a layout object
        let barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}
        }
        // Call the Plotly function
        Plotly.newPlot("bar", barArray, barLayout);
    });
}

// function for bubblechart
function DrawBubblechart(sampleId){
    console.log(`DrawBublechart(${sampleId})`);

    d3.json(url).then(data =>{
        console.log(data);

        let samples = data.samples;
        let resultArray = samples.filter(s => s.id == sampleId);
        let result = resultArray[0];

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        // Create a trace
        let bubbleData = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };
        // Put the trace into an array
        let bubbleArray = [bubbleData];
        // Create a layout object
        let bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            margin: {t : 30},
            hovermode: "closest",
            xaxis: { title: "OTU ID"}
        }
        // Call Plotly
        Plotly.newPlot("bubble", bubbleArray, bubbleLayout);
    });
}

// function for the demographic info box
function ShowMetadata(sampleId){
    d3.json(url).then(data =>{

        let Metadata = data.metadata;

        console.log(Metadata);

        let resultArray = Metadata.filter(s => s.id == sampleId);
        let result = resultArray[0];

        let demographicInfo = d3.select("#sample-metadata");
        // Clear out the demographic info box before displaying the new info to the panel
        demographicInfo.html("");

        // Get the demographic data for the id and add the info to the panel
        Object.entries(result).forEach(([key,value]) => {   
        demographicInfo.append("h4").text(`${key.toUpperCase()}: ${value}`);   
        });
    });
    
    console.log(`ShowMetadata(${sampleId})`);
}

// optional gauge
function DrawGauge(sampleId){
    console.log(`DrawGauge(${sampleId})`);
}

function optionChanged(sampleId){
    console.log(`optionChanged: ${sampleId}`);
    DrawBargraph(sampleId);
    DrawBubblechart(sampleId);
    ShowMetadata(sampleId);
    DrawGauge(sampleId);
}
function InitDashboard(){

    console.log('InitDashboard()');
    // Initialise the dropdown
    let selector = d3.select("#selDataset");


    d3.json(url).then(data => {
        // This is what I want to run with my data
        console.log(data);

        let sampleNames = data.names;
        console.log("Here are the sample names:", sampleNames);

        // Populating the dropdown
        for (let i = 0; i < sampleNames.length; i++){
            let sampleId = sampleNames[i];
            // console.log(`sampleId = ${sampleId}`);
            selector.append("option").text(sampleId).property("value", sampleId);
        }

        // Read the current value from the dropdown
        let initialId = selector.property("value");
        console.log(`initialID = ${initialId}`);
        // Draw the bargraph for the selected sample id
        DrawBargraph(initialId);
        // Draw the bubblechart for the selected sample id
        DrawBubblechart(initialId);
        // Show the metadata for the selected sample id
        ShowMetadata(initialId);
    });
}
InitDashboard();