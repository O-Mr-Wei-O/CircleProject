import React from 'react';

import {connect} from 'react-redux';

import {getunseal} from 'actions/unseal';
import ApplicationItem from 'pages/Admin/UnsealApplication/ApplicationItem/ApplicationItem';

class UnsealApplication extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.getunseal();
    }

    render() {
        console.log(this.props);
        let itemArray = [];
        if (this.props.unsealData.unsealApplication) {
            for (let i=0;i<this.props.unsealData.unsealApplication.length;i++) {
                itemArray.push(<ApplicationItem info={this.props.unsealData.unsealApplication[i]} key={i}/>);
            }
        }

        return (
            <div className={'Report'}>
                <table>
                    <tr>
                        <th>email</th>
                        <th>reason</th>
                        <th>operation</th>
                    </tr>
                    {
                        itemArray.map(function (item) {
                            return item;
                        })
                    }
                </table>
            </div>
        );

    }
}

export default connect((state) => ({unsealData: state.unseal}), {getunseal})(UnsealApplication);

// export default UnsealApplication;