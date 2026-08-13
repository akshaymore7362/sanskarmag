import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & {
  size?: number;
};

function IconShell({ size = 16, children, ...props }: Props & { children: React.ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      {children}
    </svg>
  );
}

export function Facebook(props: Props) {
  return (
    <IconShell {...props}>
      <path d="M14.2 8.1h2.3V4.3c-.4-.1-1.7-.2-3.2-.2-3.1 0-5.2 1.9-5.2 5.5v3.1H4.6V17h3.5v6h4.3v-6h3.4l.6-4.3h-4V10c0-1.2.4-1.9 1.8-1.9Z" />
    </IconShell>
  );
}

export function Instagram(props: Props) {
  return (
    <IconShell {...props}>
      <path d="M7.2 2.8h9.6c2.4 0 4.4 2 4.4 4.4v9.6c0 2.4-2 4.4-4.4 4.4H7.2c-2.4 0-4.4-2-4.4-4.4V7.2c0-2.4 2-4.4 4.4-4.4Zm0 2A2.4 2.4 0 0 0 4.8 7.2v9.6a2.4 2.4 0 0 0 2.4 2.4h9.6a2.4 2.4 0 0 0 2.4-2.4V7.2a2.4 2.4 0 0 0-2.4-2.4H7.2Zm4.8 3.1a4.1 4.1 0 1 1 0 8.2 4.1 4.1 0 0 1 0-8.2Zm0 2a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2Zm4.4-2.7a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
    </IconShell>
  );
}

export function Linkedin(props: Props) {
  return (
    <IconShell {...props}>
      <path d="M5.3 8.8h3.8V21H5.3V8.8Zm1.9-5.9a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4ZM11.2 8.8h3.6v1.7h.1c.5-.9 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-3.8v-5.8c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21h-3.8V8.8Z" />
    </IconShell>
  );
}

export function Youtube(props: Props) {
  return (
    <IconShell {...props}>
      <path d="M22 7.6s-.2-1.6-.9-2.3c-.9-.9-1.8-.9-2.3-1C15.6 4 12 4 12 4s-3.6 0-6.8.3c-.5.1-1.4.1-2.3 1C2.2 6 2 7.6 2 7.6S1.7 9.4 1.7 11v1.7c0 1.7.3 3.4.3 3.4s.2 1.6.9 2.3c.9.9 2.1.9 2.6 1 1.9.2 6.5.3 6.5.3s3.6 0 6.8-.3c.5-.1 1.4-.1 2.3-1 .7-.7.9-2.3.9-2.3s.3-1.7.3-3.4V11c0-1.7-.3-3.4-.3-3.4ZM9.8 14.8V8.9l5.8 3-5.8 2.9Z" />
    </IconShell>
  );
}
