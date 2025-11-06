import { useEffect, useState } from 'react';
import { Button, Modal, Input, Row, Col, Card, Switch, Typography, message } from 'antd';
import { VIDEOS } from '../videos';
import '../App.css';

const { Title } = Typography;

function Profile() {
  const [videos, setVideos] = useState(() => {
    try {
      const raw = localStorage.getItem('videos');
      return raw ? JSON.parse(raw) : VIDEOS;
    } catch (e) {
      console.error('Invalid LocalStorage video', e);
      localStorage.removeItem('videos');
      return VIDEOS;
    }
  });

  useEffect(() => {
    localStorage.setItem('videos', JSON.stringify(videos));
  }, [videos]);

  const [showOnlyLiked, setShowOnlyLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVideo, setNewVideo] = useState({
    title: '',
    chanelName: '',
    img: '',
    initialLikes: 0,
  });

  const videosToShow = videos.filter(video => {
    if (!showOnlyLiked) return true;
    const savedLiked = localStorage.getItem(`video_${video.id}_liked`);
    return savedLiked === 'true';
  });

  const handleAddVideo = () => {
    const id = Date.now();
    setVideos([...videos, { ...newVideo, id }]);
    setIsModalOpen(false);
    setNewVideo({ title: '', chanelName: '', img: '', initialLikes: 0 });
    message.success('Видео добавлено!');
  };

  const handleDelete = (id) => {
    setVideos(videos.filter(v => v.id !== id));
    localStorage.removeItem(`video_${id}_liked`);
    localStorage.removeItem(`video_${id}_likes`);
    message.info('Видео удалено');
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <Title level={2}>Мои видео</Title>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span>Показать только лайкнутые:</span>
          <Switch checked={showOnlyLiked} onChange={() => setShowOnlyLiked(prev => !prev)} />
          <Button type="primary" onClick={() => setIsModalOpen(true)}>Добавить видео</Button>
        </div>
      </div>

      
      <Modal
        title="Добавить новое видео"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleAddVideo}
        okText="Добавить"
        cancelText="Отмена"
      >
        <Input
          placeholder="Название видео"
          value={newVideo.title}
          onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
          style={{ marginBottom: '10px' }}
        />
        <Input
          placeholder="Имя канала"
          value={newVideo.chanelName}
          onChange={(e) => setNewVideo({ ...newVideo, chanelName: e.target.value })}
          style={{ marginBottom: '10px' }}
        />
        <Input
          placeholder="Ссылка на картинку"
          value={newVideo.img}
          onChange={(e) => setNewVideo({ ...newVideo, img: e.target.value })}
          style={{ marginBottom: '10px' }}
        />
      </Modal>

      {/* Галерея видео */}
      <Row gutter={[24, 24]}>
        {videosToShow.length ? (
          videosToShow.map(video => (
            <Col xs={24} sm={12} md={8} lg={6} key={video.id}>
              <Card
                hoverable
                cover={<img alt={video.title} src={video.img} style={{ height: '180px', objectFit: 'cover' }} />}
                actions={[
                  <Button
                    type="link"
                    onClick={() => {
                      const key = `video_${video.id}_liked`;
                      const liked = localStorage.getItem(key) === 'true';
                      localStorage.setItem(key, JSON.stringify(!liked));
                      
                      setVideos([...videos]);
                    }}
                  >
                    {localStorage.getItem(`video_${video.id}_liked`) === 'true' ? '❤️' : '🤍'}
                  </Button>,
                  <Button type="link" danger onClick={() => handleDelete(video.id)}>Удалить</Button>,
                ]}
              >
                <Card.Meta title={video.title} description={video.chanelName} />
              </Card>
            </Col>
          ))
        ) : (
          <p style={{ textAlign: 'center', width: '100%' }}>Нет видео для отображения 😔</p>
        )}
      </Row>
    </div>
  );
}

export default Profile;