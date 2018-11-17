import axios from "axios";
import frontEndCache from "./cache.svc.js";
const baseUrl = "http://localhost:3000";

export default class APIService{
    constructor() {

    }

    getFactory(url){
        const getFunc = () => {
            return axios.get(url);
        };

        return getFunc;
    }

    searchBooru(query = "") {
        const fiveMinMs = 300000;

        let url = `${baseUrl}/search/`;

        if(query){
            url += `${query}/`;
        }
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