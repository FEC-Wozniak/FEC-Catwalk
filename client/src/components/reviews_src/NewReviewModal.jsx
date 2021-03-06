import React from 'react';
import StarHover from '../new_review_components/StarHover';
import CharacteristicsSelector from '../new_review_components/CharacteristicsSelector';
import formValidator from '../../global_functions/formValidator';
import reviewBodyConstructor from '../new_review_components/reviewBodyConstructor';
import handler from '../../global_functions/handler';
import Errors from '../new_review_components/Errors';
import UrlWindow from '../new_review_components/UrlWindow';
import ImageSpan from '../new_review_components/ImageSpan';

// MODAL CLOSE ICON NEEDS TO LOCK ON SCROLL <<<<<-------- BUG
class NewReviewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlWindow: false,
      open: false,
      recommend: null,
      nickname: '',
      email: '',
      characteristics: { current: null },
      summary: '',
      body: '',
      images: [],
      count: '50 characters remaining',
      errors: {},
      image1: '',
      image2: '',
      image3: '',
      image4: '',
      image5: '',
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.characterChecker = this.characterChecker.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.characterChecker = this.characterChecker.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hoist = this.hoist.bind(this);
    this.toggleUrlWindow = this.toggleUrlWindow.bind(this);
    this.addImageState = this.addImageState.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { meta } = this.props;
    const { reviews } = handler;
    let errors = formValidator(this.state);
    if (!Object.values(errors).length) {
      reviews.post(
        reviewBodyConstructor(this.state, meta),
        () => {
          // modal closes only after server response --> possibly change this
          this.setState({
            open: false,
            recommend: null,
            nickname: '',
            email: '',
            characteristics: { current: null },
            summary: '',
            body: '',
            images: [],
            count: '50 characters remaining',
            image1: '',
            image2: '',
            image3: '',
            image4: '',
            image5: '',
            imageErrors: [],
          });
        },
      );
    }
    this.setState({ errors });
  }

  handleChange(e, cb = () => {}) {
    const val = e.target.value;
    const name = e.target.getAttribute('name');
    this.setState({ [name]: val }, cb(e));
  }

  getColor(name) {
    if (this.state.errors[name]) {
      return 'red';
    }
  }

  characterChecker(e) {
    let remaining = 50 - e.target.value.length;
    if (remaining > 0) { this.setState({ count: `${remaining} characters remaining` }); return; }
    this.setState({ count: 'minimum reached' });
  }

  toggleModal(e) {
    if (e) { e.preventDefault(); }
    this.setState({
      open: !this.state.open,
      errors: [],
      urlWindow: false,
    });
  }

  hoist(name, value) {
    if (this.state[name] !== value) {
      this.setState({ [name]: value });
    }
  }

  toggleUrlWindow(bool) {
    this.setState({
      urlWindow: bool,
    });
  }

  addImageState(arr) {
    this.setState({ images: arr });
  }

  render() {
    const { characteristics } = this.props;
    const textInputStyle = {
      padding: '10px 5px',
      margin: '0px 0',
      border: '1px solid silver',
      borderRadius: '5px',
      boxSizing: 'border-box',
      fontSize: '14px',
      fontFamily: 'Arial',
    };
    const buttonStyle = {
      marginTop: '10px',
      backgroundColor: '#e11a2b',
      border: 'none',
      outline: '0',
      color: 'white',
      padding: '15px 32px',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '16px',
    };

    const modalStyle = {
      position: 'fixed',
      zIndex: 1,
      left: '50%',
      transform: 'translate(-50%, -50%)',
      top: '50%',
      backgroundColor: 'transparent',
    };
    const modalContentStyle = {
      borderRadius: '5px',
      backgroundColor: 'white',
      width: '100%',
      height: '100%',
      maxHeight: 'calc(100vh - 50px)',
      maxWidth: 'calc(100vw - 50px)',
      color: 'black', // <-- dark mode?
    };

    const modalButtonStyle = {
      right: -70,
      top: 10,
      color: 'white',
      zIndex: 2,
      position: 'absolute',
      textShadow: '0 0 1px #000',
      float: 'right',
    };

    const overlayStyle = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(128,128,128,0.5)',
      backdropFilter: 'blur(5px)',
    };

    const formStyle = {
      padding: '5%',
      paddingTop: '5px',
      width: '800px',
      height: 'auto',
      backgroundColor: 'white',
      borderRadius: '5px',
    };
    /* ---------------------------------------------------------------------------------*/
    if (this.state.open) {
      return (
        <div name="overlay" style={{ ...overlayStyle }}>
          <div style={{ ...modalStyle }}>
          <i className="fas fa-times fa-lg modal-close" style={{ ...modalButtonStyle }} onClick={this.toggleModal} />
            <div style={{ ...modalContentStyle }}>
              <div style={{ ...formStyle }} className="new-review">
                { /* ------------------------------->>FORM HERE<<------------------------------*/ }
                <div style={{ justifyContent: 'center', textAlign: 'center' }}>
                  <h2>New Review</h2>
                  <h3>Tell us what you think about {this.props.name}</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                  <StarHover hoist={this.hoist} error={this.state.errors.rating} />
                  <div style={{ justifyContent: 'flex-end' }}>
                    <h4>Do you recommend this product?</h4>
                    <div onChange={this.handleChange} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                      <span style={{ marginRight: '50px' }}><input type="radio" name="recommend" value="true" /><span>Yes</span></span>
                      <span style={{ float: 'right' }}> <input type="radio" name="recommend" value="false" /><span>No</span></span>
                    </div>
                  </div>
                </div>
                { /* <h4 style={{marginBottom: '0px '}}>Characteristics:</h4> */ }
                <CharacteristicsSelector characteristics={characteristics} hoist={this.hoist} />
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                  <div style={{ justifyContent: 'flex-start' }}>
                    <h4>Nickname:</h4>
                    <input type="text" name="nickname" placeholder="Example: Jackson111" value={this.state.nickname} onChange={this.handleChange} style={{ width: '350px', borderColor: this.getColor('nickname') }}/><br />
                    <small>for privacy reasons do not use your full name or email</small>
                  </div>
                  <div style={{ justifyContent: 'flex-end', float: 'right' }}>
                    <h4>Email:</h4>
                    <input type="text" name="email" placeholder="Example: Jackson111@email.com" style={{ width: '350px', borderColor: this.getColor('email') }} value={this.state.email} onChange={this.handleChange} /><br />
                    <small>for privacy reasons do not use your full name or email</small>
                  </div>
                </div>
                <div>
                  <h4>Review Summary</h4>
                  <input type="text" name="summary" placeholder="Example: Best Purchase Ever!" style={{ width: '99.5%', borderColor: this.getColor('summary') }} value={this.state.summary} onChange={this.handleChange} />
                </div>
                <div>
                  <h4>Review Body</h4>
                  <textarea rows="6" name="body"  placeholder="Why did you like this product or not" value={this.state.body} onChange={(e) =>{this.handleChange(e, this.characterChecker)}} style={{ width: '99.5%', resize: 'none', display: 'block', borderColor: this.getColor('body') }} />
                  <small style = {{ color: this.getColor('body') }}>{this.state.count}</small>
                </div>
                <div style={{ display: 'inline-block' }}><button onClick={()=>{ this.toggleUrlWindow(true) }}>Add Images</button>< ImageSpan images={this.state.images}/></div>

                <span>
                  <button onClick={this.handleSubmit} style={{ float: 'right' }}type="submit">Submit</button>
                  <Errors errors={Object.values(this.state.errors)} />
                </span>
                {this.state.urlWindow && (
                  <UrlWindow>
                    <h1 style={{fontFamily: 'Avenir Black' }}>Link your pictures here</h1>
                    <input type="text" style={{ ...textInputStyle }} name="image1" placeholder="Image URL here" value={this.state.image1} onChange={this.handleChange} style={{ width: '350px', borderColor: this.getColor('image1') }} /><br /><br />
                    <input type="text" style={{ ...textInputStyle }} name="image2" placeholder="Image URL here" value={this.state.image2} onChange={this.handleChange} style={{ width: '350px', borderColor: this.getColor('image2') }} /><br /><br />
                    <input type="text" style={{ ...textInputStyle }} name="image3" placeholder="Image URL here" value={this.state.image3} onChange={this.handleChange} style={{ width: '350px', borderColor: this.getColor('image3') }} /><br /><br />
                    <input type="text" style={{ ...textInputStyle }} name="image4" placeholder="Image URL here" value={this.state.image4} onChange={this.handleChange} style={{ width: '350px', borderColor: this.getColor('image4') }} /><br /><br />
                    <input type="text" style={{ ...textInputStyle }} name="image5" placeholder="Image URL here" value={this.state.image5} onChange={this.handleChange} style={{ width: '350px', borderColor: this.getColor('image5') }} /><br /><br />
                    <button
                      style={{ ...buttonStyle }}
                      type="submit"
                      onClick={() => {
                        let check = formValidator(this.state, 'image', this.addImageState);
                        if (!check) {
                          this.toggleUrlWindow(false);
                          return;
                        }
                        this.setState({
                          errors: check,
                        });
                      }}
                    > Submit
                    </button>
                  </UrlWindow>
                )}
                { /* ---------------------------------------------------------------------------*/ }
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <button style={{float: 'right'}} onClick={this.toggleModal}>Add A Review +</button>;
  }
}

export default NewReviewModal;
