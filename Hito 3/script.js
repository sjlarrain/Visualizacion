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
        INDICE_MAS: parseFloat(d.INDICE_DEP),
        IND_DEP_JU: parseFloat(d.IND_DEP_JU),
        IND_DEP_VE: parseFloat(d.IND_DEP_VE)
    }
};
d3.csv("censo.csv", interpreter).then((datos) =>{
    const maxTotal_Viviendas = d3.max(datos, (d) => d.TOTAL_VIVI)
    const info = datos
    const Escala = d3.scaleSequential()
                    .interpolator(d3.interpolateRdYlGn) 
                    .domain([0, maxTotal_Viviendas])



const valor = (dato1, dato2, datos) =>{
    console.log(dato1.toUpperCase(), dato2)
    for (let i=0; i<datos.length;i++){
        let dato = datos[i];
    
        if (dato1.toUpperCase() == dato.NOM_COMUNA && dato2 == dato.ID){
            console.log(dato.TOTAL_VIVI)
            return Escala(dato.TOTAL_VIVI)
        }
    }

}

d3.json("comunas.geojson").then((datos) => {
    const proyeccion = d3.geoWinkel3().fitSize([size.width, size.height], datos);
    const caminoGeo = d3.geoPath().projection(proyeccion);
    
    g.selectAll("path")
    .data(datos.features)
    .enter()
        .append("path")
        .attr("d", caminoGeo)
        .attr("class", "geopath")
        .attr("fill", (d)=> valor(d.properties.comuna,d.properties.id, info))
        .attr("opacity", 0.3)
        .attr("stroke", "grey")
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
