import React,{ Component } from 'react'
import formProvider from '../utils/formProvider'
import FormItem from '../components/FormItem';
import HomeLayout from '../layouts/HomeLayout';
import BookEditor from '../components/BookEditor';

class BookAdd extends React.Component {

    render(){
        return (
            <BookEditor/>
        )
    }
}

export default  BookAdd;

