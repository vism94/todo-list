import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';

export default function TaskCard({ card, user, deleteHandler, showDeleteButton }) {
    return (
      <Col md={4} className="mt-2 position-relative">
        <Card>
          <h2 className="p-2">{card.title}</h2> 
          <p className="p-2">{card.description}</p> 
          <div className="d-flex flex-row justify-content-end gap-4">
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