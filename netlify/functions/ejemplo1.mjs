import * as d3 from "d3";
import jsdom from "jsdom";

const { JSDOM } = jsdom;

const { document } = (new JSDOM('')).window;
global.document = document;

exports.handler = async (event, context) => {
  try {

   var body = d3.select(document).select("body");

   var svg = body.append("svg")
	    .attr("id", "dataSVG")
	    .attr("width", 400)
	    .attr("height", 60)

    // <script>
    var arr2 = [[1,2,3],[4,5,6]];

    var g_nodes = d3.select('#dataSVG')
      .selectAll('g')
      .data(arr2)
      .join('g');

    var c_nodes = g_nodes.selectAll('circle')
      .data(d => d)
      .join('circle');
  
    c_nodes.attr('r', d => d * 3)
      .attr('cx' , d => 55 * d)
      .attr('cy', 30)
     .attr('fill', 'pink');
    
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