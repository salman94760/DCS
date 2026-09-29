import { Link } from "react-router-dom";

export default function TableTrTd({
  title,
  subtitle,
  documents = [],
  driverId,
}) {
  const documentExists = documents.some((doc) => doc.title === title);

  return (
    <tr className="cap hover:bg-slate-50">
      <td className="sticky left-0 z-10 bg-white px-6 py-2">
        {title}
        <input type="hidden" value={title} name="title[]" />
      </td>

      <td className="sticky left-0 z-10 bg-white px-6 py-2">
        {subtitle}
        <input type="hidden" value={subtitle} name="subtitle[]" />
      </td>

      <td className="sticky left-0 z-10 bg-white px-6 py-2">
        <input type="date" name="docdate[]" />
      </td>

      <td className="sticky left-0 z-10 bg-white px-6 py-2">
        <input name="file[]" type="file" />
      </td>

      <td className="sticky left-0 z-10 bg-white px-6 py-2">
        <button type="submit">
          <i className="fa-solid fa-upload"></i>
        </button>
      </td>

      <td className="sticky left-0 z-10 bg-white px-6 py-2">
        {documentExists && (
          <Link
            target="_blank"
            to={`/company-dashboard/driver/documentInformation/${encodeURIComponent(
              title,
            )}/${driverId}`}
          >
            👁
          </Link>
        )}
      </td>
    </tr>
  );
}
