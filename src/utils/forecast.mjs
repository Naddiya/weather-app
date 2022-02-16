import request from "request";
import dotenv from "dotenv";
dotenv.config();

const token = process.env.APPID;

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=" + token + "&units=metric";
    request({ url: url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect to weather services, please check network", undefined);
        } else if (body.error) {
            callback("Unable to find location", undefined);
        } else if (body.main && body.weather) {
            const details = body.main;
            const forecastInfo = body.weather[0].description;
            const { temp, temp_min, temp_max, humidity } = details;
            callback(
                undefined,
                "The temperature is " + Math.round(temp) + " and there is currently " + forecastInfo + ". " +
                "The highest temperature is " + temp_max + ", " + "the lowest temparature is " + temp_min + ". " +
                "The humidity is " + humidity + " percent. "
            );
        }
    });
};

export default forecast;
