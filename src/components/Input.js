export default function Input({ value, inputType, onClick }) {
  if (value === 0) inputType = inputType + ' zero'

  return (
    <button className={`input ${inputType}`} onClick={onClick}>{value}</button>
  )
}