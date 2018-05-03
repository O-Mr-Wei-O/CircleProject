import React from 'react';
import './Admin.css';

import {BackTop, Button, Tabs} from 'antd';
import Report from 'pages/Admin/Report/Report';
import UnsealApplication from 'pages/Admin/UnsealApplication/UnsealApplication';
import Broadcast from 'pages/Admin/Broadcast/Broadcast';

const TabPane = Tabs.TabPane;

function callback(key) {
    // console.log(key);
}

class Admin extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const admin = sessionStorage.getItem('admin');
        if (admin == 1) {
            return (
                <div className={'adminContainer'}>
                    <Tabs defaultActiveKey="broadcast" onChange={callback}>
                        <TabPane tab="举报管理" key="report"><Report/></TabPane>
                        <TabPane tab="解封申请" key="application"><UnsealApplication/></TabPane>
                        <TabPane tab="发送广播" key="broadcast"><Broadcast/></TabPane>
                    </Tabs>
                    <BackTop/>
                </div>
            );
        } else {
            return (
                <div className={'noAdmin'}>
                    你不是管理员！！！
                </div>
            );
        }
    }
}

export default Admin;