import React from 'react';

import {connect} from 'react-redux';
import {searchuserVague,searchuserAccurate} from 'actions/searchuser';

import {Input, Radio} from 'antd';
import Useritem from 'pages/Search/Searchuser/Useritem/Useritem';

const Search = Input.Search;

const RadioGroup = Radio.Group;


class Searchuser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            searchValue:''
        };
    }

    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };


    render() {
        // console.log(this.props.searchuserData.user);
        // console.log(this.state.searchValue);
        let useritem = [];
        if (this.props.searchuserData.user.length!=0) {
            for (let i=0;i<this.props.searchuserData.user.length;i++) {
                // 根据比较获得关键字在email还是nickname中，并标成红色
                if (this.props.searchuserData.user[i].email.toLowerCase().indexOf(this.state.searchValue.toLowerCase())!=-1  ){
                    useritem.push(<Useritem info={this.props.searchuserData.user[i]} importKey={'email'} key={i}/>);
                }else if(this.props.searchuserData.user[i].nickname.toLowerCase().indexOf(this.state.searchValue.toLowerCase())!=-1){
                    useritem.push(<Useritem info={this.props.searchuserData.user[i]} importKey={'nickname'} key={i}/>);
                }
            }
        }

        return (
            <div className={'Searchuser'}>
                <div>
                    <div className={'searchBox'}>
                        <Search
                            placeholder="input email or nick"
                            onSearch={(value) => {
                                if (this.state.value == 1) {
                                    // 模糊搜索
                                    this.props.searchuserVague(value);
                                    this.setState({
                                        searchValue:value
                                    });
                                }else {
                                    // 精准匹配
                                    this.props.searchuserAccurate(value);
                                    this.setState({
                                        searchValue:value
                                    });
                                }
                            }}
                            style={{width: 500}}
                            enterButton
                        />
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <RadioGroup onChange={this.onChange} value={this.state.value} className={'radio'}>
                            <Radio value={1}>模糊搜索</Radio>
                            <Radio value={2}>精确匹配</Radio>
                        </RadioGroup>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'center',flexWrap:'wrap',padding:'30px 0'}}>
                    {
                        useritem.map(function (item) {
                            return item;
                        })
                    }
                </div>
            </div>
        );
    }
}

export default connect((state) => ({searchuserData: state.searchuser}), {searchuserVague,searchuserAccurate})(Searchuser);

// export default Searchuser;