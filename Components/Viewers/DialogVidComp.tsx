import { X } from "lucide-react";
import { useEffect, useRef, type ComponentType } from "react";
import * as portals from "react-reverse-portal";

const DialogVideoComponent = (portalNode: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  portalNode: portals.HtmlPortalNode<ComponentType<any>>;
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (modalRef) {
      modalRef.current?.focus();
    }
  }, [modalRef]);

  return (
    <dialog
      className="dialog min-w-full  min-h-[100vh] justify-center items-center overflow-x-hidden backdrop:bg-black/85 bg-transparent"
      ref={modalRef}
    >
      {portalNode && (
        <portals.OutPortal
          node={portalNode.portalNode}
          className={"relative group z-100"}
        />
      )}
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
        className="backdrop absolute  top-0 bottom-0 right-0 left-0 h-full w-full z-60"
        onClick={() => {
          document.querySelector("dialog")?.close();
        }}
      ></div>
    </dialog>
  );
};

export default DialogVideoComponent;
