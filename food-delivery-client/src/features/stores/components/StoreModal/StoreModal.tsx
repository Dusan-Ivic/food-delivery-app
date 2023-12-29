import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, FormProvider } from "react-hook-form";
import {
  BasicInfoForm,
  ContactInfoForm,
  DeliveryAreaMap,
  DeliveryInfoForm,
} from "@/features/stores/components";
import { FormStep, Stepper } from "@/components";
import {
  BasicInfo,
  ContactInfo,
  DeliveryArea,
  DeliveryInfo,
  StoreRequestDto,
} from "@/features/stores/types/request";
import { useMultistepForm } from "@/hooks";
import {
  basicInfoSchema,
  contactInfoSchema,
  deliveryAreaSchema,
  deliveryInfoSchema,
} from "@/features/stores/types/schemas";
import { StoreResponseDto } from "@/features/stores/types/response";

interface StoreModalProps {
  isVisible: boolean;
  title: string;
  data?: StoreResponseDto;
  onSubmit: (data: StoreRequestDto) => void;
  onClose: () => void;
}

export function StoreModal({ isVisible, title, data, onSubmit, onClose }: StoreModalProps) {
  const [formData, setFormData] = useState<StoreRequestDto>({} as StoreRequestDto);
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
    {
      index: 3,
      title: "Delivery Area",
      component: DeliveryAreaMap,
    },
  ];

  const { step, currentStepIndex, stepBackward, stepForward, goToStep, isFirstStep, isLastStep } =
    useMultistepForm(
      formSteps.map((step) => {
        const StepComponent = step.component;
        return <StepComponent />;
      })
    );

  const validationSchemas: Yup.ObjectSchema<
    BasicInfo | ContactInfo | DeliveryInfo | DeliveryArea
  >[] = [basicInfoSchema, contactInfoSchema, deliveryInfoSchema, deliveryAreaSchema];

  const initialValues = {
    name: data?.name || "",
    category: data?.category || "",
    description: data?.description || "",
    phone: data?.phone || "",
    address: data?.address || "",
    city: data?.city || "",
    postalCode: data?.postalCode || "",
    deliveryTimeInMinutes: data?.deliveryTimeInMinutes || 0,
    deliveryFee: data?.deliveryFee || 0,
    coordinates: data?.coordinates || [],
  };

  const currentStepValidationSchema = validationSchemas[currentStepIndex];
  const methods = useForm({
    mode: "all",
    defaultValues: initialValues,
    resolver: yupResolver(currentStepValidationSchema),
  });
  const { handleSubmit, reset } = methods;

  function submitFormPart(partialData: BasicInfo | ContactInfo | DeliveryInfo | DeliveryArea) {
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
    <Modal show={isVisible} onHide={closeModal} className="modal-lg" style={{ height: "100%" }}>
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
              <Button type="submit" className="w-50" variant={isLastStep ? "success" : "primary"}>
                {isLastStep ? "Submit" : "Next"}
              </Button>
            </div>
          </Form>
        </FormProvider>
      </Modal.Body>
    </Modal>
  );
}
