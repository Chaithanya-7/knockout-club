"use client";

import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import { ChevronsDown } from "@/components/Icons";

interface CollapsibleSectionProps {
  heading: string;
  content: React.JSX.Element;
  isOpen: boolean;
  isAnySectionOpen: boolean; 
  onToggle: () => void;
}

const CollapsibleSection = forwardRef<HTMLDivElement, CollapsibleSectionProps>(
  ({ heading, content, isOpen, isAnySectionOpen, onToggle }, ref) => {
    const localRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => localRef.current!);

    
    useEffect(() => {
      if (isOpen && localRef.current) {
        const offset = 150;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = localRef.current.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, [isOpen]);

    return (
      <div className="w-full border-b border-pbtext last:border-b-0" ref={localRef}>
        <div
          onClick={() => onToggle()}
          className={`flex items-center justify-between p-6 cursor-pointer transition-all duration-300 select-none  ${
            isOpen ? "bg-pbpages border-0" : "bg-pbgray"
          }`}
        >
          <h2
            className={`font-normal md:text-[38px] text-[24px] transition-colors duration-300 ${
              isOpen ? "text-pbgreen " : "text-white"
            } text-lexend`}
          >
            {heading}
          </h2>

          <div
            className={`transition-all duration-300 transform ${
              isOpen ? "text-pbgreen rotate-180" : "text-white"
            }`}
          >
            <ChevronsDown className="md:h-12 md:w-12 w-8 h-8" />
          </div>
        </div>

        {isOpen && (
          <div
            className={`p-6 bg-pbpages ${isAnySectionOpen ? "" : "border-t border-pbtext"}`}
          >
            {content}
          </div>
        )}
      </div>
    );
  },
);

CollapsibleSection.displayName = "CollapsibleSection";

export default CollapsibleSection;
