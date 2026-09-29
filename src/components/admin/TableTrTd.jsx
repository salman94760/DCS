import { Link } from "react-router-dom";

export default function TableTrTd({
  title,
  subtitle,
  documents = [],
  driverId,
}) {
const document = documents.find((doc) => doc.title === title);

const documentExists = !!document;
const slug = document?.slug || "";
const expiration_date = document?.expiration_date || "";



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
        <input type="date"  defaultValue={expiration_date} name="docdate[]" />
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
            to={`/company-dashboard/driver/documents-view/${encodeURIComponent(
              slug,
            )}/${driverId}`}
          >
            👁
          </Link>
        )}
      </td>
    </tr>
  );
}
