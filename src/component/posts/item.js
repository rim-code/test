import React, { Component } from 'react';
import { Button } from 'react-md';

import './style.css'


class ListItem extends Component {

    selectRow = (obj) => {
        const { selectRow } = this.props
        selectRow && selectRow(obj)
    }

    render() {
        const { title, body, id, userId, item } = this.props
        return (


            <tr onClick={() => this.selectRow(item)}>
                <td>{title}</td>
                <td>{body}</td>

                <td>{id}</td>
                <td>{userId}</td>

            </tr>

        );
    }
}

export default ListItem;
