import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { listHistories } from "../actions/historyActions";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const historyList = useSelector((state) => state.historyList);
  const { loading, error, histories, page, pages } = historyList;

  useEffect(() => {
    dispatch(listHistories(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Histories</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {histories.map((devoleumHistory) => (
            <>
              {devoleumHistory.data && (
                <Link
                  to={`/history/${devoleumHistory._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Product product={devoleumHistory} />
                </Link>
              )}
            </>
          ))}
        </>
      )}
    </>
  );
};

export default HomeScreen;
