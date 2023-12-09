import { useCallback, useEffect, useRef } from 'react';

let naverMapLoadingPromise: Promise<unknown>;

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
    if (!naverMapLoadingPromise) {
      naverMapLoadingPromise = new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${
          import.meta.env.VITE_NAVER_MAP_CLIENT_ID
        }`;
        document.head.appendChild(script);
        script.onload = resolve;
      });
    }

    naverMapLoadingPromise.then(createMap);
  }, [createMap]);

  return <div ref={mapElement} className="aspect-square w-600" />;
}
