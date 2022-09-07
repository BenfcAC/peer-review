import { Payroll, Team } from './types'

export const BASE_PAYMENT_AMOUNT: number = 20000

export const employeePayroll = (teams: Team[]): Payroll[] => {
    const payroll: Payroll[] = teams.flatMap((team) =>
        team.members.map((employee) => ({
            id: employee.id,
            salary: employee.spline * BASE_PAYMENT_AMOUNT,
            spline: employee.spline,
        }))
    )

    return payroll.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
}
