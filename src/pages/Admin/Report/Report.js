import React from 'react';
import ReportItem from './ReportItem/ReportItem';

import {connect} from 'react-redux';

import {getReport} from 'actions/report';

class Report extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.getReport();
    }

    render() {

        let itemArray = [];
        if (this.props.reportData.reportDiary) {
            for (let i=0;i<this.props.reportData.reportDiary.length;i++) {
                itemArray.push(<ReportItem info={this.props.reportData.reportDiary[i]} key={i}/>);
            }
        }

        return (
            <div className={'Report'}>
                <table>
                    <tr>
                        <th>nickname</th>
                        <th>email</th>
                        <th>title</th>
                        <th>text</th>
                        <th>reporter</th>
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

export default connect((state) => ({reportData: state.report}), {getReport})(Report);

// export default Report;