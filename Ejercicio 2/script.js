data = [
  {date: '30/08', cases: 1965, tests: 34769},
  {date: '29/08', cases: 2037, tests: 32237},
  {date: '28/08', cases: 1870, tests: 30274},
  {date: '27/08', cases: 1737, tests: 27019}
];

colors = ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78'];


d3.select("#title-cont").append("h1").text("Últimos datos del COVID en Chile");

d3.select("#day-head").append("th").text("Día");
d3.select("#tests-head").append("th").text("Tests");
d3.select("#cases-head").append("th").text("Contagiados");

d3.selectAll(".day").text((d, i) => data[i].date);
d3.selectAll(".tests").text((d, i) => data[i].tests);
d3.selectAll(".cases").text((d, i) => data[i].cases);

d3.selectAll(".odd").style("background-color", "#cccccc");
d3.selectAll("td").style("width", "100px").style("text-align", "center");

d3.select("#plot-title").text("Numero de Test");

const svg = d3.select('#plot-cont').append("svg");

svg.style("width", "400").style("height", "400");

svg
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("width", 30)
  .attr("y", (d, i) => 180 - d.tests / 200)
  .attr("x", (d, i) => i * 50)
  .attr("height", (d, i) => d.tests / 200)
  .attr("fill", (d, i) => colors[i])
  
svg
.append("text")
.attr("y", (d, i) => 195)
.attr("x", (d, i) => i * 50)
.text((d, i) => data[i].date)

