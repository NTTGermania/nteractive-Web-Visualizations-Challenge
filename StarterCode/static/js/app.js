console.log("This is app.js");
// This assignment was based on Dom's demo on the Belly Button Biodiversity homework

function DrawBargraph(sampleId){
    console.log(`DrawBargraph(${sampleId})`);
}

function DrawBubblechart(sampleId){
    console.log(`DrawBublechart(${sampleId})`);
}

function ShowMetadata(sampleId){
    console.log(`ShowMetadata(${sampleId})`);
}

function DrawGauge(sampleId){
    console.log(`DrawGauge(${sampleId})`);
}


function InitDashboard(){

    console.log('InitDashboard()');
    // Initialise the dropdown
    let selector = d3.select("#selDataset");

    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

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