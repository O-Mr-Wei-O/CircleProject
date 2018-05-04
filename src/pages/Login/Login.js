import React, {Component} from 'react';
import './Login.css';
import {Form, Icon, Input, Button, Checkbox, notification} from 'antd';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {postLogin} from 'actions/login';

import socket from '../../socket.io/socket.io';

const FormItem = Form.Item;

// 用户登录
const openNotificationWithIcon = (email) => {
    notification['success']({
        message: '新用户通知',
        description: '用户' + email + '已登录',
    });
};

// 全体广播
const openNotificationWithIcon1 = (text) => {
    notification['success']({
        message: '广播',
        description: text,
    });
};

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: null
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.postLogin(values);
                // console.log(values);
            }
        });
    };

    componentWillReceiveProps(Props) {
        if (Props.loginData.login != this.props.loginData.login) {
            this.setState({
                status: Props.loginData.login
            });
            if (Props.loginData.login == 'loginSuccess') {
                // 设置nickname
                sessionStorage.setItem('nickname', Props.loginData.nickname);
                // 设置email，每位用户唯一
                sessionStorage.setItem('email', Props.loginData.email);
                // 设置管理员，1是，0不是
                sessionStorage.setItem('admin', Props.loginData.admin);

                //登陆成功后进行连接server以便接受广播等
                socket.emit('email', Props.loginData.email);
                socket.on('successlogin', (val) => console.log(val));
                // 新用户登录
                socket.on('newLogin', (email) => openNotificationWithIcon(email));
                socket.on('broadcast', (text) => openNotificationWithIcon1(text));
            }
        }
    }

    render() {
        // console.log(this.props.loginData.login);
        const {getFieldDecorator} = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit} className="login-form" id={'components-form-demo-normal-login'}>
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="email"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="Password"/>
                    )}
                </FormItem>
                {
                    this.state.status != 'loginSuccess'
                    &&
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Login
                        </Button>
                        Or <span onClick={() => sessionStorage.setItem('current', 'register')}><Link to="/register">register now!</Link></span>
                    </FormItem>
                }
                {
                    this.state.status == 'loginSuccess'
                    &&
                    <Button style={{width: '100%'}} type="primary" ghost onClick={
                        () => sessionStorage.setItem('current', 'home')
                    }><Link to={'/'}>登录成功，点击跳转</Link></Button>
                }

                {
                    this.state.status == 'loginFail'
                    &&
                    <div>
                        <Button style={{width: '100%', marginBottom: '30px'}} type='danger' ghost>登录失败</Button>
                        <Button style={{width: '100%'}}><Link to={'/retrieve'}>找回密码</Link></Button>
                    </div>
                }

                {
                    this.state.status == 'baned'
                    &&
                    <Button style={{width: '100%'}} type='danger' ghost><Link
                        to={'/unseal'}>您已被封禁，点击申请解封</Link></Button>
                }
            </Form>
        );
    }
}

const Login = Form.create()(LoginForm);
export default connect((state) => ({loginData: state.login}), {postLogin})(Login);