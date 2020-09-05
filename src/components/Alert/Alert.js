import React, { useState } from 'react';
import { Modal, Button } from 'semantic-ui-react';

export default function Alert(props) {
  const [open, setOpen] = useState(true);

  const closeModal = () => {
    setOpen(false);
    if (!!props.onClose) {
      props.onClose();
    }
  };

  return (
    <Modal
      onClose={closeModal}
      onOpen={() => setOpen(true)}
      open={open}
      size="mini"
      style={{ direction: 'rtl', textAlign: 'right' }}
    >
      {props.title ? <Modal.Header>{props.title}</Modal.Header> : ''}
      {props.message ? (
        <Modal.Content>
          <Modal.Description>
            <p>{props.message}</p>
          </Modal.Description>
        </Modal.Content>
      ) : (
        ''
      )}

      <Modal.Actions
        style={{
          textAlign: 'left',
        }}
      >
        <Button onClick={closeModal} positive>
          {props.action ? props.action : 'حله'}
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
