import type { ReactNode } from "react";
import type { IconKey } from "./preset-icon-keys";

type SvgProps = { className?: string };

function IconSvg({
  className,
  children,
}: SvgProps & { children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

export const PRESET_ICON_GLYPHS: Record<IconKey, (props: SvgProps) => ReactNode> =
  {
    code: (p) => (
      <IconSvg {...p}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </IconSvg>
    ),
    terminal: (p) => (
      <IconSvg {...p}>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 9l3 3-3 3" />
        <line x1="12" y1="15" x2="17" y2="15" />
      </IconSvg>
    ),
    layers: (p) => (
      <IconSvg {...p}>
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 12l10 5 10-5" />
        <path d="M2 17l10 5 10-5" />
      </IconSvg>
    ),
    layout: (p) => (
      <IconSvg {...p}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="9" y1="3" x2="9" y2="21" />
        <line x1="3" y1="9" x2="9" y2="9" />
        <line x1="3" y1="15" x2="9" y2="15" />
      </IconSvg>
    ),
    component: (p) => (
      <IconSvg {...p}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </IconSvg>
    ),
    server: (p) => (
      <IconSvg {...p}>
        <rect x="4" y="4" width="16" height="6" rx="1" />
        <rect x="4" y="14" width="16" height="6" rx="1" />
        <line x1="8" y1="7" x2="8.01" y2="7" />
        <line x1="8" y1="17" x2="8.01" y2="17" />
      </IconSvg>
    ),
    database: (p) => (
      <IconSvg {...p}>
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
        <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
      </IconSvg>
    ),
    api: (p) => (
      <IconSvg {...p}>
        <circle cx="6" cy="12" r="2" />
        <circle cx="18" cy="6" r="2" />
        <circle cx="18" cy="18" r="2" />
        <line x1="8" y1="11" x2="16" y2="7" />
        <line x1="8" y1="13" x2="16" y2="17" />
      </IconSvg>
    ),
    pipeline: (p) => (
      <IconSvg {...p}>
        <circle cx="5" cy="12" r="2" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="19" cy="12" r="2" />
        <line x1="7" y1="12" x2="10" y2="12" />
        <line x1="14" y1="12" x2="17" y2="12" />
      </IconSvg>
    ),
    cloud: (p) => (
      <IconSvg {...p}>
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </IconSvg>
    ),
    bug: (p) => (
      <IconSvg {...p}>
        <path d="M12 8v8" />
        <path d="M8 12H4" />
        <path d="M20 12h-4" />
        <path d="M9 6l-2-2" />
        <path d="M15 6l2-2" />
        <path d="M9 18l-2 2" />
        <path d="M15 18l2 2" />
        <ellipse cx="12" cy="12" rx="4" ry="5" />
      </IconSvg>
    ),
    checklist: (p) => (
      <IconSvg {...p}>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 9l2 2 4-4" />
        <line x1="9" y1="15" x2="15" y2="15" />
        <line x1="9" y1="18" x2="13" y2="18" />
      </IconSvg>
    ),
    diagram: (p) => (
      <IconSvg {...p}>
        <rect x="3" y="3" width="6" height="6" rx="1" />
        <rect x="15" y="3" width="6" height="6" rx="1" />
        <rect x="9" y="15" width="6" height="6" rx="1" />
        <line x1="9" y1="6" x2="9" y2="15" />
        <line x1="15" y1="6" x2="12" y2="15" />
      </IconSvg>
    ),
    document: (p) => (
      <IconSvg {...p}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="16" y2="17" />
      </IconSvg>
    ),
    chart: (p) => (
      <IconSvg {...p}>
        <line x1="4" y1="20" x2="20" y2="20" />
        <line x1="4" y1="20" x2="4" y2="4" />
        <polyline points="7 14 11 10 15 13 20 7" />
      </IconSvg>
    ),
    roadmap: (p) => (
      <IconSvg {...p}>
        <circle cx="6" cy="6" r="2" />
        <circle cx="18" cy="12" r="2" />
        <circle cx="8" cy="18" r="2" />
        <path d="M8 6h4l4 4" />
        <path d="M14 14l-4 2" />
      </IconSvg>
    ),
    users: (p) => (
      <IconSvg {...p}>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="10" r="2" />
        <path d="M3 20c0-3 3-5 6-5s6 2 6 5" />
        <path d="M17 20c0-2-2-3-4-3" />
      </IconSvg>
    ),
    backlog: (p) => (
      <IconSvg {...p}>
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <circle cx="4" cy="6" r="1" fill="currentColor" />
        <circle cx="4" cy="12" r="1" fill="currentColor" />
        <circle cx="4" cy="18" r="1" fill="currentColor" />
      </IconSvg>
    ),
    sprint: (p) => (
      <IconSvg {...p}>
        <path d="M4 14l6-6 4 4 6-8" />
        <line x1="14" y1="4" x2="20" y2="4" />
        <line x1="14" y1="4" x2="14" y2="10" />
      </IconSvg>
    ),
    megaphone: (p) => (
      <IconSvg {...p}>
        <path d="M3 11l8-4v10l-8-4v-2z" />
        <path d="M11 7v10" />
        <path d="M15 9a4 4 0 0 1 0 6" />
        <line x1="11" y1="12" x2="11" y2="12" />
      </IconSvg>
    ),
    funnel: (p) => (
      <IconSvg {...p}>
        <path d="M3 4h18l-7 8v6l-4 2v-8L3 4z" />
      </IconSvg>
    ),
    ledger: (p) => (
      <IconSvg {...p}>
        <path d="M6 4h12v16H6z" />
        <line x1="9" y1="8" x2="15" y2="8" />
        <line x1="9" y1="12" x2="15" y2="12" />
        <line x1="9" y1="16" x2="13" y2="16" />
        <line x1="6" y1="4" x2="6" y2="20" />
      </IconSvg>
    ),
    calculator: (p) => (
      <IconSvg {...p}>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <rect x="8" y="6" width="8" height="4" rx="1" />
        <line x1="8" y1="13" x2="10" y2="13" />
        <line x1="12" y1="13" x2="14" y2="13" />
        <line x1="8" y1="17" x2="10" y2="17" />
        <line x1="12" y1="17" x2="14" y2="17" />
      </IconSvg>
    ),
    handshake: (p) => (
      <IconSvg {...p}>
        <path d="M4 12l4-2 4 3 4-3 4 2" />
        <path d="M8 10v4M16 10v4" />
      </IconSvg>
    ),
    interview: (p) => (
      <IconSvg {...p}>
        <circle cx="9" cy="8" r="3" />
        <path d="M4 20c0-3 2.5-5 5-5" />
        <path d="M16 10h5v6h-5z" />
        <line x1="18" y1="13" x2="18.01" y2="13" />
      </IconSvg>
    ),
    globe: (p) => (
      <IconSvg {...p}>
        <circle cx="12" cy="12" r="9" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <path d="M12 3a14 14 0 0 1 0 18" />
        <path d="M12 3a14 14 0 0 0 0 18" />
      </IconSvg>
    ),
    graduation: (p) => (
      <IconSvg {...p}>
        <path d="M3 9l9-5 9 5-9 5-9-5z" />
        <path d="M21 10v4" />
        <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
      </IconSvg>
    ),
    pivot: (p) => (
      <IconSvg {...p}>
        <path d="M7 7h10v10H7z" opacity="0.4" />
        <path d="M17 7l-4 4M7 17l4-4" />
        <path d="M13 11l4-4M11 13l-4 4" />
      </IconSvg>
    ),
    growth: (p) => (
      <IconSvg {...p}>
        <polyline points="4 16 10 10 14 14 20 6" />
        <polyline points="16 6 20 6 20 10" />
      </IconSvg>
    ),
    shield: (p) => (
      <IconSvg {...p}>
        <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
      </IconSvg>
    ),
    accessibility: (p) => (
      <IconSvg {...p}>
        <circle cx="12" cy="4" r="2" />
        <circle cx="12" cy="12" r="9" />
        <line x1="12" y1="6" x2="12" y2="9" />
        <line x1="8" y1="14" x2="16" y2="14" />
        <line x1="10" y1="18" x2="14" y2="18" />
      </IconSvg>
    ),
  };
