import { twJoin } from 'tailwind-merge';

export default function TextBackgroundAnimation() {
  return (
    <h1
      className={twJoin(
        'text-100 font-bold',
        'animate-[textclip_2s_linear_infinite] bg-[linear-gradient(-225deg,#40d77a_0%,#30b061_29%,#11998e_67%,#007991_100%)] bg-[200%_auto] bg-clip-text text-transparent'
      )}
    >
      Text
    </h1>
  );
}

// css-in-js 용도
/*
    background: linear-gradient(
      -225deg,
      #40d77a 0%,
      #30b061 29%,
      #11998e 67%,
      #007991 100%
    );
    background-size: 200% auto;
    background-clip: text;
    color: transparent;
    animation: textclip 2s linear infinite;
*/
