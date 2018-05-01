import VueRouter from 'vue-router';
let routes = [
    {
        name:'main',
        path: '/',
        children: [
        {
            path:'/user',
            component : require('../components/maincomps/MainChildren/User.vue'),
            children:[
                //load user comps here
                //Post job
                //Alati 
                //Scans
                //Bids
                //MyJobs
            ]
        },
        {
            path:'pentester',
            children:[
                //load pentester comps
                //AllJobs
                //JobsApplication
                //CvPoster
                //PortfolioPoster
                //SkillsTest
                //Superior Application
            ],
            component : require('../components/maincomps/MainChildren/Pentester.vue'),
        },
        {
            path:'moderator',
            children:[
                //Load moderator comps
                //UserBanner
                //AllJobs

            ],
            component : require('../components/maincomps/MainChildren/Moderator.vue'),
        },
        {
            path:'admin',
            children:[
                //Load admin vues
                //PostViewer 
                //MessageReplierLander
            ],
            component : require('../components/maincomps/MainChildren/Admin.vue'),
        }
        

        ],
        component: require('../components/maincomps/Main.vue')
    },
    {
        path:'*',
        redirect:'/'
    }
]

export default new VueRouter({
    routes
});