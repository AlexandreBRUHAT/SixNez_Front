import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Films from "./components/Films";
import Acteurs from "./components/Acteurs";
import Film from "./components/Film";
import Acteur from "./components/Acteur";
import Favoris from "./components/Favoris";

export default [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home},
    { path: '/login', component: Login},
    { path: '/register', component: Register},
    { path: '/films', alias: '/films/*', component: Films},
    { path: '/acteurs', alias: '/acteurs/*', component: Acteurs},
    { path: '/film/:id', component: Film, name: "film", props: true},
    { path: '/actor/:id', component: Acteur, name: "acteur", props: true},
    { path: '/favoris', component: Favoris}
]