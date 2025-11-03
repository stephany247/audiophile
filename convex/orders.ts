import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createOrder = mutation({
  args: {
    idempotencyKey: v.optional(v.string()),
    customer: v.object({
      name: v.string(),
      email: v.string(),
      phone: v.optional(v.string()),
    }),
    shipping: v.object({
      address1: v.string(),
      postalCode: v.string(),
      city: v.string(),
      country: v.string(),
    }),
    items: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        price: v.number(),
        qty: v.number(),
      })
    ),
    totals: v.object({
      subtotal: v.number(),
      shipping: v.number(),
      taxes: v.number(),
      grandTotal: v.number(),
    }),
    payment: v.object({
      method: v.union(v.literal("EMONEY"), v.literal("CASH_ON_DELIVERY")),
    }),
  },
  handler: async (ctx, args) => {
    // Prevent duplicate orders using the idempotency index
    if (args.idempotencyKey) {
      const existing = await ctx.db
        .query("orders")
        .withIndex("by_idempotencyKey", (q) =>
          q.eq("idempotencyKey", args.idempotencyKey)
        )
        .unique();
      if (existing) return existing;
    }

    // Insert with server-controlled order status and timestamp
    const orderId = await ctx.db.insert("orders", {
      ...args,
      status: "pending",
    });

    return { _id: orderId };
  },
});
