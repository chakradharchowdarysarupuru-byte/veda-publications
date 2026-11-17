// Author testimonials shown in the homepage carousel.
export type Testimonial = {
  id: string;
  quote: string;
  // Optional phrase inside the quote to show in italics (e.g. a book title).
  italic?: string;
  name: string;
  role: string;
  photo: string;
  // CSS object-position so the face stays in frame when cropped to a circle.
  photoPosition: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "sanjay-k-jha",
    quote:
      "Three books, a lasting association, and a relationship built on trust. I highly recommend VEDA Publications.",
    name: "Prof. Sanjay K. Jha",
    role: "Director (Liberal Arts & Foreign Languages), Amity Education Valley, Manesar, Amity University, Gurgaon",
    photo: "/testimonials/sanjay-k-jha.jpg",
    photoPosition: "50% 30%",
  },
  {
    id: "s-chelliah",
    quote:
      "The joy of seeing one's literary creations become published books is immeasurable. My publishing journey with VEDA Publications has been truly fulfilling and satisfying. I wholeheartedly recommend VEDA Publications to writers, researchers, and academicians who aspire to give their ideas and creative works a lasting place in the world of publishing.",
    name: "Dr. S. Chelliah",
    role: "Former Professor, Head & Chairperson, School of English & Foreign Languages, Madurai Kamaraj University",
    photo: "/testimonials/s-chelliah.jpg",
    photoPosition: "50% 35%",
  },
  {
    id: "n-lakshmi",
    quote:
      "I have had the pleasure of publishing three books with VEDA Publications, and the experience has been truly wonderful. I was particularly delighted with the way my poetry book was brought to life.",
    name: "Dr. N. Lakshmi",
    role: "Associate Professor & In-charge, Dept. of English, Government Degree College",
    photo: "/testimonials/n-lakshmi.jpg",
    photoPosition: "50% 30%",
  },
  {
    id: "p-bala-shanmuga-devi",
    quote:
      "Publishing my maiden book, New Perspectives of Indian Ethos in the Novels of Arun Joshi, has been a memorable milestone in my academic journey. VEDA Publications made this dream of becoming a published author a meaningful experience.",
    italic: "New Perspectives of Indian Ethos in the Novels of Arun Joshi",
    name: "P. Bala Shanmuga Devi",
    role: "Principal, Nilgiri College of Arts and Science",
    photo: "/testimonials/p-bala-shanmuga-devi.jpg",
    photoPosition: "52% 48%",
  },
  {
    id: "shuchi-agrawal",
    quote:
      "Quality in every page, elegance in every design, and excellence in every detail—I wholeheartedly recommend VEDA Publications.",
    name: "Dr. Shuchi Agrawal",
    role: "Professor, Dept. of English, Amity University",
    photo: "/testimonials/shuchi-agrawal.jpg",
    photoPosition: "50% 40%",
  },
];
