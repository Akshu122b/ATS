import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function DeleteModel({deleteApplicant,name,email}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSaveChanges=()=>{
        deleteApplicant()
        // window.location.reload(false)
        handleClose()
    }
    return (
        <>
            <Button variant="danger" onClick={handleShow}>
                Delete Applicant
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Do you want to delete applicant</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete Applicant : <span className='text-danger'>{name}</span> & Applicant email id is : <span className='text-danger'>{email}</span> </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleSaveChanges}>
                        Delete Applicant
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}