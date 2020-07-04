import React, {useState, useEffect} from 'react';
import '../static/add.css';
import MarkdownRender from '../components/Markdown';
import {Row, Col, Input, Select, Button, DatePicker, Alert} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Axios from 'axios';
import servicePath from '../helper/url';

const {Option} = Select;

const AddArticle = (props) => {
    const [articleId, setarticleId] = useState(0);
    const [content, setcontent] = useState("");
    const [intro, setintro] = useState("");
    const [category, setcategory] = useState(1);
    const [date, setdate] = useState();
    // const [previewContent, setpreviewContent] = useState("");
    // const [previewIntro, setpreviewIntro] = useState("");
    const [title, setTitle] = useState("");
    const [type, settype] = useState([]);
    const [error, seterror] = useState(null);

    const getArticleInfo = async (id) => {
        const res = await Axios.get(servicePath.changeArticle + id);
        console.log(res);
        setcontent(res.data.content);
        setintro(res.data.introduction);
        setcategory(res.data.type_id);
        setdate(res.data.created_at);
        setTitle(res.data.name);
    }

    const saveArticle = async () => {
        if (!title || title === "") {
            seterror("Title can't be empty");
            return;
        }
        if (!content || content === "") {
            seterror("Content can't be empty");
            return;
        }
        if (!intro || intro === "") {
            seterror("Introduction can't be empty");
            return;
        }
        if (!category || category === "") {
            seterror("Category can't be empty");
            return;
        }
        if (!date || date === "") {
            seterror("Date can't be empty");
            return;
        }
        seterror(null);
        const dateText = date.replace('-','/')
        const data = {
            name: title,
            introduction: intro,
            content: content,
            created_at: (new Date(dateText).getTime())/1000,
            type_id: category
        };
        console.log(articleId);
        if (articleId === 0){
            const res = await Axios.post(servicePath.addArticle, 
                data, {withCredentials: true});
            if (res.data.data === "success") {
                props.history.push('/');
            } else {
                seterror("Fail to save the article");
            }
        } else {
            data.id = articleId;
            const res = await Axios.post(servicePath.updateArticle, data, {withCredentials: true});
            if (res.data.data === "success") {
                props.history.push('/');
            } else {
                seterror("Fail to update the article");
            }
        }
        
    }

    useEffect(() => {
        const getTypeInfo = async () => {
            const types = await Axios.get(servicePath.typeinfo, {withCredentials: true});
            // console.log(types);
            if (!types || types.data.data === "You haven't logged in") {
                console.log("Invalid user");
                localStorage.removeItem('userid');
                props.history.push('/');
                return;
            }
            settype(types.data);
        } 
        getTypeInfo();
        const tmpId = props.match.params.id;
        if (tmpId) {
            setarticleId(tmpId);
            getArticleInfo(tmpId);
        }
    }, [props.history, props.match.params.id]);

    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={16}>
                            <Input placeholder="title" size="large" value={title} onChange={(e)=>setTitle(e.target.value)}></Input>
                        </Col>
                        <Col span={8}>
                            <Select className="type" size="large" value={category} onChange={(e) => {setcategory(e);}}>
                                {
                                    type.filter((item) => (item.name != null)).map((item, index) => {
                                        return (<Option key={index} value={item.id}>{item.name}</Option>);
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea className="markdown-article"
                                rows={25}
                                placeholder="article content"
                                onChange={(e) => {
                                    setcontent(e.target.value);
                                }}
                                value={content}
                            >
                            </TextArea>
                        </Col>
                        <Col span={12}>
                            <div className="preview">
                                <MarkdownRender className="markdown-preview" source={content}
                                escapeHtml={true}></MarkdownRender>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button className="save-button" size="large" onClick={saveArticle}>Save</Button>
                            {
                                (error !== null) ? (
                                  <Alert message={error} type="error"></Alert>  
                                ) : null
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <TextArea className="intro-text" rows={4} 
                                placeholder="Introduction of the article"
                                onChange={(e) => {
                                    setintro(e.target.value);
                                }}
                                value={intro}
                                ></TextArea>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div className="time">
                                <DatePicker className="datepicker" size="large" placeholder="date" defaultValue={date}
                                    onChange={(date, dateString) => {setdate(dateString)}}
                                ></DatePicker>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <div className="intro-preview">
                                <MarkdownRender source={intro} escapeHtml={true}></MarkdownRender>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default AddArticle;
