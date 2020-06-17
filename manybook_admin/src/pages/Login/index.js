import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import styles from '../../css/login.css';
//引入动画板块

const tailLayout = {
    wrapperCol: { offset: 2, span: 22 },
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true
        }
    }
    onFinish = (values) => {
        if (values.username !== "" && values.password !== "") {
            console.log("登录成功！")
        }
    }
    onFinishFailed = () => {

    }

    render() {
        return (
            <React.Fragment>
                <Alert style={{textAlign:'center'}} message="若没有账号,默认第一次输入的账号密码为注册号码!" type="error" />
                <div className={styles.login_form}>
                    <h1 className={styles.login_h1}>登录</h1>
                    <Form hideRequiredMark="true" name="basic" initialValues={{ remember: true }} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
                        <Form.Item label="账号" name="username" rules={[{ required: true, message: '请输入你的登录账号!' }]}>
                            <Input placeholder="请输入登录账号(至少六位数)" />
                        </Form.Item>
                        <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入你的账号密码!' }]}>
                            <Input.Password placeholder="请输入登录密码(至少六位数)" />
                        </Form.Item>
                        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                            <Checkbox>记住账号密码</Checkbox>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">登录</Button>
                        </Form.Item>
                    </Form>
                </div>
            </React.Fragment>
        );
    }
}
export default Login;