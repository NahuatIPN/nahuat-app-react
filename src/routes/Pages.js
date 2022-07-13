import Database from "../app/components/database";
import Home from "../app/components/Home";
import Login from "../app/components/Login";

export const privatePageList = [
    {
        path: '/home',
        name:'Home',
        component: Home
    },
    {
        path:'/database',
        name:'Database',
        component: Database
    }

]

export const publicPageList = [
    {
        path: '/',
        name:'Login',
        component: Login
    }
]

