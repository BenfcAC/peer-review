import { BASE_PAYMENT_AMOUNT, Employee, employeeManagement } from ".."

describe('Employee Management', () => {
    const employees: Employee[] = [{
        id: '1',
        name: 'John',
        age: 32,
        role: 'Manager',
        spline: 1
    },
    {
        id: '2',
        name: 'Jane',
        age: 32,
        role: 'Manager',
        spline: 2
    }]
  it('should return the employee payroll', () => {
        
const payroll = employeeManagement(employees)
    expect(payroll[0].salary).toEqual(employees[0].spline * BASE_PAYMENT_AMOUNT)
    expect(payroll[1].salary).toEqual(employees[1].spline * BASE_PAYMENT_AMOUNT)
  })
})