import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PanelFormInput from "@/components/admin/FormInput";
import api from "@/api/axios";

export default function AddCompany() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [serverMessageType, setServerMessageType] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role === "admin") {
      navigate("/admin-dashboard", { replace: true });
    } else if (role === "company") {
    } else {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const formData = new FormData(e.target);

    const data = {
      fname: formData.get("fname")?.trim() || "",
      mname: formData.get("mname")?.trim() || "",
      lname: formData.get("lname")?.trim() || "",
      activedate: formData.get("activedate")?.trim() || "",

      dob: formData.get("dob")?.trim() || "",
      phone: formData.get("phone")?.trim() || "",
      email: formData.get("email")?.trim() || "",
      drugnegativedate: formData.get("drugnegativedate")?.trim() || "",

      socialsecurity: formData.get("socialsecurity")?.trim() || "",
      appliedfor: formData.get("appliedfor")?.trim() || "",
      driverstatus: formData.get("driverstatus")?.trim() || "",
      pclearinghousedate: formData.get("pclearinghousedate")?.trim() || "",

      terminationdate: formData.get("terminationdate")?.trim() || "",
      emecontactno: formData.get("emecontactno")?.trim() || "",
      emecontactperson: formData.get("emecontactperson")?.trim() || "",
      reasonleavingortermination:
        formData.get("reasonleavingortermination")?.trim() || "",
      legalrightsyes: formData.get("legalrightsyes")?.trim() || "",
      legalrightsno: formData.get("legalrightsno")?.trim() || "",
      legalrightsstatus: formData.get("legalrightsstatus")?.trim() || "",
      workauthorization: formData.get("workauthorization")?.trim() || "",
      permituscisno: formData.get("permituscisno")?.trim() || "",
      permitexpdate: formData.get("permitexpdate")?.trim() || "",

      currentstreet: formData.get("currentstreet")?.trim() || "",
      currentcity: formData.get("currentcity")?.trim() || "",
      currentstate: formData.get("currentstate")?.trim() || "",
      currentzip: formData.get("currentzip")?.trim() || "",
      currentyear: formData.get("currentyear")?.trim() || "",

      mailingstreet: formData.get("mailingstreet")?.trim() || "",
      mailingcity: formData.get("mailingcity")?.trim() || "",
      mailingstate: formData.get("mailingstate")?.trim() || "",
      mailingzip: formData.get("mailingzip")?.trim() || "",
      mailingyear: formData.get("mailingyear")?.trim() || "",

      previousstreet: formData.get("previousstreet")?.trim() || "",
      previouscity: formData.get("previouscity")?.trim() || "",
      previousstate: formData.get("previousstate")?.trim() || "",
      previouszip: formData.get("previouszip")?.trim() || "",
      previousyear: formData.get("previousyear")?.trim() || "",

      currentcdlstate: formData.get("currentcdlstate")?.trim() || "",
      currentcdllicenseno: formData.get("currentcdllicenseno")?.trim() || "",
      currentcdlclass: formData.get("currentcdlclass")?.trim() || "",
      currentcdlendorsements:
        formData.get("currentcdlendorsements")?.trim() || "",
      currentcdlissuedate: formData.get("currentcdlissuedate")?.trim() || "",
      currentcdlexpdate: formData.get("currentcdlexpdate")?.trim() || "",

      oldcdlstate: formData.get("oldcdlstate")?.trim() || "",
      oldcdllicenseno: formData.get("oldcdllicenseno")?.trim() || "",
      oldcdlclass: formData.get("oldcdlclass")?.trim() || "",
      oldcdlendorsements: formData.get("oldcdlendorsements")?.trim() || "",
      oldcdlissuedate: formData.get("oldcdlissuedate")?.trim() || "",
      oldcdlexpdate: formData.get("oldcdlexpdate")?.trim() || "",


    };

    const newErrors = {};

    if (!data.fname) {
      newErrors.fname = "First name is required";
    }

    if (!data.lname) {
      newErrors.lname = "Last name is required";
    }

    if (!data.activedate) {
      newErrors.activedate = "Active date required";
    }

    if (!data.dob) {
      newErrors.dob = "Date of birth required";
    }

    if (!data.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(data.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!data.drugnegativedate) {
      // newErrors.drugnegativedate = "Drug test Neagtive Date required";
    }

    if (!data.socialsecurity) {
      newErrors.socialsecurity = "Social security required";
    }

    if (!data.pclearinghousedate) {
      newErrors.pclearinghousedate =
        "Pre-employment Clearing House Date required";
    }

    if (!data.terminationdate) {
      // newErrors.terminationdate = "Termination Date required";
    }

    if (!data.emecontactno) {
      newErrors.emecontactno = "Emergency contact no required";
    }

    if (!data.emecontactperson) {
      newErrors.emecontactperson = "Emergency contact person name required";
    }

    if (!data.permituscisno) {
      newErrors.permituscisno = "Work permit USCIS no required";
    }

    if (!data.permitexpdate) {
      newErrors.permitexpdate = "Work Permit Expiration Date required";
    }

    if (!data.currentcdlissuedate) {
      newErrors.currentcdlissuedate = "Current cdl issue date required";
    }

    if (!data.currentcdlexpdate) {
      newErrors.currentcdlexpdate = "Current cdl expiry date required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setServerMessage("");
    setLoading(true);

    try {
      const uploadData = new FormData();

      uploadData.append("fname", data.fname);
      uploadData.append("mname", data.mname);
      uploadData.append("lname", data.lname);
      uploadData.append("activedate", data.activedate);
      uploadData.append("dob", data.dob);
      uploadData.append("phone", data.phone);
      uploadData.append("email", data.email);
      uploadData.append("drugnegativedate", data.drugnegativedate);
      uploadData.append("socialsecurity", data.socialsecurity);
      uploadData.append("appliedfor", data.appliedfor);
      uploadData.append("driverstatus", data.driverstatus);
      uploadData.append("pclearinghousedate", data.pclearinghousedate);

      uploadData.append("terminationdate", data.terminationdate);
      uploadData.append("emecontactno", data.emecontactno);
      uploadData.append("emecontactperson", data.emecontactperson);
      uploadData.append(
        "reasonleavingortermination",
        data.reasonleavingortermination,
      );
      uploadData.append("legalrightsyes", data.legalrightsyes);
      uploadData.append("legalrightsno", data.legalrightsno);
      uploadData.append("legalrightsstatus", data.legalrightsstatus);
      uploadData.append("workauthorization", data.workauthorization);
      uploadData.append("permituscisno", data.permituscisno);
      uploadData.append("permitexpdate", data.permitexpdate);

      uploadData.append("currentstreet", data.currentstreet);
      uploadData.append("currentcity", data.currentcity);
      uploadData.append("currentstate", data.currentstate);
      uploadData.append("currentzip", data.currentzip);
      uploadData.append("currentyear", data.currentyear);

      uploadData.append("mailingstreet", data.mailingstreet);
      uploadData.append("mailingcity", data.mailingcity);
      uploadData.append("mailingstate", data.mailingstate);
      uploadData.append("mailingzip", data.mailingzip);
      uploadData.append("mailingyear", data.mailingyear);

      uploadData.append("previousstreet", data.previousstreet);
      uploadData.append("previouscity", data.previouscity);
      uploadData.append("previousstate", data.previousstate);
      uploadData.append("previouszip", data.previouszip);
      uploadData.append("previousyear", data.previousyear);

      uploadData.append("currentcdlstate", data.currentcdlstate);
      uploadData.append("currentcdllicenseno", data.currentcdllicenseno);
      uploadData.append("currentcdlclass", data.currentcdlclass);
      uploadData.append("currentcdlendorsements", data.currentcdlendorsements);
      uploadData.append("currentcdlissuedate", data.currentcdlissuedate);
      uploadData.append("currentcdlexpdate", data.currentcdlexpdate);

      uploadData.append("oldcdlstate", data.oldcdlstate);
      uploadData.append("oldcdllicenseno", data.oldcdllicenseno);
      uploadData.append("oldcdlclass", data.oldcdlclass);
      uploadData.append("oldcdlendorsements", data.oldcdlendorsements);
      uploadData.append("oldcdlissuedate", data.oldcdlissuedate);
      uploadData.append("oldcdlexpdate", data.oldcdlexpdate);
      uploadData.append(
        "cname",
        JSON.parse(localStorage.getItem("user"))?.name,
      );
      uploadData.append(
        "company_id",
        JSON.parse(localStorage.getItem("user"))?.id,
      );

      const response = await api.post("/company/driver/add", uploadData);

      const result = response.data;

      console.log("SUCCESS:", result);

      setServerMessage(result.message || "Driver added successfully");

      setServerMessageType("success");

      navigate("/company-dashboard/drivers", {
        replace: true,
      });
    } catch (error) {
      console.error("ERROR:", error);

      const message = error.response?.data?.message || "Something went wrong.";

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
          <h1 className="text-2xl font-bold text-slate-900">Add Driver</h1>
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
          className="space-y-5"
          encType="multipart/form-data"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <PanelFormInput
              title="first name"
              placeholder="enter first name"
              mandate={true}
              inputype="text"
              name="fname"
              errormsg={errors.fname}
            />

            <PanelFormInput
              title="middle name"
              placeholder="enter middle name"
              mandate={false}
              inputype="text"
              name="mname"
              errormsg={errors.mname}
            />

            <PanelFormInput
              title="last name"
              placeholder="enter last name"
              mandate={true}
              inputype="text"
              name="lname"
              errormsg={errors.lname}
            />

            <PanelFormInput
              title="Active date"
              placeholder=""
              mandate={true}
              inputype="date"
              name="activedate"
              errormsg={errors.activedate}
            />
          </div>
          <br />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <PanelFormInput
              title="dob (date of Birth)"
              placeholder="enter first name"
              mandate={true}
              inputype="date"
              name="dob"
              errormsg={errors.dob}
            />

            <PanelFormInput
              title="phone"
              placeholder="enter middle name"
              mandate={true}
              inputype="text"
              name="phone"
              errormsg={errors.phone}
            />

            <PanelFormInput
              title="email"
              placeholder="enter email address"
              mandate={true}
              inputype="text"
              name="email"
              errormsg={errors.email}
            />

            <PanelFormInput
              title="Drug test Neagtive Date"
              placeholder=""
              mandate={false}
              inputype="date"
              name="drugnegativedate"
              errormsg={errors.drugnegativedate}
            />
          </div>
          <br />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <PanelFormInput
              title="SOCIAL SECURITY"
              placeholder="enter SOCIAL SECURITY"
              mandate={true}
              inputype="text"
              name="socialsecurity"
              errormsg={errors.socialsecurity}
            />

            <div>
              <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                POSITION APPLIED FOR
              </label>
              <select
                name="appliedfor"

                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none"
              >
                <option value="driver">DRIVER</option>
              </select>
            </div>

            <div>
              <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                Driver Status
              </label>
              <select
                name="driverstatus"

                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none"
              >
                <option value="active">ACTIVE</option>
                <option value="insurance approved">INSURANCE APPROVED</option>
                <option value="pending">PENDING</option>
                <option value="terminated">TERMINATED</option>
              </select>
            </div>

            <PanelFormInput
              title="Pre-employment Cle-House Date"
              placeholder=""
              mandate={true}
              inputype="date"
              name="pclearinghousedate"
              errormsg={errors.pclearinghousedate}
            />
          </div>
          <br />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <PanelFormInput
              title="Termination Date"
              placeholder="enter SOCIAL SECURITY"
              mandate={false}
              inputype="date"
              name="terminationdate"
              errormsg={errors.terminationdate}
            />

            <PanelFormInput
              title="Emergency COntact no"
              placeholder="Emergency COntact no"
              mandate={true}
              inputype="text"
              name="emecontactno"
              errormsg={errors.emecontactno}
            />

            <PanelFormInput
              title="Emergency COntact person name"
              placeholder="Emergency COntact person name"
              mandate={true}
              inputype="text"
              name="emecontactperson"
              errormsg={errors.emecontactperson}
            />
          </div>
          <br />

          <div>
            <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
              Reason For Leaving / Termination
            </label>
            <textarea
              name="reasonleavingortermination"
              rows="3"
              placeholder="ENTER Reason For Leaving / Termination"
              className="cap w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                Do you have legal right to work in the United States?
              </label>
            </div>
            <div>
              <input value="1" type="checkbox" name="legalrightsstatus" /> YES{" "}
              <input type="checkbox" value="0" name="legalrightsstatus" /> NO
            </div>
          </div>
          <br />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                WORK AUTHORIZATION
              </label>
              <select
                name="workauthorization"

                className="cap w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none"
              >
                <option value="CITIZEN">CITIZEN</option>
                <option value="PR/GREEN CARD">PR/GREEN CARD</option>
                <option value="WORK PERMIT">WORK PERMIT</option>
              </select>
            </div>

            <PanelFormInput
              title="WORK PERMIT USCIS NO"
              placeholder="enter WORK PERMIT USCIS NO"
              mandate={true}
              inputype="text"
              name="permituscisno"
              errormsg={errors.permituscisno}
            />

            <PanelFormInput
              title="Work Permit Expiration Date"
              placeholder="enter Driver Status"
              mandate={true}
              inputype="date"
              name="permitexpdate"
              errormsg={errors.permitexpdate}
            />
          </div>

          <p>PREVIOUS THREE YEARS RESIDENCY : </p>
          <div className="bg-white rounded-xl border border-slate-200 p-2">
            <p className="mb-2">CURRENT ADDRESS</p>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <PanelFormInput
                title="STREET"
                placeholder="enter STREET"
                mandate={false}
                inputype="text"
                name="currentstreet"
                errormsg={errors.currentstreet}
              />

              <PanelFormInput
                title="CITY"
                placeholder="enter city"
                mandate={false}
                inputype="text"
                name="currentcity"
                errormsg={errors.currentcity}
              />

              <PanelFormInput
                title="STATE"
                placeholder="enter STATE"
                mandate={false}
                inputype="text"
                name="currentstate"
                errormsg={errors.currentstate}
              />

              <PanelFormInput
                title="ZIPCODE"
                placeholder="enter ZIPCODE"
                mandate={false}
                inputype="text"
                name="currentzip"
                errormsg={errors.currentzip}
              />

              <PanelFormInput
                title="#OF YEARS AT ADDRESS"
                placeholder="enter years"
                mandate={false}
                inputype="text"
                name="currentyear"
                errormsg={errors.currentyear}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-2">
            <p className="mb-2">MAILING ADDRESS</p>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <PanelFormInput
                title="STREET"
                placeholder="enter STREET"
                mandate={false}
                inputype="text"
                name="mailingstreet"
                errormsg={errors.mailingstreet}
              />

              <PanelFormInput
                title="CITY"
                placeholder="enter city"
                mandate={false}
                inputype="text"
                name="mailingcity"
                errormsg={errors.mailingcity}
              />

              <PanelFormInput
                title="STATE"
                placeholder="enter STATE"
                mandate={false}
                inputype="text"
                name="mailingstate"
                errormsg={errors.mailingstate}
              />

              <PanelFormInput
                title="ZIPCODE"
                placeholder="enter ZIPCODE"
                mandate={false}
                inputype="text"
                name="mailingzip"
                errormsg={errors.mailingzip}
              />

              <PanelFormInput
                title="#OF YEARS AT ADDRESS"
                placeholder="enter years"
                mandate={false}
                inputype="text"
                name="mailingyear"
                errormsg={errors.mailingyear}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-2">
            <p className="mb-2">PREVIOUS ADDRESS</p>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <PanelFormInput
                title="STREET"
                placeholder="enter STREET"
                mandate={false}
                inputype="text"
                name="previousstreet"
                errormsg={errors.previousstreet}
              />

              <PanelFormInput
                title="CITY"
                placeholder="enter city"
                mandate={false}
                inputype="text"
                name="previouscity"
                errormsg={errors.previouscity}
              />

              <PanelFormInput
                title="STATE"
                placeholder="enter STATE"
                mandate={false}
                inputype="text"
                name="previousstate"
                errormsg={errors.previousstate}
              />

              <PanelFormInput
                title="ZIPCODE"
                placeholder="enter ZIPCODE"
                mandate={false}
                inputype="text"
                name="previouszip"
                errormsg={errors.previouszip}
              />

              <PanelFormInput
                title="#OF YEARS AT ADDRESS"
                placeholder="enter years"
                mandate={false}
                inputype="text"
                name="previousyear"
                errormsg={errors.previousyear}
              />
            </div>
          </div>

          <p>LICENSE INFORMATION : </p>
          <div className="bg-white rounded-xl border border-slate-200 p-2">
            <p className="mb-2">CURRENT CDL</p>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
              <PanelFormInput
                title="STATE "
                placeholder="enter STATE "
                mandate={false}
                inputype="text"
                name="currentcdlstate"
                errormsg={errors.currentcdlstate}
              />

              <PanelFormInput
                title="LICENSE NO"
                placeholder="enter LICENSE NO"
                mandate={true}
                inputype="text"
                name="currentcdllicenseno"
                errormsg={errors.currentcdllicenseno}
              />

              <div>
                <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                  TYPE/CLASS
                </label>
                <select
                  name="currentcdlclass"

                  className="cap w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none"
                >
                  <option value="A">A</option>
                </select>
              </div>

              <div>
                <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                  ENDORSEMENTS
                </label>
                <select
                  name="currentcdlendorsements"

                  className="cap w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none"
                >
                  <option value="Hazmat (H)">Hazmat (H)</option>
                  <option value="Tanker (N)">Tanker (N)</option>
                  <option value="Double/Triple Trailers (T)">
                    Double/Triple Trailers (T)
                  </option>
                  <option value="Combination Hazmat and Tanker (X)">
                    Combination Hazmat and Tanker (X)
                  </option>
                  <option value="None">None</option>
                </select>
              </div>

              <PanelFormInput
                title="ISSUE DATE"
                placeholder="enter years"
                mandate={true}
                inputype="date"
                name="currentcdlissuedate"
                errormsg={errors.currentcdlissuedate}
              />

              <PanelFormInput
                title="EXPIRATION DATE"
                placeholder="enter years"
                mandate={true}
                inputype="date"
                name="currentcdlexpdate"
                errormsg={errors.currentcdlexpdate}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-2">
            <p className="mb-2">OLD CDL</p>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
              <PanelFormInput
                title="STATE "
                placeholder="enter STATE "
                mandate={false}
                inputype="text"
                name="oldcdlstate"
                errormsg={errors.oldcdlstate}
              />

              <PanelFormInput
                title="LICENSE NO"
                placeholder="enter LICENSE NO"
                mandate={true}
                inputype="text"
                name="oldcdllicenseno"
                errormsg={errors.oldcdllicenseno}
              />

              <div>
                <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                  TYPE/CLASS
                </label>
                <select
                  name="oldcdlclass"

                  className="cap w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none"
                >
                  <option value="A">A</option>
                </select>
              </div>

              <div>
                <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                  ENDORSEMENTS
                </label>
                <select
                  name="oldcdlendorsements"

                  className="cap w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none"
                >
                  <option value="Hazmat (H)">Hazmat (H)</option>
                  <option value="Tanker (N)">Tanker (N)</option>
                  <option value="Double/Triple Trailers (T)">
                    Double/Triple Trailers (T)
                  </option>
                  <option value="Combination Hazmat and Tanker (X)">
                    Combination Hazmat and Tanker (X)
                  </option>
                  <option value="None">None</option>
                </select>
              </div>

              <PanelFormInput
                title="ISSUE DATE"
                placeholder="enter years"
                mandate={false}
                inputype="date"
                name="oldcdlissuedate"
                errormsg={errors.oldcdlissuedate}
              />

              <PanelFormInput
                title="EXPIRATION DATE"
                placeholder="enter years"
                mandate={false}
                inputype="date"
                name="oldcdlexpdate"
                errormsg={errors.oldcdlexpdate}
              />
            </div>
          </div>

          {/* ================= BUTTONS ================= */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <Link
              to="/admin-dashboard/company"
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
              {loading ? "Saving..." : "Save Driver"}
            </button>
          </div>
        </form>

        {/* ================= SERVER MESSAGE ================= */}
        {serverMessage && (
          <div
            className={`mt-3 mb-3 rounded-lg border px-3 py-2 text-sm text-center ${
              serverMessageType === "error" ? "text-red-500" : "text-green-600"
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
