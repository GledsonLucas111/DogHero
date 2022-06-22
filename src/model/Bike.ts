export class Bike {
  constructor(
    private id: string,
    private color: string,
    private march: string,
    private mark: string,
    private model: string,
    private price: number,
    private quantity_stock: number
  ) {}

  getId(): string {
    return this.id;
  }
  getColor(): string {
    return this.color;
  }
  getMarch(): string {
    return this.march;
  }
  getMark(): string {
    return this.mark;
  }
  getModel(): string {
    return this.model;
  }
  getPrice(): number {
    return this.price;
  }
  getQuantity(): number {
    return this.quantity_stock;
  }

  setId(id: string) {
    this.id = id;
  }
  setColor(color: string) {
    this.color = color;
  }
  setMarch(march: string) {
    this.march = march;
  }
  setMark(mark: string) {
    this.mark = mark;
  }
  setModel(model: string) {
    this.model = model;
  }
  setPrice(price: number) {
    this.price = price;
  }
  setQuantity(quantity: number) {
    this.quantity_stock = quantity;
  }

  static toBikeModel(data: Bike): Bike {
    return new Bike(
      data.id,
      data.color,
      data.march,
      data.mark,
      data.model,
      data.price,
      data.quantity_stock
    );
  }
}
