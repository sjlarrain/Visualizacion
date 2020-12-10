
// Mesures 
const size = {
    width: 800,
    height:600
};

const sizeInfo = {
    width: 300,
    height:560
};

const sizeTree = {
    width: 750,
    height:450
};
const sizeTree_g = {
    width:600,
    height: 450
 };
const sizeMini = {
    width: 500,
    height:450
}

const margin = {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50,
  };

const colors = ["red", "green", "blue"]

// SVG & "g" generations  
const svg = d3.selectAll(".usa")
              .append("svg")
              .attr("class", 'svg')
              .attr("width", size.width)
              .attr("height", size.height)
              .style("border", "1px solid black");

const svg1 = d3.selectAll(".info")
                .append("svg")
                .attr("class", 'svg')
                .attr("width", sizeInfo.width)
                .attr("height", sizeInfo.height)
                .style("border", "1px solid black")

                
const h = svg.append("g")

const p = svg1.append("g")
const g = h.append("g")
const nba = h.append("g")
const nfl = h.append("g")
const mlb = h.append("g")

p.selectAll("circle")
        .data([0, 1, 2])
        .join("circle")
        .attr("r", 10)
        .attr("fill", (_, i) => colors[i])
        .attr("transform", (_,i) => `translate(${i*100 + 42} 450)`)

p.selectAll("text")
        .data(["MLB", "NFL", "NBA"])
        .join("text")
        .text((d) => d)
        .attr("transform", (_,i) => `translate(${i*100 + 58} 453)`)

const mlbTree_svg = d3.selectAll(".MLB_tree")
                    .append("svg")
                    .attr("class", 'svg')
                    .attr("width", sizeTree.width)
                    .attr("height", sizeTree.height)
                    .attr("padding", 0)
                    .style("border", "1px solid black");
const mlbTree = mlbTree_svg.append("g")
                    .attr("width", sizeTree.width)
                    .attr("height", sizeTree.height)
                    .attr("transform", "translate (50, 50)")

const mlbMap_svg = d3.selectAll(".MLB_map")
                    .append("svg")
                    .attr("class", 'svg_mlb')
                    .attr("width", sizeMini.width)
                    .attr("height", sizeMini.height)
                    .attr("padding", 0)
                    .style("border", "1px solid black");

const nbaTree_svg = d3.selectAll(".NBA_tree")
                    .append("svg")
                    .attr("class", 'svg')
                    .attr("width", sizeTree.width)
                    .attr("height", sizeTree.height)
                    .style("border", "1px solid black");
const nbaTree = nbaTree_svg.append("g")
                    .attr("width", sizeTree.width)
                    .attr("height", sizeTree.height)
                    .attr("transform", "translate (50, 50)")

const nbaMap_svg = d3.selectAll(".NBA_map")
                        .append("svg")
                        .attr("class", 'svg')
                        .attr("width", sizeMini.width)
                        .attr("height", sizeMini.height)
                        .attr("padding", 0)
                        .style("border", "1px solid black");

const nflTree_svg = d3.selectAll(".NFL_tree")
                    .append("svg")
                    .attr("class", 'svg')
                    .attr("width", sizeTree.width)
                    .attr("height", sizeTree.height)
                    .style("border", "1px solid black");
const nflTree = nflTree_svg.append("g")
                    .attr("width", sizeTree.width)
                    .attr("height", sizeTree.height)
                    .attr("transform", "translate (50, 50)")

const nflMap_svg = d3.selectAll(".NFL_map")
                    .append("svg")
                    .attr("class", 'svg_nfl')
                    .attr("width", sizeMini.width)
                    .attr("height", sizeMini.height)
                    .attr("padding", 0)
                    .style("border", "1px solid black");

const liga = document.getElementById("drop")



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

