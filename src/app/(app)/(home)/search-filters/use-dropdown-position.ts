import { RefObject } from "react";

export const useDropdownPosition = (
  ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>
) => {
  const getDropdownPosition = () => {
    if (!ref.current) return { top: 0, left: 0 };

    const rect = ref.current.getBoundingClientRect();
    const dropdownWidth = 240; // (w-60 = 15rem = 240px)

    // Calculate the initial position
    let left = rect.left + window.scrollX;
    const top = rect.bottom + window.scrollY;

    // Check if dropdown would go of right edge of the viewport
    if (left + dropdownWidth > window.innerWidth) {
      // Align to the right edge of the button instead
      left = rect.right + window.scrollX - dropdownWidth;
    }

    // If still offscreen, align to the right endge of the viewport with some padding
    if (left < 0) {
      left = window.innerWidth - dropdownWidth - 16;
    }

    // Ensure dropdown would not go off the left edge
    if (left < 0) {
      left = 16;
    }

    return { top, left };
  };

  return { getDropdownPosition };
};
