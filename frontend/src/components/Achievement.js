import React from "react";
import LocalizedStrings from "react-localization";
import { Row, Col, Image } from "react-bootstrap";

const strings = new LocalizedStrings({
  en: {
    missing: "Achievement missing"
  },
  it: {
    missing: "Achievement mancante"
  },
});

const Achievement = ({ desc, link, img, img_off }) => {
  return (
    <Row style={{marginBottom: "15px"}}>
      <Col fluid={true} xs={2}>
        {link ? (
          <Image src={img} style={{ width: "64px" }} />
        ) : (
          <Image src={img_off} style={{ width: "64px" }} />
        )}
      </Col>
      <Col align="left">
        <strong
          style={{
            textTransform: "capitalize",
            fontWeight: "bold",
            color: "black",
          }}
        >
          {desc}
        </strong>
        <div>
          {link ? (
            <a href={link} target="_blank">
              Link
            </a>
          ) : (
            <div>{strings.missing}</div>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default Achievement;
