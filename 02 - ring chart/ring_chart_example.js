(function() {
    "use strict";
    function radiansToDegrees(r) {
        return Math.round((r / Math.PI) * 180);
    }

    var SVG_WIDTH = 500
    var SVG_HEIGHT = SVG_WIDTH;

    //add the SVG viewport to the DOM
    var svg = d3.select("body").append("svg");
    svg.attr("width", SVG_WIDTH);
    svg.attr("height", SVG_HEIGHT);

    //make an arbitrary data set, then use d3.js to calculate
    //pie chart arc start/end angles given each data point's relative value
    console.log("Using dataset:");
    var dataSet = [1, 2, 5, 10];
    console.log(dataSet);
    var arcs = d3.layout.pie()(dataSet);
    console.log("Generated arcs from dataset:");
    console.log(arcs.map(function(a) { 
        return {
            value: a.value,
            startAngle: radiansToDegrees(a.startAngle),
            endAngle: radiansToDegrees(a.endAngle)
        }; 
    }));

    //create a d3 arc generator with the given inner/outer radii
    //this is an object that maps arc objects (above) into SVG paths,
    //which are plotted onto the screen to draw the pie chart
    var outerRadius = SVG_WIDTH / 2;
    var innerRadius = outerRadius - 80;  //set to zero to make a pie chart
    var arcGenerator = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

    //create SVG groups for each arc and label
    var arcGroups = svg.selectAll("g")
        .data(arcs)
        .enter()
        .append("g")
        .attr("transform", "translate(" + outerRadius + ", " + outerRadius + ")");

    //use the arc generator to compute filled SVG paths for each arc
    var colorScale = d3.scale.category10();
    arcGroups.append("path")
        .attr("fill", function(d, i) { return colorScale(i); })
        .attr("d", arcGenerator)
        .call(function(path) { 
            console.log("Generated paths from arcs:");
            console.log(path); 
        });
        
    //add text labels to each arc
    arcGroups.append("text")
        .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";})
        .attr("dy", "12px")
        .attr("text-anchor", "middle")
        .text(function(d) { return d.value });
}());