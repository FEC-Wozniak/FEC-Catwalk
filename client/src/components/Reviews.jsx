import React from 'react';
import ReviewList from './reviews_src/ReviewList';
import ReviewSummary from './reviews_src/ReviewSummary';
import handler from '../global_functions/handler';
import example_review_data from '../../../example_review_data';
import example_review_meta from '../../../example_review_meta';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFilters: [],
      reviewsData: example_review_data,
      reviewsMeta: example_review_meta,
    };
    this.addFilter = this.addFilter.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.updateReviews = this.updateReviews.bind(this);
  }

  componentDidMount() {
    const { productId } = this.props;
    if (productId) {
      const { reviews } = handler;
      reviews.getMeta(productId,
        (response) => {
          this.setState({ reviewsMeta: response.data });
          let { recommended, product_id } = response.data;
          this.updateReviews('relevant', recommended, product_id);
        });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.productId !== prevProps.productId) {
      const { reviews } = handler;
      const { productId } = this.props;
      reviews.getMeta(productId,
        (response) => {
          this.setState({ reviewsMeta: response.data });
          let { recommended, product_id } = response.data;
          this.updateReviews('relevant', recommended, product_id);
        });
    }
  }

  updateReviews(sort = 'relevant', recCounts = null, id = null) {
    this.clearFilters();
    const { reviewsMeta } = this.state;
    let recommend = recCounts;
    let productId = id;
    if (!recCounts || !id) {
      const { recommended, product_id } = reviewsMeta;
      recommend = recommended;
      productId = product_id;
    }
    let count = 0;
    Object.values(recommend).forEach((value) => count += +value);
    const methods = {
      productId,
      sort,
      count,
    };
    handler.reviews.get(methods, (response) => {
      this.setState({ reviewsData: response.data });
    });
  }

  addFilter(e) {
    e.preventDefault();
    const { currentFilters } = this.state;
    const filterVal = e.target.getAttribute('value');
    if (currentFilters.indexOf(filterVal) === -1) {
      this.setState(
        { currentFilters: [...currentFilters, filterVal] },
      );
    }
  }

  clearFilters(e) {
    if (e) { e.preventDefault(); }
    const { currentFilters } = this.state;
    if (currentFilters) {
      this.setState(
        { currentFilters: [] },
        () => {if (e) {window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); } },
      );
    }
  }

  render() {
    const { reviewsData, reviewsMeta, currentFilters } = this.state;
    const { name } = this.props;
    const characteristics = Object.keys(reviewsMeta.characteristics);
    const flexContainerStyle = {
      paddingTop: '0px',
      paddingBottom: '0px',
      display: 'flex',
      flexWrap: 'nowrap',
      flex: 'row',
      padding: '10px',
      width: '90%',
      marginLeft: '5%',
    };
    return (
      <div style={{ ...flexContainerStyle }} className="reviews">
        <ReviewSummary
          reviewsMeta={reviewsMeta}
          currentFilters={currentFilters}
          clearFilters={this.clearFilters}
          addFilter={this.addFilter}
        />
        <ReviewList
          reviews={reviewsData.results}
          filters={currentFilters}
          characteristics={characteristics}
          meta={reviewsMeta}
          updateReviews={this.updateReviews}
          name={name}
        />
      </div>
    );
  }
}

export default Reviews;
