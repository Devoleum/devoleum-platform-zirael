import React from "react";
import LocalizedStrings from "react-localization";
import { Row, Col, Image } from "react-bootstrap";

const strings = new LocalizedStrings({
  en: {
    missing: "Achievement missing",
  },
  it: {
    missing: "Achievement mancante",
  },
});

const Achievement = ({ label, text, img, img_off, link = true }) => {
  return (
    <Row style={{ marginBottom: "15px" }}>
      <Col fluid={true} xs="auto" md="auto">
        {text ? (
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
          {label}
        </strong>
        <div>
          {text ? (
            <>
              {link ? (
                <a href={text} target="_blank">
                  Link
                </a>
              ) : (
                <p
                  style={{
                    wordBreak: "break-word",
                  }}
                >
                  {text}
                </p>
              )}
            </>
          ) : (
            <div>{strings.missing}</div>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default Achievement;
