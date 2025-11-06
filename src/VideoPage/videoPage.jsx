import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Typography, Card, Input, Button, List, Spin } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import './VideoPage.css';

const { Title, Text } = Typography;
const { TextArea } = Input;

function VideoPage() {
  const { id } = useParams(); // получаем id видео из URL
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  
  // Получаем данные конкретного видео и список других видео
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.pexels.com/videos/search?query=nature&per_page=10`,
          {
            headers: {
              Authorization: 'DTCeq47x8O0FXNMSm5T2rfFpXm70kS8Q7kllaR8qfehgGE36VEEAjqad',
            },
          }
        );
        const data = await res.json();

        const videosData = data.videos.map((v) => ({
          key: uuidv4(),
          id: v.id,
          title: v.url.split('/').pop(),
          author: v.user.name,
          img: v.image,
          videoUrl: v.video_files[0]?.link || v.url,
        }));

        setVideos(videosData);
        const currentVideo = videosData.find((v) => String(v.id) === id) || videosData[0];
        setVideo(currentVideo);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const addComment = () => {
    if (!commentText.trim()) return;
    setComments((prev) => [...prev, { id: uuidv4(), text: commentText }]);
    setCommentText('');
  };

  if (loading) return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
  if (!video) return <Text>Видео не найдено</Text>;

  return (
    <div className="video-page">
      <Row gutter={16}>
        <Col xs={24} md={16}>
          <video src={video.videoUrl} controls style={{ width: '100%', borderRadius: 8 }} />
          <Title level={3} style={{ marginTop: 10 }}>{video.title}</Title>
          <Text type="secondary">{video.author}</Text>

          <div className="comments-section">
            <Title level={4}>Комментарии</Title>
            <TextArea
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Добавьте комментарий..."
            />
            <Button type="primary" onClick={addComment} style={{ marginTop: 10 }}>
              Отправить
            </Button>

            <List
              style={{ marginTop: 20 }}
              dataSource={comments}
              renderItem={(item) => <List.Item key={item.id}>{item.text}</List.Item>}
            />
          </div>
        </Col>

        <Col xs={24} md={8}>
          
          {videos
            .filter((v) => v.id !== video.id)
            .map((v) => (
              <Link to={`/video/${v.id}`} key={v.key}> 
              <Card
                hoverable
                key={v.key}
                cover={<img src={v.img} alt={v.title} />}
                style={{ marginBottom: 16 }}
              >
                <Title level={5}>{v.title}</Title>
                <Text type="secondary">{v.author}</Text>
                
              </Card>
              </Link>
            ))}
        </Col>
      </Row>
    </div>
  );
}

export default VideoPage;