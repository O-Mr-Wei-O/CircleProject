import React from 'react';
import {Button} from 'antd';

import {connect} from 'react-redux';
import {banDiaryAndUser} from 'actions/report';


class ReportItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            baned: ''
        };
    }

    banDU(diaryid, userid) {
        this.setState({
            baned: 'baned'
        });
        this.props.banDiaryAndUser(diaryid, userid);
    }

    render() {
        console.log(this.props);
        const {email, nickname, title, content, pic, reporter, diaryid, userid} = this.props.info;
        let picArray = [];
        if (pic.split(',').length != 0) {
            for (let i = 0; i < pic.split(',').length; i++) {
                picArray.push(
                    <a href={pic.split(',')[i]} key={i} target="view_window">
                        <img src={pic.split(',')[i]} style={{width: '25%'}}/>
                    </a>
                );
            }
        }
        return (
            <tr>
                <td>{nickname}</td>
                <td>{email}</td>
                <td>{title}</td>
                <td>
                    {content}
                    &nbsp;
                    {
                        picArray.map(function (item) {
                            return item;
                        })
                    }
                </td>
                <td>
                    {reporter}
                </td>
                <td>
                    {
                        this.state.baned == 'baned'
                        &&
                        <Button type="primary" disabled style={{marginRight: '20px'}}>已封禁</Button>
                    }
                    {
                        this.state.baned != 'baned'
                        &&
                        <Button type="primary" style={{marginRight: '20px'}}
                            onClick={() => this.banDU(diaryid, userid)}>封禁</Button>
                    }
                    <Button type="primary">举报不实</Button>
                </td>
            </tr>

        );

    }
}

export default connect((state) => ({reportItem: null}), {banDiaryAndUser})(ReportItem);