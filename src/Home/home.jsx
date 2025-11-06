import { useState, useEffect } from 'react';
import { Card, Input, Row, Col, Button, Spin, Typography } from 'antd';
import 'antd/dist/reset.css';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './Home.css';

const { Title, Text } = Typography;
const { Search } = Input;

function Home() {
  
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;

  const fetchVideos = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.pexels.com/videos/search?query=nature&per_page=${perPage}&page=${pageNumber}`,
        {
          headers: {
            Authorization: 'DTCeq47x8O0FXNMSm5T2rfFpXm70kS8Q7kllaR8qfehgGE36VEEAjqad',
          },
        }
      );

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      const videosData = data.videos.map((video) => ({
        key: uuidv4(), // 
        id: video.id,
        title: video.url.split('/').pop(),
        author: video.user.name,
        img: video.image,
        videoUrl: video.video_files[0]?.link || video.url,
      }));

      setVideos((prev) => [...prev, ...videosData]);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(1);
  }, []);

  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchVideos(nextPage);
  };

  return (
    <div className="home-container">
      

      <Search
        placeholder="Поиск по видео или каналу"
        allowClear
        enterButton="Найти"
        size="large"
        onSearch={setSearchTerm}
        style={{ maxWidth: 500, margin: '0 auto 30px', display: 'block' }}
      />

      {error && <Text type="danger">{error}</Text>}

      <Row gutter={[16, 16]}>
        {filteredVideos.map((video) => (
          <Col xs={24} sm={12} md={8} lg={6} key={video.key}>
            <Link to={`/video/${video.id}`}>
            <Card
              hoverable
              cover={<img alt={video.title} src={video.img} />}
              style={{ height: '100%' }}
            >
              <Card.Meta title={video.title} description={video.author} />
              <Button
                type="primary"
                block
                style={{ marginTop: 10 }}
                href={video.videoUrl}
                target="_blank"
              >
                Смотреть
              </Button>
            </Card>
            </Link>
          </Col>
        ))}
      </Row>

      {loading && (
        <div style={{ textAlign: 'center', margin: 20 }}>
          <Spin size="large" />
        </div>
      )}

      {!loading && filteredVideos.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <Button type="primary" onClick={loadMore}>
            Загрузить ещё
          </Button>
        </div>
      )}
    </div>
  );
}

export default Home;