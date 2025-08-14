// ************************************************************************************************
// js已有类型？
// 原始类型:number/string/boolean/undefined/null/symbol
// 对象类型:object(包括数组、对象、函数等)

// ************************************************************************************************
// ts新增类型？
// 联合类型(有一个|，包含多种类型)、自定义类型(类型别名)、接口、元组、字面量类型、枚举、void、any等

// ************************************************************************************************
// 数组类型的写法
// let arr1: (number | string)[] = [];//推荐
// let arr2: Array<number | string> = [];

// ************************************************************************************************
// 类型别名
// 使用type来创建类型别名
// type cusArr = (number | string)[]
// let arr1: cusArr = []
// let arr3: cusArr = []

// ************************************************************************************************
// 函数类型的写法
// function fun1(str: string, num: number): string {
//     return str + num
// }
// const fun2 = (str: string, num: number): string => {
//     return str + num
// }
// const fun3: (str: string, num: number) => string = (str, num) => {
//     return str + num
// }

// 可选参数:可选参数必须放在参数的最后面
// function fun1(arg1: number, arg2?: number): void {
//     console.log(arg1, arg2)
// }

// ************************************************************************************************
// 对象类型的写法
// let obj: { name: string, age?: number, say1?(arg1: string, arg2?: number): void, say2?: (arg1: string) => void } = {
//     name: '张三'
// }

// ************************************************************************************************
// 接口
// type和interface的区别？
// 1、interface只能为对象创建类型，而type可以为任意类型指定类型别名
// interface Person {
//     name: string,
//     age?: number,
//     say?(): void
// }
// let obj: Person = { name: '张三' }

// 接口继承
// interface Person1 {
//     name: string,
//     age: number
// }
// interface Person2 extends Person1 {
//     say(): void
// }
// let obj: Person2 = {
//     name: "张三",
//     age: 18,
//     say: () => {

//     }
// }

// ************************************************************************************************
// 元组(Tuple)
// 创建的时候就制定了数组的长度及元素类型
// let arr: [number, string] = [1, '1']

// ************************************************************************************************
// 类型推断：类型注解可以省略不写
// 什么时候发生类型推断？
// 1、生命变量并初始化的时候
// true:
// let age = 18
// age = '18'
// false:
// let age
// age = '18'
// 2、决定函数返回值的时候
// function fun1(arg1: number) {
//     return arg1
// }

// ************************************************************************************************
// 类型断言
// 关键字:as
// 比ts更确定值的类型时可以使用类型断言
// 没有类型断言时，只能访问公共内的属性和方法，不能访问更具体的属性和方法
// let a: HTMLAnchorElement = document.querySelector('a') as HTMLAnchorElement
// console.log(a.href)
// let b: HTMLAnchorElement = <HTMLAnchorElement>document.getElementById('a')
// console.log(b.href)
// 可以通过console.dir(div)查看__proto__来知道标签的类型:HTMLDivElement、HTMLSpanElement

// ************************************************************************************************
// 字面量类型
// 字符串及任意js字面类型都可以作为类型
// 优势：更严谨和准确
// let str1 = 'hell1'
// let str2 = 'hell2'
// const str3 = 'hell3'
// let str4: 'hell4' = 'hell4'
// 使用场景：和联合类型一起使用
// function fun1(arg1: 'top' | 'bottom' | 'left' | 'right') {
//     return arg1
// }

// ************************************************************************************************
// 枚举
// 关键字:enum
// 表示一组明确的可选值
// 约定枚举名称及值以大写字母开头
// 枚举没有定义值的时候默认是从0开始的
// enum Direction1 { Up, Down, Left, Right }
// enum Direction2 { Up = 'a', Down = 'b', Left = 'c', Right = 'd' }
// function fun1(arg1: Direction1) {
//     console.log(arg1)
// }
// function fun2(arg1: Direction2) {
//     console.log(arg1)
// }
// fun1(Direction1.Down)
// fun2(Direction2.Down)

// 其他类型编译为js时会移除,但枚举会编译为代码
// let Direction2
// (function (Direction2) {
//     Direction2["Up"] = 'a'//...
// })(Direction2 || (Direction2 = {}))

