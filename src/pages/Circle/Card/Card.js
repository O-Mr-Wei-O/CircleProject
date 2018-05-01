import React from 'react';
import {Avatar, Button, Icon, Input, Modal, message} from 'antd';
import CommentItem from './CommentItem/CommentItem';
import {connect} from 'react-redux';
import {getCircle, comment, zanAdd,collect} from 'actions/circle';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.show = this.show.bind(this);
        this.hidden = this.hidden.bind(this);
        this.zan = this.zan.bind(this);
        this.commentShowOrHide = this.commentShowOrHide.bind(this);
        this.commentTOP = this.commentTOP.bind(this);
        this.state = {
            // 文字内容的状态
            contentStatus: 'hidden',
            // 点赞状态，true为已点赞，false为未点赞
            zan: false,
            // 收藏状态，true为已收藏，false为未收藏
            collect: false,
            comment: ''
        };
    }

    show() {
        this.refs.contentWord.style.maxHeight = 'none';
        this.setState({
            contentStatus: 'show'
        });
    }

    hidden() {
        this.refs.contentWord.style.maxHeight = '20px';
        this.setState({
            contentStatus: 'hidden'
        });
    }

    // 点赞
    zan(diaryid, email) {
        this.setState({
            zan: true
        });
        this.props.zanAdd(diaryid, email, this.props.info.number ? this.props.info.number : 0, this.props.info.who ? this.props.info.who : '');
    }

    // 收藏
    collect(email,diaryid) {
        this.setState({
            collect: true
        });
        this.props.collect(email,diaryid);
    }

    commentTOP(email, diaryid, pid, replyid, commentText) {
        this.props.comment(email, diaryid, pid, replyid, commentText);
        message.success('评论成功');
        // 更新数据
        this.props.getCircle(sessionStorage.getItem('email'));
    }

    // 控制评论的显隐
    commentShowOrHide() {
        // console.log(this.refs.comment.style);
        if (this.refs.comment.style.display == 'block') {
            this.refs.comment.style.display = 'none';
        } else if (this.refs.comment.style.display == 'none') {
            this.refs.comment.style.display = 'block';
        }
    }

    render() {
        // console.log(this.props);
        const email = sessionStorage.getItem('email');

        // 判断是否有图片
        const {pic, createtime} = this.props.info;
        // 谁点了赞
        const who = this.props.info.who ? this.props.info.who : '';
        // 点赞人数
        const number = this.props.info.number ? this.props.info.number : 0;
        const collectdiaryid = this.props.collectDiary ? this.props.collectDiary : '';
        // 判断是否收藏
        const collected=collectdiaryid.split(',').indexOf(this.props.info.diaryid.toString());

        let picArray = [];
        if (pic != '') {
            for (let i = 0; i < pic.split(',').length; i++) {
                picArray.push(
                    <a href={pic.split(',')[i]} target="view_window" key={i}>
                        <img src={pic.split(',')[i]} className={'CardImg'}/>
                    </a>
                );
            }
        }

        let commentArray = [];
        if (this.props.commentData.length != 0) {
            for (let i = 0; i < this.props.commentData.length; i++) {
                if (this.props.commentData[i].diaryid == this.props.info.diaryid) {
                    commentArray.push(<CommentItem info={this.props.commentData[i]} key={i}/>);
                }
            }
        }


        // 设置时间格式
        // let {years, months, date, hours, minutes, seconds} = moment(createtime).toObject();
        const time = moment(createtime).format('YYYY-MM-DD HH:mm:ss');

        return (
            <div className={'Card'}>
                <div className={'head'}>
                    <Avatar src={this.props.info.avatar} shape='square'/>
                    <span className={'nickname'}>{this.props.info.nickname}</span>
                    <span style={{marginLeft: '14px'}}>--{this.props.info.email}</span>
                </div>
                <div className={'title'}>
                    {this.props.info.title}
                </div>
                <div className={'content'}>
                    {/*日记内容*/}
                    <div className={'contentWord'} style={{maxHeight: '20px'}} ref={'contentWord'}>
                        {this.props.info.content}
                        <br/>
                        {/*这里还要加是否有img*/}
                        {
                            picArray.map(function (item) {
                                return item;
                            })
                        }
                        <p className={'time'}>发表于 {time}</p>
                    </div>
                    {/*show  or  hide*/}
                    <div className={'showOrHide'}>
                        {
                            this.state.contentStatus == 'hidden'
                            &&
                            <a onClick={() => this.show()}>阅读全文&nbsp;<Icon type="down"/></a>
                        }
                        {
                            this.state.contentStatus == 'show'
                            &&
                            <a onClick={() => this.hidden()}>收起&nbsp;<Icon type="up"/></a>
                        }
                    </div>
                    {/*日记操作*/}
                    <div className={'action'}>
                        {/*已点赞*/}
                        {
                            (this.state.zan == true || who.split(',').indexOf(email)!=-1)
                            &&
                            <Button type={'primary'} style={{marginRight: '30px'}}><Icon
                                type="heart"/>&nbsp;喜欢</Button>
                        }
                        {/*未点赞*/}
                        {
                            (this.state.zan == false && who.split(',').indexOf(email)==-1)
                            &&
                            <Button style={{marginRight: '30px'}}
                                    onClick={() => this.zan(this.props.info.diaryid, sessionStorage.getItem('email'))}><Icon
                                type="heart"/>&nbsp;喜欢</Button>
                        }

                        <Button style={{marginRight: '30px'}} onClick={() => this.commentShowOrHide()}><Icon
                            type="message"/> 评论</Button>

                        {/*已收藏*/}
                        {
                            (this.state.collect == true || collected !=-1)
                            &&
                            <Button type={'primary'}><Icon type="star"/> 已收藏</Button>
                        }
                        {/*未收藏*/}
                        {
                            (this.state.collect == false && collected == -1)
                            &&
                            <Button onClick={() => this.collect(sessionStorage.getItem('email'),this.props.info.diaryid)}><Icon type="star"/> 收藏</Button>
                        }
                    </div>
                    {/*评论页面*/}
                    <div className={'comment'} ref={'comment'} style={{display: 'none'}}>
                        <p style={{
                            fontSize: '16px',
                            fontWeight: 600,
                            paddingBottom: '20px',
                            borderBottom: '1px solid #ebebeb'
                        }}>评论</p>

                        {
                            commentArray.map(function (item) {
                                return item;
                            })
                        }

                        {/*下面的评论默认为一级评论*/}
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Input placeholder="说点啥..." style={{width: '70%'}}
                                   onChange={(e) => this.setState({comment: e.target.value})}
                                   onBlur={(e) => e.target.value = ''}/>
                            {
                                this.state.comment == ''
                                &&
                                <Button type={'primary'} disabled>评论</Button>
                            }
                            {
                                this.state.comment != ''
                                &&
                                // 这里评论默认是父级评论（一级）
                                <Button type={'primary'}
                                        onClick={() => {
                                            this.commentTOP(email, this.props.info.diaryid, 0, 0, this.state.comment);
                                        }}>评论</Button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state) => ({commentData: state.circle.comment,collectDiary:state.circle.collectDiary}), {getCircle, comment, zanAdd,collect})(Card);