import React from 'react';
import {Button} from 'antd';

import {connect} from 'react-redux';
import {approveunseal} from 'actions/unseal';

class ApplicationItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            approve: ''
        };
    }

    approveUnseal(email) {
        this.setState({
            approve: 'approved'
        });
        this.props.approveunseal(email);
    }

    render() {
        // console.log(this.props);
        const {proposer, reason,id} = this.props.info;

        return (
            <tr>
                <td>{proposer}</td>
                <td>{reason}</td>
                <td>
                    {
                        this.state.approve == 'approved'
                        &&
                        <Button type="primary" disabled style={{marginRight: '20px'}}>已解封</Button>
                    }
                    {
                        this.state.approve != 'approved'
                        &&
                        <Button type="primary" style={{marginRight: '20px'}}
                            onClick={() => this.approveUnseal(proposer)}>解封</Button>
                    }
                </td>
            </tr>

        );

    }
}

export default connect((state) => ({ApplicationItem: null}), {approveunseal})(ApplicationItem);
// export default ApplicationItem;