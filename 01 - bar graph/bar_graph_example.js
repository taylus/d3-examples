(function() {
    "use strict";
    function getRandomArray(length) {
        var dataset = new Array(length);
        for(var i = 0; i < length; i++) {
            //fill array with random numbers between 20 and 255 (inclusive)
            dataset[i] = Math.round((Math.random() * 235) + 20);
        }
        return dataset;
    }

    //get a random dataset to display
    var dataset = getRandomArray(25);
    var maxValue = Math.max.apply(Math, dataset);

    //define the width of each bar, and the padding between them
    var BAR_WIDTH = 30;
    var BAR_PADDING = 1;

    //make the svg viewport as big as it needs to be to draw the dataset
    var SVG_WIDTH = dataset.length * (BAR_WIDTH + BAR_PADDING) - BAR_PADDING;
    var SVG_HEIGHT = maxValue;

    //add the svg viewport to the DOM
    var svg = d3.select("body").append("svg");
    svg.attr("width", SVG_WIDTH);
    svg.attr("height", SVG_HEIGHT);

    //add bars to the svg viewport
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("fill", function(d) { return "rgb(0, 0, " + d + ")"; })
        .attr("x", function(d, i) { return i * (BAR_WIDTH + BAR_PADDING); })
        .attr("y", function(d) { return SVG_HEIGHT - d; })	//makes the bars grow up instead of down
        .attr("width", BAR_WIDTH)
        .attr("height", function(d) { return d; });
        
    //add labels to the svg viewport, at the top of and centered within every bar
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d) { return d; })
        .attr("x", function(d, i) { return i * (BAR_WIDTH + BAR_PADDING) + (BAR_WIDTH / 2); })
        .attr("y", function(d) { return SVG_HEIGHT - d + 15; });
}());