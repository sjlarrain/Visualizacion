
// Mesures 
const size = {
    width: 800,
    height:600
};
const sizeTree = {
    width: 800,
    height:500
};

const margin = {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50,
  };


// SVG & "g" generations  
const svg = d3.selectAll(".usa")
              .append("svg")
              .attr("class", 'svg')
              .attr("width", size.width)
              .attr("height", size.height)
              .style("border", "1px solid black");
const h = svg.append("g")
const g = h.append("g")
const nba = h.append("g")
const nfl = h.append("g")
const mlb = h.append("g")

const mlbTree_svg = d3.selectAll(".MLB_tree")
                    .append("svg")
                    .attr("class", 'svg')
                    .attr("width", sizeTree.width)
                    .attr("height", sizeTree.height)
                    .attr("padding", 0)
                    .style("border", "1px solid black");
const mlbTree = mlbTree_svg.append("g")
                    .attr("width", sizeTree.width - margin.left - margin.right)
                    .attr("height", sizeTree.height - margin.top - margin.bottom)

const nbaTree_svg = d3.selectAll(".NBA_tree")
                    .append("svg")
                    .attr("class", 'svg')
                    .attr("width", sizeTree.width)
                    .attr("height", sizeTree.height)
                    .style("border", "1px solid black");
const nbaTree = nbaTree_svg.append("g")
                    .attr("width", sizeTree.width - margin.left - margin.right)
                    .attr("height", sizeTree.height - margin.top - margin.bottom)

const nflTree_svg = d3.selectAll(".NFL_tree")
                    .append("svg")
                    .attr("class", 'svg')
                    .attr("width", sizeTree.width)
                    .attr("height", sizeTree.height)
                    .style("border", "1px solid black");
const nflTree = nflTree_svg.append("g")
                    .attr("width", sizeTree.width - margin.left - margin.right)
                    .attr("height", sizeTree.height - margin.top - margin.bottom)



// functions
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

const treeBuilder = (raiz, container) => {

    const tree = d3
    .tree()
    .size([
        sizeTree.height - margin.top - margin.bottom,
        sizeTree.width - margin.left - margin.right
        
    ]);

  tree(raiz)
  console.log(raiz)

const linksGenerator = d3
    .linkHorizontal()
    .source((d) => d.source)
    .target((d) => d.target)
    .x((d) => d.y)
    .y((d) => d.x);

    container
    .selectAll("path")
    .data(raiz.links())
    .enter()
    .append("path")
    .attr("d", linksGenerator)
    .attr("stroke", "gray")
    .attr("fill", "none");

    container
    .selectAll("circle")
    .data(raiz.descendants())
    .enter()
    .append("circle")
    .attr("cx", (d) => d.y)
    .attr("cy", (d) => d.x)
    .attr("r", 3);

    container
    .selectAll("text")
    .data(raiz.descendants())
    .enter()
    .append("text")
    .attr("x", (d) => d.y)
    .attr("y", (d) => d.x)
    .text((d) => d.data.NAME)
    .attr("font-size", 12)
    .attr("dy", 4)
    .attr("dx", 4)

}

function mouseover(evento) {
    const clase = this.className.baseVal
    console.log(clase)
    console.log(evento.x,evento.y)
    d3.select(this)
        .attr("r", 10);
  }
function mouseout() {
    const clase = this.className.baseVal
    console.log(clase)
    d3.select(this).attr("r", 3);
}



