import { StatProps } from "../../types/interfaces";

export default function Stat({ icon, value, label }: StatProps) {
  return (
    <div className="stat">
      {icon}
      <h3 className="small-header">{value}</h3>
      <span className="small-text">{label}</span>
    </div>
  )
}