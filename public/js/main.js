const submitBtn = document.getElementById('submitBtm');
const day = document.getElementById("day");
const today_day = document.getElementById("today_id");
const display_city_name = document.getElementById("display_city_name");
const temp = document.getElementById("temp");
const temp_status = document.getElementById("temp_status");
const cityInputField = document.getElementById('cityname');
const homeLink = document.getElementById('home-link');



function fillDefault() {
    display_city_name.parentElement.classList.remove("data_hide");
    display_city_name.innerText = "Get Details Here";
    temp.style.color = "#323544";
    temp_status.style.color = "#323544";
    temp.innerText = "|";
    temp_status.innerText = "|";
}
const displayWeatherValues = (cityName, emoji, temperature) => {
    // console.log(valueAsString);
    display_city_name.parentElement.classList.remove("data_hide");
    display_city_name.innerText = cityName;
    temp_status.innerText = emoji;
    temp.innerText = temperature;
    
    temp.style.color = "#fff";
    temp_status.style.color = "#fff";
}
const getInfo = (event) => {
    event.preventDefault();
    const cityName = cityInputField.value;
    console.log(cityName);
    const url = `https://wttr.in/${cityName}?format=%c+%t`;
    
    display_city_name.parentElement.classList.add("data_hide");
    fetch(url)
    .then(async res => {
        if (!res.ok) {
            // If response status is not in the 2xx range, reject the promise with an error
            cityInputField.focus();
            throw new Error("City Name is not Valid");
        }
        return await res.body.getReader().read();
    })
    .then(({ value }) => {
            const chunk = new TextDecoder().decode(value, { stream: true });
            let [emoji,temperature] = chunk.split('  ');

            if(emoji && temperature) {
                displayWeatherValues(cityName, emoji, temperature);
            }
            else {
                throw new Error(`${chunk}`);
            }
        })
    .catch(error => {
        fillDefault();
        
        alert(`${error}`);

    });

}


submitBtn.addEventListener('click',getInfo);
fillDefault();