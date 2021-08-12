import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import data from "./data";
function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);
  //인덱스가 음수가 되면 people 배열의 마지막을 prev로
  //인덱스가 people배열길이 이상이 되면 0으로 초기화
  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  // 자동 슬라이더!!!!!!
  // clearInterval 설정해주면 다음 index가 setIn~되기 전에 현재 영향받은 index 효과 제거
  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 3000);
    return () => clearInterval(slider); /* 이걸 안해주면 클릭시 엉망됨*/
  }, [index]);

  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span>reviews
        </h2>
      </div>
      <div className="section-center">
        {people.map((person, personIdx) => {
          const { id, image, name, title, quote } = person;

          let position = "nextSlide";
          if (personIdx === index) {
            position = "activeSlide";
          }
          if (
            personIdx === index - 1 ||
            (index === 0 && personIdx === people.length - 1)
          ) {
            position = "lastSlide";
          } /* -1 인덱스 가진 사람은 없다-> useEffect로 조정 */
          return (
            <article className={position} key={id}>
              <img src={image} alt={name} className="person-img" />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text">{quote}</p>
              <FaQuoteRight className="icon" />
            </article>
          );
        })}
        <button className="prev" onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default App;
