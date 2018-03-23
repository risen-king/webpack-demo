import React from 'react';

/**
 * 表单验证高阶组件
 * 接收一个fields参数，并返回一个函数，这个函数接收一个组件作为参数并返回一个组件，
 * 用法：
 UserAdd = formProvider(fields)(UserAdd);

 经过formProvider处理后的UserAdd组件会得到额外的props:
 form
 formValid
 onFormChange


 * // 表示表单中有name、age、gender3个字段
 const fields = {
      name: {
        defaultValue: '',
        rules: [
          {
            // pattern用于对值进行校验，可以为方法或一个RegExp对象
            // 若方法的返回值为一个真值或RegExp.test(value)返回true则校验通过
            pattern: function (value) {
              return value.length > 0;
            },
            // 每个pattern对应一个error信息
            error: '请输入用户名'
          },
          {
            pattern: /^.{1,4}$/,
            error: '用户名最多4个字符'
          }
        ]
      },
      age: {...},
      gender: {...}
}
 * @param fields
 * @returns {Function}
 */
function formProvider (fields) {

    return function (Comp) {

        let initialFormState = {};
        for (let key in fields) {
            initialFormState[key] = {
                value: fields[key].defaultValue,
                error: ''
            };
        }

        class FormComponent extends React.Component {
            constructor (props) {
                super(props);
                this.state = {
                    form: initialFormState,
                    formValid: false
                };

                this.handleValueChange = this.handleValueChange.bind(this);
                this.setFormValues = this.setFormValues.bind(this);

            }

            setFormValues(values){
                if(!values){
                    return;
                }

                let { form } = this.state;
                let newForm = { ...form };
                for(let field in form){
                    if(form.hasOwnProperty(field)){ //定义在对象本身而不是继承自原型链
                        if(typeof  values[field] !== 'undefined'){
                            newForm[field] = {...newForm[field], value: values[field]};
                        }
                        // 正常情况下主动设置的每个字段一定是有效的
                        newForm[field].valid = true;
                    }
                }

                this.setState({form: newForm});
            }

            handleValueChange (fieldName, value) {
                const { form } = this.state;

                const newFieldState = {value: value, valid: true, error: ''};

                //验证字段规则
                let fieldRules = fields[fieldName].rules;
                for (let i = 0, len = fieldRules.length ; i < len ; i++) {
                    let {pattern, error} = fieldRules[i];
                    let valid = (typeof pattern === 'function') ? pattern(value) : pattern.test(value);
                    if (!valid) {
                        newFieldState.valid = false;
                        newFieldState.error = error;
                        break;
                    }
                }

                let newForm = {...form, [fieldName]: newFieldState};
                let formValid = Object.values(newForm).every(f => f.valid);
                this.setState({
                    form: newForm,
                    formValid
                });
            }

            render () {
                const {form, formValid} = this.state;
                return (
                    <Comp
                        {...this.props}
                        form={form}
                        formValid={formValid}
                        onFormChange={this.handleValueChange}
                        setFormValues={this.setFormValues}
                    />
                );


            }
        }

        return FormComponent;
    }
}

export default formProvider;