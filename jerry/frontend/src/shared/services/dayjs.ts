import dayjs from "dayjs"
import updateLocale from "dayjs/plugin/updateLocale"
import localizedFormat from "dayjs/plugin/localizedFormat"
import ru from "dayjs/locale/ru"
import "dayjs/locale/en"

dayjs.extend(updateLocale)
dayjs.extend(localizedFormat)

dayjs.updateLocale("ru", {
  formats: {
    ...ru.formats,
    lll: "D MMMM YYYY г. H:mm",
    LLLL: "dddd, D MMMM YYYY г. H:mm",
  },
})

export { dayjs }
