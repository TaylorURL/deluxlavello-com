import { useEffect, useRef } from 'react';

// Theme and language are one control pattern: a labelled button that opens a
// list of choices, with the current one marked. The list is a menu rather than a
// select because it carries a check, and because one keyboard contract then
// covers both.
export default function Picker({
  id,
  name,
  label,
  icon,
  value,
  triggerLabel,
  options,
  selected,
  onSelect,
  open,
  onOpen,
}) {
  const wrap = useRef(null);
  const button = useRef(null);
  const items = useRef([]);
  // Where focus lands when the menu opens: the checked item, or the last one.
  const landing = useRef('checked');

  useEffect(() => {
    if (!open) return undefined;
    const checked = options.findIndex((option) => option.value === selected);
    const index = landing.current === 'last' ? options.length - 1 : Math.max(checked, 0);
    items.current[index]?.focus();
    const onClick = (event) => {
      if (!wrap.current?.contains(event.target)) onOpen(null);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
    // Focus moves when the menu opens, not each time the choice changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const show = (where) => {
    landing.current = where;
    onOpen(id);
  };

  const close = (returnFocus) => {
    onOpen(null);
    if (returnFocus) button.current?.focus();
  };

  const onTriggerKey = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      show('checked');
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      show('last');
    }
  };

  const onMenuKey = (event) => {
    const list = items.current;
    const at = list.indexOf(document.activeElement);
    const move = (index) => {
      event.preventDefault();
      list[index].focus();
    };
    if (event.key === 'ArrowDown') move((at + 1) % list.length);
    else if (event.key === 'ArrowUp') move((at - 1 + list.length) % list.length);
    else if (event.key === 'Home') move(0);
    else if (event.key === 'End') move(list.length - 1);
    else if (event.key === 'Escape' || event.key === 'Tab') close(event.key === 'Escape');
  };

  return (
    <div className="picker" data-picker={name} ref={wrap}>
      <button
        className="picker__trigger"
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={id}
        aria-label={triggerLabel}
        ref={button}
        onClick={() => (open ? close(false) : show('checked'))}
        onKeyDown={onTriggerKey}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d={icon} />
        </svg>
        {triggerLabel ? null : <span className="sr-only">{label}</span>}
        <span data-picker-value>{value}</span>
      </button>
      <ul className="picker__menu" id={id} role="menu" hidden={!open} onKeyDown={onMenuKey}>
        {options.map((option, index) => (
          <li role="none" key={option.value}>
            <button
              type="button"
              role="menuitemradio"
              aria-checked={option.value === selected}
              data-value={option.value}
              ref={(node) => {
                items.current[index] = node;
              }}
              onClick={() => {
                onSelect(option.value);
                close(true);
              }}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
