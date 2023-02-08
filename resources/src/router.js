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
                    // People
                    {
                path: "/app/People",
                component: () =>
                    import(
                        /* webpackChunkName: "People" */ "./views/app/pages/people"
                    ),
                redirect: "/app/People/Customers",
                children: [
                    // Customers
                    {
                        name: "Customers",
                        path: "Customers",
                        component: () =>
                            import(
                                /* webpackChunkName: "Customers" */ "./views/app/pages/people/customers"
                            )
                    },

                    // Suppliers
                    {
                        name: "Suppliers",
                        path: "Suppliers",
                        component: () =>
                            import(
                                /* webpackChunkName: "Suppliers" */ "./views/app/pages/people/providers"
                            )
                    },

                    // Users
                    {
                        name: "user",
                        path: "Users",
                        component: () =>
                            import(
                                /* webpackChunkName: "Users" */ "./views/app/pages/people/users"
                            )
                    }
                ]
                    },
                    // Settings
                    {
                path: "/app/settings",
                component: () =>
                    import(
                        /* webpackChunkName: "settings" */ "./views/app/pages/settings"
                    ),
                redirect: "/app/settings/System_settings",
                children: [
                    // Permissions
                    {
                        path: "permissions",
                        component: () =>
                            import(
                                /* webpackChunkName: "permissions" */ "./views/app/pages/settings/permissions"
                            ),
                        redirect: "/app/settings/permissions/list",
                        children: [
                            {
                                name: "groupPermission",
                                path: "list",
                                component: () =>
                                    import(
                                        /* webpackChunkName: "groupPermission" */
                                        "./views/app/pages/settings/permissions/Permissions"
                                    )
                            },
                            {
                                name: "store_permission",
                                path: "store",
                                component: () =>
                                    import(
                                        /* webpackChunkName: "store_permission" */
                                        "./views/app/pages/settings/permissions/Create_permission"
                                    )
                            },
                            {
                                name: "edit_permission",
                                path: "edit/:id",
                                component: () =>
                                    import(
                                        /* webpackChunkName: "edit_permission" */
                                        "./views/app/pages/settings/permissions/Edit_permission"
                                    )
                            }
                        ]
                    },

                     // sms_settings
                     {
                        name: "sms_settings",
                        path: "sms_settings",
                        component: () =>
                            import(
                                /* webpackChunkName: "sms_settings" */ "./views/app/pages/settings/sms_settings"
                            )
                    },

                    // pos_settings
                    {
                    name: "pos_settings",
                    path: "pos_settings",
                    component: () =>
                        import(
                            /* webpackChunkName: "pos_settings" */ "./views/app/pages/settings/pos_settings"
                        )
                    },

                     // payment_gateway
                     {
                        name: "payment_gateway",
                        path: "payment_gateway",
                        component: () =>
                            import(
                                /* webpackChunkName: "payment_gateway" */ "./views/app/pages/settings/payment_gateway"
                            )
                        },

                        // mail_settings
                     {
                        name: "mail_settings",
                        path: "mail_settings",
                        component: () =>
                            import(
                                /* webpackChunkName: "mail_settings" */ "./views/app/pages/settings/mail_settings"
                            )
                        },

                         // update_settings
                     {
                        name: "update_settings",
                        path: "update_settings",
                        component: () =>
                            import(
                                /* webpackChunkName: "update_settings" */ "./views/app/pages/settings/update_settings"
                            )
                        },

                    // currencies
                    {
                        name: "currencies",
                        path: "Currencies",
                        component: () =>
                            import(
                                /* webpackChunkName: "Currencies" */ "./views/app/pages/settings/currencies"
                            )
                    },

                    // Backup
                    {
                        name: "Backup",
                        path: "Backup",
                        component: () =>
                            import(
                                /* webpackChunkName: "Backup" */ "./views/app/pages/settings/backup"
                            )
                    },

                    // Warehouses
                    {
                        name: "Warehouses",
                        path: "Warehouses",
                        component: () =>
                            import(
                                /* webpackChunkName: "Warehouses" */ "./views/app/pages/settings/warehouses"
                            )
                    },

                    // System Settings
                    {
                        name: "system_settings",
                        path: "System_settings",
                        component: () =>
                            import(
                                /* webpackChunkName: "System_settings" */ "./views/app/pages/settings/system_settings"
                            )
                    }

                ]
                    },
                    {
                        name: "profile",
                        path: "/app/profile",
                        component: () =>
                            import(
                                /* webpackChunkName: "profile" */ "./views/app/pages/profile"
                            )
                    }
                ]
            },
        ]

    },
    {
        path: "*",
        name: "NotFound",
        component: () =>
            import(
                /* webpackChunkName: "NotFound" */ "./views/app/pages/notFound"
            )
    },

    {
        path: "not_authorize",
        name: "not_authorize",
        component: () =>
            import(
                /* webpackChunkName: "not_authorize" */ "./views/app/pages/NotAuthorize"
            )
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

