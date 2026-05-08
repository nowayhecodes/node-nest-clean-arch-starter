export interface BaseCommand<Input, Output> {
  execute(input: Input): Output
}
