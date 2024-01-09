import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const ResultsDialog = ({ open, onClose, onConfirm, questions, givenAnswers }) => {
  const handleClose = () => {
    onClose();
  };

  const correct = givenAnswers.filter((a, i) => a.toUpperCase()==questions[i].a.toUpperCase()).length;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Rezultati kviza</DialogTitle>
      <DialogContent>
        <div>
            {correct} / {questions.length}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Zatvori
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          Ponovi kviz
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResultsDialog;
