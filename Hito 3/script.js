const size = {
    width: 800,
    height:500
};

const svg = d3.selectAll(".container")
              .append("svg")
              .attr("class", 'svg1')
              .attr("width", size.width)
              .attr("height", size.height);

const g = svg.append("g")

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

const detalle = d3.selectAll(".container")
                .append("svg")
                .attr("class", 'svg2')
                .attr("width", size.width)
                .attr("height", size.height);
 
d3.csv("censo.csv", interpreter).then((datos) =>{
    const maxDependencia = d3.max(datos, (d) => d.INDICE_DEP)
    const promedio = d3.mean(datos, (d) => d.INDICE_DEP)
    const info = datos
    const Escala = d3.scaleSequential()
                    .interpolator(d3.interpolateMagma) 
                    .domain([0, maxDependencia])



const valor = (datoId, datos) =>{ 
    for (let i=0; i<datos.length;i++){
        let dato = datos[i];
        if (datoId == dato.ID){
            return Escala(dato.INDICE_DEP)
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
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)

        function mouseover() {
            console.log(this)
            d3.select(this).attr("fill", "green");
          }
        function mouseout() {
            const clase = this.className.baseVal
            console.log(clase)
            d3.select(this).attr("fill", valor(clase, info))
        }
    })
})


                    
const driverZoom = (evento) => {
    const t = evento.transform; 
    g.attr("transform", t);

}
const contenedorBrush = svg
  .append("g")


const brushed = (evento) => {
    const seleccion = evento.selection;
}
const brush = d3
  .brush()
  .extent([
    [0, 0],
    [size.width, size.height],
  ])
  .on("brush", brushed)


//  contenedorBrush.call(brush)
  
const zoom = d3.zoom()
.extent([[0, 0], [size.width, size.height]])
.translateExtent([[0, 0], [size.width, size.height]])
.scaleExtent([1, 150])
.on("zoom", driverZoom);


svg.call(zoom);
