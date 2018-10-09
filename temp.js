import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';

new Vue({
    el: '#app',
    render: h => h(App)
});
// class APIService{
//     constructor() {

//     }

//     getTodos() {
//         const url = 'http://localhost:3000/';

//         return axios.get(url).then((response) => {
//             console.log(response.data);
//             return response.data;
//         });
//     }
// }

// const api = new APIService();

// var app = new Vue({
//     el: '#app',
//     data: {
//         message: {}
//     },
//     created () {
//         api.getTodos()
//         .then((response) => {
//             this.message = response;
//         })
//     }
// });