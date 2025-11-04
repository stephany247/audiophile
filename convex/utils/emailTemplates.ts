type OrderItem = { id?: string; name: string; price: number; qty: number };
type Customer = { name?: string; email?: string; phone?: string };
type Shipping = { address1: string; city: string; postalCode: string; country: string };
type Totals = { subtotal: number; shipping: number; taxes: number; grandTotal: number };

export function buildOrderConfirmationEmail(opts: {
    orderId: string;
    customer: Customer;
    items: OrderItem[];
    shipping: Shipping;
    totals: Totals;
    appUrl: string;
    supportEmail: string;
    fromName?: string;
}) {
    const { orderId, customer, items, shipping, totals, appUrl, supportEmail } = opts;

    const safeName = escapeHtml(customer.name || "Customer");
    const orderUrl = `${appUrl.replace(/\/$/, "")}/orders/${orderId}`;

    const itemsHtml = items
        .map(
            (it) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #eee;">
          <strong style="display:block">${escapeHtml(it.name)}</strong>
          <small style="color:#666">${it.price} x ${it.qty}</small>
        </td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right;">
          ${formatCurrencyHtml(it.price * it.qty)}
        </td>
      </tr>`
        )
        .join("");

    const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>
    body{margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial;color:#111}
    .container{max-width:680px;margin:0 auto;padding:24px}
    .card{background:#fff;border-radius:8px;padding:20px;box-shadow:0 2px 6px rgba(0,0,0,.06)}
    .btn{display:inline-block;padding:12px 20px;background:#d87d4a;color:#fff;text-decoration:none;border-radius:6px}
    .muted{color:#6b7280}
    @media (max-width:600px){.container{padding:16px}.card{padding:16px}}
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h2 style="margin:0 0 8px 0">Thanks for your order, ${safeName}! We've received your order and we'll send shipment updates.</h2>
      <p class="muted" style="margin:0 0 16px 0">Order <strong>#${escapeHtml(orderId)}</strong></p>

      <h3 style="margin-top:0">Order summary</h3>
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:16px;">
        <tbody>
          ${itemsHtml}
          <tr>
            <td style="padding:12px 0;border-top:1px solid #eee;color:#6b7280">Subtotal</td>
            <td style="padding:12px 0;border-top:1px solid #eee;text-align:right">${formatCurrencyHtml(totals.subtotal)}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#6b7280">Shipping</td>
            <td style="padding:8px 0;text-align:right">${formatCurrencyHtml(totals.shipping)}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#6b7280">VAT (included)</td>
            <td style="padding:8px 0;text-align:right">${formatCurrencyHtml(totals.taxes)}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;font-weight:600">Grand total</td>
            <td style="padding:12px 0;font-weight:600;text-align:right">${formatCurrencyHtml(totals.grandTotal)}</td>
          </tr>
        </tbody>
      </table>

      <h3 style="margin:0 0 8px 0">Shipping details</h3>
      <p class="muted" style="margin:0 0 16px 0">
        ${escapeHtml(shipping.address1)}<br/>
        ${escapeHtml(shipping.city)} — ${escapeHtml(shipping.postalCode)}<br/>
        ${escapeHtml(shipping.country)}
      </p>

      <p style="margin:0 0 16px 0">Need help? Email us at <a href="mailto:${escapeHtml(supportEmail)}">${escapeHtml(supportEmail)}</a>.</p>

      <a href="${escapeHtml(orderUrl)}" class="btn" target="_blank" rel="noopener">View your order</a>

      <p class="muted" style="margin-top:18px;font-size:13px;">
        We'll email you when your order ships. Thank you for shopping with us!
      </p>
    </div>
  </div>
</body>
</html>`;

    const textItems = (items || [])
        .map((it) => `- ${it.name} x${it.qty} — ${formatCurrencyTxt(it.price * it.qty)}`)
        .join("\n");

    const text = `Hi ${customer.name || "Customer"},

Thanks for your order! Order #${orderId}

Items:
${textItems}

Subtotal: ${formatCurrencyTxt(totals.subtotal)}
Shipping: ${formatCurrencyTxt(totals.shipping)}
VAT: ${formatCurrencyTxt(totals.taxes)}
Grand total: ${formatCurrencyTxt(totals.grandTotal)}

Shipping to:
${shipping.address1}
${shipping.city} — ${shipping.postalCode}
${shipping.country}

You can view your order: ${orderUrl}

Need help? Contact us at ${supportEmail}

Thanks,
${opts.fromName ?? "Audiophile Team"}`;

    const subject = `Order confirmation — #${orderId}`;

    return { subject, html, text };
}

/* ---------- helpers ---------- */

function escapeHtml(s: any) {
    if (s === null || s === undefined) return "";
    return String(s)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function formatCurrencyHtml(v: number) {
    return `$${Number(v).toLocaleString(undefined, { minimumFractionDigits: 0 })}`;
}
function formatCurrencyTxt(v: number) {
    return `$${Number(v).toLocaleString(undefined, { minimumFractionDigits: 0 })}`;
}
