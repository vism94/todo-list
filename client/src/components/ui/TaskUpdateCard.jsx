import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import AppUpdateModal from './AppUpdateModal';
import TaskUpdateForm from './TaskUpdateForm';

export default function TaskUpdateCard({ card, user, cardSubmitUpdateHandler, showDeleteButton, deleteHandler }) {
  return (
    <Col md={4} className="mt-2 position-relative">
      <Card>
        <h2 className="p-2">{card.title}</h2>
        <p className="p-2">{card.description}</p>
        <div className="d-flex flex-row justify-content-end gap-5">
          <AppUpdateModal title="Update a task" buttonText="Update">
            <TaskUpdateForm cardSubmitUpdateHandler={cardSubmitUpdateHandler} card={card} />
          </AppUpdateModal>

          {showDeleteButton && user.data && user.data.id === card.userId && (
            <Button
              onClick={() => deleteHandler(card.id)}
              variant="outline-danger"
              className="mb-2"
            >
              Delete
            </Button>
          )}
        </div>
      </Card>
    </Col>
  );
}
