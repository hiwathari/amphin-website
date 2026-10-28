# Legal checklist for amphin.agency

The website now has a full set of policies under `/legal` (privacy, cookies, terms of use, terms of
service, refunds, editorial policy, acceptable use, accessibility, modern slavery, trademark, company
information, India grievance redressal and careers privacy). They were written for how the site and
AMOS actually work, but they are **drafts, not legal advice**. Each page says "draft pending legal
review" until a qualified lawyer approves it; then change `VERSION` in `src/lib/legal.ts` (and the
matching rows in AMOS) to `1.0`.

Laws and thresholds below were correct as far as we know in October 2026. Check each one with an
adviser or the regulator's own website, because they change.

## Get professional review

| Who | What to ask them |
|---|---|
| UK solicitor (data protection and commercial) | Review the Privacy Policy, Cookie Policy, Terms of Use and Terms of Service; confirm the liability cap and consumer cancellation wording; draft a client Data Processing Agreement. |
| Indian advocate | Confirm the DPDP Act 2023 wording, the grievance timelines and whether Amphin (India) needs any further registration. |
| UAE adviser (when the Abu Dhabi office trades) | Check whether UAE PDPL or a free-zone data law applies and adjust the policy. |
| Trademark attorney | Confirm the registration numbers and territories for Amphin®. Only use ® where the mark is registered. |

## Company actions

1. **ICO data protection fee (UK).** UK organisations that process personal data usually have to pay
   the ICO fee each year unless exempt. Register at ico.org.uk and add the registration number to the
   Privacy Policy.
2. **EU representative.** If Amphin actively offers services to people in the EU, GDPR Article 27 may
   require a representative in the EU. Ask the solicitor; if needed, appoint one and add their details.
3. **India Grievance Officer.** Name a person (name, email, phone) and add the name to the Grievance
   Redressal page. It currently lists the role and contact details only.
4. **Udyam number.** Add the MSME registration number to Company Information.
5. **UK company number.** Confirm 15393448 against Companies House (it was copied from the old site).
6. **Records of processing.** Keep a short internal list of what data AMOS holds, why, who can see it
   and how long it is kept. The Privacy Policy retention periods must match what AMOS actually does.
7. **Client contracts.** Make sure every proposal links to the Terms of Service and names the
   contracting company (Amphin LTD or Amphin India).
8. **Cookie banner.** It appears automatically once a Google Analytics or Clarity ID is set in Studio →
   Settings. Do not add other tracking scripts outside that banner.
9. **Influencer work.** Brief creators on ad labelling: ASA/CAP (UK), FTC (US), ASCI (India).

## Blog library notes

- 250 articles from the October 2026 library are published with their proposed archive dates, as
  requested. The library itself notes that these are proposed dates, not proof of historical
  publication, and that the drafts are AI-assisted and need human review. The Editorial Policy page
  says recaps are dated by the period they cover and may be prepared later.
- About a third of each article repeats wording shared with five or more other articles. Search
  engines may treat large sets of near-identical pages as low quality. Review and rewrite the most
  repetitive series (Marketing Recaps, Regional Tech News) first.
- The Founder Story article was not published: it still has approval placeholders and names the
  founder, while the site shows the founder as Person X.
