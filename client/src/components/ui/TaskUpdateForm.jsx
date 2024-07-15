import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function TaskUpdateForm({ cardSubmitUpdateHandler, card }) {
  return (
    <Form onSubmit={(e) => cardSubmitUpdateHandler(e, card.id)}>
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Task</Form.Label>
        <Form.Control name="title" type="text" placeholder="Enter title" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control name="description" type="text" placeholder="Enter description" />
      </Form.Group>
      <Button variant="outline-primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
