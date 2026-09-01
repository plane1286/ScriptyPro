import { stripe, PLANS, type PlanType } from "@/lib/stripe";
import { getAuthUser } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  const authUser = await getAuthUser();
  if (!authUser) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!stripe) {
    return Response.json(
      { error: "Billing is not configured" },
      { status: 503 }
    );
  }

  try {
    const { plan } = (await request.json()) as { plan: PlanType };

    if (!plan || plan === "free" || !PLANS[plan]) {
      return Response.json({ error: "Invalid plan" }, { status: 400 });
    }

    const planConfig = PLANS[plan];

    // Get or create Stripe customer
    const userRecord = await db
      .select()
      .from(users)
      .where(eq(users.id, authUser.userId))
      .limit(1);

    if (userRecord.length === 0) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const user = userRecord[0];

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: [
        {
          price: planConfig.priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?upgraded=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/pricing?canceled=true`,
      metadata: {
        userId: user.id,
        plan,
      },
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return Response.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
