import axios from "axios";
import frontEndCache from "./cache.svc.js";
const baseUrl = process.env.NODE_ENV === "production" ? `${process.env.BASE_URL}/server`: "http://localhost:3000";

export default class APIService{
    constructor() {
        this.screenOptions = {
            "mobile": 10,
            "tablet": 20,
            "desktop": 20,
        };
    }

    getFactory(url){
        const getFunc = () => {
            return axios.get(url);
        };

        return getFunc;
    }

    searchBooru(query = "", screen = "mobile") {
        const fiveMinMs = 300000;

        let url = `${baseUrl}/search/`;

        url += `${query}/`;

        url += this.screenOptions[screen];

        return frontEndCache.createPrivateCache("search", query, this.getFactory(url), fiveMinMs);
    }

    getBooruTags(query) {
        const dayInMs = 86400000;

        let url = `${baseUrl}/tags/`;

        if(query) {
            url += `${query}/`;
        }

        return frontEndCache.createPrivateCache("tags", query, this.getFactory(url), dayInMs);
    }
}