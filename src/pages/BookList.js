import React,{ Component } from 'react';
import { message, Table, Button, Popconfirm } from 'antd';;
import { get, del } from '../utils/request';



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
        let url = deleteUrl.replace(':id',book.id)
        del(url)
            .then(res => {
                this.setState({
                    bookList: this.state.bookList.filter(item => item.id !== book.id)
                });
                message.success('删除图书成功')
            })
            .catch(err => {
                console.error(err);
                message.error('删除图书失败');
            })

    }

    render(){

        let { bookList } = this.state;
        const columns = [
            {
                title: '图书ID',
                dataIndex: 'id'
            },
            {
                title: '书名',
                dataIndex: 'name'
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (text, record) => <span>&yen;{record.price / 100}</span>
            },
            {
                title: '所有者ID',
                dataIndex: 'owner_id'
            },
            {
                title: '操作',
                render: (text, record) => (
                    <Button.Group type="ghost">
                        <Button size="small" onClick={() => this.handleEdit(record)}>编辑</Button>
                        <Popconfirm title="确定要删除吗？" onConfirm={() => this.handleDel(record)}>
                            <Button size="small">删除</Button>
                        </Popconfirm>
                    </Button.Group>
                )
            }
        ];


        return (
            <Table columns={columns} dataSource={bookList} rowKey={row => row.id}/>
        );
    }
}

BookList.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default  BookList;