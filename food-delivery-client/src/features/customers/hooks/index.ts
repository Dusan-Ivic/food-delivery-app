import customersService from "@/features/customers/api";
import { CustomerRequestDto } from "@/features/customers/types/request";
import { toast } from "react-toastify";

export function useCustomers() {
  const registerCustomer = async (data: CustomerRequestDto) => {
    await customersService.registerCustomer(data);
    toast.success("New customer has been registered");
  };

  return { registerCustomer };
}
