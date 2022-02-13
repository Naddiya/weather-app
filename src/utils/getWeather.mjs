import geocode from "./geocode.mjs";
import forecast from "./forecast.mjs";

const getWeather = (location, callback) => {
    geocode(location, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            callback({ error });
        }
        forecast(latitude, longitude, (error, forecastInfo) => {
            if (error) {
                callback({ error });
            }
            const data = {
                location,
                latitude,
                longitude,
                forecastInfo
            };
            callback(error, data);
        });
    });
};

export default getWeather;
