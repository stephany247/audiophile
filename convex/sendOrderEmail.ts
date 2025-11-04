import { internalAction } from "./_generated/server";
import { v } from "convex/values";
import { buildOrderConfirmationEmail } from "./utils/emailTemplates";

export const sendOrderConfirmation = internalAction({
    args: {
        orderId: v.string(),
        customer: v.object({ name: v.optional(v.string()), email: v.string(), phone: v.optional(v.string()) }),
        items: v.array(v.object({ id: v.string(), name: v.string(), price: v.number(), qty: v.number() })),
        shipping: v.object({ address1: v.string(), city: v.string(), postalCode: v.string(), country: v.string() }),
        totals: v.object({ subtotal: v.number(), shipping: v.number(), taxes: v.number(), grandTotal: v.number() }),
    },
    handler: async (ctx, args) => {
        const RESEND_API_KEY = process.env.RESEND_API_KEY;
        const FROM = process.env.RESEND_FROM_EMAIL;
        const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL?? "support@audiophilestore.com";
        const APP_URL = process.env.APP_URL ?? "https://audiophile-88ksyr8ew-stephanie-oguochas-projects.vercel.app/";

        if (!RESEND_API_KEY || !FROM) {
            console.log("Resend config missing; skipping email send.");
            return;
        }

        const { subject, html, text } = buildOrderConfirmationEmail({
            orderId: args.orderId,
            customer: args.customer,
            items: args.items,
            shipping: args.shipping,
            totals: args.totals,
            appUrl: APP_URL,
            supportEmail: SUPPORT_EMAIL,
            fromName: "Audiophile",
        });

        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${RESEND_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: FROM,
                to: args.customer.email,
                subject,
                html,
                text,
            }),
        });

        if (!res.ok) {
            const body = await res.text();
            console.log("Resend send failed:", res.status, body);
        } else {
            console.log("Resend email queued for order", args.orderId);
        }
    },
});
