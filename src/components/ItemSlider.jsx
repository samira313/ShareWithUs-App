import { useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import "./ItemSlider.css";
import ItemCard from "./ItemCard";
import Loader from "./Loader";
import Error from "./Error";
import logo from "../assets/logo-transparent-latest.png";

export default function ItemSlider() {
  const [items, setItems] = useState([]);
  const sliderRef = useRef(null);

  const params = {
    sortBy: "createdAt",
    sortOrder: "desc",
    limit: 10,
    availability: "true",
  };
  const url = `/items?${new URLSearchParams(params).toString()}`;

  // Custom hook to handle fetching items from the server
  const { performFetch, cancelFetch, isLoading, error } = useFetch(
    url,
    (response) => {
      // Store the fetched items in state
      setItems(response?.result);
    },
  );

  // Fetch items when the component mounts
  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, []);

  // Horizontal scrolling function
  const scroll = (direction) => {
    const container = sliderRef.current;
    const scrollAmount = 300;
    direction === "left"
      ? (container.scrollLeft -= scrollAmount)
      : (container.scrollLeft += scrollAmount);
  };

  return (
    <>
      <img src={logo} alt="Logo" className="slider-logo" />

      <div className="slider-wrapper">
        {/* Left arrow button to scroll left */}

        <button className="arrow-left" onClick={() => scroll("left")}>
          &#8249;
        </button>
        {/* Slider container with items */}
        <div className="slider-container" ref={sliderRef}>
          {isLoading && <Loader />}
          {error && <Error errorMessage={error} />}
          {!isLoading &&
            !error &&
            items &&
            items.map((item) => <ItemCard key={item._id} item={item} />)}
        </div>

        {/* Right arrow button to scroll right */}
        <button className="arrow-right" onClick={() => scroll("right")}>
          &#8250;
        </button>
      </div>
    </>
  );
}
