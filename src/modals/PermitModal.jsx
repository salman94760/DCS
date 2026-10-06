import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Input from "@/components/forms/Input";
import api from "@/api/axios";
import { useDcsContext } from "@/context/Context";
const PermitModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [serverMessageType, setServerMessageType] = useState("");
 
  const {
    state,
    fetchAllData,
    error,
    filters,
    setFilters,
    resetFilters,
  } = useDcsContext();

  useEffect(() => {
    const role = localStorage.getItem("userRole");

    if (!role) {
      navigate("/login", { replace: true });
      return;
    }

    if (role !== "permit") {
      navigate(`/${role}-dashboard`, { replace: true });
      return;
    }
    fetchAllData("/admin/company", { type: "permit" });
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const formData = new FormData(e.target);

    const data = {
      companyId: formData.get("companyId")?.trim() || "",
      permitName: formData.get("permitName")?.trim() || "",
      jurisdiction: formData.get("jurisdiction")?.trim() || "",
      assignto: formData.get("assignto")?.trim() || "",
      status: formData.get("status")?.trim() || "",
      expirydate: formData.get("expirydate")?.trim() || "",
      servicefee: formData.get("servicefee")?.trim() || "",
      govfee: formData.get("govfee")?.trim() || "",
      processingfee: formData.get("processingfee")?.trim() || "",
      discount: formData.get("discount")?.trim() || "",
      docremarks: formData.get("docremarks")?.trim() || "",
      notes: formData.get("notes")?.trim() || "",
    };

    const newErrors = {};

    if (!data.companyId) {
      newErrors.companyId = "Company name is required";
    }

    if (!data.permitName) {
      newErrors.permitName = "Permit name is required";
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

      uploadData.append("companyId", data.companyId);
      uploadData.append("permitname", data.permitName);
      uploadData.append("jurisdiction", data.jurisdiction);
      uploadData.append("assignto", data.assignto);
      uploadData.append("status", data.status);
      uploadData.append("expirydate", data.expirydate);
      uploadData.append("servicefee", data.servicefee);
      uploadData.append("govfee", data.govfee);
      uploadData.append("processingfee", data.processingfee);
      uploadData.append("discount", data.discount);
      uploadData.append("docremarks", data.docremarks);
      uploadData.append("notes", data.notes);

      const response = await api.post("/admin/permit/add", uploadData);

      const result = response.data;

      setServerMessage(result.message || "Company added successfully");

      setServerMessageType("success");
      e.target.reset();
      setErrors({});
      navigate("/permit-dashboard/permit-application", {
        replace: true,
      });
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong.";

      setServerMessage(message);
      setServerMessageType("error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4">
      <div className="dialog relative w-full rounded-xl bg-white p-6 shadow-2xl">
        <h2 className="text-xl font-semibold text-gray-900">
          New Permit Application
        </h2>
        <p className="color-[#697786] text-[12px]">
          Fees can be adjusted for the specific filing before saving.
        </p>

        {/* Your form */}
        <div className="mt-6">
          <div>
            <form onSubmit={handleSubmit}>
              <div class="formgrid1">
                <div class="field">
                  <label>Company *</label>
                  <select name="companyId">
                    {
                      state?.data?.map((com,index)=>{
                        return (
                           <option value={com.user_id}>{com.cname}</option>
                        );
                      })
                    }
                   
                  </select>
                  {errors.companyId && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.companyId}
                    </p>
                  )}
                </div>
                <div class="field">
                  <input type="hidden" name="companytype" value="permit" />
                  <label>Permit / Service *</label>
                  <select
                    name="permitName"
                    id="appPermitSelect"
                    onchange="syncPermitFields()"
                  >
                    <option selected="">USDOT Number</option>
                    <option>FMCSA Operating Authority (MC/FF/MX)</option>
                    <option>BOC-3</option>
                    <option>UCR</option>
                    <option>IRP Apportioned Registration</option>
                    <option>IFTA License &amp; Decals</option>
                    <option>IRS Form 2290 HVUT</option>
                    <option>PHMSA Hazmat Registration</option>
                    <option>FMCSA Hazmat Safety Permit</option>
                    <option>SCAC</option>
                    <option>Temporary Trip Permit</option>
                    <option>Temporary Fuel Permit</option>
                    <option>California Motor Carrier Permit (MCP)</option>
                    <option>CA Number</option>
                    <option>Employer Pull Notice (EPN)</option>
                    <option>Connecticut Highway Use Fee</option>
                    <option>Kentucky KYU</option>
                    <option>New Mexico Weight Distance Tax</option>
                    <option>New York HUT</option>
                    <option>Oregon Weight-Mile</option>
                    <option>Texas Motor Carrier Registration</option>
                    <option>Pennsylvania PUC Authority</option>
                    <option>Washington Intrastate Authority</option>
                    <option>Virginia Intrastate Authority</option>
                    <option>Ohio PUCO Carrier Requirements</option>
                    <option>Alabama Oversize / Overweight Permit</option>
                    <option>Alabama Temporary Trip Permit</option>
                    <option>Alabama Temporary Fuel Permit</option>
                    <option>
                      Alabama Intrastate / Specialty Authority Review
                    </option>
                    <option>Alabama Hazmat / Routing Permit Review</option>
                    <option>Alaska Oversize / Overweight Permit</option>
                    <option>Alaska Temporary Trip Permit</option>
                    <option>Alaska Temporary Fuel Permit</option>
                    <option>
                      Alaska Intrastate / Specialty Authority Review
                    </option>
                    <option>Alaska Hazmat / Routing Permit Review</option>
                    <option>Arizona Oversize / Overweight Permit</option>
                    <option>Arizona Temporary Trip Permit</option>
                    <option>Arizona Temporary Fuel Permit</option>
                    <option>
                      Arizona Intrastate / Specialty Authority Review
                    </option>
                    <option>Arizona Hazmat / Routing Permit Review</option>
                    <option>Arkansas Oversize / Overweight Permit</option>
                    <option>Arkansas Temporary Trip Permit</option>
                    <option>Arkansas Temporary Fuel Permit</option>
                    <option>
                      Arkansas Intrastate / Specialty Authority Review
                    </option>
                    <option>Arkansas Hazmat / Routing Permit Review</option>
                    <option>California Oversize / Overweight Permit</option>
                    <option>California Temporary Trip Permit</option>
                    <option>California Temporary Fuel Permit</option>
                    <option>
                      California Intrastate / Specialty Authority Review
                    </option>
                    <option>California Hazmat / Routing Permit Review</option>
                    <option>Colorado Oversize / Overweight Permit</option>
                    <option>Colorado Temporary Trip Permit</option>
                    <option>Colorado Temporary Fuel Permit</option>
                    <option>
                      Colorado Intrastate / Specialty Authority Review
                    </option>
                    <option>Colorado Hazmat / Routing Permit Review</option>
                    <option>Connecticut Oversize / Overweight Permit</option>
                    <option>Connecticut Temporary Trip Permit</option>
                    <option>Connecticut Temporary Fuel Permit</option>
                    <option>
                      Connecticut Intrastate / Specialty Authority Review
                    </option>
                    <option>Connecticut Hazmat / Routing Permit Review</option>
                    <option>Delaware Oversize / Overweight Permit</option>
                    <option>Delaware Temporary Trip Permit</option>
                    <option>Delaware Temporary Fuel Permit</option>
                    <option>
                      Delaware Intrastate / Specialty Authority Review
                    </option>
                    <option>Delaware Hazmat / Routing Permit Review</option>
                    <option>
                      District of Columbia Oversize / Overweight Permit
                    </option>
                    <option>District of Columbia Temporary Trip Permit</option>
                    <option>District of Columbia Temporary Fuel Permit</option>
                    <option>
                      District of Columbia Intrastate / Specialty Authority
                      Review
                    </option>
                    <option>
                      District of Columbia Hazmat / Routing Permit Review
                    </option>
                    <option>Florida Oversize / Overweight Permit</option>
                    <option>Florida Temporary Trip Permit</option>
                    <option>Florida Temporary Fuel Permit</option>
                    <option>
                      Florida Intrastate / Specialty Authority Review
                    </option>
                    <option>Florida Hazmat / Routing Permit Review</option>
                    <option>Georgia Oversize / Overweight Permit</option>
                    <option>Georgia Temporary Trip Permit</option>
                    <option>Georgia Temporary Fuel Permit</option>
                    <option>
                      Georgia Intrastate / Specialty Authority Review
                    </option>
                    <option>Georgia Hazmat / Routing Permit Review</option>
                    <option>Hawaii Oversize / Overweight Permit</option>
                    <option>Hawaii Temporary Trip Permit</option>
                    <option>Hawaii Temporary Fuel Permit</option>
                    <option>
                      Hawaii Intrastate / Specialty Authority Review
                    </option>
                    <option>Hawaii Hazmat / Routing Permit Review</option>
                    <option>Idaho Oversize / Overweight Permit</option>
                    <option>Idaho Temporary Trip Permit</option>
                    <option>Idaho Temporary Fuel Permit</option>
                    <option>
                      Idaho Intrastate / Specialty Authority Review
                    </option>
                    <option>Idaho Hazmat / Routing Permit Review</option>
                    <option>Illinois Oversize / Overweight Permit</option>
                    <option>Illinois Temporary Trip Permit</option>
                    <option>Illinois Temporary Fuel Permit</option>
                    <option>
                      Illinois Intrastate / Specialty Authority Review
                    </option>
                    <option>Illinois Hazmat / Routing Permit Review</option>
                    <option>Indiana Oversize / Overweight Permit</option>
                    <option>Indiana Temporary Trip Permit</option>
                    <option>Indiana Temporary Fuel Permit</option>
                    <option>
                      Indiana Intrastate / Specialty Authority Review
                    </option>
                    <option>Indiana Hazmat / Routing Permit Review</option>
                    <option>Iowa Oversize / Overweight Permit</option>
                    <option>Iowa Temporary Trip Permit</option>
                    <option>Iowa Temporary Fuel Permit</option>
                    <option>
                      Iowa Intrastate / Specialty Authority Review
                    </option>
                    <option>Iowa Hazmat / Routing Permit Review</option>
                    <option>Kansas Oversize / Overweight Permit</option>
                    <option>Kansas Temporary Trip Permit</option>
                    <option>Kansas Temporary Fuel Permit</option>
                    <option>
                      Kansas Intrastate / Specialty Authority Review
                    </option>
                    <option>Kansas Hazmat / Routing Permit Review</option>
                    <option>Kentucky Oversize / Overweight Permit</option>
                    <option>Kentucky Temporary Trip Permit</option>
                    <option>Kentucky Temporary Fuel Permit</option>
                    <option>
                      Kentucky Intrastate / Specialty Authority Review
                    </option>
                    <option>Kentucky Hazmat / Routing Permit Review</option>
                    <option>Louisiana Oversize / Overweight Permit</option>
                    <option>Louisiana Temporary Trip Permit</option>
                    <option>Louisiana Temporary Fuel Permit</option>
                    <option>
                      Louisiana Intrastate / Specialty Authority Review
                    </option>
                    <option>Louisiana Hazmat / Routing Permit Review</option>
                    <option>Maine Oversize / Overweight Permit</option>
                    <option>Maine Temporary Trip Permit</option>
                    <option>Maine Temporary Fuel Permit</option>
                    <option>
                      Maine Intrastate / Specialty Authority Review
                    </option>
                    <option>Maine Hazmat / Routing Permit Review</option>
                    <option>Maryland Oversize / Overweight Permit</option>
                    <option>Maryland Temporary Trip Permit</option>
                    <option>Maryland Temporary Fuel Permit</option>
                    <option>
                      Maryland Intrastate / Specialty Authority Review
                    </option>
                    <option>Maryland Hazmat / Routing Permit Review</option>
                    <option>Massachusetts Oversize / Overweight Permit</option>
                    <option>Massachusetts Temporary Trip Permit</option>
                    <option>Massachusetts Temporary Fuel Permit</option>
                    <option>
                      Massachusetts Intrastate / Specialty Authority Review
                    </option>
                    <option>
                      Massachusetts Hazmat / Routing Permit Review
                    </option>
                    <option>Michigan Oversize / Overweight Permit</option>
                    <option>Michigan Temporary Trip Permit</option>
                    <option>Michigan Temporary Fuel Permit</option>
                    <option>
                      Michigan Intrastate / Specialty Authority Review
                    </option>
                    <option>Michigan Hazmat / Routing Permit Review</option>
                    <option>Minnesota Oversize / Overweight Permit</option>
                    <option>Minnesota Temporary Trip Permit</option>
                    <option>Minnesota Temporary Fuel Permit</option>
                    <option>
                      Minnesota Intrastate / Specialty Authority Review
                    </option>
                    <option>Minnesota Hazmat / Routing Permit Review</option>
                    <option>Mississippi Oversize / Overweight Permit</option>
                    <option>Mississippi Temporary Trip Permit</option>
                    <option>Mississippi Temporary Fuel Permit</option>
                    <option>
                      Mississippi Intrastate / Specialty Authority Review
                    </option>
                    <option>Mississippi Hazmat / Routing Permit Review</option>
                    <option>Missouri Oversize / Overweight Permit</option>
                    <option>Missouri Temporary Trip Permit</option>
                    <option>Missouri Temporary Fuel Permit</option>
                    <option>
                      Missouri Intrastate / Specialty Authority Review
                    </option>
                    <option>Missouri Hazmat / Routing Permit Review</option>
                    <option>Montana Oversize / Overweight Permit</option>
                    <option>Montana Temporary Trip Permit</option>
                    <option>Montana Temporary Fuel Permit</option>
                    <option>
                      Montana Intrastate / Specialty Authority Review
                    </option>
                    <option>Montana Hazmat / Routing Permit Review</option>
                    <option>Nebraska Oversize / Overweight Permit</option>
                    <option>Nebraska Temporary Trip Permit</option>
                    <option>Nebraska Temporary Fuel Permit</option>
                    <option>
                      Nebraska Intrastate / Specialty Authority Review
                    </option>
                    <option>Nebraska Hazmat / Routing Permit Review</option>
                    <option>Nevada Oversize / Overweight Permit</option>
                    <option>Nevada Temporary Trip Permit</option>
                    <option>Nevada Temporary Fuel Permit</option>
                    <option>
                      Nevada Intrastate / Specialty Authority Review
                    </option>
                    <option>Nevada Hazmat / Routing Permit Review</option>
                    <option>New Hampshire Oversize / Overweight Permit</option>
                    <option>New Hampshire Temporary Trip Permit</option>
                    <option>New Hampshire Temporary Fuel Permit</option>
                    <option>
                      New Hampshire Intrastate / Specialty Authority Review
                    </option>
                    <option>
                      New Hampshire Hazmat / Routing Permit Review
                    </option>
                    <option>New Jersey Oversize / Overweight Permit</option>
                    <option>New Jersey Temporary Trip Permit</option>
                    <option>New Jersey Temporary Fuel Permit</option>
                    <option>
                      New Jersey Intrastate / Specialty Authority Review
                    </option>
                    <option>New Jersey Hazmat / Routing Permit Review</option>
                    <option>New Mexico Oversize / Overweight Permit</option>
                    <option>New Mexico Temporary Trip Permit</option>
                    <option>New Mexico Temporary Fuel Permit</option>
                    <option>
                      New Mexico Intrastate / Specialty Authority Review
                    </option>
                    <option>New Mexico Hazmat / Routing Permit Review</option>
                    <option>New York Oversize / Overweight Permit</option>
                    <option>New York Temporary Trip Permit</option>
                    <option>New York Temporary Fuel Permit</option>
                    <option>
                      New York Intrastate / Specialty Authority Review
                    </option>
                    <option>New York Hazmat / Routing Permit Review</option>
                    <option>North Carolina Oversize / Overweight Permit</option>
                    <option>North Carolina Temporary Trip Permit</option>
                    <option>North Carolina Temporary Fuel Permit</option>
                    <option>
                      North Carolina Intrastate / Specialty Authority Review
                    </option>
                    <option>
                      North Carolina Hazmat / Routing Permit Review
                    </option>
                    <option>North Dakota Oversize / Overweight Permit</option>
                    <option>North Dakota Temporary Trip Permit</option>
                    <option>North Dakota Temporary Fuel Permit</option>
                    <option>
                      North Dakota Intrastate / Specialty Authority Review
                    </option>
                    <option>North Dakota Hazmat / Routing Permit Review</option>
                    <option>Ohio Oversize / Overweight Permit</option>
                    <option>Ohio Temporary Trip Permit</option>
                    <option>Ohio Temporary Fuel Permit</option>
                    <option>
                      Ohio Intrastate / Specialty Authority Review
                    </option>
                    <option>Ohio Hazmat / Routing Permit Review</option>
                    <option>Oklahoma Oversize / Overweight Permit</option>
                    <option>Oklahoma Temporary Trip Permit</option>
                    <option>Oklahoma Temporary Fuel Permit</option>
                    <option>
                      Oklahoma Intrastate / Specialty Authority Review
                    </option>
                    <option>Oklahoma Hazmat / Routing Permit Review</option>
                    <option>Oregon Oversize / Overweight Permit</option>
                    <option>Oregon Temporary Trip Permit</option>
                    <option>Oregon Temporary Fuel Permit</option>
                    <option>
                      Oregon Intrastate / Specialty Authority Review
                    </option>
                    <option>Oregon Hazmat / Routing Permit Review</option>
                    <option>Pennsylvania Oversize / Overweight Permit</option>
                    <option>Pennsylvania Temporary Trip Permit</option>
                    <option>Pennsylvania Temporary Fuel Permit</option>
                    <option>
                      Pennsylvania Intrastate / Specialty Authority Review
                    </option>
                    <option>Pennsylvania Hazmat / Routing Permit Review</option>
                    <option>Rhode Island Oversize / Overweight Permit</option>
                    <option>Rhode Island Temporary Trip Permit</option>
                    <option>Rhode Island Temporary Fuel Permit</option>
                    <option>
                      Rhode Island Intrastate / Specialty Authority Review
                    </option>
                    <option>Rhode Island Hazmat / Routing Permit Review</option>
                    <option>South Carolina Oversize / Overweight Permit</option>
                    <option>South Carolina Temporary Trip Permit</option>
                    <option>South Carolina Temporary Fuel Permit</option>
                    <option>
                      South Carolina Intrastate / Specialty Authority Review
                    </option>
                    <option>
                      South Carolina Hazmat / Routing Permit Review
                    </option>
                    <option>South Dakota Oversize / Overweight Permit</option>
                    <option>South Dakota Temporary Trip Permit</option>
                    <option>South Dakota Temporary Fuel Permit</option>
                    <option>
                      South Dakota Intrastate / Specialty Authority Review
                    </option>
                    <option>South Dakota Hazmat / Routing Permit Review</option>
                    <option>Tennessee Oversize / Overweight Permit</option>
                    <option>Tennessee Temporary Trip Permit</option>
                    <option>Tennessee Temporary Fuel Permit</option>
                    <option>
                      Tennessee Intrastate / Specialty Authority Review
                    </option>
                    <option>Tennessee Hazmat / Routing Permit Review</option>
                    <option>Texas Oversize / Overweight Permit</option>
                    <option>Texas Temporary Trip Permit</option>
                    <option>Texas Temporary Fuel Permit</option>
                    <option>
                      Texas Intrastate / Specialty Authority Review
                    </option>
                    <option>Texas Hazmat / Routing Permit Review</option>
                    <option>Utah Oversize / Overweight Permit</option>
                    <option>Utah Temporary Trip Permit</option>
                    <option>Utah Temporary Fuel Permit</option>
                    <option>
                      Utah Intrastate / Specialty Authority Review
                    </option>
                    <option>Utah Hazmat / Routing Permit Review</option>
                    <option>Vermont Oversize / Overweight Permit</option>
                    <option>Vermont Temporary Trip Permit</option>
                    <option>Vermont Temporary Fuel Permit</option>
                    <option>
                      Vermont Intrastate / Specialty Authority Review
                    </option>
                    <option>Vermont Hazmat / Routing Permit Review</option>
                    <option>Virginia Oversize / Overweight Permit</option>
                    <option>Virginia Temporary Trip Permit</option>
                    <option>Virginia Temporary Fuel Permit</option>
                    <option>
                      Virginia Intrastate / Specialty Authority Review
                    </option>
                    <option>Virginia Hazmat / Routing Permit Review</option>
                    <option>Washington Oversize / Overweight Permit</option>
                    <option>Washington Temporary Trip Permit</option>
                    <option>Washington Temporary Fuel Permit</option>
                    <option>
                      Washington Intrastate / Specialty Authority Review
                    </option>
                    <option>Washington Hazmat / Routing Permit Review</option>
                    <option>West Virginia Oversize / Overweight Permit</option>
                    <option>West Virginia Temporary Trip Permit</option>
                    <option>West Virginia Temporary Fuel Permit</option>
                    <option>
                      West Virginia Intrastate / Specialty Authority Review
                    </option>
                    <option>
                      West Virginia Hazmat / Routing Permit Review
                    </option>
                    <option>Wisconsin Oversize / Overweight Permit</option>
                    <option>Wisconsin Temporary Trip Permit</option>
                    <option>Wisconsin Temporary Fuel Permit</option>
                    <option>
                      Wisconsin Intrastate / Specialty Authority Review
                    </option>
                    <option>Wisconsin Hazmat / Routing Permit Review</option>
                    <option>Wyoming Oversize / Overweight Permit</option>
                    <option>Wyoming Temporary Trip Permit</option>
                    <option>Wyoming Temporary Fuel Permit</option>
                    <option>
                      Wyoming Intrastate / Specialty Authority Review
                    </option>
                    <option>Wyoming Hazmat / Routing Permit Review</option>
                  </select>
                  {errors.permitName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.permitName}
                    </p>
                  )}
                </div>
                <Input
                  label="Jurisdiction"
                  mandate={false}
                  inputType="text"
                  name="jurisdiction"
                  value="Federal / Multi-State"
                  errormsg=""
                />
                <Input
                  label="Assigned To"
                  mandate={false}
                  inputType="text"
                  name="assignto"
                  value=""
                  errormsg=""
                />
                <div class="field">
                  <label>Status</label>
                  <select name="status">
                    <option value="Documents Needed">Documents Needed</option>
                    <option value="Ready to File">Ready to File</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Waiting on Agency">Waiting on Agency</option>
                    <option value="Approved">Approved</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
                <Input
                  label="Expiration Date"
                  mandate={false}
                  inputType="date"
                  name="expirydate"
                  value=""
                  errormsg=""
                />
                <Input
                  label="Service Fee"
                  mandate={false}
                  inputType="number"
                  name="servicefee"
                  value=""
                  errormsg=""
                />
                <Input
                  label="Government / State Fee"
                  mandate={false}
                  inputType="number"
                  name="govfee"
                  value=""
                  errormsg=""
                />
                <Input
                  label="Processing / Other Fee"
                  mandate={false}
                  inputType="number"
                  name="processing"
                  value=""
                  errormsg=""
                />
                <Input
                  label="Discount"
                  mandate={false}
                  inputType="number"
                  name="document"
                  value=""
                  errormsg=""
                />

                <div class="field full">
                  <label>Document Checklist / Missing Items</label>
                  <textarea
                    placeholder="Example: EIN letter, registration, insurance, lease, 2290..."
                    name="docremarks"
                    rows="3"
                  ></textarea>
                </div>

                <div class="field full">
                  <label>Notes</label>
                  <textarea name="notes" rows="3"></textarea>
                </div>
              </div>
              <div class="formactions">
                <button
                  type="button"
                  className="btn secondary"
                  onClick={onClose}
                >
                  {" "}
                  Cancel{" "}
                </button>
                <button
                  onClick={() => console.log("clicked")}
                  class="btn relative z-[10001] cursor-pointer rounded bg-blue-600 px-4 py-2 text-white"
                >
                  Create Application
                </button>
              </div>
            </form>

            {/* ================= SERVER MESSAGE ================= */}
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
      </div>
    </div>
  );
};

export default PermitModal;
