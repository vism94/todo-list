import Row from 'react-bootstrap/esm/Row';
import TaskUpdateCard from './TaskUpdateCard';

export default function CardsUpdateWrapper({
  cards,
  user,
  deleteHandler,
  showUpdateButton,
  showDeleteButton,
  cardSubmitUpdateHandler
}) {
  return (
    <Row className="mt-3">
      {cards.map((card) => (
        <TaskUpdateCard
          key={card.id}
          card={card}
          user={user}
          deleteHandler={deleteHandler}
          showUpdateButton={showUpdateButton}
          showDeleteButton={showDeleteButton}
          cardSubmitUpdateHandler={cardSubmitUpdateHandler}
        />
      ))}
    </Row>
  );
}
