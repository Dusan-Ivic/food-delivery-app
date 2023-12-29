import * as yup from "yup";

export const productSchema = yup.object().shape({
  name: yup.string().required("Name is required").max(100, "Name is too long"),
  description: yup.string().required("Description is required").max(500, "Description is too long"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required")
    .moreThan(0, "Price must be greater than 0"),
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .required("Quantity is required")
    .moreThan(0, "Quantity must be greater than 0"),
  storeId: yup.number().required("Store is required"),
});
