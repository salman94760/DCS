export const initialState = {
  data: [],
  selectedData: null,

  loading: false,
  formLoading: false,
  error: null,

  filters: {
    search: "",
    role: "all",
    status: "all",
  },
};

const Reducer = (state, action) => {
  switch (action.type) {
    // =========================
    // FETCH ALL COMPANIES
    // =========================
    case "FETCH_START":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "FETCH_All_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        data: Array.isArray(action.payload) ? action.payload : [],
        error: null,
      };

    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // =========================
    // SINGLE COMPANY
    // =========================
    case "FETCH_SINGLE_START":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "FETCH_SINGLE_SUCCESS":
      return {
        ...state,
        loading: false,
        selectedData: action.payload,
        error: null,
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
        data: state.data.filter(
          (item) => String(item.id) !== String(action.payload),
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

    // =========================
    // SELECTED DATA
    // =========================
    case "SET_SELECTED_DATA":
      return {
        ...state,
        selectedData: action.payload,
      };

    default:
      return state;
  }
};

export default Reducer;
