import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Films from "./components/Films";
import Acteurs from "./components/Acteurs";
import Film from "./components/Film";
import Acteur from "./components/Acteur";
import Favoris from "./components/Favoris";
import SixNezService from "./SixNezService";
import VueRouter from "vue-router";

const Routes = new VueRouter({
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: Home},
        { path: '/login', component: Login},
        { path: '/register', component: Register},
        { path: '/films', alias: '/films/*', component: Films, meta: { requiresAuth: true }},
        { path: '/acteurs', alias: '/acteurs/*', component: Acteurs, meta: { requiresAuth: true }},
        { path: '/film/:id', component: Film, name: "film", props: true, meta: { requiresAuth: true }},
        { path: '/actor/:id', component: Acteur, name: "acteur", props: true, meta: { requiresAuth: true }},
        { path: '/favoris', component: Favoris, meta: { requiresAuth: true }}
    ],

    mode: 'history'
});


Routes.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!SixNezService.hasToken()) next({ path: '/home' });
        else next();
    } else next();
});

export default Routes;