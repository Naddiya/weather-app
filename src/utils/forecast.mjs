import request from "request";

const token = process.env.APPID;

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "lon=" + longitude + "&APPID=" + token + "&units=metric";

    request({ url: url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect to weather services, please check network", undefined);
        } else if (body.error) {
            callback("Unable to find location", undefined);
        } else if (body.main && body.weather) {
            const temperature = Math.round(body.main.temp);
            const forecastInfo = body.weather[0].description;
            callback(
                undefined,
                "The temperature is " + temperature + " and the weather is " + forecastInfo + "."
            );
        }
    });
};

export default forecast;
