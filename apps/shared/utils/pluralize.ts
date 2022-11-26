export enum PluralizeKind {
  Simple = "Simple",
  Complex = "Complex",
}

export const pluralize = (
  name: string,
  number: number,
  kind: PluralizeKind = PluralizeKind.Simple
) => `${name}${number === 1 ? "" : suffix(kind)}`;

const suffix = (kind: PluralizeKind) => {
  switch (kind) {
    case PluralizeKind.Simple:
      return "s";
    case PluralizeKind.Complex:
      return "es";
  }
};
