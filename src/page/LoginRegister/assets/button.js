import "./style.scss";
export default function Button({ onClick, name }) {
  return (
    <button type="submit" onClick={onClick}>
      {name}
    </button>
  );
}
