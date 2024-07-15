// TaskPage.jsx
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import axiosInstance from '../api/axiosInstance';
import AppModal from '../ui/AppModal';
import CardsUpdateWrapper from '../ui/CardsUpdateWrapper';
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
        setCards((prev) => [res.data, ...prev]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cardSubmitUpdateHandler = async (e, id) => {
    e.preventDefault(); // Предотвращаем стандартное поведение отправки формы

    try {
      const formData = new FormData(e.target); // Получаем данные формы
      const data = Object.fromEntries(formData); // Преобразуем FormData в объект

      // Проверяем наличие необходимых данных
      if (!data.title || !data.description) {
        console.log('Title and description are required');
        return;
      }

      // Отправляем PATCH запрос на сервер для обновления задачи
      const res = await axiosInstance.patch(`/tasks/my-tasks/${id}`, data);

      // Обновляем состояние cards с обновлёнными данными
      setCards((prevCards) => prevCards.map((card) => (card.id === data.id ? res.data : card)));
      e.target.reset();
    } catch (err) {
      console.error('Error updating task:', err);
    }
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
      <CardsUpdateWrapper
        cards={cards}
        user={user}
        showDeleteButton={true}
        showUpdateButton={true}
        deleteHandler={deleteHandler}
        cardSubmitUpdateHandler={cardSubmitUpdateHandler}
      />
    </Row>
  );
}
