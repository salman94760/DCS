export default function Input({
  label,
  mandate = false,
  inputType,
  name,
  value,
  errormsg,
}) {
  return (
    <div class="field">
      <label>
        {label} {mandate && <span>*</span>}
      </label>
      <input type={inputType} class="input" name={name} defaultValue={value} />
      {errormsg && <p className="text-red-500 text-xs pt-0 p-1">{errormsg}</p>}
    </div>
  );
}
