import { createContext, useContext, useReducer } from "react";

import api from "@/api/axios";
import companyReducer, { initialState } from "@/reducers/companyReducer";

const CompanyContext = createContext(null);

export const CompanyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(companyReducer, initialState);

  // =====================================
  // GET ALL COMPANIES
  // =====================================
  const fetchCompanies = async () => {
    dispatch({
      type: "FETCH_COMPANY_START",
    });

    try {
      const response = await api.get("/admin/company");

      dispatch({
        type: "FETCH_COMPANIES_SUCCESS",
        payload: Array.isArray(response.data.companies)
          ? response.data.companies
          : [],
      });
    } catch (error) {
      dispatch({
        type: "FETCH_COMPANY_ERROR",
        payload: error.response?.data?.message || "Failed to fetch companies",
      });
    }
  };

  // =====================================
  // GET SINGLE COMPANY
  // =====================================
  const fetchCompany = async (id) => {
    dispatch({
      type: "FETCH_COMPANY_START",
    });

    try {
      const response = await api.get(`/admin/company/${id}`);

      dispatch({
        type: "FETCH_COMPANY_SUCCESS",
        payload: response.data.company,
      });

      return response.data.company;
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response?.data?.message || "Failed to fetch company",
      });

      throw error;
    }
  };

  // =====================================
  // ADD COMPANY
  // =====================================
  const addCompany = async (formData) => {
    dispatch({
      type: "ADD_START",
    });

    try {
      const response = await api.post("/admin/company/add", formData);

      dispatch({
        type: "ADD_SUCCESS",
        payload: response.data.company,
      });

      return response.data;
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response?.data?.message || "Failed to add company",
      });

      throw error;
    }
  };

  // =====================================
  // UPDATE COMPANY
  // =====================================
  const updateCompany = async (id, formData) => {
    dispatch({
      type: "UPDATE_START",
    });

    try {
      // Laravel method spoofing
      formData.append("_method", "PUT");

      const response = await api.post(`/admin/company/${id}`, formData);

      dispatch({
        type: "UPDATE_SUCCESS",
        payload: response.data.company,
      });

      return response.data;
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response?.data?.message || "Failed to update company",
      });

      throw error;
    }
  };

  // =====================================
  // DELETE COMPANY
  // =====================================
  const deleteCompany = async (id) => {
    dispatch({
      type: "DELETE_START",
    });

    try {
      await api.delete(`/admin/company/delete/${id}`);

      dispatch({
        type: "DELETE_SUCCESS",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response?.data?.message || "Failed to delete company",
      });

      throw error;
    }
  };

  // =====================================
  // SEARCH
  // =====================================
  const setSearch = (value) => {
    dispatch({
      type: "SET_SEARCH",
      payload: value,
    });
  };

  // =====================================
  // STATUS FILTER
  // =====================================
  const setStatus = (value) => {
    dispatch({
      type: "SET_STATUS",
      payload: value,
    });
  };

  // =====================================
  // PAGE
  // =====================================
  const setPage = (page) => {
    dispatch({
      type: "SET_PAGE",
      payload: page,
    });
  };

  const setFilters = (newFilters) => {
    dispatch({
      type: "SET_FILTERS",
      payload: newFilters,
    });
  };

  const resetFilters = () => {
    dispatch({
      type: "RESET_FILTERS",
    });
  };

  return (
    <CompanyContext.Provider
      value={{
        ...state,

        fetchCompanies,
        fetchCompany,

        addCompany,
        updateCompany,
        deleteCompany,

        setSearch,
        setStatus,
        setPage,

        setFilters,
        resetFilters,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

// =====================================
// CUSTOM HOOK
// =====================================
export const useCompany = () => {
  const context = useContext(CompanyContext);

  if (!context) {
    throw new Error("useCompany must be used inside CompanyProvider");
  }

  return context;
};
