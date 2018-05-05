import React from 'react';

import {Input, Radio} from 'antd';
const Search = Input.Search;

class Searchdiary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className={'Searchuser'}>
                <div>
                    <div className={'searchBox'}>
                        {/*jsonp调用搜索接口*/}
                        <form action="http://www.baidu.com/baidu" target="_blank">
                            <Search
                                placeholder="input something"
                                style={{width: 500}}
                                enterButton
                                onSearch={()=>
                                    document.getElementById('searchBtn').click()
                                }
                                name={'word'}
                            />
                            <button type="submit" value="百度搜索" style={{display: 'none'}} id={'searchBtn'}/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Searchdiary;