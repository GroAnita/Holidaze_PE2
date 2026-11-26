import { PawPrint } from "lucide-react";

type HouseRulesProps = {
  petsAllowed: boolean;
};

export default function HouseRules({ petsAllowed }: HouseRulesProps) {
  const rules = [
    {
      icon: PawPrint,
      text: petsAllowed ? "Pets are welcome" : "No pets allowed",
    },
  ];
  return (
    <div className="font-manrope">
      <h2 className="text-text-primary mb-4 text-2xl font-semibold">
        House Rules
      </h2>
      <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-12">
        {rules.map(({ icon: Icon, text }) => (
          <li key={text} className="text-text-primary flex items-center gap-3">
            <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
