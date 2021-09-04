import tw from "tailwind-styled-components";

type Props = {
  $variant?: keyof typeof variants["variant"];
  $align?: keyof typeof variants["align"];
  $size?: keyof typeof variants["size"];
  $shape?: keyof typeof variants["shape"];
  $full?: boolean;
};

const variants = {
  variant: {
    primary: `text-white bg-gray-900 shadow-sm hover:bg-black`,
    secondary: `bg-gray-100 shadow-sm hover:bg-gray-200`,
    outline: `shadow-sm border-gray-600 hover:bg-gray-100`,
    ghost: `hover:bg-gray-100`,
    link: `hover:underline p-0`,
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

export const Button = tw.button<Props>`
  text-gray-900 bg-transparent inline-flex items-center border border-transparent transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-800
  ${(props) => variants["variant"][props.$variant || "primary"]}
  ${(props) => variants["align"][props.$align || "center"]}
  ${(props) => variants["size"][props.$size || "md"]}
  ${(props) => variants["shape"][props.$shape || "default"]}
  ${(props) => (props.$full ? `w-full` : ``)}
`;
