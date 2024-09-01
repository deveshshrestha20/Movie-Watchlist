import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TbDotsCircleHorizontal } from "react-icons/tb";

const MovieDetails = ({ name, details, date }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <TbDotsCircleHorizontal
        className="absolute m-0 top-28 left-24 right-0 p-1 h-16 w-20 text-white cursor-pointer"
        onClick={handleOpen}
      />

      <Modal
        open={open}
        onClose={handleClose} 
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="fixed inset-0 flex items-center justify-center p-4"
          onClick={handleClose} 
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {name}
            </Typography>
            <Typography id="modal-modal-description" className="mt-2 ">
              {date}
            </Typography>
            <Typography id="modal-modal-description" className="mt-2">
              {details}
            </Typography>
            
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default MovieDetails;
