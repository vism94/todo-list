import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';

export default function TaskCard({ card, }) {
  return (
    <Col md={4} className="mt-2 position-relative">
      <Card>
        <h2 className="p-2">{card.title}</h2>
        <p className="p-2">{card.description}</p>
        <div className="d-flex flex-row justify-content-end gap-4">
        </div>
      </Card>
    </Col>
  );
}
