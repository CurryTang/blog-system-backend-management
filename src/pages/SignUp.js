import React , {useState} from 'react';
import { Form, Input, Button, Spin, Alert } from 'antd';
import 'antd/dist/antd.css';
import '../static/login.css';
import bcrypt from 'bcryptjs';
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


function SignUp(props){
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setpasswordAgain] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, seterror] = useState("");

    const checkSignUp = async () => {
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
        if (!passwordAgain || passwordAgain === "") {
            seterror("You should verify you password");
            setLoading(false);
            return;
        }
        if (password !== passwordAgain) {
            seterror("Your password doesn't match");
            setLoading(false);
            return;
        }
        // encrypt the password
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        const data = {
            username: username, 
            passwordHash: hash
        };
        const res = await axios.post(servicePath.userSignup, data);
        if(res.data.data === "success") {
            setLoading(false);
            localStorage.setItem('userid', res.data.userid);
            props.history.push('/admin');
        } else {
            setLoading(false);
            seterror(res.data);
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
            
            <Form.Item
            label="Password"
            name="password-verify"
            rules={[
                {
                required: true,
                message: 'Please verify your password!',
                },
            ]}
            >
            <Input.Password className="password"
                onChange={(e) => {setpasswordAgain(e.target.value)}}
            />
            </Form.Item>

            <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" onClick={checkSignUp}>
                Submit
            </Button>
            </Form.Item>
        </Form>
    </Spin>
    </div>
    );
}
export default SignUp