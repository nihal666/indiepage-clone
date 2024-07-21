import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser } from "@/lib/actions";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  const eventType = evt.type;
  if (eventType === "user.created") {
    const { id, email_addresses } = evt.data;

    if (!email_addresses || email_addresses.length === 0) {
      console.error("No email addresses provided in the webhook event");
      return new Response("Error occurred -- no email addresses", {
        status: 400,
      });
    }

    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
    };

    try {
      await createUser(user.clerkId, user.email);
      return new Response("User created successfully", { status: 200 });
    } catch (error) {
      console.error("Error creating user:", error);
      return new Response("Error occurred while creating user", {
        status: 500,
      });
    }
  }

  return new Response("Event type not handled", { status: 400 });
}
