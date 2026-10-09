import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import PanelFormInput from "@/components/admin/FormInput";
import TableTrTd from "@/components/admin/TableTrTd";
import api from "@/api/axios";

export default function AddDriverEmployment() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [serverMessage, setServerMessage] = useState("");
  const [serverMessageType, setServerMessageType] = useState("");
  const [doc, setDoc] = useState("");
  const [documents, setDocuments] = useState([]);
  const [drugtest, setDrugTest] = useState([]);

    const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "" : date.toLocaleDateString("en-US");
  };

  const DownloadPdf = () => {};

  const EmailPdf = () => {};

  const fetchDriversDocuments = async () => {
    try {
      const response = await api.get(`/company/driver-document/${id}`);

      setDoc(response.data.data);
      setDocuments(response.data.data.document);
      setDrugTest(response.data.data.drugtest);
    } catch (error) {
      setErrors("Error fetching driver documents:");
    }
  };

  useEffect(() => {
    if (id) {
      fetchDriversDocuments();
    }
  }, [id]);

  const documentByTitle = documents.reduce((acc, doc) => {
    acc[doc.slug] = doc;
    return acc;
  }, {});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setServerMessage("");
    setServerMessageType("");
    setLoading(true);

    try {
      let user = null;

      try {
        user = JSON.parse(localStorage.getItem("user") || "null");
      } catch (error) {
        console.error("User JSON parse error:", error);
      }

      const formData = new FormData(e.currentTarget);
      const uploadData = new FormData();

      if (user?.name) {
        uploadData.append("cname", user.name);
      }

      if (user?.id) {
        uploadData.append("company_id", user.id);
      }

      uploadData.append("driver_id", id);

      // =========================
      // DRIVER DOCUMENTS
      // =========================

      const titles = formData.getAll("title[]");
      const subtitles = formData.getAll("subtitle[]");
      const docdates = formData.getAll("docdate[]");
      const files = formData.getAll("file[]");

      files.forEach((file, index) => {
        if (file instanceof File && file.size > 0) {
          uploadData.append("title[]", titles[index] || "");
          uploadData.append("subtitle[]", subtitles[index] || "");
          uploadData.append("docdate[]", docdates[index] || "");
          uploadData.append("files[]", file);
        }
      });

      // =========================
      // DRUG TEST
      // =========================

      const quarters = formData.getAll("quarter[]");
      const drugtitles = formData.getAll("drugtitle[]");
      const drugdates = formData.getAll("drugdate[]");
      const drugfiles = formData.getAll("randomdrugfile[]");

      drugfiles.forEach((file, index) => {
        if (file instanceof File && file.size > 0) {
          uploadData.append("quarter[]", quarters[index] || "");
          uploadData.append("drugtitle[]", drugtitles[index] || "");
          uploadData.append("drugdate[]", drugdates[index] || "");
          uploadData.append("randomdrugfile[]", file);
        }
      });

      // =========================
      // MISCELLANEOUS
      // =========================

      const mistitles = formData.getAll("miscellaneoustitle[]");
      const misdates = formData.getAll("miscellaneousdate[]");
      const misfiles = formData.getAll("miscellaneousfile[]");

      misfiles.forEach((file, index) => {
        if (file instanceof File && file.size > 0) {
          uploadData.append("miscellaneoustitle[]", mistitles[index] || "");
          uploadData.append("miscellaneousdate[]", misdates[index] || "");
          uploadData.append("misfile[]", file);
        }
      });

      // =========================
      // CHECK DATA
      // =========================

      console.log("DOCUMENT TITLES:", titles);
      console.log("DOCUMENT SUBTITLES:", subtitles);
      console.log("DOCUMENT DATES:", docdates);
      console.log("DOCUMENT FILES:", files);

      console.log("DRUG TITLES:", drugtitles);
      console.log("DRUG DATES:", drugdates);
      console.log("DRUG FILES:", drugfiles);

      console.log("MISC TITLES:", mistitles);
      console.log("MISC DATES:", misdates);
      console.log("MISC FILES:", misfiles);

      for (const [key, value] of uploadData.entries()) {
        console.log(key, value);
      }

      const response = await api.post(
        "/company/driver/document/add",
        uploadData,
      );

      fetchDriversDocuments();
      setServerMessage(
        result?.message || "Driver documents updated successfully",
      );

      setServerMessageType("success");
    } catch (error) {
      console.error("FULL ERROR:", error);
      console.error("RESPONSE:", error?.response);
      console.error("RESPONSE DATA:", error?.response?.data);

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong.";

      setServerMessage(message);
      setServerMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Driver Document Information
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
        <form
          onSubmit={handleSubmit}
          className="cap space-y-5"
          encType="multipart/form-data"
        >
          <div className="bg-white rounded-xl border border-slate-200">
            <p className="p-4">Document Information</p>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-1">
              <div>
                <table className="w-full text-sm border border-collapse">
                  <thead className="cap sticky top-0 z-20 bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                        Document
                      </th>

                      <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                        Form Submit Date
                      </th>

                      <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                        Download or Email Documents
                      </th>

                      <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                        view
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {doc?.driver?.length > 0 && (
                      <tr className="cap hover:bg-slate-50">
                        <td className="sticky left-0 z-10 bg-white px-6 py-2">
                          Driver Application
                        </td>

                        <td className="sticky left-0 z-10 bg-white px-6 py-2">
                          {formatDate(doc.driver[0]?.time_date)}
                        </td>

                        <td className="sticky left-0 z-10 bg-white px-6 py-2">
                          <button type="button">
                            <i
                              onClick={DownloadPdf}
                              className="fa-solid fa-download"
                            ></i>
                          </button>
                          <button type="button">
                            <i
                              onClick={EmailPdf}
                              className="fa-solid fa-envelope"
                            ></i>
                          </button>
                        </td>

                        <td className="sticky left-0 z-10 bg-white px-6 py-2">
                          <a
                            target="_blank"
                            href={`http://localhost:8000/storage/${doc.driver[0]?.applicationpath}`}
                          >
                            👁
    
                          </a>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <br />

              <div>
                <table className="w-full text-sm border border-collapse">
                  <thead className="cap sticky top-0 z-20 bg-slate-50 border-b border-slate-200">
                    <tr>
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
                        File
                      </th>
                      <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                        upload
                      </th>

                      <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                        view
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    <TableTrTd
                      documents={documents}
                      driverId={id}
                      title="CDL"
                      subtitle="CDL Expiration Date"
                    />
                    <TableTrTd
                      title="Driver Commercial Medical Certificate"
                      subtitle=" Expiration Date"
                      documents={documents}
                      driverId={id}
                    />

                    <TableTrTd
                      title="DMV Driving Record"
                      subtitle="MVR Record Pull Date"
                      documents={documents}
                      driverId={id}
                    />
                    <TableTrTd
                      title="BACKGROUND CHECK DOCUMENT"
                      subtitle="MVR Record Pull DatBACKGROUND CHECK Pull Date"
                      documents={documents}
                      driverId={id}
                    />
                    <TableTrTd
                      title="BACKGROUND CHECK DOCUMENT"
                      subtitle="MVR Record Pull DatBACKGROUND CHECK Pull Date"
                      documents={documents}
                      driverId={id}
                    />
                    <TableTrTd
                      documents={documents}
                      driverId={id}
                      title="PSP RECORD"
                      subtitle="PSP PULL DATE"
                    />
                    <TableTrTd
                      title="Work Authorization Documents"
                      subtitle="Work Authorization Expire Date"
                      documents={documents}
                      driverId={id}
                    />
                    <TableTrTd
                      documents={documents}
                      driverId={id}
                      title="SSN Card"
                      subtitle="WSSN NUMBER"
                    />
                    <TableTrTd
                      title="Pre-employment Clearing House"
                      subtitle="Pre-employment Clearing House Expiration Date"
                      documents={documents}
                      driverId={id}
                    />
                    <TableTrTd
                      title="Pre-employment Drug Test CCF"
                      subtitle="Pre-employment Drug Test Conduct CCF Date"
                      documents={documents}
                      driverId={id}
                    />
                    <TableTrTd
                      title="Pre-employment Drug test Result"
                      subtitle="Pre-employment Drug Test Result Date"
                      documents={documents}
                      driverId={id}
                    />
                    <TableTrTd
                      title="ANNUAL CLEARING HOUSE"
                      subtitle="ANNUAL CLEARING HOUSE EXPIRATION DATE"
                      documents={documents}
                      driverId={id}
                    />
                    <TableTrTd
                      title="PULL NOTICE"
                      subtitle="PULL NOTICE EXPIRATION DATE"
                      documents={documents}
                      driverId={id}
                    />
                    <TableTrTd
                      title="FMCSA National Registry"
                      subtitle="National registry Expiration Date"
                      documents={documents}
                      driverId={id}
                    />
                    <TableTrTd
                      title="Driver Road Test - Driver Proficiency With Vehicle Authorization Docs"
                      subtitle="Driver Road Test Driver Proficiency Date"
                      documents={documents}
                      driverId={id}
                    />
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200">
            <p className="p-4">Other Document Information</p>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-1">
              <div>
                <p className="px-4 py-2 text-sm font-semibold text-slate-700">
                  Quarter: 1
                </p>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-1">
                  <div>
                    <table className="w-full text-sm border border-collapse">
                      <tbody className="divide-y divide-slate-200">
                        <tr className="cap hover:bg-slate-50">
                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            RANDOM DRUG TEST Conduct CCF Date
                            <input
                              type="hidden"
                              value="RANDOM DRUG TEST Conduct CCF Date"
                              name="drugtitle[]"
                            />
                            <input type="hidden" value="1" name="quarter[]" />
                          </td>
                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            <input type="date" name="drugdate[]" />
                          </td>
                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            <input name="randomdrugfile[]" type="file" />
                          </td>
                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            <button type="submit">
                              <i className="fa-solid fa-upload"></i>
                            </button>
                          </td>

                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            {(() => {
                              const item = drugtest?.find(
                                (item) =>
                                  item.title?.trim().replace(/\s+/g, " ") ===
                                    "RANDOM DRUG TEST Conduct CCF Date" &&
                                  Number(item.quarter) === 1,
                              );

                              if (!item?.file) return null;

                              const baseUrl =
                                window.location.hostname === "localhost"
                                  ? "http://localhost:8000/storage/"
                                  : "https://palegoldenrod-squid-977714.hostingersite.com/storage/app/public/";

                              const url = `${baseUrl}${item.file}`;

                              console.log("Matched item:", item);
                              console.log("File:", item.file);
                              console.log("URL:", url);

                              return (
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  👁
                                </a>
                              );
                            })()}
                          </td>
                        </tr>

                        <tr className="cap hover:bg-slate-50">
                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            RANDOM DRUG TEST Result Date
                            <input
                              type="hidden"
                              value="RANDOM DRUG TEST Result Date"
                              name="drugtitle[]"
                            />
                            <input type="hidden" value="1" name="quarter[]" />
                          </td>
                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            <input type="date" name="drugdate[]" />
                          </td>
                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            <input name="randomdrugfile[]" type="file" />
                          </td>
                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            <button type="submit">
                              <i className="fa-solid fa-upload"></i>
                            </button>
                          </td>

                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            {(() => {
                              const item = drugtest?.find(
                                (item) =>
                                  item.title?.trim().replace(/\s+/g, " ") ===
                                    "RANDOM DRUG TEST Result Date" &&
                                  Number(item.quarter) === 1,
                              );

                              if (!item?.file) return null;

                              const baseUrl =
                                window.location.hostname === "localhost"
                                  ? "http://localhost:8000/storage/"
                                  : "https://palegoldenrod-squid-977714.hostingersite.com/storage/app/public/";

                              const url = `${baseUrl}${item.file}`;

                              console.log("Matched item:", item);
                              console.log("File:", item.file);
                              console.log("URL:", url);

                              return (
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  👁
                                </a>
                              );
                            })()}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div>
                <p className="px-4 py-2 text-sm font-semibold text-slate-700">
                  Quarter: 2
                </p>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-1">
                  <div>
                    <table className="w-full text-sm border border-collapse">
                      <tbody className="divide-y divide-slate-200">
                        <tr className="cap hover:bg-slate-50">
                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            RANDOM DRUG TEST Conduct CCF Date
                            <input
                              type="hidden"
                              value="RANDOM DRUG TEST Conduct CCF Date"
                              name="drugtitle[]"
                            />
                            <input type="hidden" value="2" name="quarter[]" />
                          </td>
                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            <input type="date" name="drugdate[]" />
                          </td>
                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            <input name="randomdrugfile[]" type="file" />
                          </td>
                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            <button type="submit">
                              <i className="fa-solid fa-upload"></i>
                            </button>
                          </td>

                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            {(() => {
                              const item = drugtest?.find(
                                (item) =>
                                  item.title?.trim().replace(/\s+/g, " ") ===
                                    "RANDOM DRUG TEST Conduct CCF Date" &&
                                  Number(item.quarter) === 2,
                              );

                              if (!item?.file) return null;

                              const baseUrl =
                                window.location.hostname === "localhost"
                                  ? "http://localhost:8000/storage/"
                                  : "https://palegoldenrod-squid-977714.hostingersite.com/storage/app/public/";

                              const url = `${baseUrl}${item.file}`;

                              console.log("Matched item:", item);
                              console.log("File:", item.file);
                              console.log("URL:", url);

                              return (
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  👁
                                </a>
                              );
                            })()}
                          </td>
                        </tr>

                        <tr className="cap hover:bg-slate-50">
                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            RANDOM DRUG TEST Result Date
                            <input
                              type="hidden"
                              value="RANDOM DRUG TEST Result Date"
                              name="drugtitle[]"
                            />
                            <input type="hidden" value="2" name="quarter[]" />
                          </td>
                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            <input type="date" name="drugdate[]" />
                          </td>
                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            <input name="randomdrugfile[]" type="file" />
                          </td>
                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            <button type="submit">
                              <i className="fa-solid fa-upload"></i>
                            </button>
                          </td>

                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            {(() => {
                              const item = drugtest?.find(
                                (item) =>
                                  item.title?.trim().replace(/\s+/g, " ") ===
                                    "RANDOM DRUG TEST Result Date" &&
                                  Number(item.quarter) === 2,
                              );

                              if (!item?.file) return null;

                              const baseUrl =
                                window.location.hostname === "localhost"
                                  ? "http://localhost:8000/storage/"
                                  : "https://palegoldenrod-squid-977714.hostingersite.com/storage/app/public/";

                              const url = `${baseUrl}${item.file}`;

                              console.log("Matched item:", item);
                              console.log("File:", item.file);
                              console.log("URL:", url);

                              return (
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  👁
                                </a>
                              );
                            })()}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-1">
              <div>
                <p className="px-4 py-2 text-sm font-semibold text-slate-700">
                  Quarter: 3
                </p>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-1">
                  <div>
                    <table className="w-full text-sm border border-collapse">
                      <tbody className="divide-y divide-slate-200">
                        <tr className="cap hover:bg-slate-50">
                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            RANDOM DRUG TEST Conduct CCF Date
                            <input
                              type="hidden"
                              value="RANDOM DRUG TEST Conduct CCF Date"
                              name="drugtitle[]"
                            />
                            <input type="hidden" value="3" name="quarter[]" />
                          </td>
                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            <input type="date" name="drugdate[]" />
                          </td>
                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            <input name="randomdrugfile[]" type="file" />
                          </td>
                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            <button type="submit">
                              <i className="fa-solid fa-upload"></i>
                            </button>
                          </td>

                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            {(() => {
                              const item = drugtest?.find(
                                (item) =>
                                  item.title?.trim().replace(/\s+/g, " ") ===
                                    "RANDOM DRUG TEST Conduct CCF Date" &&
                                  Number(item.quarter) === 3,
                              );

                              if (!item?.file) return null;

                              const baseUrl =
                                window.location.hostname === "localhost"
                                  ? "http://localhost:8000/storage/"
                                  : "https://palegoldenrod-squid-977714.hostingersite.com/storage/app/public/";

                              const url = `${baseUrl}${item.file}`;

                              console.log("Matched item:", item);
                              console.log("File:", item.file);
                              console.log("URL:", url);

                              return (
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  👁
                                </a>
                              );
                            })()}
                          </td>
                        </tr>

                        <tr className="cap hover:bg-slate-50">
                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            RANDOM DRUG TEST Result Date
                            <input
                              type="hidden"
                              value="RANDOM DRUG TEST Result Date"
                              name="drugtitle[]"
                            />
                            <input type="hidden" value="3" name="quarter[]" />
                          </td>
                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            <input type="date" name="drugdate[]" />
                          </td>
                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            <input name="randomdrugfile[]" type="file" />
                          </td>
                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            <button type="submit">
                              <i className="fa-solid fa-upload"></i>
                            </button>
                          </td>

                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            {(() => {
                              const item = drugtest?.find(
                                (item) =>
                                  item.title?.trim().replace(/\s+/g, " ") ===
                                    "RANDOM DRUG TEST Result Date" &&
                                  Number(item.quarter) === 3,
                              );

                              if (!item?.file) return null;

                              const baseUrl =
                                window.location.hostname === "localhost"
                                  ? "http://localhost:8000/storage/"
                                  : "https://palegoldenrod-squid-977714.hostingersite.com/storage/app/public/";

                              const url = `${baseUrl}${item.file}`;

                              console.log("Matched item:", item);
                              console.log("File:", item.file);
                              console.log("URL:", url);

                              return (
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  👁
                                </a>
                              );
                            })()}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div>
                {" "}
                <p className="px-4 py-2 text-sm font-semibold text-slate-700">
                  Quarter: 4
                </p>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-1">
                  <div>
                    <table className="w-full text-sm border border-collapse">
                      <tbody className="divide-y divide-slate-200">
                        <tr className="cap hover:bg-slate-50">
                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            RANDOM DRUG TEST Conduct CCF Date
                            <input
                              type="hidden"
                              value="RANDOM DRUG TEST Conduct CCF Date"
                              name="drugtitle[]"
                            />
                            <input type="hidden" value="4" name="quarter[]" />
                          </td>
                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            <input type="date" name="drugdate[]" />
                          </td>
                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            <input name="randomdrugfile[]" type="file" />
                          </td>
                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            <button type="submit">
                              <i className="fa-solid fa-upload"></i>
                            </button>
                          </td>

                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            {(() => {
                              const item = drugtest?.find(
                                (item) =>
                                  item.title?.trim().replace(/\s+/g, " ") ===
                                    "RANDOM DRUG TEST Conduct CCF Date" &&
                                  Number(item.quarter) === 4,
                              );

                              if (!item?.file) return null;

                              const baseUrl =
                                window.location.hostname === "localhost"
                                  ? "http://localhost:8000/storage/"
                                  : "https://palegoldenrod-squid-977714.hostingersite.com/storage/app/public/";

                              const url = `${baseUrl}${item.file}`;

                              console.log("Matched item:", item);
                              console.log("File:", item.file);
                              console.log("URL:", url);

                              return (
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  👁
                                </a>
                              );
                            })()}
                          </td>
                        </tr>

                        <tr className="cap hover:bg-slate-50">
                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            RANDOM DRUG TEST Result Date
                            <input
                              type="hidden"
                              value="RANDOM DRUG TEST Result Date"
                              name="drugtitle[]"
                            />
                            <input type="hidden" value="4" name="quarter[]" />
                          </td>
                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            <input type="date" name="drugdate[]" />
                          </td>
                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            <input name="randomdrugfile[]" type="file" />
                          </td>
                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            <button type="submit">
                              <i className="fa-solid fa-upload"></i>
                            </button>
                          </td>

                          <td className="sticky left-0 z-10 bg-white px-6 py-2">
                            {(() => {
                              const item = drugtest?.find(
                                (item) =>
                                  item.title?.trim().replace(/\s+/g, " ") ===
                                    "RANDOM DRUG TEST Result Date" &&
                                  Number(item.quarter) === 4,
                              );

                              if (!item?.file) return null;

                              const baseUrl =
                                window.location.hostname === "localhost"
                                  ? "http://localhost:8000/storage/"
                                  : "https://palegoldenrod-squid-977714.hostingersite.com/storage/app/public/";

                              const url = `${baseUrl}${item.file}`;

                              console.log("Matched item:", item);
                              console.log("File:", item.file);
                              console.log("URL:", url);

                              return (
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  👁
                                </a>
                              );
                            })()}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200">
            <p className="p-4">Miscellaneous Doument</p>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-1">
              <div>
                <table className="w-full text-sm border border-collapse">
                  <thead className="cap sticky top-0 z-20 bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                        Document Name Type
                      </th>

                      <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                        Miscellaneous Doument Pull Date
                      </th>

                      <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                        Upload File
                      </th>

                      <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                        Upload Document
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr className="cap hover:bg-slate-50">
                      <td className="sticky left-0 z-10 bg-white px-6 py-2">
                        <PanelFormInput
                          title=""
                          placeholder="document name/type"
                          mandate={false}
                          inputype="text"
                          name="miscellaneoustitle[]"
                          errormsg={errors.currentcdlissuedate}
                        />
                      </td>
                      <td className="sticky left-0 z-10 bg-white px-6 py-2">
                        <PanelFormInput
                          title=""
                          placeholder="document name/type"
                          mandate={false}
                          inputype="date"
                          name="miscellaneousdate[]"
                          errormsg={errors.currentcdlissuedate}
                        />
                      </td>

                      <td className="sticky left-0 z-10 bg-white px-6 py-2">
                        <PanelFormInput
                          title=""
                          placeholder="document name/type"
                          mandate={false}
                          inputype="file"
                          name="miscellaneousfile[]"
                        />
                      </td>
                      <td className="sticky left-0 z-10 bg-white px-6 py-2">
                        <button type="submit">
                          <i className="fa-solid fa-upload"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </form>

        <div className="bg-white rounded-xl border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-1">
            <div>
              <table className="w-full text-sm border border-collapse">
                <thead className="cap sticky top-0 z-20 bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                      Document Name Type
                    </th>

                    <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                      Miscellaneous Doument Pull Date
                    </th>

                    <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                      View Document
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {doc?.miscellaneous?.map((mis) => {
                    let url = `${
                      window.location.hostname === "localhost"
                        ? "http://localhost:8000/storage/"
                        : "https://palegoldenrod-squid-977714.hostingersite.com/storage/app/public/"
                    }${mis.file}`;

                    return (
                      <tr key={mis.id} className="cap hover:bg-slate-50">
                        <td className="sticky left-0 z-10 bg-white px-6 py-2">
                          {mis.title}
                        </td>
                        <td className="sticky left-0 z-10 bg-white px-6 py-2">
                          {mis.date
                            ? new Date(
                                `${mis.date}T00:00:00`,
                              ).toLocaleDateString("en-US")
                            : ""}
                        </td>

                        <td className="sticky left-0 z-10 bg-white px-6 py-2">
                          <a
                            href={`${url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            👁
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

        {serverMessage && (
          <div
            className={`mt-3 mb-3 rounded-lg border px-3 py-2 text-sm text-center ${
              serverMessageType === "error" ? "text-red-500" : "text-green-600"
            }`}
            style={{
              borderColor: "#091122",
            }}
          >
            {serverMessage}
          </div>
        )}
      </div>
    </div>
  );
}
