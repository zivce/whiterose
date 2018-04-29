
let routesC = [
    {
        name:'main',
        path: '/client',
        meta:{redirectIfLoggedIn:true},
        children: [
        {
            path:'/loginclient',
            component : require('../components/Client/LoginClient.vue'),
        },
        {
            path:'/registerclient',
            component : require('../components/Client/RegClient.vue'),
        }
        ],
        component: require('../components/Client/MainClient.vue')
    }
]

export default routesC;