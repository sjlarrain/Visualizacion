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
const nba = svg.append("g")
const nfl = svg.append("g")
const mlb = svg.append("g")

const interpreter = (d) => {
    return {AB:d.ABBREVIATION,
        NAME: d.NAME,
        CITY: d.CITY,
        CONFERENCE: d.CONFERENCE,
        DIVISION: d.DIVISION,
        longitude: parseFloat(d.longitude),
        latitude: parseFloat(d.latitude)
        }
};



const locations = (ciudad) => {
    console.log(ciudad)
    d3.json("cities_keys.json").then((datos)=>{
        console.log([datos[ciudad].longitude, datos[ciudad].latitude])
        const lista = [datos[ciudad].longitude, datos[ciudad].latitude]
        return lista
    })
    .catch((err) => {
        console.log("Error")
        console.log(err)
        return [datos[0].longitude, datos[0].latitude]
    })
}

d3.json("json_locations/usa.geojson").then((datos) => {
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
        
    d3.csv("csv_locations/mlb_teams_loc.csv", interpreter).then((datos)=>{
        console.log(datos)
        mlb.selectAll("circle")
            .data(datos)
            .enter()
            .append("circle")
            .attr("cx", (d) => proyeccion([d.longitude, d.latitude])[0])
            .attr("cy", (d) => proyeccion([d.longitude, d.latitude])[1])
            .attr("r", 3)
            .attr("fill", "red")
    })
    d3.csv("csv_locations/nfl_teams_loc.csv", interpreter).then((datos)=>{
        console.log(datos)
        nfl.selectAll("circle")
            .data(datos)
            .enter()
            .append("circle")
            .attr("cx", (d) => proyeccion([d.longitude, d.latitude])[0])
            .attr("cy", (d) => proyeccion([d.longitude, d.latitude])[1])
            .attr("r", 3)
            .attr("fill", "green")
    })
    d3.csv("csv_locations/nba_teams_loc.csv", interpreter).then((datos)=>{
        console.log(datos)
        nba.selectAll("circle")
            .data(datos)
            .enter()
            .append("circle")
            .attr("cx", (d) => proyeccion([d.longitude, d.latitude])[0])
            .attr("cy", (d) => proyeccion([d.longitude, d.latitude])[1])
            .attr("r", 3)
            .attr("fill", "blue")
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
    


 

