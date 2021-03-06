import axios from "axios";
import {sha256} from "js-sha256";
import Vue from 'vue';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
//axios.defaults.headers.common['']
axios.defaults.baseURL = "https://sixnez.herokuapp.com/";

const SixNezService = {
    
    async register(login, password) {
        var hashedpassword = sha256(password);

        return await axios({
            method: "POST",
            url: "/register",
            params: {
                username: login,
                password: hashedpassword
            }
        }).then(async response => {
            // OK
            if (response.status == 200) {
                return await this.connect(login, password);
            }
        },error => {
            console.log("Error code : " + error.response.status + " Error message : " + error.response.data.details);
            return error.response.status;
        });
    },

    async connect(login, password) {
        var hashedpassword = sha256(password);

        return await axios({
            method: "GET",
            url: "/login",
            params: {
                username: login,
                password: hashedpassword
            }
        }).then(response => {
            // OK
            if (response.status == 200) {
                window.localStorage.setItem("token", response.data);
                Vue.prototype.$bus.$emit("connected");

                return true;
            }
        }, error => {
            console.log("Error code : " + error.response.status + " Error message : " + error.response.data.details);
            return error.response.status;
        });
    },

    hasToken() {
        var token = window.localStorage.getItem("token");
        if (token == null) return false;

        return true;
    },

    async forceCheckToken() {
        var token = window.localStorage.getItem("token");
        if (token == null) return false;

        return await axios({
            method: "GET",
            url: "/film",
            headers: {
                'Authorization': "Bearer " + token,
            }
        }).catch(error => {
            if (error == undefined || error.message === "Network Error") {
                window.localStorage.removeItem("token")
                return false
            } else return true;
        });
    },

    disconnect() {
        if (window.localStorage.getItem("token") != null) {
            window.localStorage.removeItem("token");
            Vue.prototype.$bus.$emit("disconnected");
        }
    },

    async getFilms(pageNumber, count, category = null, titre = null) {
        return await axios({
            method: "GET",
            url: "/films",
            headers: {
                'Authorization': "Bearer " + window.localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            params: {
                'page': pageNumber,
                'size': count,
                'genre': category,
                'like': titre
            }
        }).then(response => {
            //console.log(response);
            return response.data;
        }, error => {
            console.log(error);
            return null;
        });
    },

    async getFilm(id) {
        return await axios({
            method: "GET",
            url: "/films/" + id,
            headers: {
                'Authorization': "Bearer " + window.localStorage.getItem("token")
            }
        }).then(response => {
            //console.log(response);
            return response.data;
        }, error => {
            console.log(error);
            return null;
        });
    },

    async getPictures(ids) {
        return await axios({
            method: "PATCH",
            url: "/pictures",
            headers: {
                'Authorization': "Bearer " + window.localStorage.getItem("token")
            },
            data: ids
        }).then(response => {
            //console.log(response);
            return response.data;
        }, error => {
            console.log(error);
            return null;
        });
    },

    async getGenres() {
        return await axios({
            method: "GET",
            url: "/genres",
            headers: {
                'Authorization': "Bearer " + window.localStorage.getItem("token")
            }
        }).then(response => {
            //console.log(response);
            return response.data;
        }, error => {
          console.log(error);
          return null;
        });
    },

    async getMetiers() {
        return await axios({
            method: "GET",
            url: "/metiers",
            headers: {
                'Authorization': "Bearer " + window.localStorage.getItem("token")
            }
        }).then(response => {
            //console.log(response);
            return response.data;
        }, error => {
            console.log(error);
            return null;
        });
    },

    async getActor(id) {
        return await axios({
            method: "GET",
            url: "/acteurs/" + id,
            headers: {
                'Authorization': "Bearer " + window.localStorage.getItem("token")
            }
        }).then(response => {
            return response.data;
        }, error => {
            console.log(error);
            return null;
        });
    },

    async getActors(pageNumber, count, metier = null) {
        return await axios({
            method: "GET",
            url: "/acteurs",
            headers: {
                'Authorization': "Bearer " + window.localStorage.getItem("token")
            },
            params: {
                page: pageNumber,
                size: count,
                metier: metier
            }
        }).then(response => {
            return response.data;
        }, error => {
            console.log(error);
            return null;
        });
    },

    async getFavourites(pageNumber, count) {
        return await axios({
            method: "GET",
            url: "/favs",
            headers: {
                'Authorization': "Bearer " + window.localStorage.getItem("token")
            },
            params: {
                page: pageNumber,
                size: count
            }
        }).then(response => {
            return response.data;
        }, error => {
            console.log(error);
            return null;
        });
    },

    async addFavourite(id) {
        return await axios({
            method: "POST",
            url: "/favs",
            headers: {
                'Authorization': "Bearer " + window.localStorage.getItem("token")
            },
            data: {
                id: id
            }
        }).then(() => {
            return true;
        }, error => {
            console.log(error);
            return false;
        });
    },

    async removeFavourite(id) {
        return await axios({
            method: "DELETE",
            url: "/favs",
            headers: {
                'Authorization': "Bearer " + window.localStorage.getItem("token")
            },
            data: {
                id: id
            }
        }).then(() => {
            return true;
        }, error => {
            console.log(error);
            return false;
        });
    }

};

export default SixNezService;