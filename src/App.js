
import React, { Component } from 'react';

import { NavLink, Route, Switch, withRouter } from "react-router-dom";

import './App.css';
import Users from './component/users';
import Posts from './component/posts';
import axios from 'axios'

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';


class App extends Component {
  state = { posts: [], search: '' }
  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/posts`)
      .then((res) => this.setState({ posts: res.data }))



  }
  searchSpace = (event) => {
    let keyword = event.target.value;
    this.setState({ search: keyword })
  }
  render() {
    const { location: { pathname } } = this.props
    console.log('props', this.props)

    const items = this.state.posts.filter((data) => {
      if (this.state.search == null)
        return data
      else if (data.title.toLowerCase().includes(this.state.search.toLowerCase()) || data.body.toLowerCase().includes(this.state.search.toLowerCase())) {
        return data
      }
    })

    return (
      <div >
        <div className="top">
          <ul className='nav__bar'>
            <NavLink exact to='/user' activeClassName='active__class'><li>List Users</li></NavLink>
            <NavLink exact to='/post' activeClassName='active__class'><li>List Posts</li></NavLink>
            <NavLink exact to='new-post' activeClassName='active__class'><li>Add New Post</li></NavLink>
            {pathname === '/post' && <input type="text" name="" id="" className='search' placeholder='search ...'
              onChange={(e) => this.searchSpace(e)} />}


          </ul>
        </div>
        <div className='App'>

          <Switch>
            <Route exact path='/user' render={() => <Users />} />
            <Route exact path='/post' render={() => <Posts posts={items} />} />
          </Switch>

        </div>

      </div>
    );
  }
}
export default withRouter(App);
