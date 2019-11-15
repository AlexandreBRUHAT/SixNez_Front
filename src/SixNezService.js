import axios from "axios";
import {sha256} from "js-sha256";

const SixNezService = {
    
    async register(login, password) {
        password = sha256(password);

        console.log(login)
        console.log(password)

        axios({
            method: "POST",
            url: "http://localhost:8080/register",
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            withCredentials: false,
            params: {
                username: login,
                password: password
            }
        });
    }

};

export default SixNezService;