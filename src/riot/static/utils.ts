export class Version {
  constructor(protected readonly version: string) {}
}

export class VersionLanguage {
  protected language: string
  constructor(protected version: string, language: string) {
    this.language = language.replace('-', '_')
  }
}
