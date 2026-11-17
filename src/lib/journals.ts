export type Journal = {
  id: string;
  shortName: string;
  fullName: string;
  issn: string;
  frequency: string;
  description: string;
  website: string;
  cover: string;
};

export const JOURNALS: Journal[] = [
  {
    id: "joell",
    shortName: "JOELL",
    fullName: "Veda's Journal of English Language and Literature",
    issn: "2349-9753",
    frequency: "Quarterly",
    description:
      "A peer-reviewed journal dedicated to scholarship in English language, linguistics, literature and related interdisciplinary fields.",
    website: "https://www.joell.in",
    cover: "/journals/joell-cover.jpg",
  },
  {
    id: "ijrep",
    shortName: "IJREP",
    fullName: "International Journal of Research in Education and Psychology",
    issn: "2455-426X",
    frequency: "Quarterly",
    description:
      "A multidisciplinary journal for research in education, psychology and related social sciences.",
    website: "https://www.ijrep.com",
    cover: "/journals/ijrep-cover.jpg",
  },
  {
    id: "bsj",
    shortName: "BSJ",
    fullName: "Biblical Studies Journal",
    issn: "2582-0214",
    frequency: "Quarterly",
    description:
      "A scholarly journal on biblical studies, theology, Christian thought and the relationship between faith and society.",
    website: "https://www.biblicalstudies.in",
    cover: "/journals/biblical-studies-journal-cover.jpg",
  },
];
