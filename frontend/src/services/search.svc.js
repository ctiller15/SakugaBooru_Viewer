import axios from "axios";
import frontEndCache from "./cache.svc.js";

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
        const baseUrl = "http://localhost:3000/search/";
        const fiveMinMs = 300000;

        let url = baseUrl;

        if(query){
            url += `${query}/`;
        }
        return frontEndCache.createPrivateCache("search", query, this.getFactory(url), fiveMinMs);
    }

    getBooruTags(query) {
        const baseUrl = "http://localhost:3000/tags/";
        const dayInMs = 86400000;

        let url = baseUrl;

        if(query) {
            url += `${query}/`;
        }

        return frontEndCache.createPrivateCache("tags", query, this.getFactory(url), dayInMs);
    }
}