export function DetailsInput({ placeholder, name, onChange, value }) {
  return (
    <input
      className="border-b-[1px] indent-1 outline-none placeholder:text-sm"
      type="text"
      value={value}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      autoComplete="off"
      required
    />
  );
}
