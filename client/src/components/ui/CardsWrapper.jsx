import Row from 'react-bootstrap/esm/Row';
import TaskCard from './TaskCard';

export default function CardsWrapper({ cards, user }) {
  return (
    <Row className="mt-3">
      {cards.map((card) => (
        <TaskCard key={card.id} card={card} />
      ))}
    </Row>
  );
}
