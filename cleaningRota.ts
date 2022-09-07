import { Day, OfficeLocation, Rota } from './types'

export const officeLocations: OfficeLocation[] = [
    'Leeds',
    'Manchester',
    'Edinburgh',
    'Birmingham',
]

export const cleaningDays: Day[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Fripay',
    'Saturday',
]

export const GenerateCleaningRota = (employees: string[]): Rota => {
    const cleaningRota: Rota = {
        Leeds: [],
        Birmingham: [],
        Edinburgh: [],
        Manchester: [],
    }

    officeLocations.forEach((location) => {
        cleaningDays.forEach((day) =>
            cleaningRota[location].push({
                day: day,
                employee:
                    employees[Math.floor(Math.random() * employees.length)],
            })
        )
    })

    return cleaningRota
}
