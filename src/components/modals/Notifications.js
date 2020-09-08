import React from 'react';
import { Modal, List } from 'semantic-ui-react';

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
      <Modal.Header as="h2">پیام‌ها</Modal.Header>
      <Modal.Content>
        <List divided relaxed>
          <List.Item>
            <List.Icon name="github" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>مورد حمله قرار گرفتید!</List.Header>
              <List.Description as="small">۳۴ دقیقه پیش</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="github" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>مورد حمله قرار گرفتید!</List.Header>
              <List.Description as="small">۳۴ دقیقه پیش</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="github" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>مورد حمله قرار گرفتید!</List.Header>
              <List.Description as="small">۳۴ دقیقه پیش</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="github" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>مورد حمله قرار گرفتید!</List.Header>
              <List.Description as="small">۳۴ دقیقه پیش</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="github" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>مورد حمله قرار گرفتید!</List.Header>
              <List.Description as="small">۳۴ دقیقه پیش</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="github" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>مورد حمله قرار گرفتید!</List.Header>
              <List.Description as="small">۳۴ دقیقه پیش</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="github" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>مورد حمله قرار گرفتید!</List.Header>
              <List.Description as="small">۳۴ دقیقه پیش</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="github" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>مورد حمله قرار گرفتید!</List.Header>
              <List.Description as="small">۳۴ دقیقه پیش</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="github" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>مورد حمله قرار گرفتید!</List.Header>
              <List.Description as="small">۳۴ دقیقه پیش</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="github" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>مورد حمله قرار گرفتید!</List.Header>
              <List.Description as="small">۳۴ دقیقه پیش</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="github" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>مورد حمله قرار گرفتید!</List.Header>
              <List.Description as="small">۳۴ دقیقه پیش</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="github" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>مورد حمله قرار گرفتید!</List.Header>
              <List.Description as="small">۳۴ دقیقه پیش</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="github" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>مورد حمله قرار گرفتید!</List.Header>
              <List.Description as="small">۳۴ دقیقه پیش</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="github" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>مورد حمله قرار گرفتید!</List.Header>
              <List.Description as="small">۳۴ دقیقه پیش</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="github" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>مورد حمله قرار گرفتید!</List.Header>
              <List.Description as="small">۳۴ دقیقه پیش</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="github" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>مورد حمله قرار گرفتید!</List.Header>
              <List.Description as="small">۳۴ دقیقه پیش</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="github" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>مورد حمله قرار گرفتید!</List.Header>
              <List.Description as="small">۳۴ دقیقه پیش</List.Description>
            </List.Content>
          </List.Item>
        </List>
      </Modal.Content>
    </Modal>
  );
}

export default BagPack;
