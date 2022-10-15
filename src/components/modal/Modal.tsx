import React, { useRef, useEffect, FC, useCallback } from "react";
import "./modal.css";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ open, children, onClose }) => {

    const ref = useRef<HTMLDialogElement>(null);

    // Function that showModal() or add closing className based on "open" prop
    useEffect(() => {
        const { current: dialog } = ref;
        if (!open) {
            dialog?.classList.add("dialog--closing");
        } else {
                dialog?.showModal();
                dialog?.classList.remove("dialog--closing");
        }
    }, [open, onClose]);

    // Function that trigger modal close() once closing animation finishes and removes closing className
    const onAnimationEnd = useCallback(() => {
        const { current: dialog } = ref;
        if (!open) dialog?.close();
    }, [open])

    const onCancel = useCallback(
        (e: any) => {
          e.preventDefault();
          onClose();
        },
        [onClose]
      );

    return(
        <dialog className="dialog--modal" ref={ref} onCancel={onCancel} onClose={onClose} onAnimationEnd={onAnimationEnd}>
            <div>
                {children}
            </div>
        </dialog>
    )
}

export default Modal;