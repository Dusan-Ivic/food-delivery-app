import { ComponentType } from "react";

export interface FormStep {
  index: number;
  title: string;
  component: ComponentType;
}

interface StepperProps {
  steps: FormStep[];
  activeStep: number;
}

export function Stepper({ steps, activeStep }: StepperProps) {
  return (
    <div className="d-flex justify-content-around align-items-center mb-2 bg-light p-2 rounded">
      {steps.map((step) => (
        <div
          key={step.index}
          className="d-flex justify-content-center align-items-center gap-2"
        >
          <div
            className={`rounded-circle d-flex justify-content-center align-items-center text-white ${
              activeStep === step.index ? "bg-primary" : "bg-secondary"
            }`}
            style={{ width: "24px", height: "24px" }}
          >
            {step.index + 1}
          </div>
          <div className="d-none d-lg-block">{step.title}</div>
        </div>
      ))}
    </div>
  );
}
