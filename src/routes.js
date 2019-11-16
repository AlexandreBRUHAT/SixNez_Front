import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Films from "./components/Films";
import Acteurs from "./components/Acteurs";

export default [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home},
    { path: '/login', component: Login},
    { path: '/register', component: Register},
    { path: '/films', alias: '/films/*', component: Films},
    { path: '/acteurs', alias: '/acteurs/*', component: Acteurs}
]