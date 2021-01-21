import NextLink from "next/link";

type Props = {
  text: string;
  url: string;
};

export default function Button({ text, url }: Props) {
  const link = url.includes("http") ? url : `https://${url}`;
  return (
    <NextLink href={link}>
      <button className="bg-green-300 text-white border-green-300 border-2 py-4 px-14 w-full hover:bg-white hover:text-green-300 transition-all duration-100">
        {text}
      </button>
    </NextLink>
  );
}
