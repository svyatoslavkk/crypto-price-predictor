import { NeutralBtnProps } from "../../types/interfaces";

export default function NeutralBtn({ buttonText, onClick, state }: NeutralBtnProps) {
  return (
    <button
      className={`neutral-btn ${state === buttonText ? "active" : ""}`}
      onClick={onClick}
    >
      <span className="small-text">{buttonText}</span>
    </button>
  )
}