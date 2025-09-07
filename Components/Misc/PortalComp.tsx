"use client";
import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

const PortalComponent = ({
  children,
  condition,
}: {
  children: ReactNode;
  condition: boolean;
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);
  return mounted && condition
    ? createPortal(children, document.querySelector("#portal")!)
    : children;
};

export default PortalComponent;
