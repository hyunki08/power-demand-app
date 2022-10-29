import React from "react";
import style from "../styles/Home.module.css";

const Home = () => {
  const onClickLinkButton = () => {
    window.open("https://www.data.go.kr/data/15065268/fileData.do");
  };
  return (
    <div className={style.home}>
      <div className={style.title}>제주 전력 수요량 차트 앱</div>
      <div className={style.linkButton} onClick={onClickLinkButton}>
        <div className={style.linkInfo}>
          <div className={style.linkTitle}>
            공공데이터포털 | 한국전력거래소_시간별 제주 전력 수요량
          </div>
          <div className={style.linkDescription}>
            2007년 ~ 2021년 12월 제주지역 일별 시간단위 발전단 수용
            데이터입니다.
          </div>
          <div className={style.linkUrl}>
            https://www.data.go.kr/data/15065268/fileData.do
          </div>
        </div>
        <img
          className={style.linkImage}
          src="http://data.go.kr/images/biz/data-search/bg-nation.png"
          alt="공공데이터포털"
        />
      </div>
    </div>
  );
};

export default Home;
