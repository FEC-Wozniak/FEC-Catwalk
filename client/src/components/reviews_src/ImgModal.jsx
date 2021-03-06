import React from 'react';
import $ from 'jquery';

class ImgModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(e) {
    e.preventDefault();
    if (!this.state.open) {
      $('html, body').css({
        overflow: 'hidden',
      });
    }
    else {
      $('html, body').css({
        overflow: 'auto',
      });
    }
    this.setState({ open: !this.state.open });
  }

  render() {
    let { url } = this.props;
    const modalStyle = {
      position: 'fixed',
      zIndex: 1,
      left: '50%',
      transform: 'translate(-50%, -50%)',
      top: '50%',
      backgroundColor: 'transparent',
      maxHeight: 'calc(100vh - 50px)',
    };
    const modalContentStyle = {
      color: 'black',
      borderRadius: '5px',
      backgroundColor: 'white',
      width: '100%',
      height: '100%',
      maxHeight: 'calc(100vh - 50px)',
      maxWidth: 'calc(100vw - 50px)',
      overflow: '-moz-scrollbars-vertical',
      overflowY: 'scroll',
    };

    const modalButtonStyle = {
      right: 25,
      top: 7,
      color: 'white',
      zIndex: 2,
      position: 'absolute',
      textShadow: '0 0 1px #000',
    };

    const imgStyle = {
      background: 'white',
    };

    const overlayStyle = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(128,128,128,0.5)',
    };

    const thumbStyle = {
      borderRadius: '5px',
      padding: '5px',
      paddingLeft: '0',
      height: '80px',
      maxWidth: '160px',
    };
    /* ---------------------------------------------------------------------------------*/
    if (this.state.open && url) {
      return (
        <div name="overlay" style={{ ...overlayStyle }}>
          <div style={{ ...modalStyle }}>
            <div style={{ ...modalContentStyle }}>
              <i className="fas fa-times fa-lg modal-close" style={{ ...modalButtonStyle }} onClick={this.toggleModal} />
              <img src={url} alt="" style={{ ...imgStyle }} />
            </div>
          </div>
        </div>
      );
    }
    if (url) {
      return (
        <img src={url} className="thumbnail" style={{ ...thumbStyle }} alt="" onClick={this.toggleModal}/>
      );
    }
    return null;
  }
}

export default ImgModal;
