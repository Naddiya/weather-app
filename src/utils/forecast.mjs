import request from "request";

const { OPEN_URL, APPID } = process.env;

const forecast = (latitude, longitude, callback) => {
    const url = `${OPEN_URL}lat=${latitude}&lon=${longitude}${APPID}&units=metric`;

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
