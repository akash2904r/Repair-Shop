import { getCustomerSearchResults } from "@/lib/queries/getCustomerSearchResults";

import CustomerSearch from "@/app/(rs)/customers/CustomerSearch";

export const metadata = {
    title: "Customers",
}

export default async function Customers({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const { searchText } = await searchParams;

    if (!searchText) return <CustomerSearch />

    const results = await getCustomerSearchResults(searchText);

    return (
        <>
            <CustomerSearch />
            <p>{JSON.stringify(results)}</p>
        </>
    );
}