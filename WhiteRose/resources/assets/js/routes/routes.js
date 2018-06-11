import VueRouter from "vue-router";
let routes = [
  {
    name: "lander",
    path: "/",
    redirect: "lander",
    children: [
      {
        path: "lander",
        component: require("../components/Lander.vue")
      },
      {
        path: "client",
        redirect : "client/login",
        name: "land_client",
        children: [
          {
            name: "client_log",
            path: "login",
            component: require("../components/Client/LoginClient.vue")
          },
          {
            name: "client_reg",
            path: "register",
            component: require("../components/Client/RegClient.vue")
          }
        ],
        component: require("../components/Client/MainClient.vue")
      },
      {
        name: "land_hacker",
        redirect : "hacker/login",
        path: "hacker",
        children: [
          {
            name: "hacker_log",
            path: "login",
            component: require("../components/Hacker/LoginHacker.vue")
          },
          {
            name: "hacker_reg",
            path: "register",
            component: require("../components/Hacker/RegHacker.vue")
          }
        ],
        component: require("../components/Hacker/MainHacker.vue")
      },
      {
        path: "admin",
        component: require("../components/Admin/AdminLogin.vue")
      },
     
    ],
    component: require("../components/MainLander.vue")
  },
  {
    path: "*",
    redirect: "/lander"
  }
];

export default new VueRouter({
  routes
});
