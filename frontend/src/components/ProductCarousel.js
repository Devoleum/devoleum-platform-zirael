import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopHistories } from '../actions/historyActions'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const historyTopRated = useSelector((state) => state.historyTopRated)
  const { loading, error, histories } = historyTopRated

  useEffect(() => {
    dispatch(listTopHistories())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {histories.map((devoleumHistory) => (
        <Carousel.Item key={devoleumHistory._id}>
          <Link to={`/history/${devoleumHistory._id}`}>
            <Image src={devoleumHistory.image} alt={devoleumHistory.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {devoleumHistory.name} (${devoleumHistory.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
