import React from 'react';

import {Input, Radio} from 'antd';
const Search = Input.Search;

const RadioGroup = Radio.Group;


class Searchdiary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1
        };
    }

    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };


    render() {
        return (
            <div className={'Searchuser'}>
                <div>
                    <div className={'searchBox'}>
                        <Search
                            placeholder="input search text"
                            onSearch={value => console.log(value)}
                            style={{ width: 500 }}
                        />
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <RadioGroup onChange={this.onChange} value={this.state.value} className={'radio'}>
                            <Radio value={1}>模糊搜索</Radio>
                            <Radio value={2}>精确匹配</Radio>
                        </RadioGroup>
                    </div>
                </div>
            </div>
        );
    }
}

export default Searchdiary;