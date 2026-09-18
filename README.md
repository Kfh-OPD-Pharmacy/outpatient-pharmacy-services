Unified Pharmacy Portal

A unified pharmacy web portal that brings multiple pharmacy workflows into one interface while keeping authentication, user management, medication master data, and service-level access centrally controlled.

The portal is designed around a shared central medication database, separate operational data stores where appropriate, and lightweight web interfaces built with HTML, CSS, JavaScript, Google Apps Script, and Google Sheets.

## Current Features

### Medication Pickup / Booking
- Same-day medication pickup booking.
- Capacity-controlled time slots.
- Dynamic slot availability.
- Bilingual user interface.
- Google Apps Script backend with locking to prevent overbooking.

### Kidney Pharmacy / Expiry Management
- Medication expiry-date registration.
- Central medication selection.
- Expiry dashboard and indicator.
- Medication search and filtering.
- Printable dashboard/report views.
- Registration tracking with staff information where available.

### Expiry Indicator
The dashboard currently classifies expiry records using the operational indicator logic:
- **This Month**
- **Within 3 Months**
- **Within Safe Range**

The same indicator logic is intended to remain consistent wherever expiry status is displayed.

### Central Medication Database
A shared medication master database is used to standardize medication names across pharmacy services.

Core design principle:
- **Medication ID** is the stable medication identifier.
- **Medication Name** is the current display name.
- Service records should remain linked by Medication ID so that medication-name changes do not break historical or operational relationships.

Medication administration is handled separately from expiry records so medication names can be centrally controlled without mixing operational expiry data into the master database.

### Dynamic Medication QR
Shelf labels can use a fixed QR linked to a medication identifier.

The QR design follows these principles:
- The QR remains stable for the medication.
- The expiry date itself is not encoded into the QR.
- Scanning the QR opens a live read-only medication page.
- The live page can display the medication's current information and available expiry dates.
- Expiry dates are intended to use the same status logic as the expiry dashboard.

This allows expiry information to change without requiring the physical QR label to be reprinted.

### Labels Generator
The portal includes a shelf-label generation workflow with support for:
- Medication selection.
- Multiple-label / batch printing.
- Copies.
- Label-size selection.
- Dynamic medication QR.
- Portal/pharmacy logo.
- Medication-name display.
- Print preview.
- Select-all workflow.

The label workflow is intentionally separated from medication-master editing and expiry-data entry.

### Unified Medication Management
Central medication administration provides one place to manage the medication master list used by connected pharmacy services.

This helps reduce naming inconsistency between forms, dashboards, labels, and other medication-based workflows.

### Unified User Management
The portal uses a central user store and service-specific access model.

Current access architecture includes existing service permissions such as:
- `MedAccess`
- `MailAccess`
- `KidneyAccess`

Additional service permissions are being added only when the corresponding service is ready for controlled rollout.

The primary administrator account is responsible for central user administration and service access control.

## Main Administrator

The main administrator is responsible for:
- User management.
- Granting and revoking service permissions.
- Central medication management.
- Access to administrative functions across the portal.

No PINs, passwords, session tokens, internal IDs, or other sensitive authentication data should be documented in this repository.

## Data Architecture

```text
Unified Pharmacy Portal
│
├── Central Users / Authentication
├── Central Medication Database
│
├── Medication Pickup / Booking
│
├── Kidney Pharmacy
│   ├── Expiry Registration
│   ├── Expiry Dashboard
│   ├── Dynamic Medication QR
│   └── Labels Generator
│
└── Additional Pharmacy Services
```

The central medication database provides shared medication identity, while each operational service can keep its own workflow-specific data.

## Authentication and Permissions

The portal uses centralized authentication and service-level authorization.

General principles:
- Session validation is centralized.
- Access is checked per service.
- Backend permission checks are preferred over frontend-only hiding.
- Inactive users should not retain access simply because a previous frontend state exists.
- Sensitive permissions are managed centrally.
- Direct page access should not bypass service authorization where protected access is required.

## Technology Stack

- HTML
- CSS
- JavaScript
- Google Apps Script
- Google Sheets
- GitHub Pages / static web hosting for applicable frontend pages

No frontend framework is required for the current architecture.

## Deployment Overview

### Frontend
Static HTML/CSS/JavaScript pages hosted through the current static hosting workflow.

### Backend
Google Apps Script Web Apps.

### Data
Google Sheets used as lightweight operational and administrative data stores.

Deployment URLs, sheet IDs, script IDs, tokens, and credentials are intentionally not documented here.

## Key Files

The exact file set may evolve, but the current portal commonly uses files such as:
- `home.html` — main portal.
- `form.html` — kidney expiry registration.
- `dashboard.html` — expiry dashboard / indicator.
- `admin.html` — unified user administration.
- `medications-admin.html` — central medication administration.
- `Code.gs` — Google Apps Script backend in services that use the default Apps Script filename.

Some service pages may use different filenames depending on the deployment. Repository filenames should be treated as authoritative.

## Safety and Data Rules

- Medication IDs should remain stable when medication names are edited.
- Expiry data should not be deleted simply because a medication is renamed or deactivated.
- Name-based fuzzy matching should not be used as a runtime identity mechanism when Medication ID is available.
- Public/read-only QR views should expose only the medication information required for the workflow.
- Authentication credentials and session data must not be stored in this README.

## Planned / In Progress

The following items have been discussed or are being integrated, but should be considered incomplete until verified in the deployed files.

### Medication Name Synchronization
- Use Medication ID as the canonical key.
- Synchronize the current medication name into connected operational records.
- Preserve an original medication-name snapshot for historical auditing where implemented.

### LASA / Tall Man Lettering
- Apply explicit Tall Man formatting for selected LASA medications.
- Do not convert the entire medication name to uppercase.
- Use an explicit approved mapping rather than automatic or fuzzy capitalization.
- Keep Medication ID and source medication data unchanged.

### High Alert Medication Identification
- Add a clear visual High Alert marker for medications included in an approved hospital/reference list.
- Keep the classification explicit rather than inferred automatically.

### Labels Access Control
- Add a dedicated `LabelsAccess` permission.
- Main administrator retains access.
- Other users receive access through unified user management.
- Protect the page itself, not only the portal entry icon.

### Order Service
Planned / in-progress order workflow may include:
- Multiple medications per order.
- One order number per complete order.
- Automatic order date.
- Optional current-stock field.
- Optional requested-quantity field.
- Printable A4 order report.
- Dedicated `OrderAccess` permission managed centrally.

This section should be moved into **Current Features** only after the deployed implementation is verified.

## Maintenance Notes

When extending the portal:
1. Prefer Medication ID over medication-name matching.
2. Preserve backward compatibility with existing operational records.
3. Avoid changing unrelated services during a service-specific update.
4. Keep frontend access visibility and backend authorization consistent.
5. Verify preview and print behavior separately for printable workflows.
6. Keep sensitive deployment and authentication details out of public documentation.

---

This README intentionally documents the architecture and operational behavior at a high level. Deployment-specific secrets and internal identifiers are excluded.
