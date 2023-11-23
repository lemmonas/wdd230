function showWindChill(temp, speed){
    const windchillSpan=document.getElementById("chill")
    let message="N/A"

    if (temp <= 50 && speed > 3){
        let chillfactor=Math.pow(speed, 0.16)
        let chill=Math.round(35.74+(0.6215*temp)-(35.75*chillfactor)+(0.4275*temp*chillfactor))
        message=`${chill}`
    }

    windchillSpan.textContent=message
}

const temperatureSpan=document.getElementById("temp")
const windspeedSpan=document.getElementById("speed")
const temperature=parseInt(temperatureSpan.textContent)
const windspeed=parseInt(windspeedSpan.textContent)

showWindChill(temperature, windspeed)