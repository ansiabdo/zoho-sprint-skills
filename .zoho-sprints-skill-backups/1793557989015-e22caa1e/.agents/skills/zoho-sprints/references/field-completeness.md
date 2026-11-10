# Work-item field completeness

Read before proposing or writing Stories, Tasks or Bugs. The user's required business fields apply even when a transport schema labels them optional. Discover the target project's actual layout and field definitions, per-type/conditional mandatory rules, visibility, write permissions and accepted values. A layout list or populated item is not a field-definition schema.

## Required business content

- Meaningful item name and description: user/business purpose, scope and observable acceptance criteria.
- Arabic name and concise English name in their verified native layout fields. Do not assume the main item name is either field. Draft names from verified source requirements, label them proposed until reviewed, and respect live field length/type constraints.
- Business requester: verified person/team identity and the native field's expected ID or value. Do not infer the requester from the developer, assignee, Git author, creator, project owner, or a similar display name. Inherit from a parent only if explicitly supported by the project's approved rule and the parent value is verified.
- All other mandatory fields for the operation, target type/layout and status: discover these rather than assuming a universal list. Resolve type, priority, project/sprint/parent, assignments, dates, picklists and any business-specific mandatory fields as applicable. Do not invent estimates, dates or placeholder business people to satisfy validation.

Build a preflight matrix: field label, API key, type, required/conditional rule, current value, proposed value, evidence/source, writable tool argument, and outcome (`verified`, `needs_input`, `unknown_schema`, `unsupported_write`). Existing populated values are preserved unless the user explicitly authorizes a replacement. Required-field checks apply to updates as well as creates; blocked mandatory data prevents the affected write.

## Assignee and analyst routing

Resolve the project's **Current Project Team** from project details before setting owners. Map Analyst → Analysis team field; Main Mobile / Main Web / Main Back End → Assignee according to the Story's actual surfaces. A Story that spans mobile, web/admin and backend gets every applicable main owner. Backups are not default assignees. Do not use requester, creator, Git author or project owner as a substitute. See [project team routing](project-team-routing.md).

## Description structure

The description is multi-line structured text, not a one-line summary. Preserve the existing description byte-for-byte, then add the exact separator on its own line:

```text
##+=================================================##
```

Below it, write the new/actual-delivery section with headings, criterion verdicts and evidence. Never overwrite the old business explanation. If the old text is HTML, preserve the markup and insert the separator as its own paragraph. See [actual delivery](../workflows/document-actual-delivery.md).

## Estimation and priority

Use the project's Fibonacci scale and estimate by analogy to the closest completed Stories in the same project: median of 3 analogs, one-step adjustment per material difference, record analog IDs and confidence. Set priority from business impact, urgency, risk and dependency; do not copy a label or equate priority with size. See [estimation and priority](estimation-and-priority.md).

## Sprint-close naming

When unfinished or cloned work continues in another sprint, prefix the title, Story Arabic Name and Story English Name with `Part n - `. Link the parts and preserve epic, release and parent. Do not rename fully completed items that are not being carried. See [link and clone](../workflows/link-and-clone.md).

## Tool capability boundary

Check the live create/update schema independently of Zoho's layout. If a required custom field exists but the connected MCP tool cannot submit it, record `unsupported_write`. Never invent UDF arguments, assume an undocumented extra object is accepted, or claim that putting its text in description filled the native field. Present a concrete mapping/payload for review and identify the missing official API/MCP operation or authorized UI path needed to complete it. Do not create an intentionally incomplete record or split a required create into a speculative later update.

Field maps belong to the working project's private configuration, not to generic skill defaults. Keys such as UDF_CHAR3 differ across layouts; observed nonempty values alone do not establish labels or requirement flags. Revalidate mapping after layout/type changes and read back native fields after authorized writes. Preserve Developer disclosure and assignment limits.
