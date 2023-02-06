import Vue from "vue";
import store from "./store";
import Router from "vue-router";
import { i18n } from "./plugins/i18n";
import authenticate from "./auth/authenticate";
import IsConnected from "./auth/IsConnected";
import NProgress from "nprogress";
Vue.use(Router);

const routes = [
    {
        path: "/",
        component: () => import("./views/app"),
        redirect: "/app/obreport",

        children: [
            {
                path: "/app/obreport",
                component: () =>
                    import(
                        /* webpackChunkName: "obreport" */ "./views/app/pages/obreport"
                    ),
                redirect: "/app/obreport/list",
                children: [
                    {
                        name: "index_obreport",
                        path: "list",
                        component: () =>
                            import(
                                "./views/app/pages/obreport/index_obreport"
                            )
                    },
                    {
                        name: "store_obreport",
                        path: "store",
                        component: () =>
                            import(
                                /* webpackChunkName: "store_obreport" */
                                "./views/app/pages/obreport/create_obreport"
                            )
                    },
                    {
                        name: "edit_obreport",
                        path: "edit/:id",
                        component: () =>
                            import(
                                /* webpackChunkName: "edit_obreport" */
                                "./views/app/pages/obreport/edit_obreport"
                            )
                    },
                    {
                        name: "detail_obreport",
                        path: "detail/:id",
                        component: () =>
                            import(
                                /* webpackChunkName: "detail_obreport" */
                                "./views/app/pages/obreport/detail_obreport"
                            )
                    },
                ]
            },
        ]

    }
]

const router = new Router({
    mode: "history",
    linkActiveClass: "open",
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
});

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject)
        return originalPush.call(this, location, onResolve, onReject);
    return originalPush.call(this, location).catch(err => err);
};

router.beforeEach((to, from, next) => {
    // If this isn't an initial page load.
    if (to.path) {
        // Start the route progress bar.
        NProgress.start();
        NProgress.set(0.1);
    }
    next();

    if (
        store.state.language.language &&
        store.state.language.language !== i18n.locale
    ) {
        i18n.locale = store.state.language.language;
        next();
    } else if (!store.state.language.language) {
        store.dispatch("language/setLanguage", navigator.languages).then(() => {
            i18n.locale = store.state.language.language;
            next();
        });
    } else {
        next();
    }
});

router.afterEach(() => {
    // Remove initial loading
    const gullPreLoading = document.getElementById("loading_wrap");
    if (gullPreLoading) {
        gullPreLoading.style.display = "none";
    }
    // Complete the animation of the route progress bar.
    setTimeout(() => NProgress.done(), 500);
    // NProgress.done();

    if (window.innerWidth <= 1200) {
        store.dispatch("changeSidebarProperties");
        if (store.getters.getSideBarToggleProperties.isSecondarySideNavOpen) {
            store.dispatch("changeSecondarySidebarProperties");
        }

        if (store.getters.getCompactSideBarToggleProperties.isSideNavOpen) {
            store.dispatch("changeCompactSidebarProperties");
        }
    } else {
        if (store.getters.getSideBarToggleProperties.isSecondarySideNavOpen) {
            store.dispatch("changeSecondarySidebarProperties");
        }
    }
});

async function Check_Token(to, from, next) {
    let token = to.params.token;
    const res = await axios
        .get("password/find/" + token)
        .then(response => response.data);

    if (!res.success) {
        next("/app/sessions/signIn");
    } else {
        return next();
    }
}

export default router;

