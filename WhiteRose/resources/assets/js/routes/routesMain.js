import VueRouter from 'vue-router';


let routes = [
    // {
    //     path:'/home',
    //     component: require('../components/maincomps/Home.vue')
    // },
    {
        name:'main',
        path: '/',
       
        children: [
        {
            path:`client/:id`,
            redirect : {name: 'postj'},
            meta: {
                client : true
            },
            component : require('../components/maincomps/MainChildren/User.vue'),
            children:[
                {
                    name:'spec_bid',
                    path:'bids/:job_id',
                    props:true,
                    component :require('../components/maincomps/UserChildren/SpecificJobBid.vue')
                },
                {
                    name:'sites_all',
                    path:'allsites',
                    component: require('../components/maincomps/UserChildren/VerifySites.vue')
                },
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

                        //Injected component for preview in conversation with pentester
                        
                        name : 'preview_pentester',
                        path : 'pentester-preview/:pent_id',
                        component: require('../components/maincomps/PentesterChildren/Dashboard/Profile.vue')
                    },
                    {
                        
                        meta:{
                            fail: `client/:id/`
                        },
                        path: "profile",
                        component: require('../components/maincomps/UserChildren/Dashboard/Profile.vue')
                    }
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
                    name : 'bids_table',
                    path:'bids',
                    component: require('../components/maincomps/UserChildren/Bids.vue')
                    
                }
               
            ]
        },
        {
            path:'pentester/:id',
            redirect : {name: 'cvpost'},
            meta: {
                pentester : true
            },
            component : require('../components/maincomps/MainChildren/Pentester.vue'),
            children:[ 
                {
                    name: 'find_jobs_pentester',
                    path: 'findjobs',
                    component: require('../components/maincomps/PentesterChildren/FindJob.vue')
                }, 
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
                    name:'setup_pent',
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
                    name: 'cvpost',
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
            meta: {
                admin : true
            },
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