import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Films from "./components/Films";
import Acteurs from "./components/Acteurs";

export default [
    { path: '/', component: Home},
    { path: '/login', component: Login},
    { path: '/register', component: Register},
    { path: '/films', component: Films},
    { path: '/acteurs', component: Acteurs}
]