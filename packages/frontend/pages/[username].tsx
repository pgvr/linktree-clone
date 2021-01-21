import { GetStaticPropsContext } from "next";
import Button from "../components/Button";
import { initializeApollo } from "../lib/apolloClient";
import {
  ButtonsDocument,
  ButtonsQuery,
  UsersDocument,
  UsersQuery,
} from "../lib/graphql/output";

type Props = {
  data: ButtonsQuery;
  username: string;
};

export default function Username({ data, username }: Props) {
  return (
    <div className="min-h-screen max-w-2xl mx-auto flex flex-col items-center py-10">
      <img
        className="rounded-full h-24 w-24 mb-4"
        src="data:image/png;base64,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"
      />
      <h1 className="font-bold text-lg mb-10">@{username}</h1>
      <div className="space-y-4 w-full">
        {data.buttons?.map((btn) => (
          <Button key={btn?.text} text={btn?.text!} url={btn?.url!} />
        ))}
      </div>
      <div className="flex-1"></div>
      <svg
        className="w-28"
        display="block"
        height="100%"
        width="100%"
        data-testid="BlackGreenLogo"
        viewBox="0 0 137 25"
      >
        <title data-testid="svgTitle" id="title_0.0374982482169921">
          title
        </title>
        <desc data-testid="svgDescription" id="description_0.0374982482169921">
          description
        </desc>
        <g>
          <path
            d="m37.1 24.4v-20.8c0-0.3 0.2-0.6 0.6-0.6h1.9c0.3 0 0.6 0.2 0.6 0.6v20.9c0 0.3-0.2 0.6-0.601 0.6h-1.899c-0.3-0.1-0.6-0.3-0.6-0.7z"
            fill="#3D3B3C"
          ></path>
          <path
            d="m44.3 5.5v-2c0-0.3 0.2-0.6 0.6-0.6h2.1c0.3 0 0.6 0.2 0.6 0.6v2c0 0.3-0.2 0.6-0.6 0.6h-2.1c-0.4 0-0.6-0.2-0.6-0.6zm0.1 18.9v-14.8c0-0.3 0.3-0.6 0.6-0.6h1.8c0.3 0 0.6 0.2 0.6 0.6v14.9c0 0.3-0.199 0.6-0.6 0.6h-1.8c-0.3-0.1-0.6-0.3-0.6-0.7z"
            fill="#3D3B3C"
          ></path>
          <path
            d="m51.5 24.4v-14.8c0-0.3 0.2-0.6 0.6-0.6h1.8c0.3 0 0.6 0.2 0.6 0.6v1h0.1c0.6-0.8 1.6-1.5 3.1-1.9h0.1c2.3-0.3 4.1 0.2 5.3 1.5 1 1.1 1.601 2.5 1.601 4.399v9.899c0 0.3-0.2 0.601-0.601 0.601h-1.8c-0.3 0-0.6-0.199-0.6-0.601v-9.101c0-2.699-1.101-4.101-3.4-4.101-1.1 0-2.1 0.3-2.8 1s-1 1.601-1 2.7v9.5c0 0.3-0.2 0.6-0.601 0.6h-1.8c-0.399-0.096-0.599-0.296-0.599-0.696z"
            fill="#3D3B3C"
          ></path>
          <path
            d="m68.2 24.4v-20.8c0-0.3 0.2-0.6 0.6-0.6h1.8c0.3 0 0.6 0.2 0.6 0.6v12.6h0.1l6.3-6.9c0-0.2 0.2-0.3 0.3-0.3h2.3c0.5 0 0.7 0.6 0.399 0.9l-4.599 5.2c-0.2 0.2-0.2 0.5 0 0.7l5.6 8.4c0.2 0.399 0 0.899-0.5 0.899h-2c-0.199 0-0.398-0.101-0.5-0.199l-5.1-7.6h-0.1l-2.1 2.3c-0.1 0.102-0.1 0.2-0.1 0.4v4.6c0 0.3-0.2 0.6-0.6 0.6h-1.8c-0.3-0.2-0.6-0.4-0.6-0.8z"
            fill="#3D3B3C"
          ></path>
          <path
            d="M85.3,20v-8.4h-1.8c-0.3,0-0.602-0.2-0.602-0.6V9.6C83,9.3,83.2,9,83.5,9h1.9V5.7   c0-0.3,0.199-0.6,0.601-0.6h1.7c0.3,0,0.6,0.2,0.6,0.6V9h3.4c0.3,0,0.6,0.2,0.6,0.6V11c0,0.3-0.199,0.6-0.6,0.6h-3.4v8.1   c0,0.899,0.1,1.5,0.4,1.899C89,22,89.5,22.2,90.3,22.2H91c0.3,0,0.6,0.2,0.6,0.6v1.7c0,0.3-0.199,0.6-0.6,0.6h-0.9   c-1.699,0-2.898-0.398-3.699-1.199C85.7,22.9,85.3,21.7,85.3,20z"
            fill="#3D3B3C"
          ></path>
          <path
            d="M95.5,24.4V9.6C95.5,9.3,95.7,9,96,9h1.7c0.3,0,0.6,0.2,0.6,0.6v1.2H98.4c0.301-0.6,0.801-1.1,1.399-1.5   c0.601-0.4,1.2-0.5,1.9-0.5c0.3,0,0.698,0,1,0.1C103,9,103.1,9.3,103.1,9.5l-0.3,1.8c-0.1,0.3-0.399,0.5-0.7,0.4   c-0.199,0-0.398-0.1-0.699-0.1c-1.899,0-2.899,1.3-2.899,3.9v8.8c0,0.3-0.2,0.601-0.601,0.601H96C95.7,25,95.5,24.8,95.5,24.4z"
            fill="#3D3B3C"
          ></path>
          <path
            d="m116.6 19.8 1.301 1c0.199 0.2 0.301 0.5 0.101 0.7-0.601 0.9-1.399 1.7-2.3 2.4-1.102 0.699-2.5 1.1-4 1.1-2.2 0-4-0.8-5.4-2.3s-2.1-3.601-2.1-6.101c0-2.601 0.699-4.601 2.1-6.101s3.1-2.3 5.301-2.3c2.101 0 3.899 0.8 5.199 2.3 1.301 1.5 2 3.601 2 6.2v0.302c0 0.3-0.199 0.6-0.6 0.6h-10.4c-0.3 0-0.6 0.301-0.6 0.602 0.1 1.1 0.5 2.1 1.1 2.898 0.801 0.9 1.801 1.4 3.2 1.4 0.7 0 1.3-0.1 1.8-0.3s1-0.5 1.301-0.8c0.399-0.4 0.601-0.7 0.799-0.9 0.102-0.1 0.201-0.3 0.302-0.4 0.196-0.4 0.596-0.5 0.896-0.3zm-9.4-4.7h8.6c-0.1-1.199-0.399-2.3-1.1-3.1-0.7-0.9-1.802-1.3-3.2-1.3-1.3 0-2.4 0.5-3.102 1.4-0.798 0.9-1.198 1.9-1.198 3z"
            fill="#3D3B3C"
          ></path>
          <path
            d="m134 19.8 1.3 1c0.2 0.2 0.3 0.5 0.101 0.7-0.601 0.9-1.399 1.7-2.301 2.4-1.1 0.699-2.5 1.1-4 1.1-2.199 0-4-0.8-5.398-2.3-1.4-1.5-2.102-3.601-2.102-6.101 0-2.601 0.7-4.601 2.102-6.101 1.398-1.5 3.1-2.3 5.3-2.3 2.101 0 3.899 0.8 5.2 2.3 1.3 1.5 2 3.601 2 6.2v0.302c0 0.3-0.2 0.6-0.602 0.6h-10.4c-0.302 0-0.601 0.301-0.601 0.602 0.101 1.1 0.5 2.1 1.101 2.898 0.8 0.9 1.8 1.4 3.198 1.4 0.701 0 1.302-0.1 1.802-0.3s1-0.5 1.3-0.8c0.398-0.4 0.6-0.7 0.8-0.9 0.101-0.1 0.2-0.3 0.3-0.4 0.2-0.4 0.6-0.5 0.9-0.3zm-9.4-4.7h8.602c-0.102-1.199-0.4-2.3-1.102-3.1-0.699-0.9-1.8-1.3-3.199-1.3-1.301 0-2.399 0.5-3.101 1.4-0.8 0.9-1.2 1.9-1.2 3z"
            fill="#3D3B3C"
          ></path>
          <path
            d="m11 0.7c-0.5-0.9-1.8-0.9-2.3 0l-8.6 15.6c-0.4 0.8 0.2 1.7 1.1 1.7h5.8v5.9c0 0.6 0.5 1.1 1.1 1.1h3.4c0.6 0 1.1-0.5 1.1-1.1v-5.9h-1.6c-0.7 0-1.2-0.5-1.3-1.1 0-0.2 0-0.4 0.1-0.602l4.8-8.7-3.6-6.898z"
            fill="#39E09B"
          ></path>
          <path
            d="m18.6 0.7c0.5-0.9 1.8-0.9 2.3 0l8.6 15.6c0.4 0.8-0.2 1.7-1.1 1.7h-5.7v5.9c0 0.6-0.5 1.1-1.101 1.1h-3.599c-0.6 0-1.1-0.5-1.1-1.1v-5.9h1.6c0.7 0 1.2-0.5 1.3-1.1 0-0.2 0-0.4-0.1-0.602l-4.8-8.698 3.7-6.9z"
            fill="#28BF7B"
          ></path>
        </g>
      </svg>
    </div>
  );
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<UsersQuery>({
    query: UsersDocument,
  });

  return {
    paths: data?.users?.map((user) => ({
      params: {
        username: user?.username,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<ButtonsQuery>({
    query: ButtonsDocument,
    variables: { username: params?.username },
  });

  return {
    props: { data, username: params?.username },
    revalidate: 1,
  };
}
