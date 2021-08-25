export interface QueuesJSON {
  [queueId: string]: {
    name: string
    shortName: string
    description: string
    detailedDescription: string
  }
}
