import React from 'react';
import {Avatar, Icon, Modal, Button, Input} from 'antd';

const {TextArea} = Input;

class CommentItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            // 评论的内容
            comment: ''
        };
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    hideModal = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        // console.log(this.props);

        // replyid是该评论回复的评论id
        const {email,pid,replyid,comment}=this.props.info;
        return (
            <div className={'CommentItem'}>
                <div className={'head'}>
                    <Avatar src={this.props.info.avatar} shape='square'/>
                    <span className={'nickname'}>{this.props.info.nickname}</span>
                    <span style={{marginLeft:'14px'}}>--{this.props.info.email}</span>
                </div>
                <div className={'contentWord'} style={{maxHeight: '50px'}} >
                    {comment}<Icon type="message" style={{marginLeft: '10px', cursor: 'pointer'}}
                        onClick={this.showModal}/>
                    <Modal
                        title="Modal"
                        visible={this.state.visible}
                        onOk={this.hideModal}
                        onCancel={this.hideModal}
                        okText="评论"
                        cancelText="取消"
                    >
                        <TextArea placeholder="说点啥..." autosize={{minRows: 3, maxRows: 10}}
                            onBlur={(e) => {
                                if (e.target.value != '') {
                                    this.setState({comment: e.target.value});
                                }
                            }}/>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default CommentItem;