import React from 'react';
import {Avatar, Icon, Modal, Button, Input} from 'antd';
import {connect} from 'react-redux';
import {comment, getCircle} from 'actions/circle';

const {TextArea} = Input;

class ReplyItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    showModal(replyid) {
        // console.log(replyid);
        this.setState({
            visible: true,
            replyid: replyid,
        });
    }

    ok() {
        this.props.comment(sessionStorage.getItem('email'), this.props.info.diaryid, this.props.info.pid, this.state.replyid, this.state.commentText);
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

        return (
            <div className={'replyItem'}>
                <div className={'head'}>
                    <Avatar src={this.props.info.avatar} shape='square'/>
                    <span className={'nickname'}>{this.props.info.nickname}</span>
                    {
                        this.props.nickname
                        &&
                        <span style={{marginLeft:'14px'}}>回复了&nbsp;{this.props.nickname}</span>
                    }
                </div>

                <div>
                    {/*评论*/}
                    {this.props.info.comment}
                    {/*图标*/}
                    <Icon type="message" style={{marginLeft: '10px', cursor: 'pointer'}}
                          onClick={() => this.showModal(this.props.info.commentid)}
                    />

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
    }
}

export default connect((state) => ({commentItem: null}), {getCircle, comment})(ReplyItem);