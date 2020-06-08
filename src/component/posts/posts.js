import React, { Component } from 'react';
import './style.css'
import { Button, DialogContainer, TextField } from 'react-md'
import html2canvas from 'html2canvas'
import ListItem from "./item";
import jspdf from 'jspdf'

class Posts extends Component {
    state = {
        visible: false,
        title: '',
        body: '',
        update: false,
        userId: null,
        object: null,
        visibleUpdate: false,
        visibleDelete: false,


    }



    show = () => {
        this.setState({ visible: true })
    };

    hide = () => {
        this.setState({ visible: false })
    };

    showDelete = () => {
        this.setState({ visibleDelete: true })
    };

    hideDelete = () => {
        this.setState({ visibleDelete: false })
    };



    showUpdate = () => {
        this.setState({ visibleUpdate: true })
    };

    hideUpdate = () => {
        this.setState({ visibleUpdate: false })
    };

    selectRow = (object) => {
        const { userId } = object
        console.log('Userid', userId)
        this.setState({ userId, object })

    }

    addNewPost = () => {

        const { title, body, userId } = this.state

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title,
                body,
                userId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => this.setState({ visible: false }))



    }

    updatePost = () => {
        const { object: { id, userId }, title, body } = this.state

        console.log(id, userId, 'oooooooooooooooooooo')
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                id,
                title,
                body,
                userId
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                if (json) {
                    this.setState({ visibleUpdate: false })
                }
            })
    }

    deletePost = () => {
        const { object: { id } } = this.state
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE'
        })
        this.setState({ visibleDelete: false })
    }
    printDocument = () => {
        const input = document.getElementById('posts')
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png')
                const pdf = new jspdf()
                pdf.addImage(imgData, 'JPEG', 0, 0)
                // pdf.output('dataurlnewwindow');
                pdf.save("download.pdf")
            })

    }



    render() {
        const { visible, title, body, userId, object, visibleUpdate, visibleDelete } = this.state
        const { posts } = this.props
        const actions = []
        actions.push(
            <Button
                flat
                primary
                swapTheming
                onClick={this.addNewPost}
                className="saveButton"
            >
                Save
    </Button>,

            <Button
                flat
                primary
                swapTheming
                onClick={this.hide}
                className="saveButton"
            >
                Cancel
</Button>,
        )

        const actionsUpdate = []
        actionsUpdate.push(
            <Button
                flat
                primary
                swapTheming
                onClick={this.updatePost}
                className="saveButton"
            >
                Update
    </Button>,

            <Button
                flat
                primary
                swapTheming
                onClick={this.hideUpdate}
                className="saveButton"
            >
                Cancel
</Button>,
        )

        const actionsDelete = []
        actionsDelete.push(
            <Button
                flat
                primary
                swapTheming
                onClick={this.deletePost}
                className="saveButton"
            >
                Delete
    </Button>,

            <Button
                flat
                primary
                swapTheming
                onClick={this.hideDelete}
                className="saveButton"
            >
                Cancel
</Button>,
        )


        return (
            <div className='wrapper__for__table'>
                <Button style={{ marginLeft: '5px' }} primary raised onClick={this.printDocument}> طباعة </Button>
                {userId !== null && <Button style={{ backgroundColor: 'green', marginLeft: '5px' }} raised onClick={this.show}> Add New Post </Button>}
                {object !== null && <Button style={{ backgroundColor: 'orange', marginLeft: '5px' }} raised onClick={this.showUpdate}> Update Post </Button>}
                {object !== null && <Button style={{ backgroundColor: 'red', marginLeft: '5px' }} raised onClick={this.showDelete}> Delete Post </Button>}
                <table id="posts">
                    <tr>
                        <th>title</th>
                        <th>body</th>
                        <th>id</th>
                        <th>user id</th>

                    </tr>

                    {posts.map((item, index) => {
                        return (
                            <ListItem
                                title={item.title}
                                body={item.body}
                                id={item.id}
                                userId={item.userId}
                                selectRow={this.selectRow}
                                item={item}
                            />
                        )
                    })
                    }
                </table>

                <DialogContainer
                    id="simple-list-dialog"
                    visible={visible}
                    title="Add new Post"
                    onHide={this.hide}
                    actions={actions}
                >
                    <div className="md-grid add-stockholder-container">
                        <TextField
                            id="name"
                            required
                            label="Name"
                            className="add-stockholder-textField md-cell md-cell--6"
                            name='title'
                            value={title}
                            onChange={(v) => this.setState({ title: v })}
                        />

                        <TextField
                            id="name"
                            required
                            label="Name"
                            className="add-stockholder-textField md-cell md-cell--6"
                            rows={5}
                            name='body'
                            value={body}
                            onChange={(v) => this.setState({ body: v })}

                        />
                    </div>
                </DialogContainer>





                <DialogContainer
                    id="simple-list-dialog"
                    visible={visibleUpdate}
                    title="Update Post"
                    onHide={this.hideUpdate}
                    actions={actionsUpdate}
                >
                    <div className="md-grid add-stockholder-container">
                        <TextField
                            id="name"
                            required
                            label="Name"
                            className="add-stockholder-textField md-cell md-cell--6"
                            name='title'
                            value={title || (object && object.title)}
                            onChange={(v) => this.setState({ title: v })}
                        />

                        <TextField
                            id="name"
                            required
                            label="Name"
                            className="add-stockholder-textField md-cell md-cell--6"
                            rows={5}
                            name='body'
                            value={body || (object && object.body)}
                            onChange={(v) => this.setState({ body: v })}

                        />
                    </div>
                </DialogContainer>





                <DialogContainer
                    id="simple-list-dialog"
                    visible={visibleDelete}
                    title="Delete Post"
                    onHide={this.hideDelete}
                    actions={actionsDelete}
                >
                    <div className="md-grid add-stockholder-container">
                        Are You Really Sure You want To Delete This Post ?
                    </div>
                </DialogContainer>


            </div>
        )
    }
}

export default Posts;
