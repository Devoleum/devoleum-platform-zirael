import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; Devoleum</Col>
        </Row>
        <Row>
          <Col className="text-center">Donate to</Col> 
        </Row>
        <Row>
          <Col className="text-center">ETH: 0x0F4cC51fd25E7E9954BBcc33efCB2A36B7Ab8904</Col> 
        </Row>
        <Row>
          <Col className="text-center">ALGO: 5N22O3PIXAGNAGHBFSU6HQ22KGI4D3XEBACEFODVH3UOKCA4C2IBRD4ZDE</Col>
        </Row>
        <br />
      </Container>
    </footer>
  );
};

export default Footer;
