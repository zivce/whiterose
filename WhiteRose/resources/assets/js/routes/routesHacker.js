
let routesH = [
    {
        name:'main',
        path: '/hacker',
        meta:{redirectIfLoggedIn:true},
        children: [
        {
            path:'/loginahcker',
            component : require('../components/Hacker/LoginHacker.vue'),
        },
        {
            path:'/registerclient',
            component : require('../components/Hacker/RegHacker.vue'),
        }
        ],
        component: require('../components/Hacker/MainHacker.vue')
    }
]

export default routesH;