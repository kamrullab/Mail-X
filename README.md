<p align="center">
  <img src="public/icon-192.png" alt="Mail-X logo" width="96" />
</p>

# Mail-X

Mail-X is a customized, self-hosted email, calendar, booking, storage, and AI-assistant application for custom domains. It is derived from the open-source Mailflare project and is designed primarily for Cloudflare Workers.

> Status: customized development build. Review the security and license checklist before offering it as a public service.

## What is customized

- Product name, metadata, favicon, PWA icons, and visible interface text use **Mail-X**.
- Community installations can customize the app name and icon.
- Community installations can create **unlimited enabled accounts**.
- Account-level email forwarding is enabled in the Community build.
- Cloudflare resources use isolated Mail-X names:
  - Worker: `mail-x`
  - D1 database: `mail-x`
  - R2 bucket: `mail-x-raw`
  - Queues: `mail-x-inbound`, `mail-x-outbound`, `mail-x-agent`
- Compatibility-critical Mailflare headers and backup formats are intentionally retained so imports, exports, and existing email-processing behavior do not break.
- License purchase, activation, upgrade indicators, and license pages are removed from the user interface. Backend compatibility code remains for now.
- Team-only shared-mailbox behavior is still present.

Community account creation is unlimited because `accountSeatLimit` is set to `null` in `src/lib/licenses/service.ts`.

## Current features

- Custom-domain email sending and receiving
- Personal mailboxes, aliases, folders, search, archive, snooze, spam, trash, signatures, and automatic replies
- Email routing and forwarding rules
- Cloudflare, Resend, and Amazon SES providers
- Calendar, recurring events, attendee invitations, and public booking pages
- Contacts and IMAP/MBOX import and export
- Attachments, Drive files, and storage through R2, Backblaze B2, or Amazon S3
- Multiple accounts with permissions
- MFA, recovery codes, password reset, audit logs, API keys, webhooks, backups, JMAP, and MCP
- Optional AI-assisted email search, drafting, and calendar tools
- PWA and Web Push support
- Multiple languages, including Bengali

## What you can build in the future

Mail-X can be extended without changing its overall architecture. Useful future improvements include:

1. **Custom plans and quotas**
   - Change the account limit.
   - Add per-user storage or sending limits.
   - Create your own billing integration.

2. **Team collaboration**
   - Build an independent shared-inbox implementation.
   - Add assignment, internal notes, mentions, and approval flows.

3. **Branding and UI**
   - Add custom colors, login backgrounds, email templates, and organization-specific themes.
   - Replace remaining upstream documentation text while retaining required copyright and license notices.

4. **Email operations**
   - Add more SMTP/API providers.
   - Improve bounce handling, suppression lists, delivery analytics, and domain-health monitoring.

5. **AI features**
   - Use Cloudflare Workers AI or another OpenAI-compatible provider.
   - Add mailbox-specific instructions, categorization, summaries, and draft workflows.
   - AI is optional; normal email features should continue working without it.

6. **Security and administration**
   - Add SSO/OIDC, organization policies, session management, security alerts, and retention controls.
   - Add automated dependency and vulnerability scanning.

7. **Mobile experience**
   - Improve the PWA or build native mobile clients using the API/JMAP interfaces.

## Architecture

| Component | Technology |
| --- | --- |
| UI | React 19, Next.js 16, Tailwind CSS 4 |
| Cloudflare build | Vinext, Vite, Wrangler |
| Database | Cloudflare D1 with Drizzle ORM |
| Object storage | R2, Backblaze B2, or Amazon S3 |
| Background work | Cloudflare Queues and Cron Triggers |
| Realtime | Durable Objects and WebSockets |
| Optional self-hosted runtime | Docker, SQLite, local files or S3-compatible storage |

## Local development

Requirements:

- A supported Node.js release. Some current dependencies require a newer Node 22 patch release than Node 22.17.
- npm
- A Cloudflare account for remote bindings and deployment
- Windows Docker/self-host builds using `better-sqlite3` may require the current Visual Studio C++ Build Tools and Windows SDK.

```powershell
cd D:\mailflare\Mail-X
npm ci
Copy-Item .dev.vars.example .dev.vars
npm run db:migrate:local
npm run dev
```

Open `http://localhost:3000`.

Generated directories such as `node_modules`, `.next`, `.vinext`, `.wrangler`, and `dist` are intentionally excluded from the clean source tree and can be recreated.

## Cloudflare deployment

Mail-X expects these resources from `wrangler.jsonc`:

- D1 database `mail-x`
- R2 bucket `mail-x-raw`
- Queues `mail-x-inbound`, `mail-x-outbound`, and `mail-x-agent`
- SQLite-backed Durable Object `RealtimeHub`

General process:

```powershell
npm ci
npm run build
npm run deploy
```

