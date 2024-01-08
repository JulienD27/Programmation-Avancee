import {ReactNode} from "react";
import {Card, SectionContainer} from "tp-kit/components";
import prisma from "../../utils/prisma";
import {OrderTable} from "../../components/order-table";

export default async function Layout({children}: { children: ReactNode }) {
    const orders = await prisma.order.findMany();

    return (
        <>
            {/* Orders list */}
            <div style={{
                display: 'flex',
                flexDirection: 'row'}}>
                <SectionContainer wrapperClassName="py-24 min-h-[80vh]">
                    <div>
                        <Card>{children}</Card>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                        <OrderTable orders={orders} />
                    </div>
                </SectionContainer>
            </div>
        </>
    );
}
