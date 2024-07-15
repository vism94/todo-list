import { useEffect, useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

import axiosInstance from '../api/axiosInstance';
import CardsWrapper from '../ui/CardsWrapper';

export default function MainPage({ user }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axiosInstance.get('/tasks').then((res) => setCards(res.data));
  }, []);

  return (
    <Col>
      <Row>
        <CardsWrapper cards={cards} user={user} />
      </Row>
    </Col>
  );
}
