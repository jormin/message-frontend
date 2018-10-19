import VueRouter from 'vue-router'
import Index from '../components/Index';
import Login from '../components/Login';
import Register from '../components/Register';
import SendMessage from '../components/SendMessage';
import Message from '../components/Message';
import SendComment from '../components/SendComment';
import VerifyEmail from '../components/VerifyEmail';

const routes = [
    { path: '/', component: Index },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/sendMessage', component: SendMessage },
    { path: '/message/:id', component: Message },
    { path: '/sendComment/:id', component: SendComment },
    { path: '/verifyEmail/:code', component: VerifyEmail }
]

export default new VueRouter({
    routes,
})