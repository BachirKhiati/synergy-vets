import React from "react";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

vi.mock("next/link", () => {
  return {
    __esModule: true,
    default: React.forwardRef<HTMLAnchorElement, React.ComponentPropsWithoutRef<"a">>(
      function NextLinkMock({ children, ...props }, ref) {
        return (
          <a ref={ref} {...props}>
            {children}
          </a>
        );
      }
    ),
  };
});
