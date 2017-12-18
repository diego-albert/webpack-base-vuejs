import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    root: '/',
    base: __dirname,
    //saveScrollPosition: true,
    routes: [
        {
            path: '/',
            name: 'home',
            component: require('../../views/home/index.vue')
        }
    ],
});

router.beforeEach((to, from, next) => {

    console.log("GOING TO: ", to.path, to.name, to.params );
    next();

});

export default router
