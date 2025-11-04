# 🎧 Audiophile E-Commerce Checkout

A pixel-perfect, fully functional checkout experience built with **Next.js** and **Convex**. Implements the official **Audiophile Figma design**, handling end-to-end order creation, validation, and confirmation email delivery.

---

## 🚀 Tech Stack

- **Next.js (React Framework)**
- **TypeScript**
- **Tailwind CSS** for styling
- **Convex** for backend and database
- **Resend** for transactional email delivery
- **Zustand** for state management

---

## 🧩 Features

- Pixel-perfect UI based on Audiophile Figma
- Responsive design across mobile, tablet, and desktop
- Fully validated checkout form with inline error messages
- Real-time cart and quantity management using Zustand
- Convex backend integration for order storage
- Transactional confirmation email via Resend
- Accessible and keyboard-friendly interactions

---

## 💳 Core Functionality

### 🧾 Checkout Form

- Collects user info (name, email, phone, address, etc.)
- Inline validation with clear error states
- Handles invalid emails, empty fields, and duplicate submissions

### 📦 Order Storage (Convex)

Stores the following details:

- Customer and shipping information
- Items (id, name, price, quantity)
- Totals (subtotal, shipping, taxes, grand total)
- Order status and timestamp

### 📧 Confirmation Email

- Automatically sent after successful checkout
- Includes:
  - Personalized greeting
  - Order ID and summary of purchased items
  - Shipping details and support contact info
  - “View your order” call-to-action link
- Fully responsive and HTML-formatted

---

## 🛠️ Setup & Installation

## 🧰 Requirements

Before you start, make sure you have these installed:

- **Node.js** (v18 or newer)
- **npm** or **yarn**
- **Convex CLI** (`npm install convex`)
- **Resend account** (for sending confirmation emails)
- **Git**

---

## ⚙️ Backend Setup — Convex & Resend

This app uses **Convex** for backend data storage and **Resend** for sending transactional emails.

---

### 🗄️ Setting Up Convex

Convex handles storing orders, user details, and totals from the checkout form.

#### 1. Install Convex CLI

```bash
npm install convex
```

#### 2. Initialize Convex in your project

Run this command inside your project root:

```bash
npx convex dev
```

This will:

- Log you into your Convex account (or prompt you to create one)

- Create a new Convex project in the cloud

- Generate a convex/ directory in your project

#### 3. Define your database schema

Inside the new convex/schema.ts file, define your data structure:

```bash

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  orders: defineTable({
    name: v.string(),
    ....
    phone: v.string(),
    });
});

```

#### 4. Create your backend mutation

Inside convex/orders.ts, create a mutation function to handle new orders:

```bash
import { mutation } from "./_generated/server";
import { v } from "convex/values";

import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createOrder = mutation({
  args: { name: v.string(), email: v.string(), address: v.string(), items: v.array(v.any()), total: v.number() },
  handler: async (ctx, args) => {
    await ctx.db.insert("orders", { ...args, createdAt: new Date().toISOString() });
  },
});

```

#### 5. Deploy to Convex Cloud

Once everything is set up, deploy your backend:
```bash
npx convex deploy
```


Copy your project URL (e.g. https://your-project.convex.cloud) for later use.


Keep this handy — you’ll need it in your environment variables.

### 📬 Setting Up Resend

Resend is used to send confirmation emails after a successful order.

1. Create a Resend
 account and API key.

2. Install:

```bash
npm install resend
```


3. Add environment variables to .env.local:

```bash
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
RESEND_API_KEY=your_resend_api_key
```

4. Send confirmation emails:
```bash
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
await resend.emails.send({
  from: "Audiophile <no-reply@audiophile.com>",
  to: args.email,
  subject: "Order Confirmation",
  html: `<h2>Hi ${args.name}, your order has been received!</h2>`,
});
```


✅ That’s it!

Convex now stores your order data

Resend sends out order confirmation emails

Both services are connected to your app and ready to go 🚀

---

🧡 Credits

Built for the HNG Internship Stage 3 Task 🧑‍💻

Developed with ❤️ using Next.js, Convex, and Tailwind CSS.
