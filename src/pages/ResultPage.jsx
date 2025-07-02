import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import Pagination from "../components/Pagination";
import ViewToggle from "../components/ViewToggle";
import "./ResultPage.css";
import useFetch from "../hooks/useFetch";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import FilterSidebar from "../components/FilterSidebar";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Footer from "../components/Footer";
const VIEW_MODES = { GRID: "grid", LINE: "line" };

const ResultPage = () => {
  const [response, setResponse] = useState({ success: false });
  const [viewMode, setViewMode] = useState(VIEW_MODES.GRID);
  const [url, setUrl] = useState("/items");
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const location = useLocation();

  const { error, isLoading, performFetch, cancelFetch } = useFetch(
    url,
    (response) => {
      setResponse(response);
    },
  );

  // Toggles between grid and line layout for items
  const toggleViewMode = () => {
    setViewMode((prev) =>
      prev === VIEW_MODES.GRID ? VIEW_MODES.LINE : VIEW_MODES.GRID,
    );
  };

  // Set filter when user navigates to the result page using the sidebar/searchbar
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryFromUrl = searchParams.get("category");
    const searchFromUrl = searchParams.get("search");

    if (categoryFromUrl) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        category: categoryFromUrl,
      }));
    }
    if (searchFromUrl) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        search: searchFromUrl,
      }));
    }
  }, [location.search]);

  // Construct fetch url from the filters
  useEffect(() => {
    const params = new URLSearchParams();

    // Set required string queries for use with useFetch
    params.set("page", filters.page);
    params.set("limit", filters.limit);
    params.set("sortBy", filters.sortBy);
    params.set("sortOrder", filters.sortOrder);

    // Set optional string queries
    filters.search && params.set("search", filters.search);
    filters.category && params.set("category", filters.category);
    filters.condition && params.set("condition", filters.condition);
    filters.availability && params.set("availability", filters.availability);
    filters.minPrice && params.set("minPrice", filters.minPrice);
    filters.maxPrice && params.set("maxPrice", filters.maxPrice);
    filters.minDuration && params.set("minDuration", filters.minDuration);
    filters.maxDuration && params.set("maxDuration", filters.maxDuration);

    setUrl(`/items?${params.toString()}`);
  }, [filters]);

  // Fetch items when url changes
  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, [url]);

  return (
    <div className="result-container">
      <Header />
      {/* Wrap sidebar and main content in one flex container */}
      <div className="content-with-sidebar">
        <FilterSidebar filters={filters} setFilters={setFilters} />

        <div className="main-content">
          <ViewToggle
            viewMode={viewMode}
            toggleViewMode={toggleViewMode}
            setFilters={setFilters}
          />
          {isLoading && <Loader />}
          {error && <Error errorMessage={error} />}
          {!isLoading && !error && response.success && (
            <>
              <div
                className={
                  viewMode === VIEW_MODES.GRID ? "items-grid" : "items-list"
                }
              >
                {response.result.map((item) => (
                  <ItemCard
                    key={item._id}
                    item={item}
                    performFetch={performFetch}
                  />
                ))}
              </div>
              <Pagination
                currentPage={filters.page}
                totalPages={response.pagination[0].totalPages}
                setCurrentPage={setFilters}
                pages={Array.from(
                  { length: response.pagination[0].totalPages },
                  (_, i) => i + 1,
                )}
              />
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResultPage;
