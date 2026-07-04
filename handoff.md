# MEMEVERSE MASTER HANDOFF
Version: 1.0
Status: In Progress
Architecture: Feature Based
Frontend: Next.js 16 + React 19 + TypeScript
Backend: Existing Django API
Date Started: July 2026

---

# PROJECT GOAL

Completely migrate the existing Memeverse Vite application to Next.js without changing:

- UI
- UX
- Color Palette
- Typography
- Animations
- Component hierarchy
- Features
- User flow

Only architecture, scalability, SEO, maintainability and performance are improved.

The final application should look visually identical to the existing Memeverse.

---

# CORE RULES

## RULE 1

Never redesign.

Never improve UI.

Never modernize UI.

Always reproduce the original UI.

---

## RULE 2

Backend API contract must never change.

Frontend adapts to backend.

Backend remains untouched.

---

## RULE 3

Feature Based Architecture.

No giant components.

No App.tsx.

No business logic inside pages.

---

## RULE 4

Everything API Ready.

Every feature owns

- api
- services
- mapper
- hooks
- context
- repository
- types

---

## RULE 5

SEO First

Everything possible should become Server Components.

Only interactive components become Client Components.

---

# CURRENT ARCHITECTURE

```
src/

app/

features/

shared/

assets/

styles/
```

---

# FEATURE STRUCTURE

```
feature/

api/

components/

context/

hooks/

repository/

services/

types/

utils/

mapper/

constants/
```

---

# SHARED STRUCTURE

```
shared/

api/

components/

config/

constants/

design/

hooks/

providers/

styles/

types/

utils/
```

---

# DESIGN SYSTEM

Location

```
shared/design
```

Contains

```
colors.ts

spacing.ts

typography.ts

radius.ts

animation.ts

breakpoints.ts

shadows.ts
```

---

# UI BIBLE

Everything below MUST remain identical to the original project.

---

## Typography

Heading

Onest

Body

DM Sans

---

## Layout

Centered

Maximum width

512px

---

## Card Radius

8px

12px

16px

---

## Common Spacing

4

8

12

16

24

32

Never invent random spacing.

---

## Colors

Use original CSS variables.

Never hardcode colors unless they already existed.

```
--mv-bg

--mv-card

--mv-card-el

--mv-border

--mv-border-sub

--mv-text

--mv-text-muted

--mv-text-dim
```

---

## Shadows

Exactly same as old project.

Never redesign.

---

## Animation

Mostly

opacity

transform

scale

200ms

300ms

500ms

No flashy animations.

---

## Responsive

Primary target

Mobile

Secondary

Tablet

Desktop

Must match existing behavior.

---

# UI MIGRATION ORDER

Phase 1

Design System

Status

✅ Complete

---

Phase 2

Shared Components

Status

In Progress

---

Phase 3

Header

Status

Pending

---

Phase 4

Feed

Status

Pending

---

Phase 5

Post Card

Status

Pending

---

Phase 6

Video Player

Status

Pending

---

Phase 7

Comments

Status

Pending

---

Phase 8

Dialogs

Status

Pending

---

Phase 9

Settings

Status

Pending

---

Phase 10

Search

Status

Pending

---

Phase 11

Profile

Status

Pending

---

Phase 12

Authentication

Status

Pending

---

# API STATUS

Backend

https://memeverse.in/api

Current Endpoint

GET

/api/memes

Status

Working

Axios Integrated

Yes

Mapper

Working

Feed Hook

Working

---

# BACKEND RESPONSE

Current FeedItem

```
id

title

file_url

thumbnail_url

type

language

likes_count

views_count

bookmarks_count

shares_count

created_at
```

Mapped into

FeedItem

---

# NEXT.JS STATUS

App Router

Completed

Folder Structure

Completed

API Layer

Completed

Feed Mapper

Completed

Axios

Completed

Loading

Completed

Error

Completed

Providers

Completed

---

# PERFORMANCE GOALS

SSR

Yes

Streaming

Yes

SEO

Excellent

Code Splitting

Yes

Lazy Loading

Yes

Video Lazy Loading

Yes

Image Optimization

Later

Caching

Later

---

# PROJECT PRINCIPLES

Never duplicate code.

Never use inline API calls.

Never bypass services.

Never place API inside components.

Always use typed models.

Always use mapper layer.

Always keep UI and logic separated.

---

# CURRENT SPRINT

Sprint 4

Objective

Pixel Perfect UI Migration

Current Focus

Shared Design System

Shared Components

---

# NEXT SPRINT

Header Migration

Goal

Reproduce original Header exactly.

No redesign.

No feature changes.

---

# KNOWN ISSUES

To be updated after every sprint.

---

# CHANGELOG

Sprint 1

Architecture created.

Sprint 2

API layer integrated.

Sprint 3

Feed API connected.

Sprint 4

Started UI migration.