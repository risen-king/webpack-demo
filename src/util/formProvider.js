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

        const initialFormState = {};
        for (const key in fields) {
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
            }
            handleValueChange (fieldName, value) {
                const { form } = this.state;

                const newFieldState = {value, valid: true, error: ''};

                const fieldRules = fields[fieldName].rules;

                for (let i = 0; i < fieldRules.length; i++) {
                    const {pattern, error} = fieldRules[i];
                    let valid = false;
                    if (typeof pattern === 'function') {
                        valid = pattern(value);
                    } else {
                        valid = pattern.test(value);
                    }

                    if (!valid) {
                        newFieldState.valid = false;
                        newFieldState.error = error;
                        break;
                    }
                }

                const newForm = {...form, [fieldName]: newFieldState};
                const formValid = Object.values(newForm).every(f => f.valid);

                this.setState({
                    form: newForm,
                    formValid
                });
            }
            render () {
                const {form, formValid} = this.state;
                return <Comp {...this.props} form={form} formValid={formValid} onFormChange={this.handleValueChange}/>
            }
        }

        return FormComponent;
    }
}

export default formProvider;