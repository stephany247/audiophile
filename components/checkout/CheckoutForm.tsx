"use client";

import { useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCart } from "@/stores/cart";
import Link from "next/link";
import TextField from "@/components/ui/TextField";
import RadioSelect from "@/components/ui/RadioSelect";
import Button from "@/components/ui/Button";
import { formatCurrency } from "@/utils/formatCurrency";
import CartItem from "../cartModal/CartItem";
import ConfirmationModal from "./ConfirmationModal";
import { useRouter } from "next/navigation";

type FormState = {
  name: string;
  email: string;
  phone: string;
  address1: string;
  city: string;
  postalCode: string;
  country: string;
  paymentMethod: "EMONEY" | "CASH_ON_DELIVERY";
  eMoneyNumber?: string;
  eMoneyPin?: string;
};

export default function CheckoutForm() {
  const createOrder = useMutation(api.orders.createOrder);
  const { items, clear } = useCart();

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = 50;
  const taxes = 100;
  const grandTotal = subtotal + shipping + taxes;
  const totals = { subtotal, shipping, taxes, grandTotal };

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

  const formRef = useRef<HTMLFormElement | null>(null);
  const hiddenSubmitRef = useRef<HTMLButtonElement | null>(null);
  const router = useRouter();
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState<string | undefined>(
    undefined
  );

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

    if (form.paymentMethod === "EMONEY") {
      if (!form.eMoneyNumber?.trim()) e.eMoneyNumber = "Required";
      if (!form.eMoneyPin?.trim()) e.eMoneyPin = "Required";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function makeIdempotencyKey() {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      // @ts-ignore
      return (crypto as any).randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

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
      payment: {
        method: form.paymentMethod,
      },
    };

    try {
      const result = await createOrder(order);
      const id = result?._id
        ? String(result._id)
        : result
          ? String(result)
          : undefined;
      setCreatedOrderId(id);
      setConfirmationOpen(true);
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

  // Programmatically trigger form submit from the summary button
  function triggerSubmitFromSummary() {
    if (submitting || items.length === 0) return;
    const formEl = formRef.current;
    if (formEl && "requestSubmit" in formEl) {
      (formEl as HTMLFormElement).requestSubmit();
      return;
    }
    hiddenSubmitRef.current?.click();
  }

  return (
    <section className="bg-bg p-6 pb-16">
      <Link href="/" className="text-gray font-medium inline-block pb-6">
        Go back
      </Link>

      <div className="page-container px-0 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg lg:col-span-2">
          <h4 className="uppercase">Checkout</h4>

          {/* formRef used so we can trigger submit from summary area */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-4 flex flex-col"
          >
            <fieldset className="grid md:grid-cols-2 gap-4 mt-6">
              <legend className="uppercase text-primary font-bold my-6 block">
                Billing details
              </legend>
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
            </fieldset>
            <fieldset className="grid md:grid-cols-2 gap-4 mt-6">
              <legend className="uppercase text-primary! font-bold my-4">
                Shipping Info
              </legend>
              <TextField
                label="Your Address"
                id="address1"
                value={form.address1}
                onChange={(e) => handleChange("address1", e.target.value)}
                error={errors.address1}
                placeholder="1137 Williams Avenue"
                className="md:col-span-2"
              />
              {/* <div className="flex flex-col gap-4"> */}
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
              {/* </div> */}
              <TextField
                label="Country"
                id="country"
                value={form.country}
                onChange={(e) => handleChange("country", e.target.value)}
                error={errors.country}
                placeholder="United States"
              />
            </fieldset>
            <fieldset className="grid md:grid-cols-2 gap-4 mt-6">
              <p className="uppercase text-primary! text-sm font-bold my-4">
                Payment Details
              </p>
              <p className="text-sm! text-black! font-bold md:col-start-1">
                Payment Method
              </p>
              <div className="flex flex-col gap-3 md:col-start-2">
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
                    onChange={(e) =>
                      handleChange("eMoneyNumber", e.target.value)
                    }
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
                    type="password"
                  />
                </>
              )}
            </fieldset>

            {/* hidden native submit so external button can trigger it reliably */}
            <button
              type="submit"
              ref={hiddenSubmitRef}
              className="hidden"
              aria-hidden
            >
              Continue & Pay
            </button>
          </form>
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-white rounded-lg p-6 mt-0 space-y-6 h-fit">
          <h6 className="uppercase mb-4">Summary</h6>

          <div className="space-y-2">
            {items.map((item) => (
              <CartItem key={item.id} item={item} editable={false} compact />
            ))}
          </div>

          {/* Totals Summary (mapped) */}
          <div className="space-y-4 text-sm font-semibold">
            {[
              { label: "TOTAL", value: totals.subtotal },
              { label: "SHIPPING", value: totals.shipping },
              { label: "VAT (INCLUDED)", value: totals.taxes },
              {
                label: "GRAND TOTAL",
                value: totals.grandTotal,
                highlight: true,
              },
            ].map(({ label, value, highlight }) => (
              <div
                key={label}
                className={`flex justify-between ${
                  highlight ? "text-primary text-base mt-8" : ""
                }`}
              >
                <p className="text-base">{label}</p>
                <h6>{formatCurrency(value)}</h6>
              </div>
            ))}
          </div>

          <div>
            <Button
              variant="primary"
              btnType="button"
              className="w-full"
              onClick={triggerSubmitFromSummary}
              disabled={items.length === 0 || submitting}
            >
              {submitting ? "Processing…" : "Continue & Pay"}
            </Button>
          </div>
        </div>
      </div>
      <ConfirmationModal
        open={confirmationOpen}
        onClose={() => {
          setConfirmationOpen(false);
          router.push("/");
          clear();
        }}
        orderId={createdOrderId}
        customerName={form.name || undefined}
        items={items}
        grandTotal={totals.grandTotal}
      />
    </section>
  );
}
