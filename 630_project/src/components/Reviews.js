import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../CPS630_Project.css';

function Reviews() {
    const [review, setReview] = useState('');
    const [ratingItem, setRatingItem] = useState('');
    const [ratingService, setRatingService] = useState('');
    const [item, setItem] = useState('Cell Phone');
    const [service, setService] = useState('Delivery');
    const handleSubmit = () => {
        if(review.length === 0){
            alert("No review written!");
        }
        else if(ratingItem === ' ' || ratingService === ' '){
            alert("No rating given");
        }
        else {
            const url = "http://localhost/630_Project/api/reviews/Review.php";

            const current = new Date();
            const reviewDate = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;

            let formData = new FormData();
            formData.append('review', review);
            formData.append('ratingItem', ratingItem);
            formData.append('ratingService', ratingService);
            formData.append('item', item);
            formData.append('service', service);
            formData.append('reviewDate', reviewDate);
            formData.append('useremail', localStorage.getItem("email"));

            axios.post(url, formData)
            .then(response => alert(response.data))
            .catch(error=> alert(error));
        }
    }

    const [reviews, setReviews] = useState('');
    useEffect(() => {
        getReviews();
    }, );

    function getReviews() {
        axios.get('http://localhost/630_Project/api/reviews/Review.php').then(function(response) {
            setReviews(response.data);
            console.log(response.data);
        })
    }

    return(
        <div>
            <form>
                <h1>Add a Review</h1>
                <label htmlFor="item">Item:</label>
                <select id="item" name="item" value={item} onChange={(e) => setItem(e.target.value)}>
                    <option value="Cell Phone">Cell Phone</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Desktop">Desktop</option>
                    <option value="Tablet">Tablet</option>
                </select>
                <label htmlFor="service">Service:</label>
                <select id="service" name="service" value={service} onChange={(e) => setService(e.target.value)}>
                    <option value="Delivery">Delivery</option>
                    <option value="Express Delivery">Express Delivery</option>
                </select>
                <label htmlFor="ratingItem">Item Rating:</label>
                <input type="number" id="ratingItem" name="ratingItem" min="1" max="5" value={ratingItem} onChange={(e) => setRatingItem(e.target.value)}></input>
                <label htmlFor="ratingService">Service Rating:</label>
                <input type="number" id="ratingService" name="ratingService" min="1" max="5" value={ratingService} onChange={(e) => setRatingService(e.target.value)}></input>
                <label htmlFor="review">Review:</label>
                <textarea rows="10" cols="40" id="review" name="review" value={review} onChange={(e) => setReview(e.target.value)}/>
                <input type="submit" id="submit" name="submit" onClick={() => { handleSubmit() }}/>
            </form>
            <div id="useRevs">
                {reviews && reviews.map((review, index) => (
                    <div id="userRev" key={index} >
                        <div class="flex-container">
                            <p class="flex-item item-1">User: {review.UserId}</p><p class="flex-item item-2">Item: {review.Item}</p><p class="flex-item item-3">Services: {review.Services}</p>
                        </div>
                        <div class="flex-container">
                            <p class="flex-item item-1">Item Rating: {review.RNItem}</p><p class="flex-item item-4">Service Rating: {review.RNService}</p>
                        </div>
                        <p id="review">Review: {review.Review}</p>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default Reviews;