// $.ajax({
//     type: "GET",
//     contentType: "application/json; charset=utf-8",
//     url: '/users/repo/data',
//     dataType: 'json',
//     success: function (data) {
//         draw(data);
//     },
//     error: function (result) {
//         error();
//     }
// });

// function draw(data) {
//     var color =  d3.scaleOrdinal(d3.schemeCategory20b);
//     console.log("In draw", color)
//     var width = 420,
//         barHeight = 20;
 
//     var x =  d3.scaleLinear()
//         .range([0, width])
//         .domain([0, d3.max(data)]);
 
//     var chart = d3.select("#graph")
//         .attr("width", width)
//         .attr("height", barHeight * data.length);
 
//     var bar = chart.selectAll("g")
//         .data(data)
//         .enter().append("g")
//         .attr("transform", function (d, i) {
//                   return "translate(0," + i * barHeight + ")";
//               });
 
//     bar.append("rect")
//         .attr("width", x)
//         .attr("height", barHeight - 1)
//         .style("fill", function (d) {
//                    return color(d)
//                })
 
//     bar.append("text")
//         .attr("x", function (d) {
//                   return x(d) - 10;
//               })
//         .attr("y", barHeight / 2)
//         .attr("dy", ".35em")
//         .style("fill", "white")
//         .text(function (d) {
//                   return d;
//               });
// }
 
// function error() {
//     console.log("error")
// }





// var todo = {}
// var links = []
// var done = false
// username = "nikitasinha20"
// repo = "split_app"
// var base = "https://api.github.com/repos/" + username + "/" + repo + "/commits"
// var handle
// $.ajax({
//     url : base, dataType : 'json', 
// 	async : false, 
//     success: function (json) {
//         { 
//             // console.log("******",json[0])
//             todo[json[0].sha] = true
//         }
//     },
//     error: function (result) {
//         error();
//     }
// });

// function isEmpty(obj) {
//     for(var prop in obj) {
//       if (Object.prototype.hasOwnProperty.call(obj, prop)) {
//         return false;
//       }
//     }
//     return true;
//   }
  
//   function discoverLinks(json){
//       for (var i = 0; i < json.parents.length; i++) 
//       {
//           links.push({source: json.sha, target: json.parents[i].sha})
//           todo[json.parents[i].sha] = true
//       }
//       todo[json.sha] = false
//   }
  
//   function doLayer() {
//       done = true
//       for (prop in todo) 
//       {
//           if (todo[prop])
//           {
//               done = false
//               $.getJSON(base + "/" + prop, discoverLinks);
//           }
//       }
//       if (done) 
//       {
//           clearInterval(handle); 
//           finished()
//       }
//   }
//   handle = setInterval(doLayer,200);
  
//   function finished() 
//   {
//       var nodes = {};

//     // var nodes = [{x: 30, y: 50},
//     //     {x: 50, y: 80},
//     //     {x: 90, y: 120}]
  
//       // Compute the distinct nodes from the links.
//       links.forEach(function(link) {
//         link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
//         link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
//       });
  
//       nodes = d3.values(nodes)

//     var links = [
//         {source: nodes[0], target: nodes[1]},
//         {source: nodes[2], target: nodes[1]}
//       ]
      

//       console.log("nodes", nodes)

//       var w = 900,
//           h = 400,
//           fill =d3.scaleOrdinal(d3.schemeCategory20);
  
//       var vis = d3.select("#chart")
//         // .append("svg:svg")
//           .attr("width", w)
//           .attr("height", h);
  
//     //   var force = d3.forceSimulation(nodes)
//     //     .force("charge",d3.forceManyBody(-120))
//     //     .force("link", d3.forceLink(links))
//     //     .force("size",d3.forceX([w]))
//     //     .force("size",d3.forceY([h]));
  
//       var link = vis.selectAll("line.link")
//         .data(links)
//         .enter()
//         .append("line")
//         .attr("class", "link")
//         // .style("stroke-width", function(d) { return Math.sqrt(d.value); })
//         .attr("x1", function(d) { return d.source.x; })
//         .attr("y1", function(d) { return d.source.y; })
//         .attr("x2", function(d) { return d.target.x; })
//         .attr("y2", function(d) { return d.target.y; });

//     //   var drag = force.drag()
//     //     .on("dragstart", dragstart);
  
