const reportWebVitals = onPerfEntry => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(onPerfEntry);    // CLS(Cumulative Layout Shift) : 시각적인 안정성에 대한 지표   * 0.1 이하 : good / 0.25 이상 : bad
        getFID(onPerfEntry);    // FID(First Input Delay) : 다음 액션이 가능하게 되는 시간      * 100ms 이하 : good / 300ms 이상 : bad
        getFCP(onPerfEntry);    // FCP(First Contentful Paint) : 페이지 로드 시작부터 컨텐츠 일부가 화면에 렌더링 되기 시작하는 시간    * 1.8초 이하 : good / 3초 이상 : bad
        getLCP(onPerfEntry);    // LCP(Largest Contentful Pain) : 웹페이지 로딩 속도(HTML의 모든 요소가 렌더링 완료까지 걸리는 시간) * 2.5초 이하 : good / 4초 이상 : bad
        getTTFB(onPerfEntry);   // TTFB(Time to First Byte) : 요청 시간과 그에 해당하는 자원의 첫 바이트가 도달하는 시간    * 800ms 이하 : good / 1800ms 이상 : bad
      });
    }
  };
  
  export default reportWebVitals;