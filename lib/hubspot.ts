// HubSpot CRM v3 integration. Env-gated: every export no-ops (and warns once)
// when HUBSPOT_TOKEN is unset, so the lead pipeline keeps working before the
// CRM is configured. Token is a HubSpot Private App access token with the
// `crm.objects.contacts.read` + `crm.objects.contacts.write` scopes.

const TOKEN = process.env.HUBSPOT_TOKEN;
const BASE = "https://api.hubapi.com";

export type HubSpotContact = {
  email: string;
  firstname?: string;
  lastname?: string;
  /** Free-form extra contact properties (must exist in the HubSpot portal). */
  properties?: Record<string, string>;
};

function authHeaders() {
  return {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  };
}

async function findContactId(email: string): Promise<string | null> {
  const res = await fetch(`${BASE}/crm/v3/objects/contacts/search`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      filterGroups: [
        {
          filters: [
            { propertyName: "email", operator: "EQ", value: email },
          ],
        },
      ],
      properties: ["email"],
      limit: 1,
    }),
  });
  if (!res.ok) {
    console.error("HubSpot search failed", res.status, await res.text());
    return null;
  }
  const data = (await res.json()) as { results?: Array<{ id: string }> };
  return data.results?.[0]?.id ?? null;
}

/**
 * Create or update a HubSpot contact by email. Returns the contact id, or null
 * when HubSpot is not configured / the call failed (never throws — lead capture
 * must not fail because the CRM is down).
 */
export async function upsertContact(
  contact: HubSpotContact,
): Promise<string | null> {
  if (!TOKEN) {
    console.warn("HUBSPOT_TOKEN not set — skipping CRM upsert.");
    return null;
  }

  const properties: Record<string, string> = {
    email: contact.email,
    ...(contact.firstname ? { firstname: contact.firstname } : {}),
    ...(contact.lastname ? { lastname: contact.lastname } : {}),
    ...contact.properties,
  };

  try {
    const existingId = await findContactId(contact.email);
    const url = existingId
      ? `${BASE}/crm/v3/objects/contacts/${existingId}`
      : `${BASE}/crm/v3/objects/contacts`;
    const res = await fetch(url, {
      method: existingId ? "PATCH" : "POST",
      headers: authHeaders(),
      body: JSON.stringify({ properties }),
    });
    if (!res.ok) {
      console.error("HubSpot upsert failed", res.status, await res.text());
      return null;
    }
    const data = (await res.json()) as { id: string };
    return data.id;
  } catch (err) {
    console.error("HubSpot upsert threw", err);
    return null;
  }
}

export type NurtureLead = {
  id: string;
  email: string;
  firstName?: string;
  /** Index of the next nurture step to send (0 = none sent yet). */
  nurtureStep: number;
  /** ms epoch the contact was created. */
  createdAt: number;
};

/**
 * Returns lead-stage contacts for the nurture drip. Reads the custom
 * `nurture_step` property (create it in HubSpot as a number field). Returns []
 * when HubSpot is unconfigured.
 */
export async function getNurtureLeads(limit = 100): Promise<NurtureLead[]> {
  if (!TOKEN) return [];
  try {
    const res = await fetch(`${BASE}/crm/v3/objects/contacts/search`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        filterGroups: [
          { filters: [{ propertyName: "lifecyclestage", operator: "EQ", value: "lead" }] },
        ],
        properties: ["email", "firstname", "nurture_step", "createdate"],
        limit,
      }),
    });
    if (!res.ok) {
      console.error("HubSpot nurture search failed", res.status, await res.text());
      return [];
    }
    const data = (await res.json()) as {
      results?: Array<{ id: string; properties: Record<string, string | null> }>;
    };
    return (data.results ?? []).map((r) => ({
      id: r.id,
      email: r.properties.email ?? "",
      firstName: r.properties.firstname ?? undefined,
      nurtureStep: Number(r.properties.nurture_step ?? 0) || 0,
      createdAt: r.properties.createdate ? Date.parse(r.properties.createdate) : Date.now(),
    }));
  } catch (err) {
    console.error("HubSpot nurture search threw", err);
    return [];
  }
}

/** Advances a contact's nurture_step counter. */
export async function setNurtureStep(id: string, step: number): Promise<void> {
  if (!TOKEN) return;
  try {
    await fetch(`${BASE}/crm/v3/objects/contacts/${id}`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ properties: { nurture_step: String(step) } }),
    });
  } catch (err) {
    console.error("HubSpot setNurtureStep threw", err);
  }
}
