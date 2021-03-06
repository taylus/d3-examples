(function() {
    "use strict";
    function radiansToDegrees(r) {
        return Math.round((r / Math.PI) * 180);
    }

    function degreesToRadians(d) {
        return (d / 180) * Math.PI;
    }

    var SVG_WIDTH = 900
    var SVG_HEIGHT = 500;
    var PIE_WIDTH = SVG_HEIGHT;
    var PIE_HEIGHT = PIE_WIDTH;

    //add the SVG viewport to the DOM
    var svg = d3.select("body").append("svg");
    svg.attr("width", SVG_WIDTH);
    svg.attr("height", SVG_HEIGHT);

    //data source
    var arcs = [ 
        {startAngle: degreesToRadians(60), endAngle: degreesToRadians(120), color: 'transparent'},
        {startAngle: degreesToRadians(120), endAngle: degreesToRadians(420), color: 'yellow'}
    ];

    //create a d3 arc generator with the given inner/outer radii
    //this is an object that maps arc objects (above) into SVG paths,
    //which are plotted onto the screen to draw the pie chart
    var outerRadius = PIE_WIDTH / 2;
    var innerRadius = 0;
    var arcGenerator = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

    //add an SVG arc for each arc object in the data source, 
    //with its path data calculated by the arc generator
    var arcPaths = svg.selectAll("path")
        .data(arcs)
        .enter()
        .append("path")
        .attr("transform", "translate(" + outerRadius + ", " + outerRadius + ")")
        .attr("fill", function(d) { return d.color; })
        .attr("d", arcGenerator);
        
    //draw a legend for the chart
    //this is crappy and full of magic numbers but w/e
    var legendGroup = svg.append("g")
        .attr("id", "legend");
        
    var legendDataGroupOne = legendGroup.append("g")
        .attr("transform", "translate(" + PIE_WIDTH + ", " + ((PIE_HEIGHT / 2) - 65) + ")")
        
    legendDataGroupOne.append("rect")
        .attr("width", 50)
        .attr("height", 50)
        .attr("rx", 5)
        .attr("fill", "yellow");
        
    legendDataGroupOne.append("text")
        .attr("class", "legendlabel")
        .attr("x", 70)
        .attr("y", 32)
        .text("Resembles Pac-Man");
        
    var legendDataGroupTwo = legendGroup.append("g")
        .attr("transform", "translate(" + PIE_WIDTH + ", " + ((PIE_HEIGHT / 2) + 15) + ")")
        
    legendDataGroupTwo.append("rect")
        .attr("width", 50)
        .attr("height", 50)
        .attr("rx", 5)
        .attr("fill", "white");
        
    legendDataGroupTwo.append("text")
        .attr("x", 70)
        .attr("y", 32)
        .text("Does Not Resemble Pac-Man");
}());