# Large field writes and the Zoho Sprints API fallback

MCP `ZohoSprints_UpdateItem` sends fields in the **query string**. Large descriptions can fail with:

- `414 Request-URI Too Large`
- `Error in executing tool`

Do not split or truncate the description to fit. Do not put the content in another field.

## When to use the fallback

Use the fallback only when:

1. The target project/sprint/item IDs are already verified.
2. The write is authorized and the item is not in a completed/locked sprint.
3. MCP rejects the description because of request size, not permission or validation.
4. The full new description is known and the old description has been preserved exactly.

## Endpoint

Base: `https://sprintsapi.zoho.com/zsapi`

Read details:

```http
GET /team/{teamId}/projects/{projectId}/sprints/{sprintId}/item/{itemId}/?action=details
Authorization: Zoho-oauthtoken <token>
```

Update:

```http
POST /team/{teamId}/projects/{projectId}/sprints/{sprintId}/item/{itemId}/
Authorization: Zoho-oauthtoken <token>
Content-Type: application/x-www-form-urlencoded

description=<URL-encoded HTML>
```

## Critical detail

A JSON body such as `{"description":"..."}` may return HTTP 200 with `status: success` **without persisting the description**. Always use `application/x-www-form-urlencoded`.

After writing, read the item back and verify:

- description length changed as expected;
- the separator is present;
- the old text prefix is byte-for-byte preserved;
- no other field changed unintentionally.

## Token

The MCP auth store may contain a token with Zoho Sprints scopes. Read it from the configured MCP auth path; never print it, log it, commit it, or send it to another host. Do not reuse an MCP token as a general Zoho credential if its scope or audience does not include the target API.

## Safety

- Prefer MCP when the payload fits.
- Record the write intent and read-back in the project ledger.
- Treat a 200 without read-back as unverified.
- If the API returns a permission error (`7401.14` or equivalent), stop; do not retry through another path.
