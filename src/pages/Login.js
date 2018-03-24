import React from 'react';
import HomeLayout from '../layouts/HomeLayout';
import FormItem from '../components/FormItem';
import { post } from '../util/request';
import formProvider from '../util/formProvider';

const apiUrl = 'http://localhost:3000/login';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();

        let {formValid, form: {account, password}} = this.props;
        if(!formValid){
            alert('请输入账号或密码');
            return;
        }

        post(apiUrl, {account:account.value, password:password.value})
            .then((res) => {
                console.log(res)
                if(res){
                    this.context.router.push('/');
                }else{
                    alert('登录失败，账号或密码错误');
                }
            })
    }

    render(){
        const {form: {account, password}, onFormChange} = this.props;

        return (
            <HomeLayout title="请登录">
                <form onSubmit={this.handleSubmit}>
                    <FormItem label="账号：" valid={account.valid} error={account.error}>
                        <input type="text" value={account.value} onChange={e => onFormChange('account', e.target.value)}/>
                    </FormItem>

                    <FormItem label="密码：" valid={password.valid} error={password.error}>
                        <input type="password" value={password.value} onChange={e => onFormChange('password', e.target.value)}/>
                    </FormItem>


                    <br/>
                    <input type="submit" value="登录"/>


                </form>
            </HomeLayout>
        );
    }
}

Login.contextTypes = {
    router: React.PropTypes.object.isRequired
};

let fields = {
    account: {
        defaultValue: '',
        rules: [
            {
                pattern (value) {
                    return value.length > 0;
                },
                error: '请输入账号'
            }
        ]
    },
    password: {
        defaultValue: '',
        rules: [
            {
                pattern (value) {
                    return value.length > 0;
                },
                error: '请输入密码'
            }
        ]
    }
}

Login = formProvider(fields)(Login);

export default Login;