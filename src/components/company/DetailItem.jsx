const DetailItem = ({
  label,
  value,
  full = false,
  children,
}) => {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <p className="text-xs font-medium text-slate-500 uppercase mb-1">
        {label}
      </p>

     
        {children}

    </div>
  );
};

export default DetailItem;