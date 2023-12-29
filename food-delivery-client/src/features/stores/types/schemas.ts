import {
  BasicInfo,
  ContactInfo,
  DeliveryInfo,
  DeliveryArea,
} from "@/features/stores/types/request";
import { Coordinate } from "@/types/geolocation";
import * as yup from "yup";

export const basicInfoSchema = yup.object<BasicInfo>().shape({
  name: yup.string().required("Name is required").max(100, "Name is too long"),
  category: yup.string().required("Category is required").max(20, "Category is too long"),
  description: yup.string().required("Description is required").max(500, "Description is too long"),
});

export const contactInfoSchema = yup.object<ContactInfo>().shape({
  address: yup.string().required("Address is required").max(100, "Address is too long"),
  city: yup.string().required("City is required").max(50, "City name is too long"),
  postalCode: yup.string().required("Postal code is required").max(10, "Postal code is too long"),
  phone: yup.string().required("Phone number is required").max(20, "Phone number is too long"),
});

export const deliveryInfoSchema = yup.object<DeliveryInfo>().shape({
  deliveryTimeInMinutes: yup
    .number()
    .typeError("Delivery time must be a number")
    .required("Delivery time is required")
    .moreThan(0, "Delivery time must be greater than 0"),
  deliveryFee: yup
    .number()
    .typeError("Delivery fee must be a number")
    .required("Delivery fee is required")
    .min(0, "Delivery fee can't be a negative number")
    .max(10, "Delivery fee can't be greater than $10"),
});

export const deliveryAreaSchema = yup.object<DeliveryArea>().shape({
  coordinates: yup
    .array()
    .required("Coordinates are required")
    .min(4, "Coordinates must have at least 4 points")
    .test("closedPolygon", "Coordinates must form a closed ring", function (value: Coordinate[]) {
      if (value.length > 3) {
        const firstPoint = value[0];
        const lastPoint = value[value.length - 1];
        return firstPoint.x === lastPoint.x && firstPoint.y === lastPoint.y;
      }
    }),
});