const deepnessx = (d, branch) => {
    console.log(d)
    if (d > branch){
        return 5
    } else {
        return -10
    }
}
const deepnessy = (d, branch) => {
    console.log(d)
    if (d > branch){
        return 8
    } else {
        return -15
    }
}

const treeBuilder = (raiz, container, reference, branch) => {
    const tree = d3
    .tree()
    .size([
        sizeTree_g.height - margin.left - margin.right,
        sizeTree_g.width - margin.top - margin.bottom
   
    ]);

  tree(raiz)
  console.log(raiz.descendants())

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
    .attr("r", 5)
    .attr("class", (d) => d.data.CITY)
    .on("click", (evento) => {
        reference.selectAll("circle")
                    .style("visibility", "hidden")
        let clase = evento.currentTarget.className.baseVal
        reference.selectAll(`.${clase}`)
                    .style("visibility", "visible")
                })

    container
    .selectAll("text")
    .data(raiz.descendants())
    .enter()
    .append("text")
    .attr("x", (d) => d.y)
    .attr("y", (d) => d.x)
    .text((d) => d.data.NAME)
    .attr("font-size", 14)
    .attr("dy", (d, i) => deepnessx(i, branch))
    .attr("dx", (d, i) => deepnessy(i, branch))

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

// Jsons
d3.json("json_locations/usa.geojson").then((datos) => {
    const proyeccion = d3.geoMercator().fitSize([size.width, size.height], datos);
    const caminoGeo = d3.geoPath().projection(proyeccion);

    const minimap = d3.geoMercator().fitSize([sizeMini.width, sizeMini.height], datos)
    const pathGeo = d3.geoPath().projection(minimap);
    
    g.selectAll("path")
            .data(datos.features)
            .enter()
            .append("path")
            .attr("d", caminoGeo)
            .attr("class", (d) => d.properties.NAME)
            .attr("fill", "grey")
            .attr("opacity", 0.3)
            .attr("stroke", "grey")
    
    nbaMap_svg.selectAll("path")
            .data(datos.features)
            .enter()
            .append("path")
            .attr("d", pathGeo)
            .attr("fill", "grey")
            .attr("opacity", 0.3)
            .attr("stroke", "grey")

    mlbMap_svg.selectAll("path")
            .data(datos.features)
            .enter()
            .append("path")
            .attr("d", pathGeo)
            .attr("fill", "grey")
            .attr("opacity", 0.3)
            .attr("stroke", "grey")

    nflMap_svg.selectAll("path")
            .data(datos.features)
            .enter()
            .append("path")
            .attr("d", pathGeo)
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
                .attr("transform", "translate (0 0)")
                
            ).on("mouseover", (evento, d) => {
                d3.select(evento.currentTarget)
                    .attr("r", 10);
                    console.log(d.CITY)
                p.append("svg:image")
                    .attr("id", "imagen")
                    .attr('x', 50)
                    .attr('y', 200)
                    .attr('width', 200)
                    .attr('height', 200)
                    .attr("xlink:href", `logos_mlb/${d.CITY}.gif`)
                
                p.append("text")
                    .attr("id", "tooltip")
                    .attr("x", 20)
                    .attr("y", 60)
                    .text(`City: ${d.CITY}`);
                p.append("text")
                    .attr("id", "tooltip2")
                    .attr("x", 20)
                    .attr("y", 80)
                    .text(`Team: ${d.NAME}`);
                p.append("text")
                    .attr("id", "tooltip3")
                    .attr("x", 20)
                    .attr("y", 100)
                    .text("League: MLB")

            }).on("mouseout", (evento, d) => {
                d3.select(evento.currentTarget)
                .attr("r", 3)
                d3. select("#imagen").remove()
                d3.select("#tooltip").remove()
                d3.select("#tooltip2").remove()
                d3.select("#tooltip3").remove()
            })
        mlbMap_svg.selectAll("circle")
            .data(datos)
            .join(
                (enter) =>
                enter.append("circle")
                .attr("class", (d) =>`${d.CITY} ${d.DIVISION} ${d.CONFERENCE} MLB`)
                .attr("cx", (d) => minimap([d.longitude, d.latitude])[0])
                .attr("cy", (d) => minimap([d.longitude, d.latitude])[1])
                .attr("r", 4)
                .attr("fill", "red")
                .attr("transform", "translate (0 0)")
                .style("visibility", "visible"))
        
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
                
                p.append("svg:image")
                    .attr("id", "imagen")
                    .attr('x', 50)
                    .attr('y', 200)
                    .attr('width', 200)
                    .attr('height', 200)
                    .attr("xlink:href", `logos_nfl/${d.CITY}.gif`)

                p.append("text")
                    .attr("id", "tooltip")
                    .attr("x", 20)
                    .attr("y", 60)
                    .text(`City: ${d.CITY}`);
                p.append("text")
                    .attr("id", "tooltip2")
                    .attr("x", 20)
                    .attr("y", 80)
                    .text(`Team: ${d.NAME}`);
                p.append("text")
                    .attr("id", "tooltip3")
                    .attr("x", 20)
                    .attr("y", 100)
                    .text("League: NFL")

            }).on("mouseout", (evento, d) => {
                d3.select(evento.currentTarget)
                .attr("r", 3)
                d3.select("#imagen").remove()
                d3.select("#tooltip").remove()
                d3.select("#tooltip2").remove()
                d3.select("#tooltip3").remove()
            })
            nflMap_svg.selectAll("circle")
            .data(datos)
            .join(
                (enter) =>
                enter.append("circle")
                .attr("class", (d) =>`${d.CITY} ${d.DIVISION} ${d.CONFERENCE} NFL`)
                .attr("cx", (d) => minimap([d.longitude, d.latitude])[0])
                .attr("cy", (d) => minimap([d.longitude, d.latitude])[1])
                .attr("r", 4)
                .attr("fill", "green")
                .attr("transform", "translate (0 0)")
                .style("visibility", "visible"))

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
                p.append("svg:image")
                    .attr("id", "imagen")
                    .attr('x', 50)
                    .attr('y', 200)
                    .attr('width', 200)
                    .attr('height', 200)
                    .attr("xlink:href", `logos_nba/${d.CITY}.gif`)

                p.append("text")
                    .attr("id", "tooltip")
                    .attr("x", 20)
                    .attr("y", 60)
                    .text(`City: ${d.CITY}`);
                p.append("text")
                    .attr("id", "tooltip2")
                    .attr("x", 20)
                    .attr("y", 80)
                    .text(`Team: ${d.NAME}`);
                p.append("text")
                    .attr("id", "tooltip3")
                    .attr("x", 20)
                    .attr("y", 100)
                    .text("League: NBA")

            }).on("mouseout", (evento, d) => {
                d3.select(evento.currentTarget)
                .attr("r", 3)
                d3.select("#imagen").remove()
                d3.select("#tooltip").remove()
                d3.select("#tooltip2").remove()
                d3.select("#tooltip3").remove()
            })
            nbaMap_svg.selectAll("circle")
            .data(datos)
            .join(
                (enter) =>
                enter.append("circle")
                .attr("class", (d) =>`${d.CITY} ${d.DIVISION} ${d.CONFERENCE} NBA`)
                .attr("cx", (d) => minimap([d.longitude, d.latitude])[0])
                .attr("cy", (d) => minimap([d.longitude, d.latitude])[1])
                .attr("r", 4)
                .attr("fill", "blue")
                .attr("transform", "translate (0 0)")
                .style("visibility", "visible"))
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
treeBuilder(raiz, mlbTree, mlbMap_svg, 8)

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
        treeBuilder(raiz, nflTree, nflMap_svg, 10)
        
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
treeBuilder(raiz, nbaTree, nbaMap_svg, 8)

})
.catch((error) => {
console.log(error);
});



