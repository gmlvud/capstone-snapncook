import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './IngredientsInput.module.css';

const IngredientsInput = () => {
  const [ingredients, setIngredients] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    sessionStorage.setItem('selectedIngredients', ingredients);
    navigate('/recommendations');
  };

  return (
    <div className={styles.container}>
      <h2>가지고 있는 재료를 입력하세요 </h2>
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="예시) 계란, 토마토, 양파"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <button onClick={handleSearch}>레시피 찾기</button>
      </div>
    </div>
  );
};

export default IngredientsInput;
