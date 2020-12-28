import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import FormContainer from "../components/FormContainer";

import { listSteps, deleteStep, createStep } from "../actions/stepActions";
import { STEP_CREATE_RESET } from "../constants/stepConstants";

const StepListScreen = ({ history, historyId }) => {
  const [uri, setUri] = useState("");
  const [name, setName] = useState("");

  console.log("his id list: ", historyId);

  const pageNumber = 1;

  const dispatch = useDispatch();

  const stepList = useSelector((state) => state.stepList);
  const { loading, error, steps, page, pages } = stepList;

  const stepDelete = useSelector((state) => state.stepDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = stepDelete;

  const stepCreate = useSelector((state) => state.stepCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    devoleumStep: createdStep,
  } = stepCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: STEP_CREATE_RESET });

    if (!userInfo) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/dashboard/history/${historyId}/step/${createdStep._id}/edit`);
    } else {
      dispatch(listSteps(historyId, "", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdStep,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteStep(id));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createStep(historyId, {
        name,
        uri,
      })
    );
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Steps</h1>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>HISTORY ID</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {steps.map((devoleumStep) => (
                <tr key={devoleumStep._id}>
                  <td>{devoleumStep._id}</td>
                  <td>{devoleumStep.name}</td>
                  <td>{devoleumStep.historyID}</td>
                  <td>
                    <LinkContainer
                      to={`/dashboard/history/${historyId}/step/${devoleumStep._id}/edit`}
                    >
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(devoleumStep._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
          <FormContainer>
            <h1>Create new step</h1>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="uri">
                <Form.Label>Uri</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter uri"
                  value={uri}
                  onChange={(e) => setUri(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary">
                <i className="fas fa-plus"></i> Create Step
              </Button>
            </Form>
          </FormContainer>
        </>
      )}
    </>
  );
};

export default StepListScreen;
