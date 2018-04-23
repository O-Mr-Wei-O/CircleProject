import React, {Component} from 'react';
import {Link, Redirect, Route} from 'react-router-dom';
import './Nav.css';
import {Menu, Icon} from 'antd';

import {Input} from 'antd';

const Search = Input.Search;

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Nav extends Component {
    state = {
        test: null,
    };
    handleClick = (e) => {
        // console.log('click ', e);
        sessionStorage.setItem('current', e.key);
        // this.setState({
        //     current: e.key,
        // });
    };

    render() {
        const nickname = sessionStorage.getItem('nickname');
        //使用session存储menu的键值，这样每次刷新就不会改变，只有在重开才会改变
        const current = sessionStorage.getItem('current') ? sessionStorage.getItem('current') : 'home';
        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[current]}
                mode="horizontal"
            >
                <span className={'social'}>S o c i a l  W e b</span>
                <Menu.Item key="home">
                    <Link to={'/'}><Icon type="home"/>首页</Link>
                </Menu.Item>
                <Menu.Item key="bars">
                    <Link to={'/circle'}><Icon type="bars"/>圈子</Link>
                </Menu.Item>
                <Menu.Item key="daily">
                    <Link to={'/daily'}><Icon type="form"/>写日记</Link>
                </Menu.Item>
                <Menu.Item key="search">
                    <Link to={'/search'}><Icon type="search"/>搜索</Link>
                </Menu.Item>
                {/*<Search*/}
                {/*placeholder="input search text"*/}
                {/*onSearch={value => console.log(value)}*/}
                {/*enterButton*/}
                {/*style={{width: '200px', marginLeft: '2%'}}*/}
                {/*/>*/}
                {
                    nickname == null
                    &&
                    <Menu.Item key="login" style={{float: 'right', marginRight: '7%'}}>
                        <Link to={'/Login'}><Icon type="login"/>登录</Link>
                    </Menu.Item>
                }
                {
                    nickname == null
                    &&
                    <Menu.Item key="register" style={{float: 'right'}}>
                        <Link to={'/Register'}><Icon type="user-add"/>注册</Link>
                    </Menu.Item>
                }

                {
                    nickname != null
                    &&
                    <Menu.Item key="logout" style={{float: 'right', marginRight: '7%'}}>
                        <span onClick={() => {
                            sessionStorage.removeItem('nickname');
                            sessionStorage.removeItem('email');
                            sessionStorage.removeItem('admin');
                            // 通过setState来重新渲染页面
                            // this.setState({
                            //     test:''
                            // });
                            location.reload();
                        }}>退出</span>
                    </Menu.Item>
                }

                {
                    nickname != null
                    &&
                    <Menu.Item key="userInfo" style={{float: 'right'}}>
                        <Link to={'/userInfo'}><Icon type="user"/>{nickname}</Link>
                    </Menu.Item>
                }

                {
                    nickname != null
                    &&
                    <Menu.Item key="admin" style={{float: 'right'}}>
                        <Link to={'/admin'}><Icon type="lock" />管理员</Link>
                    </Menu.Item>
                }
            </Menu>
        );
    }
}