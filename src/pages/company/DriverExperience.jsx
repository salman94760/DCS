import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PanelFormInput from "@/components/admin/FormInput";
import api from "@/api/axios";

export default function DriverExperience() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [errors, setErrors] = useState({});
  const [fetchingExperience, setFetchingExperience] = useState({});
  const [fetchingData, setFetchingData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [serverMessageType, setServerMessageType] = useState("");

  // Checkbox local state
  const [noAccidents, setNoAccidents] = useState(false);
  const [noConvictions, setNoConvictions] = useState(false);

  // License fields local state
  const [licenseDenied, setLicenseDenied] = useState("");
  const [licenseSuspended, setLicenseSuspended] = useState("");

  // =========================================================
  // ACCIDENT RECORDS
  // =========================================================
  const emptyAccident = {
    date: "",
    nature: "",
    fatalities: "0",
    injuries: "0",
    remark: "",
  };

  const [accidents, setAccidents] = useState([{ ...emptyAccident }]);

  // =========================================================
  // TRAFFIC CONVICTION RECORDS
  // =========================================================
  const emptyTrafficConviction = {
    state: "",
    violationType: "",
    ticketDate: "",
    convictionDate: "",
    remark: "",
  };

  const [trafficConvictions, setTrafficConvictions] = useState([
    { ...emptyTrafficConviction },
  ]);

  const fetchDriverExperience = async () => {
    if (!id) return;

    try {
      setFetchingData(true);
      setFetchingExperience({});
      setServerMessage("");
      setErrors({});

      const response = await api.get(`/company/driver-experience/${id}`);
      const result = response?.data || {};
      const payload =
        result?.data || result?.driver || result?.experience || result;

      const fetchedAccidents = Array.isArray(payload?.accidents)
        ? payload.accidents
        : [];

      const fetchedConvictions = Array.isArray(payload?.trafficConvictions)
        ? payload.trafficConvictions
        : Array.isArray(payload?.traffic_convictions)
          ? payload.traffic_convictions
          : [];

      const normalizeDate = (value) => {
        if (!value) return "";
        if (typeof value === "string") {
          return value.includes("T") ? value.split("T")[0] : value.slice(0, 10);
        }
        return "";
      };

      const expData = payload.experience || {};
      setFetchingExperience(expData);

      // Checkbox and License radio states sync from API
      setNoAccidents(
        expData?.accidenthistory === 1 || expData?.noaccidents === "1"
      );
      setNoConvictions(
        expData?.convictionhistory === 1 || expData?.notrafficconvictions === "1"
      );
      setLicenseDenied(
        expData?.licensedeniedstatus || expData?.licensedenied || ""
      );
      setLicenseSuspended(
        expData?.licensesuspendedstatus || expData?.licensesuspended || ""
      );

      setAccidents(
        fetchedAccidents.length
          ? fetchedAccidents.map((item) => ({
              ...item,
              id: item?.id ?? item?._id ?? undefined,
              date: normalizeDate(
                item?.date ?? item?.accidentDate ?? item?.accident_date
              ),
              nature:
                item?.nature ??
                item?.natureOfAccident ??
                item?.nature_of_accident ??
                "",
              fatalities: String(item?.fatalities ?? item?.fatality ?? "0"),
              injuries: String(item?.injuries ?? item?.injury ?? "0"),
              remark: item?.remark ?? item?.remarks ?? "",
            }))
          : [{ ...emptyAccident }]
      );

      setTrafficConvictions(
        fetchedConvictions.length
          ? fetchedConvictions.map((item) => ({
              ...item,
              id: item?.id ?? item?._id ?? undefined,
              state:
                item?.state ??
                item?.stateOfViolation ??
                item?.state_of_violation ??
                "",
              violationType: item?.violationType ?? item?.violation_type ?? "",
              ticketDate: normalizeDate(item?.ticketDate ?? item?.ticket_date),
              convictionDate: normalizeDate(
                item?.convictionDate ?? item?.conviction_date
              ),
              remark: item?.remark ?? item?.remarks ?? "",
            }))
          : [{ ...emptyTrafficConviction }]
      );
    } catch (error) {
      console.error("FETCH DRIVER EXPERIENCE ERROR:", error);
      setServerMessage(
        error?.response?.data?.message ||
          "Unable to fetch existing driver experience."
      );
      setServerMessageType("error");
    } finally {
      setFetchingData(false);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role === "admin") {
      navigate("/admin-dashboard", { replace: true });
    } else if (role !== "company") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    fetchDriverExperience();
  }, [id]);

  const addAccident = () => {
    setAccidents((prev) => [...prev, { ...emptyAccident }]);
  };

  const removeAccident = (index) => {
    if (accidents.length === 1) return;
    setAccidents((prev) => prev.filter((_, i) => i !== index));
  };

  const updateAccident = (index, field, value) => {
    setAccidents((prev) =>
      prev.map((accident, i) =>
        i === index ? { ...accident, [field]: value } : accident
      )
    );
  };

  const addTrafficConviction = () => {
    setTrafficConvictions((prev) => [...prev, { ...emptyTrafficConviction }]);
  };

  const removeTrafficConviction = (index) => {
    if (trafficConvictions.length === 1) return;
    setTrafficConvictions((prev) => prev.filter((_, i) => i !== index));
  };

  const updateTrafficConviction = (index, field, value) => {
    setTrafficConvictions((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const formData = new FormData(e.target);

    const data = {
      equipment: formData.get("equipment")?.trim() || "",
      equipmenttype: formData.get("equipmenttype")?.trim() || "",
      fromdate: formData.get("fromdate")?.trim() || "",
      todate: formData.get("todate")?.trim() || "",
      miles: formData.get("miles")?.trim() || "",
      noaccidents: noAccidents ? "1" : "0",
      notrafficconvictions: noConvictions ? "1" : "0",
      licensedenied: licenseDenied,
      licensedeniedexplanation:
        formData.get("licensedeniedexplanation")?.trim() || "",
      licensesuspended: licenseSuspended,
      licensesuspendedexplanation:
        formData.get("licensesuspendedexplanation")?.trim() || "",
    };

    const newErrors = {};

    if (!data.equipment) newErrors.equipment = "Equipment is required.";
    if (!data.equipmenttype) newErrors.equipmenttype = "Equipment type is required.";
    if (!data.fromdate) newErrors.fromdate = "From date is required.";
    if (!data.todate) newErrors.todate = "To date is required.";

    if (data.fromdate && data.todate) {
      if (new Date(data.todate) < new Date(data.fromdate)) {
        newErrors.todate = "To date must be after or equal to from date.";
      }
    }

    if (!data.miles) {
      newErrors.miles = "Miles is required.";
    } else if (isNaN(Number(data.miles)) || Number(data.miles) < 0) {
      newErrors.miles = "Please enter a valid miles value.";
    }

    // License Denied validation
    if (!data.licensedenied) {
      newErrors.licensedenied = "Please select license denied status.";
    }
    if (data.licensedenied === "yes" && !data.licensedeniedexplanation) {
      newErrors.licensedeniedexplanation = "Please provide license denied explanation.";
    }

    // License Suspended validation
    if (!data.licensesuspended) {
      newErrors.licensesuspended = "Please select license suspended status.";
    }
    if (data.licensesuspended === "yes" && !data.licensesuspendedexplanation) {
      newErrors.licensesuspendedexplanation = "Please provide license suspended explanation.";
    }

    if (!noAccidents) {
      accidents.forEach((accident, index) => {
        const hasAccidentData =
          accident.date ||
          accident.nature ||
          accident.remark ||
          Number(accident.fatalities) > 0 ||
          Number(accident.injuries) > 0;

        if (!hasAccidentData) return;

        if (!accident.date) newErrors[`accident_${index}_date`] = "Accident date is required.";
        if (!accident.nature?.trim()) newErrors[`accident_${index}_nature`] = "Nature is required.";
        if (!accident.remark?.trim()) newErrors[`accident_${index}_remark`] = "Remark is required.";
      });
    }

    if (!noConvictions) {
      trafficConvictions.forEach((traffic, index) => {
        const hasTrafficData =
          traffic.state ||
          traffic.violationType ||
          traffic.ticketDate ||
          traffic.convictionDate ||
          traffic.remark;

        if (!hasTrafficData) return;

        if (!traffic.state?.trim()) newErrors[`traffic_${index}_state`] = "State is required.";
        if (!traffic.violationType?.trim()) newErrors[`traffic_${index}_violationType`] = "Violation type is required.";
        if (!traffic.ticketDate) newErrors[`traffic_${index}_ticketDate`] = "Ticket date is required.";
        if (!traffic.convictionDate) newErrors[`traffic_${index}_convictionDate`] = "Conviction date is required.";

        if (
          traffic.ticketDate &&
          traffic.convictionDate &&
          new Date(traffic.convictionDate) < new Date(traffic.ticketDate)
        ) {
          newErrors[`traffic_${index}_convictionDate`] = "Conviction date must be after or equal to ticket date.";
        }
      });
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTimeout(() => {
        const firstError = document.querySelector(".border-red-500");
        if (firstError) {
          firstError.scrollIntoView({ behavior: "smooth", block: "center" });
          firstError.focus?.();
        }
      }, 100);
      return;
    }

    setErrors({});
    setServerMessage("");
    setServerMessageType("");
    setLoading(true);

    try {
      let user = null;
      try {
        user = JSON.parse(localStorage.getItem("user") || "null");
      } catch (parseError) {
        console.error("User JSON parse error:", parseError);
      }

      const uploadData = new FormData();

      if (user?.name) uploadData.append("cname", user.name);
      if (user?.id) uploadData.append("company_id", user.id);

      uploadData.append("driver_id", id);
      uploadData.append("equipment", data.equipment);
      uploadData.append("equipmenttype", data.equipmenttype);
      uploadData.append("fromdate", data.fromdate);
      uploadData.append("todate", data.todate);
      uploadData.append("miles", data.miles);
      uploadData.append("noaccidents", data.noaccidents);
      uploadData.append("notrafficconvictions", data.notrafficconvictions);
      uploadData.append("licensedenied", data.licensedenied);
      uploadData.append("licensedeniedexplanation", data.licensedeniedexplanation);
      uploadData.append("licensesuspended", data.licensesuspended);
      uploadData.append("licensesuspendedexplanation", data.licensesuspendedexplanation);

      if (!noAccidents) {
        accidents.forEach((accident, index) => {
          Object.entries(accident).forEach(([key, value]) => {
            uploadData.append(`accidents[${index}][${key}]`, value ?? "");
          });
        });
      }

      if (!noConvictions) {
        trafficConvictions.forEach((traffic, index) => {
          Object.entries(traffic).forEach(([key, value]) => {
            uploadData.append(`traffic[${index}][${key}]`, value ?? "");
          });
        });
      }

      const response = await api.post(`/company/driver-experience/${id}`, uploadData);

      const result = response.data;
      setServerMessage(result?.message || "Driver experience saved successfully.");
      setServerMessageType("success");

      await fetchDriverExperience();

      navigate("/company-dashboard/drivers", {
        replace: true,
        state: { success: result?.message || "Driver experience saved successfully." },
      });
    } catch (error) {
      console.error("DRIVER EXPERIENCE API ERROR:", error);
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
        <h1 className="text-2xl font-bold text-slate-900">DRIVING EXPERIENCE</h1>
        <Link
          to="/company-dashboard/drivers"
          className="bg-[#091122] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800"
        >
          ← Back to Drivers
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <p className="font-semibold text-slate-800">DRIVING EXPERIENCE</p>

        {fetchingData && (
          <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
            Loading existing accident and traffic conviction records...
          </div>
        )}

        <br />

        <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                CLASS OF EQUIPMENT
              </label>
              <select
                name="equipment"
                defaultValue={fetchingExperience?.equipment || "straight_truck"}
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none"
              >
                <option value="straight_truck">STRAIGHT TRUCK</option>
                <option value="tractor_semi_trailer">TRACTOR & SEMI-TRAILER</option>
                <option value="tractor_tanker">TRACTOR & TANKER</option>
                <option value="other">OTHER</option>
              </select>
            </div>

            <PanelFormInput
              title="TYPE OF EQUIPMENT (VAN, TANK, FLAT, ETC.)"
              placeholder="Enter type of equipment"
              mandate={true}
              inputype="text"
              name="equipmenttype"
              value={fetchingExperience?.equipment_type}
              errormsg={errors.equipmenttype}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <PanelFormInput
              title="DATE FROM"
              placeholder="Enter date from"
              mandate={true}
              inputype="date"
              name="fromdate"
              value={fetchingExperience?.from_date}
              errormsg={errors.fromdate}
            />

            <PanelFormInput
              title="DATE TO"
              placeholder="Enter date to"
              mandate={true}
              inputype="date"
              name="todate"
              value={fetchingExperience?.to_date}
              errormsg={errors.todate}
            />

            <PanelFormInput
              title="APPROX # OF MILES (TOTAL)"
              placeholder="Enter total miles"
              mandate={true}
              inputype="text"
              name="miles"
              value={fetchingExperience?.miles}
              errormsg={errors.miles}
            />
          </div>

          <br />

          {/* ACCIDENT RECORD */}
          <div className="flex items-center justify-between">
            <p className="font-semibold text-slate-800">
              ACCIDENT RECORD FOR THE PAST 3 YEARS
            </p>
            {!noAccidents && (
              <button
                type="button"
                onClick={addAccident}
                className="bg-[#091122] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800"
              >
                + Add Accident
              </button>
            )}
          </div>

          {/* NO ACCIDENT CHECKBOX */}
          <div className="border border-slate-200 rounded-lg p-4">
            <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                name="noaccidents"
                value="1"
                checked={noAccidents}
                onChange={(e) => setNoAccidents(e.target.checked)}
                className="w-4 h-4 cursor-pointer"
              />
              <span>
                Check this box if you have had no accidents in the past 3 years
              </span>
            </label>
          </div>

          {/* ACCIDENT ROWS */}
          {!noAccidents && (
            <div className="space-y-4">
              {accidents.map((accident, index) => (
                <div
                  key={accident.id ?? `new-accident-${index}`}
                  className="border border-slate-200 rounded-xl p-4 bg-slate-50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-800">
                      Accident #{index + 1}
                    </h3>
                    {accidents.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeAccident(index)}
                        className="text-red-600 border border-red-200 bg-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-50"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div>
                      <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                        DATE
                      </label>
                      <input
                        type="date"
                        name={`accidents[${index}][date]`}
                        value={accident.date}
                        onChange={(e) => updateAccident(index, "date", e.target.value)}
                        className={`w-full border ${
                          errors[`accident_\${index}_date`]
                            ? "border-red-500"
                            : "border-slate-200"
                        } rounded-lg px-4 py-2.5 text-sm outline-none`}
                      />
                      {errors[`accident_${index}_date`] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors[`accident_${index}_date`]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                        NATURE OF ACCIDENT
                      </label>
                      <input
                        type="text"
                        name={`accidents[${index}][nature]`}
                        value={accident.nature}
                        onChange={(e) => updateAccident(index, "nature", e.target.value)}
                        placeholder="Head-on, rear-end, upset, etc."
                        className={`w-full border ${
                          errors[`accident_\${index}_nature`]
                            ? "border-red-500"
                            : "border-slate-200"
                        } rounded-lg px-4 py-2.5 text-sm outline-none`}
                      />
                      {errors[`accident_${index}_nature`] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors[`accident_${index}_nature`]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                        FATALITIES
                      </label>
                      <select
                        value={accident.fatalities}
                        name={`accidents[${index}][fatalities]`}
                        onChange={(e) => updateAccident(index, "fatalities", e.target.value)}
                        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none"
                      >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </div>

                    <div>
                      <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                        INJURIES
                      </label>
                      <select
                        value={accident.injuries}
                        name={`accidents[${index}][injuries]`}
                        onChange={(e) => updateAccident(index, "injuries", e.target.value)}
                        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none"
                      >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                      REMARK (Driver Fault, Other Party Fault)
                    </label>
                    <textarea
                      rows="3"
                      value={accident.remark}
                      name={`accidents[${index}][remark]`}
                      onChange={(e) => updateAccident(index, "remark", e.target.value)}
                      placeholder="Enter accident remark"
                      className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <br />

          {/* TRAFFIC CONVICTIONS */}
          <div className="flex items-center justify-between">
            <p className="font-semibold text-slate-800">
              TRAFFIC CONVICTIONS AND FORFEITURES FOR THE PAST 3 YEARS
            </p>
            {!noConvictions && (
              <button
                type="button"
                onClick={addTrafficConviction}
                className="bg-[#091122] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 whitespace-nowrap"
              >
                + Add Conviction
              </button>
            )}
          </div>

          {/* NO CONVICTION CHECKBOX */}
          <div className="border border-slate-200 rounded-lg p-4">
            <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                name="notrafficconvictions"
                value="1"
                checked={noConvictions}
                onChange={(e) => setNoConvictions(e.target.checked)}
                className="w-4 h-4 cursor-pointer"
              />
              <span>
                Check this box if you have no traffic convictions or forfeitures
                in the past 3 years
              </span>
            </label>
          </div>

          {/* TRAFFIC ROWS */}
          {!noConvictions && (
            <div className="space-y-4">
              {trafficConvictions.map((item, index) => (
                <div
                  key={item.id ?? `new-conviction-${index}`}
                  className="border border-slate-200 rounded-xl p-4 bg-slate-50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-800">
                      Traffic Conviction #{index + 1}
                    </h3>
                    {trafficConvictions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTrafficConviction(index)}
                        className="text-red-600 border border-red-200 bg-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-50"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div>
                      <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                        STATE
                      </label>
                      <input
                        type="text"
                        name={`traffic[${index}][state]`}
                        value={item.state}
                        onChange={(e) => updateTrafficConviction(index, "state", e.target.value)}
                        placeholder="State name"
                        className={`w-full border ${
                          errors[`traffic_\${index}_state`]
                            ? "border-red-500"
                            : "border-slate-200"
                        } rounded-lg px-4 py-2.5 text-sm outline-none`}
                      />
                    </div>

                    <div>
                      <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                        VIOLATION TYPE
                      </label>
                      <input
                        type="text"
                        name={`traffic[${index}][violationType]`}
                        value={item.violationType}
                        onChange={(e) => updateTrafficConviction(index, "violationType", e.target.value)}
                        placeholder="Speeding, signal jump, etc."
                        className={`w-full border ${
                          errors[`traffic_\${index}_violationType`]
                            ? "border-red-500"
                            : "border-slate-200"
                        } rounded-lg px-4 py-2.5 text-sm outline-none`}
                      />
                    </div>

                    <div>
                      <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                        TICKET DATE
                      </label>
                      <input
                        type="date"
                        name={`traffic[${index}][ticketDate]`}
                        value={item.ticketDate}
                        onChange={(e) => updateTrafficConviction(index, "ticketDate", e.target.value)}
                        className={`w-full border ${
                          errors[`traffic_\${index}_ticketDate`]
                            ? "border-red-500"
                            : "border-slate-200"
                        } rounded-lg px-4 py-2.5 text-sm outline-none`}
                      />
                    </div>

                    <div>
                      <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                        CONVICTION DATE
                      </label>
                      <input
                        type="date"
                        name={`traffic[${index}][convictionDate]`}
                        value={item.convictionDate}
                        onChange={(e) => updateTrafficConviction(index, "convictionDate", e.target.value)}
                        className={`w-full border ${
                          errors[`traffic_\${index}_convictionDate`]
                            ? "border-red-500"
                            : "border-slate-200"
                        } rounded-lg px-4 py-2.5 text-sm outline-none`}
                      />
                      {errors[`traffic_${index}_convictionDate`] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors[`traffic_${index}_convictionDate`]}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                      REMARK
                    </label>
                    <textarea
                      rows="3"
                      value={item.remark}
                      name={`traffic[${index}][remark]`}
                      onChange={(e) => updateTrafficConviction(index, "remark", e.target.value)}
                      placeholder="Enter remark"
                      className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <br />

          {/* =====================================================
              LICENSE DENIED & SUSPENDED QUESTIONS
          ===================================================== */}
          <div className="space-y-4 border-t border-slate-200 pt-5">
            {/* LICENSE DENIED */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
              <label className="block text-sm font-medium text-slate-800 mb-2">
                A. Have you ever been denied a license, permit, or privilege to operate a motor vehicle?
              </label>
              <div className="flex items-center gap-6 mb-3">
                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="licensedenied"
                    value="yes"
                    checked={licenseDenied === "yes"}
                    onChange={(e) => setLicenseDenied(e.target.value)}
                  />
                  <span>YES</span>
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="licensedenied"
                    value="no"
                    checked={licenseDenied === "no"}
                    onChange={(e) => setLicenseDenied(e.target.value)}
                  />
                  <span>NO</span>
                </label>
              </div>

              {errors.licensedenied && (
                <p className="text-red-500 text-xs mb-2">{errors.licensedenied}</p>
              )}

              {licenseDenied === "yes" && (
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    IF YES, EXPLAIN DETAILS:
                  </label>
                  <textarea
                    name="licensedeniedexplanation"
                    rows="2"
                    defaultValue={fetchingExperience?.licensedeniedremarks || ""}
                    placeholder="Provide details..."
                    className={`w-full px-3 py-2 text-sm border ${
                      errors.licensedeniedremarks ? "border-red-500" : "border-slate-200"
                    } rounded-lg bg-white outline-none`}
                  />
                  {errors.licensedeniedexplanation && (
                    <p className="text-red-500 text-xs mt-1">{errors.licensedeniedexplanation}</p>
                  )}
                </div>
              )}
            </div>

            {/* LICENSE SUSPENDED */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
              <label className="block text-sm font-medium text-slate-800 mb-2">
                B. Has any license, permit, or privilege ever been suspended or revoked?
              </label>
              <div className="flex items-center gap-6 mb-3">
                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="licensesuspended"
                    value="yes"
                    checked={licenseSuspended === "yes"}
                    onChange={(e) => setLicenseSuspended(e.target.value)}
                  />
                  <span>YES</span>
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="licensesuspended"
                    value="no"
                    checked={licenseSuspended === "no"}
                    onChange={(e) => setLicenseSuspended(e.target.value)}
                  />
                  <span>NO</span>
                </label>
              </div>

              {errors.licensesuspended && (
                <p className="text-red-500 text-xs mb-2">{errors.licensesuspended}</p>
              )}

              {licenseSuspended === "yes" && (
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    IF YES, EXPLAIN DETAILS:
                  </label>
                  <textarea
                    name="licensesuspendedexplanation"
                    rows="2"
                    defaultValue={fetchingExperience?.licensesuspendedremarks || ""}
                    placeholder="Provide details..."
                    className={`w-full px-3 py-2 text-sm border ${
                      errors.licensesuspendedexplanation ? "border-red-500" : "border-slate-200"
                    } rounded-lg bg-white outline-none`}
                  />
                  {errors.licensesuspendedexplanation && (
                    <p className="text-red-500 text-xs mt-1">{errors.licensesuspendedexplanation}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {serverMessage && (
            <div
              className={`p-4 rounded-lg text-sm ${
                serverMessageType === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {serverMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#091122] text-white py-3 rounded-lg font-medium hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Driver Experience"}
          </button>
        </form>
      </div>
    </div>
  );
}