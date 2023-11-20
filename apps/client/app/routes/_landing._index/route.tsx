import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { Select, Label } from "ui";
import { BusinessResults } from "./BusinessResults";
import { apolloClient } from "~/lib/apolloClient.server";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { GetBusinessesDocument } from "~/graphql/operations";
import React from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const response = await apolloClient.query({
    query: GetBusinessesDocument,
    variables: {
      where: {
        categories_SOME: {
          name_CONTAINS: url.searchParams.get("category") ?? "",
        },
      },
    },
  });

  return response.data;
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();

  const onChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const params = new URLSearchParams();
    params.set("category", e.currentTarget.value);
    setSearchParams(params);
  };

  return (
    <div className="grid grid-flow-row px-4 sm:px-6 lg:px-8 gap-5">
      <div className="mt-8 flow-root">
        <h1 className="text-base font-semibold leading-6 text-gray-900 mb-5">
          Business Search
        </h1>
        <Label htmlFor="business_category">Select Business Category</Label>
        <Select
          id="business_category"
          value={searchParams.get("category") ?? "all"}
          onChange={onChange}
        >
          <option value="">All</option>
          <option value="Library">library</option>
          <option value="Restaurant">restaurant</option>
          <option value="Car Wash">car wash</option>
        </Select>
      </div>
      <div className="sm:flex sm:items-center">
        <h1 className="text-base font-semibold leading-6 text-gray-900">
          Results
        </h1>
      </div>
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <BusinessResults businesses={data.businesses} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