// ************************************************************************************************
// typeof
// 作用:获取变量或属性类型,无法查询其他形式的类型(如:函数返回值的类型)
// let obj = { a: 1, b: '2' }
// function fun1(arg1: { a: number, b: string }) {
//     console.log(`output->arg1`, arg1)
// }
// function fun2(arg1: typeof obj) {
//     console.log(`output->arg1`, arg1)
// }
// // error:
// function fun3(arg1: number, arg2: number): number {
//     return arg1 + arg2
// }
// let a: typeof fun3(1, 2)

// ************************************************************************************************
// ts中的高级类型：
// 1、class类
// 2、类型兼容性
// 3、交叉类型
// 4、泛型和keyof
// 5、索引签名类型和索引查询类型
// 6、映射类型

// ************************************************************************************************
// class类
// constructor不能写返回值类型
// 类继承的两种方式：
// 1、extends:继承父类
// 2、implements:实现一个接口,是ts特有的,js没有,类必须提供接口指定的所有属性和方法
// 作用：子类具备父类的所有的属性和方法

// 1、extends
// class Person1 {
//     age: number
//     sex: string
//     constructor(age: number, sex: string) {
//         this.age = age
//         this.sex = sex
//     }
//     say(str: string) {
//         console.log(str + this.age + this.sex)
//     }
// }
// class Person2 extends Person1 {
//     like = 'fish'
//     //     super  constructor(like: string) {
//     //     this.like = like
//     // }
//     food(like: string): string {
//         return this.like = like
//     }
// }
// let p = new Person1(18, '男')

// 2、implements
// 类必须提供接口指定的所有属性和方法
// interface Person1 {
//     say(): string
// }
// class Person2 implements Person1 {
//     say(): string {
//         return '1'
//     }
// }


// class中的修饰符:public(公有的)、private(私有的)、private(私有的)、readonly(仅可读)

// 1、public(公有的):,可省略,可被任何地方访问
// class Parent {
//     move() { }
// }
// let a = new Parent()
// a.move()

// 2、protected:受保护的，仅对声明所在类和子类中(非实例)可见,
//    可在子类的方法中通过this来访问父类中的protected成员,但是对实例不可见
// class Parent {
//     move() { }
// }
// class Son extends Parent {
//     say() {
//         this.move()
//     }
// }

// 3、private(私有的):只有当前类可见,子类和实例都不可见
// class Parent {
//     say() { this.move() }
//     private move() { }
// }

// 4、readonly(仅可读):
//      只能在构造函数中对属性进行赋值,之外不允许再修改了
//      只能修饰属性不能修饰方法
//      不加类型则类型为value值
//      必须提供默认属性值
//      接口或者{}表示的对象类型,也可以使用readonly
// class Person {
//     readonly age = 18
//     readonly sex: string = '男'
// }
// interface Person2 {
//     readonly name: string
// }
// let obj: Person2 = {
//     name: '张三'
// }
// let obj2: { readonly name: string } = {
//     name: '张三'
// }
// obj.name = '李四'
// ************************************************************************************************
// 类型兼容性
//      两种类型系统:
//          1\结构化类型系统(structural type system)
//          2\标明类型系统(nominal type system)
// ts是结构化类型系统,也叫作鸭子类型(duck typing),类型检查是关注的值所具有的形状(如果两个对象形状相同,则认为他们是同一类型)

// 例：
// 对象兼容性
// class A {
//     x: number = 1
//     y: string = '2'
// }
// class B {
//     x: number = 1
//     y: string = '2'
//     z: string = '3'
// }
// const a: A = new B()
// 如果是在标明类型系统中,则A和B不一样
// **A兼容B(少的兼容与多的),所以成员多的可以赋值给成员少的(和函数兼容性相反)**
// 接口&接口、类&类、接口&类之间都是可以兼容的

// 函数、接口之间的兼容性：
//      1、参数个数
//      2、参数类型:
//      3、返回值类型
// 参数多的可以兼容参数少的,或者说参数少的可以赋值给参数多的(和对象兼容性相反)
// F2兼容F1,F1赋值给F2

// 1、参数个数
// type F1 = (a: number) => void
// type F2 = (a: number, b: number) => void
// let f1: F1 = function (a: number) {
//     console.log(a)
// }
// let f2: F2
// f2 = f1


// 2、参数类型:相同位置的参数类型要相同(原始类型)或兼容(对象类型)
/**
 *             兼容(左到右)     赋值(右到左)    成员数量(左到右)
 * object      少兼多           多赋少          少多
 * function    多兼少           少赋多          多少
 */
