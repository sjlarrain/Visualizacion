const promedio = (datos) => {
    let prom_rating = 0;
    let prom_pace = 0;
    let prom_shooting = 0;
    let prom_passing = 0;
    let prom_dribbling = 0;
    let prom_defending = 0;
    let prom_physical = 0;
    for (let i=0;i<datos.length;i++){
        prom_rating += datos[i].rating;
        prom_pace += datos[i].pace;
        prom_shooting += datos[i].shooting;
        prom_passing += datos[i].passing;
        prom_dribbling += datos[i].dribbling;
        prom_defending += datos[i].defending;
        prom_physical += datos[i].physical;
    }
    const arr = [prom_rating, prom_pace, prom_shooting, prom_passing,
    prom_dribbling, prom_defending, prom_physical]
    console.log(arr)
    const result = arr.map((x) => parseInt((x / datos.length).toFixed(0)))
    return result
    
} 

const tarjeta = (player) => {
    const size = {HEIGHT: 600,
                  WIDTH: 600}
    const margin = {left: 100,
                    right: 100,
                    top: 70,
                    bottom: 70}
    const texto = [player.name, player.club, player.league, player.rating]
    const posicion = [[100,20], [100,40], [100,60],[20,20]]
    const tamanho = ["0.7cm", "0.5cm", "0.5cm", "0.7cm"]
    const centros = {x: (size.WIDTH - margin.left - margin.right) / 2, 
                y: (size.HEIGHT - margin.top -margin.bottom) / 2 + 50 }
    

    const color = (player) => {
        if (player.rating >= 75) {
            return "gold"
        } else if (player.rating < 60) {
            return "bronce"
        } else {
            return "silver"
        }
    }


    const container = d3.select(".container")
                        .append("svg")
                        .attr("class", "svg")
                        .attr("height", size.HEIGHT)
                        .attr("width", size.WIDTH)
    
    container.append("rect")
            .attr("height", size.HEIGHT - margin.top -margin.bottom)
            .attr("width", size.WIDTH - margin.left - margin.right)
            .attr("transform", `translate (${margin.left} ${margin.top})`)
            .attr("fill", color(player))
    
    container.selectAll(".svg")
            .data(texto)
             .join("text")
             .style("font-size", (_, i) => tamanho[i])
             .text((d) => d)
             .attr("x", (_,i) => posicion[i][0])
             .attr("y", (_,i)=> posicion[i][1] + 30)
             .attr("transform", `translate (${margin.left} ${margin.top})`)
    
    container.append("circle")
            .attr("cy",  centros.y )
            .attr("cx",  centros.x )
            .attr("transform", `translate (${margin.left} ${margin.top})`)
            .attr("r", 120)
            .attr("fill", "white")

    const arc =  d3.line()
                    .x((d) => d.x)
                    .y((d) => d.y)

    const rScale = d3.scaleLinear()
                        . domain([0, 100])
                        .range([0, 120])
    
    const lines = [{"x":rScale(player.defending)  + centros.x, "y": centros.y},
                    {"x":centros.x, "y": rScale(player.shooting) + centros.y}, 
                    {"x": centros.x - rScale(player.pace), "y":centros.y},
                    {"x":centros.x, "y": centros.y - rScale(player.passing)},
                    {"x":rScale(player.defending)  + centros.x, "y": centros.y} ] //{"x":, "y":}, {"x":, "y":}
   
    // const lines = [{"x":centros.x + 10,"y": centros.y + 10},
    //                 {"x":centros.x + 10,"y": centros.y - 10},
    //                 {"x":centros.x - 10,"y": centros.y + 10},
    //                 {"x":centros.x - 10,"y": centros.y - 10}]
   
    container.append("path")
                .attr("d", arc(lines))
                .attr("transform", `translate (${margin.left} ${margin.top})`)
                .attr("stroke", "blue")
                .attr("fill", "white")
        
}
const interpreter = (d) => {
    return { name: d.NAME,
            club: d.CLUB,
            league: d.LEAGUE,
            position: d.POSITION,
            tier: d.TIER,
            rating: parseInt(d.RATING),
            pace: parseInt(d.PACE),
            shooting:parseInt(d.SHOOTING),
            passing:parseInt(d.PASSING),
            dribbling:parseInt(d.DRIBBLING),
            defending:parseInt(d.DEFENDING),
            physical:parseInt(d.PHYSICAL)
    }
}

d3.csv("fifa_20_data.csv", interpreter)
    .then((datos)=> {
        console.log(datos)
        console.log(promedio(datos))
        tarjeta(datos[0])
        
    })
    .catch((err) => {
        console.log(err)
    })
 
