import { useCallback, useEffect, useRef } from 'react';

// global state처럼 다른 페이지로 이동하더라도 값 유지
// => global state로 선언하지 않는 이유는 다른 곳에서 쓰이지 않기 때문에
let naverMapPromise: Promise<unknown>;

export default function NaverMap() {
  const mapElement = useRef(null);

  const createMap = useCallback(() => {
    if (!mapElement.current || !naver) return;

    const position = new naver.maps.LatLng(37.5656, 126.9767);
    const mapOptions = {
      center: position,
      zoom: 16,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    new naver.maps.Marker({ position, map });
  }, []);

  useEffect(() => {
    if (!naverMapPromise) {
      naverMapPromise = new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${
          import.meta.env.VITE_NAVER_MAP_CLIENT_ID
        }`;
        document.head.appendChild(script);
        script.onload = resolve; // 스크립트 로드가 완료되면 fulfilled 상태로 변경
      });
    }

    // fulfilled 상태이면 맵 생성 (이전에 스크립트가 로드되었었다면 바로 맵 생성)
    naverMapPromise.then(createMap);
  }, [createMap]);

  return <div ref={mapElement} className="aspect-square w-600" />;
}
