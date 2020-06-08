import React, { Component } from 'react';

import { Avatar } from "react-md";



class ListItem extends Component {


    render() {
        const { name, username, email, phone, website, company, address } = this.props
        return (
            <div className='card__user' onClick={this.listPost}>
                <div className='info__user' >
                    <div className='info__header'>
                        <Avatar className='img__avatar' >
                            {name.charAt(0).toUpperCase()}{username.charAt(0).toUpperCase()}
                        </Avatar>
                        <span className='name__user'>{name && name} - {username && username}</span>

                    </div>
                    <div className="body__info">
                        <p>
                            Email:{email && email}</p>
                        <p>Phone:{phone && phone}</p>
                        <p>Website:{website && website}</p>
                    </div>

                    <div className="footer__info">
                        <p>
                            Address:{address && address.street} - {address && address.city}
                        </p>
                        <p>
                            Company : {company && company.name}
                        </p>
                    </div>

                </div>
            </div>
        );
    }
}

export default ListItem;
