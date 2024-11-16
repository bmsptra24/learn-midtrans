"use client";
import { createTransaction } from "@/utils/createTransaction";
import { useState } from "react";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // Buat token transaksi
      const token = await createTransaction(`ORDER-${Date.now()}`, 100000, {
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        phone: "08123456789",
      });

      // Panggil Snap modal
      if (token) {
        window.snap.pay(token);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Midtrans Payment Gateway</h1>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? "Processing..." : "Checkout"}
      </button>
    </div>
  );
}
