import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepperProps {
  current: number;
  total?: number;
}

const Stepper = ({ current, total = 3 }: StepperProps) => {
  const steps = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((step, idx) => {
        const done = step < current;
        const active = step === current;
        return (
          <div key={step} className="flex items-center gap-2">
            <div
              className={cn(
                "w-10 h-10 rounded-full grid place-items-center text-sm font-semibold transition-colors",
                done && "bg-primary text-primary-foreground",
                active && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                !done && !active && "bg-muted text-muted-foreground"
              )}
            >
              {done ? <Check className="w-5 h-5" /> : step}
            </div>
            {idx < steps.length - 1 && (
              <div className={cn("w-10 h-0.5 transition-colors", step < current ? "bg-primary" : "bg-muted")} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