// Jsons
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
            .join(
                (enter) =>
                enter.append("circle")
                .attr("class", (d) =>`${d.CITY} MLB city`)
                .attr("cx", (d) => proyeccion([d.longitude, d.latitude])[0])
                .attr("cy", (d) => proyeccion([d.longitude, d.latitude])[1])
                .attr("r", 3)
                .attr("fill", "red")
                .attr("transform", "translate (0 0)"),
                
            ).on("mouseover", (evento, d) => {
                d3.select(evento.currentTarget)
                    .attr("r", 10);
                mlb.append("text")
                    .attr("id", "tooltip")
                    .attr("x", 60)
                    .attr("y", 470)
                    .text(`City: ${d.CITY}`);
                mlb.append("text")
                    .attr("id", "tooltip2")
                    .attr("x", 60)
                    .attr("y", 490)
                    .text(`Team: ${d.NAME}`);
                mlb.append("text")
                    .attr("id", "tooltip3")
                    .attr("x", 60)
                    .attr("y", 510)
                    .text("League: MLB")

            }).on("mouseout", (evento, d) => {
                d3.select(evento.currentTarget)
                .attr("r", 3)
                d3.select("#tooltip").remove()
                d3.select("#tooltip2").remove()
                d3.select("#tooltip3").remove()
            })
    })
    d3.csv("csv_locations/nfl_teams_loc.csv", interpreter).then((datos)=>{
        console.log(datos)
        nfl.selectAll("circle")
            .data(datos)
            .join(
                (enter) =>
                enter.append("circle")
                .attr("class", (d) =>`${d.CITY} NFL city`)
                .attr("cx", (d) => proyeccion([d.longitude, d.latitude])[0])
                .attr("cy", (d) => proyeccion([d.longitude, d.latitude])[1])
                .attr("r", 3)
                .attr("fill", "green")
                .attr("transform", "translate (6 0)"),
                
            ).on("mouseover", (evento, d) => {
                d3.select(evento.currentTarget)
                    .attr("r", 10);
                nfl.append("text")
                    .attr("id", "tooltip")
                    .attr("x", 60)
                    .attr("y", 470)
                    .text(`City: ${d.CITY}`);
                nfl.append("text")
                    .attr("id", "tooltip2")
                    .attr("x", 60)
                    .attr("y", 490)
                    .text(`Team: ${d.NAME}`);
                nfl.append("text")
                    .attr("id", "tooltip3")
                    .attr("x", 60)
                    .attr("y", 510)
                    .text("League: NFL")

            }).on("mouseout", (evento, d) => {
                d3.select(evento.currentTarget)
                .attr("r", 3)
                d3.select("#tooltip").remove()
                d3.select("#tooltip2").remove()
                d3.select("#tooltip3").remove()
            })
        })
    d3.csv("csv_locations/nba_teams_loc.csv", interpreter).then((datos)=>{
        console.log(datos)
        nba.selectAll("circle")
            .data(datos)
            .join(
                (enter) =>
                enter.append("circle")
                .attr("class", (d) =>`${d.CITY} NBA city`)
                .attr("cx", (d) => proyeccion([d.longitude, d.latitude])[0])
                .attr("cy", (d) => proyeccion([d.longitude, d.latitude])[1])
                .attr("r", 3)
                .attr("fill", "blue")
                .attr("transform", "translate (-6 0)"),
                
            ).on("mouseover", (evento, d) => {
                d3.select(evento.currentTarget)
                    .attr("r", 10);
                nba.append("text")
                    .attr("id", "tooltip")
                    .attr("x", 60)
                    .attr("y", 470)
                    .text(`City: ${d.CITY}`);
                nba.append("text")
                    .attr("id", "tooltip2")
                    .attr("x", 60)
                    .attr("y", 490)
                    .text(`Team: ${d.NAME}`);
                nba.append("text")
                    .attr("id", "tooltip3")
                    .attr("x", 60)
                    .attr("y", 510)
                    .text("League: NBA")

            }).on("mouseout", (evento, d) => {
                d3.select(evento.currentTarget)
                .attr("r", 3)
                d3.select("#tooltip").remove()
                d3.select("#tooltip2").remove()
                d3.select("#tooltip3").remove()
            })
        })
        
    
        const driverZoom = (evento) => {
        const t = evento.transform; 
        h.attr("transform", t)
        

    }

    const zoom = d3.zoom()
    .extent([[0, 0], [size.width, size.height]])
    .translateExtent([[0, 0], [size.width, size.height]])
    .scaleExtent([1, 4])
    .on("zoom", driverZoom);
    
  
    svg.call(zoom);

});

d3.csv("csv_teams/mlb_tree.csv").then((datos) => {
    const stratify = d3
        .stratify()
        .id((d) => d.NAME)
        .parentId((d) => d.PARENT);

const raiz = stratify(datos);
treeBuilder(raiz, mlbTree)

})
.catch((error) => {
console.log(error);
});

d3.csv("csv_teams/nfl_tree.csv").then((datos) => {
    const stratify = d3
        .stratify()
        .id((d) => d.NAME)
        .parentId((d) => d.PARENT);
        
        const raiz = stratify(datos);
        treeBuilder(raiz, nflTree)
        
})
.catch((error) => {
    console.log(error);
});
d3.csv("csv_teams/nba_tree.csv").then((datos) => {
    const stratify = d3
        .stratify()
        .id((d) => d.NAME)
        .parentId((d) => d.PARENT);

const raiz = stratify(datos);
treeBuilder(raiz, nbaTree)

})
.catch((error) => {
console.log(error);
});

d3.selectAll("circle")
    .on("mouseover", mouseover)
    .on("mouseout", mouseout)

 
const iteration = () => {
    for (let i = 0; i < targ_a.lenght; i++){
        console.log(i)
    }
}
const liga = document.getElementById("drop")
liga.oninput = function() {
    optionValue = this.value;
    if (optionValue == "todos"){
        d3.selectAll(".city")
            .style("visibility", "visible")
    } else {
        d3.selectAll(".city")
            .style("visibility", "hidden")
        d3.selectAll(`.${optionValue}`)
            .style("visibility", "visible")
        }
     
}
