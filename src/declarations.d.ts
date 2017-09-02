declare const graphql: (query: TemplateStringsArray) => void;

declare module '*.jpg' {
  const content: string;
  export = content;
}

declare module '*.png' {
  const content: string;
  export = content;
}

declare module '*.scss' {
  const content: any;
  export default content;
}
