import React,{ Component } from 'react';
import HomeLayout from '../layouts/HomeLayout';
let listUrl = 'http://localhost:3000/book';
let deleteUrl = 'http://localhost:3000/book/:id';

class BookList extends  Component{
    constructor(props){
        super(props);
        this.state = {
            bookList: []
        }

        this.handleEdit = this.handleEdit.bind(this);
        this.handleDel = this.handleDel.bind(this);
    }

    componentWillMount(){
        fetch(listUrl)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    bookList: res
                });
            })

    }

    handleEdit(book){
        this.context.router.push('/book/edit/' + book.id);
    }

    handleDel(book){
        let confirmed = confirm(`确定要删除用户 ${book.name} 吗？`);

        if(confirmed){
            let url = deleteUrl.replace(':id',book.id)
            fetch(url,{method: 'delete'})
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        bookList: this.state.bookList.filter(item => item.id !== user.id)
                    });
                    alert('删除书籍成功');
                })
                .catch(error => {
                    console.log(error);
                    alert('删除书籍失败');
                });
        }
    }

    render(){

        let { bookList } = this.state;

        return (

                <HomeLayout title="书籍列表">
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>书名</th>
                            <th>价格</th>
                            <th>拥有者</th>
                            <th>操作</th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            bookList.map((book) => {
                                return (
                                    <tr key={book.id}>
                                        <td>{book.id}</td>
                                        <td>{book.name}</td>
                                        <td>{book.price}</td>
                                        <td>{book.owner_id}</td>
                                        <td>
                                            <a href="javascript:void(0)" onClick={() => this.handleEdit(book)}>编辑</a>
                                            &nbsp;
                                            <a href="javascript:void(0)" onClick={() => this.handleDel(book)}>删除</a>
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

BookList.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default  BookList;