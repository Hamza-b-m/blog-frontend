import { type ReactNode } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Slide } from "react-toastify";

export default function ToastContextProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <ToastContainer
        transition={Slide}
        position="top-center"
        autoClose={3000}
      />
      {children}
    </>
  );
}
