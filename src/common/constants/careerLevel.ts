export const CareerLevel: {
    [x: string]: 'entry' | 'intermediate' | 'senior'
} = {
    Entry: 'entry',
    Intermediate: 'intermediate',
    Senior: 'senior',
}

export type CareerLevel = typeof CareerLevel[keyof typeof CareerLevel]
