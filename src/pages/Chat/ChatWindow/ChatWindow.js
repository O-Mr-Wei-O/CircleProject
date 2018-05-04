import React from 'react';
import socket from '../../../socket.io/socket.io';

import {Button, Input, Tag, Tooltip, message,notification} from 'antd';

const openNotification = (from,msg) => {
    notification.open({
        message: from+'给你发消息了',
        description: msg,
    });
};


socket.on('checkUserOnlineReturn', (value) => {
    if (value == true) {
        message.success('此用户在线');
    } else {
        message.error('此用户不在线');
    }
});

socket.on('pmsg', (from,value) => {
    openNotification(from,value);
    const div=document.createElement('div');
    const span=document.createElement('span');
    div.className='chatLeft';
    span.innerText=value;
    div.appendChild(span);
    document.getElementById('chatContainer').appendChild(div);
});

class ChatWindow extends React.Component {
    constructor(props) {
        super(props);
    }

    // 展开或者首页聊天窗口
    openOrhide() {
        if (this.refs.chatwindow.style.overflow == 'hidden') {
            socket.emit('checkUserOnline', this.props.nickname);
            this.refs.chatwindow.style.overflow = 'auto';
            this.refs.chatwindow.style.maxHeight = 'none';
        } else if (this.refs.chatwindow.style.overflow == 'auto') {
            this.refs.chatwindow.style.overflow = 'hidden';
            this.refs.chatwindow.style.maxHeight = '55px';
        }
    }

    sendMsg() {
        const privatemessage = document.getElementById('inputWord').value;
        socket.emit('private_message', sessionStorage.getItem('email'), this.props.nickname, privatemessage);
        const div1=document.createElement('div');
        div1.className='chatRight';
        const span1=document.createElement('span');
        span1.innerText=privatemessage;
        div1.appendChild(span1);
        // console.log(div1);
        document.getElementById('chatContainer').appendChild(div1);
        document.getElementById('inputWord').value = '';
    }

    render() {
        return (
            <div className={'chatWindow'} ref={'chatwindow'} style={{maxHeight: '55px', overflow: 'hidden'}}>
                <Tooltip title="点击展开/关闭">
                    <Button type="dashed" onClick={() => this.openOrhide()}>与{this.props.nickname}聊天</Button>
                </Tooltip>
                <div id={'chatContainer'}>

                </div>
                <div className={'sendMsg'}>
                    <Input placeholder={'请输入...'} id={'inputWord'}></Input>
                    <Button type={'primary'} onClick={() => this.sendMsg()}>Send</Button>
                </div>
            </div>
        );
    }
}

export default ChatWindow;