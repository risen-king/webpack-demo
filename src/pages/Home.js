import React,{ Component } from 'react'
import { Link } from 'react-router';

import HomeLayout from '../layouts/HomeLayout';

import AutoComplete from '../components/AutoComplete';

//import {Button} from 'antd';

class Home extends React.Component {
    render(){
        return (
            <HomeLayout title="Welcome">

                <AutoComplete
                    value={ ''}
                    options={[{text: '10000（一韬）', value: 10000}, {text: '10001（张三）', value: 10001}]}
                    onValueChange={value => onFormChange('owner_id', value)}
                />

                <Link to="/user/add">添加用户</Link><br/>
                <Link to="/user/list">用户列表</Link>
            </HomeLayout>

        )
    }
}

export default Home