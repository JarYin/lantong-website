import { useCallback, useEffect, useRef, useState } from "react";
import { HexColorPicker, HexAlphaColorPicker } from "react-colorful";

export const ColorPicker = ({ color, onChange, type }) => {
    const popover = useRef();

    const [isOpen, toggle] = useState(false);

    const close = useCallback(() => toggle(false), []);

    useEffect(() => {
        let startedInside = false;
        let startedWhenMounted = false;

        const listener = (event) => {
            // Do nothing if `mousedown` or `touchstart` started inside ref element
            if (startedInside || !startedWhenMounted) return;
            // Do nothing if clicking ref's element or descendent elements
            if (!popover.current || popover.current.contains(event.target))
                return;

            close(event);
        };

        const validateEventStart = (event) => {
            startedWhenMounted = popover.current;
            startedInside =
                popover.current && popover.current.contains(event.target);
        };

        document.addEventListener("mousedown", validateEventStart);
        document.addEventListener("touchstart", validateEventStart);
        document.addEventListener("click", listener);

        return () => {
            document.removeEventListener("mousedown", validateEventStart);
            document.removeEventListener("touchstart", validateEventStart);
            document.removeEventListener("click", listener);
        };
    }, [popover, close]);

    return (
        <div className="relative">
            <div
                className="w-full h-10 rounded-md border hover:cursor-pointer"
                style={{ backgroundColor: color }}
                onClick={() => toggle(true)}
            />

            {isOpen && (
                <div
                    className="absolute w-full p-3 bg-[#fefefe] z-50 top-[calc(100%+8px)] left-0 rounded-md border shadow-md"
                    ref={popover}
                >
                    {type === "hex" ? (
                        <HexColorPicker color={color} onChange={onChange} />
                    ) : (
                        <HexAlphaColorPicker
                            color={color}
                            onChange={onChange}
                        />
                    )}
                    <input
                        type="text"
                        value={color}
                        onChange={(e) => onChange(e.target.value)}
                        className="mt-3 p-2 h-8 font-medium text-gray-700 tracking-wide block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-base"
                    />
                </div>
            )}
        </div>
    );
};