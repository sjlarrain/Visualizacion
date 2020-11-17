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
const size_mapa = {
    width: 200,
    height:400
};
const size_isla = {
    width: 200,
    height:200
};

const margin = {top: 10, bottom: 10, left: 10, right: 10}
const svg = d3.selectAll(".container")
              .append("svg")
              .attr("class", 'svg1')
              .attr("width", size_mapa.width)
              .attr("height", size_mapa.height)
              .style("border", "1px solid black")
              .attr('transform', 'translate(100 -100) rotate(-90)')

const g = svg.append("g")
                .attr("width", size_mapa.width - margin.left -margin.right)
              .attr("height", size_mapa.height - margin.top - margin.bottom)
              
              


const detalle = d3.selectAll(".grafico")
                .append("svg")
                .attr("class", 'svg2')
                .attr("width", size.width)
                .attr("height", size.height)
                .style("border", "1px solid black");
                
const informacion = d3.selectAll(".informacion")
                .append("svg")
                .attr("class", 'svg3')
                .attr("width", size.width)
                .attr("height", size.height)
                .style("border", "1px solid black")

const cuadro = informacion.append("g")
                            .attr("width", size.width * 2 - margin.left -margin.right)
                            .attr("height", size.height / 2 - margin.top - margin.bottom)

const isla_pascua = d3.selectAll(".isla_pascua")
                    .append("svg")
                    .attr("class", 'svg4')
                    .attr("width", size_isla.width)
                    .attr("height", size_isla.height / 2)
                    .style("border", "1px solid black");



const h = isla_pascua.append("g")
        .attr("width", size_isla.width - margin.left -margin.right)
        .attr("height", size_isla.height - margin.top - margin.bottom)

const juan_fernandez = d3.selectAll(".juan_fernandez")
        .append("svg")
        .attr("class", 'svg4')
        .attr("width", size_isla.width)
        .attr("height", size_isla.height / 2)
        .style("border", "1px solid black");



const j = juan_fernandez.append("g")
    .attr("width", size_isla.width - margin.left -margin.right)
    .attr("height", size_isla.height - margin.top - margin.bottom)


const grafico = (datos) => {
    const labels = ['% Hombres', '% Mujeres', '% Dep', '% Viv.Part.', '% Viv.Col.']
    const g = detalle.append("g")
    const margin = {top: 30, bottom: 30, left: 30, right: 30}
    const height = size.height - margin.top - margin.bottom
    const width = size.width -margin.left - margin.right
    
    g.attr("transform", `translate(${margin.left} ${margin.right})`)
    const maxValor = (datos) => {
        const valor = d3.max(datos)
        if (valor > 100){
            return valor
        } else { return 100}
    }
    const Escala = d3.scaleSequential()
                    .interpolator(d3.interpolatePlasma) 
                    .domain([0, maxValor])

    const x = d3.scaleBand().range([0, width]).domain(labels).padding(0.1)
    const y = d3.scaleLinear().range([height, 0]). domain([0, maxValor(datos)])
    g.append("g")
            .attr("class", "axisX")
            .attr('transform', `translate(0 ${height})`)
            .call(d3.axisBottom(x))
    
    g.append("g")
            .attr('transform', `translate(0 0)`)
            .attr("class", 'axisY')
            .call(d3.axisLeft(y))
    
    g.selectAll(".bar")
            .data(datos)
            .enter()
            .append("rect")
            .attr('class', 'bar')
            .attr("x", (_, i) => x(labels[i]))
            .attr("y", (d) => y(d))
            .attr("width", x.bandwidth())
            .attr("height", (d) => height - y(d))
            .style("fill", '#FF007F' )
            
}

const buscador = (clase, datos) => {
    for (let i=0; i<datos.length;i++) {
        let dato = datos[i];
        if (clase == dato.ID) {
            return dato
        } 
    }
    return 0
}
const obtenerInfo = (dato) => {
    if (dato.ID != 0){
        const porHombre = dato.HOMBRES / dato.TOTAL_PERS * 100
        const porMujer = 100 - porHombre
        const dependencia = dato.INDICE_DEP
        const particular = dato.PARTICULAR / dato.TOTAL_VIVI * 100
        const colectiva = 100 - particular
        console.log([porHombre, porMujer, dependencia, particular, colectiva])
        return [porHombre, porMujer, dependencia, particular, colectiva]
    } 

    return [0, 0, 0, 0, 0]
}

