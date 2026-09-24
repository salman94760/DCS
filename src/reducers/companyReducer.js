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

    case "DELETE_COMPANY_START":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "FETCH_COMPANY_SUCCESS":
      return {
        ...state,
        loading: false,
        company: state.company.filter(
          (item) => item.id !== action.payload
        ),
      };

    case "DELETE_COMPANY_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

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

    default:
      return state;
  }
};

export default companyReducer;