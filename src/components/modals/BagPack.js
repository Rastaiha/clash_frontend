import React from 'react';
import { Modal, Grid, Header } from 'semantic-ui-react';

function BagPack({ trigger }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={trigger}
      style={{ direction: 'rtl', textAlign: 'center' }}
      size="mini"
    >
      <Modal.Header as="h2">علی علوی</Modal.Header>
      <Modal.Content>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>تمدن: علی‌آباد</Grid.Column>
            <Grid.Column>مرحله: ۵</Grid.Column>
          </Grid.Row>
        </Grid>
        <Header as="h3">کارت‌ها</Header>
      </Modal.Content>
    </Modal>
  );
}

export default BagPack;
