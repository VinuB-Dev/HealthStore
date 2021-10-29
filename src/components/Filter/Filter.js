import "./Filter_module.css";
import { useState } from "react";
import { FcFilledFilter } from "react-icons/fc";
import { useCart } from "../../context/data/dataContext";

export default function Filter() {
  const { dispatch } = useCart();
  const ShowFilter = () => {
    return (
      <div className="filter-flex-1">
        <div className="sort-flex">
          <div>Sort By:</div>
          <div className="margin-1">
            <a
              className="link_btn-1"
              onClick={() =>
                dispatch({ type: "SORT", payload: "PRICE_HIGH_TO_LOW" })
              }
            >
              Price: High to Low
            </a>
            <a
              className="link_btn-1"
              onClick={() =>
                dispatch({ type: "SORT", payload: "PRICE_LOW_TO_HIGH" })
              }
            >
              Price: Low to High
            </a>
          </div>
        </div>
        <div className="sort-flex">
          <div>Filter By:</div>
          <div className="margin-1">
            <a
              className="link_btn-1"
              onClick={() => dispatch({ type: "TOGGLE_CASH_ON_DELIVERY" })}
            >
              Cash On Delivery
            </a>
            <a
              className="link_btn-1"
              onClick={() => dispatch({ type: "TOGGLE_FAST_DELIVERY" })}
            >
              Fast Delivery
            </a>
          </div>
        </div>
      </div>
    );
  };
  const [filter, showfilter] = useState(0);
  return (
    <div>
      <div className="filter-flex">
        <div>
          <h3>All Products</h3>
        </div>
        <div>
          <a
            onClick={() => (filter ? showfilter(0) : showfilter(1))}
            className="link_btn"
          >
            <FcFilledFilter />
          </a>
        </div>
      </div>
      {filter === 1 && <ShowFilter />}
    </div>
  );
}
