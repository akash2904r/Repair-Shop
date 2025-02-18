import { getCustomer } from "@/lib/queries/getCustomer";
import * as Sentry from "@sentry/nextjs";

import { BackButton } from "@/components/BackButton";
import CustomerForm from "@/app/(rs)/customers/form/CustomerForm";

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const { customerId } = await searchParams;

    if (!customerId) return { title: "New Customer" };

    return { title: `Edit Customer #${customerId}` };
}

export default async function CustomerFromPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    try {
        const { customerId } = await searchParams;

        if (customerId) {
            const customer = await getCustomer(parseInt(customerId));

            if (!customer) {
                return (
                    <>
                        <h2 className="text-2xl mb-2">Customer ID #{customerId} not found</h2>
                        <BackButton title="Go Back" variant="default" />
                    </>
                )
            }
            console.log(customer);
            // Customer form component
            return <CustomerForm customer={customer} />
        } else {
            // New customer form component
            return <CustomerForm />
        }
    } catch (error) {
        if (error instanceof Error) {
            Sentry.captureException(error);
            throw error;
        }
    }
}