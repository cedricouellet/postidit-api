interface IUserConsumerService<Identifier, Output> {
  getAllByUserId(userId: Identifier): Promise<Output[]>;
}

export default IUserConsumerService;
