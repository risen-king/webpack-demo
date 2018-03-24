import React,{ Component } from 'react'
import { Link } from 'react-router';

import HomeLayout from '../layouts/HomeLayout';

import AutoComplete from '../components/auto-complete/AutoComplete';

//import {Button} from 'antd';

class Home extends React.Component {
    render(){
        return (
            <HomeLayout title="Welcome">

               

                <Link to="/user/add">添加用户</Link><br/>
                <Link to="/user/list">用户列表</Link>
            </HomeLayout>

        )
    }
}

export default Home