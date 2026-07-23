import Link from 'next/link';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'md' | 'sm';
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function Button({ href, onClick, type = 'button', variant = 'primary', size = 'md', disabled, className = '', style, children }: ButtonProps) {
  const cls = `btn btn-${variant} ${size === 'sm' ? 'btn-sm' : ''} ${className}`.trim();

  if (href && !disabled) {
    return <Link href={href} className={cls} style={style}>{children}</Link>;
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls} style={style}>
      {children}
    </button>
  );
}
