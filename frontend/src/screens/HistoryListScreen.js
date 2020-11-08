import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
  listHistories,
  deleteHistory,
  createHistory,
} from '../actions/historyActions'
import { HISTORY_CREATE_RESET } from '../constants/historyConstants'

const HistoryListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const historyList = useSelector((state) => state.historyList)
  const { loading, error, histories, page, pages } = historyList

  const historyDelete = useSelector((state) => state.historyDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = historyDelete

  const historyCreate = useSelector((state) => state.historyCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    devoleumHistory: createdHistory,
  } = historyCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: HISTORY_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/history/${createdHistory._id}/edit`)
    } else {
      dispatch(listHistories('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdHistory,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteHistory(id))
    }
  }

  const createHistoryHandler = () => {
    dispatch(createHistory())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Histories</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createHistoryHandler}>
            <i className='fas fa-plus'></i> Create History
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
                    <LinkContainer to={`/admin/history/${devoleumHistory._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(devoleumHistory._id)}
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

export default HistoryListScreen
