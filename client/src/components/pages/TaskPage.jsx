import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import AppModal from '../ui/AppModal';
import axiosInstance from '../api/axiosInstance';
import CardsWrapper from '../ui/CardsWrapper';
import TaskForm from '../ui/TaskForm';

export default function TaskPage({ user }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axiosInstance.get('/tasks/my-tasks').then((res) => setCards(res.data));
  }, []);

  const cardSubmitHandler = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    if (!data.title || !data.description) return; 

    axiosInstance
      .post('/tasks/my-tasks', data)
      .then((res) => {
        setCards((prev) => [res.data, ...prev])
        ;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteHandler = (id) => {
    axiosInstance.delete(`/tasks/my-tasks/${id}`).then(() => {
      setCards((prev) => prev.filter((el) => el.id !== id));
    });
  };

  return (
    <Row>
      {user.data && (
        <Col>
          <AppModal title="Create a task" buttonText="Create a task">
            <TaskForm cardSubmitHandler={cardSubmitHandler} />
          </AppModal>
        </Col>
      )}
      <CardsWrapper cards={cards} deleteHandler={deleteHandler} user={user} showDeleteButton={true}/>
    </Row>
  );
}

