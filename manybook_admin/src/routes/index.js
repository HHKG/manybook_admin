import {lazy} from 'react';
const Home=lazy(()=>import('../pages/Home'));
const Login=lazy(()=>import('../pages/Login'));

let router=[
    {
        path:'/',
        component:Home,
        exact:true
    },
    {
        path:'/Login',
        component:Login
    }
];

export default router;
