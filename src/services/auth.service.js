import axios from "axios";
import { API_URL, GUEST_USER } from "../constants";

const register = (username, password) => {
    return axios.post(API_URL + "players/create/", {
        username,
        password,
    });
};

const login = (username, password) => {
    return axios.post(API_URL + "players/token/", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.access) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = (args=undefined) => {
    if (args === "guest") {
        return {access: null, refresh: null, player_id: GUEST_USER.id, username: GUEST_USER.username};
    }
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;