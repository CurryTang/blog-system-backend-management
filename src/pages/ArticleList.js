import { List, Modal, Button} from 'antd';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import servicePath from '../helper/url';

export default function ArticleList(props) {
    const setChange = (id) => {
        props.history.push('/admin/add/' + id);
    }
    const getData = async () => {
        const res = await axios.get(servicePath.getarticleList);
        setlistData(res.data);
    }
    const setDelete = async (id) => {
        Modal.confirm({
            title: "Do you really want to delete this article",
            async onOK() {
                await axios.delete(servicePath.deleteArticle + id, {withCredentials: true});
                getData();
            }
        })
    }
    const [listData, setlistData] = useState([]);
    useEffect(
        () => {
            getData();
        }
    , [])
    return (
  <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: page => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={listData}
    footer={
      <div>
        <b>ant design</b> footer part
      </div>
    }
    renderItem={item => (
      <List.Item
        key={item.id}
        actions={[<Button key="edit" onClick={()=>{setChange(item.id)}}>edit</Button>, <Button key="delete" onClick={() => setDelete(item.id)}>delete</Button>]}
      >
        <List.Item.Meta
          title={`Title: ${item.name}`}
          description={`Introduction: ${item.introduction}`}
        />
      </List.Item>
    )}
  /> );
    }