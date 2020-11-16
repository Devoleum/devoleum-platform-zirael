import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
  listSteps,
  deleteStep,
  createStep,
} from '../actions/stepActions'
import { STEP_CREATE_RESET } from '../constants/stepConstants'

const StepListScreen = ({ history, historyId }) => {
  console.log("his id list: ", historyId)

  const pageNumber = 1
  

  const dispatch = useDispatch()

  const stepList = useSelector((state) => state.stepList)
  const { loading, error, steps, page, pages } = stepList

  const stepDelete = useSelector((state) => state.stepDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = stepDelete

  const stepCreate = useSelector((state) => state.stepCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    devoleumStep: createdStep,
  } = stepCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: STEP_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/history/${historyId}/step/${createdStep._id}/edit`)
    } else {
      dispatch(listSteps(historyId, '', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdStep,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteStep(id))
    }
  }

  const createStepHandler = () => {
    dispatch(createStep(historyId))
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Steps</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createStepHandler}>
            <i className='fas fa-plus'></i> Create Step
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
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
                    <LinkContainer to={`/admin/history/${historyId}/step/${devoleumStep._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(devoleumStep._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default StepListScreen
