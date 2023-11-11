import { Pagination } from "@mui/material";

export const PaginationAvatars = ({ pages, handleChange, page}) => {
  return (
    <div className="container_pagination">
      <Pagination
        sx={{
          '& .MuiPaginationItem-root': {
            border: '1px solid #76c893',
            color: '#76c893',
            '&:hover' : {
              bgcolor: '#76c89330'
            }
          },
          '& .Mui-selected': {
            bgcolor: '#76c89360',
            '&:hover': {
              bgcolor: '#f5f5f520'
            }
          }
        }}
        page={page}
        count={pages}
        onChange={handleChange}
        showFirstButton
        showLastButton
      />
    </div>
  )
}