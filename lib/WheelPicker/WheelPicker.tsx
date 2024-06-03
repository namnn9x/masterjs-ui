import { LegacyRef, useRef } from "react";
import { hours, minutes } from "./utils";

interface DraggableDivElement extends HTMLDivElement {
  isDragging?: boolean;
  startY?: number;
  scrollTopStart?: number;
}

export const WheelPicker = () => {
  const hourRef = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ref: React.RefObject<DraggableDivElement>
  ) => {
    if (ref.current) {
      ref.current.isDragging = true;
      ref.current.startY = e.clientY;
      ref.current.scrollTopStart = ref.current.scrollTop;
    }
  };

  const handleMouseUp = (ref: React.RefObject<DraggableDivElement>) => {
    if (ref.current) {
      ref.current.isDragging = false;
    }
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ref: React.RefObject<DraggableDivElement>
  ) => {
    if (ref.current && ref.current.isDragging) {
      e.preventDefault();
      const distance = e.clientY - ref.current.startY!;
      ref.current.scrollTop = ref.current.scrollTopStart! - distance;
    }
  };

  return (
    <div className="flex relative bg-slate-950">
      <div
        ref={hourRef}
        onMouseDown={(e) => handleMouseDown(e, hourRef)}
        onMouseUp={() => handleMouseUp(hourRef)}
        onMouseMove={(e) => handleMouseMove(e, hourRef)}
        className="max-h-52 overflow-hidden cursor-pointer"
      >
        {hours.map((h) => (
          <div>{h}</div>
        ))}
      </div>
      <div className="max-h-52 overflow-hidden">
        {minutes.map((m) => (
          <div>{m}</div>
        ))}
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-10 bg-gradient-to-b from-transparent via-gray-200 to-transparent pointer-events-none"></div>
    </div>
  );
};
