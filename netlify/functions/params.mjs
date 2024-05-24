import * as d3 from "d3";
import jsdom from "jsdom";

const { JSDOM } = jsdom;

const { document } = (new JSDOM('')).window;
global.document = document;

exports.handler = async (event, context) => {
  var width = Number(event.queryStringParameters["width"]);
  var height = Number(event.queryStringParameters["height"]);
  var radius = Number(event.queryStringParameters["radius"]);
  
	try {

    var body = d3.select(document).select("body");

    var svg = body.append("svg")
	    .attr("id", "demo7")
	    .attr("width", width)
	    .attr("height", height)
		
    var group = svg.append("g")
		  .attr("transform","translate("+width/2+","+height/2+")");
		
		group.append("g")
		  .attr("class","rects")
		group.append("g")
		  .attr("class","links")
		group.append("g")
		  .attr("class","nodes")

		// <script>

		var data = {"name": "A", "children": [
		                {"name": "B"},
		                {"name": "C", "children": [
		                    {"name": "E"},
		                    {"name": "F"}
		                ]},
		                {"name": "D"},
		                {"name": "G"},
		                {"name": "H", "children": [
		                    {"name": "I"},
		                    {"name": "J"}
		                ]},
		                {"name": "K"},
		                {"name": "L"},
		                {"name": "M", "children": [
		                  {"name": "M"},
		                  {"name": "N"}
		                ]},
		                {"name": "O"}
		            ]};

		var root = d3.hierarchy(data)
		  .sort((a,b) => b.height - a.height || a.data.name.localeCompare(b.data.name));

		var treeLayout = d3.cluster()
		    .size([360, radius]);

		treeLayout(root);

		var svg7 = d3.select("#demo7");

		// draw nodes
		svg7.select('g.nodes')
		  .selectAll('circle.node')
		  .data(root.descendants())
		  .enter()
		  .append('circle')
		  .classed('node', true)
		  .attr('cx', 0)
		  .attr('cy', d => -d.y)
		  .attr('r', 5)
		  .attr("fill", "lightblue")
		  .attr('stroke', "darkgray")
		  .attr('stroke-width', 1)
		  .attr("transform", d => `
		      rotate(${d.x}, 0, 0)
		  `);

		var lineGen = d3.lineRadial()
		  .angle(d => d.x * Math.PI / 180)
		  .radius(d => d.y);

		var linkGen =  d3.linkRadial()
		  .angle(d => d.x * Math.PI / 180)
		  .radius(d => d.y);

		// draw links
		svg7.select('g.links')
		  .selectAll('path.link')
		  .data(root.links())
		  .enter()
		  .append("path")
		  .classed('link', true)
		  .attr('stroke', "darkgray")
		  .attr('stroke-width', 2)
		  //.attr("d", linkGen);
		  .attr("d", (d) => lineGen([d.target, d.source]));
    
	  // </script>

		return {
      statusCode: 200,
      headers: {
        'Content-type': 'text/html; charset=UTF-8',
      },
      body: body.node().innerHTML
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      }),
    };
  }
};