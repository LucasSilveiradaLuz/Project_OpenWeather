
let temperature = document.getElementById("temperature");
let humidity = document.getElementById("humidity");
let description = document.getElementById("description");
let button = document.getElementById("Buscar");

button.addEventListener("click", function() {
    let city = document.getElementById("cityInput").value; // Pegando o que foi digitado
    const apiKey = "64b14ce88fb9a03aba27d022cd5b765d";
    
    // Usamos as crases `` para que o ${cidade} funcione
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log("Dados da API:", data);
            temperature.innerHTML = "Temperature: " + data.main.temp + "°C";
            humidity.innerHTML = "Humidity: " + data.main.humidity + "%";
            description.innerHTML = "Description: " + data.weather[0].description;
            // Aqui vamos colocar a lógica para exibir na tela depois
        })
        .catch((error) => console.log("Erro na busca: " + error));
});
    