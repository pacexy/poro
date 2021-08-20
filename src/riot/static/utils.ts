export class Version {
  constructor(protected readonly version: string) {}
}

export class VersionLanguage {
  constructor(
    protected readonly version: string,
    protected readonly language: string,
  ) {}
}
