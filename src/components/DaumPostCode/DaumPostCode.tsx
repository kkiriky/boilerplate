import { useCallback } from 'react';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import CloseIcon from '@/assets/icons/close-black.svg?react';

interface DaumPostCodeProps {
  setAddress: (address: string) => void;
  onClose: () => void;
}

export default function DaumPostCode({
  setAddress,
  onClose,
}: DaumPostCodeProps) {
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
      onClose();
    },
    [onClose, setAddress]
  );

  return (
    <div className="overflow-hidden rounded-8 border border-gray-300">
      <div className="px-8 py-12">
        <button className="ml-auto block" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
      <DaumPostcodeEmbed
        onComplete={onComplete}
        autoClose={false}
        style={{ height: 500 }}
      />
    </div>
  );
}
