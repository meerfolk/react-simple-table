// @flow
import React from 'react';
import css from './Table.css';

type Header = {
    header : string,
    accessor : string,
    color : string
}

type Styles = {
    color : Object
}

type TableType = {
    data : Array<string[]>,
    styles : Styles
}

type TableProps = {
    headers : Header[],
    data : Object[],
    direction : string
}

class Table extends React.Component<void,TableProps,void> {
    
    constructor(props) {
        super(props);
    }

    render() {
        let table = this.createTable(this.props.headers, this.props.data);
        return(
            <table>
                <tbody>
                    {this.renderTable(table)}
                </tbody>
            </table>
        );
    }

    createTable(headers : Header[], body : Object[]) {
        let result = {
            styles : {
                color : {}
            },
            data : []
        };

        let indexes : Object = {};
        let headersArray = [];
        headers.forEach((header,index) => {
            if (!indexes[header.accessor]) {
                indexes[header.accessor] = index;
            }
            if (header.color) {
                result.styles.color[index] = header.color;
            }
            headersArray[index] = header.accessor;
        });
        result.data.push(headersArray);
        body.forEach(row => {
            let rowArray = [].concat(headersArray).fill('');
            for (let field in row) {
               rowArray[indexes[field]] = row[field];
            }
            result.data.push(rowArray);
        });
        return result;
    }

    renderTable(table : TableType) {
        let result = [];
        let moveParams = this._getMoveParamsDyDirection(this.props.direction);
        let startI = moveParams.i == 1 ? 0 : (table.data.length - 1);
        let startJ = moveParams.j == 1 ? 0 : (table.data[0].length - 1);
        let endI = (table.data.length - 1) - startI + moveParams.i;
        let endJ = (table.data[0].length - 1) - startJ + moveParams.j;
        let i = startI;
        let j = startJ;
        let rowElements = [];
        let test = 1000;
        while(test > 0) {
            let style = {};
            if (table.styles.color[j]) {
                style.background = table.styles.color[j];
            }
            rowElements.push(<td style={style} key={i + "_" + j}>{table.data[i][j]}</td>);
            
            if (moveParams.swap) {
                i += moveParams.i;
            } else {
                j += moveParams.j;
            }
            
            let isRowEnd = false;

            if (i == endI) {
                j += moveParams.j;
                if (j == endJ) {
                    break;
                }
                i = startI;
                isRowEnd = true;
            }   
            if (j == endJ) {
                i += moveParams.i;
                if (i == endI) {
                    break;
                }
                j = startJ;
                isRowEnd = true;
            }

            if (isRowEnd) {
                result.push(<tr key={moveParams.swap ? j : i}>{rowElements}</tr>);
                rowElements = [];
            }

            test--;
        }
        result.push(<tr key={moveParams.swap ? j : i}>{rowElements}</tr>);
        return result;
    }

    _getMoveParamsDyDirection(direction : string) {
        let result = {
            i : 1,
            j : 1,
            swap : false
        };
        switch(direction) {
            case 'left' : 
                result.swap = true;
                break;
        }
        return result;
    }
}

export default Table;