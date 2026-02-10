let temperature = document.getElementById("temperature");
let humidity = document.getElementById("humidity");
let description = document.getElementById("description");
let button = document.getElementById("Search");
let suggestion = document.getElementById("suggestion");
let cityLabel = document.getElementById("city");


let placeholderIcon = document.getElementById("placeholderIcon");
let weatherIcon = document.getElementById("weatherIcon");

button.addEventListener("click", function() {
    let city = document.getElementById("cityInput").value; 
    const apiKey = "64b14ce88fb9a03aba27d022cd5b765d";
    
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    fetch(url)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Cidade não encontrada");
        }
        return response.json();
    })
    .then((data) => {
        console.log("Dados da API:", data);

       //lógica pra mudar ícones 
        placeholderIcon.style.display = "none"; 
        weatherIcon.style.display = "block";  
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        
          //atualiza os campos pegando os dados    
        cityLabel.innerHTML = data.name;
        temperature.innerHTML = data.main.temp + "°C";
        humidity.innerHTML = "Umidade: " + data.main.humidity + "%";
        description.innerHTML = "Descrição: " + data.weather[0].description;
        
        let temp = data.main.temp;
        let dica = "";
        //mensagens de dica
        if (temp <= 6) {
            dica = "Melhor ficar em casa 🏠";
        } else if (temp <= 12) {
            dica = "Congelante ❄️";
        } else if (temp <= 20) {
            dica = "Leve um casaco! 🧥";
        } else if (temp <= 28) {
            dica = "Dia agradável 😎";
        } else {
            dica = "Cuidado! Calor extremo ☀️";
        }

        suggestion.innerText = dica;
        suggestion.style.color = "white";
    })
    .catch((error) => {
        console.log("Erro na busca: " + error);
        
        //lógica pra mudar ícones 
        placeholderIcon.style.display = "block";
        weatherIcon.style.display = "none";

        suggestion.innerText = "Cidade não encontrada!";
        suggestion.style.color = "red";
        
//limpa os campos pro início
        cityLabel.innerHTML = "Cidade";
        temperature.innerHTML = "-- °C";
        humidity.innerHTML = "Umidade: --%";
        description.innerHTML = "Condição";
    });
});