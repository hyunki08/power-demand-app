# Power Demand Chart App

2007년 ~ 2021년 제주지역 일별 시간단위 전력 수요량을 차트로 확인할 수 있는 앱

### 구현 스택

- React

### 구현 내용

- antd 테마, 레이아웃 사용
- antd DatePicker를 컴포넌트화 하여 일, 월, 년 단위로 원하는 날짜를 선택하도록 함
- 날짜 선택은 단일 지정만 가능하도록 함
  - 매년 12월 10일의 데이터를 비교 할 때에는 단일 지정 방법이 유리
  - 단일 지정도 번거롭지만 기간 단위로 선택이 가능함을 생각
- chart.js를 이용하여 차트 생성
- pages 는 Daily, Monthly, Yearly 단위로 각 페이지에 알맞은 데이터를 가져 올 수 있도록 디렉토리로 분리하여 페이지 구현
- style의 경우 module로 분리

### Backend

https://github.com/hyunki08/power-demand-api
