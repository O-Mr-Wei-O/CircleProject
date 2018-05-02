import React, {Component} from 'react';
import {Icon} from 'antd';

export default class News extends Component {
    render() {
        // console.log(this.props.info.news);
        const {info} = this.props;
        return (
            <div>
                {
                    info ?
                        <div className={'newsDiv'}>
                            <img src={info.pic} alt={info.title} style={{float: 'left'}}/>
                            <div style={{float: 'left', marginLeft: '30px'}}>
                                <a href={info.url} target="view_window">{info.title}</a>
                                <br/>
                                <span style={{fontSize: '16px'}}><Icon type="form"
                                    style={{marginRight: '10px'}}/>来源：{info.src}</span>
                                <span style={{fontSize: '16px', marginLeft: '50px'}}><Icon type="clock-circle-o"
                                    style={{marginRight: '10px'}}/>时间：{info.time}</span>
                            </div>
                            <div style={{clear: 'both'}}/>
                        </div>
                        :
                        <div>fail -------------------- Sinpo96@163.com</div>
                }
            </div>
        )
        ;
    }
}