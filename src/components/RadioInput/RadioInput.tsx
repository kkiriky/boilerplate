// index.css의 .radio를 사용
export default function RadioInput() {
  return (
    <div className="flex gap-24">
      <label className="flex items-center gap-6">
        <input type="radio" name="test" className="radio" />
        <span>Radio1</span>
      </label>

      <label className="flex items-center gap-6">
        <input type="radio" name="test" className="radio" />
        <span>Radio2</span>
      </label>

      <label className="flex items-center gap-6">
        <input type="radio" name="test" className="radio" />
        <span>Radio3</span>
      </label>
    </div>
  );
}
