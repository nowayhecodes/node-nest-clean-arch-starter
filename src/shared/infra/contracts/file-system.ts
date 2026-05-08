export interface IFileSystem {
  upload(props: IFileSystem.Input): IFileSystem.Output
  getFileUrl(props: IFileSystem.GetUrl): IFileSystem.GetUrlOutput
  download(props: { filePath: string }): Promise<any>
  getStorageName(): string
}

export namespace IFileSystem {
  export type Input = { fileName: string; filePath: string; file: Buffer }
  export type GetUrl = { filePath: string }
  export type GetUrlOutput = Promise<string>
  export type Output = Promise<string>
}
