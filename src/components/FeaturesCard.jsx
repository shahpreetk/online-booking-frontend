//@ts-check
import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { BsCheckCircle } from "react-icons/bs";

const FeaturesCard = ({
  cardTitle,
  feature1,
  feature2,
  feature3,
  feature4,
}) => {
  return (
    <Card className="shadow-lg border-0 bg-white rounded">
      <Card.Body>
        <Card.Title className="pl-4">{cardTitle}</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <BsCheckCircle size={20} /> {feature1}
          </ListGroup.Item>
          <ListGroup.Item>
            <BsCheckCircle size={20} /> {feature2}
          </ListGroup.Item>
          <ListGroup.Item>
            <BsCheckCircle size={20} /> {feature3}
          </ListGroup.Item>
          <ListGroup.Item>
            <BsCheckCircle size={20} /> {feature4}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default FeaturesCard;
