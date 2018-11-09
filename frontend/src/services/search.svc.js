//import Vue from 'vue';
import axios from 'axios';

export default class APIService{
    constructor() {

    }

    // add a "mode" option.
    getTodos(query) {
        const baseUrl = 'http://localhost:3000/';

        let url = baseUrl;

        if(query){
            url += `${query}/`;
        }
        //const url = `http://localhost:3000/${query}`;

        return axios.get(url).then((response) => {
            //console.log(response.data);
            return response.data;
        });
    }

    searchBooru(query) {
        const baseUrl = 'http://localhost:3000/search/';

        let url = baseUrl;

        if(query){
            url += `${query}/`;
        }
        //const url = `http://localhost:3000/${query}`;

        return axios.get(url).then((response) => {
            //console.log(response.data);
            return response.data;
        });
    }
}