import React , {useState} from 'react';
import { Form, Input, Button, Spin, Alert } from 'antd';
import 'antd/dist/antd.css';
import '../static/login.css';
import axios from 'axios';
import servicePath from '../helper/url';

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
};

const tailLayout = {
wrapperCol: {
    offset: 8,
    span: 16,
},
};


function Login(props){
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, seterror] = useState("");

    const checkLogin = async () => {
        setLoading(true);
        if (!username || username === "") {
            seterror("Username can not be empty");
            setLoading(false);
            return;
        }
        if (!password || password === "") {
            seterror("Password can not be empty");
            setLoading(false);
            return;
        }
        const data = {
            username: username,
            password: password
        };
        const res = await axios.post(servicePath.userLogin, data);
        setLoading(false);
        if (res.data.data === 'success') {
            localStorage.setItem('userid', res.data.userid);
            props.history.push('/admin');
        } else {
            seterror('Wrong username or wrong password');
            return;
        }
        setTimeout(()=>{
            setLoading(false)
        },1000
        );
    }

    return (
    <div className="wrapper">
    <Spin tip="Loading..." spinning={loading}>
        {(error !== "") ? <Alert message={error} type="error"></Alert> : null}
        <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: false,
            }}
        >
            <Form.Item
            label="Username"
            name="username"
            rules={[
                {
                required: true,
                message: 'Please input your username!',
                },
            ]}
            >
            <Input className="username"
                onChange={(e) => {setUserName(e.target.value)}}/>
            </Form.Item>

            <Form.Item
            label="Password"
            name="password"
            rules={[
                {
                required: true,
                message: 'Please input your password!',
                },
            ]}
            >
            <Input.Password className="password"
                onChange={(e) => {setPassword(e.target.value)}}
            />
            </Form.Item>


            <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" onClick={checkLogin}>
                Submit
            </Button>
            </Form.Item>
        </Form>
    </Spin>
    </div>
    );
}
export default Login