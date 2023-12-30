import { UserType } from "@/features/auth/types/enums";
import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(6, "Username must be at least 6 characters long"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  userType: yup
    .number()
    .required("User type is required")
    .oneOf(Object.values(UserType) as number[], "User type is not valid"),
});

export const updateUserDetailsSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(6, "Username must be at least 6 characters long"),
  email: yup.string().required("Email is required").email("Email is not valid"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
});

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .required("Old password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: yup
    .string()
    .required("Password confirmation is required")
    .min(8, "Password must be at least 8 characters long")
    .oneOf([yup.ref("oldPassword")], "Passwords don't match"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters long")
    .notOneOf([yup.ref("oldPassword")], "New password can't be the same as the current one"),
});

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(6, "Username must be at least 6 characters long"),
  email: yup.string().required("Email is required").email("Email is not valid"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: yup
    .string()
    .required("Password confirmation is required")
    .min(8, "Password must be at least 8 characters long")
    .oneOf([yup.ref("password")], "Passwords don't match"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
});

export const registerPartnerSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(6, "Username must be at least 6 characters long"),
  email: yup.string().required("Email is required").email("Email is not valid"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: yup
    .string()
    .required("Password confirmation is required")
    .min(8, "Password must be at least 8 characters long")
    .oneOf([yup.ref("password")], "Passwords don't match"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
});
