import React from 'react';
import './Chat.css';

import {Button, Input, Tag, Tooltip} from 'antd';

import {connect} from 'react-redux';
import {getiFollowed} from 'actions/chat';
import ChatWindow from 'pages/Chat/ChatWindow/ChatWindow';

class Chat extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getiFollowed(sessionStorage.getItem('email'));
    }


    render() {
        // console.log(this.props.chatData);

        let followArr = [];
        let chatWindowArr = [];

        if (this.props.chatData.ifollow && this.props.chatData.ifollow.length==1) {
            // 获取我的关注
            const {ifollowemail} = this.props.chatData.ifollow[0];
            console.log(this.props.chatData.ifollow[0]);
            for (let i = 0; i < ifollowemail.split(',').length; i++) {
                followArr.push(
                    <Tag color="geekblue" key={i}>{ifollowemail.split(',')[i]}</Tag>
                );
                chatWindowArr.push(
                    <ChatWindow ref={ifollowemail.split(',')[i]} nickname={ifollowemail.split(',')[i]} key={i}/>
                );
            }
        }


        const email = sessionStorage.getItem('email');

        if (email) {
            return (
                <div className={'Chat'}>
                    <div className={'chatlist'}>
                        {
                            followArr.length == 0
                            &&
                            <span>您还没有关注的用户，赶紧去关注一个吧</span>
                        }
                        {
                            followArr.map(function (items) {
                                return items;
                            })
                        }
                    </div>
                    {
                        chatWindowArr.map(function (items) {
                            return items;
                        })
                    }
                </div>
            );
        } else {
            return (
                <div className={'noLogin'}>
                    请先登录！
                </div>
            );
        }
    }
}

export default connect((state) => ({chatData: state.chat}), {getiFollowed})(Chat);
// export default Chat;