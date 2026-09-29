import { createContext, useContext, useReducer } from "react";

import api from "@/api/axios";
import Reducer, { initialState } from "@/reducers/Reducer";

const DContext = createContext(null);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  // =====================================
  // GET ALL COMPANIES
  // =====================================
  const fetchAllData = async (url) => {
    dispatch({
      type: "FETCH_START",
    });

    try {
      const response = await api.get(url);
      dispatch({
        type: "FETCH_All_DATA_SUCCESS",
        payload: Array.isArray(response.data.data) ? response.data.data : [],
      });
    } catch (error) {
      dispatch({
        type: "FETCH_ERROR",
        payload: error.response?.data?.message || "Failed to fetch companies",
      });
    }
  };

  // =====================================
  // GET SINGLE COMPANY
  // =====================================
  const fetchDetail = async (url) => {
    dispatch({
      type: "FETCH_START",
    });

    try {
      const response = await api.get(url);

      dispatch({
        type: "FETCH_SINGLE_SUCCESS",
        payload: response.data.data,
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
  const addData = async (formData) => {
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
  const updateData = async (id, formData) => {
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
  const deleteData = async (id) => {
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
  // STATUS
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

  // =====================================
  // FILTERS
  // =====================================
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

  const loginUserId = JSON.parse(localStorage.getItem("user"))?.id;
  return (
    <DContext.Provider
      value={{
        loginUserId,
        state,

        fetchAllData,
        fetchDetail,

        addData,
        updateData,
        deleteData,

        setSearch,
        setStatus,
        setPage,

        setFilters,
        resetFilters,
      }}
    >
      {children}
    </DContext.Provider>
  );
};

// =====================================
// CUSTOM HOOK
// =====================================
export const useDcsContext = () => {
  const context = useContext(DContext);

  if (!context) {
    throw new Error("useDcsContext must be used inside ContextProvider");
  }

  return context;
};
