
let routes = [
    {
        name:'main',
        path: '/main',
        children: [
        {
            path:'user',
            component : require('../components/maincomps/User.vue'),
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
            component : require('../components/maincomps/Pentester.vue'),
        },
        {
            path:'moderator',
            children:[
                //Load moderator comps
                //UserBanner
                //AllJobs

            ],
            component : require('../components/maincomps/Moderator.vue'),
        },
        {
            path:'admin',
            children:[
                //Load admin vues
                //PostViewer 
                //MessageReplierLander
            ],
            component : require('../components/maincomps/Admin.vue'),
        }
        

        ],
        component: require('../components/maincomps/Main.vue')
    }
]

export default routes;