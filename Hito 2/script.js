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
    const result = arr.map((x) => parseInt((x / datos.length).toFixed(0)))
    return result
    
} 

const tarjeta = (player) => {
    const size = {HEIGHT: 450,
                  WIDTH: 400}
    const margin = {left: 5,
                    right: 5,
                    top: 10,
                    bottom: 10}
    const texto = [player.name, player.club, player.league, player.rating, player.position]
    const posicion = [[100,20], [100,40], [100,60],[20,20], [330, 20]]
    const tamanho = ["0.6cm", "0.4cm", "0.4cm", "0.6cm", "0.6cm"]
    const centros = {x: (size.WIDTH - margin.left - margin.right) / 2, 
                y: (size.HEIGHT - margin.top -margin.bottom) / 2 + 50 }
    

    const color = (player) => {
        if (player.rating >= 75) {
            return "gold"
        } else if (player.rating < 65) {
            return "#CD7F32"
        } else {
            return "silver"
        }
    }
    const relleno = (player) => {
        if  (["CB", "RB", "LB", "LWB", "RWB"].includes(player.position)){
            return "blue"
        } else if (["CM", "CAM", "CDM", "LM", "RM", "LF", "RF"].includes(player.position)){
            return "green"
        } else { return "red"}
    }


    const container = d3.select(".container")
                        .append("div")
                        .attr("class", `${player.club} jugador`)
                        .style("opacity", "0.5")
                        .append("svg")
                        .attr("class", "svg")
                        .attr("height", size.HEIGHT)
                        .attr("width", size.WIDTH)
    
    container.append("rect")
            .attr("height", size.HEIGHT - margin.top -margin.bottom)
            .attr("width", size.WIDTH - margin.left - margin.right)
            .attr("transform", `translate (${margin.left} ${margin.top})`)
            .attr("fill", color(player))
            .attr("border-radius", "25px")
    
    
    container.selectAll(".svg")
            .data(texto)
             .join("text")
             .style("font-size", (_, i) => tamanho[i])
             .style( "text-align", "justify")
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

    const hexagono =  d3.line()
                    .x((d) => d.x)
                    .y((d) => d.y)

    const rScale = d3.scaleLinear()
                        . domain([0, 100])
                        .range([0, 120])
    
    const lines = [{"x":rScale(player.defending)  + centros.x, "y": centros.y},
                    {"x":centros.x + 50, "y": rScale(player.shooting) + centros.y}, 
                    {"x":centros.x - 50, "y": centros.y + rScale(player.passing)},
                    {"x": centros.x - rScale(player.pace), "y":centros.y},
                    {"x": centros.x - 50, "y": centros.y - rScale(player.dribbling)}, 
                    {"x": centros.x + 50, "y": centros.y - rScale(player.physical)},
                    {"x":rScale(player.defending)  + centros.x, "y": centros.y}]
   
    const habilidad = [{"x":centros.x + rScale(100), "y": centros.y, "text":"DEF"},
                        {"x":centros.x + 50, "y": rScale(100) +      centros.y, "text":"SHO"},
                        {"x":centros.x - 50, "y": rScale(100) + centros.y, "text":"PAC"},
                        {"x":centros.x - rScale(100)-20, "y": centros.y, "text":"PAS"},
                        {"x":centros.x - 50, "y": centros.y - rScale(100), "text":"DRI"},
                        {"x":centros.x + 50, "y": centros.y -rScale(100), "text":"PHY"}]

    container.append("path")
                .attr("d", hexagono(lines))
                .attr("transform", `translate (${margin.left} ${margin.top})`)
                .attr("stroke", "black")
                .attr("fill", relleno(player))
    
    container.selectAll(".svg")
                .data(habilidad)
                .join("text")
                .text((d)=> d.text)
                .attr("x", (d) => d.x)
                .attr("y", (d) => d.y)
                .attr("font-size", "0.3cm")
                .attr("transform", `translate (${margin.left} ${margin.top})`)

    const arcos =    d3.arc()
                    .innerRadius(0)
                    .startAngle(0)
                    .endAngle(2 * Math.PI)
                    
                
    const medidasArcos = [rScale(80), rScale(60), rScale(40), rScale(20)]
    
    container.selectAll(".svg")
                .data(medidasArcos)
                .join("path")
                .attr("d",(d) => arcos({outerRadius: d}))
                .attr("transform", `translate (${centros.x + margin.left} ${centros.y+ margin.top})`)
                .attr("stroke", "black")
                .attr("fill", "transparent")
    

   }

