import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

function ConfirmModel({ _id, commentId, commentOne }) {
    const [show, setShow] = useState(false);
    const [commentP, setComment] = useState(commentOne)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleEdit = async () => {
        await axios.patch("https://ats-be.onrender.com/comment", {
            id: _id,
            commentId: commentId,
            comment: commentP
        })
            .then(res => {
                // window.location.reload(false)
                console.log("status changed")
            })
            .catch(err => console.log(err.message))
    }
    console.log(_id, commentId, commentOne)
    console.log(commentP)
    return (
        <>
            <button className='btn btn-primary' onClick={handleShow}>Edit</button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit the comments on the applicant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input value={commentP} onChange={(e) => setComment(e.target.value)} className='form-control' type="text" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleClose()
                        handleEdit()
                    }
                    }>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ConfirmModel