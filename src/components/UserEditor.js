import React,{ Component } from 'react'
import formProvider from '../util/formProvider'
import FormItem from './FormItem';
import HomeLayout from '../layouts/HomeLayout';

let baseUrl = 'http://localhost:3000/user';

class UserEditor extends React.Component {
    componentWillMount(){
        const {editTarget, setFormValues} = this.props;
        if(editTarget){
            setFormValues(editTarget);
        }
    }



    handleSubmit (e) {
        e.preventDefault();
        //alert(JSON.stringify(this.state));

        const {form: {name, age, gender}, formValid,editTarget} = this.props;
        if(!formValid){
            alert('请填写正确的信息后重试');
            return ;
        }


        let opLabel = editTarget ? '编辑' : '添加';
        let url        = editTarget ? (baseUrl + '/' + editTarget.id) : baseUrl;
        let method     = editTarget ? 'put' : 'post';

        let data = {
            name: name.value,
            age: age.value,
            gender: gender.value
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
                    alert( opLabel + '用户成功');
                    this.context.router.push('/user/list');
                } else {
                    alert(opLabel + '失败');
                }
            })
            .catch((err) => console.error(err));


    }

    render(){
        const {form: {name, age, gender},  onFormChange} = this.props;

        return (

            <form onSubmit={(e) => this.handleSubmit(e)}>
                <FormItem label="用户名" valid={name.valid} error={name.error}>
                    <input
                        type="text"
                        value={name.value}
                        onChange={(e) => onFormChange('name', e.target.value)}
                    />
                </FormItem>

                <FormItem label="年龄：" valid={age.valid} error={age.error}>
                    <input
                        type="number"
                        value={age.value || ''}
                        onChange={(e) => onFormChange('age', +e.target.value)}
                    />
                </FormItem>

                <FormItem label="性别：" valid={gender.valid} error={gender.error}>
                    <select
                        value={gender.value}
                        onChange={(e) => onFormChange('gender', e.target.value)}
                    >
                        <option value="">请选择</option>
                        <option value="male">男</option>
                        <option value="female">女</option>
                    </select>
                </FormItem>


                <br/>
                <input type="submit" value="提交"/>
            </form>

        )
    }
}

UserEditor.contextTypes = {
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
                error: '请输入用户名'
            },
            {
                pattern: /^.{1,4}$/,
                error: '用户名最多4个字符'
            }
        ]
    },
    age: {
        defaultValue: 0,
        rules: [
            {
                pattern: function (value) {
                    return value >= 1 && value <= 100;
                },
                error: '请输入1~100的年龄'
            }
        ]
    },
    gender: {
        defaultValue: '',
        rules: [
            {
                pattern: function (value) {
                    return !!value;
                },
                error: '请选择性别'
            }
        ]
    }
};



export default  formProvider(fields)(UserEditor);

