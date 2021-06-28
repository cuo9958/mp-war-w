import Game from '../pages/game';
import Login from '../pages/login';

export default [
    // {
    //     /**
    //      * 页面名,菜单命中
    //      */
    //     name: 'home',
    //     /**
    //      * 显示名称
    //      */
    //     title: '',
    //     /**
    //      * 图标
    //      */
    //     icon: '',
    //     /**
    //      * url路径
    //      */
    //     path: '/',
    //     /**
    //      * 页面组件
    //      */
    //     page: Dash,
    //     /**
    //      * 是否强制匹配
    //      */
    //     exact: true,
    //     /**
    //      * 是否隐藏外层视图
    //      */
    //     hideLayout: false,
    //     /**
    //      * 是否不在菜单展示
    //      */
    //     hide: false,
    // },
    //管理首页
    { name: 'dash', title: '项目管理', path: '/', icon: 'fa fa-dashboard', page: Game, exact: true },
    //登录
    { name: 'login', title: '登录', path: '/login', page: Login, exact: true, hide: true, hideLayout: true },

    // { name: 'test', path: '*', page: Test, exact: true, hide: true }
];
