import React,{ Component } from 'react'

import HomeLayout from '../layouts/HomeLayout';
import UserEditor from '../components/UserEditor';

let getUserUrl = 'http://localhost:3000/user/';

class UserEdit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: null
        }
    }

    componentWillMount(){
        let userId = this.props.params.id; //根据 url 获取 id
        fetch(getUserUrl + userId)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    user: res
                });
            });

    }
 
    render(){
        let {user} = this.state;
        return (
            user ? <UserEditor editTarget={user}/> : (<span>'加载中...'</span>)
        )
    }
}

UserEdit.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default  UserEdit;

