import React,{ Component } from 'react'

import HomeLayout from '../layouts/HomeLayout';
import BookEditor from '../components/BookEditor';

let getUrl = 'http://localhost:3000/user/';

class BookEdit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            book: null
        }
    }

    componentWillMount(){
        let userId = this.props.params.id; //根据 url 获取 id
        fetch(getUrl + userId)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    book: res
                });
            });

    }
 
    render(){
        let {book} = this.state;
        return (

                <HomeLayout title="编辑书籍">
                    { book ? <BookEditor editTarget={book}/> : '加载中...'}
                </HomeLayout>

        )
    }
}

BookEditor.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default  BookEdit;

