import type { CollectionConfig } from "payload";
import { tenantsArrayField } from "@payloadcms/plugin-multi-tenant/fields";

const defaultTenantArrayField = tenantsArrayField({
  tenantsArrayFieldName: "tenants",
  tenantsCollectionSlug: "tenants",
  tenantsArrayTenantFieldName: "tenant",
  arrayFieldAccess: {
    read: () => true,
    create: () => true,
    update: () => true,
  },
  tenantFieldAccess: {
    read: () => true,
    create: () => true,
    update: () => true,
  },
});

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
    { name: "username", required: true, unique: true, type: "text" },
    {
      name: "roles",
      type: "select",
      options: ["user", "super-admin"],
      defaultValue: ["user"],
      hasMany: true,
      admin: { position: "sidebar" },
    },
    {
      ...defaultTenantArrayField,
      admin: { ...(defaultTenantArrayField?.admin || {}), position: "sidebar" },
    },
  ],
};
