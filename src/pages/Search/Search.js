import React from 'react';
import './Search.css';

import {BackTop, Button, Tabs} from 'antd';
import Searchuser from 'pages/Search/Searchuser/Searchuser';
import Searchdiary from 'pages/Search/Searchdiary/Searchdiary';

const TabPane = Tabs.TabPane;

class Search extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const email = sessionStorage.getItem('email');
        if (email) {
            return (
                <div className={'Search'}>
                    <Tabs defaultActiveKey="searchuser">
                        <TabPane tab="搜索用户" key="searchuser"><Searchuser/></TabPane>
                        <TabPane tab="站外搜索" key="searchdiary"><Searchdiary/></TabPane>
                    </Tabs>
                    <BackTop/>
                </div>
            );
        } else {
            return (
                <div className={'noLogin'}>
                    请先登录！！！
                </div>
            );
        }
    }
}

export default Search;