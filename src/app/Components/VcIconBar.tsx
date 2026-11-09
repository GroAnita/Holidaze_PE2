import { Utensils, ParkingCircle, PawPrint, Wifi } from "lucide-react";
import { VenueMeta } from "../lib/api/types";

type VcIconBarProps = {
  meta: VenueMeta;
};

export default function vcIconBar({ meta }: VcIconBarProps) {
  return (
    <div className="vc-icon-bar flex space-x-2">
      {meta.wifi && <Wifi className="h-5 w-5" aria-label="WiFi" />}
      {meta.parking && (
        <ParkingCircle className="h-5 w-5" aria-label="Parking" />
      )}
      {meta.pets && <PawPrint className="h-5 w-5" aria-label="Pets allowed" />}
      {meta.breakfast && (
        <Utensils className="h-5 w-5" aria-label="Food available" />
      )}
    </div>
  );
}
