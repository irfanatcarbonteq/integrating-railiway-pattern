interface EntityInterface {
  createdAt: Date;
  updatedAt: Date;

  toObject(): any;
}

export default EntityInterface;
