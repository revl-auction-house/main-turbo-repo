import * as React from 'react';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

interface HTMLContentProps {
    renderHTMLContent: () => JSX.Element;
    open: Boolean;
    handleClose: Function;

};

const ModalComponent = ({ renderHTMLContent, open, handleClose }: HTMLContentProps) => {
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div style={style}>
                    {renderHTMLContent()}
                </div>
            </Modal>
        </div>
    );
};

export default ModalComponent;