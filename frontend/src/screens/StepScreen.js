import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, ListGroup } from "react-bootstrap";
import Meta from "../components/Meta";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listStepDetails } from "../actions/stepActions";
import LocalizedStrings from "react-localization";
import Achievement from "../components/Achievement";
//images
import eth_main_off from "../imgs/eth_main_off.jpg";
import git_off from "../imgs/git_off.jpg";
import git_on from "../imgs/git_on.jpg";

const strings = new LocalizedStrings({
  en: {
    back: "Go Back",
    notarization: "Notarization",
    title: "Details",
  },
  it: {
    back: "Indietro",
    notarization: "Notarizzazione",
    title: "Dettagli",
  },
});

const StepScreen = ({ match }) => {
  const dispatch = useDispatch();

  const stepDetails = useSelector((state) => state.stepDetails);
  const { loading, error, devoleumStep } = stepDetails;

  useEffect(() => {
    if (!devoleumStep._id || devoleumStep._id !== match.params.stepId) {
      dispatch(listStepDetails(match.params.stepId));
    }
  }, [dispatch, match]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Link
            to={"/history/" + devoleumStep.historyId}
            className="btn btn-light my-3"
          >
            {strings.back}
          </Link>
          {devoleumStep.data && (
            <>
              <Meta title={devoleumStep.data.name} />
              <Row style={{ marginBottom: "15px" }}>
                <Col md={6}>
                  <Image
                    src={devoleumStep.data.image}
                    alt={devoleumStep.data.name}
                    fluid
                  />
                </Col>
                <Col md={6}>
                  <h3>{devoleumStep.data.name}</h3>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      {devoleumStep.data.description}
                    </ListGroup.Item>
                  </ListGroup>
                  <Row style={{ marginBottom: "15px" }}>
                    <Col md={12}>
                      <h3>{strings.notarization}</h3>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <Achievement
                            label="JSON link"
                            text={devoleumStep.uri}
                            img={git_on}
                            img_off={git_off}
                          />
                          <Achievement
                            label="Hash"
                            text={devoleumStep.hash}
                            link={false}
                            img={git_on}
                            img_off={git_off}
                          />
                          <Achievement
                            label="Ethereum Main"
                            text={devoleumStep.main_eth_notarization}
                            img={git_on}
                            img_off={git_off}
                          />
                          <Achievement
                            label="Ethereum Test"
                            text={devoleumStep.test_eth_notarization}
                            img={git_on}
                            img_off={git_off}
                          />
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <h3>{strings.title}</h3>
              <Row style={{ marginBottom: "15px" }}>
                <Col md={12}>
                  {Object.keys(devoleumStep.data).map((key, value) => (
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <strong
                          style={{
                            textTransform: "capitalize",
                            fontWeight: "bold",
                            color: "black",
                          }}
                        >
                          {" "}
                          {key.replace(/_/g, " ")}{" "}
                        </strong>{" "}
                        <br />
                        {
                          <div>
                            <div
                              style={{
                                whiteSpace: "pre-line",
                                verticalAlign: "bottom",
                              }}
                            >
                              {devoleumStep.data[key]}
                            </div>
                            <br />
                          </div>
                        }
                      </ListGroup.Item>
                    </ListGroup>
                  ))}
                </Col>
              </Row>
            </>
          )}
        </>
      )}
    </>
  );
};

export default StepScreen;
