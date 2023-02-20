import { createRouter, createWebHistory } from 'vue-router'
import Accueil from "./components/Accueil.vue";
import Login from "./components/Login.vue";
import NotFoundView from "./components/404.vue"

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: "accueil", component: Accueil },
        { path: '/login', name: "login", component: Login },
        {
            path: '/:patchMatcj(.*)*0',
            name: "notFound",
            component: NotFoundView
        }
    ]
})