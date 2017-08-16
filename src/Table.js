// @flow
import React from 'react';

type Header = {
    header : string,
    accessor : string
}

type TableProps = {
    headers : Header[],
    data : Object[]
}

class Table extends React.Component<void,TableProps,void> {
    
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <table>
                <tbody>
                    {this.renderHeaders(this.props.headers)}
                    {this.renderData(this.props.data,this.props.headers)}
                </tbody>
            </table>
        );
    }

    renderData(body : Object[], headers : Header[]) {
        if (!body || !headers) {
            return null;
        }
        let result = [];
        body.forEach((row,rowIndex) => {
            let rowResult = []
            headers.forEach(header => {
                let key = header.accessor + '_' + rowIndex;
                if(row[header.accessor]) {
                    rowResult.push(
                        <td key={key}>{row[header.accessor]}</td>
                    );
                } else {
                    rowResult.push(<td key={key}></td>);
                }
            });
            result.push(
                <tr>{rowResult}</tr>
            );
        });
        return result;
    }

    renderHeaders(headers : Header[]) {
        if (!headers) {
            return null;
        }
        let result = [];
        headers.forEach((header,index) => {
            result.push(<th key={index}>{header.header}</th>);
        })
        return(
            <tr>
            {result}
            </tr>
        );
    }
}

export default Table;