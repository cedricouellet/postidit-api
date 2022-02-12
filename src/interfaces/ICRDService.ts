interface ICRDService<Input, Output, Identifier> {
  getAll(): Promise<Output[]>;
  getById(id: Identifier): Promise<Output | null>;
  create(item: Input): Promise<Output | null>;
  update(id: Identifier, input: Input): Promise<Output | null>;
  delete(id: Identifier): Promise<Output | null>;
}

export default ICRDService;
