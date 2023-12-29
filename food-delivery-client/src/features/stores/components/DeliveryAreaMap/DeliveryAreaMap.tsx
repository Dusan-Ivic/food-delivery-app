import { MapContainer, TileLayer } from "react-leaflet";
import { useFormContext } from "react-hook-form";
import { FaUndo } from "react-icons/fa";
import { FaDrawPolygon } from "react-icons/fa6";
import { GrClear } from "react-icons/gr";
import { Coordinate } from "@/types/geolocation";
import { PolygonDrawing } from "@/components";
import { DeliveryArea } from "@/features/stores/types/request";

export function DeliveryAreaMap() {
  const {
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<DeliveryArea>();

  const addCoordinate = (newCoordinate: Coordinate) => {
    const currentCoordinates = getValues("coordinates");
    setValue("coordinates", [...currentCoordinates, newCoordinate], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const undoLastCoordinate = () => {
    const currentCoordinates = getValues("coordinates");
    if (currentCoordinates.length > 0) {
      setValue("coordinates", currentCoordinates.slice(0, -1), {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const completePolygon = () => {
    const currentCoordinates = getValues("coordinates");
    if (currentCoordinates.length > 3) {
      const firstPoint = currentCoordinates[0];
      const lastPoint = currentCoordinates[currentCoordinates.length - 1];
      const isClosedPolygon = firstPoint.x === lastPoint.x && firstPoint.y === lastPoint.y;
      if (!isClosedPolygon) {
        setValue("coordinates", [...currentCoordinates, currentCoordinates[0]], {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    }
  };

  const clearCoordinates = () => {
    setValue("coordinates", [], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span>Start by adding some points on the map</span>
        <div className="d-flex gap-2">
          <FaDrawPolygon onClick={completePolygon} className="fs-5" style={{ cursor: "pointer" }} />
          <FaUndo onClick={undoLastCoordinate} className="fs-5" style={{ cursor: "pointer" }} />
          <GrClear onClick={clearCoordinates} className="fs-5" style={{ cursor: "pointer" }} />
        </div>
      </div>
      <MapContainer center={[50, 15]} zoom={3} style={{ cursor: "crosshair", height: "50vh" }}>
        <TileLayer
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <PolygonDrawing points={getValues("coordinates")} onSetPoint={addCoordinate} />
      </MapContainer>
      <div className="text-danger">{errors.coordinates?.message}</div>
    </div>
  );
}
