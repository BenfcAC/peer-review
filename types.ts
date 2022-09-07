export type OfficeLocation = 'Leeds' | 'Manchester' | 'Edinburgh' | 'Birmingham'

export type Day =
    | 'Sunday'
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday'

export type Rota = {
    [location in OfficeLocation]: {
        day: Day
        employee: string
    }[]
}

export type TeamName =
    | 'Leadership'
    | 'Customer Service'
    | 'Data Analysis and Research'

export type Team = {
    name: TeamName
    members: Employee[]
}

export type Roles =
    | 'Manager'
    | 'Team Lead'
    | 'Customer Service Agent'
    | 'Data Analyst'

export type Splines = 1 | 2 | 3

export type Employee = {
    id: string
    startDate: string
    name: string
    age: number
    role: Roles
    spline: Splines
}

export type Payroll = {
    id: string
    salary: number
    spline: Splines
}
