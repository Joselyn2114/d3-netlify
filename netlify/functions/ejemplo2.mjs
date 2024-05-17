import * as d3 from "d3";
import jsdom from "jsdom";

const {
  JSDOM
} = jsdom;

const {
  document
} = (new JSDOM('')).window;
global.document = document;

exports.handler = async (event, context) => {
  try {

    var body = d3.select(document).select("body");
    var svg = body.append("svg")
      .attr("id", "bargraph1")
      .attr("width", 400)
      .attr("height", 100);

    var homeless = [{
      state: "California",
      population: 129972
    }, {
      state: "New York",
      population: 91897
    }, {
      state: "Florida",
      population: 31030
    }, {
      state: "Texas",
      population: 25310
    }, {
      state: "Washington",
      population: 22304
    }];

    var bar = d3.select("#bargraph1")
      .selectAll()
      .data(homeless);

    bar.join("text")
      .text((d) => d.state)
      .attr('x', 96)
      .attr('text-anchor', 'end')
      .attr('y', (d, i) => i * 20 + 17);

    bar.join("rect")
      .attr("height", 19)
      .attr("width", (d) => d.population / 500)
      .attr("x", 100)
      .attr("y", (d, i) => i * 20)
      .attr("fill", "pink");
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