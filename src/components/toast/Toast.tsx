import React, { useRef, useEffect, FC, useCallback } from "react";
import "./toast.css"

interface ToastProps {
    open: boolean;
    onClose: () => void;
    timeout?: number;
    placement?: "top-left" | "top-middle"| "top-right" | "bottom-left" | "bottom-middle" | "bottom-right";
    dismissToast: (state: boolean) => void;
} 

const Toast: FC<ToastProps> = ({open, onClose, timeout = 5000, placement= "top-right", dismissToast}) => {
    const ref = useRef<HTMLDialogElement>(null);
    const dialog = ref.current;

    useEffect(() => {
        let dismissTimeout: ReturnType<typeof setTimeout>;
        if (open) {
            dialog?.show();
            dismissTimeout = setTimeout(() => {
                dialog?.classList.add("dialog--closing");
                onClose();
            }, timeout);
        } else {
            dialog?.classList.add("dialog--closing");
            onClose();
        }

        return () => {
            clearTimeout(dismissTimeout);
        }
    }, [open]); 

    // Function that trigger modal close() once closing animation finishes and removes closing className
    const onAnimationEnd = useCallback(() => {
        if (!open) {
            dialog?.classList.remove("dialog--closing");
            dialog?.close();
        }
    }, [onClose])


    // Dynamic className based on placement prop
    let placementClassName: string = "";

    switch (placement) {
        case "top-left":
            placementClassName = "toast--top toast--left";
            dialog?.setAttribute('placement','top-left');
            break;
        case "top-middle":
            placementClassName = "toast--top";
            dialog?.setAttribute('placement','top-middle');
            break;
        case "top-right":
            placementClassName = "toast--top toast--right";
            dialog?.setAttribute('placement','top-right');
            break;
        case "bottom-left":
            placementClassName = "toast--bottom toast--left";
            dialog?.setAttribute('placement','bottom-left');
            break;
        case "bottom-middle":
            placementClassName = "toast--bottom";
            dialog?.setAttribute('placement','bottom-middle');
            break;
        case "bottom-right":
            placementClassName = "toast--bottom toast--right";
            dialog?.setAttribute('placement','bottom-right');
            break;
    }

    return (
        <dialog
            className={`dialog dialog--toast ${placementClassName}`}
            ref={ref} 
            onClose={onClose}
            onAnimationEnd={onAnimationEnd}
        >
            <p>This is toast notification</p>
            <button onClick={() => dismissToast(false)}>Dismiss</button>
        </dialog>
    )
}

export default Toast;