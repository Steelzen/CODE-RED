import {useState, useEffect} from "react";
import {getAllUsers} from "./client";
import {
    Layout,
    Menu,
    Breadcrumb,
    Table, Spin, Empty
} from "antd";
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    LoadingOutlined,
} from '@ant-design/icons';

import './App.css';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
];

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function App() {
    const [users, setUsers] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);

    const fetchUsers = () => getAllUsers()  // this has data through client.js
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setUsers(data);
            setFetching(false);
        })

    useEffect(()=>{
        console.log("component is mounted");
        fetchUsers();

    },[]);

    const renderUsers = () => {
        if (fetching) {
            return <Spin indicator={antIcon} />
        }
        if (users.length <= 0) {
            return <Empty />;
        }
        return <Table dataSource={users}
                      columns={columns}
                      bordered
                      title={() => 'Users'}
                      pagination={{ pageSize: 50 }}
                      scroll={{ y: 240 }}
                      rowKey={(user) => user.id}
        />;
    }

    return <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed}
               onCollapse={setCollapsed}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<TeamOutlined />}>
                    Login
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}>
                    Registration
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined />} title="Profile">
                    <Menu.Item key="3">User1</Menu.Item>
                    <Menu.Item key="4">User2</Menu.Item>
                    <Menu.Item key="5">User3</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<FileOutlined />} title="Document">
                    <Menu.Item key="6">Add Document</Menu.Item>
                    <Menu.Item key="7">Delete Document</Menu.Item>
                    <Menu.Item key="8">Update Document</Menu.Item>
                    <Menu.Item key="9">Share Document</Menu.Item>
                </SubMenu>
                <Menu.Item key="10" icon={<PieChartOutlined />}>
                    Search Document
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 10, textAlign: 'center', fontSize: 'large' }}>Document Control System</Header>
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>UserList</Breadcrumb.Item>
                    <Breadcrumb.Item>Summary</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    {renderUsers()}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>©2022 Created by CodeRed</Footer>
        </Layout>
    </Layout>

}

export default App;
