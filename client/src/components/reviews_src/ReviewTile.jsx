import React from 'react';
import StarStatic from './StarStatic';
import dateFormatter from '../../global_functions/dateFormatter';
import Recommend from './Recommend';
import Body from './Body';
import Summary from './Summary';
import Helpfulness from './Helpfulness';
import Response from './Response';
import ImgModal from './ImgModal';

const ReviewTile = ({ review, length, index }) => {
  const tileStyle = {
    marginBottom: '4px',
    marginTop: '4px',
    // border: '2px solid grey',
    borderBottom: '3px solid grey',
    borderRadius: '1px',
    // boxShadow: '3px 3px Grey',
    padding: '10px',
    paddingRight: '5px',
    paddingLeft: 0,
    width: '75vw',
  };
  if (index === length - 1) { tileStyle.borderBottom = 'none'; }
  return (
    <div style={{ ...tileStyle }}>
      <StarStatic number={review.rating} />
      <div style={{ float: 'right' }}>{review.reviewer_name}, {dateFormatter(review.date)}</div><br/><br/>
      <Summary summary={review.summary} /><br/>
      <Recommend bool={review.recommend} /><br/>
      <Body body={review.body} />
      <span>
        { review.photos.map((img) => <ImgModal url={img.url} />) }
      </span>
      <ImgModal />
      <Response response={review.response} /><br />
      <Helpfulness helpfulness={review.helpfulness} />
    </div>
  );
};

export default ReviewTile;
