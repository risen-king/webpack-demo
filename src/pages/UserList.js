import React,{ Component } from 'react';
import HomeLayout from '../layouts/HomeLayout';

import ApiUrl from '../util/apiUrl';
let apiUrl = new ApiUrl('user');

class UserList extends  Component{
    constructor(props){
        super(props);
        this.state = {
            userList: []
        }

        this.handleEdit = this.handleEdit.bind(this);
        this.handleDel = this.handleDel.bind(this);
    }

    componentWillMount(){
        let {url,method} = apiUrl.listUrl();
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    userList: res
                });
            })

    }

    handleEdit(user){
        this.context.router.push('/user/edit/' + user.id);
    }

    handleDel(user){
        let confirmed = confirm(`确定要删除用户 ${user.name} 吗？`);

        if(confirmed){
            let {url,method} = apiUrl.deleteUrl(user.id)
            fetch(url,{method: method})
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        userList: this.state.userList.filter(item => item.id !== user.id)
                    });
                    alert('删除用户成功');
                })
                .catch(error => {
                    console.log(error);
                    alert('删除用户失败');
                });
        }
    }

    render(){

        let { userList } = this.state;

        return (

                <HomeLayout title="用户列表">
                    <table>
                        <thead>
                        <tr>
                            <th>用户ID</th>
                            <th>用户名</th>
                            <th>性别</th>
                            <th>年龄</th>
                            <th>操作</th>
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
                                        <td>
                                            <a href="javascript:void(0)" onClick={() => this.handleEdit(user)}>编辑</a>
                                            &nbsp;
                                            <a href="javascript:void(0)" onClick={() => this.handleDel(user)}>删除</a>
                                        </td>
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

UserList.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default  UserList;