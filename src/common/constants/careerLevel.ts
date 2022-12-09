export const CareerLevel: {
    [x: string]: 'Entry' | 'Intermediate' | 'Senior'
} = {
    Entry: 'Entry',
    Intermediate: 'Intermediate',
    Senior: 'Senior',
}

export type CareerLevel = typeof CareerLevel[keyof typeof CareerLevel]
