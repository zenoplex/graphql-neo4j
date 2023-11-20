import type { GetBusinessesQuery } from "~/graphql/operations";

type Props = {
  businesses: GetBusinessesQuery["businesses"];
};

export function BusinessResults({ businesses }: Props): JSX.Element {
  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Address
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Category
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {businesses.map((business) => (
          <tr key={business.businessId}>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
              {business.name}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {business.address}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {business.categories.map((category) => category.name).join(", ")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
