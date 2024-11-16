"use server";

import { MidtransClient } from "midtrans-node-client"

export async function createTransaction(orderId: string, amount: number, customer: { firstName: string; lastName: string; email: string; phone: string }) {
    // Inisialisasi Snap Midtrans
    const snap = new MidtransClient.Snap({
        isProduction: false, // Gunakan true untuk produksi
        serverKey: process.env.MIDTRANS_SERVER_KEY!,
    });

    // Parameter Transaksi
    const parameter = {
        transaction_details: {
            order_id: orderId,
            gross_amount: amount,
        },
        customer_details: {
            first_name: customer.firstName,
            last_name: customer.lastName,
            email: customer.email,
            phone: customer.phone,
        },
    };

    // Buat Token Transaksi
    const transaction = await snap.createTransaction(parameter);
    return transaction.token;
}
