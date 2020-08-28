const button = document.getElementById("send")
const input = document.getElementById('title')
const list = document.getElementById("list")


button.addEventListener("click", () => {
    const parrafo = document.createElement("p")
    parrafo.textContent = input.value
    list.appendChild(parrafo)

})

