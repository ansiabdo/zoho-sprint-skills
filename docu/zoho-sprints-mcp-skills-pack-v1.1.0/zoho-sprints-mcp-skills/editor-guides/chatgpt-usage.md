# ChatGPT usage

When a Zoho Sprints MCP connection is available in the current ChatGPT environment:

1. Make `skills/zoho-sprints/SKILL.md` and the matching role policy available in the project's instructions/files.
2. Set the profile role and verified user ID.
3. Ask the assistant to list available Zoho Sprints tools and perform read-only verification first.
4. Use explicit requests such as:
   - “وفق سياسة Developer، اعرض الـ User Stories المسندة إليّ في الاسبرنتات النشطة.”
   - “افحص التكرار وتاريخ الاسبرنت قبل إنشاء User Story، ولا تنشئ إذا وجدت تشابهًا محتملًا.”
5. If the MCP connection does not expose a required write tool, the assistant must report that limitation instead of pretending to act.
