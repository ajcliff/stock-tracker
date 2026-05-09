export default function NumberInput({
  value,
  onChange,
  placeholder = ""
}) {
  return (
    <input
      type="number"
      inputMode="numeric"
      value={value}
      placeholder={placeholder}
      onWheel={(e) => e.target.blur()}
      onKeyDown={(e) => {
        if (
          e.key === "ArrowUp" ||
          e.key === "ArrowDown"
        ) {
          e.preventDefault();
        }
      }}
      onChange={(e) =>
        onChange(Number(e.target.value) || 0)
      }
    />
  );
}