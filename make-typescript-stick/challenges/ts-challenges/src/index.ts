//Go to typescript  playground to test

//If<C, T, F>
//https://www.typescript-training.com/course/making-typescript-stick/08-type-challenges/#ifc-t-f
// @errors: 2344
type Expect<T extends true> = T;
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true;

// ---cut---

// Implement this type
type If<C, T, F> = C extends true ? T : F;

// Tests
type cases = [
  Expect<Equal<If<true, "apple", "pear">, "apple">>,
  Expect<Equal<If<false, "orange", 42>, 42>>
];

//LengthOfTuple<T>
//https://www.typescript-training.com/course/making-typescript-stick/08-type-challenges/#lengthoftuplet
// @errors: 2344
type Expect<T extends true> = T;
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true;

// ---cut---

// Implement this type
type LengthOfTuple<T> = T extends readonly any[] ? T["length"] : never;

// Tests
const Fruits = ["cherry", "banana"] as const;
type cases = [
  Expect<Equal<LengthOfTuple<[1, 2, 3]>, 3>>,
  Expect<NotEqual<LengthOfTuple<[1, 2, 3]>, 2>>,
  Expect<Equal<LengthOfTuple<typeof Fruits>, 2>>,
  Expect<Equal<LengthOfTuple<[]>, 0>>
];

//EndsWith<A, B>
//https://www.typescript-training.com/course/making-typescript-stick/08-type-challenges/#endswitha-b
// @errors: 2344
type Expect<T extends true> = T;
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true;

// ---cut---

// Implement this type
type EndsWith<A extends string, B extends string> = A extends `${any}${B}`
  ? true
  : false;

// Tests
type cases = [
  Expect<Equal<EndsWith<"ice cream", "cream">, true>>,
  Expect<Equal<EndsWith<"ice cream", "chocolate">, false>>
];

//Concat<A, B>
//https://www.typescript-training.com/course/making-typescript-stick/08-type-challenges/#concata-b
// @errors: 2344
type Expect<T extends true> = T;
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true;

// ---cut---

// Implement this type
type Concat<A extends any[], B extends any[]> = [...A, ...B];

// Tests
type cases = [
  Expect<Equal<Concat<[], []>, []>>,
  Expect<Equal<Concat<[], ["hello"]>, ["hello"]>>,
  Expect<Equal<Concat<[18, 19], [20, 21]>, [18, 19, 20, 21]>>,
  Expect<
    Equal<
      Concat<[42, "a", "b"], [Promise<boolean>]>,
      [42, "a", "b", Promise<boolean>]
    >
  >
];

//ReturnOf<F>
//https://www.typescript-training.com/course/making-typescript-stick/08-type-challenges/#returnoff
// @errors: 2344
type Expect<T extends true> = T;
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true;

// ---cut---

//Check ReturnType
//https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype
// Implement this type
type ReturnOf<F> = F extends { (...arg: any[]): infer RT } ? RT : never;

// Tests

const flipCoin = () => (Math.random() > 0.5 ? "heads" : "tails");
const rockPaperScissors = (arg: 1 | 2 | 3) => {
  return arg === 1
    ? ("rock" as const)
    : arg === 2
    ? ("paper" as const)
    : ("scissors" as const);
};

type cases = [
  // simple 1
  Expect<Equal<boolean, ReturnOf<() => boolean>>>,
  // simple 2
  Expect<Equal<123, ReturnOf<() => 123>>>,
  Expect<Equal<ComplexObject, ReturnOf<() => ComplexObject>>>,
  Expect<Equal<Promise<boolean>, ReturnOf<() => Promise<boolean>>>>,
  Expect<Equal<() => "foo", ReturnOf<() => () => "foo">>>,
  Expect<Equal<"heads" | "tails", ReturnOf<typeof flipCoin>>>,
  Expect<
    Equal<"rock" | "paper" | "scissors", ReturnOf<typeof rockPaperScissors>>
  >
];

type ComplexObject = {
  a: [12, "foo"];
  bar: "hello";
  prev(): number;
};

//Split<S, SEP>
//https://www.typescript-training.com/course/making-typescript-stick/08-type-challenges/#splits-sep
// @errors: 2344
type Expect<T extends true> = T;
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true;

// ---cut---

// Implement this type
type Split<
  S extends string,
  SEP extends string
> = S extends `${infer R}${SEP}${infer T}`
  ? [R, ...Split<T, SEP>]
  : S extends ""
  ? []
  : string extends S
  ? string[]
  : [S];

// Tests

type cases = [
  Expect<Equal<Split<"Hi! How are you?", "z">, ["Hi! How are you?"]>>,
  Expect<Equal<Split<"Hi! How are you?", " ">, ["Hi!", "How", "are", "you?"]>>,
  Expect<
    Equal<
      Split<"Hi! How are you?", "">,
      [
        "H",
        "i",
        "!",
        " ",
        "H",
        "o",
        "w",
        " ",
        "a",
        "r",
        "e",
        " ",
        "y",
        "o",
        "u",
        "?"
      ]
    >
  >,
  Expect<Equal<Split<"", "">, []>>,
  Expect<Equal<Split<"", "z">, [""]>>,
  Expect<Equal<Split<string, "whatever">, string[]>>
];

//IsTuple<T>
//https://www.typescript-training.com/course/making-typescript-stick/08-type-challenges/#istuplet
// @errors: 2344
type Expect<T extends true> = T;
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true;

// ---cut---

// Implement this type
type IsTuple<T> = T extends readonly any[]
  ? [...T, any]["length"] extends [...T]["length"]
    ? false //無限大長度+1 ===無限大長度
    : true
  : false;

// Tests
type cases = [
  Expect<Equal<IsTuple<[]>, true>>,
  Expect<Equal<IsTuple<[number]>, true>>,
  Expect<Equal<IsTuple<readonly [1]>, true>>,
  Expect<Equal<IsTuple<{ length: 1 }>, false>>,
  Expect<Equal<IsTuple<number[]>, false>>
];

//TupleToNestedObject<P, V>
//https://www.typescript-training.com/course/making-typescript-stick/08-type-challenges/#tupletonestedobjectp-v
// @errors: 2344
type Expect<T extends true> = T;
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true;

// ---cut---

// Implement this type
type TupleToNestedObject<P, V> = any;

// Tests

type cases = [
  Expect<Equal<TupleToNestedObject<["a"], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<["a", "b"], number>, { a: { b: number } }>>,
  Expect<
    Equal<
      TupleToNestedObject<["a", "b", "c"], boolean>,
      { a: { b: { c: boolean } } }
    >
  >,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>
];

//IndexOf<T, U>
//https://www.typescript-training.com/course/making-typescript-stick/08-type-challenges/#indexoft-u

// @errors: 2344
type Expect<T extends true> = T;
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true;

// ---cut---
//[1,2,3]
//F=1 Rest =[2,3]
// IndexOf<[2,3],2,[1]>
// IndexOf<[3],2,[1,2]>

// Implement this type
type IndexOf<T extends any[], U, Acc extends any[] = []> = T[0] extends U
  ? Acc["length"]
  : T extends [infer F, ...infer Rest]
  ? IndexOf<Rest, U, [...Acc, F]>
  : -1;

// Tests

type cases = [
  Expect<Equal<IndexOf<[1, 2, 3], 2>, 1>>,
  Expect<Equal<IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 2>>,
  Expect<Equal<IndexOf<[0, 0, 0], 2>, -1>>
];
