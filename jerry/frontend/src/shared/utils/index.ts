import { dayjs } from "@/shared/services/dayjs"

const DATE_FORMAT_OPTIONS = {
  short: "L, LT",
  medium: "lll",
  long: "LLL Z",
  full: "LLLL",
  extraShortDate: "MMM 'YY",
  superShortDate: "MMM D",
  shortDate: "L",
  mediumDate: "MMM D, YYYY",
  longDate: "MMMM D, YYYY",
  fullDate: "dddd, MMMM D, YYYY",
  shortTime: "LT",
  mediumTime: "LTS",
  longTime: "LTS Z",
  fullTime: "LTS ZZ",
} as const
export function formatDate(
  value: string | number | Date,
  format: keyof typeof DATE_FORMAT_OPTIONS,
): string {
  dayjs.locale("ru")

  return dayjs(value).format(DATE_FORMAT_OPTIONS[format])
}
