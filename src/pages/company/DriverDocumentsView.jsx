import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import TableTrTd from "@/components/admin/TableTrTd";
import api from "@/api/axios";

export default function AddDriverEmployment() {
  const navigate = useNavigate();
  const { slug, id } = useParams();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [documents, setDocuments] = useState([]);

  const handleDelete = async (docId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this company?",
    );

    if (!confirmed) return;
    console.log(slug);
    try {
      const response = await api.delete(`/company/delete-document/${docId}`);
      fetchDriversDocuments();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const fetchDriversDocuments = async () => {
    try {
      const response = await api.get(
        `/company/documentInformation/${slug}/${id}`,
      );

      setDocuments(response.data.data);
    } catch (error) {
      setErrors("Error fetching driver documents:");
    }
  };

  useEffect(() => {
    if (id) {
      fetchDriversDocuments();
    }
  }, [id]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Driver {slug} Information
          </h1>
        </div>

        <Link
          to="/company-dashboard/drivers"
          className="bg-[#091122] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800"
        >
          ← Back to Drivers
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="bg-white rounded-xl border border-slate-200">
          <p className="p-4">Document Information</p>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-1">
            <div>
              <table className="w-full text-sm border border-collapse">
                <thead className="cap sticky top-0 z-20 bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                      Action
                    </th>

                    <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                      Document
                    </th>

                    <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                      Document Type
                    </th>

                    <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                      Date
                    </th>

                    <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                      View File
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  {documents?.map((doc, index) => {
                    let url = `${
                      window.location.hostname === "localhost"
                        ? "http://localhost:8000/storage/"
                        : "https://palegoldenrod-squid-977714.hostingersite.com/storage/app/public/"
                    }${doc.file}`;
                    return (
                      <tr key={index} className="cap hover:bg-slate-50">
                        <td className="sticky left-0 z-10 bg-white px-6 py-2">
                          <button
                            type="button"
                            onClick={() => handleDelete(doc.id)}
                            className="px-3 py-1.5 border border-red-200 text-red-600 rounded-lg text-xs hover:bg-red-50 whitespace-nowrap"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                        <td className="sticky left-0 z-10 bg-white px-6 py-2">
                          {doc.title}
                        </td>

                        <td className="sticky left-0 z-10 bg-white px-6 py-2">
                          {doc.subtitle}
                        </td>

                        <td className="sticky left-0 z-10 bg-white px-6 py-2">
                          {doc.expiration_date}
                        </td>

                        <td className="px-6 py-4">
                          <a
                            href={`${url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {doc.file ? (
                              <img
                                className="w-[100px] h-[60px] object-contain"
                                src={`${
                                  window.location.hostname === "localhost"
                                    ? "http://localhost:8000/storage/"
                                    : "https://palegoldenrod-squid-977714.hostingersite.com/storage/app/public/"
                                }${doc.file}`}
                                alt={doc.title}
                              />
                            ) : (
                              "No Image"
                            )}
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
