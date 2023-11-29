function getPlots(id) {
    // Retrieve data from samples.json
    d3.json("samples.json").then(sampledata => {
        // Log the retrieved data
        console.log(sampledata);

        // Extract necessary data for plotting bar chart
        var ids = sampledata.samples[0].otu_ids;
        console.log(ids);

        var sampleValues = sampledata.samples[0].sample_values.slice(0, 10).reverse();
        console.log(sampleValues);

        var labels = sampledata.samples[0].otu_labels.slice(0, 10);
        console.log(labels);

        // Extract and format top 10 OTU IDs for the plot
        var OTU_top = sampledata.samples[0].otu_ids.slice(0, 10).reverse();
        var OTU_id = OTU_top.map(d => "OTU " + d);
        console.log(`OTU IDS: ${OTU_id}`);

        // Extract top 10 labels for the plot
        var labels = sampledata.samples[0].otu_labels.slice(0, 10);
        console.log(`OTU_labels: ${labels}`);

        // Define trace for the bar plot
        var trace = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
                color: 'orange'
            },
            type: "bar",
            orientation: "h",
        };

        // Define data and layout variables for the bar plot
        var data = [trace];
        var layout = {
            title: "Top 10 OTU",
            yaxis: {
                tickmode: "linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };

        // Create the bar plot
        Plotly.newPlot("bar", data, layout);

        // Define trace for the bubble chart
        var trace1 = {
            x: sampledata.samples[0].otu_ids,
            y: sampledata.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: sampledata.samples[0].sample_values,
                color: sampledata.samples[0].otu_ids
            },
            text: sampledata.samples[0].otu_labels
        };

        // Define layout for the bubble plot
        var layout_2 = {
            xaxis: {
                title: "OTU ID"
            },
            height: 600,
            width: 1000
        };

        // Create data variable for the bubble plot
        var data1 = [trace1];

        // Create the bubble plot
        Plotly.newPlot("bubble", data1, layout_2);
    });
}

function getDemoInfo(id) {
    // Retrieve data from samples.json
    d3.json("samples.json").then((data) => {
        // Extract metadata info for the demographic panel
        var metadata = data.metadata;
        console.log(metadata);

        // Filter metadata info by ID
        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        // Select demographic panel to display data
        var demographicInfo = d3.select("#sample-metadata");

        // Clear the demographic info panel before displaying new data
        demographicInfo.html("");

        // Display necessary demographic data for the ID on the panel
        Object.entries(result).forEach((key) => {
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
}

function optionChanged(id) {
    // Call functions to update plots and demographic info on change event
    getPlots(id);
    getDemoInfo(id);
}

function init() {
    // Select dropdown menu
    var dropdown = d3.select("#selDataset");

    // Read data from samples.json
    d3.json("samples.json").then((data) => {
        console.log(data);

        // Populate dropdown menu with available IDs
        data.names.forEach(function (name) {
            dropdown.append("option").text(name).property("value");
        });

        // Display initial data and plots on the page
        getPlots(data.names[0]);
        getDemoInfo(data.names[0]);
    });
}

// Initialize the page with initial data rendering
init();
