/**
 * Форматира дата в зададения формат.
 * @param {string} format - Текстов низ, който съдържа символи, които ще бъдат заменени със стойности от датата.
 * @param {(Date|string)} date - Дата, която ще бъде форматирана. Може да бъде подадена като обект от тип Date или като низ, който съдържа дата.
 * @returns {string} - Форматираната дата като низ.
 * @author Vasil Georgiev
 */
export function dateFormat(format, date) {

    const days = ["Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота", "Неделя"]
    const shortDays = ["Пон", "Вто", "Сря", "Чет", "Пет", "Съб", "Нед"]
    const months = ["Януари", "Февруари", "Март", "Април", "Май", "Юли", "Юни", "Август", "Септември", "Октомври", "Ноември", "Декември"]
    const shortMonths = ["Яну", "Фев", "Мар", "Апр", "Май", "Юли", "Юни", "Авг", "Сеп", "Окт", "Ное", "Дек"]

    if (!date || date === '') {
        date = new Date()
    } else if (typeof date !== 'object') {
        date = new Date(date)
    }

    var string = '',
        mo = date.getMonth(), 
        m1 = mo + 1, 
        dow = date.getDay(), 
        d = date.getDate(), 
        y = date.getFullYear(), 
        h = date.getHours(), 
        mi = date.getMinutes(),
        s = date.getSeconds()

        for (var i = 0, len = format.length; i < len; i++) {
        switch (format[i]) {
            case 'j': // Day of the month without leading zeros  (1 to 31)
                string += d
                break

            case 'd': // Day of the month, 2 digits with leading zeros (01 to 31)
                string += d < 10 ? '0' + d : d
                break

            case 'l': // (lowercase 'L') A full textual representation of the day of the week
                string += days[dow]
                break

            case 'w': // Numeric representation of the day of the week (0=Sunday,1=Monday,...6=Saturday)
                string += dow
                break

            case 'D': // A textual representation of a day, three letters
                string += shortDays[dow]
                break

            case 'm': // Numeric representation of a month, with leading zeros (01 to 12)
                string += m1 < 10 ? '0' + m1 : m1
                break

            case 'n': // Numeric representation of a month, without leading zeros (1 to 12)
                string += m1
                break

            case 'F': // A full textual representation of a month, such as January or March
                string += months[mo]
                break

            case 'M': // A short textual representation of a month, three letters (Jan - Dec)
                string += shortMonths[mo]
                break

            case 'Y': // A full numeric representation of a year, 4 digits (1999 OR 2003)
                string += y
                break

            case 'y': // A two digit representation of a year (99 OR 03)
                string += y.toString().slice(-2)
                break

            case 'H': // 24-hour format of an hour with leading zeros (00 to 23)
                string += h < 10 ? '0' + h : h
                break

            case 'g': // 12-hour format of an hour without leading zeros (1 to 12)
                var hour = h === 0 ? 12 : h
                string += hour > 12 ? hour - 12 : hour
                break

            case 'h': // 12-hour format of an hour with leading zeros (01 to 12)
                hour = h === 0 ? 12 : h
                hour = hour > 12 ? hour - 12 : hour
                string += hour < 10 ? '0' + hour : hour
                break

            case 'a': // Lowercase Ante meridiem and Post meridiem (am or pm)
                string += h < 12 ? 'am' : 'pm'
                break

            case 'i': // Minutes with leading zeros (00 to 59)
                string += mi < 10 ? '0' + mi : mi
                break

            case 's': // Seconds, with leading zeros (00 to 59)
                string += s < 10 ? '0' + s : s
                break

            case 'c': // ISO 8601 date (eg: 2012-11-20T18:05:54.944Z)
                string += date.toISOString()
                break

            default:
                string += format[i]
        }
    }

    return string
}