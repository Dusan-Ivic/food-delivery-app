import axios from "axios";
import { LoginFormData, LoginResponseDto } from "../../interfaces/login";

const loginUser = async (
  requestDto: LoginFormData
): Promise<LoginResponseDto> => {
  try {
    const response = await axios.post<LoginResponseDto>(
      `${import.meta.env.VITE_API_URL}/api/auth`,
      requestDto
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Login failed. Please check your credentials.");
    }
  }
};

const authService = {
  loginUser,
};

export default authService;
