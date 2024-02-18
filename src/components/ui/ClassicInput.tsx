import { ClassicInputProps } from "../../types/interfaces";

export default function ClassicInput({ type, placeholder, onChange, value, onClick }: ClassicInputProps) {
  return (
    <div className="inputBx" onClick={onClick}>
      <input 
        type={type}
        className="classic-input" 
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  )
}