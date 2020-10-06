// svg
const construccion = (info) => {
    const ubicaciones = [{
                        x:8,
                        y:30,
                        rot:0
                             },
                        {
                        x:-10,
                        y:40,
                        rot:120
                            },
                        {
                        x:-10,
                        y:20,
                        rot:240
                        }]
    const margin = {
        left:100,
        right:100,
        top:70, 
        bottom:70
    }
    
    const dimensiones = {
        WIDTH: 600,
        HEIGHT: 300,
    }

    const petalo = (objeto)=> {

    }
    const svg = d3.select(".container")
                        .append("svg")
                        .attr("width", dimensiones.WIDTH)
                        .attr("height", dimensiones.HEIGHT)
                        
    
    
    const setosa = svg.append("g")
                    .attr("class", "setosa")
                    .attr("width",200)
                    .attr("height", 200)
                    // .attr("transfomr", `translate (${margin.left} ${margin.top} )`)                  
    
    setosa.selectAll(".setosa")
        .data(ubicaciones)
        .join("ellipse")
        .attr("rx", info.setosa.sepalLength * 10)
        .attr("ry", info.setosa.sepalWidth * 10)
        .attr("transform", (d)=> `translate (${100 + d.x} ${100 + d.y}) rotate(${d.rot})`)
        .attr("fill", "purple")

    setosa.selectAll(".setosa")
        .data(ubicaciones)
        .join("ellipse")
        .attr("rx", info.setosa.petalLength * 10)
        .attr("ry", info.setosa.petalWidth * 10)
        .attr("transform", (d)=> `translate (${100 + d.x} ${100 +d.y}) rotate(${d.rot})`)
        .attr("fill", "red")

    svg.selectAll(".setosa")
            .append("text")
            .attr("x", 40)
            .attr("y", 280)
            .style("font-family", "Comic Sans MS")
            .style("font-size", "1cm")
            .text("Setosa")
            
    
    const virginica = svg.append("g")
        .attr("class", "virginica")
        .attr("width",200)
        .attr("height", 200)

    virginica.selectAll(".virginica")
        .data(ubicaciones)
        .join("ellipse")
        .attr("rx", info.virginica.sepalLength * 10)
        .attr("ry", info.virginica.sepalWidth * 10)
        .attr("transform", (d)=> `translate (${300 + d.x * 4} ${ d.y * 4}) rotate(${d.rot})`)
        .attr("fill", "lightblue")

    virginica.selectAll(".virginica")
        .data(ubicaciones)
        .join("ellipse")
        .attr("rx", info.virginica.petalLength * 10)
        .attr("ry", info.virginica.petalWidth * 10)
        .attr("transform", (d)=> `translate (${300 + d.x * 4} ${ d.y * 4}) rotate(${d.rot})`)
        .attr("fill", "lightyellow")

    svg.selectAll(".virginica")
        .append("text")
        .attr("x", 220)
        .attr("y", 280)
        .style("font-family", "Comic Sans MS")
        .style("font-size", "1cm")
        .text("Virginica")
    
    const versicolor = svg.append("g")
        .attr("class", "versicolor")
        .attr("width",200)
        .attr("height", 200)

    versicolor.selectAll(".veriscolor")
        .data(ubicaciones)
        .join("ellipse")
        .attr("rx", info.versicolor.sepalLength * 10)
        .attr("ry", info.versicolor.sepalWidth * 10)
        .attr("transform", (d)=> `translate (${500 + d.x * 3.5} ${ d.y * 3.5}) rotate(${d.rot})`)
        .attr("fill", "lightgreen")

    versicolor.selectAll(".veriscolor")
        .data(ubicaciones)
        .join("ellipse")
        .attr("rx", info.versicolor.petalLength * 10)
        .attr("ry", info.versicolor.petalWidth * 10)
        .attr("transform", (d)=> `translate (${500 + d.x * 3.5} ${ d.y * 3.5}) rotate(${d.rot})`)
        .attr("fill", "lightgrey")

    svg.selectAll(".versicolor")
        .append("text")
        .attr("x", 420)
        .attr("y", 280)
        .style("font-family", "Comic Sans MS")
        .style("font-size", "1cm")
        .text("Versicolor")

}

//Tabla

const construccion_tabla = (info) => {
    const setosa = info.setosa
    const virginica = info.virginica
    const versicolor = info.versicolor
    const lista = [setosa, virginica, versicolor]

    const table = d3.select(".tabla")
                    .append("table")
                    .style("border-collapse", "collapse")
                    .style("border", "2px black solid")

    table.append("thead")
        .append("tr")
        .selectAll("th")
        .data(["Nombre", "Petalo Largo", "Petalo Ancho", "Sepalo Largo", "Sepalo Ancho"])
        .join("th")
        .text((d) => d)
        .style("border", "1px black solid")
        .style("padding", "5px")
        .style("background-color", "lightgray")
        .style("font-weight", "bold")
        .style("text-transform", "uppercase");

    
     console.log(lista)
    table.append("tbody")
        .selectAll("tr")
        .data(lista)
        .join("tr")
        .selectAll("td")
        .data(lista)
        .join("td")
        .text(d=>[d.species, d.petalLength, d.petalWidth, d.sepalLength, d.sepalWidth])
}


// datos

const interpretador = (d)=> {
       return { sepalLength: parseFloat(d.sepalLength),
        sepalWidth: parseFloat(d.sepalWidth),
        petalLength: parseFloat(d.petalLength),
        petalWidth: parseFloat(d.petalWidth),
        species: d.species}
    };

    const average = (datos, tipo, especie) => {
        
        let cuenta = 0;
        let q = 0
        for (let i = 0 ; i< datos.length;i++){
            if (datos[i].species == especie){
                if (tipo =="sepalLength"){
                    cuenta += datos[i].sepalLength;
                }
                else if (tipo == "petalLength"){
                    cuenta += datos[i].petalLength;
                }
                else if (tipo == "petalWidth"){
                    cuenta += datos[i].petalWidth;
                }
                else{
                    cuenta += datos[i].sepalWidth;
                }
                q++;
            }
        }
        return cuenta / q;
    }

const data = d3.json("iris.json", interpretador)
                .then((datos) => {
                    let lista = new Object()
                    let especies = ["setosa", "virginica", "versicolor"]
                    let medidas = ["sepalLength","petalLength","petalWidth","sepalWidth"]
                    for (let i = 0; i < especies.length;i++){
                        kind = especies[i];
                        promedios = new Object();
                        for (let j = 0; j < medidas.length; j++){
                            promedios[medidas[j]] = average(datos, medidas[j], kind);
                        promedios["species"] = kind
                        }
                        lista[kind] = promedios;
                    }
                    console.log(lista)
                    construccion(lista);
                    // construccion_tabla(lista)
                })
                .catch ((err) => console.log(err));


