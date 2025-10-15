import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";

const ImgDialogComponent = ({ children }: { children: ReactNode }) => {
  const modal = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    modal.current?.showModal();
  }, []);
  return (
    <dialog
      className="dialog min-w-full  min-h-[100vh] justify-center items-center overflow-x-hidden backdrop:bg-black/85 bg-transparent"
      ref={modal}
    >
      {" "}
      <div
        className="xbutton absolute top-0 right-0 text-3xl h-10 z-100 rounded-full text-white hover:bg-black/40 hover:scale-110"
        onClick={() => {
          document.querySelector("dialog")?.close();
        }}
      >
        <div className="p-1 rounded-full bg-black/5 hover:bg-gray-400/40">
          <X size={30} />
        </div>
      </div>
      <div
        className=" absolute top-0 bottom-0 right-0 left-0 h-full w-full z-10"
        id="thing"
      ></div>
      {children}
    </dialog>
  );
};

export default ImgDialogComponent;
