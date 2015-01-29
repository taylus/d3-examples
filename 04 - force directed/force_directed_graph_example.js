(function() {
    "use strict";
    var SVG_WIDTH = 800;
    var SVG_HEIGHT = 500;

    //add the svg viewport to the DOM
    var svg = d3.select("body").append("svg");
    svg.attr("width", SVG_WIDTH);
    svg.attr("height", SVG_HEIGHT);

    //define graph nodes with arbitrary data
    var graphNodes = [
        { name: 'A' },
        { name: 'B' },
        { name: 'C' },
        { name: 'D' },
        { name: 'E' }
    ];

    //define graph edges with source and target nodes
    //these can be array indexes, which d3.js will resolve into nodes when start() is called on the force layout
    //since I'm specifying arbitrary keys on the nodes instead, I need to resolve them to nodes manually
    var graphEdges = [
        { source: 'A', target: 'B' },
        { source: 'A', target: 'C' },
        { source: 'A', target: 'D' },
        { source: 'A', target: 'E' },
        { source: 'B', target: 'C' },
        { source: 'B', target: 'D' },
        { source: 'B', target: 'E' },
        { source: 'C', target: 'D' },
        { source: 'C', target: 'E' },
        { source: 'D', target: 'E' }
    ];

    //gets the only element in the given array satisfying the given callback
    //throws an exception if anything but exactly one element satisfies the callback
    function single(array, callback) {
        var results = array.filter(callback);
        if (results.length < 1) throw "No element found.";
        if (results.length > 1) throw "Multiple elements found.";
        return results[0];
    }

    //postprocess the graph edges, resolving each source and target into nodes
    for(var i = 0; i < graphEdges.length; i++) {
        graphEdges[i].source = single(graphNodes, function(n) { return n.name === graphEdges[i].source; });
        graphEdges[i].target = single(graphNodes, function(n) { return n.name === graphEdges[i].target; });
    }

    //create a d3.js force layout
    var forceLayout = d3.layout.force()
        .nodes(graphNodes)
        .links(graphEdges)
        .size([SVG_WIDTH, SVG_HEIGHT])
        .linkDistance(150)
        .charge(-1000)
        .start();

    //add edges as SVG lines
    var edges = svg.selectAll("line")
        .data(graphEdges)
        .enter()
        .append("line")
        .attr("stroke", "gray")
        .attr("stroke-width", "2px");
        
    //add nodes as SVG groups containing circles and text
    //note: put the drag call on the groups, not the circles
    var nodeGroups = svg.selectAll("g")
        .data(graphNodes)
        .enter()
        .append("g")
        .attr("desc", "node")
        .call(forceLayout.drag);

    //add circles to the node groups
    var colorScale = d3.scale.category10();
    var nodes = nodeGroups
        .append("circle")
        .attr("r", 20)
        .attr("fill", function(d, i) { return colorScale(i); });

    //add centered text labels to the node groups
    var labels = nodeGroups
        .append("text")
        .attr("dy", "0.33em")
        .text(function(d) { return d.name; });
        
    forceLayout.on("tick", function() {
        nodeGroups.attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")"; });
        edges.attr("x1", function(d) { return d.source.x; })
             .attr("y1", function(d) { return d.source.y; })
             .attr("x2", function(d) { return d.target.x; })
             .attr("y2", function(d) { return d.target.y; });
    });
}());