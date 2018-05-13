import VueRouter from 'vue-router';


let routes = [
    {
        path:'/home',
        component: require('../components/maincomps/Home.vue')
    },
    {
        name:'main',
        path: '/',
        redirect : 'home',
        children: [
        {
            path:`user/:id`,
            redirect : `user/:id/dashboard/setup`,
            component : require('../components/maincomps/MainChildren/User.vue'),
            children:[
                {
                    path:'dashboard',
                    children:[
                    {
                        meta:{
                            fail: `user/:id/`
                        },
                        path: "messages",
                        component: require('../components/maincomps/UserChildren/Dashboard/Messages.vue')
                    },
                    {
                        
                        meta:{
                            fail: `user/:id/`
                        },
                        path: "data",
                        component: require('../components/maincomps/UserChildren/Dashboard/Data.vue')
                    },
                    
                    {
                        
                        meta:{
                            fail: `user/:id/`
                        },
                        path: "setup",
                        component: require('../components/maincomps/UserChildren/Dashboard/Setup.vue')
                    }
                    

                    ],
                    component: require('../components/maincomps/UserChildren/DashboardClient.vue')
                },
                //load user comps here
                {
                    path:'postjob',
                    component: require('../components/maincomps/UserChildren/PostJob.vue')

                },
                {
                    path: "search",
                    component: require('../components/maincomps/UserChildren/Search.vue')
                },
                
                {
                    path:'tools',
                    children:[
                        {
                            path:'/:id/udp-nmap',
                            component: require('../components/maincomps/UserChildren/FewTools/NmapUDP.vue')
                        },
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
            path:'pentester/:id',
            redirect : 'pentester/:id/dashboard/setup',
            component : require('../components/maincomps/MainChildren/Pentester.vue'),
            children:[ 
                {
                path:'dashboard',
                children:[
                {
                    meta:{
                        fail: `pentester/:id/`
                    },
                    path: "messages",
                    component: require('../components/maincomps/PentesterChildren/Dashboard/Messages.vue')
                },
                {
                    
                    meta:{
                        fail: `pentester/:id/`
                    },
                    path: "data",
                    component: require('../components/maincomps/PentesterChildren/Dashboard/Data.vue')
                },
                
                {
                    
                    meta:{
                        fail: `pentester/:id/`
                    },
                    path: "setup",
                    component: require('../components/maincomps/PentesterChildren/Dashboard/Setup.vue')
                },
                
                {
                    
                    meta:{
                        fail: `pentester/:id/`
                    },
                    path: "profile",
                    component: require('../components/maincomps/PentesterChildren/Dashboard/Profile.vue')
                }
                

                ],
                component: require('../components/maincomps/PentesterChildren/DashboardPentester.vue')
            },
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
                    path:'portfoliopost',
                    component: require('../components/maincomps/PentesterChildren/PortfolioPost.vue')
                },
                {
                    path:'skillstest',
                    component: require('../components/maincomps/PentesterChildren/SkillsTest.vue')
                }
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