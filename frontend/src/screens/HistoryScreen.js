import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import {
  listHistoryDetails,
  createHistoryReview,
} from "../actions/historyActions";
import { listSteps } from "../actions/stepActions";
import { HISTORY_CREATE_REVIEW_RESET } from "../constants/historyConstants";
import Product from "../components/Product";

const HistoryScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const historyDetails = useSelector((state) => state.historyDetails);
  const { loading, error, devoleumHistory } = historyDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const stepList = useSelector((state) => state.stepList);
  const { loadingSteps, errorStep, steps } = stepList;
  console.log("steps", steps);
  const historyReviewCreate = useSelector((state) => state.historyReviewCreate);
  const {
    success: successHistoryReview,
    loading: loadingHistoryReview,
    error: errorHistoryReview,
  } = historyReviewCreate;

  useEffect(() => {
    if (successHistoryReview) {
      setRating(0);
      setComment("");
    }
    if (!devoleumHistory._id || devoleumHistory._id !== match.params.id) {
      dispatch(listHistoryDetails(match.params.id));
      dispatch(listSteps(match.params.id, "", 1));
      dispatch({ type: HISTORY_CREATE_REVIEW_RESET });
    }
  }, [dispatch, match, successHistoryReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createHistoryReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {devoleumHistory.data && (
            <>
              <Meta title={devoleumHistory.name} />
              <Row>
                <Col md={6}>
                  <Image
                    src={devoleumHistory.data.image}
                    alt={devoleumHistory.name}
                    fluid
                  />
                </Col>
                <Col md={3}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h3>{devoleumHistory.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Rating
                        value={devoleumHistory.rating}
                        text={`${devoleumHistory.numReviews} reviews`}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Description: {devoleumHistory.data.description}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={3}>
                  <Card>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>Price:</Col>
                          <Col>
                            <strong>${devoleumHistory.price}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Button
                          onClick={addToCartHandler}
                          className="btn-block"
                          type="button"
                          disabled={devoleumHistory.countInStock === 0}
                        >
                          Add To Cart
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
              <Row>
                {steps.map((devoleumStep) => (
                  <Col key={devoleumStep._id} sm={12} md={6} lg={4} xl={3}>
                    {devoleumStep.data && <Product product={devoleumStep} />}
                  </Col>
                ))}
              </Row>
              <Row>
                <Col md={6}>
                  <h2>Reviews</h2>
                  {devoleumHistory.reviews.length === 0 && (
                    <Message>No Reviews</Message>
                  )}
                  <ListGroup variant="flush">
                    {devoleumHistory.reviews.map((review) => (
                      <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} />
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                      </ListGroup.Item>
                    ))}
                    <ListGroup.Item>
                      <h2>Write a Customer Review</h2>
                      {successHistoryReview && (
                        <Message variant="success">
                          Review submitted successfully
                        </Message>
                      )}
                      {loadingHistoryReview && <Loader />}
                      {errorHistoryReview && (
                        <Message variant="danger">{errorHistoryReview}</Message>
                      )}
                      {userInfo ? (
                        <Form onSubmit={submitHandler}>
                          <Form.Group controlId="rating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                              as="select"
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            >
                              <option value="">Select...</option>
                              <option value="1">1 - Poor</option>
                              <option value="2">2 - Fair</option>
                              <option value="3">3 - Good</option>
                              <option value="4">4 - Very Good</option>
                              <option value="5">5 - Excellent</option>
                            </Form.Control>
                          </Form.Group>
                          <Form.Group controlId="comment">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                              as="textarea"
                              row="3"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></Form.Control>
                          </Form.Group>
                          <Button
                            disabled={loadingHistoryReview}
                            type="submit"
                            variant="primary"
                          >
                            Submit
                          </Button>
                        </Form>
                      ) : (
                        <Message>
                          Please <Link to="/login">sign in</Link> to write a
                          review{" "}
                        </Message>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </>
          )}
        </>
      )}
    </>
  );
};

export default HistoryScreen;
