import { useEffect, useState } from "react";
import "./App.css";
import { FiExternalLink } from "react-icons/fi";

type Dataset = {
  title: string;
  description: string;
  accessServiceCategory: string;
  accessRights: string;
};

const ITEMS_PER_PAGE = 10;

function App() {
  const [data, setData] = useState<Dataset[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedDesc, setSelectedDesc] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/datasets")
      .then((res) => res.json())
      .then((result: Dataset[]) => {
        setData(result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );


  const truncate = (text: string, length: number) =>
    text.length > length ? text.substring(0, length) + "..." : text;

  return (
    <div className="container">
      <h1>HDR UK Dataset Explorer</h1><br></br>

      <input
        className="search"
        placeholder="Search datasets..."
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      {loading ? (
        <div className="loader"></div>
      ) : filteredData.length === 0 ? (
        <p className="no-results">No results found</p>
      ) : (
        <>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Category</th>
                <th>Access</th>
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>

                  
                  <td className="desc">
                    {truncate(item.description, 200)}
                    {item.description.length > 200 && (
                      <span
                        className="read-more"
                        onClick={() => setSelectedDesc(item.description)}
                      >
                        Read more
                      </span>
                    )}
                  </td>

                  <td>{item.accessServiceCategory}</td>

                  <td>
                    <a href={item.accessRights} target="_blank" rel="noreferrer" className="view-button">
                        View <FiExternalLink style={{ marginLeft: "5px", verticalAlign: "middle" }} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          

          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Prev
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}

     


      {selectedDesc && (
        <div className="modal-overlay" onClick={() => setSelectedDesc(null)}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <p>{selectedDesc}</p>
            <button onClick={() => setSelectedDesc(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;