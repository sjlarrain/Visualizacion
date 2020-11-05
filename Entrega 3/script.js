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

const interpreter = (d) => {
    return {id: d.id,
            name: d.name,
            latitude: parseFloat(d.latitude),
            longitude: parseFloat(d.longitude),
            price: parseInt(d.price),
            room_type:d.room_type,
            number_of_reviews: parseInt(d.number_of_reviews)
        }
}


d3.json("neighbourhoods.geojson").then((datos) => {
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
        
    d3.csv("listings.csv", interpreter).then((datos_csv) => {
        
        const data = datos_csv.filter((d) => d.number_of_reviews > 100)
        const maxPrice = d3.extent(data, (d) => d.price)

        const colorScale = d3.scaleSequential()
                            .interpolator(d3.interpolateRdYlGn) 
                            .domain([-maxPrice[1], -maxPrice[0]])
                            
        
        g.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", (d) => proyeccion([d.longitude, d.latitude])[0])
            .attr("cy", (d) => proyeccion([d.longitude, d.latitude])[1])
            .attr("r", 2)
            .attr("fill", (d) => colorScale( - d.price));
    
    })
    
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
    


 

