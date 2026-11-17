import { BOOK_CONTACT_EMAIL } from "@/lib/bookContact";

// Current call for chapters and edited volumes.
// Fixed for now; a later phase moves this into the backend so the
// Chief Editor can edit it from the admin area.
export const CALL_FOR_CHAPTERS = {
  title: "Call for Chapters & Edited Volumes",
  summary:
    "Veda Publications invites original chapters and scholarly contributions for its forthcoming edited books.",
  themes: [
    "English Language Teaching & Applied Linguistics",
    "Literature, Culture and Interdisciplinary Studies",
    "Education and Psychological Research",
    "Artificial Intelligence and Emerging Technologies",
    "Theology, Biblical Studies and Christian Thought",
    "Social Sciences and Contemporary Issues",
  ],
};

export const CALLS_ENQUIRY_HREF = `mailto:${BOOK_CONTACT_EMAIL}?subject=${encodeURIComponent(
  "Enquiry: call for chapters and edited volumes"
)}&body=${encodeURIComponent(
  [
    "Hello,",
    "",
    "I would like to contribute to a forthcoming edited volume.",
    "",
    "Name:",
    "Institution / affiliation:",
    "Theme(s) of interest:",
    "Proposed chapter title:",
    "",
    "Thank you.",
  ].join("\n")
)}`;
