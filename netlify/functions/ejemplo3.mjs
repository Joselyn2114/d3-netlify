import * as d3 from "d3";
import jsdom from "jsdom";

const { JSDOM } = jsdom;

const { document } = (new JSDOM('')).window;
global.document = document;

exports.handler = async (event, context) => {
  try {

    var body = d3.select(document).select("body");
    var svg = body.append("svg")
	    .attr("id", "homeless2")
	    .attr("width", 600)
	    .attr("height", 100);
			
	  var data = [
	      {"state": "California","population": 134278 },
	      {"state": "Florida",   "population": 32190 },
	      {"state": "Washington","population": 21112 },
	      {"state": "New York","population": 89503 },
	      {"state": "Texas","population": 23548 }
	  ];

	  var cScale = d3.scaleLinear()
	      .domain([0,140000])
	      .range(["yellow", "red"]);
    
	  var xScale = d3.scaleLinear()
	      .domain([0,4])
	      .range([50,550]);
    
	  var rScale = d3.scaleLinear()
	      .domain([0,140000])
	      .range([1,30]);

	  var u = d3.select("#homeless2")
	      .selectAll("circle")
	      .data(data)
	      .enter()
	      .append("circle")
	      .attr("cx", (d,i) => xScale(i))
	      .attr("cy", 50)
	      .attr("r", (d) => rScale(d.population))
	      .attr("fill", (d) => cScale(d.population));

	  u = d3.select("#homeless2")
	      .selectAll('text')
	      .data(data)
	      .enter()
	      .append('text')
	      .text((d) => d.state)
	      .attr('x', (d,i) => xScale(i))
	      .attr('y', 95)
	      .attr('text-anchor', 'middle');
    
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