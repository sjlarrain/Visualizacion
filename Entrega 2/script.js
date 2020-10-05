const margin = {
    left:100,
    right:100,
    top:70,
    bottom:70
}

const dimensiones = {
    WIDTH: 600,
    HEIGHT: 200
}

// datos

const interpretador = (d)=> {
       return { sepalLength: parseFloat(d.sepalLength),
        sepalWidth: parseFloat(d.seplaWidth),
        petalLength: parseFloat(d.petalLength),
        petalWidth: parseFloat(d.petalWidth),
        species: d.species}
    };

    const average = (datos, tipo, especie) => {
        
        let cuenta = 0;
        let q = 0
        for (let i = 0 ; i< datos.length;i++){
            if (datos[i].species == especie){
                if (tipo == "sepalLenght"){
                    cuenta += datos[i].sepalLength;
                }
                else if (tipo == "petalLenght"){
                    cuenta += datos[i].petalLength
                }
                else if (tipo == "petalWidth"){
                    cuenta += datos[i].petalWidth
                }
                else {
                    cuenta += datos[i].sepalWidth
                }
                q++;
            }
        }
        return cuenta / q;
    }

const datos = d3.json("iris.json", interpretador)
                .then((datos) => {
                    let lista = new Object()
                    let especies = ["setosa", "virginica", "versicolor"]
                    let medidas = ["sepalLenght","petalLenght","petalWidth","sepalWidth"]
                    for (let i = 0; i < especies.length;i++){
                        kind = especies[i];
                        promedios = new Object();
                        for (let j = 0; j < medidas.length; j++){
                            promedios[medidas[j]] = average(datos, medidas[j], kind);
                        }
                        lista[kind] = promedios;
                    }
                    console.log(lista);
                })
                .catch ((err) => console.log(err));



// svg
const svg = d3.select(".container")
                    .append("svg")
                    .attr("width", dimensiones.WIDTH)
                    .attr("height", dimensiones.HEIGHT)

const setosa = container.append("g")
                    .attr("transform",`translate(${margin.left}, ${margin.top})`)

const versicolor = container.append("g")
                        .attr("transform",`translate(${margin.left}, ${margin.top})`)

const virginica = container.append("g")
                        .attr("transform",`translate(${margin.left}, ${margin.top})`)
