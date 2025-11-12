import { useEffect, useState } from "react";

export const useDeleteFeedback = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let visibilityTimer: number;
    let mountTimer: NodeJS.Timeout;

    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsMounted(true);

      visibilityTimer = requestAnimationFrame(() => {
        setIsVisible(true);
      });
    } else {
      setIsVisible(false);

      mountTimer = setTimeout(() => {
        setIsMounted(false);
      }, 300);
    }

    return () => {
      cancelAnimationFrame(visibilityTimer);
      clearTimeout(mountTimer);
    };
  }, [isOpen]);

  if (!isMounted) {
    return null;
  }

  return { isVisible, onClose, onConfirm, isDeleting };
};