// // object：成员少的兼容成员多的,成员多的赋值给成员少的
// interface A { a: number }
// interface B { a: number, b: number }
// let a: A = { a: 1 }
// let b: B = { a: 1, b: 2 }
// a = b

// // function：成员多的兼容成员少的,成员少的赋值给成员多的
// type F1 = (p: A) => void
// type F2 = (p: B) => void
// let f1: F1 = () => { }
// let f2: F2
// f2 = f1

// 3、返回值类型:
//      返回值是原始类型,则类型要相同
//      如果是对象类型,则按对象类型来算:少兼多(左到右)、多赋少(右到左)
// ************************************************************************************************
// 交叉类型
// 操作符:&
// 功能:类似于extends,用于组合多个类型为一个类型(常用于对象类型)
// &和class之间的区别?
//      相同点:都可以实现对象类型的组合
//      不同点:同名属性之间的冲突处理不同,extends会报错,&不会报错会变成兼容两种类型(类似于:string|number)
// interface A {
//     name: string
//     say: (a: number) => void
// }
// interface B {
//     age: number
//     say: (b: string) => void
// }
// type C = A & B
// let c: C = {
//     name: '张三',
//     age: 18,
//     say(a: string | number) {
//         console.log(a)
//     }
// }
// interface D extends A {
//     say: (a: string) => void
// }

// ************************************************************************************************
// 泛型
// 作用:保证类型安全(不丢失类型信息)的前提下,让函数与多种类型工作,从而实现复用,常用语函数、接口、class
// function fun1<T>(a: T[]): T[] {
//     return a
// }
// // 方式1:
// fun1<string | number>([1, '2'])
// // 方式2:
// fun1([1, '2'])


// 泛型约束
// interface A {
//     length: number
// }
// function fun2<T extends A>(a: T): T {
//     console.log(a.length)
//     return a
// }

// 返回对象中属性的值
// keyof:接收一个对象类型,生成其键名称(可能是字符串或数字)的联合类型
// let person = { name: '张三', age: 18 }
// // Key为 type Key = 'name'|'age;
// function fun1<T, Key extends keyof T>(obj: T, key: Key) {
//     return obj[key]
// }
// fun1(person, 'age')

// 泛型接口
// 使用泛型接口必须显示指定具体的类型(如a: A<string>中的string类型一定要写)
// interface A<T> {
//     a: T
//     say: (a: T) => T[]
// }
// let a: A<string> = {
//     a: '1',
//     say: (a: string) => { return [a] }
// }

// 泛型类
// class A<T> {
//     age: T
//     like: (a: number) => void = (a: number) => { console.log(`output->a`, a) }
//     constructor(age: T, like: (a: number) => void) {
//         this.age = age
//         this.like = like
//     }
// }
// let a = new A<number>(18, fun1)


// 泛型工具类型
// 1. Partial<Type>：用来创建一个类型，将Type的所有类型设置为可选，即属性后面都加?
// 2. Readonly<Type>：用来创建一个类型，将Type的所有类型设置为可选，即属性后面都加?
// 3. Pick<Type,Keys>：创建一个类型，用Type中**选中的属性**来创建一个新的类型
// 4. Record<Keys, Type>：创建一个**对象类型**，属性值为Keys，属性类型为Type

// Partial
// interface A {
//     a: number
//     b: string
//     c: number[]
// }
// // 类型PartialA的所有属性都是可选的
// // type PartialA = Partial<A>
// type ReadonlyA = Readonly<A>
// type APick = Pick<A, 'a' | 'b'>
// type ARecord = Record<'a' | 'b', A>

// ************************************************************************************************
// 索引签名类型
// interface A {
//     [key: string]: number
// }
// let a: A = {
//     b: 1
// }
// interface B<T> {
//     [key: number]: T
// }

// ************************************************************************************************
// 映射类型
// 根据联合类型创建新的映射类型
// type Keys = 'a' | 'b'
// type Key1 = { a: number, b: number }
// type Key2 = { [key in Keys]: number }
// // 根据对象类型创建新的映射类型
// type Key3 = { a: number, b: string }
// type Key4 = { [key in keyof Key3]: number }

// Partial的实现：
// type Part<T> = {
//     [key in keyof T]?: T[key]
// }
// type A = { a: number, b: string }
// type B = Part<A>
// ************************************************************************************************
// 索引查询（访问）类型
type A = { a: number, b: string }
// type B = number
// type C = A['a']
type D = A['a' | 'b']
type E = A[keyof A]
// ************************************************************************************************