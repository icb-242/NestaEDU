// Sources audited 12 Aug 2026. Per-cell provenance in the verification audit.
// confidence: 'primary'   = Ministry report PDF or Ministry press release
//             'secondary' = news reporting quoting Ministry officials directly

export type LevelResult = {
  candidates: number | null;
  mathEngSci: number | null; // >=C in Mathematics, English Language and a Science
  fivePlus: number | null; // >=C in five or more subjects
  satFivePlus?: number; // candidates who sat five or more subjects (2025+ only)
};

export type ExamYear = {
  year: number;
  bjc: LevelResult;
  bgcse: LevelResult;
  confidence: "primary" | "secondary";
};

export const examData: ExamYear[] = [
  {
    year: 2015,
    confidence: "primary",
    bjc: { candidates: 10573, mathEngSci: 1479, fivePlus: 1485 },
    bgcse: { candidates: 6524, mathEngSci: 570, fivePlus: 961 },
  },
  {
    year: 2016,
    confidence: "primary",
    bjc: { candidates: 11703, mathEngSci: 1554, fivePlus: 1514 },
    bgcse: { candidates: 6450, mathEngSci: 574, fivePlus: 903 },
  },
  {
    year: 2017,
    confidence: "primary",
    bjc: { candidates: 12125, mathEngSci: 1326, fivePlus: 1484 },
    bgcse: { candidates: 6692, mathEngSci: 521, fivePlus: 880 },
  },
  {
    year: 2018,
    confidence: "primary",
    bjc: { candidates: 11827, mathEngSci: 1552, fivePlus: 1600 },
    bgcse: { candidates: 6720, mathEngSci: 490, fivePlus: 806 },
  },
  {
    year: 2019,
    confidence: "secondary",
    bjc: { candidates: 11157, mathEngSci: 1267, fivePlus: 1501 },
    bgcse: { candidates: 6453, mathEngSci: 484, fivePlus: 760 },
  },
  {
    year: 2020,
    confidence: "secondary",
    bjc: { candidates: 10753, mathEngSci: 949, fivePlus: 1083 },
    bgcse: { candidates: 6073, mathEngSci: 255, fivePlus: 365 },
  },
  {
    year: 2021,
    confidence: "primary",
    bjc: { candidates: 9552, mathEngSci: 1045, fivePlus: 1164 },
    bgcse: { candidates: 5159, mathEngSci: 382, fivePlus: 550 },
  },
  {
    year: 2022,
    confidence: "secondary",
    bjc: { candidates: 9571, mathEngSci: 1349, fivePlus: 1361 },
    bgcse: { candidates: 4906, mathEngSci: 392, fivePlus: 633 },
  },
  {
    year: 2023,
    confidence: "secondary",
    bjc: { candidates: 10933, mathEngSci: 1402, fivePlus: 1417 },
    bgcse: { candidates: 5393, mathEngSci: 303, fivePlus: 544 },
  },
  {
    year: 2024,
    confidence: "secondary",
    bjc: { candidates: 10745, mathEngSci: 1298, fivePlus: 1388 },
    bgcse: { candidates: 5935, mathEngSci: 431, fivePlus: 653 },
  },
  {
    year: 2025,
    confidence: "secondary",
    bjc: {
      candidates: 10478,
      mathEngSci: 1251,
      fivePlus: 1316,
      satFivePlus: 3392,
    },
    bgcse: {
      candidates: 6103,
      mathEngSci: 375,
      fivePlus: 627,
      satFivePlus: 1684,
    },
  },
];

export const latest = examData[examData.length - 1];
export const firstYear = examData[0].year;

export const rate = (
  n: number | null,
  d: number | null
): number | null =>
  n == null || d == null || d === 0 ? null : +((n / d) * 100).toFixed(1);

/** @deprecated Prefer `rate` */
export const passRate = rate;

export function getLatestYear(): ExamYear {
  return latest;
}

export function getRow(year: number): ExamYear | undefined {
  return examData.find((r) => r.year === year);
}

/** Combined BJC + BGCSE, for the hero line */
export const heroStats = (d: ExamYear = latest) => {
  const candidates = (d.bjc.candidates ?? 0) + (d.bgcse.candidates ?? 0);
  const passed = (d.bjc.mathEngSci ?? 0) + (d.bgcse.mathEngSci ?? 0);
  return {
    year: d.year,
    candidates,
    passed,
    rate: candidates === 0 ? 0 : +((passed / candidates) * 100).toFixed(1),
  };
};
// 2025 → { candidates: 16581, passed: 1626, rate: 9.8 }
