import React, { useState } from 'react';
import axios from 'axios';
import '../FormStyles.css';

const ReviewForm = ({ fetchReviews }) => {
  const [review, setReview] = useState({
    ReviewId: '',
    UserId: '',
    RNService: '',
    RNItem: '',
    Review: '',
    Services: '',
    Item: '',
    dateofrev: '',
  });

  const handleChange = (event) => {
    setReview({ ...review, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost/630_Project/api/reviews/reviews-V2.php', review);
      fetchReviews();
      setReview({
        ReviewId: '',
        UserId: '',
        RNService: '',
        RNItem: '',
        Review: '',
        Services: '',
        Item: '',
        dateofrev: '',
      });
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Review ID:
        <input type="text"
          name="ReviewId"
          value={review.ReviewId}
          onChange={handleChange}
        />
      </label>
      <label>
        User ID:
        <input
          type="text"
          name="UserId"
          value={review.UserId}
          onChange={handleChange}
        />
      </label>
      <label>
        Service Rating:
        <input
          type="number"
          name="RNService"
          value={review.RNService}
          onChange={handleChange}
        />
      </label>
      <label>
        Item Rating:
        <input
          type="number"
          name="RNItem"
          value={review.RNItem}
          onChange={handleChange}
        />
      </label>
      <label>
        Review:
        <input
          type="text"
          name="Review"
          value={review.Review}
          onChange={handleChange}
        />
      </label>
      <label>
        Services:
        <input
          type="text"
          name="Services"
          value={review.Services}
          onChange={handleChange}
        />
      </label>
      <label>
        Item:
        <input
          type="text"
          name="Item"
          value={review.Item}
          onChange={handleChange}
        />
      </label>
      <label>
        Date of Review:
        <input
          type="date"
          name="dateofrev"
          value={review.dateofrev}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add Review</button>
    </form>
  );
};

export default ReviewForm;