//       var node = vis.selectAll("circle.nodes")
//         .data(nodes)
//         .enter().append("svg:circle")
//         .attr("class", "nodes")
//         .attr("cx", function(d) { return d.x; })
//         .attr("cy", function(d) { return d.y; })
//         .attr("r", "10px")
//         .attr("fill", "black")
//         // .style("fill", function(d) { return fill(d.group); })
//         // .call(d3.drag()
//         //     .on("start", dragstart));
  
//     //   node.append("svg:title")
//     //     .text(function(d) { return d.name; });
  
//     //   vis.style("opacity", 1e-6)
//     //   .transition()
//     //     .duration(1000)
//     //     .style("opacity", 1);
  
//     //   force.on("tick", function() {
//     //   link.attr("x1", function(d) { return d.source.x; })
//     //       .attr("y1", function(d) { return d.source.y; })
//     //       .attr("x2", function(d) { return d.target.x; })
//     //       .attr("y2", function(d) { return d.target.y; });
  
//     //   node.attr("cx", function(d) { return d.x; })
//     //       .attr("cy", function(d) { return d.y; });
//     //   });
//   }
//   function dragstart(d) {
//     d.fixed = true;
//   }

//   function error() {
//     console.log("error")
// }




var todo = {}
username = "nikitasinha20"
repo = "split_app"
var base = "https://api.github.com/repos/" + username + "/" + repo + "/commits"
var links = []
var done = false
var handle
$.ajax(
{
	url : base, dataType : 'json', 
	async : false, 
	success : function(json) 
	{ 
		todo[json[0].sha] = true
	}
})

function isEmpty(obj) {
  for(var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }
  return true;
}

function discoverLinks(json){
	for (var i = 0; i < json.parents.length; i++) 
	{
		links.push({source: json.sha, target: json.parents[i].sha})
		todo[json.parents[i].sha] = true
	}
	todo[json.sha] = false
}

function doLayer() {
	done = true
	for (prop in todo) 
	{
		if (todo[prop])
		{
			done = false
			$.getJSON(base + "/" + prop, discoverLinks);
		}
	}
	if (done) 
	{
		clearInterval(handle); 
		finished()
	}
}
handle = setInterval(doLayer,200);

function finished() 
{
	var nodes = {};

	// Compute the distinct nodes from the links.
	links.forEach(function(link) {
	  link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
	  link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
	});

    nodes = d3.values(nodes)
    
    console.log("nodes:",nodes)

	var w = 900,
	    h = 500,
	    fill = d3.scaleOrdinal(d3.schemeCategory20);

	var vis = d3.select("#chart")
	//   .append("svg:svg")
	    .attr("width", w)
	    .attr("height", h);

	// var force = d3.layout.force()
	//   .charge(-120)
	//   .linkDistance(30)
	//   .nodes(nodes)
	//   .links(links)
	//   .size([w, h])
    //   .start();
      
      var force = d3.forceSimulation(nodes)
        .force("charge",d3.forceManyBody(-120))
        .force("link", d3.forceLink(links))
        .force("size",d3.forceX([w]))
        .force("size",d3.forceY([h]));

	var link = vis.selectAll("line.link")
	  .data(links)
      .enter()
      .append("line")
	  .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); })
    //   .style("stroke", "rgb(6,120,155)")
	  .attr("x1", function(d) { return d.source.x; })
	  .attr("y1", function(d) { return d.source.y; })
	  .attr("x2", function(d) { return d.target.x; })
	  .attr("y2", function(d) { return d.target.y; });

	var node = vis.selectAll("circle.node")
	  .data(nodes)
      .enter()
      .append("circle")
	  .attr("class", "node")
	  .attr("cx", function(d) { return d.x; })
	  .attr("cy", function(d) { return d.y; })
	  .attr("r", 10)
	  .style("fill", function(d) { return fill(d.group); })
	//   .call(force.drag);

	// node.append("svg:title")
	//   .text(function(d) { return d.name; });

	vis.style("opacity", 1e-6)
	.transition()
	  .duration(1000)
	  .style("opacity", 1);

	force.on("tick", function() {
	link.attr("x1", function(d) { return d.source.x; })
	    .attr("y1", function(d) { return d.source.y; })
	    .attr("x2", function(d) { return d.target.x; })
	    .attr("y2", function(d) { return d.target.y; });

	node.attr("cx", function(d) { return d.x; })
	    .attr("cy", function(d) { return d.y; });
	});
}