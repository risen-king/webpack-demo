import React,{ Component } from 'react'
import formProvider from '../util/formProvider'
import FormItem from './FormItem';
import HomeLayout from '../layouts/HomeLayout';

let apiUrl = 'http://localhost:3000/book';

class BookEditor extends React.Component {
    componentWillMount(){
        const {editTarget, setFormValues} = this.props;
        if(editTarget){
            setFormValues(editTarget);
        }
    }



    handleSubmit (e) {
        e.preventDefault();
        //alert(JSON.stringify(this.state));

        const {form: {name, price, owner_id}, formValid,editTarget} = this.props;
        if(!formValid){
            alert('请填写正确的信息后重试');
            return ;
        }


        let opLabel = editTarget ? '编辑' : '添加';
        let url        = editTarget ? (apiUrl + '/' + editTarget.id) : apiUrl;
        let method     = editTarget ? 'put' : 'post';

        let data = {
            name: name.value,
            price: price.value,
            owner_id: owner_id.value
        };

        fetch(url, {
                    method: method,
                    // 使用fetch提交的json数据需要使用JSON.stringify转换为字符串
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
            })
            .then((res) => res.json())
            .then((res) => {
                // 当添加成功时，返回的json对象中应包含一个有效的id字段
                // 所以可以使用res.id来判断添加是否成功
                if (res.id) {
                    alert( opLabel + '成功');
                    this.context.router.push('/book/list');
                } else {
                    alert(opLabel + '失败');
                }
            })
            .catch((err) => console.error(err));


    }

    render(){
        const {form: {name, price, owner_id},  onFormChange} = this.props;

        return (

            <form onSubmit={(e) => this.handleSubmit(e)}>
                <FormItem label="书籍名：" valid={name.valid} error={name.error}>
                    <input
                        type="text"
                        value={name.value}
                        onChange={(e) => onFormChange('name', e.target.value)}
                    />
                </FormItem>

                <FormItem label="价格：" valid={price.valid} error={price.error}>
                    <input
                        type="number"
                        value={price.value || ''}
                        onChange={(e) => onFormChange('price', +e.target.value)}
                    />
                </FormItem>

                <FormItem label="拥有者：" valid={owner_id.valid} error={owner_id.error}>

                    <input
                        type="text"
                        value={owner_id.value || ''}
                        onChange={(e) => onFormChange('owner_id', +e.target.value)}
                    />
                </FormItem>


                <br/>
                <input type="submit" value="提交"/>
            </form>

        )
    }
}

BookEditor.contextTypes = {
    router: React.PropTypes.object.isRequired
};

let fields = {
    name: {
        defaultValue: '',
        rules: [
            {
                pattern: function (value) {
                    return value.length > 0;
                },
                error: '请输入书籍名'
            },
            {
                pattern: /^.{1,50}$/,
                error: '用户名最多4个字符'
            }
        ]
    },
    price: {
        defaultValue: 0,
        rules: [
            {
                pattern: function (value) {
                    return value >= 1 && value <= 1000;
                },
                error: '请输入1~1000'
            }
        ]
    },
    owner_id: {
        defaultValue: '',
        rules: [
            {
                pattern: function (value) {
                    return !!value;
                },
                error: '请输入owner_id'
            }
        ]
    }
};



export default  formProvider(fields)(BookEditor);

