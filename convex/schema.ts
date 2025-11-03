import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  orders: defineTable({
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
      // only store method (no pins, no provider refs, no payment status)
      method: v.union(v.literal("EMONEY"), v.literal("CASH_ON_DELIVERY")),
    }),
    // order-level status and timestamp (set on insert by the server)
    status: v.optional(
      v.union(
        v.literal("pending"),
        v.literal("processing"),
        v.literal("completed"),
        v.literal("cancelled")
      )
    ),
    createdAt: v.optional(v.number()), // epoch ms
  }).index("by_idempotencyKey", ["idempotencyKey"]),
});
