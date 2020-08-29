// Hello World!!
console.log('Hello World')

// Primes
function is_prime(num) {
    let dividers = [];
    let cont = true;
    let i = 3;
    if (num % 2 == 0) {
        cont = false;
        dividers.push(i)
    }
    else{
        cont = true;
    }
    while (cont && i < num){
        if (num % i == 0){
            dividers.push(i);
            cont = false;
        }
        else{
            i += 1;
        }
    }
    if (dividers.length == 0) {
        console.log(num, 'it is prime');
    }
    else{
        console.log(num, "is not");
    }
}

function n_primes(num) {
    for (let i = 1; i < num; i++){
        is_prime(i);
    }
}

// Arrays
let arr = ['Celtics', 'Heat', 'Nuggets']

arr.forEach(console.log);

// Objetos
const creadorObj = (nombres, edad) => {
    
    let usuarios = [];
    for (let j = 0; j <= nombres.length; j++){
        usuarios.push({name: nombres[j], age: edad[j]})
    }
    
    usuarios.forEach(console.log)
    return usuarios

}




// Principal
let nombres = ['Santiago', 'Mouses', 'Jose', 'Mou'];
let edad = [22, 23 ,24 ,52];
n_primes(10);
let people = creadorObj(nombres, edad);
people_under = people.filter(item => item.age > 23);
people_per_dos = people_under.map(item => item.age * 2);
people_sum = people_per_dos.reduce((item,extra) => item + extra, 0)

console.log(people_under)
console.log(people_per_dos)
console.log(people_sum)