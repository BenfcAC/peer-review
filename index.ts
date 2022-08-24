export type Roles = 'Manager' | 'Team Lead' | 'Customer Service Agent' | 'Data Analyst'

export type Splines = 1 | 2 | 3

export type Employee = {
    id: string,
    name: string,
    age: number,
    role: Roles,
    spline: Splines
}

export const BASE_PAYMENT_AMOUNT: number = 20000

export const employeeManagement = (employees: Employee[]) => {
        const payroll = employees.map((employee) => {
            return {
                id: employee.id,
                salary: employee.spline * BASE_PAYMENT_AMOUNT
            }
        })

        return payroll
}

