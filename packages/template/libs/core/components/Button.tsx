import tw from "tailwind-styled-components";

type Props = {
  $variant?: keyof typeof variants["variant"];
  $align?: keyof typeof variants["align"];
  $size?: keyof typeof variants["size"];
  $shape?: keyof typeof variants["shape"];
  $full?: boolean;
};

const base =
  "inline-flex items-center border transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-800 cursor-pointer";

const variants = {
  variant: {
    primary: `text-white bg-gray-900 border-transparent shadow-sm hover:bg-black`,
    secondary: `text-gray-900 bg-gray-100 border-transparent shadow-sm hover:bg-gray-200`,
    outline: `text-gray-900 bg-transparent border-gray-600 shadow-sm hover:bg-gray-100`,
    ghost: `text-gray-900 bg-transparent border-transparent hover:bg-gray-100`,
    link: `text-gray-900 bg-transparent border-transparent hover:underline p-0`,
  },
  align: {
    start: `justify-start`,
    center: `justify-center`,
    end: `justify-end`,
  },
  size: {
    sq: `p-1`,
    xs: `px-2.5 py-1.5 text-xs`,
    sm: `px-3 py-2 text-sm`,
    md: `px-4 py-2 text-sm`,
    lg: `px-4 py-2 text-base`,
    xl: `px-6 py-3 text-base`,
  },
  shape: {
    default: `rounded`,
    rounded: `rounded-full`,
  },
};

const buttonStyles = (props: Props) => {
  const variant = variants["variant"][props.$variant || "primary"];
  const align = variants["align"][props.$align || "center"];
  const size = variants["size"][props.$size || "md"];
  const shape = variants["shape"][props.$shape || "default"];
  const full = props.$full ? "w-full" : "";
  return `${base} ${variant} ${align} ${size} ${shape} ${full}`;
};

export const Button = tw.button<Props>`
  ${buttonStyles}
`;

export const ButtonLink = tw.a<Props>`
  ${buttonStyles}
`;
