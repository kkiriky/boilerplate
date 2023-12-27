import { useCallback } from 'react';
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';

interface UseDaumPostCodeParams {
  setAddress: (address: string) => void;
}

const useDaumPostCode = ({ setAddress }: UseDaumPostCodeParams) => {
  const open = useDaumPostcodePopup();

  const onComplete = useCallback(
    (data: Address) => {
      let fullAddress = data.address;
      let extraAddress = '';

      if (data.addressType === 'R') {
        if (data.bname !== '') {
          extraAddress += data.bname;
        }
        if (data.buildingName !== '') {
          extraAddress +=
            extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
        }
        fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
      }

      setAddress(fullAddress);
    },
    [setAddress]
  );

  const onOpenDaumPostCode = useCallback(() => {
    open({
      onComplete,
      popupTitle: '주소검색',
      width: 500,
      height: 500,
      top: (window.outerHeight - 500) / 2,
      left: (window.innerWidth - 500) / 2,
    });
  }, [onComplete, open]);

  return { onOpenDaumPostCode };
};

export default useDaumPostCode;
