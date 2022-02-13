import request from "request";
import dotenv from 'dotenv';
dotenv.config();

const token = process.env.MAPBOX_TOKEN;

const geocode = (adress, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(adress) + ".json?access_token=" + token;
    request({ url: url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect to location services!");
        } else if (body.features.length === 0) {
            callback("Unable to find location. Try another search");
        } else if (body.features.length) {
            const coordonates = body.features[0].center;
            const data = {
                location: adress,
                longitude: coordonates[0],
                latitude: coordonates[1]
            };
            callback(error, data);
        };
    });
};


export default geocode;