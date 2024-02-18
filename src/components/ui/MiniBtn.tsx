import { NeutralBtnProps } from "../../types/interfaces";

export default function MiniBtn({ buttonText, onClick }: NeutralBtnProps) {
  return (
    <button className="sq-btn-mod" onClick={onClick}>
      <span className="tiny-color-text">{buttonText}</span>
    </button>
  )
}