const circuloResumen = (lista, numero) => {
    const size = {WIDTH: 400,
                    HEIGHT: 400
                    }
    const centros = { "x": size.WIDTH / 2,
                      "y":size.HEIGHT / 2
                    }
    
    d3.selectAll(".resumen")
        .append("p")
        .text(`Cantidad tarjetas: ${numero}`)
        .style("font-size: 0.5cm;")

    const container = d3.selectAll(".resumen")
                        .append("svg")
                        .attr("width", size.WIDTH)
                        .attr("height", size.HEIGHT)
                        .attr("transform", "translate (0 400)")
                        
    

    container.append("rect")
            .attr("width", size.WIDTH)
            .attr("height", size.HEIGHT)
            .attr("fill", "grey")
    container.append("text")
            .text("JUGADOR PROMEDIO")
            .attr("class", "subtitulo")
            .attr("x", 115)
            .attr("y", 50)
            .attr("font-size", "0.5cm")
            .attr("fill", "white")

    container.append("circle")
            .attr("cx", centros.x)
            .attr("cy", centros.x)
            .attr("r", 120)
            .attr("fill", "white")
        
    const arc =  d3.line()
    .x((d) => d.x)
    .y((d) => d.y)

    const rScale = d3.scaleLinear()
                    . domain([0, 100])
                    .range([0, 120])

    const lines = [{"x":rScale(lista[5])  + centros.x, "y": centros.y},
                {"x":centros.x + 50, "y": rScale(lista[2]) + centros.y}, 
                {"x":centros.x - 50, "y": centros.y + rScale(lista[3])},
                {"x": centros.x - rScale(lista[1]), "y":centros.y},
                {"x": centros.x - 50, "y": centros.y - rScale(lista[4])}, 
                {"x": centros.x + 50, "y": centros.y - rScale(lista[6])},
                {"x":rScale(lista[5])  + centros.x, "y": centros.y}]

    const habilidad = [{"x":centros.x + rScale(100), "y": centros.y, "text":"DEF"},
                    {"x":centros.x + 50, "y": rScale(100) +      centros.y, "text":"SHO"},
                    {"x":centros.x - 50, "y": rScale(100) + centros.y, "text":"PAC"},
                    {"x":centros.x - rScale(100) - 20, "y": centros.y, "text":"PAS"},
                    {"x":centros.x - 50, "y": centros.y - rScale(100), "text":"DRI"},
                    {"x":centros.x + 50, "y": centros.y -rScale(100), "text":"PHY"}]

    container.append("path")
            .attr("d", arc(lines))
            //.attr("transform", `translate (${margin.left} ${margin.top})`)
            .attr("stroke", "black")
            .attr("fill", "#ffff66")

    container.selectAll(".svg")
            .data(habilidad)
            .join("text")
            .text((d)=> d.text)
            .attr("x", (d) => d.x)
            .attr("y", (d) => d.y)
            .attr("font-size", "0.3cm")
            //.attr("transform", `translate (${margin.left} ${margin.top})`)

    const arcos =    d3.arc()
                        .innerRadius(0)
                        .startAngle(0)
                        .endAngle(2 * Math.PI)


    const medidasArcos = [rScale(80), rScale(60), rScale(40), rScale(20)]

    container.selectAll(".svg")
    .data(medidasArcos)
    .join("path")
    .attr("d",(d) => arcos({outerRadius: d}))
    .attr("transform", `translate (${centros.x } ${centros.y})`)
    .attr("stroke", "black")
    .attr("fill", "transparent")
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
        circuloResumen(promedio(datos), datos.length)
        datos.forEach(tarjeta)
        const container = d3.selectAll(".jugador")
        container.on("mouseenter", (evento)=>{
        const seleccion = "." + evento.currentTarget.className.split(" ")
                                                             .join(".")

        const fullContainer = d3.selectAll(".container")
            fullContainer.selectAll(seleccion)
            .style("opacity", "1")
        })
        .on("mouseleave", (evento) => {
            const seleccion = "." + evento.currentTarget.className.split(" ")
                                                             .join(".")

        const fullContainer = d3.selectAll(".container")
            fullContainer.selectAll(seleccion)
            .style("opacity", "0.5")
        })
    })
    .catch((err) => {
        console.log(err)
    })
 
