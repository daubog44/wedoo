import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { cn } from "../../../lib/site-utils";

type AuthTextLinkBaseProps = {
  children: ReactNode;
  className?: string;
  compact?: boolean;
};

type AuthTextButtonProps = AuthTextLinkBaseProps &
  Omit<ComponentPropsWithoutRef<"button">, "children" | "className"> & {
    href?: never;
    to?: never;
  };

type AuthTextAnchorProps = AuthTextLinkBaseProps &
  Omit<ComponentPropsWithoutRef<"a">, "children" | "className"> & {
    href: string;
    to?: never;
  };

type AuthTextRouterLinkProps = AuthTextLinkBaseProps &
  Omit<LinkProps, "children" | "className"> & {
    href?: never;
  };

function getAuthTextLinkClassName(compact: boolean, className?: string) {
  return cn(
    "font-wedoo-body inline-flex items-center italic leading-none text-[var(--wedoo-ink)] transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-violet)]",
    compact ? "text-[18px]" : "text-[22px]",
    className,
  );
}

export function AuthTextLink(
  props: AuthTextButtonProps | AuthTextAnchorProps | AuthTextRouterLinkProps,
) {
  if ("to" in props && props.to !== undefined) {
    const {
      children,
      className,
      compact = false,
      to,
      ...linkProps
    } = props as AuthTextRouterLinkProps;

    return (
      <Link className={getAuthTextLinkClassName(compact, className)} to={to} {...linkProps}>
        {children}
      </Link>
    );
  }

  if ("href" in props && props.href !== undefined) {
    const {
      children,
      className,
      compact = false,
      href,
      ...anchorProps
    } = props as AuthTextAnchorProps;

    return (
      <a className={getAuthTextLinkClassName(compact, className)} href={href} {...anchorProps}>
        {children}
      </a>
    );
  }

  const {
    children,
    className,
    compact = false,
    type = "button",
    ...buttonProps
  } = props as AuthTextButtonProps;

  return (
    <button
      className={cn(getAuthTextLinkClassName(compact, className), "text-left")}
      type={type}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
