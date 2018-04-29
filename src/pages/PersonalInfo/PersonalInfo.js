import React from 'react';
import './PersonalInfo.css';
import {connect} from 'react-redux';
import {getPersonalInfo, updatePersonalInfo} from 'actions/personalInfo';

import {Button, Input, Radio, DatePicker, Upload, Icon, message} from 'antd';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    // 限制大小为2M
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}


const RadioGroup = Radio.Group;
const {MonthPicker, RangePicker, WeekPicker} = DatePicker;

class PersonalInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.personalInfoData.sex ? props.personalInfoData.sex : 1,
            loading: false,
        };
    }

    componentDidMount() {
        // 获取所有用户个人信息
        this.props.getPersonalInfo(sessionStorage.getItem('email'));
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({loading: true});
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    };

    // 更新个人信息(根据不同的type)
    updatePersonalInfo(type, value) {
        if (value && value != '') {
            this.props.updatePersonalInfo(type, value, sessionStorage.getItem('email'));
            if (type == 'sex') {
                this.setState({
                    value: value,
                });
            } else if (type == 'nickname') {
                sessionStorage.setItem('nickname', value);
            } else if (type == 'birthday') {
                this.setState({
                    birthday: value,
                });
            }
            message.success('修改成功');
        } else {
            message.warning('不可为空');
        }
    }

    render() {
        // console.log(this.props.personalInfoData);
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'}/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl ? this.state.imageUrl : this.props.personalInfoData.avatar;
        // 获取到需要更改信息的email账户
        const email = sessionStorage.getItem('email');
        if (email) {
            return (
                <div className={'personal'}>
                    <div className={'personalItem'}>
                        <span className={'type'}>头像</span>
                        <Upload
                            // 这里的name在后台会用到
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action={'/api/uploadAvatar/' + email}
                            beforeUpload={beforeUpload}
                            onChange={this.handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt=""/> : uploadButton}
                        </Upload>
                    </div>
                    <div className={'personalItem'}>
                        <span className={'type'}>昵称</span>
                        <Input placeholder={this.props.personalInfoData.nickname} style={{width: '30%'}}
                            onBlur={(e) => this.updatePersonalInfo('nickname', e.target.value)}/>
                    </div>
                    <div className={'personalItem'}>
                        <span className={'type'}>性别</span>
                        <RadioGroup onChange={(e) => this.updatePersonalInfo('sex', e.target.value)}
                            value={this.state.value}>
                            <Radio value={1}>男</Radio>
                            <Radio value={2}>女</Radio>
                        </RadioGroup>

                    </div>
                    <div className={'personalItem'}>
                        <span className={'type'}>生日</span>
                        <span
                            className={'type'}>{this.state.birthday ? this.state.birthday : this.props.personalInfoData.birthday}</span>
                        <DatePicker onChange={(date, dateString) => this.updatePersonalInfo('birthday', dateString)}/>
                    </div>
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

export default connect((state) => ({personalInfoData: state.personalInfo}), {
    getPersonalInfo,
    updatePersonalInfo
})(PersonalInfo);