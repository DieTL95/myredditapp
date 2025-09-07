import { useRef, type ReactNode } from "react";

const DialogComponent = ({ children }: { children: ReactNode }) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  return (
    <div className="h-full w-full">
      <dialog
        className="dialog min-w-full  min-h-[100vh] justify-center items-center overflow-x-hidden backdrop:bg-black/85 bg-transparent"
        ref={modalRef}
        open
      >
        {children}
        <div
          className=" absolute top-0 bottom-0 right-0 left-0 h-full w-full z-60"
          onClick={() => {
            document.querySelector("dialog")?.close();
          }}
        ></div>
      </dialog>
    </div>
  );
};

export default DialogComponent;
