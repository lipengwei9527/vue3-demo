type A = {
  a: string;
  b: number;
};
type C = A[];
type B = {
  c: A["a"];
  d: A["b"];
};
