import React,{ Component } from 'react';
import HomeLayout from '../layouts/HomeLayout';
let userListUrl = 'http://localhost:3000/user';

class UserList extends  Component{
    constructor(props){
        super(props);
        this.state = {
            userList: []
        }
    }

    componentWillMount(){
        fetch(userListUrl)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    userList: res
                });
            })

    }

    render(){
        const { userList } = this.state;
        return (

                <HomeLayout>
                    <table>
                        <thead>
                        <tr>
                            <th>用户ID</th>
                            <th>用户名</th>
                            <th>性别</th>
                            <th>年龄</th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            userList.map((user) => {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.gender}</td>
                                        <td>{user.age}</td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                </HomeLayout>
          
        );
    }
}

export default  UserList;