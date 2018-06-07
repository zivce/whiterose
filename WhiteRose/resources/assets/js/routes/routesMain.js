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
            path:`client/:id`,
            redirect : {name: 'postj'},
            component : require('../components/maincomps/MainChildren/User.vue'),
            children:[
                {
                    name:'tokens',
                    path:'purchasetokens',
                    component: require('../components/maincomps/TokenCharger.vue')
                },
                {
                    path:'dashboard',
                    children:[
                    {
                        meta:{
                            fail: `client/:id/`
                        },
                        name:"client_messages",
                        path: "messages",
                        component: require('../components/maincomps/UserChildren/Dashboard/Messages.vue')
                    },
                    {
                        
                        meta:{
                            fail: `client/:id/`
                        },
                        path: "data",
                        component: require('../components/maincomps/UserChildren/Dashboard/Data.vue')
                    },
                    
                    {
                        
                        meta:{
                            fail: `client/:id/`
                        },
                        name:"setup_client",
                        path: "setup",
                        component: require('../components/maincomps/UserChildren/Dashboard/Setup.vue')
                    },
                
                    {
                        
                        meta:{
                            fail: `client/:id/`
                        },
                        path: "profile",
                        component: require('../components/maincomps/UserChildren/Dashboard/Profile.vue')
                    },
                    {
                        meta:{
                            fail: `client/:id/`
                        },
                        path: "/convo/:pent_id",
                        component: require('../components/maincomps/UserChildren/Dashboard/Conversation.vue')
                    },

                    ],
                    component: require('../components/maincomps/UserChildren/DashboardClient.vue')
                },
                //load user comps here
                {
                    name:'convo_client',
                    path: "convo/:job_id",
                    component: require('../components/maincomps/UserChildren/Dashboard/Conversation.vue')
                },
                {
                    name: 'postj',
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
                            name:'udp_nmap',
                            path:'udp-nmap',
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
                   name:'jobs',
                   path:'jobs',
                   redirect:{name:'myjobs'},
                    children : [
                        {
                            name:'myjobs',
                            path:'myjobs',
                            component: require('../components/maincomps/UserChildren/MyJobs.vue')
                        },

                        {
                            name:'finjobs',
                            path:'finishedjobs',
                            component: require('../components/maincomps/UserChildren/FinishedJobs.vue')

                        },
                        {
                            name:'startedjobs',                    
                            path:'startedjobs',
                            component: require('../components/maincomps/UserChildren/StartedJobs.vue')

                        },
                    ],
                    component : require('../components/maincomps/UserChildren/Jobs.vue')

                },
                {
                    path:'bids',
                    component: require('../components/maincomps/UserChildren/Bids.vue')

                }
               
            ]
        },
        {
            path:'pentester/:id',
            redirect : {name: 'cvpost'},
            component : require('../components/maincomps/MainChildren/Pentester.vue'),
            children:[  
                {
                name:'tokens',
                path:'purchasetokens',
                component: require('../components/maincomps/TokenCharger.vue')
                },
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
                    name:'jobs_pentester',
                    redirect:{name:'myjobs_pentester'},
                    children : [
                        {
                            name:'myjobs_pentester',
                            path:'myjobs',
                            component: require('../components/maincomps/PentesterChildren/MyJobs.vue')
                        },

                        {
                            name:'finjobs_pentester',
                            path:'finishedjobs',
                            component: require('../components/maincomps/PentesterChildren/FinishedJobs.vue')

                        },
                        {
                            name:'startedjobs_pentester',                    
                            path:'startedjobs',
                            component: require('../components/maincomps/PentesterChildren/StartedJobs.vue')

                        },
                    ],
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
                },
                {
                    name:'convo',
                    path: "convo/:job_id",
                    component: require('../components/maincomps/PentesterChildren/Dashboard/Conversation.vue')
                },
            ],
            component : require('../components/maincomps/MainChildren/Pentester.vue'),
        },
        {
            path:'admin/:id',
            redirect : {name : 'banuser'},
            children:[
                //Load admin comps
                {
                    name : 'banuser',
                    path:'userbaner',
                    component: require('../components/maincomps/AdminChildren/UserBan.vue')
                },
                {
                    name : 'alljobsreview',
                    path:'alljobsreviewer',
                    component: require('../components/maincomps/AdminChildren/AllJobsReviewer.vue')
                },
            ],
            component : require('../components/maincomps/MainChildren/Admin.vue'),
        },
        {
            path:'moderator',
            children:[
                //Load moderator vues
                {
                    path:'messagereplier',
                    component: require('../components/maincomps/ModeratorChildren/MessageReplier.vue')
                },
                {
                    path:'postviewer',
                    component: require('../components/maincomps/ModeratorChildren/PostViewer.vue')
                },
            ],
            component : require('../components/maincomps/MainChildren/Moderator.vue'),
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