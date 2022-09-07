import { BASE_PAYMENT_AMOUNT, employeePayroll } from '../employeePayroll'
import { Team } from '../types'

describe('Employee Payroll', () => {
    const teams: Team[] = [
        {
            name: 'Data Analysis and Research',
            members: [
                {
                    id: '2348',
                    startDate: '2017-11-24',

                    name: 'Rebecca',
                    age: 36,
                    role: 'Data Analyst',
                    spline: 2,
                },
                {
                    id: '2341',
                    startDate: '1997-08-17',
                    name: 'Charlotte',
                    age: 42,
                    role: 'Data Analyst',
                    spline: 2,
                },
            ],
        },
        {
            name: 'Customer Service',
            members: [
                {
                    id: '2346',
                    startDate: '2013-01-01',
                    name: 'John',
                    age: 56,
                    role: 'Customer Service Agent',
                    spline: 3,
                },

                {
                    id: '3967',
                    startDate: '2019-14-09',

                    name: 'Sophie',
                    age: 27,
                    role: 'Team Lead',
                    spline: 2,
                },
            ],
        },
        {
            name: 'Leadership',
            members: [
                {
                    id: '1034',
                    startDate: '2008-02-08',
                    name: 'Jane',
                    age: 32,
                    role: 'Manager',
                    spline: 1,
                },
            ],
        },
    ]
    it('should return the employee payroll', () => {
        const payroll = employeePayroll(teams)
        payroll.forEach((employee) =>
            expect(employee.salary).toEqual(
                employee.spline * BASE_PAYMENT_AMOUNT
            )
        )
    })
})
