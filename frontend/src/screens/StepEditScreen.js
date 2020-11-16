import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listStepDetails, updateStep } from '../actions/stepActions'
import { STEP_UPDATE_RESET } from '../constants/stepConstants'


const StepEditScreen = ({ match, history }) => {
  const stepId = match.params.stepId
  const pageNumber = match.params.pageNumber || 1


  const [uri, setUri] = useState('')
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')

  const dispatch = useDispatch()

  const stepDetails = useSelector((state) => state.stepDetails)
  const { loading, error, devoleumStep } = stepDetails
  console.log(devoleumStep)

  const stepUpdate = useSelector((state) => state.stepUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = stepUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: STEP_UPDATE_RESET })
      history.push('/admin/steplist')
    } else {
      if (!devoleumStep.name || devoleumStep._id !== stepId) {
        dispatch(listStepDetails(stepId))
      } else {
        setName(devoleumStep.name)
        setUri(devoleumStep.uri)
        setCategory(devoleumStep.category)
      }
    }
  }, [dispatch, history, stepId, devoleumStep, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateStep({
        _id: stepId,
        name,
        uri,
        category
      })
    )
  }

  return (
    <>
      <Link to='/admin/steplist' className='btn btn-light my-3'>
        Go Back to list
      </Link>
      <FormContainer>
        <h1>Edit Step</h1>
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
    </>
  )
}

export default StepEditScreen
