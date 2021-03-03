import React from 'react';
import ReviewList from './reviews_src/ReviewList';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewsData: this.props.data,
      reviewsMeta: this.props.meta,
    };
  };

  render() {
    //console.log(this.state.reviewData.results);
    return (
      <div>
        <h3>Reviews</h3>
        {/* results is an array of reviews */}
        <ReviewList reviews={this.state.reviewsData.results} />
      </div>
    );
  }
}

export default Reviews;
