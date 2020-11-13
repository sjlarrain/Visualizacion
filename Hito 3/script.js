const interpreter = (d) => {
    return {ID: parseInt(d.ID),
        REGION: parseInt(d.REGION),
        PROVINCIA: parseInt(d.PROVINCIA),
        COMUNA: parseInt(d.COMUNA),
        NOM_REGION: d.NOM_REGION,
        NOM_PROVIN: d.NOM_PROVIN,
        NOM_COMUNA: d.NOM_COMUNA,
        TOTAL_VIVI: parseInt(d.TOTAL_VIVI),
        PARTICULAR: parseInt(d.PARTICULAR),
        COLECTIVAS: parseInt(d.COLECTIVAS),
        TOTAL_PERS: parseInt(d.TOTAL_PERS),
        HOMBRES: parseInt(d.HOMBRES),
        MUJERES: parseInt(d.MUJERES),
        DENSIDAD: parseFloat(d.DENSIDAD),
        INDICE_MAS: parseFloat(d.INDICE_MAS),
        INDICE_DEP: parseFloat(d.INDICE_DEP),
        IND_DEP_JU: parseFloat(d.IND_DEP_JU),
        IND_DEP_VE: parseFloat(d.IND_DEP_VE)
    }
};
const size = {
    width: 400,
    height:400
};

const svg = d3.selectAll(".container")
              .append("svg")
              .attr("class", 'svg1')
              .attr("width", size.width)
              .attr("height", size.height);

const g = svg.append("g")


const detalle = d3.selectAll(".container")
                .append("svg")
                .attr("class", 'svg2')
                .attr("width", size.width)
                .attr("height", size.height);

const grafico = (datos) => {
    const labels = ['% Hombres', '% Mujeres', 'Ind Dependencia', '% Vivienda Particular', '% Vivienda Colectiva']
    const maxValor = (datos) => {
        const valor = d3.max(datos)
        if (valor > 100){
            return valor
        } else { return 100}
    }

    const x = d3.scaleBand().range([0, size.width - 25]).domain(labels).padding(0.1)
    const y = d3.scaleLinear().range([size.height - 25, 0]). domain([0, maxValor(datos)])
    detalle.append("g")
            .attr("class", "axisX")
            .attr('transform', `translate(25 ${size.height - 25})`)
            .call(d3.axisBottom(x))
    
    detalle.append("g")
            .attr('transform', `translate(25 0)`)
            .attr("class", 'axisY')
            .call(d3.axisLeft(y))
    
    detalle.selectAll(".bar")
            .data(datos)
            .enter()
            .append("rect")
            .attr('class', 'bar')
            .attr("x", (_, i) => x(labels[i]) + 25)
            .attr("y", (d) => y(d))
            .attr("width", x.bandwidth())
            .attr("height", (d) => size.height - y(d) -25)
            .style("fill", 'green')
            
}

const obtenerInfo = (clase, datos) => {
    for (let i=0; i<datos.length;i++){
        let dato = datos[i];
        if (clase == dato.ID){
            const porHombre = dato.HOMBRES / dato.TOTAL_PERS * 100
            const porMujer = 100 - porHombre
            const dependencia = dato.INDICE_DEP
            const particular = dato.PARTICULAR / dato.TOTAL_VIVI * 100
            const colectiva = 100 - particular
            console.log([porHombre, porMujer, dependencia, particular, colectiva])
            return [porHombre, porMujer, dependencia, particular, colectiva]
        } 
    }
    return [0, 0, 0, 0, 0]
}

 
d3.csv("censo.csv", interpreter).then((datos) =>{
    const MaxTOTAL_PERS = d3.max(datos, (d) => d.TOTAL_PERS)
    const promedio = d3.mean(datos, (d) => d.TOTAL_PERS)
    const info = datos
    const Escala = d3.scaleSequential()
                    .interpolator(d3.interpolateMagma) 
                    .domain([0, MaxTOTAL_PERS])



const valor = (datoId, datos) =>{ 
    for (let i=0; i<datos.length;i++){
        let dato = datos[i];
        if (datoId == dato.ID){
            return Escala(dato.TOTAL_PERS)
        } 
    }
    return Escala(promedio)

}

d3.json("comunas.geojson").then((datos) => {
    const proyeccion = d3.geoWinkel3().fitSize([size.width, size.height], datos);
    const caminoGeo = d3.geoPath().projection(proyeccion);
    
    g.selectAll("path")
    .data(datos.features)
    .enter()
        .append("path")
        .attr("d", caminoGeo)
        .attr("class", (d)=>d.properties.id)
        .attr("fill", (d) => valor(d.properties.id, info))
        .attr("opacity", 0.3)
        .attr("stroke", "black")
        .attr("stroke-width", '0.03')
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)

        function mouseover() {
            const clase = this.className.baseVal
            const datos_comuna = obtenerInfo(clase, info)
            grafico(datos_comuna)
            d3.select(this).attr("fill", "green");

          }
        function mouseout() {
            const clase = this.className.baseVal
            detalle.selectAll(".bar")
                    .remove()
            d3.select(this).attr("fill", valor(clase, info))
        }
    })
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