Before deploying:

1. Create a scoped deployment API token for Workers, D1, R2, Queues, and required account access.
2. Create a separate runtime `CF_TOKEN` for DNS, Email Routing, and optional Email Sending operations.
3. Never commit API tokens or provider credentials.
4. Complete initialization at `/setup` after deployment.
5. Configure SPF, DKIM, and DMARC and test incoming and outgoing delivery.
6. Configure automatic backups and perform a restore test.
7. Add a visible **Source Code** link for remote users as described in the AGPL section below.

Cloudflare Email Routing can receive mail on the free tier. Sending through Cloudflare to arbitrary recipients generally requires Workers Paid. Resend, SES, storage, AI, and domain registration may also create costs.

## Updating safely

Do not replace this repository automatically with the upstream Mailflare tree. Doing so can erase Mail-X branding and entitlement changes.

Recommended update process:

1. Create a backup or Git branch.
2. Fetch the upstream changes into a separate branch or directory.
3. Review database migrations carefully.
4. Merge changes manually.
5. Reapply and verify Mail-X-specific behavior.
6. Run tests and a production build.
7. Back up production data before deployment.

The old upstream GitHub update workflow was intentionally removed because it replaced the complete project tree.

## Security notes

At the time this customized build was prepared, `npm audit --omit=dev` reported production dependency advisories, including a critical advisory affecting the pinned Next.js version and high-severity advisories in transitive dependencies. Do not treat a successful build as a security approval.

Before public deployment:

- Upgrade Next.js and affected dependencies using a reviewed branch.
- Do not blindly run `npm audit fix --force`; it currently proposes breaking dependency changes.
- Run the complete test suite after dependency upgrades.
- Keep Cloudflare and provider tokens narrowly scoped.
- Enable MFA for administrators.
- Monitor delivery failures and application logs.
- Test backups and restoration.

## License and legal considerations

Mail-X remains a modified work based on software distributed under the **GNU Affero General Public License version 3 (AGPL-3.0)**. The complete license text is in `LICENSE`.

### What the license generally allows

- Private use
- Modification
- Self-hosting
- Commercial use and charging customers
- Redistribution under the AGPL terms

### Important obligations

- Keep applicable copyright and license notices.
- Distribute covered modifications under AGPL-3.0.
- If users interact with the modified application remotely over a network, prominently offer those users free access to the **Corresponding Source** of the running version.
- The offered source should include the code and scripts needed to build, install, run, and modify that deployed version, excluding items the license permits you to omit.
- Do not provide only the original upstream source when production runs a modified Mail-X version.
- If distributing binaries or containers, make the corresponding source available in the manner required by AGPL-3.0.

A practical approach is to publish the exact deployed revision in a public Git repository and add a persistent **Source Code** link in Mail-X's navigation or legal/about page.

### Branding and commercial-license caution

- **Mail-X** should be presented as an independent modified project, not as an official Mailflare product.
- AGPL source rights do not automatically grant trademark rights in the original project's name, logo, or branding.
- This fork changes feature-entitlement behavior that upstream associated with commercial plans. The repository's AGPL license grants broad modification rights, but it does not override any separate agreement you may have accepted, purchased, or entered into with a service provider.
- Paymug compatibility code and Team/shared-mailbox gates remain in the backend source, but license purchase and activation controls are no longer shown in the Mail-X interface.
- Provider terms from Cloudflare, Resend, AWS, AI vendors, and domain registrars apply separately from AGPL.

This README is practical project guidance, not legal advice. For a paid public service or a closed-source business model, obtain advice from a qualified open-source licensing lawyer.

Official AGPL reference: https://www.gnu.org/licenses/agpl-3.0.html

## Upstream attribution

Mail-X is derived from the Mailflare project by its original contributors:

- Upstream repository: https://github.com/hieunc229/mailflare
- Mail-X modifications: branding, resource names, Community branding access, Community forwarding, and unlimited Community accounts

## Important project paths

| Purpose | Path |
| --- | --- |
| Application routes | `src/app` |
| UI components | `src/components` |
| Default branding | `src/lib/branding/service.ts` |
| Feature entitlements and account limit | `src/lib/licenses/service.ts` |
| English translations | `src/lib/i18n/en.json` |
| Other translations | `public/locales` |
| Database schema | `src/db/schema` |
| Database migrations | `drizzle/migrations` |
| Worker entry point | `worker.ts` |
| Cloudflare resources | `wrangler.jsonc` |
| Docker runtime | `server` and `Dockerfile` |
| Application icons | `public/icon-*.png` and `public/favicon.ico` |

## Disclaimer

Mail-X is provided without warranty. Email hosting involves security, availability, privacy, abuse prevention, DNS, sender reputation, and data-retention responsibilities. Test carefully before relying on it for critical communication.