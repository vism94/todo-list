import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function TaskForm({ cardSubmitHandler }) {
  return (
    <Form onSubmit={cardSubmitHandler}>
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Task</Form.Label>
        <Form.Control name="title" type="text" placeholder="Enter title" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control name="description" type="number" placeholder="Enter description" />
      </Form.Group>
      <Button variant="outline-primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
