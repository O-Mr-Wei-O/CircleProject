import React from 'react';
import './Register.css';

import {connect} from 'react-redux';
import {postRegister, validate} from 'actions/register';

import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';

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
        };
    }

    //这一步是更改Input后面箭头的关键
    //在接收到新的props后进行state的更改，从而重新渲染页面
    //
    componentWillReceiveProps(Props) {
        // console.log('接收到新的Props');
        // 只有不同时才会修改，如果两次都是错的，那么不重新渲染页面，提高性能
        if(this.props.registerData.email != Props.registerData.email){
            this.setState({
                emailValidate: Props.registerData.email
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
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
        console.log(email);
        // 设置成检查中的状态
        // this.setState({
        //     emailValidate:'validating'
        // });
        this.props.validate(email);
    };

    // EmailState=()=>{
    //     if (this.props.registerData.email ==true){
    //         this.setState({
    //             emailValidate:'success'
    //         });
    //     }else{
    //         this.setState({
    //             emailValidate:'error'
    //         });
    //     }
    // }

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
                                <Button onClick={() => this.setState({captchaState: true})}>Get captcha</Button>
                            }

                            {
                                this.state.captchaState === true
                                &&
                                <Button disabled>Had Send!</Button>
                            }

                        </Col>
                    </Row>
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Register</Button>
                </FormItem>
            </Form>
        );
    }
}

const Register = Form.create()(RegisterFrom);
export default connect((state) => ({registerData: state.register}), {postRegister, validate})(Register);
// export default connect((state) => ({registerData: state}), {postRegister, validate})(Register);