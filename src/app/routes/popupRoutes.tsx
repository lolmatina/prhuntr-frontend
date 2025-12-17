import { Routes, Route } from "react-router-dom";

export function PopupRoutes({
  backgroundLocation,
}: {
  backgroundLocation: Location;
}) {
  if (!backgroundLocation) return;

  return <Routes></Routes>;
}
