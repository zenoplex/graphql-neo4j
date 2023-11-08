import type { LoaderFunction, MetaFunction } from "@remix-run/cloudflare";
import { Select, Label } from "ui";
import { BusinessResults } from "./BusinessResults";
import { apolloClient } from "~/lib/apolloClient.server";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/cloudflare";
import { gql } from "@apollo/client";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

// TODO: type annotate
export const loader: LoaderFunction = async () => {
  const response = await apolloClient.query({
    query: gql`
      {
        businesses {
          businessId
          name
          address
          categories {
            name
          }
        }
      }
    `,
  });

  return json(response.data);
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="grid grid-flow-row px-4 sm:px-6 lg:px-8 gap-5">
      <div className="mt-8 flow-root">
        <h1 className="text-base font-semibold leading-6 text-gray-900 mb-5">
          Business Search
        </h1>
        <Label htmlFor="business_category">Select Business Category</Label>
        <Select id="business_category">
          <option value="all">All</option>
          <option value="library">All</option>
          <option value="restaurant">restaurant</option>
          <option value="car wash">car wash</option>
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
