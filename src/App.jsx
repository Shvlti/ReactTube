import { Layout, Menu } from 'antd';
import { Link, Routes, Route } from 'react-router-dom';
import Profile from './Profile/profile.jsx';
import VideoPage from './VideoPage/videoPage.jsx';
import 'antd/dist/reset.css'; // для Ant Design 5+
import Home from './Home/main-page.jsx';

const { Header, Content } = Layout;



function App() {
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#696969', display: 'flex', alignItems: 'center' }}>
        <div className="logo" style={{ color: '#fff', fontWeight: 'bold', fontSize: '20px', marginRight: '20px' }}>
          REACTTUBE
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']} style={{ flex: 1, background: '#696969'}}>
          <Menu.Item key="home">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="profile">
            <Link to="/profile">Profile</Link>
          </Menu.Item>
        </Menu>
        
      </Header>

      <Content style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/video/:id" element={<VideoPage />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;