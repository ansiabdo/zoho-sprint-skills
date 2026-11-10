# Check: read scope and duplicate evidence

Before claiming a list is complete or no duplicate exists, record:

**Mandatory before any create (Admin and Developer, Story/Task/Bug, Git and BMAD):** resolve and search the project's Backlog as well as relevant active, upcoming, completed and canceled sprints, including children and completed items. Backlog is a first-class search scope, not a fallback destination. Do not restrict duplicate checks to the intended active sprint. Page each scope to exhaustion. If a scope is unavailable or incomplete, mark `unknown_coverage` and keep creation pending; do not interpret access failure as an empty backlog. Respect Developer disclosure limits throughout.

An existing Backlog match is reused/reported, or proposed for an authorized move/assignment after review. Never create a copy in the active sprint just because the original is in Backlog. Search child work by meaning and source references too, since a BMAD Story may already exist as a Zoho Task.

- Exact workspace, project(s), sprint(s), item types and time range searched.
- Tool/filter used and every returned page (`index`, `range`, end condition). Confirm pagination exhausted for the relevant scope.
- Whether backlog, recently completed items or other active sprints were covered; if not, say why.
- Whether user identity and assignee IDs were verified. Filter Developer output by exact ID; never display another person's item details.
- For each plausible match, compare outcome, description, acceptance criteria, parent, module/entity/API and status. Assign the contract duplicate outcome with reasons.
- Any unavailable tool, permission filter, ambiguous timezone, partial page range or stale source that limits a negative conclusion.

`none_in_scope` means only that the documented searched scope had no match. `unknown_coverage` means creation should wait for a targeted review. A search result from one Sprint is not a project-wide negative proof.
