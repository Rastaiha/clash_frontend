import React, { useRef } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { sendSolution } from '../../redux/actions/account';

function UploadFile(props) {
  let fileInputRef = useRef('');
  const onChangeFile = async (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      if (e.target.files[0].size <= 2097152 * 2) {
        props.sendSolution({ file: e.target.files[0] });
      } else {
        e.target.value = '';
        e.target.setCustomValidity('Maximum upload file size is 2 MB.');
        e.target.reportValidity();
      }
    }
  };
  return (
    <>
      <Button
        primary
        onClick={() => fileInputRef.click()}
        className={props.landingMode ? 'landing-answer-btn' : ''}
      >
        ارسال
        {props.sentSolution ? <span> مجدد </span> : ''} جواب
        {props.landingMode ? <Icon name="upload" /> : ''}
      </Button>
      <input
        ref={(ref) => (fileInputRef = ref)}
        type="file"
        hidden
        onChange={onChangeFile}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.account.token,
  sentSolution: !!state.account.sentSolution,
});

export default connect(mapStateToProps, { sendSolution })(UploadFile);
