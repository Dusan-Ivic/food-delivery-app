import { useState } from "react";
import { useMultistepForm } from "../../hooks/useMultistepForm";
import { StoreRequestDto, StoreState } from "../../interfaces/store";
import { Modal, Button, Form } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { BasicInfo, BasicInfoForm } from "./BasicInfoForm";
import { ContactInfo, ContactInfoForm } from "./ContactInfoForm";
import { DeliveryInfo, DeliveryInfoForm } from "./DeliveryInfoForm";
import { useForm, FormProvider } from "react-hook-form";
import { Stepper, FormStep } from "../Stepper";

interface StoreModalProps {
  isVisible: boolean;
  title: string;
  data?: StoreState;
  onSubmit: (data: StoreRequestDto) => void;
  onClose: () => void;
}

type StoreInfo = BasicInfo & ContactInfo & DeliveryInfo;

export function StoreModal({
  isVisible,
  title,
  data,
  onSubmit,
  onClose,
}: StoreModalProps) {
  const [formData, setFormData] = useState<StoreInfo>({} as StoreInfo);
  const formSteps: FormStep[] = [
    {
      index: 0,
      title: "Basic Info",
      component: BasicInfoForm,
    },
    {
      index: 1,
      title: "Contact Info",
      component: ContactInfoForm,
    },
    {
      index: 2,
      title: "Delivery Info",
      component: DeliveryInfoForm,
    },
  ];

  const {
    step,
    currentStepIndex,
    stepBackward,
    stepForward,
    goToStep,
    isFirstStep,
    isLastStep,
  } = useMultistepForm(
    formSteps.map((step) => {
      const StepComponent = step.component;
      return <StepComponent />;
    })
  );

  const basicInfoValidationSchema = Yup.object<BasicInfo>().shape({
    name: Yup.string()
      .required("Name is required")
      .max(100, "Name is too long"),
    category: Yup.string()
      .required("Category is required")
      .max(20, "Category is too long"),
    description: Yup.string()
      .required("Description is required")
      .max(500, "Description is too long"),
  });

  const contactInfoValidationSchema = Yup.object<ContactInfo>().shape({
    address: Yup.string()
      .required("Address is required")
      .max(100, "Address is too long"),
    city: Yup.string()
      .required("City is required")
      .max(50, "City name is too long"),
    postalCode: Yup.string()
      .required("Postal code is required")
      .max(10, "Postal code is too long"),
    phone: Yup.string()
      .required("Phone number is required")
      .max(20, "Phone number is too long"),
  });

  const deliveryInfoValidationSchema = Yup.object<DeliveryInfo>().shape({
    deliveryOptions: Yup.object().shape({
      deliveryTimeInMinutes: Yup.number()
        .typeError("Delivery time must be a number")
        .required("Delivery time is required")
        .moreThan(0, "Delivery time must be greater than 0"),
      deliveryFee: Yup.number()
        .typeError("Delivery fee must be a number")
        .required("Delivery fee is required")
        .min(0, "Delivery fee can't be a negative number")
        .max(10, "Delivery fee can't be greater than $10"),
    }),
  });

  const validationSchemas: Yup.ObjectSchema<
    BasicInfo | ContactInfo | DeliveryInfo,
    any
  >[] = [
    basicInfoValidationSchema,
    contactInfoValidationSchema,
    deliveryInfoValidationSchema,
  ];

  const initialValues = {
    name: data?.name || "",
    category: data?.category || "",
    description: data?.description || "",
    phone: data?.phone || "",
    address: data?.address || "",
    city: data?.city || "",
    postalCode: data?.postalCode || "",
    deliveryOptions: {
      deliveryTimeInMinutes: data?.deliveryOptions.deliveryTimeInMinutes || 0,
      deliveryFee: data?.deliveryOptions.deliveryFee || 0,
    },
  };

  const currentStepValidationSchema = validationSchemas[currentStepIndex];
  const methods = useForm({
    mode: "all",
    defaultValues: initialValues,
    resolver: yupResolver(currentStepValidationSchema),
  });
  const { handleSubmit, reset } = methods;

  function submitFormPart(partialData: BasicInfo | ContactInfo | DeliveryInfo) {
    if (!isLastStep) {
      setFormData((prevData) => ({ ...prevData, ...partialData }));
      return stepForward();
    }

    onSubmit({ ...formData, ...partialData });
    onClose();
    goToStep(0);
    setFormData({ ...initialValues });
    reset();
  }

  function closeModal() {
    onClose();
    goToStep(0);
    setFormData({ ...initialValues });
    reset();
  }

  return (
    <Modal show={isVisible} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stepper steps={formSteps} activeStep={currentStepIndex} />

        <hr />

        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(submitFormPart)}>
            {step}
            <hr />
            <div className="d-flex w-100 gap-3">
              <Button
                type="button"
                className="w-50"
                variant="secondary"
                onClick={stepBackward}
                disabled={isFirstStep}
              >
                Previous
              </Button>
              <Button
                type="submit"
                className="w-50"
                variant={isLastStep ? "success" : "primary"}
              >
                {isLastStep ? "Submit" : "Next"}
              </Button>
            </div>
          </Form>
        </FormProvider>
      </Modal.Body>
    </Modal>
  );
}
