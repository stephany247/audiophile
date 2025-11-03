"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCart } from "@/stores/cart";
import Link from "next/link";
import TextField from "@/components/ui/TextField";
import RadioSelect from "@/components/ui/RadioSelect";
import Button from "@/components/ui/Button";

type FormState = {
  name: string;
  email: string;
  phone: string;
  address1: string;
  city: string;
  postalCode: string;
  country: string;
  paymentMethod: "EMONEY" | "CASH_ON_DELIVERY";
  // keep e-money inputs in UI only (not sent to server)
  eMoneyNumber?: string;
  eMoneyPin?: string;
};

export default function CheckoutForm() {
  // adjust to match your generated API namespace if different:
  const createOrder = useMutation(api.orders.createOrder);
  const { items, clear } = useCart();

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    address1: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "CASH_ON_DELIVERY",
    eMoneyNumber: "",
    eMoneyPin: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = <K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) => setForm((f) => ({ ...f, [key]: value }));

  function validate(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.address1.trim()) e.address1 = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.postalCode.trim()) e.postalCode = "Required";
    if (!form.country.trim()) e.country = "Required";

    // e-money inputs are optional for the server; only validate if you want them required in UI
    if (form.paymentMethod === "EMONEY") {
      if (!form.eMoneyNumber?.trim()) e.eMoneyNumber = "Required";
      if (!form.eMoneyPin?.trim()) e.eMoneyPin = "Required";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function makeIdempotencyKey() {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      // browser or Node 19+
      // @ts-ignore - randomUUID exists on modern runtimes
      return (crypto as any).randomUUID();
    }
    // fallback
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("handleSubmit fired", { form, items });
    if (!validate()) return;

    setSubmitting(true);

    // compute totals clearly (typed variables avoid TS index errors)
    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const shipping = 50;
    const taxes = 100;
    const grandTotal = subtotal + shipping + taxes;
    const totals = { subtotal, shipping, taxes, grandTotal };

    const order = {
      idempotencyKey: makeIdempotencyKey(),
      customer: {
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
      },
      shipping: {
        address1: form.address1,
        city: form.city,
        postalCode: form.postalCode,
        country: form.country,
      },
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        qty: i.qty,
      })),
      totals,
      // Only send payment.method — no PINs, provider refs, or status.
      payment: {
        method: form.paymentMethod,
      },
    };

    try {
      await createOrder(order);
      alert("Order created successfully!");
      clear();
      // reset form (preserve choice if you want)
      setForm({
        name: "",
        email: "",
        phone: "",
        address1: "",
        city: "",
        postalCode: "",
        country: "",
        paymentMethod: "CASH_ON_DELIVERY",
        eMoneyNumber: "",
        eMoneyPin: "",
      });
    } catch (err) {
      console.error("Error creating order:", err);
      alert("Something went wrong creating the order.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-bg p-6 pb-16">
      <Link href="/" className="text-gray font-medium inline-block pb-6">
        Go back
      </Link>
      <div className="p-4 bg-white rounded-lg">
        <h4 className="uppercase">Checkout</h4>
        <p className="uppercase text-primary! font-bold my-6">Billing details</p>
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
          <TextField
            label="Name"
            id="name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            error={errors.name}
            placeholder="Alexei Ward"
          />
          <TextField
            label="Email Address"
            id="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={errors.email}
            placeholder="alexei@mail.com"
            type="email"
          />
          <TextField
            label="Phone number"
            id="phone"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            error={errors.phone}
            placeholder="+1 202-555-0136"
            type="tel"
          />

          <p className="uppercase text-primary! font-bold my-6">Shipping</p>
          <TextField
            label="Your Address"
            id="address1"
            value={form.address1}
            onChange={(e) => handleChange("address1", e.target.value)}
            error={errors.address1}
            placeholder="1137 Williams Avenue"
          />
          <div className="flex gap-4">
            <TextField
              label="ZIP Code"
              id="postalCode"
              value={form.postalCode}
              onChange={(e) => handleChange("postalCode", e.target.value)}
              error={errors.postalCode}
              placeholder="10001"
            />
            <TextField
              label="City"
              id="city"
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
              error={errors.city}
              placeholder="New York"
            />
          </div>
          <TextField
            label="Country"
            id="country"
            value={form.country}
            onChange={(e) => handleChange("country", e.target.value)}
            error={errors.country}
            placeholder="United States"
          />

          <p className="uppercase text-primary! text-sm font-bold my-6">
            Payment Method
          </p>
          <div className="flex flex-col gap-3">
            <RadioSelect
              label="e-Money"
              name="paymentMethod"
              value="EMONEY"
              checked={form.paymentMethod === "EMONEY"}
              onChange={(v) => handleChange("paymentMethod", v as any)}
            />
            <RadioSelect
              label="Cash on Delivery"
              name="paymentMethod"
              value="CASH_ON_DELIVERY"
              checked={form.paymentMethod === "CASH_ON_DELIVERY"}
              onChange={(v) => handleChange("paymentMethod", v as any)}
            />
          </div>

          {form.paymentMethod === "EMONEY" && (
            <>
              <TextField
                label="e-Money Number"
                id="eMoneyNumber"
                value={form.eMoneyNumber}
                onChange={(e) => handleChange("eMoneyNumber", e.target.value)}
                error={errors.eMoneyNumber}
                placeholder="238521993"
              />
              <TextField
                label="e-Money Pin"
                id="eMoneyPin"
                value={form.eMoneyPin}
                onChange={(e) => handleChange("eMoneyPin", e.target.value)}
                error={errors.eMoneyPin}
                placeholder="PIN"
                type="6891"
              />
            </>
          )}

          <Button btnType="submit" variant="primary" className="w-full" disabled={submitting}>
            {submitting ? "Processing…" : "Continue & Pay"}
          </Button>
        </form>
      </div>
    </section>
  );
}
