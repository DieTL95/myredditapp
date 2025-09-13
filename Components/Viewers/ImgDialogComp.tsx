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
      <div
        className=" absolute top-0 bottom-0 right-0 left-0 h-full w-full z-10"
        id="thing"
      ></div>

      <div>{children}</div>
    </dialog>
  );
};

export default ImgDialogComponent;
