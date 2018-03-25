import React,{ Component } from 'react'
import { Link } from 'react-router';
import style from '../styles/home-layout.less';




class Home extends React.Component {
    render(){
        return (
            <div className={style.welcome}>
                Welcome
            </div>
        )
    }
}

export default Home