import register from "./register";
import login from './login';
import logout from './logout';
import post from '../post/post';
import getReporters from './getReporters';
import getData from './getData';

const userController = {
    register,
    login,
    logout,
    post,
    getReporters,
    getData
};

export default userController;
