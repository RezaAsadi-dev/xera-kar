// PaginationComponent.jsx
import { Pagination } from '@nextui-org/react';
import "./style.css";

const PaginationComponent = ({   totalPages, onPageChange }) => {
  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <div className='paginationPart flex justify-center items-center w-full p-8'>
        {totalPages>1 &&
        <Pagination
        size='sm'
        showControls
        total={totalPages}
        onChange={handlePageChange}
        /> 
        } 
    </div>
   
  );
};

export default PaginationComponent;
