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
        const fullContainer = d3.select(".full-container")
        fullContainer.selectAll("div.jugador")
          .data(datos)
          .join((enter) =>{
            const size = {HEIGHT: 600,
                            WIDTH: 600}
            const margin = {left: 100,
                            right: 100,
                            top: 70,
                            bottom: 70}

            const posicion = [[100,20], [100,40], [100,60],[20,20]]
            const tamanho = ["0.7cm", "0.5cm", "0.5cm", "0.7cm"]
            const centros = {x: (size.WIDTH - margin.left - margin.right) / 2, 
                        y: (size.HEIGHT - margin.top -margin.bottom) / 2 + 50 }
            

            const color = (rating) => {
                if (rating >= 75) {
                    return "gold"
                } else if (rating < 60) {
                    return "bronce"
                } else {
                    return "silver"
                }
            }
            const relleno = (position) => {
                if  (["CB", "RB", "LB", "LWB", "RWB"].includes(position)){
                    return "blue"
                } else if (["CM", "CAM", "CDM", "LM", "RM"].includes(position)){
                    return "green"
                } else { return "red"}
            }


            const container = enter
                                .append("div")
                                .attr("class", "jugador")
                                .append("svg")
                                .attr("class", "svg")
                                .attr("height", size.HEIGHT)
                                .attr("width", size.WIDTH)
            
            container.append("rect")
                    .attr("height", size.HEIGHT - margin.top -margin.bottom)
                    .attr("width", size.WIDTH - margin.left - margin.right)
                    .attr("transform", `translate (${margin.left} ${margin.top})`)
                    .attr("fill", color((d)=> d.rating))
            
            container.selectAll(".svg")
                    .data((d) => [d.name, d.club, d.league, d.rating])
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
            


            const numbers = Array.from(datos, )
            
            const lines = [{"x":rScale((d)=> d.defending)  + centros.x, "y": centros.y},
                            {"x":centros.x + 50, "y": rScale((d)=> d.shooting) + centros.y}, 
                            {"x":centros.x - 50, "y": centros.y + rScale((d)=> d.passing)},
                            {"x": centros.x - rScale((d)=> d.pace), "y":centros.y},
                            {"x": centros.x - 50, "y": centros.y - rScale((d)=> d.dribbling)}, 
                            {"x": centros.x + 50, "y": centros.y - rScale((d)=> d.physical)},
                            {"x":rScale((d)=> d.defending)  + centros.x, "y": centros.y}]
            
            const habilidad = [{"x":centros.x + rScale(100), "y": centros.y, "text":"DEF"},
                                {"x":centros.x + 50, "y": rScale(100) +      centros.y, "text":"SHO"},
                                {"x":centros.x - 50, "y": rScale(100) + centros.y, "text":"PAC"},
                                {"x":centros.x - rScale(100), "y": centros.y, "text":"PAS"},
                                {"x":centros.x - 50, "y": centros.y - rScale(100), "text":"DRI"},
                                {"x":centros.x + 50, "y": centros.y -rScale(100), "text":"PHY"}]

            container.append("path")
                        .attr("d", arc(lines))
                        .attr("transform", `translate (${margin.left} ${margin.top})`)
                        .attr("stroke", "black")
                        .attr("fill", relleno((d)=> d.position))
            
            container.selectAll(".svg")
                        .data(habilidad)
                        .join("text")
                        .text((d)=> d.text)
                        .attr("x", (d) => d.x)
                        .attr("y", (d) => d.y)
                        .attr("font-size", "0.2cm")
                        .attr("transform", `translate (${margin.left} ${margin.top})`)
            
             
              }
          )
    })
    .catch((err) => {
        console.log(err)
    })
 
