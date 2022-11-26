import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./pagination.module.sass";

const Pafination = ({ onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel="..."
      nextLabel=">>"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={10}
      pageCount={10}
      previousLabel="<<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pafination;
