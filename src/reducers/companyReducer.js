export const initialState = {
  company: [],
  selectedCompany: null,

  loading: false,
  formLoading: false,
  error: null,

  filters: {
    search: "",
    role: "all",
    status: "all",
  },
};

const companyReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_COMPANIES_START":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "FETCH_COMPANIES_SUCCESS":
      return {
        ...state,
        loading: false,
        company: Array.isArray(action.payload)
          ? action.payload
          : [],
      };

    case "FETCH_COMPANY_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // =========================
    // DELETE
    // =========================
    case "DELETE_START":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "DELETE_SUCCESS":
      return {
        ...state,
        loading: false,
        company: state.company.filter(
          (item) =>
            String(item.id) !== String(action.payload)
        ),
        error: null,
      };

    case "DELETE_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // =========================
    // SINGLE COMPANY
    // =========================
    case "FETCH_COMPANY_START":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "FETCH_COMPANY_SUCCESS":
      return {
        ...state,
        loading: false,
        selectedCompany: action.payload,
      };

    // =========================
    // FILTERS
    // =========================
    case "SET_FILTERS":
      return {
        ...state,
        filters: action.payload,
      };

    case "RESET_FILTERS":
      return {
        ...state,
        filters: {
          search: "",
          role: "all",
          status: "all",
        },
      };

    case "SET_SELECTED_COMPANY":
      return {
        ...state,
        selectedCompany: action.payload,
      };

    default:
      return state;
  }
};

export default companyReducer;