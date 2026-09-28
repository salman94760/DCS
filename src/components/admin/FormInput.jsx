export default function FormInput({
  title,
  placeholder,
  name,
  mandate = false,
  inputype = "text",
  value = "",
  onChange,
  errormsg,
}) {
  return (
    <div>
      <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
        {title}

        {mandate && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>

      <input
        type={inputype}
        name={name}
        placeholder={placeholder}
        defaultValue={value ?? ""}
        onChange={onChange}
        className={`cap w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 ${
          errormsg
            ? "border-red-500"
            : "border-slate-200"
        }`}
      />

      {errormsg && (
        <p className="text-red-500 text-xs mt-1">
          <b>{errormsg}</b>
        </p>
      )}
    </div>
  );
}