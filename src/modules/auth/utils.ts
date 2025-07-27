import { cookies as getCookies } from "next/headers";

interface Props {
  prefix: string;
  value: string;
}

export const generateAuthCookie = async ({ prefix, value }: Props) => {
  const cookie = await getCookies();
  cookie.set({
    name: `${prefix}-token`,
    value,
    httpOnly: true,
    path: "/",
  });
};
