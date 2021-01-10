import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, ListGroup } from "react-bootstrap";
import Meta from "../components/Meta";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listHistoryDetails } from "../actions/historyActions";
import { listSteps } from "../actions/stepActions";
import Product from "../components/Product";
import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    back: "Go Back",
    by: "by",
    title: "Steps"
  },
  it: {
    back: "Indietro",
    by: "di",
    title: "Passaggi"
  },
});

const HistoryScreen = ({ match }) => {
  const dispatch = useDispatch();

  const historyDetails = useSelector((state) => state.historyDetails);
  const { loading, error, devoleumHistory } = historyDetails;
  console.log("devoleumHistory: ", devoleumHistory)

  const stepList = useSelector((state) => state.stepList);
  const { steps } = stepList;

  useEffect(() => {
    if (!devoleumHistory._id || devoleumHistory._id !== match.params.id) {
      dispatch(listHistoryDetails(match.params.id, true));
      dispatch(listSteps(match.params.id, "", 1));
    }
  }, [dispatch, match]);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
      {strings.back}
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {devoleumHistory.data && (
            <>
              <Meta title={devoleumHistory.data.name} />
              <Row style={{ marginBottom: "15px" }}>
                <Col md={6}>
                  <Image
                    src={devoleumHistory.data.image}
                    alt={devoleumHistory.data.name}
                    fluid
                  />
                </Col>
                <Col md={6}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h3>{devoleumHistory.data.name}</h3>
                      {strings.by}{" "}{devoleumHistory.data.merchant && <Link to={`/merchant/${devoleumHistory.user}`}>{devoleumHistory.data.merchant.name}</Link>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {devoleumHistory.data.description}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
              <h3>{strings.title}</h3>
              {steps.map((devoleumStep) => (
                <>
                  {devoleumStep.data && (
                    <Link
                      to={`/step/${devoleumStep._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Product product={devoleumStep} />
                    </Link>
                  )}
                </>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};

export default HistoryScreen;
