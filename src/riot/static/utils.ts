export class Version {
  constructor(protected readonly version: string) {}
}

export class VersionLanguage {
  protected readonly language: string
  constructor(protected readonly version: string, language: string) {
    this.language = language.replace('-', '_')
  }
}
