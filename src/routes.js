import Home from "./components/Home";
import Login from "./components/Login";
import SignIn from "./components/SignIn";
import Films from "./components/Films";
import Acteurs from "./components/Acteurs";

export default [
    { path: '/', component: Home},
    { path: '/login', component: Login},
    { path: '/signin', component: SignIn},
    { path: '/films', component: Films},
    { path: '/acteurs', component: Acteurs}
]