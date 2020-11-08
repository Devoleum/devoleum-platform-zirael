import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listHistoryDetails, updateHistory } from '../actions/historyActions'
import { HISTORY_UPDATE_RESET } from '../constants/historyConstants'

//steps
import {
  listSteps,
  deleteStep,
  createStep,
} from '../actions/stepActions'
import { STEP_CREATE_RESET } from '../constants/stepConstants'

const HistoryEditScreen = ({ match, history }) => {
  const historyId = match.params.id

  const [uri, setUri] = useState('')
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')

  const dispatch = useDispatch()

  const historyDetails = useSelector((state) => state.historyDetails)
  const { loading, error, devoleumHistory } = historyDetails
  console.log(devoleumHistory)

  const historyUpdate = useSelector((state) => state.historyUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = historyUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: HISTORY_UPDATE_RESET })
      history.push('/admin/historylist')
    } else {
      if (!devoleumHistory.name || devoleumHistory._id !== historyId) {
        dispatch(listHistoryDetails(historyId))
      } else {
        setName(devoleumHistory.name)
        setUri(devoleumHistory.uri)
        setCategory(devoleumHistory.category)
      }
    }
  }, [dispatch, history, historyId, devoleumHistory, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateHistory({
        _id: historyId,
        name,
        uri,
        category
      })
    )
  }

  const createStepHandler = () => {
    dispatch(createStep())
  }

  return (
    <>
      <Link to='/admin/historylist' className='btn btn-light my-3'>
        Go Back to list
      </Link>
      <FormContainer>
        <h1>Edit History</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='uri'>
              <Form.Label>Uri</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter uri'
                value={uri}
                onChange={(e) => setUri(e.target.value)}
              ></Form.Control>
            </Form.Group>
        
            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
      <br />
      <br />
      <Row className='align-items-center'>
        <Col>
          <h2>Steps</h2>
        </Col>
        <Col className='text-right'>
          <Button className='my-3'>
            <i className='fas fa-plus'></i> Create Step
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default HistoryEditScreen
