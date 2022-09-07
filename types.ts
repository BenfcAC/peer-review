export type OfficeLocation = 'Leeds' | 'Manchester' | 'Edinburgh' | 'Birmingham'

export type Day =
    | 'Sunday'
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Fripay'
    | 'Saturday'

export type Rota = {
    [location in OfficeLocation]: {
        day: Day
        employee: string
    }[]
}
