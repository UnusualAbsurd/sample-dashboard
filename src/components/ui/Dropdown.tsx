import clsx from "clsx";
import { ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";

const optionVariants = {
  normal: "text-neutral-300",
  danger: "text-red-600 font-semibold",
};

interface Option {
  label: string;
  link?: string;
  icon?: string;
  variant?: keyof typeof optionVariants;
  onClick?: (e: any) => void;
  customId?: string;
}

interface Props {
  content: ReactNode;
  options: Array<Option | null>;
  className?: string;
  clickEvent?: (e?: any) => void;
  customId?: string;
}

export default function Dropdown({
  content,
  options,
  className = "",
  clickEvent,
}: Props) {
  const [open, setOpen] = useState(false);
  const dropdown = useRef<any>(null);

  useEffect(() => {
    function outside(event: Event) {
      if (!dropdown.current!.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", outside);

    return () => {
      document.removeEventListener("mousedown", outside);
    };
  }, [dropdown]);

  useEffect(() => {
    function handleResize() {
      setOpen(false);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={clsx("select-none cursor-pointer relative", className)}
      ref={dropdown}
    >
      <div
        className={clsx(
          "bg-light-500 dark:bg-dank-500 flex items-center rounded-md"
        )}
        onClick={() => setOpen(!open)}
      >
        {content}
      </div>
      {open && (
        <div className="absolute w-full min-h-full z-50 mt-2">
          <div
            className={clsx(
              "bg-[#23272A] flex flex-col rounded-md space-y-1 p-2"
            )}
            onClick={() => setOpen(false)}
          >
            {options
              .filter((o) => o)
              .map((option) => {
                const content = (
                  <div
                    onClick={(e) =>
                      clickEvent ? clickEvent(option) : undefined
                    }
                    className={clsx(
                      "text-sm hover:bg-[#2d3032] rounded-sm px-2 py-1",
                      optionVariants[option?.variant || "normal"]
                    )}
                  >
                    <div className="flex items-center space-x-2">
                      {option?.icon && (
                        <div
                          className="material-icons"
                          style={{ fontSize: "16px" }}
                        >
                          {option.icon}
                        </div>
                      )}
                      <div>{option?.label}</div>
                    </div>
                  </div>
                );

                return option?.link ? (
                  <Link href={option?.link || "#"}>{content}</Link>
                ) : (
                  content
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
