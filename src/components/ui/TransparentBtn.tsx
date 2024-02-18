import { TransparentBtnProps } from "../../types/interfaces";

export default function TransparentBtn({title}: TransparentBtnProps) {
  return (
    <button className="transparent-btn">
      {title}
    </button>
  )
}