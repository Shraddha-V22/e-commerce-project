export function DetailsInput({
  placeholder,
  name,
  onChange,
  value,
  type = "text",
}) {
  return (
    <input
      className="border-b-[1px] indent-1 outline-none placeholder:text-sm"
      type={type}
      value={value}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      autoComplete="off"
      required
    />
  );
}
