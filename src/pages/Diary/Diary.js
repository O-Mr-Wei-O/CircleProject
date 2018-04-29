import React from 'react';
import './Diary.css';

import {Input, Upload, Icon, Modal, Button, message} from 'antd';

const {TextArea} = Input;

import {connect} from 'react-redux';
import {writeDiary} from 'actions/diary';


class Diary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [],
            title: '',
            content: '',
        };
    }

    componentWillReceiveProps(Props) {
        if (Props.diaryData.status ==true) {
            message.success('发表成功');
        } else if (Props.diaryData.status == false) {
            message.error('发表失败');
        }
    }

    submitDiary() {
        // 附加的图片地址集合
        const email = sessionStorage.getItem('email');
        let pathArr = [];
        if (this.state.fileList.length != 0) {
            for (let i = 0; i < this.state.fileList.length; i++) {
                pathArr.push(this.state.fileList[i].response);
            }
        }
        const title = this.state.title ? this.state.title : null;
        const content = this.state.content ? this.state.content : null;
        // 点击props会渲染一次，原因未知(导致重复出现提示的BUG)
        this.props.writeDiary(email, title, content, pathArr.join(','));
    }


    handleCancel = () => this.setState({previewVisible: false});

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };

    handleChange = ({fileList}) => this.setState({fileList});

    render() {
        // console.log(this.state);

        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        const email = sessionStorage.getItem('email');
        if (email) {
            return (
                <div className={'diary'}>
                    <h1>写日记</h1>
                    <br/>
                    <br/>
                    <textarea rows={'1'} className={'title'} placeholder={'请输入标题'} style={{height: '44px'}}
                        ref={'title'} onBlur={() => {
                            // 如果写入后又删掉，则将内容置空
                            if (this.refs.title.value != '') {
                                this.setState({title: this.refs.title.value});
                            } else {
                                message.error('请输入标题');
                                this.setState({title: ''});
                            }
                        }}
                        maxLength={40}/>
                    <br/>
                    <br/>
                    <TextArea placeholder="请输入内容"
                        style={{resize: 'none', fontSize: '26px', lineHeight: '40px', marginBottom: '30px'}}
                        autosize={{minRows: 2, maxRows: 5}}
                        onBlur={(e) => {
                            if (e.target.value != '') {
                                this.setState({content: e.target.value});
                            } else {
                                message.error('请输入内容');
                                this.setState({content: ''});
                            }
                        }}/>
                    <Upload
                        action="/api/upload"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                        accept={'image/jpeg'}
                    >
                        {fileList.length >= 3 ? null : uploadButton}
                    </Upload>
                    {/*查看大图*/}
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{width: '100%'}} src={previewImage}/>
                    </Modal>
                    <br/>
                    {
                        (this.state.title != '' && this.state.content != '') ?
                            <Button type="primary" onClick={() => this.submitDiary()}
                                className={'submitDiary'}>发表</Button>
                            :
                            <Button type="primary" disabled className={'submitDiary'}>发表</Button>
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

export default connect((state) => ({diaryData: state.diary}), {writeDiary})(Diary);