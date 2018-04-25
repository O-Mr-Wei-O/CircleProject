import React from 'react';
import './Register.css';

import {connect} from 'react-redux';
import {postRegister, validate, sendCaptcha} from 'actions/register';

import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    message,
    notification
} from 'antd';
import {Link} from 'react-router-dom';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


class RegisterFrom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            // 验证码状态
            // false为未发送状态，true为以发送状态
            // 已发送则更改按钮
            captchaState: false,
            // 验证Email,'success', 'error', 'validating'
            emailValidate: '',
            registerStatus: ''
        };
    }

    //这一步是更改Input后面箭头的关键
    //在接收到新的props后进行state的更改，从而重新渲染页面
    //
    componentWillReceiveProps(Props) {
        // console.log('接收到新的Props');
        // 只有不同时才会修改，如果两次都是错的，那么不重新渲染页面，提高性能
        if (this.props.registerData.email != Props.registerData.email) {
            this.setState({
                emailValidate: Props.registerData.email
            });
        }
        // 当接收到server返回的注册成功信息时，提示用户
        if (Props.registerData.status == 'success') {
            // console.log('---------------');
            notification.open({
                message: '恭喜你',
                description: '注册成功',
            });
            this.setState({
                registerStatus: 'success'
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (values.captcha.toLowerCase() == this.props.registerData.captcha.toLowerCase() && this.state.emailValidate == 'success') {
                    // console.log('Received values of form: ', values);
                    this.props.postRegister(values);
                } else if (values.captcha.toLowerCase() != this.props.registerData.captcha.toLowerCase()) {
                    message.error('验证码错误，请重新填写');
                } else if (this.state.emailValidate != 'success') {
                    message.error('邮箱已存在，请重新填写');
                }
            }
        });
    };

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    // 将邮箱地址发送给后台进行查询
    checkEmail = (email) => {
        // console.log(email);
        if (email) {
            this.props.validate(email);
        }
    };

    // 验证码
    Captcha = (email) => {
        this.setState({
            captchaState: true
        });
        // console.log(email);
        if (email) {
            this.props.sendCaptcha(email);
        }
    };

    render() {
        console.log(this.props);
        console.log(this.state);

        const {getFieldDecorator} = this.props.form;
        const {autoCompleteResult} = this.state;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <Form onSubmit={this.handleSubmit} id={'registerForm'}>
                <FormItem
                    {...formItemLayout}
                    label="E-mail"
                    hasFeedback
                    validateStatus={this.state.emailValidate}
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input onBlur={() => this.checkEmail(this.props.form.getFieldValue('email'))}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Password"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'Please input your password!',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Confirm Password"
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                            Nickname&nbsp;
                            <Tooltip title="What do you want others to call you?">
                                <Icon type="question-circle-o"/>
                            </Tooltip>
                        </span>
                    )}
                >
                    {getFieldDecorator('nickname', {
                        rules: [{required: true, message: 'Please input your nickname!', whitespace: true}],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Captcha"
                    extra="We must make sure that your email is unique."
                >
                    <Row gutter={8}>
                        <Col span={12}>
                            {getFieldDecorator('captcha', {
                                rules: [{required: true, message: 'Please input the captcha you got!'}],
                            })(
                                <Input/>
                            )}
                        </Col>
                        <Col span={12}>
                            {
                                this.state.captchaState === false
                                &&
                                <Button onClick={() => this.Captcha(this.props.form.getFieldValue('email'))}>Get
                                    captcha</Button>
                            }

                            {
                                this.state.captchaState === true
                                &&
                                <Button disabled>Had Send!</Button>
                            }

                        </Col>
                    </Row>
                </FormItem>
                {
                    this.state.registerStatus != 'success'
                    &&
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">Register</Button>
                    </FormItem>
                }

                {
                    this.state.registerStatus == 'success'
                    &&
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" onClick={() => sessionStorage.setItem('current','login')}><Link to={'/Login'}>注册成功，点击登录</Link></Button>
                    </FormItem>
                }
            </Form>
        );
    }
}

RegisterFrom.defaultProps = {
    registerData: {
        status: '',
        email: '',
        captcha: ''
    }
};

const Register = Form.create()(RegisterFrom);
export default connect((state) => ({registerData: state.register}), {postRegister, validate, sendCaptcha})(Register);