export default class EntityHealth{

  points: number;

  constructor(maxHealthPoints: number) {
    this.points = maxHealthPoints
  }

  increment(val: number = 1): void {
    this.points += val
  }

  decrement(val: number = 1): void {
    this.points -= val
  }

  resetHealth(val: number = 3): void {
    this.points = val
  }

  isDepleted(): boolean {
    return this.points <= 0
  }
}