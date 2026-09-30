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
      if (!id) {
        return;
      }

      try {
        setFetchingData(true);
        setFetchingExperience({});
        setServerMessage("");
        setErrors({});

        const response = await api.get(`/company/driver-experience/${id}`);

        const result = response?.data || {};
       
        const payload =
          result?.data ||
          result?.driver ||
          result?.experience ||
          result;

   

        const fetchedAccidents = Array.isArray(payload?.accidents)
          ? payload.accidents
          : [];

        const fetchedConvictions = Array.isArray(
          payload?.trafficConvictions
        )
          ? payload.trafficConvictions
          : Array.isArray(payload?.traffic_convictions)
          ? payload.traffic_convictions
          : [];

        const normalizeDate = (value) => {
          if (!value) return "";

          if (typeof value === "string") {
            return value.includes("T")
              ? value.split("T")[0]
              : value.slice(0, 10);
          }

          return "";
        };

        setFetchingExperience(payload.experience);

        setAccidents(
          fetchedAccidents.length
            ? fetchedAccidents.map((item) => ({
                ...item,
                id: item?.id ?? item?._id ?? undefined,
                date: normalizeDate(
                  item?.date ??
                    item?.accidentDate ??
                    item?.accident_date
                ),
                nature:
                  item?.nature ??
                  item?.natureOfAccident ??
                  item?.nature_of_accident ??
                  "",
                fatalities: String(
                  item?.fatalities ?? item?.fatality ?? "0"
                ),
                injuries: String(
                  item?.injuries ?? item?.injury ?? "0"
                ),
                remark:
                  item?.remark ??
                  item?.remarks ??
                  "",
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
                violationType:
                  item?.violationType ??
                  item?.violation_type ??
                  "",
                ticketDate: normalizeDate(
                  item?.ticketDate ??
                    item?.ticket_date
                ),
                convictionDate: normalizeDate(
                  item?.convictionDate ??
                    item?.conviction_date
                ),
                remark:
                  item?.remark ??
                  item?.remarks ??
                  "",
              }))
            : [{ ...emptyTrafficConviction }]
        );
      } catch (error) {
        console.error(
          "FETCH DRIVER EXPERIENCE ERROR:",
          error
        );

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
    } else if (role === "company") {
      // company allowed
    } else {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    

    fetchDriverExperience();
  }, [id]);

  const addAccident = () => {
    setAccidents((prev) => [
      ...prev,
      { ...emptyAccident },
    ]);
  };

  const removeAccident = (index) => {
    if (accidents.length === 1) return;

    setAccidents((prev) => prev.filter((_, i) => i !== index));
  };

  const updateAccident = (index, field, value) => {
    setAccidents((prev) =>
      prev.map((accident, i) =>
        i === index
          ? {
              ...accident,
              [field]: value,
            }
          : accident,
      ),
    );
  };

  const addTrafficConviction = () => {
    setTrafficConvictions((prev) => [
      ...prev,
      { ...emptyTrafficConviction },
    ]);
  };

  const removeTrafficConviction = (index) => {
    if (trafficConvictions.length === 1) return;

    setTrafficConvictions((prev) =>
      prev.filter((_, i) => i !== index),
    );
  };

  const updateTrafficConviction = (index, field, value) => {
    setTrafficConvictions((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  const validateForm = () => {
    const newErrors = {};
    accidents.forEach(
      (accidents, index) => {
        
        if (!accidents.date.trim()) {
          newErrors[
            `accidents.${index}.date`
          ] = "Company name is required";
        }

        // CONTACT NUMBER
        if (!employer.contactno.trim()) {
          newErrors[
            `employers.${index}.nature`
          ] = "Contact no is required";
        }

        // EMAIL
        if (!employer.email.trim()) {
          newErrors[
            `employers.${index}.email`
          ] = "Email is required";
        } else {
          const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          if (
            !emailRegex.test(
              employer.email.trim()
            )
          ) {
            newErrors[
              `employers.${index}.email`
            ] = "Enter a valid email";
          }
        }

        // POSITION
        if (!employer.positionheld.trim()) {
          newErrors[
            `employers.${index}.positionheld`
          ] = "Position held is required";
        }

        // START DATE
        if (!employer.startdate.trim()) {
          newErrors[
            `employers.${index}.startdate`
          ] = "Start date is required";
        }

        // END DATE
        if (!employer.enddate.trim()) {
          newErrors[
            `employers.${index}.enddate`
          ] = "End date is required";
        }

        // FMCSR
        if (
          employer.fmcsr !== "1" &&
          employer.fmcsr !== "0"
        ) {
          newErrors[
            `employers.${index}.fmcsr`
          ] = "Please select YES or NO";
        }

        // SAFETY SENSITIVE
        if (
          employer.safetysensitive !== "1" &&
          employer.safetysensitive !== "0"
        ) {
          newErrors[
            `employers.${index}.safetysensitive`
          ] =
            "Please select YES or NO";
        }
      }
    );

    return newErrors;
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  if (loading) {
    return;
  }

  // =======================================================
  // CREATE FORM DATA
  // =======================================================

  const formData = new FormData(e.target);

  const data = {
    equipment: formData.get("equipment")?.trim() || "",
    equipmenttype: formData.get("equipmenttype")?.trim() || "",
    fromdate: formData.get("fromdate")?.trim() || "",
    todate: formData.get("todate")?.trim() || "",
    miles: formData.get("miles")?.trim() || "",
    noaccidents: formData.get("noaccidents")?.trim() || "",
    notrafficconvictions:
      formData.get("notrafficconvictions")?.trim() || "",
    licensedenied:
      formData.get("licensedenied")?.trim() || "",
    licensedeniedexplanation:
      formData.get("licensedeniedexplanation")?.trim() || "",
    licensesuspended:
      formData.get("licensesuspended")?.trim() || "",
    licensesuspendedexplanation:
      formData.get("licensesuspendedexplanation")?.trim() || "",
  };

  // =======================================================
  // VALIDATION
  // =======================================================

  const newErrors = {};

  // -------------------------------------------------------
  // DRIVER EXPERIENCE
  // -------------------------------------------------------

  if (!data.equipment) {
    newErrors.equipment = "Equipment is required.";
  }

  if (!data.equipmenttype) {
    newErrors.equipmenttype = "Equipment type is required.";
  }

  if (!data.fromdate) {
    newErrors.fromdate = "From date is required.";
  }

  if (!data.todate) {
    newErrors.todate = "To date is required.";
  }

  // From date / To date
  if (data.fromdate && data.todate) {
    if (new Date(data.todate) < new Date(data.fromdate)) {
      newErrors.todate =
        "To date must be after or equal to from date.";
    }
  }

  // Miles
  if (!data.miles) {
    newErrors.miles = "Miles is required.";
  } else if (
    isNaN(Number(data.miles)) ||
    Number(data.miles) < 0
  ) {
    newErrors.miles = "Please enter a valid miles value.";
  }

  // Accident history
  // if (!data.noaccidents) {
  //   newErrors.noaccidents =
  //     "Please select accident history.";
  // }

  // Traffic conviction history
  // if (!data.notrafficconvictions) {
  //   newErrors.notrafficconvictions =
  //     "Please select traffic conviction history.";
  // }

  // License denied
  if (!data.licensedenied) {
    newErrors.licensedenied =
      "Please select license denied status.";
  }

  if (
    data.licensedenied === "yes" &&
    !data.licensedeniedexplanation
  ) {
    newErrors.licensedeniedexplanation =
      "Please provide license denied explanation.";
  }

  // License suspended
  if (!data.licensesuspended) {
    newErrors.licensesuspended =
      "Please select license suspended status.";
  }

  if (
    data.licensesuspended === "yes" &&
    !data.licensesuspendedexplanation
  ) {
    newErrors.licensesuspendedexplanation =
      "Please provide license suspended explanation.";
  }

  // =======================================================
  // ACCIDENTS VALIDATION
  // =======================================================

  accidents.forEach((accident, index) => {
    // Check whether row contains any actual data
    const hasAccidentData =
      accident.date ||
      accident.nature ||
      accident.remark ||
      Number(accident.fatalities) > 0 ||
      Number(accident.injuries) > 0;

    // Empty/default row ko ignore karo
    if (!hasAccidentData) {
      return;
    }

    if (!accident.date) {
      newErrors[`accident_${index}_date`] =
        "Accident date is required.";
    }

    if (!accident.nature?.trim()) {
      newErrors[`accident_${index}_nature`] =
        "Nature is required.";
    }

    if (
      accident.fatalities === "" ||
      accident.fatalities === null ||
      accident.fatalities === undefined
    ) {
      newErrors[`accident_${index}_fatalities`] =
        "Fatalities is required.";
    }

    if (
      accident.injuries === "" ||
      accident.injuries === null ||
      accident.injuries === undefined
    ) {
      newErrors[`accident_${index}_injuries`] =
        "Injuries is required.";
    }

    if (!accident.remark?.trim()) {
      newErrors[`accident_${index}_remark`] =
        "Remark is required.";
    }
  });

  // =======================================================
  // TRAFFIC CONVICTIONS VALIDATION
  // =======================================================

  trafficConvictions.forEach((traffic, index) => {
    // Check whether row contains any actual data
    const hasTrafficData =
      traffic.state ||
      traffic.violationType ||
      traffic.ticketDate ||
      traffic.convictionDate ||
      traffic.remark;

    // Empty/default row ko ignore karo
    if (!hasTrafficData) {
      return;
    }

    if (!traffic.state?.trim()) {
      newErrors[`traffic_${index}_state`] =
        "State is required.";
    }

    if (!traffic.violationType?.trim()) {
      newErrors[`traffic_${index}_violationType`] =
        "Violation type is required.";
    }

    if (!traffic.ticketDate) {
      newErrors[`traffic_${index}_ticketDate`] =
        "Ticket date is required.";
    }

    if (!traffic.convictionDate) {
      newErrors[`traffic_${index}_convictionDate`] =
        "Conviction date is required.";
    }

    // Ticket date / conviction date
    if (
      traffic.ticketDate &&
      traffic.convictionDate &&
      new Date(traffic.convictionDate) <
        new Date(traffic.ticketDate)
    ) {
      newErrors[`traffic_${index}_convictionDate`] =
        "Conviction date must be after or equal to ticket date.";
    }

    if (!traffic.remark?.trim()) {
      newErrors[`traffic_${index}_remark`] =
        "Remark is required.";
    }
  });

  // =======================================================
  // SHOW VALIDATION ERRORS
  // =======================================================
console.log(newErrors);
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);

    setTimeout(() => {
      const firstError =
        document.querySelector(".border-red-500");

      if (firstError) {
        firstError.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        firstError.focus?.();
      }
    }, 100);

    return;
  }
 console.log("here");
  // =======================================================
  // VALIDATION PASSED
  // =======================================================

  setErrors({});
  setServerMessage("");
  setServerMessageType("");
  setLoading(true);

  try {
    // =====================================================
    // GET USER
    // =====================================================

    let user = null;

    try {
      user = JSON.parse(
        localStorage.getItem("user") || "null"
      );
    } catch (parseError) {
      console.error(
        "User JSON parse error:",
        parseError
      );
    }

    // =====================================================
    // CREATE UPLOAD FORM DATA
    // =====================================================

    const uploadData = new FormData();

    // =====================================================
    // COMPANY INFORMATION
    // =====================================================

    if (user?.name) {
      uploadData.append("cname", user.name);
    }

    if (user?.id) {
      uploadData.append("company_id", user.id);
    }

    // =====================================================
    // DRIVER EXPERIENCE
    // =====================================================

    uploadData.append("driver_id", id);
    uploadData.append("equipment", data.equipment);
    uploadData.append("equipmenttype", data.equipmenttype);
    uploadData.append("fromdate", data.fromdate);
    uploadData.append("todate", data.todate);
    uploadData.append("miles", data.miles);
    uploadData.append("noaccidents", data.noaccidents);
    uploadData.append(
      "notrafficconvictions",
      data.notrafficconvictions
    );
    uploadData.append(
      "licensedenied",
      data.licensedenied
    );
    uploadData.append(
      "licensedeniedexplanation",
      data.licensedeniedexplanation
    );
    uploadData.append(
      "licensesuspended",
      data.licensesuspended
    );
    uploadData.append(
      "licensesuspendedexplanation",
      data.licensesuspendedexplanation
    );
 console.log("here");
    // =====================================================
    // ACCIDENTS
    // =====================================================

    accidents.forEach((accident, index) => {
      Object.entries(accident).forEach(([key, value]) => {
        uploadData.append(
          `accidents[${index}][${key}]`,
          value ?? ""
        );
      });
    });

    // =====================================================
    // TRAFFIC CONVICTIONS
    // =====================================================

    trafficConvictions.forEach((traffic, index) => {
      Object.entries(traffic).forEach(([key, value]) => {
        uploadData.append(
          `traffic[${index}][${key}]`,
          value ?? ""
        );
      });
    });
    console.log("here");
    // =====================================================
    // DEBUG
    // =====================================================

    for (const [key, value] of uploadData.entries()) {
      console.log(`${key}:`, value);
    }

    // =====================================================
    // API REQUEST
    // =====================================================

    const response = await api.post(
      `/company/driver-experience/${id}`,
      uploadData
    );

    console.log(
      "DRIVER EXPERIENCE SAVE RESPONSE:",
      response.data
    );

    // =====================================================
    // SUCCESS
    // =====================================================

    const result = response.data;

    setServerMessage(
      result?.message ||
        "Driver experience saved successfully."
    );

    setServerMessageType("success");

    // =====================================================
    // RELOAD LATEST SERVER DATA
    // =====================================================

    await fetchDriverExperience();

    // =====================================================
    // NAVIGATE
    // =====================================================

    navigate("/company-dashboard/drivers", {
      replace: true,
      state: {
        success:
          result?.message ||
          "Driver experience saved successfully.",
      },
    });

  } catch (error) {
    console.error("==============================");
    console.error("DRIVER EXPERIENCE API ERROR");
    console.error("==============================");

    console.error("FULL ERROR:", error);
    console.error("RESPONSE:", error?.response);
    console.error(
      "RESPONSE DATA:",
      error?.response?.data
    );
    console.error(
      "STATUS:",
      error?.response?.status
    );

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
      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            DRIVING EXPERIENCE
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
        <p className="font-semibold text-slate-800">
          DRIVING EXPERIENCE
        </p>

        {fetchingData && (
          <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
            Loading existing accident and traffic conviction records...
          </div>
        )}

        <br />

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
          encType="multipart/form-data"
        >
          {/* =====================================================
              DRIVING EXPERIENCE
          ===================================================== */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                CLASS OF EQUIPMENT
              </label>

              <select
                name="equipment"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none"
              >
                <option selected={fetchingExperience?.equipment === "straight_truck"} value="straight_truck">STRAIGHT TRUCK</option>

                <option selected={fetchingExperience?.equipment === "tractor_semi_trailer"} value="tractor_semi_trailer">
                  TRACTOR & SEMI-TRAILER
                </option>

                <option selected={fetchingExperience?.equipment === "tractor_tanker"} value="tractor_tanker">
                  TRACTOR & TANKER
                </option>

                <option selected={fetchingExperience?.equipment === "other"} value="other">
                  OTHER
                </option>
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
              value={fetchingExperience.from_date}
              errormsg={errors.fromdate}
            />

            <PanelFormInput
              title="DATE TO"
              placeholder="Enter date to"
              mandate={true}
              inputype="date"
              name="todate"
              value={fetchingExperience.to_date}
              errormsg={errors.todate}
            />

            <PanelFormInput
              title="APPROX # OF MILES (TOTAL)"
              placeholder="Enter total miles"
              mandate={true}
              inputype="text"
              name="miles"
              value={fetchingExperience.miles}
              errormsg={errors.miles}
            />
          </div>

          <br />

          {/* =====================================================
              ACCIDENT RECORD
          ===================================================== */}

          <div className="flex items-center justify-between">
            <p className="font-semibold text-slate-800">
              ACCIDENT RECORD FOR THE PAST 3 YEARS
            </p>

            <button
              type="button"
              onClick={addAccident}
              className="bg-[#091122] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800"
            >
              + Add Accident
            </button>
          </div>

          {/* NO ACCIDENT CHECKBOX */}
          <div className="border border-slate-200 rounded-lg p-4">
            <label className="flex items-center gap-3 text-sm text-slate-700">
              <input
                checked= {fetchingExperience.accidenthistory === 1}
                type="checkbox"
                name="noaccidents"
                value="1"
                className="w-4 h-4"
              />

              <span>
                Check this box if you have had no accidents in the
                past 3 years
              </span>
            </label>
          </div>

          {/* ACCIDENT ROWS */}
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
                  {/* DATE */}
                  <div>
                    <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                      DATE
                    </label>

                    <input
                      type="date"
                      name={`accidents[${index}][date]`}
                      value={accident.date}
                      onChange={(e) =>
                        updateAccident(
                          index,
                          "date",
                          e.target.value,
                        )
                      }
                      className={`w-full border ${
                        errors[`accident_${index}_date`]
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

                  {/* NATURE */}
                  <div>
                    <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                      NATURE OF ACCIDENT
                    </label>

                    <input
                      type="text"
                      name={`accidents[${index}][nature]`}
                      value={accident.nature}
                      onChange={(e) =>
                        updateAccident(
                          index,
                          "nature",
                          e.target.value,
                        )
                      }
                      placeholder="Head-on, rear-end, upset, etc."
                      className={`w-full border ${
                        errors[`accident_${index}_nature`]
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

                  {/* FATALITIES */}
                  <div>
                    <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                      FATALITIES
                    </label>

                    <select
                      value={accident.fatalities}
                      name={`accidents[${index}][fatalities]`}
                      onChange={(e) =>
                        updateAccident(
                          index,
                          "fatalities",
                          e.target.value,
                        )
                      }
                      className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none"
                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>

                  {/* INJURIES */}
                  <div>
                    <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                      INJURIES
                    </label>

                    <select
                      value={accident.injuries}
                      name={`accidents[${index}][injuries]`}
                      onChange={(e) =>
                        updateAccident(
                          index,
                          "injuries",
                          e.target.value,
                        )
                      }
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

                {/* REMARK */}
                <div className="mt-3">
                  <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                    REMARK (Driver Fault, Other Party Fault)
                  </label>

                  <textarea
                    rows="3"
                    value={accident.remark}
                    name={`accidents[${index}][remark]`}
                    onChange={(e) =>
                      updateAccident(
                        index,
                        "remark",
                        e.target.value,
                      )
                    }
                    placeholder="Enter accident remark"
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
              </div>
            ))}
          </div>

          <br />

          {/* =====================================================
              TRAFFIC CONVICTIONS
          ===================================================== */}

          <div className="flex items-center justify-between">
            <p className="font-semibold text-slate-800">
              TRAFFIC CONVICTIONS AND FORFEITURES FOR THE PAST 3
              YEARS (OTHER THAN PARKING VIOLATIONS)
            </p>

            <button
              type="button"
              onClick={addTrafficConviction}
              className="bg-[#091122] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 whitespace-nowrap"
            >
              + Add Conviction
            </button>
          </div>

          {/* NO CONVICTION CHECKBOX */}
          <div className="border border-slate-200 rounded-lg p-4">
            <label className="flex items-center gap-3 text-sm text-slate-700">
              <input
                checked= {fetchingExperience.convictionhistory === 1}
                type="checkbox"
                name="notrafficconvictions"
                value="1"
                className="w-4 h-4"
              />

              <span>
                Check this box if you have no traffic convictions
                or forfeitures in the past 3 years
              </span>
            </label>
          </div>

          {/* TRAFFIC ROWS */}
          <div className="space-y-4">
            {trafficConvictions.map((item, index) => (
              <div
                key={
                  item.id ??
                  `new-conviction-${index}`
                }
                className="border border-slate-200 rounded-xl p-4 bg-slate-50"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-800">
                    Traffic Conviction #{index + 1}
                  </h3>

                  {trafficConvictions.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeTrafficConviction(index)
                      }
                      className="text-red-600 border border-red-200 bg-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-50"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  {/* STATE */}
                  <div>
                    <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                      STATE OF VIOLATION
                    </label>

                    <input
                      type="text"
                      name={`traffic[${index}][state]`}
                      value={item.state}
                      onChange={(e) =>
                        updateTrafficConviction(
                          index,
                          "state",
                          e.target.value,
                        )
                      }
                      placeholder="Enter state"
                      className={`w-full border ${
                        errors[`traffic_${index}_state`]
                          ? "border-red-500"
                          : "border-slate-200"
                      } rounded-lg px-4 py-2.5 text-sm outline-none`}
                    />

                    {errors[`traffic_${index}_state`] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[`traffic_${index}_state`]}
                      </p>
                    )}
                  </div>

                  {/* VIOLATION TYPE */}
                  <div>
                    <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                      VIOLATION TYPE
                    </label>

                    <input
                      type="text"
                      name={`traffic[${index}][violationType]`}
                      value={item.violationType}
                      onChange={(e) =>
                        updateTrafficConviction(
                          index,
                          "violationType",
                          e.target.value,
                        )
                      }
                      placeholder="Enter violation type"
                      className={`w-full border ${
                        errors[
                          `traffic_${index}_violationType`
                        ]
                          ? "border-red-500"
                          : "border-slate-200"
                      } rounded-lg px-4 py-2.5 text-sm outline-none`}
                    />

                    {errors[
                      `traffic_${index}_violationType`
                    ] && (
                      <p className="text-red-500 text-xs mt-1">
                        {
                          errors[
                            `traffic_${index}_violationType`
                          ]
                        }
                      </p>
                    )}
                  </div>

                  {/* TICKET DATE */}
                  <div>
                    <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                      TICKET DATE
                    </label>

                    <input
                      type="date"
                      name={`traffic[${index}][ticketDate]`}
                      value={item.ticketDate}
                      onChange={(e) =>
                        updateTrafficConviction(
                          index,
                          "ticketDate",
                          e.target.value,
                        )
                      }
                      className={`w-full border ${
                        errors[
                          `traffic_${index}_ticketDate`
                        ]
                          ? "border-red-500"
                          : "border-slate-200"
                      } rounded-lg px-4 py-2.5 text-sm outline-none`}
                    />

                    {errors[
                      `traffic_${index}_ticketDate`
                    ] && (
                      <p className="text-red-500 text-xs mt-1">
                        {
                          errors[
                            `traffic_${index}_ticketDate`
                          ]
                        }
                      </p>
                    )}
                  </div>

                  {/* CONVICTION DATE */}
                  <div>
                    <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                      CONVICTION DATE
                    </label>

                    <input
                      type="date"
                      value={item.convictionDate}
                      name={`traffic[${index}][convictionDate]`}
                      onChange={(e) =>
                        updateTrafficConviction(
                          index,
                          "convictionDate",
                          e.target.value,
                        )
                      }
                      className={`w-full border ${
                        errors[
                          `traffic_${index}_convictionDate`
                        ]
                          ? "border-red-500"
                          : "border-slate-200"
                      } rounded-lg px-4 py-2.5 text-sm outline-none`}
                    />

                    {errors[
                      `traffic_${index}_convictionDate`
                    ] && (
                      <p className="text-red-500 text-xs mt-1">
                        {
                          errors[
                            `traffic_${index}_convictionDate`
                          ]
                        }
                      </p>
                    )}
                  </div>
                </div>

                {/* REMARK */}
                <div className="mt-3">
                  <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                    REMARK (Guilty, Reduced to Zero, etc.)
                  </label>

                  <textarea
                    rows="3"
                    value={item.remark}
                    name={`traffic[${index}][remark]`}
                    onChange={(e) =>
                      updateTrafficConviction(
                        index,
                        "remark",
                        e.target.value,
                      )
                    }
                    placeholder="Enter conviction remark"
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
              </div>
            ))}
          </div>

          <br />

          {/* =====================================================
              LICENSE QUESTIONS
          ===================================================== */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                Have you ever been denied a license, permit, or
                privilege to operate a motor vehicle?
              </label>
            </div>

            <div className="flex items-center gap-5">
              <label className="flex items-center gap-2">
                <input
                  checked={fetchingExperience.licensedeniedstatus === 'yes'}
                  type="radio"
                  value="yes"
                  name="licensedenied"
                />
                YES
              </label>

              <label className="flex items-center gap-2">
                <input
                  checked={fetchingExperience.licensedeniedstatus === 'no'}
                  type="radio"
                  value="no"
                  name="licensedenied"
                />
                NO
              </label>
            </div>
          </div>

          <div>
            <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
              If Yes, Please explain
            </label>

            <textarea
              defaultValue={fetchingExperience.licensedeniedremarks}
              name="licensedeniedexplanation"
              rows="3"
              placeholder="Enter explanation"
              className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                Has any license, permit, or privilege ever been
                suspended or revoked?
              </label>
            </div>

            <div className="flex items-center gap-5">
              <label className="flex items-center gap-2">
                <input
                  checked={fetchingExperience.licensesuspendedstatus === 'yes'}
                  type="radio"
                  value="yes"
                  name="licensesuspended"
                />
                YES
              </label>

              <label className="flex items-center gap-2">
                <input
                  checked={fetchingExperience.licensesuspendedstatus === 'no'}
                  type="radio"
                  value="no"
                  name="licensesuspended"
                />
                NO
              </label>
            </div>
          </div>

          <div>
            <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
              If Yes, Please explain
            </label>

            <textarea
              defaultValue={fetchingExperience.licensesuspendedremarks}
              name="licensesuspendedexplanation"
              rows="3"
              placeholder="Enter explanation"
              className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* =====================================================
              BUTTONS
          ===================================================== */}

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <Link
              to="/company-dashboard/drivers"
              className="px-5 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className={`px-5 text-white rounded-lg py-2.5 text-sm font-medium transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#091122] hover:bg-slate-800"
              }`}
            >
              {loading ? "Saving..." : "Save Experience"}
            </button>
          </div>
        </form>

        {/* =====================================================
            SERVER MESSAGE
        ===================================================== */}

        {serverMessage && (
          <div
            className={`mt-3 mb-3 rounded-lg border px-3 py-2 text-sm text-center ${
              serverMessageType === "error"
                ? "text-red-500"
                : "text-green-600"
            }`}
            style={{ borderColor: "#091122" }}
          >
            {serverMessage}
          </div>
        )}
      </div>
    </div>
  );
}
