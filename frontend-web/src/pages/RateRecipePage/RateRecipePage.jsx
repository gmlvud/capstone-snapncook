import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import styles from './RateRecipePage.module.css';

const FoodReviewPage = () => {
  // 업로드한 음식 사진 목록
  const [myFoodPhotos, setMyFoodPhotos] = useState([]);
  // 선택한 음식 사진
  const [selectedFoodPhoto, setSelectedFoodPhoto] = useState('');
  // 리뷰 정보
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewPhoto, setReviewPhoto] = useState('');
  // 리뷰 목록
  const [foodReviews, setFoodReviews] = useState([]);

  // 초기 데이터 로드
  useEffect(() => {
    // 내가 업로드한 음식 사진 불러오기
    const foodPhotos = JSON.parse(localStorage.getItem('imageHistory') || '[]');
    setMyFoodPhotos(foodPhotos);
    
    // 저장된 리뷰 불러오기
    const savedReviews = JSON.parse(localStorage.getItem('foodPhotoReviews') || '[]');
    setFoodReviews(savedReviews);
  }, []);

  // 리뷰용 사진 업로드 처리
  const handleReviewPhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setReviewPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // 리뷰 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedFoodPhoto) {
      alert('리뷰할 음식 사진을 선택해주세요!');
      return;
    }
    
    if (rating === 0) {
      alert('별점을 선택해주세요!');
      return;
    }
    
    if (!reviewPhoto) {
      alert('리뷰용 사진을 첨부해주세요!');
      return;
    }
    
    // 새 리뷰 객체 생성
    const newReview = {
      id: Date.now(),
      foodPhoto: selectedFoodPhoto,  // 원본 음식 사진
      reviewPhoto: reviewPhoto,      // 리뷰용 사진
      rating: rating,                // 별점
      text: reviewText,              // 리뷰 텍스트
      date: new Date().toISOString() // 리뷰 날짜
    };
    
    // 리뷰 목록 업데이트
    const updatedReviews = [newReview, ...foodReviews];
    setFoodReviews(updatedReviews);
    localStorage.setItem('foodPhotoReviews', JSON.stringify(updatedReviews));
    
    // 폼 초기화
    setRating(0);
    setReviewText('');
    setReviewPhoto('');
    alert('리뷰가 등록되었습니다!');
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1>요리 사진으로 리뷰하기 ⭐</h1>
        
        {/* 내 음식 사진 갤러리 */}
        <div className={styles.photoGallery}>
          <h2>내 음식 사진</h2>
          <div className={styles.photoGrid}>
            {myFoodPhotos.length === 0 ? (
              <p className={styles.noPhotos}>업로드한 음식 사진이 없습니다.</p>
            ) : (
              myFoodPhotos.map((photo, index) => (
                <div 
                  key={index} 
                  className={`${styles.photoCard} ${selectedFoodPhoto === photo ? styles.selected : ''}`}
                  onClick={() => setSelectedFoodPhoto(photo)}
                >
                  <img src={photo} alt={`음식 ${index+1}`} className={styles.thumbnail} />
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* 리뷰 작성 폼 */}
        {selectedFoodPhoto && (
          <form onSubmit={handleSubmit} className={styles.reviewForm}>
            <h2>선택한 요리</h2>
            
            <div className={styles.photoPreview}>
              <img src={selectedFoodPhoto} alt="선택한 요리" className={styles.selectedFoodImg} />
            </div>
            
            {/* 별점 선택 */}
            <div className={styles.ratingSection}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={star <= rating ? styles.starOn : styles.starOff}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
            
            {/* 리뷰용 사진 업로드 */}
            <div className={styles.uploadSection}>
              <label htmlFor="reviewPhotoInput" className={styles.uploadLabel}>
                {reviewPhoto ? (
                  <img src={reviewPhoto} alt="리뷰 사진 미리보기" className={styles.reviewPhotoPreview} />
                ) : (
                  <div className={styles.uploadPlaceholder}>
                    <span>리뷰용 사진 첨부하기</span>
                  </div>
                )}
              </label>
              <input
                type="file"
                id="reviewPhotoInput"
                accept="image/*"
                onChange={handleReviewPhotoChange}
                style={{ display: 'none' }}
              />
            </div>
            
            {/* 리뷰 텍스트 */}
            <textarea
              placeholder="리뷰 내용을 작성해주세요..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className={styles.reviewTextarea}
            />
            
            <button type="submit" className={styles.submitButton}>
              별점 제출하기
            </button>
          </form>
        )}
        
        {/* 등록된 리뷰 목록 */}
        <div className={styles.reviewsList}>
          <h2>등록된 리뷰</h2>
          {foodReviews.length === 0 ? (
            <p className={styles.noReviews}>등록된 리뷰가 없습니다.</p>
          ) : (
            foodReviews.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={styles.stars}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < review.rating ? styles.starOn : styles.starOff}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className={styles.reviewDate}>
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                
                <div className={styles.reviewContent}>
                  <div className={styles.reviewPhotos}>
                    <div className={styles.photoBox}>
                      <h4>원본 사진</h4>
                      <img src={review.foodPhoto} alt="음식 사진" className={styles.foodImg} />
                    </div>
                    <div className={styles.photoBox}>
                      <h4>리뷰 사진</h4>
                      <img src={review.reviewPhoto} alt="리뷰 사진" className={styles.reviewImg} />
                    </div>
                  </div>
                  <p className={styles.reviewText}>{review.text}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FoodReviewPage;
