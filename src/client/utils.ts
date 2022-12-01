// interface Prop {
//   host: string;
//   getRoute: (routeName: string) => string;
// }

declare module '*.jpg';

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
