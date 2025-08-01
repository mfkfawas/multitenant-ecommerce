import type { CollectionConfig } from "payload";

export const Tenants: CollectionConfig = {
  slug: "tenants",
  admin: {
    useAsTitle: "slug",
  },
  fields: [
    {
      name: "name",
      required: true,
      type: "text",
      label: "Store Name",
      // Admin means the person who is looking at the dashboard
      admin: {
        description: "This is the name of the store(eg: Fawaz's Store)",
      },
    },
    {
      name: "slug",
      type: "text",
      index: true,
      required: true,
      unique: true,
      admin: {
        description:
          "This is the subdomain for the store. (eg: [slug].gumroad.com)",
      },
    },
    { name: "image", type: "upload", relationTo: "media" },
    // This means the person who owns this store has verified the details with Stripe
    {
      name: "stripeAccountId",
      type: "text",
      required: true,
      admin: { readOnly: true },
    },
    // When you see checkbox it basically means a boolean
    {
      name: "stripeDetailsSubmitted",
      type: "checkbox",
      // required: true,
      admin: {
        readOnly: true,
        description:
          "You cannot create products until you submit your stripe details",
      },
    },
  ],
};
