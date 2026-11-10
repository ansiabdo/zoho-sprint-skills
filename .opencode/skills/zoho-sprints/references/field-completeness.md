# Work-item field completeness

Read before proposing or writing Stories, Tasks or Bugs. The user's required business fields apply even when a transport schema labels them optional. Discover the target project's actual layout and field definitions, per-type/conditional mandatory rules, visibility, write permissions and accepted values. A layout list or populated item is not a field-definition schema.

## Required business content

- Meaningful item name and description: user/business purpose, scope and observable acceptance criteria.
- Arabic name and concise English name in their verified native layout fields. Do not assume the main item name is either field. Draft names from verified source requirements, label them proposed until reviewed, and respect live field length/type constraints.
- Business requester: verified person/team identity and the native field's expected ID or value. Do not infer the requester from the developer, assignee, Git author, creator, project owner, or a similar display name. Inherit from a parent only if explicitly supported by the project's approved rule and the parent value is verified.
- All other mandatory fields for the operation, target type/layout and status: discover these rather than assuming a universal list. Resolve type, priority, project/sprint/parent, assignments, dates, picklists and any business-specific mandatory fields as applicable. Do not invent estimates, dates or placeholder business people to satisfy validation.

Build a preflight matrix: field label, API key, type, required/conditional rule, current value, proposed value, evidence/source, writable tool argument, and outcome (`verified`, `needs_input`, `unknown_schema`, `unsupported_write`). Existing populated values are preserved unless the user explicitly authorizes a replacement. Required-field checks apply to updates as well as creates; blocked mandatory data prevents the affected write.

## Tool capability boundary

Check the live create/update schema independently of Zoho's layout. If a required custom field exists but the connected MCP tool cannot submit it, record `unsupported_write`. Never invent UDF arguments, assume an undocumented extra object is accepted, or claim that putting its text in description filled the native field. Present a concrete mapping/payload for review and identify the missing official API/MCP operation or authorized UI path needed to complete it. Do not create an intentionally incomplete record or split a required create into a speculative later update.

Field maps belong to the working project's private configuration, not to generic skill defaults. Keys such as UDF_CHAR3 differ across layouts; observed nonempty values alone do not establish labels or requirement flags. Revalidate mapping after layout/type changes and read back native fields after authorized writes. Preserve Developer disclosure and assignment limits.
