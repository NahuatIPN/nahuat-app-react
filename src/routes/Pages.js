import Home from "../app/components/Home";
import Login from "../app/components/Login";

export const privatePageList = [
    {
        path: '/home',
        name:'Home',
        component: Home
    }

]

export const publicPageList = [
    {
        path: '/',
        name:'Login',
        component: Login
    }
]

