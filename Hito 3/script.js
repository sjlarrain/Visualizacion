const size = {
    width: 800,
    height:500
};

const svg = d3.selectAll(".container")
              .append("svg")
              .attr("class", 'svg')
              .attr("width", size.width)
              .attr("height", size.height);

const g = svg.append("g")

d3.json("comunas.geojson").then((datos) => {
    const proyeccion = d3.geoWinkel3().fitSize([size.width, size.height], datos);
    const caminoGeo = d3.geoPath().projection(proyeccion);
    
    g.selectAll("path")
    .data(datos.features)
    .enter()
        .append("path")
        .attr("d", caminoGeo)
        .attr("class", "geopath")
        .attr("fill", "grey")
        .attr("opacity", 0.3)
        .attr("stroke", "grey")
})

const driverZoom = (evento) => {
    const t = evento.transform; 
    g.attr("transform", t);

}
    

const zoom = d3.zoom()
.extent([[0, 0], [size.width, size.height]])
.translateExtent([[0, 0], [size.width, size.height]])
.scaleExtent([1, 150])
.on("zoom", driverZoom);


svg.call(zoom);
