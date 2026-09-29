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


  const fetchDriversDocuments = async () => {
    try {
      const response = await api.get(`/company/documentInformation/${slug}/${id}`);

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
                        <tr className="cap hover:bg-slate-50">
      <td className="sticky left-0 z-10 bg-white px-6 py-2">
        vdfvdfv
        
      </td>

      <td className="sticky left-0 z-10 bg-white px-6 py-2">
          xc xc 
       
      </td>

      <td className="sticky left-0 z-10 bg-white px-6 py-2">
          xc xc 
       
      </td>

     

      <td className="sticky left-0 z-10 bg-white px-6 py-2">
        <button type="submit">
          <i className="fa-solid fa-upload"></i>
        </button>
      </td>

      <td className="sticky left-0 z-10 bg-white px-6 py-2">
        
      </td>
    </tr> 
                  </tbody>
                </table>
              </div>
            </div>
          </div>

    

          
       



      </div>
    </div>
  );
}
