import React from 'react';
import { Link } from 'react-router-dom';

export default function Pagination(props) {
  const { page, totalPages } = props;

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Previous">
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
                <Link className="page-link" to={`?page=${page + i - 5}`}>
                  {page + i - 5}
                </Link>
              </li>
            ) : null;
          })}

        <li className="page-item">
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
