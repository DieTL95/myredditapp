import { useRef, type ComponentType } from "react";
import * as portals from "react-reverse-portal";

const DialogVideoComponent = (portalNode: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  portalNode: portals.HtmlPortalNode<ComponentType<any>>;
}) => {

  const modalRef = useRef<HTMLDialogElement>(null);
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
        className=" absolute top-0 bottom-0 right-0 left-0 h-full w-full z-60"
        onClick={() => {
          document.querySelector("dialog")?.close();
        }}
      ></div>
    </dialog>
  );
};

export default DialogVideoComponent;
