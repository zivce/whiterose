import VueRouter from 'vue-router';
let routes = [
    {
        name:'lander',
        path: '/',
        redirect:'lander',
        children: [
        {
            path:'lander',
            component : require('../components/Lander.vue'),
        },
        {
            path:'client',
            component : require('../components/Client/MainClient.vue'),
        },
        {
            path:'hacker',
            component : require('../components/Hacker/MainHacker.vue'),
        }
        ],
        component: require('../components/MainLander.vue')
    },
    {
        path:'*',
        redirect:'/lander'
    }
]


export default new VueRouter({
    routes
});