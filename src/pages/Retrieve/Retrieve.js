import React from 'react';
import './Retrieve.css';
import {Button, Input, message} from 'antd';

import {connect} from 'react-redux';
import {sendCapt, updatePwd} from 'actions/retrieve';


class Retrieve extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 发送状态，点击找回按钮发送烟瘴吗并且状态变为true
            sendStatus: false,
            // 验证状态，true为通过，false为未通过
            confirmStatus: false,
            inputEmail: null
        };
    }

    // 发送验证码
    sendCapture() {
        const inputEmail = document.getElementById('inputEmail').value;
        this.setState({
            inputEmail: inputEmail,
            sendStatus: true
        });
        this.props.sendCapt(inputEmail);
    }

    // 验证
    confirmCode() {
        const inputCapture = document.getElementById('inputCapture').value;
        if (this.props.retrieveData.code == inputCapture) {
            this.setState({
                confirmStatus: true
            });
        }else {
            message.error('验证码错误');
        }
    }

    // 改密码
    updataPwd() {
        const newPwd = document.getElementById('inputNewPwd').value;
        if (newPwd == '' || newPwd == null) {
            message.error('密码不能为空');
        } else {
            this.props.updatePwd(this.state.inputEmail, newPwd);
            this.setState({
                sendStatus: false,
                confirmStatus: false,
                inputEmail: null
            }, message.success('修改成功'));
        }
    }

    render() {
        return (
            <div className={'Retrieve'}>
                {
                    this.state.confirmStatus == false
                    &&
                    <div className={'RetrieveBg'}>
                        <div style={{width: '80%'}}>
                            <Input placeholder={'请输入要修改密码的账号'} style={{width: '60%'}} id={'inputEmail'}/>
                            {
                                this.state.sendStatus == false
                                &&
                                <Button type={'primary'} style={{width: '30%', marginLeft: '9%'}}
                                        onClick={() => this.sendCapture()}>发送验证码</Button>
                            }
                            {
                                this.state.sendStatus == true
                                &&
                                <Button type={'primary'} disabled
                                        style={{width: '30%', marginLeft: '9%'}}>已发送</Button>
                            }
                        </div>
                        <div style={{width: '80%'}}>
                            <Input placeholder={'输入验证码'} style={{width: '60%'}} id={'inputCapture'}/>
                            <Button style={{width: '30%', marginLeft: '9%'}}
                                    onClick={() => this.confirmCode()}>验证</Button>
                        </div>
                    </div>
                }
                {
                    this.state.confirmStatus == true
                    &&
                    <div className={'RetrieveBg'}>
                        <Input placeholder={'请输入新密码'} style={{width: '60%'}} id={'inputNewPwd'}/>
                        <Button style={{width: '30%'}} onClick={() => this.updataPwd()}>确认更改密码</Button>
                    </div>
                }
            </div>
        );
    }
}

export default connect((state) => ({retrieveData: state.retrieve}), {sendCapt, updatePwd})(Retrieve);

// export default Retrieve;