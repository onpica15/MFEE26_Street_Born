import React from 'react';

export default function Pagination(props) {
  const { page, totalPages, setFilter, filter } = props;

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" href="#/" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        {Array(11)
          .fill(1)
          .map((v, i) => {
            const isActive = page === page + i - 5 ? 'active' : '';
            return page + i - 5 >= 1 && page + i - 5 <= totalPages ? (
              <li
                className={`page-item ${isActive}`}
                key={'pagi' + (+page + i - 5)}
              >
                <a
                  className="page-link"
                  onClick={() => {
                    setFilter({ ...filter, page: page + i - 5 });
                  }}
                  href="#/"
                >
                  {page + i - 5}
                </a>
              </li>
            ) : null;
          })}

        <li className="page-item">
          <a className="page-link" href="#/" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
