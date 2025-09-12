# WCAG 2.2 – Level A Accessibility Rules

This document summarizes the **Web Content Accessibility Guidelines (WCAG) 2.2 – Level A** success criteria.  
It is intended as a **quick reference** and checklist for developers, testers, and designers.

---

## 1. Perceivable

- **1.1.1 Non-text Content** – All non-text content has a text alternative (e.g., `alt`, `aria-label`).
- **1.2.1 Audio-only and Video-only (Prerecorded)** – Provide a text alternative for prerecorded audio or video-only content.
- **1.2.2 Captions (Prerecorded)** – Prerecorded video with audio includes captions.
- **1.2.3 Audio Description or Media Alternative (Prerecorded)** – Provide audio description or a media alternative for video.
- **1.3.1 Info and Relationships** – Use semantic HTML/ARIA to convey structure and relationships.
- **1.3.2 Meaningful Sequence** – Reading and navigation order is logical.
- **1.3.3 Sensory Characteristics** – Instructions are not based only on shape, color, size, or location.
- **1.4.1 Use of Color** – Color is not the only means of conveying information.
- **1.4.2 Audio Control** – Audio that plays automatically for >3 seconds can be paused, stopped, or muted.

---

## 2. Operable

- **2.1.1 Keyboard** – All functionality is available via keyboard.
- **2.1.2 No Keyboard Trap** – Users can move focus away using only a keyboard.
- **2.1.4 Character Key Shortcuts** – Single-key shortcuts can be turned off, remapped, or active only on focus.
- **2.2.1 Timing Adjustable** – Time limits can be turned off, extended, or adjusted.
- **2.2.2 Pause, Stop, Hide** – Users can pause, stop, or hide moving, blinking, or auto-updating content.
- **2.3.1 Three Flashes or Below Threshold** – No flashing content above safe thresholds.
- **2.4.1 Bypass Blocks** – Provide a mechanism (e.g., “Skip to content” link) to bypass repeated blocks.
- **2.4.2 Page Titled** – Pages have descriptive titles.
- **2.4.3 Focus Order** – Focus moves in a logical, predictable order.
- **2.4.4 Link Purpose (In Context)** – The purpose of each link is clear from its text or context.
- **2.4.7 Focus Visible** – **(Now Level A in WCAG 2.2)** – A visible focus indicator is provided.
- **2.5.1 Pointer Gestures** – Complex gestures have simple alternatives.
- **2.5.2 Pointer Cancellation** – Actions are cancellable before completion (avoid “on-down” only actions).
- **2.5.3 Label in Name** – The accessible name includes the visible label.
- **2.5.4 Motion Actuation** – Motion-based actions have alternatives and can be disabled.

---

## 3. Understandable

- **3.1.1 Language of Page** – The page language is identified.
- **3.2.1 On Focus** – Focused components do not trigger unexpected changes.
- **3.2.2 On Input** – Changing a field’s value does not cause unexpected navigation or updates.
- **3.2.6 Consistent Help** – **(New in 2.2)** – Help mechanisms are consistently available in the same location across pages.
- **3.3.1 Error Identification** – Errors in forms are clearly indicated.
- **3.3.2 Labels or Instructions** – Labels or instructions are provided when input is required.
- **3.3.7 Redundant Entry** – **(New in 2.2)** – Users are not required to re-enter previously provided information.

---

## 4. Robust

- **4.1.2 Name, Role, Value** – UI components expose name, role, and state programmatically.

---

## Key Notes

- **2.4.7 Focus Visible** moved from Level AA to **Level A** in WCAG 2.2.
- **4.1.1 Parsing** was **removed** in WCAG 2.2.
- Refer to [W3C Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/?currentsidebar=%23col_overview&levels=aaa) for full techniques and examples.

---

✅ Use this README as a **checklist** for Level A conformance.
