import React, { Component } from 'react';
import './style.css'

import ListItem from "./list-item";
import axios from 'axios';

class Users extends Component {
    state = {
        users: []
    }
    componentDidMount() {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then((res) => this.setState({ users: res.data }))
    }
    render() {
        const { users } = this.state
        return (
            users.map((item, index) => {
                return (
                    <ListItem
                        name={item.name}
                        username={item.username}
                        website={item.website}
                        address={item.address}
                        phone={item.phone}
                        company={item.company}
                        email={item.email}
                        id={item.id}
                        key={item.id}
                    />
                )
            })
        )
    }
}

export default Users;
