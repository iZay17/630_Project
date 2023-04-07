import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewForm from './ReviewForm';
import '../ListStyles.css';


const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost/630_Project/api/reviews/reviews-V2.php');
      setReviews(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleDelete = async (ReviewId) => {
    try {
      await axios.delete(`http://localhost/630_Project/api/reviews/reviews-V2.php?ReviewId=${ReviewId}`);
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div>
      <h2>Reviews</h2>
      {showForm && <ReviewForm fetchReviews={fetchReviews} />}
      <table>
        <thead>
          <tr>
            <th>Review ID</th>
            <th>User ID</th>
            <th>Service Rating</th>
            <th>Item Rating</th>
            <th>Review</th>
            <th>Services</th>
            <th>Item</th>
            <th>Date of Review</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.ReviewId}>
              <td>{review.ReviewId}</td>
              <td>{review.UserId}</td>
              <td>{review.RNService}</td>
              <td>{review.RNItem}</td>
              <td>{review.Review}</td>
              <td>{review.Services}</td>
              <td>{review.Item}</td>
              <td>{review.dateofrev}</td>
              <td>
                <button onClick={() => toggleForm(review)}>Edit</button>
                <button onClick={() => handleDelete(review.ReviewId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewList;
