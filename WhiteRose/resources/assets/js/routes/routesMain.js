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
                {
                    path:'postjob',
                    component: require('../components/maincomps/UserChildren/PostJob.vue')

                },
                {
                    path:'tools',
                    children:[
                        {
                            path:'/udp-nmap',
                            component: require('../components/maincomps/UserChildren/FewTools/NmapUDP.vue')
                        }
                    ],
                    component: require('../components/maincomps/UserChildren/Tools.vue')

                }, 
                {
                    path:'scans',
                    component: require('../components/maincomps/UserChildren/Scans.vue')

                },
                {
                    path:'myjobs',
                    component: require('../components/maincomps/UserChildren/MyJobs.vue')

                },
                {
                    path:'bids',
                    component: require('../components/maincomps/UserChildren/Bids.vue')

                },
                {
                    path:'finishedjobs',
                    component: require('../components/maincomps/UserChildren/FinishedJobs.vue')

                },
                {
                    path:'startedjobs',
                    component: require('../components/maincomps/UserChildren/StartedJobs.vue')

                },
            ]
        },
        {
            path:'pentester',
            children:[
                //load pentester comps
                {
                    path:'alljobs',
                    component: require('../components/maincomps/PentesterChildren/AllJobs.vue')
                },
                {
                    path:'cvpost',
                    component: require('../components/maincomps/PentesterChildren/CvPost.vue')
                },
                {
                    path:'jobsapp',
                    component: require('../components/maincomps/PentesterChildren/JobsApp.vue')
                },
                {
                    path:'portfoliopost',
                    component: require('../components/maincomps/PentesterChildren/PortfolioPost.vue')
                },
                {
                    path:'skillstest',
                    component: require('../components/maincomps/PentesterChildren/SkillsTest.vue')
                },
                {
                    path:'superjobapp',
                    meta:{superuser:true},
                    component: require('../components/maincomps/PentesterChildren/SuperJobApp.vue')
                },
            ],
            component : require('../components/maincomps/MainChildren/Pentester.vue'),
        },
        {
            path:'moderator',
            children:[
                //Load moderator comps
                {
                    path:'userbanner',
                    component: require('../components/maincomps/ModeratorChildren/UserBan.vue')
                },
                {
                    path:'alljobsreviewer',
                    component: require('../components/maincomps/ModeratorChildren/AllJobsReviewer.vue')
                },
            ],
            component : require('../components/maincomps/MainChildren/Moderator.vue'),
        },
        {
            path:'admin',
            children:[
                //Load admin vues
                {
                    path:'messagereplier',
                    component: require('../components/maincomps/AdminChildren/MessageReplier.vue')
                },
                {
                    path:'postviewer',
                    component: require('../components/maincomps/AdminChildren/PostViewer.vue')
                },
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
const router = new VueRouter({
    routes
})



export default router;