const obtenerNombres = (dato) => {
    if (dato.ID != 0){
        const region = dato.NOM_REGION
        const comuna = dato.NOM_COMUNA
        const provincia = dato.NOM_PROVIN
        const habitantes = dato.TOTAL_PERS
        const viviendas = dato.TOTAL_VIVI
        return [region, provincia, comuna, habitantes, viviendas]
    } else{
        return ['N/D', 'N/D', 'N/D', 'N/D', 'N/D']
    }}

const resumen =(datos) => {
    const ubicaciones =  [[10,50], [10,100], [10,150], [10,75], [10,120]]
    const elemento = ["REGION", 'PROVINCIA', 'COMUNA', 'TOTAL PERSONAS', 'TOTAL VIVIENDAS']
    cuadro.selectAll('.info')
        .data(datos)
        .enter()
        .append("text")
        .text((d, i) => `${elemento[i]}: ${d}`)
        .attr("x", (_, i) => ubicaciones[i][0])
        .attr("y", (_, i) => ubicaciones[i][1])
        .attr("class", "info")

}


 
d3.csv("censo.csv", interpreter).then((datos) =>{
    const MaxTOTAL_PERS = d3.max(datos, (d) => d.TOTAL_PERS)
    const promedio = d3.mean(datos, (d) => d.TOTAL_PERS)
    const info = datos
    const Escala = d3.scaleSequential()
                    .interpolator(d3.interpolatePlasma) 
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
    const proyeccion = d3.geoWinkel3().fitSize([size_mapa.width, size_mapa.height], datos);
    const caminoGeo = d3.geoPath().projection(proyeccion);
    grafico([])
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
            const identificador = buscador(clase, info)
            const datos_comuna = obtenerInfo(identificador)
            const texto_comunas = obtenerNombres(identificador)
            resumen(texto_comunas)
            grafico(datos_comuna)
            d3.select(this).attr("fill", "green");
          }
        function mouseout() {
            const clase = this.className.baseVal
            detalle.selectAll(".bar")
                    .remove()
            cuadro.selectAll(".info")
                    .remove()
            d3.select(this).attr("fill", valor(clase, info))
        }
    })
d3.json("isla_pascua.geojson").then((datos) => {
    const proyeccion = d3.geoWinkel3().fitSize([size_isla.width, size_isla.height / 2], datos);
    const caminoGeo = d3.geoPath().projection(proyeccion);
    grafico([])
    h.selectAll("path")
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
            const identificador = buscador(clase, info)
            const datos_comuna = obtenerInfo(identificador)
            const texto_comunas = obtenerNombres(identificador)
            resumen(texto_comunas)
            grafico(datos_comuna)
            d3.select(this).attr("fill", "green");
            }
        function mouseout() {
            const clase = this.className.baseVal
            detalle.selectAll(".bar")
                    .remove()
            cuadro.selectAll(".info")
                    .remove()
            d3.select(this).attr("fill", valor(clase, info))
        }
    })
d3.json("juan_fernandez.geojson").then((datos) => {
    const proyeccion = d3.geoWinkel3().fitSize([size_isla.width, size_isla.height / 2], datos);
    const caminoGeo = d3.geoPath().projection(proyeccion);
    grafico([])
    j.selectAll("path")
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
            const identificador = buscador(clase, info)
            const datos_comuna = obtenerInfo(identificador)
            const texto_comunas = obtenerNombres(identificador)
            resumen(texto_comunas)
            grafico(datos_comuna)
            d3.select(this).attr("fill", "green");
            }
        function mouseout() {
            const clase = this.className.baseVal
            detalle.selectAll(".bar")
                    .remove()
            cuadro.selectAll(".info")
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