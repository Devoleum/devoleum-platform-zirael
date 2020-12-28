import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import FormContainer from "../components/FormContainer";

import {
  listHistoriesByMerchant,
  deleteHistory,
  createHistory,
} from "../actions/historyActions";
import { HISTORY_CREATE_RESET } from "../constants/historyConstants";

const HistoryListScreen = ({ history, match }) => {
  const [uri, setUri] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const historyListByMerchant = useSelector(
    (state) => state.historyListByMerchant
  );
  console.log(historyListByMerchant);

  const { loading, error, histories } = historyListByMerchant;
  console.log(histories);

  const historyDelete = useSelector((state) => state.historyDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = historyDelete;

  const historyCreate = useSelector((state) => state.historyCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    devoleumHistory: createdHistory,
  } = historyCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: HISTORY_CREATE_RESET });

    if (!userInfo) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/history/${createdHistory._id}/edit`);
    } else {
      console.log("search by merch");
      dispatch(listHistoriesByMerchant(userInfo._id));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdHistory,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteHistory(id));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createHistory({
        name,
        uri,
        category,
      })
    );
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Histories</h1>
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
                <th>CATEGORY</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {histories.map((devoleumHistory) => (
                <tr key={devoleumHistory._id}>
                  <td>{devoleumHistory._id}</td>
                  <td>{devoleumHistory.name}</td>
                  <td>{devoleumHistory.category}</td>
                  <td>
                    <LinkContainer
                      to={`/admin/history/${devoleumHistory._id}/edit`}
                    >
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(devoleumHistory._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <FormContainer>
            <h1>Create new story</h1>
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

                <Form.Group controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                <i className="fas fa-plus"></i> Create Story
                </Button>
              </Form>
          </FormContainer>
        </>
      )}
    </>
  );
};

export default HistoryListScreen;
