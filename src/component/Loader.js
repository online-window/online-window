import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import ContextMain from "../context/ContextMain"
import { TailSpin } from  'react-loader-spinner'

function SimpleDialog(props) {

  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog  onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
     <TailSpin color="#00BFFF"  height={80} width={80}  />
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function Loader() {

    const context=useContext(ContextMain)
  const handleClose = () => {
    context.setLoding(true)
  };

  return (
    <div>
      <SimpleDialog  open={context.loading} onClose={handleClose} />
    </div>
  );
}
