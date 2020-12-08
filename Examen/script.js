const size = {
    width: 800,
    height:600
};

const svg = d3.selectAll(".usa")
              .append("svg")
              .attr("class", 'svg')
              .attr("width", size.width)
              .attr("height", size.height);

const g = svg.append("g")

const interpreter = (d) => {
    return {ID: parseInt(d.ID),
        AB:d.ABBREVIATION,
        NAME: d.NAME,
        CITY: d.CITY,
        CONFERENCE: d.CONFERENCE,
        DIVISION: d.DIVISION
        }
};


d3.json("usa.geojson").then((datos) => {
    const proyeccion = d3.geoMercator().fitSize([size.width, size.height], datos);
    const caminoGeo = d3.geoPath().projection(proyeccion);
    
    g.selectAll("path")
    .data(datos.features)
    .enter()
        .append("path")
        .attr("d", caminoGeo)
        .attr("class", (d) => d.properties.NAME)
        .attr("fill", "grey")
        .attr("opacity", 0.3)
        .attr("stroke", "grey")
        

    
    const driverZoom = (evento) => {
        const t = evento.transform; 
        g.attr("transform", t);

    }
        
    
    const zoom = d3.zoom()
    .extent([[0, 0], [size.width, size.height]])
    .translateExtent([[0, 0], [size.width, size.height]])
    .scaleExtent([1, 4])
    .on("zoom", driverZoom);
    
  
    svg.call(zoom);

})
    


 

