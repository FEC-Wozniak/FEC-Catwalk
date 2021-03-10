import React from 'react';
import QuestionList from './AK/QuestionList.jsx';
import RelatedProductsAndOutfits from './AT/RelatedProductsAndOutfits';
import Reviews from './components/Reviews.jsx';
import Container from './AK/Container';
// import Overview from './Overview/Overview';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPageItemId: 17450
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  componentDidUpdate() {
    console.log('hello from App');
  }

  handleItemClick(id) {
    this.setState({
      currentPageItemId: id
    });
  }

  render() {
    return (
      <div>
        <br />
        <br />
        {/* <Overview/> */}
        <RelatedProductsAndOutfits
        currentPageItemId={this.state.currentPageItemId}
        handleItemClick={this.handleItemClick}
        />
        <Container />
        <Reviews />
      </div>
    );
  }
}

export default App;
