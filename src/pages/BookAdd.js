import React,{ Component } from 'react'
import formProvider from '../util/formProvider'
import FormItem from '../components/FormItem';
import HomeLayout from '../layouts/HomeLayout';
import BookEditor from '../components/BookEditor';

class BookAdd extends React.Component {

    render(){

        return (

                <HomeLayout title="添加书籍">
                    <BookEditor/>
                </HomeLayout>

        )
    }
}

export default  BookAdd;

