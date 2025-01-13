import { getCustomer } from "@/lib/queries/getCustomer";
import * as Sentry from "@sentry/nextjs";

import { BackButton } from "@/components/BackButton";

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
        } else {
            // New customer form component
        }
    } catch (error) {
        if (error instanceof Error) {
            Sentry.captureException(error);
            throw error;
        }
    }
}