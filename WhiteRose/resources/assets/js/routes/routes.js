
let routes = [
    {
        name:'main',
        path: '/',
        meta:{redirectIfLoggedIn:true},
        children: [
        {
            path:'/lander',
            component : require('../components/Lander.vue'),
        }
        ],
        component: require('../components/MainLander.vue')
    }
]

export default routes;