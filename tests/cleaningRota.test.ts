import {
    cleaningDays,
    GenerateCleaningRota,
    officeLocations,
} from '../cleaningRota'
import { Day } from '../types'

describe('Cleaning Rota', () => {
    const employees = ['1002', '1003', '1004', '1005', '1006', '1007']

    it('should generate a cleaning Rota for each office location', () => {
        const cleaningRota = GenerateCleaningRota(employees)

        expect(Object.keys(cleaningRota).sort()).toEqual(officeLocations.sort())
    })

    it('should generate a cleaning Rota for each office location', () => {
        const cleaningRota = GenerateCleaningRota(employees)

        Object.values(cleaningRota).forEach((officeLocation) => {
            const rotaDays = officeLocation.reduce((days: Day[], location) => {
                days.push(location.day)
                return days
            }, [])

            expect(rotaDays).toEqual(cleaningDays)
        })
    })

    it('should assign an employee to each cleaning day', () => {
        const cleaningRota = GenerateCleaningRota(employees)

        Object.values(cleaningRota).forEach((officeLocation) => {
            officeLocation.forEach((day) => {
                expect(employees).toContainEqual(day.employee)
            })
        })
    })
})
