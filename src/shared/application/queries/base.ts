export interface BaseQuery<Input, Output> {
  execute(input: Input): Output
}
