import React from 'react';

import {connect} from 'react-redux';


import {Avatar, Button, message} from 'antd';
import {followUser} from 'actions/searchuser';

class Useritem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            follow: false
        };
    }

    clicktoFollow(followdemail,myemail) {
        this.props.followUser(followdemail,myemail);
        this.setState({
            follow: true
        }, message.success('关注成功'));
    }

    render() {
        // console.log(this.props);
        const followedme = this.props.info.followedme ? this.props.info.followedme : '';
        const email = sessionStorage.getItem('email');
        // 判断是否已关注
        const followStatus = followedme.toLowerCase().indexOf(email);
        // console.log(followStatus);
        // 判断是否是自己，如果是自己，则无关注按钮
        const isme = this.props.info.email.toLowerCase().indexOf(email);
        // console.log(isme);
        return (
            <div className={'Useritem'}>
                <Avatar src={this.props.info.avatar} shape='square'/>
                {
                    this.props.importKey == 'nickname'
                    &&
                    <div>
                        <span className={'nickname'} style={{color: '#c00'}}>{this.props.info.nickname}</span>
                        <span style={{marginLeft: '14px'}}>--{this.props.info.email}</span>
                    </div>
                }
                {
                    // 如果由email搜索出，则email标红
                    this.props.importKey == 'email'
                    &&
                    <div>
                        <span className={'nickname'}>{this.props.info.nickname}</span>
                        <span style={{marginLeft: '14px', color: '#c00'}}>--{this.props.info.email}</span>
                    </div>
                }
                {/*等下要判断是不是自己，是自己就没有关注的按钮*/}
                {
                    // 这个账号不是自己并且还未关注
                    ((isme == -1 && followStatus == -1) && this.state.follow == false)
                    &&
                    <Button type={'primary'} style={{marginLeft: '30px'}}
                            onClick={() => this.clicktoFollow(this.props.info.email,email)}>关注</Button>
                }
                {
                    // 这个账号不是自己并且已关注
                    ((isme == -1 && followStatus != -1) || this.state.follow == true)
                    &&
                    <Button type={'primary'} style={{marginLeft: '30px'}} disabled>已关注</Button>
                }
            </div>
        );
    }
}

export default connect((state) => ({useritemData: null}), {followUser})(Useritem);