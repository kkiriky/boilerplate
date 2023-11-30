import { TypeAnimation } from 'react-type-animation';

export default function TypingAnimation() {
  return (
    <TypeAnimation
      // 텍스트가 중복될 경우 중복된 텍스트는 지워지지 않음
      // ex) ['Nextjs', 1000, 'Nestjs', 1000] => Ne는 지워지지 않음
      sequence={['Typing', 1000, 'Animation', 1000]}
      // speed={50}
      // speed={{ type: 'keyStrokeDelayInMs', value: 100 }}
      // deletionSpeed={50}
      repeat={Infinity}
      cursor
      className="text-42 font-bold leading-[130%] -tracking-[0.8px] text-[#1668E4]"
    />
  );
}
