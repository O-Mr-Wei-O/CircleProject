import React, {Component} from 'react';
import './Home.css';
import News from './News/News';
import {hot} from 'react-hot-loader';

import {connect} from 'react-redux';
import {getTopNews} from 'actions/home';

import {Menu, Icon} from 'antd';
import { BackTop } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class Home extends Component {
    constructor(props) {
        super(props);
    }

    handleClick = (e) => {
        // console.log('click ', e);
        this.props.getTopNews(e.key);
    };

    //在渲染前获取头条的数据
    componentWillMount() {
        this.props.getTopNews('头条');
    }

    render() {
        // console.log(this.props.home);
        let NewsArray = [];
        if (this.props.home.news) {
            const {news} = this.props.home;
            for (let i = 0; i < news.result.list.length; i++) {
                NewsArray.push(<News key={i} info={news.result.list[i]}/>);
            }
        }
        return (
            <div style={{width: 1710, margin: 'auto',background:'#FFFFFF'}}>
                <Menu
                    onClick={this.handleClick}
                    style={{width: 146, float: 'left'}}
                    defaultSelectedKeys={['头条']}
                    defaultOpenKeys={['news']}
                    mode="inline"
                >
                    <SubMenu key="news" title={<span><Icon type="appstore-o"/><span> 新 闻</span></span>}>
                        <Menu.Item key="头条">&nbsp;头 条</Menu.Item>
                        <Menu.Item key="新闻">&nbsp;新 闻</Menu.Item>
                        <Menu.Item key="财经">&nbsp;财 经</Menu.Item>
                        <Menu.Item key="体育">&nbsp;体 育</Menu.Item>
                        <Menu.Item key="娱乐">&nbsp;娱 乐</Menu.Item>
                        <Menu.Item key="军事">&nbsp;军 事</Menu.Item>
                        <Menu.Item key="教育">&nbsp;教 育</Menu.Item>
                        <Menu.Item key="科技">&nbsp;科 技</Menu.Item>
                        <Menu.Item key="NBA">&nbsp;N B A</Menu.Item>
                        <Menu.Item key="股票">&nbsp;股 票</Menu.Item>
                        <Menu.Item key="星座">&nbsp;星 座</Menu.Item>
                        <Menu.Item key="女性">&nbsp;女 性</Menu.Item>
                        <Menu.Item key="健康">&nbsp;健 康</Menu.Item>
                        <Menu.Item key="育儿">&nbsp;育 儿</Menu.Item>
                    </SubMenu>
                </Menu>
                {/*新闻内容*/}
                <div className={'news'}>
                    {/*这里放新闻内容，数据还未取到*/}
                    {NewsArray.map(function (item) {
                        return item;
                    })}
                </div>
                <BackTop />
                <div style={{clear: 'both'}}/>
            </div>
        );
    }
}

export default connect((state) => ({home: state.home}), {getTopNews})(Home);
