import { useState, useEffect, useRef } from "react";

// custom dropdown menu
function Dropdown({ value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // close when clicking outside
  useEffect(() => {
    function close(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const current = options.find((o) => o.value === value);

  return (
    <div className="dd" ref={ref}>
      <button type="button" className="dd-btn" onClick={() => setOpen(!open)}>
        <span>{current ? current.label : ""}</span>
        <svg className={"chev " + (open ? "up" : "")} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="dd-menu">
          {options.map((o) => (
            <div
              key={o.value}
              className={"dd-item " + (o.value === value ? "sel" : "")}
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
            >
              <span>{o.label}</span>
              {o.value === value && <span>✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
