import {lazy} from 'react';

const Home =lazy(()=>import('../pages/Home'));
const Login=lazy(()=>import('../pages/Login'));

let routes=[
    {
        path:'/',
        name:'Home',
        component:Home,
        exact:true
    },
    {
        path:'/Login',
        name:'Login',
        component:Login,
    }
];

export default routes;