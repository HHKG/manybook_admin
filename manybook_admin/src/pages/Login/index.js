import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import styles from '../../public/css/login.css';
// import Home from '../Home';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    submit = () => {
        console.log('正在登录~~~')
    }
    onFinish=()=>{

    }
    componentDidMount=()=>{

    }
    onFinishFailed=()=>{

    }
    render() {
        return (
            <div>
                <Form className={styles.formBorder} {...layout} name="basic" initialValues={{ remember: true }} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
                    <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">登录</Button>
                    </Form.Item>
                </Form>
                {/* <Home></Home> */}
            </div>
        );
    }
}

export default Login;