import React from 'react';
import ReplyItem from './replyItem/replyItem';
import {Avatar, Icon, Modal, Button, Input} from 'antd';
import {connect} from 'react-redux';
import {comment, getCircle} from 'actions/circle';

const {TextArea} = Input;

class CommentItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            // 评论的内容
            commentText: '',
            replyid: ''
        };
    }

    showModal(replyid) {
        // console.log(replyid);
        this.setState({
            visible: true,
            replyid: replyid,
        });
    }

    ok() {
        this.props.comment(sessionStorage.getItem('email'), this.props.info.diaryid, this.props.info.commentid, this.state.replyid, this.state.commentText);
        this.setState({
            visible: false,
        });
        this.props.getCircle(sessionStorage.getItem('email'));

    }

    cancel() {
        this.setState({
            visible: false,
        });
    }

    render() {
        // console.log(this.props);

        let secondComment = [];
        if (this.props.info.reply.length != 0) {
            for (let i = 0; i < this.props.info.reply.length; i++) {
                if (this.props.info.reply[i].pid == this.props.info.commentid) {
                    secondComment.push(<ReplyItem info={this.props.info.reply[i]} nickname={this.props.info.nickname} key={i}/>);
                }else{
                    // 获取回复的用户名
                    for (let j=0;i<this.props.info.reply.length;j++) {
                        if ((this.props.info.reply[i].replyid == this.props.info.reply[j].replyid) && i!=j) {
                            secondComment.push(<ReplyItem info={this.props.info.reply[i]} nickname={this.props.info.reply[j].nickname} key={i}/>);
                        }
                    }
                }
            }
        }

        // replyid是该评论回复的评论id
        const {email, pid, replyid, comment} = this.props.info;

        if (pid == 0 || replyid == 0) {
            return (
                <div className={'CommentItem'}>
                    <div className={'head'}>
                        <Avatar src={this.props.info.avatar} shape='square'/>
                        <span className={'nickname'}>{this.props.info.nickname}</span>
                        <span style={{marginLeft: '14px'}}>--{this.props.info.email}</span>
                    </div>
                    <div>
                        {/*评论*/}
                        {comment}
                        {/*图标*/}
                        <Icon type="message" style={{marginLeft: '10px', cursor: 'pointer'}}
                            onClick={() => this.showModal(this.props.info.commentid)}
                        />

                        {/*二级评论*/}
                        <div style={{display: 'flex', justifyContent: 'flex-end',flexWrap:'wrap'}}>
                            {
                                secondComment.map(function (item) {
                                    return item;
                                })
                            }
                        </div>

                        <Modal
                            title="Modal"
                            visible={this.state.visible}
                            onOk={() => this.ok()}
                            onCancel={() => this.cancel()}
                            okText="评论"
                            cancelText="取消"
                        >
                            <TextArea placeholder={'回复：' + this.props.info.nickname} autosize={{minRows: 3, maxRows: 10}}
                                onBlur={(e) => {
                                    if (e.target.value != '') {
                                        this.setState({commentText: e.target.value});
                                    }
                                }}/>
                        </Modal>
                    </div>
                </div>
            );
        } else {
            return (
                <div/>
            );
        }

    }
}

export default connect((state) => ({commentItem: state.circle}), {getCircle, comment})(CommentItem);