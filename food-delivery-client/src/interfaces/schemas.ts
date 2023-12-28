import * as yup from "yup";

export const addressSchema = yup.object().shape({
  address: yup.string().required("Address is required").max(100, "Address is too long"),
  city: yup.string().required("City is required").max(50, "City name is too long"),
  postalCode: yup.string().required("Postal code is required").max(10, "Postal code is too long"),
});
