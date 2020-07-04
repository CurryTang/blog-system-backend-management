import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  UserOutlined,
} from '@ant-design/icons';
import '../static/admin.css';
import React, {useState} from 'react';
import {Route} from 'react-router-dom';
import AddArticle from './AddArticle';
import ArticleList from './ArticleList';


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function SiderDemo(props) {
    const [Collapse, setCollapse] = useState(false)

    const onCollapse = collapsed => {
        setCollapse(collapsed);
    };

    const handleClick = (e) => {
        if (e.key === "2") {
            props.history.push('/admin/add');
        } else {
            props.history.push('/admin/article');
        }
    }

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={Collapse} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <DesktopOutlined />
              <span>添加文章</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <UserOutlined />
                  <span>文章管理</span>
                </span>
              }
              onClick={handleClick}
            >
              <Menu.Item key="2">添加文章</Menu.Item>
              <Menu.Item key="3">文章列表</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>后台管理</Breadcrumb.Item>
              <Breadcrumb.Item>工作台</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <div>
                  <Route path='/admin/' exact component={AddArticle} />
                  <Route path='/admin/add/' exact  component={AddArticle} />
                  <Route path='/admin/add/:id' exact  component={AddArticle} />
                  <Route path='/admin/article/' component={ArticleList} />
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>高桥镇老年干休所</Footer>
        </Layout>
      </Layout>
    );
}

export default SiderDemo;