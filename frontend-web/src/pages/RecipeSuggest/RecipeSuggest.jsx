import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import styles from './RecipeSuggest.module.css';

const RecipeSuggest = () => {
  const [inputIngredients, setInputIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [searchedIngredients, setSearchedIngredients] = useState('');

  // 재료 입력값 처리 함수
  const handleInputChange = (e) => {
    setInputIngredients(e.target.value);
  };

  // 검색 제출 처리 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    //sessionStorage.setItem('selectedIngredients', inputIngredients);
    setSearchedIngredients(inputIngredients);
    const normalized = inputIngredients.replace(/\s/g, '').toLowerCase();
    if (
      (normalized.includes('감자') && normalized.includes('당근')) ||
      (normalized.includes('potato') && normalized.includes('carrot'))
    ) {
      setRecipes([
        {
          id: 1,
          title: '카레',
          image: 'https://i.namu.wiki/i/JQ01nzXT-h4iry8mTT6lcTQLyb4ajakflFlZXSNzd0LrOw1vE3CEYN6T93Pvipu1MnQfXYTvP9ODBk9E-nP_GsQugOSJ0yC9npVwR6HOF2KaaqjO35C-ImZfGd6q4ATLqM9oFfVXrMr3sznVFJZvIQ.webp', // 예시 이미지
          missedIngredients: [],
          description:[
            <div>1.우선 제일먼저 해야할일은 카레용돼지고기를 후추로 톡톡세번 그리고 자박하게 잠길정도로 우유를 부어줍니다.
            15분정도 재워둡니다.</div>,
            <div>2.양파중간사이즈 2개, 감자큰거 1개,당근1/2개,새송이버섯2개(없으면 패스하셔도무관)
            을 먹기 좋은 크기로 잘라서 준비합니다.</div>,
            <div>3.카레를 할 냄비를 준비하신후에 버터1스푼과 마늘1스푼을 넣고</div>,
            <div>4.양파썰어둔것을 모두 넣어서 볶아줍니다.</div>,
            <div>5.양파의 볶는냄새가 맛있게 올라오면 돼지고기재워둔것을 우유도 함께 모두 넣어 보글보글 끓여줍니다.</div>,
            <div>6.고기의 색이 변하면, 감자와 당근을 넣어줍니다.</div>,
            <div>7.감자가 서걱하게 익을정도로 볶아주다가, 물 800ml를 넣어줍니다.</div>,
            <div>8.물이 보글보글 끓기 시작하면 남은 우유와 새송이버섯을 넣고 카레가루를 넣어줍니다.</div>,
            <div>9.가루가 뭉치지 않게 조금씩 넣어서 충분히 풀면서 끓여준뒤 마지막에 후추톡톡 3번해주면 카레 완성이예요.	</div>
          ]
        }
      ]);
    } else {
      setRecipes([]);
    }
  };

{/*  useEffect(() => {
    // 세션 스토리지에서 기존 값 로드
    const storedIngredients = sessionStorage.getItem('selectedIngredients');
    if (storedIngredients) {
      setInputIngredients(storedIngredients);
      setSearchedIngredients(storedIngredients);
    }
  }, []);

  useEffect(() => {
    // Spoonacular API 연동 (예시)
    const fetchRecipes = async () => {
      try {
        // 실제 API 연동 시 여기에 구현
        const response = await fetch(
          `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchedIngredients}&apiKey=YOUR_API_KEY`
        );
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    if (searchedIngredients) fetchRecipes();
  }, [searchedIngredients]);
  */}

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {/* 입력 폼은 항상 상단 */}
        <form onSubmit={handleSubmit} className={styles.inputGroup}>
          <input
            type="text"
            placeholder="예시) 감자, 당근"
            value={inputIngredients}
            onChange={handleInputChange}
            className={styles.ingredientInput}
          />
          <button type="submit" className={styles.searchButton}>레시피 찾기</button>
        </form>

        {/* 결과 영역은 항상 아래쪽에 */}
        <div className={styles.resultSection}>
          <h1>
            {searchedIngredients
              ? `"${searchedIngredients}"로 만들 수 있는 요리 🍳`
              : '재료를 입력해보세요'}
          </h1>
          <div className={styles.recipeGrid}>
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <div key={recipe.id} className={styles.recipeCard}>
                  <img src={recipe.image} alt={recipe.title} />
                  <h3>{recipe.title}</h3>
                  <p>{recipe.description}</p>
                </div>
              ))
            ) : (
              searchedIngredients && (
                <p className={styles.noResults}>검색 결과가 없습니다. 다른 재료를 입력해보세요.</p>
              )
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RecipeSuggest;