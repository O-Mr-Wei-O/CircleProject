import React from 'react';
import './Circle.css';
import Card from './Card/Card';

import {BackTop, Breadcrumb, Icon, Tabs} from 'antd';
const TabPane = Tabs.TabPane;

import {connect} from 'react-redux';

import {getCircle,comment} from 'actions/circle';


class Circle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 展示页面
            // 有三种，所有：all，收藏:collect和历史:history
            page: 'all'
        };
    }

    componentDidMount() {
        this.props.getCircle();
    }

    render() {
        // console.log(this.props);

        const email = sessionStorage.getItem('email');

        let CardArray = [];
        if (this.props.circleData.diary != null) {
            for (let i = 0; i < this.props.circleData.diary.length; i++) {
                CardArray.unshift(<Card info={this.props.circleData.diary[i]} key={i}/>);
            }
        }

        if (email) {
            return (
                <div className={'Circle'}>
                    <Breadcrumb className={'CircleNav'}>
                        {/*跳到其他页面再跳回来时在onclick里面写一个请求事件，重新请求数据*/}
                        <Breadcrumb.Item onClick={() => this.setState({
                            page: 'all'
                        })} href={'javascript:void(0);'}>
                            <span>所有日记</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => this.setState({
                            page: 'collect'
                        })} href={'javascript:void(0);'}>
                            <span>我的收藏</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => this.setState({
                            page: 'history'
                        })} href={'javascript:void(0);'}>
                            <span>浏览历史</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    {/*展示不同页面*/}
                    {
                        this.state.page == 'all'
                        &&
                        CardArray.map(function (item) {
                            return item;
                        })
                    }
                    {
                        this.state.page == 'collect'
                        &&
                        <span>收藏</span>
                    }
                    {
                        this.state.page == 'history'
                        &&
                        <span>浏览历史</span>
                    }
                    <BackTop/>
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

export default connect((state) => ({circleData: state.circle}), {getCircle,comment})(Circle);
// export default Circle;