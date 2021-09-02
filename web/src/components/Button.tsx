import { createElement, forwardRef } from "react";
import { twc, cx, Modify, ComponentProps, Ref } from "util/styles";

type Props = Modify<
  ComponentProps,
  {
    variant?: keyof typeof variants["variant"];
    align?: keyof typeof variants["align"];
    size?: keyof typeof variants["size"];
    shape?: keyof typeof variants["shape"];
    full?: boolean;
  }
>;

const base = twc`text-gray-900 bg-transparent inline-flex items-center border border-transparent transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-800`;

const variants = {
  variant: {
    primary: twc`text-white bg-gray-900 shadow-sm hover:bg-black`,
    secondary: twc`bg-gray-100 shadow-sm hover:bg-gray-200`,
    outline: twc`shadow-sm border-gray-600 hover:bg-gray-100`,
    ghost: twc`hover:bg-gray-100`,
    link: twc`hover:underline p-0`,
  },
  align: {
    start: twc`justify-start`,
    center: twc`justify-center`,
    end: twc`justify-end`,
  },
  size: {
    sq: twc`p-1`,
    xs: twc`px-2.5 py-1.5 text-xs`,
    sm: twc`px-3 py-2 text-sm`,
    md: twc`px-4 py-2 text-sm`,
    lg: twc`px-4 py-2 text-base`,
    xl: twc`px-6 py-3 text-base`,
  },
  shape: {
    default: twc`rounded`,
    rounded: twc`rounded-full`,
  },
  full: {
    true: twc`w-full`,
    false: twc``,
  },
};

export const Button = forwardRef<Ref, Props>(function Button(
  {
    as = "button",
    variant = "primary",
    align = "center",
    size = "md",
    shape = "default",
    full = false,
    className = "",
    children,
    ...rest
  },
  ref
) {
  const cxn = cx(
    base,
    variants.variant[variant],
    variants.align[align],
    variants.size[size],
    variants.shape[shape],
    variants.full[full ? "true" : "false"],
    className
  );

  return createElement(as, { ref, className: cxn, ...rest }, children);
});
