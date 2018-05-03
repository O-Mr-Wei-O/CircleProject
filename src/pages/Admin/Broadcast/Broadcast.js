import React from 'react';

import {Button, Input, message} from 'antd';
import {sendBroadcast} from 'actions/broadcast';
import {connect} from 'react-redux';

const {TextArea} = Input;


class Broadcast extends React.Component {
    constructor(props) {
        super(props);
    }

    broad() {
        this.props.sendBroadcast(document.getElementById('broadtext').value);
        document.getElementById('broadtext').value = '';
        message.success('发送广播成功');
    }

    render() {
        return (
            <div className={'Broadcast'}>
                <TextArea placeholder="广播内容..." autosize={{minRows: 4, maxRows: 6}} style={{marginBottom: '30px'}}
                          id={'broadtext'}/>
                <Button type={'primary'} onClick={() => this.broad()}>发送</Button>
            </div>
        );

    }
}

// export default Broadcast;
export default connect((state) => ({broadcastData: null}), {sendBroadcast})(Broadcast);
