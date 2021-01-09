import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, ListGroup } from "react-bootstrap";
import Meta from "../components/Meta";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listStepDetails } from "../actions/stepActions";

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
            Go Back
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
                      <h3>Notarization</h3>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                        <strong
                            style={{
                              textTransform: "capitalize",
                              fontWeight: "bold",
                              color: "black",
                            }}
                          >
                            JSON link
                          </strong>
                          <br />
                          <div>
                            <a href={devoleumStep.uri} target="_blank">Link</a>
                          </div>
                          <br />
                          <strong
                            style={{
                              textTransform: "capitalize",
                              fontWeight: "bold",
                              color: "black",
                            }}
                          >
                            Hash
                          </strong>
                          <br />
                          <div>
                            {devoleumStep.hash
                              ? devoleumStep.hash
                              : "Not present"}
                          </div>
                          <br />
                          <strong
                            style={{
                              textTransform: "capitalize",
                              fontWeight: "bold",
                              color: "black",
                            }}
                          >
                            Ethereum Main
                          </strong>
                          <br />
                          <div>
                            {devoleumStep.main_eth_notarization ? (
                              <a href={devoleumStep.main_eth_notarization}>
                                Check this link
                              </a>
                            ) : (
                              "Not present"
                            )}
                          </div>
                          <br />
                          <strong
                            style={{
                              textTransform: "capitalize",
                              fontWeight: "bold",
                              color: "black",
                            }}
                          >
                            Ethereum Test
                          </strong>
                          <br />
                          <div>
                            {devoleumStep.test_eth_notarization ? (
                              <a href={devoleumStep.test_eth_notarization}>
                                Check this link
                              </a>
                            ) : (
                              "Not present"
                            )}
                          </div>
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <h3>Details</h3>
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
