import { api } from "../../constants";
import axios from "axios";
import swal from "sweetalert";

export const getUserDetailApi = async () => {
  try {
    const response = await axios.get(api);
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    swal("Error", "Something Went Wrong", "error");
  }
};

export const getUserDetailApiById = async (id) => {
  try {
    const response = await axios.get(`${api}/${id}`);
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    swal("Error", "Something went wrong", "error");
  }
};

export const createNewUserApi = async (data) => {
  try {
    const resp = await axios.post(api, data);
    if (resp.status == 201) {
      swal("Success", "User Created Successfully", "success");
    }
  } catch (err) {
    swal("Error", "Something Went Wrong", "error");
  }
};
