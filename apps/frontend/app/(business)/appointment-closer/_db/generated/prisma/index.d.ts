
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model AcLead
 * 
 */
export type AcLead = $Result.DefaultSelection<Prisma.$AcLeadPayload>
/**
 * Model AcConversation
 * 
 */
export type AcConversation = $Result.DefaultSelection<Prisma.$AcConversationPayload>
/**
 * Model AcMessage
 * 
 */
export type AcMessage = $Result.DefaultSelection<Prisma.$AcMessagePayload>
/**
 * Model AcAppointment
 * 
 */
export type AcAppointment = $Result.DefaultSelection<Prisma.$AcAppointmentPayload>
/**
 * Model AcSettings
 * 
 */
export type AcSettings = $Result.DefaultSelection<Prisma.$AcSettingsPayload>
/**
 * Model AcFollowupStep
 * 
 */
export type AcFollowupStep = $Result.DefaultSelection<Prisma.$AcFollowupStepPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AcLeadStage: {
  New: 'New',
  Qualified: 'Qualified',
  Booked: 'Booked',
  Cold: 'Cold',
  Won: 'Won',
  Lost: 'Lost'
};

export type AcLeadStage = (typeof AcLeadStage)[keyof typeof AcLeadStage]


export const AcMessageFrom: {
  lead: 'lead',
  ai: 'ai',
  human: 'human'
};

export type AcMessageFrom = (typeof AcMessageFrom)[keyof typeof AcMessageFrom]


export const AcAppointmentStatus: {
  Booked: 'Booked',
  Pending: 'Pending',
  Canceled: 'Canceled'
};

export type AcAppointmentStatus = (typeof AcAppointmentStatus)[keyof typeof AcAppointmentStatus]

}

export type AcLeadStage = $Enums.AcLeadStage

export const AcLeadStage: typeof $Enums.AcLeadStage

export type AcMessageFrom = $Enums.AcMessageFrom

export const AcMessageFrom: typeof $Enums.AcMessageFrom

export type AcAppointmentStatus = $Enums.AcAppointmentStatus

export const AcAppointmentStatus: typeof $Enums.AcAppointmentStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more AcLeads
 * const acLeads = await prisma.acLead.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more AcLeads
   * const acLeads = await prisma.acLead.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.acLead`: Exposes CRUD operations for the **AcLead** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AcLeads
    * const acLeads = await prisma.acLead.findMany()
    * ```
    */
  get acLead(): Prisma.AcLeadDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.acConversation`: Exposes CRUD operations for the **AcConversation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AcConversations
    * const acConversations = await prisma.acConversation.findMany()
    * ```
    */
  get acConversation(): Prisma.AcConversationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.acMessage`: Exposes CRUD operations for the **AcMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AcMessages
    * const acMessages = await prisma.acMessage.findMany()
    * ```
    */
  get acMessage(): Prisma.AcMessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.acAppointment`: Exposes CRUD operations for the **AcAppointment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AcAppointments
    * const acAppointments = await prisma.acAppointment.findMany()
    * ```
    */
  get acAppointment(): Prisma.AcAppointmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.acSettings`: Exposes CRUD operations for the **AcSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AcSettings
    * const acSettings = await prisma.acSettings.findMany()
    * ```
    */
  get acSettings(): Prisma.AcSettingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.acFollowupStep`: Exposes CRUD operations for the **AcFollowupStep** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AcFollowupSteps
    * const acFollowupSteps = await prisma.acFollowupStep.findMany()
    * ```
    */
  get acFollowupStep(): Prisma.AcFollowupStepDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    AcLead: 'AcLead',
    AcConversation: 'AcConversation',
    AcMessage: 'AcMessage',
    AcAppointment: 'AcAppointment',
    AcSettings: 'AcSettings',
    AcFollowupStep: 'AcFollowupStep'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "acLead" | "acConversation" | "acMessage" | "acAppointment" | "acSettings" | "acFollowupStep"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      AcLead: {
        payload: Prisma.$AcLeadPayload<ExtArgs>
        fields: Prisma.AcLeadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AcLeadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcLeadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AcLeadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcLeadPayload>
          }
          findFirst: {
            args: Prisma.AcLeadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcLeadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AcLeadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcLeadPayload>
          }
          findMany: {
            args: Prisma.AcLeadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcLeadPayload>[]
          }
          create: {
            args: Prisma.AcLeadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcLeadPayload>
          }
          createMany: {
            args: Prisma.AcLeadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AcLeadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcLeadPayload>
          }
          update: {
            args: Prisma.AcLeadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcLeadPayload>
          }
          deleteMany: {
            args: Prisma.AcLeadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AcLeadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AcLeadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcLeadPayload>
          }
          aggregate: {
            args: Prisma.AcLeadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAcLead>
          }
          groupBy: {
            args: Prisma.AcLeadGroupByArgs<ExtArgs>
            result: $Utils.Optional<AcLeadGroupByOutputType>[]
          }
          count: {
            args: Prisma.AcLeadCountArgs<ExtArgs>
            result: $Utils.Optional<AcLeadCountAggregateOutputType> | number
          }
        }
      }
      AcConversation: {
        payload: Prisma.$AcConversationPayload<ExtArgs>
        fields: Prisma.AcConversationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AcConversationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcConversationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AcConversationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcConversationPayload>
          }
          findFirst: {
            args: Prisma.AcConversationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcConversationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AcConversationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcConversationPayload>
          }
          findMany: {
            args: Prisma.AcConversationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcConversationPayload>[]
          }
          create: {
            args: Prisma.AcConversationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcConversationPayload>
          }
          createMany: {
            args: Prisma.AcConversationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AcConversationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcConversationPayload>
          }
          update: {
            args: Prisma.AcConversationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcConversationPayload>
          }
          deleteMany: {
            args: Prisma.AcConversationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AcConversationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AcConversationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcConversationPayload>
          }
          aggregate: {
            args: Prisma.AcConversationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAcConversation>
          }
          groupBy: {
            args: Prisma.AcConversationGroupByArgs<ExtArgs>
            result: $Utils.Optional<AcConversationGroupByOutputType>[]
          }
          count: {
            args: Prisma.AcConversationCountArgs<ExtArgs>
            result: $Utils.Optional<AcConversationCountAggregateOutputType> | number
          }
        }
      }
      AcMessage: {
        payload: Prisma.$AcMessagePayload<ExtArgs>
        fields: Prisma.AcMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AcMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AcMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcMessagePayload>
          }
          findFirst: {
            args: Prisma.AcMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AcMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcMessagePayload>
          }
          findMany: {
            args: Prisma.AcMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcMessagePayload>[]
          }
          create: {
            args: Prisma.AcMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcMessagePayload>
          }
          createMany: {
            args: Prisma.AcMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AcMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcMessagePayload>
          }
          update: {
            args: Prisma.AcMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcMessagePayload>
          }
          deleteMany: {
            args: Prisma.AcMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AcMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AcMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcMessagePayload>
          }
          aggregate: {
            args: Prisma.AcMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAcMessage>
          }
          groupBy: {
            args: Prisma.AcMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<AcMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.AcMessageCountArgs<ExtArgs>
            result: $Utils.Optional<AcMessageCountAggregateOutputType> | number
          }
        }
      }
      AcAppointment: {
        payload: Prisma.$AcAppointmentPayload<ExtArgs>
        fields: Prisma.AcAppointmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AcAppointmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcAppointmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AcAppointmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcAppointmentPayload>
          }
          findFirst: {
            args: Prisma.AcAppointmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcAppointmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AcAppointmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcAppointmentPayload>
          }
          findMany: {
            args: Prisma.AcAppointmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcAppointmentPayload>[]
          }
          create: {
            args: Prisma.AcAppointmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcAppointmentPayload>
          }
          createMany: {
            args: Prisma.AcAppointmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AcAppointmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcAppointmentPayload>
          }
          update: {
            args: Prisma.AcAppointmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcAppointmentPayload>
          }
          deleteMany: {
            args: Prisma.AcAppointmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AcAppointmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AcAppointmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcAppointmentPayload>
          }
          aggregate: {
            args: Prisma.AcAppointmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAcAppointment>
          }
          groupBy: {
            args: Prisma.AcAppointmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AcAppointmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AcAppointmentCountArgs<ExtArgs>
            result: $Utils.Optional<AcAppointmentCountAggregateOutputType> | number
          }
        }
      }
      AcSettings: {
        payload: Prisma.$AcSettingsPayload<ExtArgs>
        fields: Prisma.AcSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AcSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AcSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcSettingsPayload>
          }
          findFirst: {
            args: Prisma.AcSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AcSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcSettingsPayload>
          }
          findMany: {
            args: Prisma.AcSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcSettingsPayload>[]
          }
          create: {
            args: Prisma.AcSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcSettingsPayload>
          }
          createMany: {
            args: Prisma.AcSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AcSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcSettingsPayload>
          }
          update: {
            args: Prisma.AcSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcSettingsPayload>
          }
          deleteMany: {
            args: Prisma.AcSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AcSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AcSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcSettingsPayload>
          }
          aggregate: {
            args: Prisma.AcSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAcSettings>
          }
          groupBy: {
            args: Prisma.AcSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<AcSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.AcSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<AcSettingsCountAggregateOutputType> | number
          }
        }
      }
      AcFollowupStep: {
        payload: Prisma.$AcFollowupStepPayload<ExtArgs>
        fields: Prisma.AcFollowupStepFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AcFollowupStepFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcFollowupStepPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AcFollowupStepFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcFollowupStepPayload>
          }
          findFirst: {
            args: Prisma.AcFollowupStepFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcFollowupStepPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AcFollowupStepFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcFollowupStepPayload>
          }
          findMany: {
            args: Prisma.AcFollowupStepFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcFollowupStepPayload>[]
          }
          create: {
            args: Prisma.AcFollowupStepCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcFollowupStepPayload>
          }
          createMany: {
            args: Prisma.AcFollowupStepCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AcFollowupStepDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcFollowupStepPayload>
          }
          update: {
            args: Prisma.AcFollowupStepUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcFollowupStepPayload>
          }
          deleteMany: {
            args: Prisma.AcFollowupStepDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AcFollowupStepUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AcFollowupStepUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcFollowupStepPayload>
          }
          aggregate: {
            args: Prisma.AcFollowupStepAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAcFollowupStep>
          }
          groupBy: {
            args: Prisma.AcFollowupStepGroupByArgs<ExtArgs>
            result: $Utils.Optional<AcFollowupStepGroupByOutputType>[]
          }
          count: {
            args: Prisma.AcFollowupStepCountArgs<ExtArgs>
            result: $Utils.Optional<AcFollowupStepCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    acLead?: AcLeadOmit
    acConversation?: AcConversationOmit
    acMessage?: AcMessageOmit
    acAppointment?: AcAppointmentOmit
    acSettings?: AcSettingsOmit
    acFollowupStep?: AcFollowupStepOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AcLeadCountOutputType
   */

  export type AcLeadCountOutputType = {
    conversations: number
    appointments: number
  }

  export type AcLeadCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversations?: boolean | AcLeadCountOutputTypeCountConversationsArgs
    appointments?: boolean | AcLeadCountOutputTypeCountAppointmentsArgs
  }

  // Custom InputTypes
  /**
   * AcLeadCountOutputType without action
   */
  export type AcLeadCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcLeadCountOutputType
     */
    select?: AcLeadCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AcLeadCountOutputType without action
   */
  export type AcLeadCountOutputTypeCountConversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcConversationWhereInput
  }

  /**
   * AcLeadCountOutputType without action
   */
  export type AcLeadCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcAppointmentWhereInput
  }


  /**
   * Count Type AcConversationCountOutputType
   */

  export type AcConversationCountOutputType = {
    messages: number
  }

  export type AcConversationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | AcConversationCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * AcConversationCountOutputType without action
   */
  export type AcConversationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcConversationCountOutputType
     */
    select?: AcConversationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AcConversationCountOutputType without action
   */
  export type AcConversationCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcMessageWhereInput
  }


  /**
   * Count Type AcSettingsCountOutputType
   */

  export type AcSettingsCountOutputType = {
    followupSteps: number
  }

  export type AcSettingsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    followupSteps?: boolean | AcSettingsCountOutputTypeCountFollowupStepsArgs
  }

  // Custom InputTypes
  /**
   * AcSettingsCountOutputType without action
   */
  export type AcSettingsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcSettingsCountOutputType
     */
    select?: AcSettingsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AcSettingsCountOutputType without action
   */
  export type AcSettingsCountOutputTypeCountFollowupStepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcFollowupStepWhereInput
  }


  /**
   * Models
   */

  /**
   * Model AcLead
   */

  export type AggregateAcLead = {
    _count: AcLeadCountAggregateOutputType | null
    _min: AcLeadMinAggregateOutputType | null
    _max: AcLeadMaxAggregateOutputType | null
  }

  export type AcLeadMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    phone: string | null
    email: string | null
    stage: $Enums.AcLeadStage | null
    notes: string | null
    nextFollowUpAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AcLeadMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    phone: string | null
    email: string | null
    stage: $Enums.AcLeadStage | null
    notes: string | null
    nextFollowUpAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AcLeadCountAggregateOutputType = {
    id: number
    tenantId: number
    name: number
    phone: number
    email: number
    stage: number
    notes: number
    nextFollowUpAt: number
    ai: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AcLeadMinAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    phone?: true
    email?: true
    stage?: true
    notes?: true
    nextFollowUpAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AcLeadMaxAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    phone?: true
    email?: true
    stage?: true
    notes?: true
    nextFollowUpAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AcLeadCountAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    phone?: true
    email?: true
    stage?: true
    notes?: true
    nextFollowUpAt?: true
    ai?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AcLeadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcLead to aggregate.
     */
    where?: AcLeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcLeads to fetch.
     */
    orderBy?: AcLeadOrderByWithRelationInput | AcLeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AcLeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcLeads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcLeads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AcLeads
    **/
    _count?: true | AcLeadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AcLeadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AcLeadMaxAggregateInputType
  }

  export type GetAcLeadAggregateType<T extends AcLeadAggregateArgs> = {
        [P in keyof T & keyof AggregateAcLead]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAcLead[P]>
      : GetScalarType<T[P], AggregateAcLead[P]>
  }




  export type AcLeadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcLeadWhereInput
    orderBy?: AcLeadOrderByWithAggregationInput | AcLeadOrderByWithAggregationInput[]
    by: AcLeadScalarFieldEnum[] | AcLeadScalarFieldEnum
    having?: AcLeadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AcLeadCountAggregateInputType | true
    _min?: AcLeadMinAggregateInputType
    _max?: AcLeadMaxAggregateInputType
  }

  export type AcLeadGroupByOutputType = {
    id: string
    tenantId: string
    name: string
    phone: string | null
    email: string | null
    stage: $Enums.AcLeadStage
    notes: string | null
    nextFollowUpAt: Date | null
    ai: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: AcLeadCountAggregateOutputType | null
    _min: AcLeadMinAggregateOutputType | null
    _max: AcLeadMaxAggregateOutputType | null
  }

  type GetAcLeadGroupByPayload<T extends AcLeadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AcLeadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AcLeadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AcLeadGroupByOutputType[P]>
            : GetScalarType<T[P], AcLeadGroupByOutputType[P]>
        }
      >
    >


  export type AcLeadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    stage?: boolean
    notes?: boolean
    nextFollowUpAt?: boolean
    ai?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    conversations?: boolean | AcLead$conversationsArgs<ExtArgs>
    appointments?: boolean | AcLead$appointmentsArgs<ExtArgs>
    _count?: boolean | AcLeadCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["acLead"]>



  export type AcLeadSelectScalar = {
    id?: boolean
    tenantId?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    stage?: boolean
    notes?: boolean
    nextFollowUpAt?: boolean
    ai?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AcLeadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "name" | "phone" | "email" | "stage" | "notes" | "nextFollowUpAt" | "ai" | "createdAt" | "updatedAt", ExtArgs["result"]["acLead"]>
  export type AcLeadInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversations?: boolean | AcLead$conversationsArgs<ExtArgs>
    appointments?: boolean | AcLead$appointmentsArgs<ExtArgs>
    _count?: boolean | AcLeadCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $AcLeadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AcLead"
    objects: {
      conversations: Prisma.$AcConversationPayload<ExtArgs>[]
      appointments: Prisma.$AcAppointmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      name: string
      phone: string | null
      email: string | null
      stage: $Enums.AcLeadStage
      notes: string | null
      nextFollowUpAt: Date | null
      ai: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["acLead"]>
    composites: {}
  }

  type AcLeadGetPayload<S extends boolean | null | undefined | AcLeadDefaultArgs> = $Result.GetResult<Prisma.$AcLeadPayload, S>

  type AcLeadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AcLeadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AcLeadCountAggregateInputType | true
    }

  export interface AcLeadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AcLead'], meta: { name: 'AcLead' } }
    /**
     * Find zero or one AcLead that matches the filter.
     * @param {AcLeadFindUniqueArgs} args - Arguments to find a AcLead
     * @example
     * // Get one AcLead
     * const acLead = await prisma.acLead.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AcLeadFindUniqueArgs>(args: SelectSubset<T, AcLeadFindUniqueArgs<ExtArgs>>): Prisma__AcLeadClient<$Result.GetResult<Prisma.$AcLeadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AcLead that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AcLeadFindUniqueOrThrowArgs} args - Arguments to find a AcLead
     * @example
     * // Get one AcLead
     * const acLead = await prisma.acLead.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AcLeadFindUniqueOrThrowArgs>(args: SelectSubset<T, AcLeadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AcLeadClient<$Result.GetResult<Prisma.$AcLeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AcLead that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcLeadFindFirstArgs} args - Arguments to find a AcLead
     * @example
     * // Get one AcLead
     * const acLead = await prisma.acLead.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AcLeadFindFirstArgs>(args?: SelectSubset<T, AcLeadFindFirstArgs<ExtArgs>>): Prisma__AcLeadClient<$Result.GetResult<Prisma.$AcLeadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AcLead that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcLeadFindFirstOrThrowArgs} args - Arguments to find a AcLead
     * @example
     * // Get one AcLead
     * const acLead = await prisma.acLead.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AcLeadFindFirstOrThrowArgs>(args?: SelectSubset<T, AcLeadFindFirstOrThrowArgs<ExtArgs>>): Prisma__AcLeadClient<$Result.GetResult<Prisma.$AcLeadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AcLeads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcLeadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AcLeads
     * const acLeads = await prisma.acLead.findMany()
     * 
     * // Get first 10 AcLeads
     * const acLeads = await prisma.acLead.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const acLeadWithIdOnly = await prisma.acLead.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AcLeadFindManyArgs>(args?: SelectSubset<T, AcLeadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcLeadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AcLead.
     * @param {AcLeadCreateArgs} args - Arguments to create a AcLead.
     * @example
     * // Create one AcLead
     * const AcLead = await prisma.acLead.create({
     *   data: {
     *     // ... data to create a AcLead
     *   }
     * })
     * 
     */
    create<T extends AcLeadCreateArgs>(args: SelectSubset<T, AcLeadCreateArgs<ExtArgs>>): Prisma__AcLeadClient<$Result.GetResult<Prisma.$AcLeadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AcLeads.
     * @param {AcLeadCreateManyArgs} args - Arguments to create many AcLeads.
     * @example
     * // Create many AcLeads
     * const acLead = await prisma.acLead.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AcLeadCreateManyArgs>(args?: SelectSubset<T, AcLeadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AcLead.
     * @param {AcLeadDeleteArgs} args - Arguments to delete one AcLead.
     * @example
     * // Delete one AcLead
     * const AcLead = await prisma.acLead.delete({
     *   where: {
     *     // ... filter to delete one AcLead
     *   }
     * })
     * 
     */
    delete<T extends AcLeadDeleteArgs>(args: SelectSubset<T, AcLeadDeleteArgs<ExtArgs>>): Prisma__AcLeadClient<$Result.GetResult<Prisma.$AcLeadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AcLead.
     * @param {AcLeadUpdateArgs} args - Arguments to update one AcLead.
     * @example
     * // Update one AcLead
     * const acLead = await prisma.acLead.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AcLeadUpdateArgs>(args: SelectSubset<T, AcLeadUpdateArgs<ExtArgs>>): Prisma__AcLeadClient<$Result.GetResult<Prisma.$AcLeadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AcLeads.
     * @param {AcLeadDeleteManyArgs} args - Arguments to filter AcLeads to delete.
     * @example
     * // Delete a few AcLeads
     * const { count } = await prisma.acLead.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AcLeadDeleteManyArgs>(args?: SelectSubset<T, AcLeadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AcLeads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcLeadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AcLeads
     * const acLead = await prisma.acLead.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AcLeadUpdateManyArgs>(args: SelectSubset<T, AcLeadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AcLead.
     * @param {AcLeadUpsertArgs} args - Arguments to update or create a AcLead.
     * @example
     * // Update or create a AcLead
     * const acLead = await prisma.acLead.upsert({
     *   create: {
     *     // ... data to create a AcLead
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AcLead we want to update
     *   }
     * })
     */
    upsert<T extends AcLeadUpsertArgs>(args: SelectSubset<T, AcLeadUpsertArgs<ExtArgs>>): Prisma__AcLeadClient<$Result.GetResult<Prisma.$AcLeadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AcLeads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcLeadCountArgs} args - Arguments to filter AcLeads to count.
     * @example
     * // Count the number of AcLeads
     * const count = await prisma.acLead.count({
     *   where: {
     *     // ... the filter for the AcLeads we want to count
     *   }
     * })
    **/
    count<T extends AcLeadCountArgs>(
      args?: Subset<T, AcLeadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AcLeadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AcLead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcLeadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AcLeadAggregateArgs>(args: Subset<T, AcLeadAggregateArgs>): Prisma.PrismaPromise<GetAcLeadAggregateType<T>>

    /**
     * Group by AcLead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcLeadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AcLeadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AcLeadGroupByArgs['orderBy'] }
        : { orderBy?: AcLeadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AcLeadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAcLeadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AcLead model
   */
  readonly fields: AcLeadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AcLead.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AcLeadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conversations<T extends AcLead$conversationsArgs<ExtArgs> = {}>(args?: Subset<T, AcLead$conversationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    appointments<T extends AcLead$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, AcLead$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcAppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AcLead model
   */
  interface AcLeadFieldRefs {
    readonly id: FieldRef<"AcLead", 'String'>
    readonly tenantId: FieldRef<"AcLead", 'String'>
    readonly name: FieldRef<"AcLead", 'String'>
    readonly phone: FieldRef<"AcLead", 'String'>
    readonly email: FieldRef<"AcLead", 'String'>
    readonly stage: FieldRef<"AcLead", 'AcLeadStage'>
    readonly notes: FieldRef<"AcLead", 'String'>
    readonly nextFollowUpAt: FieldRef<"AcLead", 'DateTime'>
    readonly ai: FieldRef<"AcLead", 'Json'>
    readonly createdAt: FieldRef<"AcLead", 'DateTime'>
    readonly updatedAt: FieldRef<"AcLead", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AcLead findUnique
   */
  export type AcLeadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcLead
     */
    select?: AcLeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcLead
     */
    omit?: AcLeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcLeadInclude<ExtArgs> | null
    /**
     * Filter, which AcLead to fetch.
     */
    where: AcLeadWhereUniqueInput
  }

  /**
   * AcLead findUniqueOrThrow
   */
  export type AcLeadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcLead
     */
    select?: AcLeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcLead
     */
    omit?: AcLeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcLeadInclude<ExtArgs> | null
    /**
     * Filter, which AcLead to fetch.
     */
    where: AcLeadWhereUniqueInput
  }

  /**
   * AcLead findFirst
   */
  export type AcLeadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcLead
     */
    select?: AcLeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcLead
     */
    omit?: AcLeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcLeadInclude<ExtArgs> | null
    /**
     * Filter, which AcLead to fetch.
     */
    where?: AcLeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcLeads to fetch.
     */
    orderBy?: AcLeadOrderByWithRelationInput | AcLeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcLeads.
     */
    cursor?: AcLeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcLeads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcLeads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcLeads.
     */
    distinct?: AcLeadScalarFieldEnum | AcLeadScalarFieldEnum[]
  }

  /**
   * AcLead findFirstOrThrow
   */
  export type AcLeadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcLead
     */
    select?: AcLeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcLead
     */
    omit?: AcLeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcLeadInclude<ExtArgs> | null
    /**
     * Filter, which AcLead to fetch.
     */
    where?: AcLeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcLeads to fetch.
     */
    orderBy?: AcLeadOrderByWithRelationInput | AcLeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcLeads.
     */
    cursor?: AcLeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcLeads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcLeads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcLeads.
     */
    distinct?: AcLeadScalarFieldEnum | AcLeadScalarFieldEnum[]
  }

  /**
   * AcLead findMany
   */
  export type AcLeadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcLead
     */
    select?: AcLeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcLead
     */
    omit?: AcLeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcLeadInclude<ExtArgs> | null
    /**
     * Filter, which AcLeads to fetch.
     */
    where?: AcLeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcLeads to fetch.
     */
    orderBy?: AcLeadOrderByWithRelationInput | AcLeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AcLeads.
     */
    cursor?: AcLeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcLeads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcLeads.
     */
    skip?: number
    distinct?: AcLeadScalarFieldEnum | AcLeadScalarFieldEnum[]
  }

  /**
   * AcLead create
   */
  export type AcLeadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcLead
     */
    select?: AcLeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcLead
     */
    omit?: AcLeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcLeadInclude<ExtArgs> | null
    /**
     * The data needed to create a AcLead.
     */
    data: XOR<AcLeadCreateInput, AcLeadUncheckedCreateInput>
  }

  /**
   * AcLead createMany
   */
  export type AcLeadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AcLeads.
     */
    data: AcLeadCreateManyInput | AcLeadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AcLead update
   */
  export type AcLeadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcLead
     */
    select?: AcLeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcLead
     */
    omit?: AcLeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcLeadInclude<ExtArgs> | null
    /**
     * The data needed to update a AcLead.
     */
    data: XOR<AcLeadUpdateInput, AcLeadUncheckedUpdateInput>
    /**
     * Choose, which AcLead to update.
     */
    where: AcLeadWhereUniqueInput
  }

  /**
   * AcLead updateMany
   */
  export type AcLeadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AcLeads.
     */
    data: XOR<AcLeadUpdateManyMutationInput, AcLeadUncheckedUpdateManyInput>
    /**
     * Filter which AcLeads to update
     */
    where?: AcLeadWhereInput
    /**
     * Limit how many AcLeads to update.
     */
    limit?: number
  }

  /**
   * AcLead upsert
   */
  export type AcLeadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcLead
     */
    select?: AcLeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcLead
     */
    omit?: AcLeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcLeadInclude<ExtArgs> | null
    /**
     * The filter to search for the AcLead to update in case it exists.
     */
    where: AcLeadWhereUniqueInput
    /**
     * In case the AcLead found by the `where` argument doesn't exist, create a new AcLead with this data.
     */
    create: XOR<AcLeadCreateInput, AcLeadUncheckedCreateInput>
    /**
     * In case the AcLead was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AcLeadUpdateInput, AcLeadUncheckedUpdateInput>
  }

  /**
   * AcLead delete
   */
  export type AcLeadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcLead
     */
    select?: AcLeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcLead
     */
    omit?: AcLeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcLeadInclude<ExtArgs> | null
    /**
     * Filter which AcLead to delete.
     */
    where: AcLeadWhereUniqueInput
  }

  /**
   * AcLead deleteMany
   */
  export type AcLeadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcLeads to delete
     */
    where?: AcLeadWhereInput
    /**
     * Limit how many AcLeads to delete.
     */
    limit?: number
  }

  /**
   * AcLead.conversations
   */
  export type AcLead$conversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcConversation
     */
    select?: AcConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcConversation
     */
    omit?: AcConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcConversationInclude<ExtArgs> | null
    where?: AcConversationWhereInput
    orderBy?: AcConversationOrderByWithRelationInput | AcConversationOrderByWithRelationInput[]
    cursor?: AcConversationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AcConversationScalarFieldEnum | AcConversationScalarFieldEnum[]
  }

  /**
   * AcLead.appointments
   */
  export type AcLead$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcAppointment
     */
    select?: AcAppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcAppointment
     */
    omit?: AcAppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcAppointmentInclude<ExtArgs> | null
    where?: AcAppointmentWhereInput
    orderBy?: AcAppointmentOrderByWithRelationInput | AcAppointmentOrderByWithRelationInput[]
    cursor?: AcAppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AcAppointmentScalarFieldEnum | AcAppointmentScalarFieldEnum[]
  }

  /**
   * AcLead without action
   */
  export type AcLeadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcLead
     */
    select?: AcLeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcLead
     */
    omit?: AcLeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcLeadInclude<ExtArgs> | null
  }


  /**
   * Model AcConversation
   */

  export type AggregateAcConversation = {
    _count: AcConversationCountAggregateOutputType | null
    _avg: AcConversationAvgAggregateOutputType | null
    _sum: AcConversationSumAggregateOutputType | null
    _min: AcConversationMinAggregateOutputType | null
    _max: AcConversationMaxAggregateOutputType | null
  }

  export type AcConversationAvgAggregateOutputType = {
    unreadCount: number | null
  }

  export type AcConversationSumAggregateOutputType = {
    unreadCount: number | null
  }

  export type AcConversationMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    leadId: string | null
    channel: string | null
    unreadCount: number | null
    lastAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AcConversationMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    leadId: string | null
    channel: string | null
    unreadCount: number | null
    lastAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AcConversationCountAggregateOutputType = {
    id: number
    tenantId: number
    leadId: number
    channel: number
    unreadCount: number
    lastAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AcConversationAvgAggregateInputType = {
    unreadCount?: true
  }

  export type AcConversationSumAggregateInputType = {
    unreadCount?: true
  }

  export type AcConversationMinAggregateInputType = {
    id?: true
    tenantId?: true
    leadId?: true
    channel?: true
    unreadCount?: true
    lastAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AcConversationMaxAggregateInputType = {
    id?: true
    tenantId?: true
    leadId?: true
    channel?: true
    unreadCount?: true
    lastAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AcConversationCountAggregateInputType = {
    id?: true
    tenantId?: true
    leadId?: true
    channel?: true
    unreadCount?: true
    lastAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AcConversationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcConversation to aggregate.
     */
    where?: AcConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcConversations to fetch.
     */
    orderBy?: AcConversationOrderByWithRelationInput | AcConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AcConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcConversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcConversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AcConversations
    **/
    _count?: true | AcConversationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AcConversationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AcConversationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AcConversationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AcConversationMaxAggregateInputType
  }

  export type GetAcConversationAggregateType<T extends AcConversationAggregateArgs> = {
        [P in keyof T & keyof AggregateAcConversation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAcConversation[P]>
      : GetScalarType<T[P], AggregateAcConversation[P]>
  }




  export type AcConversationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcConversationWhereInput
    orderBy?: AcConversationOrderByWithAggregationInput | AcConversationOrderByWithAggregationInput[]
    by: AcConversationScalarFieldEnum[] | AcConversationScalarFieldEnum
    having?: AcConversationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AcConversationCountAggregateInputType | true
    _avg?: AcConversationAvgAggregateInputType
    _sum?: AcConversationSumAggregateInputType
    _min?: AcConversationMinAggregateInputType
    _max?: AcConversationMaxAggregateInputType
  }

  export type AcConversationGroupByOutputType = {
    id: string
    tenantId: string
    leadId: string
    channel: string
    unreadCount: number
    lastAt: Date
    createdAt: Date
    updatedAt: Date
    _count: AcConversationCountAggregateOutputType | null
    _avg: AcConversationAvgAggregateOutputType | null
    _sum: AcConversationSumAggregateOutputType | null
    _min: AcConversationMinAggregateOutputType | null
    _max: AcConversationMaxAggregateOutputType | null
  }

  type GetAcConversationGroupByPayload<T extends AcConversationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AcConversationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AcConversationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AcConversationGroupByOutputType[P]>
            : GetScalarType<T[P], AcConversationGroupByOutputType[P]>
        }
      >
    >


  export type AcConversationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    leadId?: boolean
    channel?: boolean
    unreadCount?: boolean
    lastAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lead?: boolean | AcLeadDefaultArgs<ExtArgs>
    messages?: boolean | AcConversation$messagesArgs<ExtArgs>
    _count?: boolean | AcConversationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["acConversation"]>



  export type AcConversationSelectScalar = {
    id?: boolean
    tenantId?: boolean
    leadId?: boolean
    channel?: boolean
    unreadCount?: boolean
    lastAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AcConversationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "leadId" | "channel" | "unreadCount" | "lastAt" | "createdAt" | "updatedAt", ExtArgs["result"]["acConversation"]>
  export type AcConversationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | AcLeadDefaultArgs<ExtArgs>
    messages?: boolean | AcConversation$messagesArgs<ExtArgs>
    _count?: boolean | AcConversationCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $AcConversationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AcConversation"
    objects: {
      lead: Prisma.$AcLeadPayload<ExtArgs>
      messages: Prisma.$AcMessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      leadId: string
      channel: string
      unreadCount: number
      lastAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["acConversation"]>
    composites: {}
  }

  type AcConversationGetPayload<S extends boolean | null | undefined | AcConversationDefaultArgs> = $Result.GetResult<Prisma.$AcConversationPayload, S>

  type AcConversationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AcConversationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AcConversationCountAggregateInputType | true
    }

  export interface AcConversationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AcConversation'], meta: { name: 'AcConversation' } }
    /**
     * Find zero or one AcConversation that matches the filter.
     * @param {AcConversationFindUniqueArgs} args - Arguments to find a AcConversation
     * @example
     * // Get one AcConversation
     * const acConversation = await prisma.acConversation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AcConversationFindUniqueArgs>(args: SelectSubset<T, AcConversationFindUniqueArgs<ExtArgs>>): Prisma__AcConversationClient<$Result.GetResult<Prisma.$AcConversationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AcConversation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AcConversationFindUniqueOrThrowArgs} args - Arguments to find a AcConversation
     * @example
     * // Get one AcConversation
     * const acConversation = await prisma.acConversation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AcConversationFindUniqueOrThrowArgs>(args: SelectSubset<T, AcConversationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AcConversationClient<$Result.GetResult<Prisma.$AcConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AcConversation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcConversationFindFirstArgs} args - Arguments to find a AcConversation
     * @example
     * // Get one AcConversation
     * const acConversation = await prisma.acConversation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AcConversationFindFirstArgs>(args?: SelectSubset<T, AcConversationFindFirstArgs<ExtArgs>>): Prisma__AcConversationClient<$Result.GetResult<Prisma.$AcConversationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AcConversation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcConversationFindFirstOrThrowArgs} args - Arguments to find a AcConversation
     * @example
     * // Get one AcConversation
     * const acConversation = await prisma.acConversation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AcConversationFindFirstOrThrowArgs>(args?: SelectSubset<T, AcConversationFindFirstOrThrowArgs<ExtArgs>>): Prisma__AcConversationClient<$Result.GetResult<Prisma.$AcConversationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AcConversations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcConversationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AcConversations
     * const acConversations = await prisma.acConversation.findMany()
     * 
     * // Get first 10 AcConversations
     * const acConversations = await prisma.acConversation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const acConversationWithIdOnly = await prisma.acConversation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AcConversationFindManyArgs>(args?: SelectSubset<T, AcConversationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AcConversation.
     * @param {AcConversationCreateArgs} args - Arguments to create a AcConversation.
     * @example
     * // Create one AcConversation
     * const AcConversation = await prisma.acConversation.create({
     *   data: {
     *     // ... data to create a AcConversation
     *   }
     * })
     * 
     */
    create<T extends AcConversationCreateArgs>(args: SelectSubset<T, AcConversationCreateArgs<ExtArgs>>): Prisma__AcConversationClient<$Result.GetResult<Prisma.$AcConversationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AcConversations.
     * @param {AcConversationCreateManyArgs} args - Arguments to create many AcConversations.
     * @example
     * // Create many AcConversations
     * const acConversation = await prisma.acConversation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AcConversationCreateManyArgs>(args?: SelectSubset<T, AcConversationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AcConversation.
     * @param {AcConversationDeleteArgs} args - Arguments to delete one AcConversation.
     * @example
     * // Delete one AcConversation
     * const AcConversation = await prisma.acConversation.delete({
     *   where: {
     *     // ... filter to delete one AcConversation
     *   }
     * })
     * 
     */
    delete<T extends AcConversationDeleteArgs>(args: SelectSubset<T, AcConversationDeleteArgs<ExtArgs>>): Prisma__AcConversationClient<$Result.GetResult<Prisma.$AcConversationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AcConversation.
     * @param {AcConversationUpdateArgs} args - Arguments to update one AcConversation.
     * @example
     * // Update one AcConversation
     * const acConversation = await prisma.acConversation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AcConversationUpdateArgs>(args: SelectSubset<T, AcConversationUpdateArgs<ExtArgs>>): Prisma__AcConversationClient<$Result.GetResult<Prisma.$AcConversationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AcConversations.
     * @param {AcConversationDeleteManyArgs} args - Arguments to filter AcConversations to delete.
     * @example
     * // Delete a few AcConversations
     * const { count } = await prisma.acConversation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AcConversationDeleteManyArgs>(args?: SelectSubset<T, AcConversationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AcConversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcConversationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AcConversations
     * const acConversation = await prisma.acConversation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AcConversationUpdateManyArgs>(args: SelectSubset<T, AcConversationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AcConversation.
     * @param {AcConversationUpsertArgs} args - Arguments to update or create a AcConversation.
     * @example
     * // Update or create a AcConversation
     * const acConversation = await prisma.acConversation.upsert({
     *   create: {
     *     // ... data to create a AcConversation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AcConversation we want to update
     *   }
     * })
     */
    upsert<T extends AcConversationUpsertArgs>(args: SelectSubset<T, AcConversationUpsertArgs<ExtArgs>>): Prisma__AcConversationClient<$Result.GetResult<Prisma.$AcConversationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AcConversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcConversationCountArgs} args - Arguments to filter AcConversations to count.
     * @example
     * // Count the number of AcConversations
     * const count = await prisma.acConversation.count({
     *   where: {
     *     // ... the filter for the AcConversations we want to count
     *   }
     * })
    **/
    count<T extends AcConversationCountArgs>(
      args?: Subset<T, AcConversationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AcConversationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AcConversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcConversationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AcConversationAggregateArgs>(args: Subset<T, AcConversationAggregateArgs>): Prisma.PrismaPromise<GetAcConversationAggregateType<T>>

    /**
     * Group by AcConversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcConversationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AcConversationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AcConversationGroupByArgs['orderBy'] }
        : { orderBy?: AcConversationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AcConversationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAcConversationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AcConversation model
   */
  readonly fields: AcConversationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AcConversation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AcConversationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lead<T extends AcLeadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AcLeadDefaultArgs<ExtArgs>>): Prisma__AcLeadClient<$Result.GetResult<Prisma.$AcLeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    messages<T extends AcConversation$messagesArgs<ExtArgs> = {}>(args?: Subset<T, AcConversation$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AcConversation model
   */
  interface AcConversationFieldRefs {
    readonly id: FieldRef<"AcConversation", 'String'>
    readonly tenantId: FieldRef<"AcConversation", 'String'>
    readonly leadId: FieldRef<"AcConversation", 'String'>
    readonly channel: FieldRef<"AcConversation", 'String'>
    readonly unreadCount: FieldRef<"AcConversation", 'Int'>
    readonly lastAt: FieldRef<"AcConversation", 'DateTime'>
    readonly createdAt: FieldRef<"AcConversation", 'DateTime'>
    readonly updatedAt: FieldRef<"AcConversation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AcConversation findUnique
   */
  export type AcConversationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcConversation
     */
    select?: AcConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcConversation
     */
    omit?: AcConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcConversationInclude<ExtArgs> | null
    /**
     * Filter, which AcConversation to fetch.
     */
    where: AcConversationWhereUniqueInput
  }

  /**
   * AcConversation findUniqueOrThrow
   */
  export type AcConversationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcConversation
     */
    select?: AcConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcConversation
     */
    omit?: AcConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcConversationInclude<ExtArgs> | null
    /**
     * Filter, which AcConversation to fetch.
     */
    where: AcConversationWhereUniqueInput
  }

  /**
   * AcConversation findFirst
   */
  export type AcConversationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcConversation
     */
    select?: AcConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcConversation
     */
    omit?: AcConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcConversationInclude<ExtArgs> | null
    /**
     * Filter, which AcConversation to fetch.
     */
    where?: AcConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcConversations to fetch.
     */
    orderBy?: AcConversationOrderByWithRelationInput | AcConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcConversations.
     */
    cursor?: AcConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcConversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcConversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcConversations.
     */
    distinct?: AcConversationScalarFieldEnum | AcConversationScalarFieldEnum[]
  }

  /**
   * AcConversation findFirstOrThrow
   */
  export type AcConversationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcConversation
     */
    select?: AcConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcConversation
     */
    omit?: AcConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcConversationInclude<ExtArgs> | null
    /**
     * Filter, which AcConversation to fetch.
     */
    where?: AcConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcConversations to fetch.
     */
    orderBy?: AcConversationOrderByWithRelationInput | AcConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcConversations.
     */
    cursor?: AcConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcConversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcConversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcConversations.
     */
    distinct?: AcConversationScalarFieldEnum | AcConversationScalarFieldEnum[]
  }

  /**
   * AcConversation findMany
   */
  export type AcConversationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcConversation
     */
    select?: AcConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcConversation
     */
    omit?: AcConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcConversationInclude<ExtArgs> | null
    /**
     * Filter, which AcConversations to fetch.
     */
    where?: AcConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcConversations to fetch.
     */
    orderBy?: AcConversationOrderByWithRelationInput | AcConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AcConversations.
     */
    cursor?: AcConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcConversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcConversations.
     */
    skip?: number
    distinct?: AcConversationScalarFieldEnum | AcConversationScalarFieldEnum[]
  }

  /**
   * AcConversation create
   */
  export type AcConversationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcConversation
     */
    select?: AcConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcConversation
     */
    omit?: AcConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcConversationInclude<ExtArgs> | null
    /**
     * The data needed to create a AcConversation.
     */
    data: XOR<AcConversationCreateInput, AcConversationUncheckedCreateInput>
  }

  /**
   * AcConversation createMany
   */
  export type AcConversationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AcConversations.
     */
    data: AcConversationCreateManyInput | AcConversationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AcConversation update
   */
  export type AcConversationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcConversation
     */
    select?: AcConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcConversation
     */
    omit?: AcConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcConversationInclude<ExtArgs> | null
    /**
     * The data needed to update a AcConversation.
     */
    data: XOR<AcConversationUpdateInput, AcConversationUncheckedUpdateInput>
    /**
     * Choose, which AcConversation to update.
     */
    where: AcConversationWhereUniqueInput
  }

  /**
   * AcConversation updateMany
   */
  export type AcConversationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AcConversations.
     */
    data: XOR<AcConversationUpdateManyMutationInput, AcConversationUncheckedUpdateManyInput>
    /**
     * Filter which AcConversations to update
     */
    where?: AcConversationWhereInput
    /**
     * Limit how many AcConversations to update.
     */
    limit?: number
  }

  /**
   * AcConversation upsert
   */
  export type AcConversationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcConversation
     */
    select?: AcConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcConversation
     */
    omit?: AcConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcConversationInclude<ExtArgs> | null
    /**
     * The filter to search for the AcConversation to update in case it exists.
     */
    where: AcConversationWhereUniqueInput
    /**
     * In case the AcConversation found by the `where` argument doesn't exist, create a new AcConversation with this data.
     */
    create: XOR<AcConversationCreateInput, AcConversationUncheckedCreateInput>
    /**
     * In case the AcConversation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AcConversationUpdateInput, AcConversationUncheckedUpdateInput>
  }

  /**
   * AcConversation delete
   */
  export type AcConversationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcConversation
     */
    select?: AcConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcConversation
     */
    omit?: AcConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcConversationInclude<ExtArgs> | null
    /**
     * Filter which AcConversation to delete.
     */
    where: AcConversationWhereUniqueInput
  }

  /**
   * AcConversation deleteMany
   */
  export type AcConversationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcConversations to delete
     */
    where?: AcConversationWhereInput
    /**
     * Limit how many AcConversations to delete.
     */
    limit?: number
  }

  /**
   * AcConversation.messages
   */
  export type AcConversation$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcMessage
     */
    select?: AcMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcMessage
     */
    omit?: AcMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcMessageInclude<ExtArgs> | null
    where?: AcMessageWhereInput
    orderBy?: AcMessageOrderByWithRelationInput | AcMessageOrderByWithRelationInput[]
    cursor?: AcMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AcMessageScalarFieldEnum | AcMessageScalarFieldEnum[]
  }

  /**
   * AcConversation without action
   */
  export type AcConversationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcConversation
     */
    select?: AcConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcConversation
     */
    omit?: AcConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcConversationInclude<ExtArgs> | null
  }


  /**
   * Model AcMessage
   */

  export type AggregateAcMessage = {
    _count: AcMessageCountAggregateOutputType | null
    _min: AcMessageMinAggregateOutputType | null
    _max: AcMessageMaxAggregateOutputType | null
  }

  export type AcMessageMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    conversationId: string | null
    at: Date | null
    from: $Enums.AcMessageFrom | null
    text: string | null
  }

  export type AcMessageMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    conversationId: string | null
    at: Date | null
    from: $Enums.AcMessageFrom | null
    text: string | null
  }

  export type AcMessageCountAggregateOutputType = {
    id: number
    tenantId: number
    conversationId: number
    at: number
    from: number
    text: number
    _all: number
  }


  export type AcMessageMinAggregateInputType = {
    id?: true
    tenantId?: true
    conversationId?: true
    at?: true
    from?: true
    text?: true
  }

  export type AcMessageMaxAggregateInputType = {
    id?: true
    tenantId?: true
    conversationId?: true
    at?: true
    from?: true
    text?: true
  }

  export type AcMessageCountAggregateInputType = {
    id?: true
    tenantId?: true
    conversationId?: true
    at?: true
    from?: true
    text?: true
    _all?: true
  }

  export type AcMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcMessage to aggregate.
     */
    where?: AcMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcMessages to fetch.
     */
    orderBy?: AcMessageOrderByWithRelationInput | AcMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AcMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AcMessages
    **/
    _count?: true | AcMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AcMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AcMessageMaxAggregateInputType
  }

  export type GetAcMessageAggregateType<T extends AcMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateAcMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAcMessage[P]>
      : GetScalarType<T[P], AggregateAcMessage[P]>
  }




  export type AcMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcMessageWhereInput
    orderBy?: AcMessageOrderByWithAggregationInput | AcMessageOrderByWithAggregationInput[]
    by: AcMessageScalarFieldEnum[] | AcMessageScalarFieldEnum
    having?: AcMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AcMessageCountAggregateInputType | true
    _min?: AcMessageMinAggregateInputType
    _max?: AcMessageMaxAggregateInputType
  }

  export type AcMessageGroupByOutputType = {
    id: string
    tenantId: string
    conversationId: string
    at: Date
    from: $Enums.AcMessageFrom
    text: string
    _count: AcMessageCountAggregateOutputType | null
    _min: AcMessageMinAggregateOutputType | null
    _max: AcMessageMaxAggregateOutputType | null
  }

  type GetAcMessageGroupByPayload<T extends AcMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AcMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AcMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AcMessageGroupByOutputType[P]>
            : GetScalarType<T[P], AcMessageGroupByOutputType[P]>
        }
      >
    >


  export type AcMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    conversationId?: boolean
    at?: boolean
    from?: boolean
    text?: boolean
    conversation?: boolean | AcConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["acMessage"]>



  export type AcMessageSelectScalar = {
    id?: boolean
    tenantId?: boolean
    conversationId?: boolean
    at?: boolean
    from?: boolean
    text?: boolean
  }

  export type AcMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "conversationId" | "at" | "from" | "text", ExtArgs["result"]["acMessage"]>
  export type AcMessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | AcConversationDefaultArgs<ExtArgs>
  }

  export type $AcMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AcMessage"
    objects: {
      conversation: Prisma.$AcConversationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      conversationId: string
      at: Date
      from: $Enums.AcMessageFrom
      text: string
    }, ExtArgs["result"]["acMessage"]>
    composites: {}
  }

  type AcMessageGetPayload<S extends boolean | null | undefined | AcMessageDefaultArgs> = $Result.GetResult<Prisma.$AcMessagePayload, S>

  type AcMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AcMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AcMessageCountAggregateInputType | true
    }

  export interface AcMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AcMessage'], meta: { name: 'AcMessage' } }
    /**
     * Find zero or one AcMessage that matches the filter.
     * @param {AcMessageFindUniqueArgs} args - Arguments to find a AcMessage
     * @example
     * // Get one AcMessage
     * const acMessage = await prisma.acMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AcMessageFindUniqueArgs>(args: SelectSubset<T, AcMessageFindUniqueArgs<ExtArgs>>): Prisma__AcMessageClient<$Result.GetResult<Prisma.$AcMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AcMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AcMessageFindUniqueOrThrowArgs} args - Arguments to find a AcMessage
     * @example
     * // Get one AcMessage
     * const acMessage = await prisma.acMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AcMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, AcMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AcMessageClient<$Result.GetResult<Prisma.$AcMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AcMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcMessageFindFirstArgs} args - Arguments to find a AcMessage
     * @example
     * // Get one AcMessage
     * const acMessage = await prisma.acMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AcMessageFindFirstArgs>(args?: SelectSubset<T, AcMessageFindFirstArgs<ExtArgs>>): Prisma__AcMessageClient<$Result.GetResult<Prisma.$AcMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AcMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcMessageFindFirstOrThrowArgs} args - Arguments to find a AcMessage
     * @example
     * // Get one AcMessage
     * const acMessage = await prisma.acMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AcMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, AcMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__AcMessageClient<$Result.GetResult<Prisma.$AcMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AcMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AcMessages
     * const acMessages = await prisma.acMessage.findMany()
     * 
     * // Get first 10 AcMessages
     * const acMessages = await prisma.acMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const acMessageWithIdOnly = await prisma.acMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AcMessageFindManyArgs>(args?: SelectSubset<T, AcMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AcMessage.
     * @param {AcMessageCreateArgs} args - Arguments to create a AcMessage.
     * @example
     * // Create one AcMessage
     * const AcMessage = await prisma.acMessage.create({
     *   data: {
     *     // ... data to create a AcMessage
     *   }
     * })
     * 
     */
    create<T extends AcMessageCreateArgs>(args: SelectSubset<T, AcMessageCreateArgs<ExtArgs>>): Prisma__AcMessageClient<$Result.GetResult<Prisma.$AcMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AcMessages.
     * @param {AcMessageCreateManyArgs} args - Arguments to create many AcMessages.
     * @example
     * // Create many AcMessages
     * const acMessage = await prisma.acMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AcMessageCreateManyArgs>(args?: SelectSubset<T, AcMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AcMessage.
     * @param {AcMessageDeleteArgs} args - Arguments to delete one AcMessage.
     * @example
     * // Delete one AcMessage
     * const AcMessage = await prisma.acMessage.delete({
     *   where: {
     *     // ... filter to delete one AcMessage
     *   }
     * })
     * 
     */
    delete<T extends AcMessageDeleteArgs>(args: SelectSubset<T, AcMessageDeleteArgs<ExtArgs>>): Prisma__AcMessageClient<$Result.GetResult<Prisma.$AcMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AcMessage.
     * @param {AcMessageUpdateArgs} args - Arguments to update one AcMessage.
     * @example
     * // Update one AcMessage
     * const acMessage = await prisma.acMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AcMessageUpdateArgs>(args: SelectSubset<T, AcMessageUpdateArgs<ExtArgs>>): Prisma__AcMessageClient<$Result.GetResult<Prisma.$AcMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AcMessages.
     * @param {AcMessageDeleteManyArgs} args - Arguments to filter AcMessages to delete.
     * @example
     * // Delete a few AcMessages
     * const { count } = await prisma.acMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AcMessageDeleteManyArgs>(args?: SelectSubset<T, AcMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AcMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AcMessages
     * const acMessage = await prisma.acMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AcMessageUpdateManyArgs>(args: SelectSubset<T, AcMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AcMessage.
     * @param {AcMessageUpsertArgs} args - Arguments to update or create a AcMessage.
     * @example
     * // Update or create a AcMessage
     * const acMessage = await prisma.acMessage.upsert({
     *   create: {
     *     // ... data to create a AcMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AcMessage we want to update
     *   }
     * })
     */
    upsert<T extends AcMessageUpsertArgs>(args: SelectSubset<T, AcMessageUpsertArgs<ExtArgs>>): Prisma__AcMessageClient<$Result.GetResult<Prisma.$AcMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AcMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcMessageCountArgs} args - Arguments to filter AcMessages to count.
     * @example
     * // Count the number of AcMessages
     * const count = await prisma.acMessage.count({
     *   where: {
     *     // ... the filter for the AcMessages we want to count
     *   }
     * })
    **/
    count<T extends AcMessageCountArgs>(
      args?: Subset<T, AcMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AcMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AcMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AcMessageAggregateArgs>(args: Subset<T, AcMessageAggregateArgs>): Prisma.PrismaPromise<GetAcMessageAggregateType<T>>

    /**
     * Group by AcMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcMessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AcMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AcMessageGroupByArgs['orderBy'] }
        : { orderBy?: AcMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AcMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAcMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AcMessage model
   */
  readonly fields: AcMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AcMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AcMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conversation<T extends AcConversationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AcConversationDefaultArgs<ExtArgs>>): Prisma__AcConversationClient<$Result.GetResult<Prisma.$AcConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AcMessage model
   */
  interface AcMessageFieldRefs {
    readonly id: FieldRef<"AcMessage", 'String'>
    readonly tenantId: FieldRef<"AcMessage", 'String'>
    readonly conversationId: FieldRef<"AcMessage", 'String'>
    readonly at: FieldRef<"AcMessage", 'DateTime'>
    readonly from: FieldRef<"AcMessage", 'AcMessageFrom'>
    readonly text: FieldRef<"AcMessage", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AcMessage findUnique
   */
  export type AcMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcMessage
     */
    select?: AcMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcMessage
     */
    omit?: AcMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcMessageInclude<ExtArgs> | null
    /**
     * Filter, which AcMessage to fetch.
     */
    where: AcMessageWhereUniqueInput
  }

  /**
   * AcMessage findUniqueOrThrow
   */
  export type AcMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcMessage
     */
    select?: AcMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcMessage
     */
    omit?: AcMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcMessageInclude<ExtArgs> | null
    /**
     * Filter, which AcMessage to fetch.
     */
    where: AcMessageWhereUniqueInput
  }

  /**
   * AcMessage findFirst
   */
  export type AcMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcMessage
     */
    select?: AcMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcMessage
     */
    omit?: AcMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcMessageInclude<ExtArgs> | null
    /**
     * Filter, which AcMessage to fetch.
     */
    where?: AcMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcMessages to fetch.
     */
    orderBy?: AcMessageOrderByWithRelationInput | AcMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcMessages.
     */
    cursor?: AcMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcMessages.
     */
    distinct?: AcMessageScalarFieldEnum | AcMessageScalarFieldEnum[]
  }

  /**
   * AcMessage findFirstOrThrow
   */
  export type AcMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcMessage
     */
    select?: AcMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcMessage
     */
    omit?: AcMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcMessageInclude<ExtArgs> | null
    /**
     * Filter, which AcMessage to fetch.
     */
    where?: AcMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcMessages to fetch.
     */
    orderBy?: AcMessageOrderByWithRelationInput | AcMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcMessages.
     */
    cursor?: AcMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcMessages.
     */
    distinct?: AcMessageScalarFieldEnum | AcMessageScalarFieldEnum[]
  }

  /**
   * AcMessage findMany
   */
  export type AcMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcMessage
     */
    select?: AcMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcMessage
     */
    omit?: AcMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcMessageInclude<ExtArgs> | null
    /**
     * Filter, which AcMessages to fetch.
     */
    where?: AcMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcMessages to fetch.
     */
    orderBy?: AcMessageOrderByWithRelationInput | AcMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AcMessages.
     */
    cursor?: AcMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcMessages.
     */
    skip?: number
    distinct?: AcMessageScalarFieldEnum | AcMessageScalarFieldEnum[]
  }

  /**
   * AcMessage create
   */
  export type AcMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcMessage
     */
    select?: AcMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcMessage
     */
    omit?: AcMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcMessageInclude<ExtArgs> | null
    /**
     * The data needed to create a AcMessage.
     */
    data: XOR<AcMessageCreateInput, AcMessageUncheckedCreateInput>
  }

  /**
   * AcMessage createMany
   */
  export type AcMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AcMessages.
     */
    data: AcMessageCreateManyInput | AcMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AcMessage update
   */
  export type AcMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcMessage
     */
    select?: AcMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcMessage
     */
    omit?: AcMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcMessageInclude<ExtArgs> | null
    /**
     * The data needed to update a AcMessage.
     */
    data: XOR<AcMessageUpdateInput, AcMessageUncheckedUpdateInput>
    /**
     * Choose, which AcMessage to update.
     */
    where: AcMessageWhereUniqueInput
  }

  /**
   * AcMessage updateMany
   */
  export type AcMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AcMessages.
     */
    data: XOR<AcMessageUpdateManyMutationInput, AcMessageUncheckedUpdateManyInput>
    /**
     * Filter which AcMessages to update
     */
    where?: AcMessageWhereInput
    /**
     * Limit how many AcMessages to update.
     */
    limit?: number
  }

  /**
   * AcMessage upsert
   */
  export type AcMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcMessage
     */
    select?: AcMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcMessage
     */
    omit?: AcMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcMessageInclude<ExtArgs> | null
    /**
     * The filter to search for the AcMessage to update in case it exists.
     */
    where: AcMessageWhereUniqueInput
    /**
     * In case the AcMessage found by the `where` argument doesn't exist, create a new AcMessage with this data.
     */
    create: XOR<AcMessageCreateInput, AcMessageUncheckedCreateInput>
    /**
     * In case the AcMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AcMessageUpdateInput, AcMessageUncheckedUpdateInput>
  }

  /**
   * AcMessage delete
   */
  export type AcMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcMessage
     */
    select?: AcMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcMessage
     */
    omit?: AcMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcMessageInclude<ExtArgs> | null
    /**
     * Filter which AcMessage to delete.
     */
    where: AcMessageWhereUniqueInput
  }

  /**
   * AcMessage deleteMany
   */
  export type AcMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcMessages to delete
     */
    where?: AcMessageWhereInput
    /**
     * Limit how many AcMessages to delete.
     */
    limit?: number
  }

  /**
   * AcMessage without action
   */
  export type AcMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcMessage
     */
    select?: AcMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcMessage
     */
    omit?: AcMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcMessageInclude<ExtArgs> | null
  }


  /**
   * Model AcAppointment
   */

  export type AggregateAcAppointment = {
    _count: AcAppointmentCountAggregateOutputType | null
    _avg: AcAppointmentAvgAggregateOutputType | null
    _sum: AcAppointmentSumAggregateOutputType | null
    _min: AcAppointmentMinAggregateOutputType | null
    _max: AcAppointmentMaxAggregateOutputType | null
  }

  export type AcAppointmentAvgAggregateOutputType = {
    durationMin: number | null
  }

  export type AcAppointmentSumAggregateOutputType = {
    durationMin: number | null
  }

  export type AcAppointmentMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    leadId: string | null
    service: string | null
    startAt: Date | null
    durationMin: number | null
    status: $Enums.AcAppointmentStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AcAppointmentMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    leadId: string | null
    service: string | null
    startAt: Date | null
    durationMin: number | null
    status: $Enums.AcAppointmentStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AcAppointmentCountAggregateOutputType = {
    id: number
    tenantId: number
    leadId: number
    service: number
    startAt: number
    durationMin: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AcAppointmentAvgAggregateInputType = {
    durationMin?: true
  }

  export type AcAppointmentSumAggregateInputType = {
    durationMin?: true
  }

  export type AcAppointmentMinAggregateInputType = {
    id?: true
    tenantId?: true
    leadId?: true
    service?: true
    startAt?: true
    durationMin?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AcAppointmentMaxAggregateInputType = {
    id?: true
    tenantId?: true
    leadId?: true
    service?: true
    startAt?: true
    durationMin?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AcAppointmentCountAggregateInputType = {
    id?: true
    tenantId?: true
    leadId?: true
    service?: true
    startAt?: true
    durationMin?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AcAppointmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcAppointment to aggregate.
     */
    where?: AcAppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcAppointments to fetch.
     */
    orderBy?: AcAppointmentOrderByWithRelationInput | AcAppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AcAppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcAppointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcAppointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AcAppointments
    **/
    _count?: true | AcAppointmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AcAppointmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AcAppointmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AcAppointmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AcAppointmentMaxAggregateInputType
  }

  export type GetAcAppointmentAggregateType<T extends AcAppointmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAcAppointment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAcAppointment[P]>
      : GetScalarType<T[P], AggregateAcAppointment[P]>
  }




  export type AcAppointmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcAppointmentWhereInput
    orderBy?: AcAppointmentOrderByWithAggregationInput | AcAppointmentOrderByWithAggregationInput[]
    by: AcAppointmentScalarFieldEnum[] | AcAppointmentScalarFieldEnum
    having?: AcAppointmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AcAppointmentCountAggregateInputType | true
    _avg?: AcAppointmentAvgAggregateInputType
    _sum?: AcAppointmentSumAggregateInputType
    _min?: AcAppointmentMinAggregateInputType
    _max?: AcAppointmentMaxAggregateInputType
  }

  export type AcAppointmentGroupByOutputType = {
    id: string
    tenantId: string
    leadId: string
    service: string
    startAt: Date
    durationMin: number
    status: $Enums.AcAppointmentStatus
    createdAt: Date
    updatedAt: Date
    _count: AcAppointmentCountAggregateOutputType | null
    _avg: AcAppointmentAvgAggregateOutputType | null
    _sum: AcAppointmentSumAggregateOutputType | null
    _min: AcAppointmentMinAggregateOutputType | null
    _max: AcAppointmentMaxAggregateOutputType | null
  }

  type GetAcAppointmentGroupByPayload<T extends AcAppointmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AcAppointmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AcAppointmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AcAppointmentGroupByOutputType[P]>
            : GetScalarType<T[P], AcAppointmentGroupByOutputType[P]>
        }
      >
    >


  export type AcAppointmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    leadId?: boolean
    service?: boolean
    startAt?: boolean
    durationMin?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lead?: boolean | AcLeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["acAppointment"]>



  export type AcAppointmentSelectScalar = {
    id?: boolean
    tenantId?: boolean
    leadId?: boolean
    service?: boolean
    startAt?: boolean
    durationMin?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AcAppointmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "leadId" | "service" | "startAt" | "durationMin" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["acAppointment"]>
  export type AcAppointmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | AcLeadDefaultArgs<ExtArgs>
  }

  export type $AcAppointmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AcAppointment"
    objects: {
      lead: Prisma.$AcLeadPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      leadId: string
      service: string
      startAt: Date
      durationMin: number
      status: $Enums.AcAppointmentStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["acAppointment"]>
    composites: {}
  }

  type AcAppointmentGetPayload<S extends boolean | null | undefined | AcAppointmentDefaultArgs> = $Result.GetResult<Prisma.$AcAppointmentPayload, S>

  type AcAppointmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AcAppointmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AcAppointmentCountAggregateInputType | true
    }

  export interface AcAppointmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AcAppointment'], meta: { name: 'AcAppointment' } }
    /**
     * Find zero or one AcAppointment that matches the filter.
     * @param {AcAppointmentFindUniqueArgs} args - Arguments to find a AcAppointment
     * @example
     * // Get one AcAppointment
     * const acAppointment = await prisma.acAppointment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AcAppointmentFindUniqueArgs>(args: SelectSubset<T, AcAppointmentFindUniqueArgs<ExtArgs>>): Prisma__AcAppointmentClient<$Result.GetResult<Prisma.$AcAppointmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AcAppointment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AcAppointmentFindUniqueOrThrowArgs} args - Arguments to find a AcAppointment
     * @example
     * // Get one AcAppointment
     * const acAppointment = await prisma.acAppointment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AcAppointmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AcAppointmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AcAppointmentClient<$Result.GetResult<Prisma.$AcAppointmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AcAppointment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcAppointmentFindFirstArgs} args - Arguments to find a AcAppointment
     * @example
     * // Get one AcAppointment
     * const acAppointment = await prisma.acAppointment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AcAppointmentFindFirstArgs>(args?: SelectSubset<T, AcAppointmentFindFirstArgs<ExtArgs>>): Prisma__AcAppointmentClient<$Result.GetResult<Prisma.$AcAppointmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AcAppointment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcAppointmentFindFirstOrThrowArgs} args - Arguments to find a AcAppointment
     * @example
     * // Get one AcAppointment
     * const acAppointment = await prisma.acAppointment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AcAppointmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AcAppointmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AcAppointmentClient<$Result.GetResult<Prisma.$AcAppointmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AcAppointments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcAppointmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AcAppointments
     * const acAppointments = await prisma.acAppointment.findMany()
     * 
     * // Get first 10 AcAppointments
     * const acAppointments = await prisma.acAppointment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const acAppointmentWithIdOnly = await prisma.acAppointment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AcAppointmentFindManyArgs>(args?: SelectSubset<T, AcAppointmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcAppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AcAppointment.
     * @param {AcAppointmentCreateArgs} args - Arguments to create a AcAppointment.
     * @example
     * // Create one AcAppointment
     * const AcAppointment = await prisma.acAppointment.create({
     *   data: {
     *     // ... data to create a AcAppointment
     *   }
     * })
     * 
     */
    create<T extends AcAppointmentCreateArgs>(args: SelectSubset<T, AcAppointmentCreateArgs<ExtArgs>>): Prisma__AcAppointmentClient<$Result.GetResult<Prisma.$AcAppointmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AcAppointments.
     * @param {AcAppointmentCreateManyArgs} args - Arguments to create many AcAppointments.
     * @example
     * // Create many AcAppointments
     * const acAppointment = await prisma.acAppointment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AcAppointmentCreateManyArgs>(args?: SelectSubset<T, AcAppointmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AcAppointment.
     * @param {AcAppointmentDeleteArgs} args - Arguments to delete one AcAppointment.
     * @example
     * // Delete one AcAppointment
     * const AcAppointment = await prisma.acAppointment.delete({
     *   where: {
     *     // ... filter to delete one AcAppointment
     *   }
     * })
     * 
     */
    delete<T extends AcAppointmentDeleteArgs>(args: SelectSubset<T, AcAppointmentDeleteArgs<ExtArgs>>): Prisma__AcAppointmentClient<$Result.GetResult<Prisma.$AcAppointmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AcAppointment.
     * @param {AcAppointmentUpdateArgs} args - Arguments to update one AcAppointment.
     * @example
     * // Update one AcAppointment
     * const acAppointment = await prisma.acAppointment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AcAppointmentUpdateArgs>(args: SelectSubset<T, AcAppointmentUpdateArgs<ExtArgs>>): Prisma__AcAppointmentClient<$Result.GetResult<Prisma.$AcAppointmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AcAppointments.
     * @param {AcAppointmentDeleteManyArgs} args - Arguments to filter AcAppointments to delete.
     * @example
     * // Delete a few AcAppointments
     * const { count } = await prisma.acAppointment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AcAppointmentDeleteManyArgs>(args?: SelectSubset<T, AcAppointmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AcAppointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcAppointmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AcAppointments
     * const acAppointment = await prisma.acAppointment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AcAppointmentUpdateManyArgs>(args: SelectSubset<T, AcAppointmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AcAppointment.
     * @param {AcAppointmentUpsertArgs} args - Arguments to update or create a AcAppointment.
     * @example
     * // Update or create a AcAppointment
     * const acAppointment = await prisma.acAppointment.upsert({
     *   create: {
     *     // ... data to create a AcAppointment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AcAppointment we want to update
     *   }
     * })
     */
    upsert<T extends AcAppointmentUpsertArgs>(args: SelectSubset<T, AcAppointmentUpsertArgs<ExtArgs>>): Prisma__AcAppointmentClient<$Result.GetResult<Prisma.$AcAppointmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AcAppointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcAppointmentCountArgs} args - Arguments to filter AcAppointments to count.
     * @example
     * // Count the number of AcAppointments
     * const count = await prisma.acAppointment.count({
     *   where: {
     *     // ... the filter for the AcAppointments we want to count
     *   }
     * })
    **/
    count<T extends AcAppointmentCountArgs>(
      args?: Subset<T, AcAppointmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AcAppointmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AcAppointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcAppointmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AcAppointmentAggregateArgs>(args: Subset<T, AcAppointmentAggregateArgs>): Prisma.PrismaPromise<GetAcAppointmentAggregateType<T>>

    /**
     * Group by AcAppointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcAppointmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AcAppointmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AcAppointmentGroupByArgs['orderBy'] }
        : { orderBy?: AcAppointmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AcAppointmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAcAppointmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AcAppointment model
   */
  readonly fields: AcAppointmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AcAppointment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AcAppointmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lead<T extends AcLeadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AcLeadDefaultArgs<ExtArgs>>): Prisma__AcLeadClient<$Result.GetResult<Prisma.$AcLeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AcAppointment model
   */
  interface AcAppointmentFieldRefs {
    readonly id: FieldRef<"AcAppointment", 'String'>
    readonly tenantId: FieldRef<"AcAppointment", 'String'>
    readonly leadId: FieldRef<"AcAppointment", 'String'>
    readonly service: FieldRef<"AcAppointment", 'String'>
    readonly startAt: FieldRef<"AcAppointment", 'DateTime'>
    readonly durationMin: FieldRef<"AcAppointment", 'Int'>
    readonly status: FieldRef<"AcAppointment", 'AcAppointmentStatus'>
    readonly createdAt: FieldRef<"AcAppointment", 'DateTime'>
    readonly updatedAt: FieldRef<"AcAppointment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AcAppointment findUnique
   */
  export type AcAppointmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcAppointment
     */
    select?: AcAppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcAppointment
     */
    omit?: AcAppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcAppointmentInclude<ExtArgs> | null
    /**
     * Filter, which AcAppointment to fetch.
     */
    where: AcAppointmentWhereUniqueInput
  }

  /**
   * AcAppointment findUniqueOrThrow
   */
  export type AcAppointmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcAppointment
     */
    select?: AcAppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcAppointment
     */
    omit?: AcAppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcAppointmentInclude<ExtArgs> | null
    /**
     * Filter, which AcAppointment to fetch.
     */
    where: AcAppointmentWhereUniqueInput
  }

  /**
   * AcAppointment findFirst
   */
  export type AcAppointmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcAppointment
     */
    select?: AcAppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcAppointment
     */
    omit?: AcAppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcAppointmentInclude<ExtArgs> | null
    /**
     * Filter, which AcAppointment to fetch.
     */
    where?: AcAppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcAppointments to fetch.
     */
    orderBy?: AcAppointmentOrderByWithRelationInput | AcAppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcAppointments.
     */
    cursor?: AcAppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcAppointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcAppointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcAppointments.
     */
    distinct?: AcAppointmentScalarFieldEnum | AcAppointmentScalarFieldEnum[]
  }

  /**
   * AcAppointment findFirstOrThrow
   */
  export type AcAppointmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcAppointment
     */
    select?: AcAppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcAppointment
     */
    omit?: AcAppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcAppointmentInclude<ExtArgs> | null
    /**
     * Filter, which AcAppointment to fetch.
     */
    where?: AcAppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcAppointments to fetch.
     */
    orderBy?: AcAppointmentOrderByWithRelationInput | AcAppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcAppointments.
     */
    cursor?: AcAppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcAppointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcAppointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcAppointments.
     */
    distinct?: AcAppointmentScalarFieldEnum | AcAppointmentScalarFieldEnum[]
  }

  /**
   * AcAppointment findMany
   */
  export type AcAppointmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcAppointment
     */
    select?: AcAppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcAppointment
     */
    omit?: AcAppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcAppointmentInclude<ExtArgs> | null
    /**
     * Filter, which AcAppointments to fetch.
     */
    where?: AcAppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcAppointments to fetch.
     */
    orderBy?: AcAppointmentOrderByWithRelationInput | AcAppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AcAppointments.
     */
    cursor?: AcAppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcAppointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcAppointments.
     */
    skip?: number
    distinct?: AcAppointmentScalarFieldEnum | AcAppointmentScalarFieldEnum[]
  }

  /**
   * AcAppointment create
   */
  export type AcAppointmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcAppointment
     */
    select?: AcAppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcAppointment
     */
    omit?: AcAppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcAppointmentInclude<ExtArgs> | null
    /**
     * The data needed to create a AcAppointment.
     */
    data: XOR<AcAppointmentCreateInput, AcAppointmentUncheckedCreateInput>
  }

  /**
   * AcAppointment createMany
   */
  export type AcAppointmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AcAppointments.
     */
    data: AcAppointmentCreateManyInput | AcAppointmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AcAppointment update
   */
  export type AcAppointmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcAppointment
     */
    select?: AcAppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcAppointment
     */
    omit?: AcAppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcAppointmentInclude<ExtArgs> | null
    /**
     * The data needed to update a AcAppointment.
     */
    data: XOR<AcAppointmentUpdateInput, AcAppointmentUncheckedUpdateInput>
    /**
     * Choose, which AcAppointment to update.
     */
    where: AcAppointmentWhereUniqueInput
  }

  /**
   * AcAppointment updateMany
   */
  export type AcAppointmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AcAppointments.
     */
    data: XOR<AcAppointmentUpdateManyMutationInput, AcAppointmentUncheckedUpdateManyInput>
    /**
     * Filter which AcAppointments to update
     */
    where?: AcAppointmentWhereInput
    /**
     * Limit how many AcAppointments to update.
     */
    limit?: number
  }

  /**
   * AcAppointment upsert
   */
  export type AcAppointmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcAppointment
     */
    select?: AcAppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcAppointment
     */
    omit?: AcAppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcAppointmentInclude<ExtArgs> | null
    /**
     * The filter to search for the AcAppointment to update in case it exists.
     */
    where: AcAppointmentWhereUniqueInput
    /**
     * In case the AcAppointment found by the `where` argument doesn't exist, create a new AcAppointment with this data.
     */
    create: XOR<AcAppointmentCreateInput, AcAppointmentUncheckedCreateInput>
    /**
     * In case the AcAppointment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AcAppointmentUpdateInput, AcAppointmentUncheckedUpdateInput>
  }

  /**
   * AcAppointment delete
   */
  export type AcAppointmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcAppointment
     */
    select?: AcAppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcAppointment
     */
    omit?: AcAppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcAppointmentInclude<ExtArgs> | null
    /**
     * Filter which AcAppointment to delete.
     */
    where: AcAppointmentWhereUniqueInput
  }

  /**
   * AcAppointment deleteMany
   */
  export type AcAppointmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcAppointments to delete
     */
    where?: AcAppointmentWhereInput
    /**
     * Limit how many AcAppointments to delete.
     */
    limit?: number
  }

  /**
   * AcAppointment without action
   */
  export type AcAppointmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcAppointment
     */
    select?: AcAppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcAppointment
     */
    omit?: AcAppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcAppointmentInclude<ExtArgs> | null
  }


  /**
   * Model AcSettings
   */

  export type AggregateAcSettings = {
    _count: AcSettingsCountAggregateOutputType | null
    _min: AcSettingsMinAggregateOutputType | null
    _max: AcSettingsMaxAggregateOutputType | null
  }

  export type AcSettingsMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    businessName: string | null
    timezone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AcSettingsMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    businessName: string | null
    timezone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AcSettingsCountAggregateOutputType = {
    id: number
    tenantId: number
    businessName: number
    timezone: number
    hoursJson: number
    servicesJson: number
    faqsJson: number
    qualQsJson: number
    bookingJson: number
    followupsJson: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AcSettingsMinAggregateInputType = {
    id?: true
    tenantId?: true
    businessName?: true
    timezone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AcSettingsMaxAggregateInputType = {
    id?: true
    tenantId?: true
    businessName?: true
    timezone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AcSettingsCountAggregateInputType = {
    id?: true
    tenantId?: true
    businessName?: true
    timezone?: true
    hoursJson?: true
    servicesJson?: true
    faqsJson?: true
    qualQsJson?: true
    bookingJson?: true
    followupsJson?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AcSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcSettings to aggregate.
     */
    where?: AcSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcSettings to fetch.
     */
    orderBy?: AcSettingsOrderByWithRelationInput | AcSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AcSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AcSettings
    **/
    _count?: true | AcSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AcSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AcSettingsMaxAggregateInputType
  }

  export type GetAcSettingsAggregateType<T extends AcSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateAcSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAcSettings[P]>
      : GetScalarType<T[P], AggregateAcSettings[P]>
  }




  export type AcSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcSettingsWhereInput
    orderBy?: AcSettingsOrderByWithAggregationInput | AcSettingsOrderByWithAggregationInput[]
    by: AcSettingsScalarFieldEnum[] | AcSettingsScalarFieldEnum
    having?: AcSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AcSettingsCountAggregateInputType | true
    _min?: AcSettingsMinAggregateInputType
    _max?: AcSettingsMaxAggregateInputType
  }

  export type AcSettingsGroupByOutputType = {
    id: string
    tenantId: string
    businessName: string
    timezone: string
    hoursJson: JsonValue | null
    servicesJson: JsonValue | null
    faqsJson: JsonValue | null
    qualQsJson: JsonValue | null
    bookingJson: JsonValue | null
    followupsJson: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: AcSettingsCountAggregateOutputType | null
    _min: AcSettingsMinAggregateOutputType | null
    _max: AcSettingsMaxAggregateOutputType | null
  }

  type GetAcSettingsGroupByPayload<T extends AcSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AcSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AcSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AcSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], AcSettingsGroupByOutputType[P]>
        }
      >
    >


  export type AcSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    businessName?: boolean
    timezone?: boolean
    hoursJson?: boolean
    servicesJson?: boolean
    faqsJson?: boolean
    qualQsJson?: boolean
    bookingJson?: boolean
    followupsJson?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    followupSteps?: boolean | AcSettings$followupStepsArgs<ExtArgs>
    _count?: boolean | AcSettingsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["acSettings"]>



  export type AcSettingsSelectScalar = {
    id?: boolean
    tenantId?: boolean
    businessName?: boolean
    timezone?: boolean
    hoursJson?: boolean
    servicesJson?: boolean
    faqsJson?: boolean
    qualQsJson?: boolean
    bookingJson?: boolean
    followupsJson?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AcSettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "businessName" | "timezone" | "hoursJson" | "servicesJson" | "faqsJson" | "qualQsJson" | "bookingJson" | "followupsJson" | "createdAt" | "updatedAt", ExtArgs["result"]["acSettings"]>
  export type AcSettingsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    followupSteps?: boolean | AcSettings$followupStepsArgs<ExtArgs>
    _count?: boolean | AcSettingsCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $AcSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AcSettings"
    objects: {
      followupSteps: Prisma.$AcFollowupStepPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      businessName: string
      timezone: string
      hoursJson: Prisma.JsonValue | null
      servicesJson: Prisma.JsonValue | null
      faqsJson: Prisma.JsonValue | null
      qualQsJson: Prisma.JsonValue | null
      bookingJson: Prisma.JsonValue | null
      followupsJson: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["acSettings"]>
    composites: {}
  }

  type AcSettingsGetPayload<S extends boolean | null | undefined | AcSettingsDefaultArgs> = $Result.GetResult<Prisma.$AcSettingsPayload, S>

  type AcSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AcSettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AcSettingsCountAggregateInputType | true
    }

  export interface AcSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AcSettings'], meta: { name: 'AcSettings' } }
    /**
     * Find zero or one AcSettings that matches the filter.
     * @param {AcSettingsFindUniqueArgs} args - Arguments to find a AcSettings
     * @example
     * // Get one AcSettings
     * const acSettings = await prisma.acSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AcSettingsFindUniqueArgs>(args: SelectSubset<T, AcSettingsFindUniqueArgs<ExtArgs>>): Prisma__AcSettingsClient<$Result.GetResult<Prisma.$AcSettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AcSettings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AcSettingsFindUniqueOrThrowArgs} args - Arguments to find a AcSettings
     * @example
     * // Get one AcSettings
     * const acSettings = await prisma.acSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AcSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, AcSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AcSettingsClient<$Result.GetResult<Prisma.$AcSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AcSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcSettingsFindFirstArgs} args - Arguments to find a AcSettings
     * @example
     * // Get one AcSettings
     * const acSettings = await prisma.acSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AcSettingsFindFirstArgs>(args?: SelectSubset<T, AcSettingsFindFirstArgs<ExtArgs>>): Prisma__AcSettingsClient<$Result.GetResult<Prisma.$AcSettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AcSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcSettingsFindFirstOrThrowArgs} args - Arguments to find a AcSettings
     * @example
     * // Get one AcSettings
     * const acSettings = await prisma.acSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AcSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, AcSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__AcSettingsClient<$Result.GetResult<Prisma.$AcSettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AcSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AcSettings
     * const acSettings = await prisma.acSettings.findMany()
     * 
     * // Get first 10 AcSettings
     * const acSettings = await prisma.acSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const acSettingsWithIdOnly = await prisma.acSettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AcSettingsFindManyArgs>(args?: SelectSubset<T, AcSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcSettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AcSettings.
     * @param {AcSettingsCreateArgs} args - Arguments to create a AcSettings.
     * @example
     * // Create one AcSettings
     * const AcSettings = await prisma.acSettings.create({
     *   data: {
     *     // ... data to create a AcSettings
     *   }
     * })
     * 
     */
    create<T extends AcSettingsCreateArgs>(args: SelectSubset<T, AcSettingsCreateArgs<ExtArgs>>): Prisma__AcSettingsClient<$Result.GetResult<Prisma.$AcSettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AcSettings.
     * @param {AcSettingsCreateManyArgs} args - Arguments to create many AcSettings.
     * @example
     * // Create many AcSettings
     * const acSettings = await prisma.acSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AcSettingsCreateManyArgs>(args?: SelectSubset<T, AcSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AcSettings.
     * @param {AcSettingsDeleteArgs} args - Arguments to delete one AcSettings.
     * @example
     * // Delete one AcSettings
     * const AcSettings = await prisma.acSettings.delete({
     *   where: {
     *     // ... filter to delete one AcSettings
     *   }
     * })
     * 
     */
    delete<T extends AcSettingsDeleteArgs>(args: SelectSubset<T, AcSettingsDeleteArgs<ExtArgs>>): Prisma__AcSettingsClient<$Result.GetResult<Prisma.$AcSettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AcSettings.
     * @param {AcSettingsUpdateArgs} args - Arguments to update one AcSettings.
     * @example
     * // Update one AcSettings
     * const acSettings = await prisma.acSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AcSettingsUpdateArgs>(args: SelectSubset<T, AcSettingsUpdateArgs<ExtArgs>>): Prisma__AcSettingsClient<$Result.GetResult<Prisma.$AcSettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AcSettings.
     * @param {AcSettingsDeleteManyArgs} args - Arguments to filter AcSettings to delete.
     * @example
     * // Delete a few AcSettings
     * const { count } = await prisma.acSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AcSettingsDeleteManyArgs>(args?: SelectSubset<T, AcSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AcSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AcSettings
     * const acSettings = await prisma.acSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AcSettingsUpdateManyArgs>(args: SelectSubset<T, AcSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AcSettings.
     * @param {AcSettingsUpsertArgs} args - Arguments to update or create a AcSettings.
     * @example
     * // Update or create a AcSettings
     * const acSettings = await prisma.acSettings.upsert({
     *   create: {
     *     // ... data to create a AcSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AcSettings we want to update
     *   }
     * })
     */
    upsert<T extends AcSettingsUpsertArgs>(args: SelectSubset<T, AcSettingsUpsertArgs<ExtArgs>>): Prisma__AcSettingsClient<$Result.GetResult<Prisma.$AcSettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AcSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcSettingsCountArgs} args - Arguments to filter AcSettings to count.
     * @example
     * // Count the number of AcSettings
     * const count = await prisma.acSettings.count({
     *   where: {
     *     // ... the filter for the AcSettings we want to count
     *   }
     * })
    **/
    count<T extends AcSettingsCountArgs>(
      args?: Subset<T, AcSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AcSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AcSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AcSettingsAggregateArgs>(args: Subset<T, AcSettingsAggregateArgs>): Prisma.PrismaPromise<GetAcSettingsAggregateType<T>>

    /**
     * Group by AcSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcSettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AcSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AcSettingsGroupByArgs['orderBy'] }
        : { orderBy?: AcSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AcSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAcSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AcSettings model
   */
  readonly fields: AcSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AcSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AcSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    followupSteps<T extends AcSettings$followupStepsArgs<ExtArgs> = {}>(args?: Subset<T, AcSettings$followupStepsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcFollowupStepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AcSettings model
   */
  interface AcSettingsFieldRefs {
    readonly id: FieldRef<"AcSettings", 'String'>
    readonly tenantId: FieldRef<"AcSettings", 'String'>
    readonly businessName: FieldRef<"AcSettings", 'String'>
    readonly timezone: FieldRef<"AcSettings", 'String'>
    readonly hoursJson: FieldRef<"AcSettings", 'Json'>
    readonly servicesJson: FieldRef<"AcSettings", 'Json'>
    readonly faqsJson: FieldRef<"AcSettings", 'Json'>
    readonly qualQsJson: FieldRef<"AcSettings", 'Json'>
    readonly bookingJson: FieldRef<"AcSettings", 'Json'>
    readonly followupsJson: FieldRef<"AcSettings", 'Json'>
    readonly createdAt: FieldRef<"AcSettings", 'DateTime'>
    readonly updatedAt: FieldRef<"AcSettings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AcSettings findUnique
   */
  export type AcSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcSettings
     */
    select?: AcSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcSettings
     */
    omit?: AcSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcSettingsInclude<ExtArgs> | null
    /**
     * Filter, which AcSettings to fetch.
     */
    where: AcSettingsWhereUniqueInput
  }

  /**
   * AcSettings findUniqueOrThrow
   */
  export type AcSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcSettings
     */
    select?: AcSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcSettings
     */
    omit?: AcSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcSettingsInclude<ExtArgs> | null
    /**
     * Filter, which AcSettings to fetch.
     */
    where: AcSettingsWhereUniqueInput
  }

  /**
   * AcSettings findFirst
   */
  export type AcSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcSettings
     */
    select?: AcSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcSettings
     */
    omit?: AcSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcSettingsInclude<ExtArgs> | null
    /**
     * Filter, which AcSettings to fetch.
     */
    where?: AcSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcSettings to fetch.
     */
    orderBy?: AcSettingsOrderByWithRelationInput | AcSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcSettings.
     */
    cursor?: AcSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcSettings.
     */
    distinct?: AcSettingsScalarFieldEnum | AcSettingsScalarFieldEnum[]
  }

  /**
   * AcSettings findFirstOrThrow
   */
  export type AcSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcSettings
     */
    select?: AcSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcSettings
     */
    omit?: AcSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcSettingsInclude<ExtArgs> | null
    /**
     * Filter, which AcSettings to fetch.
     */
    where?: AcSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcSettings to fetch.
     */
    orderBy?: AcSettingsOrderByWithRelationInput | AcSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcSettings.
     */
    cursor?: AcSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcSettings.
     */
    distinct?: AcSettingsScalarFieldEnum | AcSettingsScalarFieldEnum[]
  }

  /**
   * AcSettings findMany
   */
  export type AcSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcSettings
     */
    select?: AcSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcSettings
     */
    omit?: AcSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcSettingsInclude<ExtArgs> | null
    /**
     * Filter, which AcSettings to fetch.
     */
    where?: AcSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcSettings to fetch.
     */
    orderBy?: AcSettingsOrderByWithRelationInput | AcSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AcSettings.
     */
    cursor?: AcSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcSettings.
     */
    skip?: number
    distinct?: AcSettingsScalarFieldEnum | AcSettingsScalarFieldEnum[]
  }

  /**
   * AcSettings create
   */
  export type AcSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcSettings
     */
    select?: AcSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcSettings
     */
    omit?: AcSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcSettingsInclude<ExtArgs> | null
    /**
     * The data needed to create a AcSettings.
     */
    data: XOR<AcSettingsCreateInput, AcSettingsUncheckedCreateInput>
  }

  /**
   * AcSettings createMany
   */
  export type AcSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AcSettings.
     */
    data: AcSettingsCreateManyInput | AcSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AcSettings update
   */
  export type AcSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcSettings
     */
    select?: AcSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcSettings
     */
    omit?: AcSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcSettingsInclude<ExtArgs> | null
    /**
     * The data needed to update a AcSettings.
     */
    data: XOR<AcSettingsUpdateInput, AcSettingsUncheckedUpdateInput>
    /**
     * Choose, which AcSettings to update.
     */
    where: AcSettingsWhereUniqueInput
  }

  /**
   * AcSettings updateMany
   */
  export type AcSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AcSettings.
     */
    data: XOR<AcSettingsUpdateManyMutationInput, AcSettingsUncheckedUpdateManyInput>
    /**
     * Filter which AcSettings to update
     */
    where?: AcSettingsWhereInput
    /**
     * Limit how many AcSettings to update.
     */
    limit?: number
  }

  /**
   * AcSettings upsert
   */
  export type AcSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcSettings
     */
    select?: AcSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcSettings
     */
    omit?: AcSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcSettingsInclude<ExtArgs> | null
    /**
     * The filter to search for the AcSettings to update in case it exists.
     */
    where: AcSettingsWhereUniqueInput
    /**
     * In case the AcSettings found by the `where` argument doesn't exist, create a new AcSettings with this data.
     */
    create: XOR<AcSettingsCreateInput, AcSettingsUncheckedCreateInput>
    /**
     * In case the AcSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AcSettingsUpdateInput, AcSettingsUncheckedUpdateInput>
  }

  /**
   * AcSettings delete
   */
  export type AcSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcSettings
     */
    select?: AcSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcSettings
     */
    omit?: AcSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcSettingsInclude<ExtArgs> | null
    /**
     * Filter which AcSettings to delete.
     */
    where: AcSettingsWhereUniqueInput
  }

  /**
   * AcSettings deleteMany
   */
  export type AcSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcSettings to delete
     */
    where?: AcSettingsWhereInput
    /**
     * Limit how many AcSettings to delete.
     */
    limit?: number
  }

  /**
   * AcSettings.followupSteps
   */
  export type AcSettings$followupStepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcFollowupStep
     */
    select?: AcFollowupStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcFollowupStep
     */
    omit?: AcFollowupStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcFollowupStepInclude<ExtArgs> | null
    where?: AcFollowupStepWhereInput
    orderBy?: AcFollowupStepOrderByWithRelationInput | AcFollowupStepOrderByWithRelationInput[]
    cursor?: AcFollowupStepWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AcFollowupStepScalarFieldEnum | AcFollowupStepScalarFieldEnum[]
  }

  /**
   * AcSettings without action
   */
  export type AcSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcSettings
     */
    select?: AcSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcSettings
     */
    omit?: AcSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcSettingsInclude<ExtArgs> | null
  }


  /**
   * Model AcFollowupStep
   */

  export type AggregateAcFollowupStep = {
    _count: AcFollowupStepCountAggregateOutputType | null
    _avg: AcFollowupStepAvgAggregateOutputType | null
    _sum: AcFollowupStepSumAggregateOutputType | null
    _min: AcFollowupStepMinAggregateOutputType | null
    _max: AcFollowupStepMaxAggregateOutputType | null
  }

  export type AcFollowupStepAvgAggregateOutputType = {
    afterHours: number | null
    sortOrder: number | null
  }

  export type AcFollowupStepSumAggregateOutputType = {
    afterHours: number | null
    sortOrder: number | null
  }

  export type AcFollowupStepMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    settingsId: string | null
    stepKey: string | null
    afterHours: number | null
    message: string | null
    enabled: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AcFollowupStepMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    settingsId: string | null
    stepKey: string | null
    afterHours: number | null
    message: string | null
    enabled: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AcFollowupStepCountAggregateOutputType = {
    id: number
    tenantId: number
    settingsId: number
    stepKey: number
    afterHours: number
    message: number
    enabled: number
    sortOrder: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AcFollowupStepAvgAggregateInputType = {
    afterHours?: true
    sortOrder?: true
  }

  export type AcFollowupStepSumAggregateInputType = {
    afterHours?: true
    sortOrder?: true
  }

  export type AcFollowupStepMinAggregateInputType = {
    id?: true
    tenantId?: true
    settingsId?: true
    stepKey?: true
    afterHours?: true
    message?: true
    enabled?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AcFollowupStepMaxAggregateInputType = {
    id?: true
    tenantId?: true
    settingsId?: true
    stepKey?: true
    afterHours?: true
    message?: true
    enabled?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AcFollowupStepCountAggregateInputType = {
    id?: true
    tenantId?: true
    settingsId?: true
    stepKey?: true
    afterHours?: true
    message?: true
    enabled?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AcFollowupStepAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcFollowupStep to aggregate.
     */
    where?: AcFollowupStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcFollowupSteps to fetch.
     */
    orderBy?: AcFollowupStepOrderByWithRelationInput | AcFollowupStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AcFollowupStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcFollowupSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcFollowupSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AcFollowupSteps
    **/
    _count?: true | AcFollowupStepCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AcFollowupStepAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AcFollowupStepSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AcFollowupStepMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AcFollowupStepMaxAggregateInputType
  }

  export type GetAcFollowupStepAggregateType<T extends AcFollowupStepAggregateArgs> = {
        [P in keyof T & keyof AggregateAcFollowupStep]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAcFollowupStep[P]>
      : GetScalarType<T[P], AggregateAcFollowupStep[P]>
  }




  export type AcFollowupStepGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcFollowupStepWhereInput
    orderBy?: AcFollowupStepOrderByWithAggregationInput | AcFollowupStepOrderByWithAggregationInput[]
    by: AcFollowupStepScalarFieldEnum[] | AcFollowupStepScalarFieldEnum
    having?: AcFollowupStepScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AcFollowupStepCountAggregateInputType | true
    _avg?: AcFollowupStepAvgAggregateInputType
    _sum?: AcFollowupStepSumAggregateInputType
    _min?: AcFollowupStepMinAggregateInputType
    _max?: AcFollowupStepMaxAggregateInputType
  }

  export type AcFollowupStepGroupByOutputType = {
    id: string
    tenantId: string
    settingsId: string
    stepKey: string
    afterHours: number
    message: string
    enabled: boolean
    sortOrder: number
    createdAt: Date
    updatedAt: Date
    _count: AcFollowupStepCountAggregateOutputType | null
    _avg: AcFollowupStepAvgAggregateOutputType | null
    _sum: AcFollowupStepSumAggregateOutputType | null
    _min: AcFollowupStepMinAggregateOutputType | null
    _max: AcFollowupStepMaxAggregateOutputType | null
  }

  type GetAcFollowupStepGroupByPayload<T extends AcFollowupStepGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AcFollowupStepGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AcFollowupStepGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AcFollowupStepGroupByOutputType[P]>
            : GetScalarType<T[P], AcFollowupStepGroupByOutputType[P]>
        }
      >
    >


  export type AcFollowupStepSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    settingsId?: boolean
    stepKey?: boolean
    afterHours?: boolean
    message?: boolean
    enabled?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    settings?: boolean | AcSettingsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["acFollowupStep"]>



  export type AcFollowupStepSelectScalar = {
    id?: boolean
    tenantId?: boolean
    settingsId?: boolean
    stepKey?: boolean
    afterHours?: boolean
    message?: boolean
    enabled?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AcFollowupStepOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "settingsId" | "stepKey" | "afterHours" | "message" | "enabled" | "sortOrder" | "createdAt" | "updatedAt", ExtArgs["result"]["acFollowupStep"]>
  export type AcFollowupStepInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    settings?: boolean | AcSettingsDefaultArgs<ExtArgs>
  }

  export type $AcFollowupStepPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AcFollowupStep"
    objects: {
      settings: Prisma.$AcSettingsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      settingsId: string
      stepKey: string
      afterHours: number
      message: string
      enabled: boolean
      sortOrder: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["acFollowupStep"]>
    composites: {}
  }

  type AcFollowupStepGetPayload<S extends boolean | null | undefined | AcFollowupStepDefaultArgs> = $Result.GetResult<Prisma.$AcFollowupStepPayload, S>

  type AcFollowupStepCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AcFollowupStepFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AcFollowupStepCountAggregateInputType | true
    }

  export interface AcFollowupStepDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AcFollowupStep'], meta: { name: 'AcFollowupStep' } }
    /**
     * Find zero or one AcFollowupStep that matches the filter.
     * @param {AcFollowupStepFindUniqueArgs} args - Arguments to find a AcFollowupStep
     * @example
     * // Get one AcFollowupStep
     * const acFollowupStep = await prisma.acFollowupStep.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AcFollowupStepFindUniqueArgs>(args: SelectSubset<T, AcFollowupStepFindUniqueArgs<ExtArgs>>): Prisma__AcFollowupStepClient<$Result.GetResult<Prisma.$AcFollowupStepPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AcFollowupStep that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AcFollowupStepFindUniqueOrThrowArgs} args - Arguments to find a AcFollowupStep
     * @example
     * // Get one AcFollowupStep
     * const acFollowupStep = await prisma.acFollowupStep.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AcFollowupStepFindUniqueOrThrowArgs>(args: SelectSubset<T, AcFollowupStepFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AcFollowupStepClient<$Result.GetResult<Prisma.$AcFollowupStepPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AcFollowupStep that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcFollowupStepFindFirstArgs} args - Arguments to find a AcFollowupStep
     * @example
     * // Get one AcFollowupStep
     * const acFollowupStep = await prisma.acFollowupStep.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AcFollowupStepFindFirstArgs>(args?: SelectSubset<T, AcFollowupStepFindFirstArgs<ExtArgs>>): Prisma__AcFollowupStepClient<$Result.GetResult<Prisma.$AcFollowupStepPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AcFollowupStep that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcFollowupStepFindFirstOrThrowArgs} args - Arguments to find a AcFollowupStep
     * @example
     * // Get one AcFollowupStep
     * const acFollowupStep = await prisma.acFollowupStep.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AcFollowupStepFindFirstOrThrowArgs>(args?: SelectSubset<T, AcFollowupStepFindFirstOrThrowArgs<ExtArgs>>): Prisma__AcFollowupStepClient<$Result.GetResult<Prisma.$AcFollowupStepPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AcFollowupSteps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcFollowupStepFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AcFollowupSteps
     * const acFollowupSteps = await prisma.acFollowupStep.findMany()
     * 
     * // Get first 10 AcFollowupSteps
     * const acFollowupSteps = await prisma.acFollowupStep.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const acFollowupStepWithIdOnly = await prisma.acFollowupStep.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AcFollowupStepFindManyArgs>(args?: SelectSubset<T, AcFollowupStepFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcFollowupStepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AcFollowupStep.
     * @param {AcFollowupStepCreateArgs} args - Arguments to create a AcFollowupStep.
     * @example
     * // Create one AcFollowupStep
     * const AcFollowupStep = await prisma.acFollowupStep.create({
     *   data: {
     *     // ... data to create a AcFollowupStep
     *   }
     * })
     * 
     */
    create<T extends AcFollowupStepCreateArgs>(args: SelectSubset<T, AcFollowupStepCreateArgs<ExtArgs>>): Prisma__AcFollowupStepClient<$Result.GetResult<Prisma.$AcFollowupStepPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AcFollowupSteps.
     * @param {AcFollowupStepCreateManyArgs} args - Arguments to create many AcFollowupSteps.
     * @example
     * // Create many AcFollowupSteps
     * const acFollowupStep = await prisma.acFollowupStep.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AcFollowupStepCreateManyArgs>(args?: SelectSubset<T, AcFollowupStepCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AcFollowupStep.
     * @param {AcFollowupStepDeleteArgs} args - Arguments to delete one AcFollowupStep.
     * @example
     * // Delete one AcFollowupStep
     * const AcFollowupStep = await prisma.acFollowupStep.delete({
     *   where: {
     *     // ... filter to delete one AcFollowupStep
     *   }
     * })
     * 
     */
    delete<T extends AcFollowupStepDeleteArgs>(args: SelectSubset<T, AcFollowupStepDeleteArgs<ExtArgs>>): Prisma__AcFollowupStepClient<$Result.GetResult<Prisma.$AcFollowupStepPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AcFollowupStep.
     * @param {AcFollowupStepUpdateArgs} args - Arguments to update one AcFollowupStep.
     * @example
     * // Update one AcFollowupStep
     * const acFollowupStep = await prisma.acFollowupStep.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AcFollowupStepUpdateArgs>(args: SelectSubset<T, AcFollowupStepUpdateArgs<ExtArgs>>): Prisma__AcFollowupStepClient<$Result.GetResult<Prisma.$AcFollowupStepPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AcFollowupSteps.
     * @param {AcFollowupStepDeleteManyArgs} args - Arguments to filter AcFollowupSteps to delete.
     * @example
     * // Delete a few AcFollowupSteps
     * const { count } = await prisma.acFollowupStep.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AcFollowupStepDeleteManyArgs>(args?: SelectSubset<T, AcFollowupStepDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AcFollowupSteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcFollowupStepUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AcFollowupSteps
     * const acFollowupStep = await prisma.acFollowupStep.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AcFollowupStepUpdateManyArgs>(args: SelectSubset<T, AcFollowupStepUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AcFollowupStep.
     * @param {AcFollowupStepUpsertArgs} args - Arguments to update or create a AcFollowupStep.
     * @example
     * // Update or create a AcFollowupStep
     * const acFollowupStep = await prisma.acFollowupStep.upsert({
     *   create: {
     *     // ... data to create a AcFollowupStep
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AcFollowupStep we want to update
     *   }
     * })
     */
    upsert<T extends AcFollowupStepUpsertArgs>(args: SelectSubset<T, AcFollowupStepUpsertArgs<ExtArgs>>): Prisma__AcFollowupStepClient<$Result.GetResult<Prisma.$AcFollowupStepPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AcFollowupSteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcFollowupStepCountArgs} args - Arguments to filter AcFollowupSteps to count.
     * @example
     * // Count the number of AcFollowupSteps
     * const count = await prisma.acFollowupStep.count({
     *   where: {
     *     // ... the filter for the AcFollowupSteps we want to count
     *   }
     * })
    **/
    count<T extends AcFollowupStepCountArgs>(
      args?: Subset<T, AcFollowupStepCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AcFollowupStepCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AcFollowupStep.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcFollowupStepAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AcFollowupStepAggregateArgs>(args: Subset<T, AcFollowupStepAggregateArgs>): Prisma.PrismaPromise<GetAcFollowupStepAggregateType<T>>

    /**
     * Group by AcFollowupStep.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcFollowupStepGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AcFollowupStepGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AcFollowupStepGroupByArgs['orderBy'] }
        : { orderBy?: AcFollowupStepGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AcFollowupStepGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAcFollowupStepGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AcFollowupStep model
   */
  readonly fields: AcFollowupStepFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AcFollowupStep.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AcFollowupStepClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    settings<T extends AcSettingsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AcSettingsDefaultArgs<ExtArgs>>): Prisma__AcSettingsClient<$Result.GetResult<Prisma.$AcSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AcFollowupStep model
   */
  interface AcFollowupStepFieldRefs {
    readonly id: FieldRef<"AcFollowupStep", 'String'>
    readonly tenantId: FieldRef<"AcFollowupStep", 'String'>
    readonly settingsId: FieldRef<"AcFollowupStep", 'String'>
    readonly stepKey: FieldRef<"AcFollowupStep", 'String'>
    readonly afterHours: FieldRef<"AcFollowupStep", 'Int'>
    readonly message: FieldRef<"AcFollowupStep", 'String'>
    readonly enabled: FieldRef<"AcFollowupStep", 'Boolean'>
    readonly sortOrder: FieldRef<"AcFollowupStep", 'Int'>
    readonly createdAt: FieldRef<"AcFollowupStep", 'DateTime'>
    readonly updatedAt: FieldRef<"AcFollowupStep", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AcFollowupStep findUnique
   */
  export type AcFollowupStepFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcFollowupStep
     */
    select?: AcFollowupStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcFollowupStep
     */
    omit?: AcFollowupStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcFollowupStepInclude<ExtArgs> | null
    /**
     * Filter, which AcFollowupStep to fetch.
     */
    where: AcFollowupStepWhereUniqueInput
  }

  /**
   * AcFollowupStep findUniqueOrThrow
   */
  export type AcFollowupStepFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcFollowupStep
     */
    select?: AcFollowupStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcFollowupStep
     */
    omit?: AcFollowupStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcFollowupStepInclude<ExtArgs> | null
    /**
     * Filter, which AcFollowupStep to fetch.
     */
    where: AcFollowupStepWhereUniqueInput
  }

  /**
   * AcFollowupStep findFirst
   */
  export type AcFollowupStepFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcFollowupStep
     */
    select?: AcFollowupStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcFollowupStep
     */
    omit?: AcFollowupStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcFollowupStepInclude<ExtArgs> | null
    /**
     * Filter, which AcFollowupStep to fetch.
     */
    where?: AcFollowupStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcFollowupSteps to fetch.
     */
    orderBy?: AcFollowupStepOrderByWithRelationInput | AcFollowupStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcFollowupSteps.
     */
    cursor?: AcFollowupStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcFollowupSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcFollowupSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcFollowupSteps.
     */
    distinct?: AcFollowupStepScalarFieldEnum | AcFollowupStepScalarFieldEnum[]
  }

  /**
   * AcFollowupStep findFirstOrThrow
   */
  export type AcFollowupStepFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcFollowupStep
     */
    select?: AcFollowupStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcFollowupStep
     */
    omit?: AcFollowupStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcFollowupStepInclude<ExtArgs> | null
    /**
     * Filter, which AcFollowupStep to fetch.
     */
    where?: AcFollowupStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcFollowupSteps to fetch.
     */
    orderBy?: AcFollowupStepOrderByWithRelationInput | AcFollowupStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcFollowupSteps.
     */
    cursor?: AcFollowupStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcFollowupSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcFollowupSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcFollowupSteps.
     */
    distinct?: AcFollowupStepScalarFieldEnum | AcFollowupStepScalarFieldEnum[]
  }

  /**
   * AcFollowupStep findMany
   */
  export type AcFollowupStepFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcFollowupStep
     */
    select?: AcFollowupStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcFollowupStep
     */
    omit?: AcFollowupStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcFollowupStepInclude<ExtArgs> | null
    /**
     * Filter, which AcFollowupSteps to fetch.
     */
    where?: AcFollowupStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcFollowupSteps to fetch.
     */
    orderBy?: AcFollowupStepOrderByWithRelationInput | AcFollowupStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AcFollowupSteps.
     */
    cursor?: AcFollowupStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcFollowupSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcFollowupSteps.
     */
    skip?: number
    distinct?: AcFollowupStepScalarFieldEnum | AcFollowupStepScalarFieldEnum[]
  }

  /**
   * AcFollowupStep create
   */
  export type AcFollowupStepCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcFollowupStep
     */
    select?: AcFollowupStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcFollowupStep
     */
    omit?: AcFollowupStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcFollowupStepInclude<ExtArgs> | null
    /**
     * The data needed to create a AcFollowupStep.
     */
    data: XOR<AcFollowupStepCreateInput, AcFollowupStepUncheckedCreateInput>
  }

  /**
   * AcFollowupStep createMany
   */
  export type AcFollowupStepCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AcFollowupSteps.
     */
    data: AcFollowupStepCreateManyInput | AcFollowupStepCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AcFollowupStep update
   */
  export type AcFollowupStepUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcFollowupStep
     */
    select?: AcFollowupStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcFollowupStep
     */
    omit?: AcFollowupStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcFollowupStepInclude<ExtArgs> | null
    /**
     * The data needed to update a AcFollowupStep.
     */
    data: XOR<AcFollowupStepUpdateInput, AcFollowupStepUncheckedUpdateInput>
    /**
     * Choose, which AcFollowupStep to update.
     */
    where: AcFollowupStepWhereUniqueInput
  }

  /**
   * AcFollowupStep updateMany
   */
  export type AcFollowupStepUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AcFollowupSteps.
     */
    data: XOR<AcFollowupStepUpdateManyMutationInput, AcFollowupStepUncheckedUpdateManyInput>
    /**
     * Filter which AcFollowupSteps to update
     */
    where?: AcFollowupStepWhereInput
    /**
     * Limit how many AcFollowupSteps to update.
     */
    limit?: number
  }

  /**
   * AcFollowupStep upsert
   */
  export type AcFollowupStepUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcFollowupStep
     */
    select?: AcFollowupStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcFollowupStep
     */
    omit?: AcFollowupStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcFollowupStepInclude<ExtArgs> | null
    /**
     * The filter to search for the AcFollowupStep to update in case it exists.
     */
    where: AcFollowupStepWhereUniqueInput
    /**
     * In case the AcFollowupStep found by the `where` argument doesn't exist, create a new AcFollowupStep with this data.
     */
    create: XOR<AcFollowupStepCreateInput, AcFollowupStepUncheckedCreateInput>
    /**
     * In case the AcFollowupStep was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AcFollowupStepUpdateInput, AcFollowupStepUncheckedUpdateInput>
  }

  /**
   * AcFollowupStep delete
   */
  export type AcFollowupStepDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcFollowupStep
     */
    select?: AcFollowupStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcFollowupStep
     */
    omit?: AcFollowupStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcFollowupStepInclude<ExtArgs> | null
    /**
     * Filter which AcFollowupStep to delete.
     */
    where: AcFollowupStepWhereUniqueInput
  }

  /**
   * AcFollowupStep deleteMany
   */
  export type AcFollowupStepDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcFollowupSteps to delete
     */
    where?: AcFollowupStepWhereInput
    /**
     * Limit how many AcFollowupSteps to delete.
     */
    limit?: number
  }

  /**
   * AcFollowupStep without action
   */
  export type AcFollowupStepDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcFollowupStep
     */
    select?: AcFollowupStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcFollowupStep
     */
    omit?: AcFollowupStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcFollowupStepInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AcLeadScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    name: 'name',
    phone: 'phone',
    email: 'email',
    stage: 'stage',
    notes: 'notes',
    nextFollowUpAt: 'nextFollowUpAt',
    ai: 'ai',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AcLeadScalarFieldEnum = (typeof AcLeadScalarFieldEnum)[keyof typeof AcLeadScalarFieldEnum]


  export const AcConversationScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    leadId: 'leadId',
    channel: 'channel',
    unreadCount: 'unreadCount',
    lastAt: 'lastAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AcConversationScalarFieldEnum = (typeof AcConversationScalarFieldEnum)[keyof typeof AcConversationScalarFieldEnum]


  export const AcMessageScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    conversationId: 'conversationId',
    at: 'at',
    from: 'from',
    text: 'text'
  };

  export type AcMessageScalarFieldEnum = (typeof AcMessageScalarFieldEnum)[keyof typeof AcMessageScalarFieldEnum]


  export const AcAppointmentScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    leadId: 'leadId',
    service: 'service',
    startAt: 'startAt',
    durationMin: 'durationMin',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AcAppointmentScalarFieldEnum = (typeof AcAppointmentScalarFieldEnum)[keyof typeof AcAppointmentScalarFieldEnum]


  export const AcSettingsScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    businessName: 'businessName',
    timezone: 'timezone',
    hoursJson: 'hoursJson',
    servicesJson: 'servicesJson',
    faqsJson: 'faqsJson',
    qualQsJson: 'qualQsJson',
    bookingJson: 'bookingJson',
    followupsJson: 'followupsJson',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AcSettingsScalarFieldEnum = (typeof AcSettingsScalarFieldEnum)[keyof typeof AcSettingsScalarFieldEnum]


  export const AcFollowupStepScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    settingsId: 'settingsId',
    stepKey: 'stepKey',
    afterHours: 'afterHours',
    message: 'message',
    enabled: 'enabled',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AcFollowupStepScalarFieldEnum = (typeof AcFollowupStepScalarFieldEnum)[keyof typeof AcFollowupStepScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const AcLeadOrderByRelevanceFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    name: 'name',
    phone: 'phone',
    email: 'email',
    notes: 'notes'
  };

  export type AcLeadOrderByRelevanceFieldEnum = (typeof AcLeadOrderByRelevanceFieldEnum)[keyof typeof AcLeadOrderByRelevanceFieldEnum]


  export const AcConversationOrderByRelevanceFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    leadId: 'leadId',
    channel: 'channel'
  };

  export type AcConversationOrderByRelevanceFieldEnum = (typeof AcConversationOrderByRelevanceFieldEnum)[keyof typeof AcConversationOrderByRelevanceFieldEnum]


  export const AcMessageOrderByRelevanceFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    conversationId: 'conversationId',
    text: 'text'
  };

  export type AcMessageOrderByRelevanceFieldEnum = (typeof AcMessageOrderByRelevanceFieldEnum)[keyof typeof AcMessageOrderByRelevanceFieldEnum]


  export const AcAppointmentOrderByRelevanceFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    leadId: 'leadId',
    service: 'service'
  };

  export type AcAppointmentOrderByRelevanceFieldEnum = (typeof AcAppointmentOrderByRelevanceFieldEnum)[keyof typeof AcAppointmentOrderByRelevanceFieldEnum]


  export const AcSettingsOrderByRelevanceFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    businessName: 'businessName',
    timezone: 'timezone'
  };

  export type AcSettingsOrderByRelevanceFieldEnum = (typeof AcSettingsOrderByRelevanceFieldEnum)[keyof typeof AcSettingsOrderByRelevanceFieldEnum]


  export const AcFollowupStepOrderByRelevanceFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    settingsId: 'settingsId',
    stepKey: 'stepKey',
    message: 'message'
  };

  export type AcFollowupStepOrderByRelevanceFieldEnum = (typeof AcFollowupStepOrderByRelevanceFieldEnum)[keyof typeof AcFollowupStepOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'AcLeadStage'
   */
  export type EnumAcLeadStageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AcLeadStage'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'AcMessageFrom'
   */
  export type EnumAcMessageFromFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AcMessageFrom'>
    


  /**
   * Reference to a field of type 'AcAppointmentStatus'
   */
  export type EnumAcAppointmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AcAppointmentStatus'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type AcLeadWhereInput = {
    AND?: AcLeadWhereInput | AcLeadWhereInput[]
    OR?: AcLeadWhereInput[]
    NOT?: AcLeadWhereInput | AcLeadWhereInput[]
    id?: StringFilter<"AcLead"> | string
    tenantId?: StringFilter<"AcLead"> | string
    name?: StringFilter<"AcLead"> | string
    phone?: StringNullableFilter<"AcLead"> | string | null
    email?: StringNullableFilter<"AcLead"> | string | null
    stage?: EnumAcLeadStageFilter<"AcLead"> | $Enums.AcLeadStage
    notes?: StringNullableFilter<"AcLead"> | string | null
    nextFollowUpAt?: DateTimeNullableFilter<"AcLead"> | Date | string | null
    ai?: JsonNullableFilter<"AcLead">
    createdAt?: DateTimeFilter<"AcLead"> | Date | string
    updatedAt?: DateTimeFilter<"AcLead"> | Date | string
    conversations?: AcConversationListRelationFilter
    appointments?: AcAppointmentListRelationFilter
  }

  export type AcLeadOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    stage?: SortOrder
    notes?: SortOrderInput | SortOrder
    nextFollowUpAt?: SortOrderInput | SortOrder
    ai?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    conversations?: AcConversationOrderByRelationAggregateInput
    appointments?: AcAppointmentOrderByRelationAggregateInput
    _relevance?: AcLeadOrderByRelevanceInput
  }

  export type AcLeadWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_id?: AcLeadTenantIdIdCompoundUniqueInput
    AND?: AcLeadWhereInput | AcLeadWhereInput[]
    OR?: AcLeadWhereInput[]
    NOT?: AcLeadWhereInput | AcLeadWhereInput[]
    tenantId?: StringFilter<"AcLead"> | string
    name?: StringFilter<"AcLead"> | string
    phone?: StringNullableFilter<"AcLead"> | string | null
    email?: StringNullableFilter<"AcLead"> | string | null
    stage?: EnumAcLeadStageFilter<"AcLead"> | $Enums.AcLeadStage
    notes?: StringNullableFilter<"AcLead"> | string | null
    nextFollowUpAt?: DateTimeNullableFilter<"AcLead"> | Date | string | null
    ai?: JsonNullableFilter<"AcLead">
    createdAt?: DateTimeFilter<"AcLead"> | Date | string
    updatedAt?: DateTimeFilter<"AcLead"> | Date | string
    conversations?: AcConversationListRelationFilter
    appointments?: AcAppointmentListRelationFilter
  }, "id" | "tenantId_id">

  export type AcLeadOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    stage?: SortOrder
    notes?: SortOrderInput | SortOrder
    nextFollowUpAt?: SortOrderInput | SortOrder
    ai?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AcLeadCountOrderByAggregateInput
    _max?: AcLeadMaxOrderByAggregateInput
    _min?: AcLeadMinOrderByAggregateInput
  }

  export type AcLeadScalarWhereWithAggregatesInput = {
    AND?: AcLeadScalarWhereWithAggregatesInput | AcLeadScalarWhereWithAggregatesInput[]
    OR?: AcLeadScalarWhereWithAggregatesInput[]
    NOT?: AcLeadScalarWhereWithAggregatesInput | AcLeadScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AcLead"> | string
    tenantId?: StringWithAggregatesFilter<"AcLead"> | string
    name?: StringWithAggregatesFilter<"AcLead"> | string
    phone?: StringNullableWithAggregatesFilter<"AcLead"> | string | null
    email?: StringNullableWithAggregatesFilter<"AcLead"> | string | null
    stage?: EnumAcLeadStageWithAggregatesFilter<"AcLead"> | $Enums.AcLeadStage
    notes?: StringNullableWithAggregatesFilter<"AcLead"> | string | null
    nextFollowUpAt?: DateTimeNullableWithAggregatesFilter<"AcLead"> | Date | string | null
    ai?: JsonNullableWithAggregatesFilter<"AcLead">
    createdAt?: DateTimeWithAggregatesFilter<"AcLead"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AcLead"> | Date | string
  }

  export type AcConversationWhereInput = {
    AND?: AcConversationWhereInput | AcConversationWhereInput[]
    OR?: AcConversationWhereInput[]
    NOT?: AcConversationWhereInput | AcConversationWhereInput[]
    id?: StringFilter<"AcConversation"> | string
    tenantId?: StringFilter<"AcConversation"> | string
    leadId?: StringFilter<"AcConversation"> | string
    channel?: StringFilter<"AcConversation"> | string
    unreadCount?: IntFilter<"AcConversation"> | number
    lastAt?: DateTimeFilter<"AcConversation"> | Date | string
    createdAt?: DateTimeFilter<"AcConversation"> | Date | string
    updatedAt?: DateTimeFilter<"AcConversation"> | Date | string
    lead?: XOR<AcLeadScalarRelationFilter, AcLeadWhereInput>
    messages?: AcMessageListRelationFilter
  }

  export type AcConversationOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    leadId?: SortOrder
    channel?: SortOrder
    unreadCount?: SortOrder
    lastAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lead?: AcLeadOrderByWithRelationInput
    messages?: AcMessageOrderByRelationAggregateInput
    _relevance?: AcConversationOrderByRelevanceInput
  }

  export type AcConversationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_id?: AcConversationTenantIdIdCompoundUniqueInput
    AND?: AcConversationWhereInput | AcConversationWhereInput[]
    OR?: AcConversationWhereInput[]
    NOT?: AcConversationWhereInput | AcConversationWhereInput[]
    tenantId?: StringFilter<"AcConversation"> | string
    leadId?: StringFilter<"AcConversation"> | string
    channel?: StringFilter<"AcConversation"> | string
    unreadCount?: IntFilter<"AcConversation"> | number
    lastAt?: DateTimeFilter<"AcConversation"> | Date | string
    createdAt?: DateTimeFilter<"AcConversation"> | Date | string
    updatedAt?: DateTimeFilter<"AcConversation"> | Date | string
    lead?: XOR<AcLeadScalarRelationFilter, AcLeadWhereInput>
    messages?: AcMessageListRelationFilter
  }, "id" | "tenantId_id">

  export type AcConversationOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    leadId?: SortOrder
    channel?: SortOrder
    unreadCount?: SortOrder
    lastAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AcConversationCountOrderByAggregateInput
    _avg?: AcConversationAvgOrderByAggregateInput
    _max?: AcConversationMaxOrderByAggregateInput
    _min?: AcConversationMinOrderByAggregateInput
    _sum?: AcConversationSumOrderByAggregateInput
  }

  export type AcConversationScalarWhereWithAggregatesInput = {
    AND?: AcConversationScalarWhereWithAggregatesInput | AcConversationScalarWhereWithAggregatesInput[]
    OR?: AcConversationScalarWhereWithAggregatesInput[]
    NOT?: AcConversationScalarWhereWithAggregatesInput | AcConversationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AcConversation"> | string
    tenantId?: StringWithAggregatesFilter<"AcConversation"> | string
    leadId?: StringWithAggregatesFilter<"AcConversation"> | string
    channel?: StringWithAggregatesFilter<"AcConversation"> | string
    unreadCount?: IntWithAggregatesFilter<"AcConversation"> | number
    lastAt?: DateTimeWithAggregatesFilter<"AcConversation"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"AcConversation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AcConversation"> | Date | string
  }

  export type AcMessageWhereInput = {
    AND?: AcMessageWhereInput | AcMessageWhereInput[]
    OR?: AcMessageWhereInput[]
    NOT?: AcMessageWhereInput | AcMessageWhereInput[]
    id?: StringFilter<"AcMessage"> | string
    tenantId?: StringFilter<"AcMessage"> | string
    conversationId?: StringFilter<"AcMessage"> | string
    at?: DateTimeFilter<"AcMessage"> | Date | string
    from?: EnumAcMessageFromFilter<"AcMessage"> | $Enums.AcMessageFrom
    text?: StringFilter<"AcMessage"> | string
    conversation?: XOR<AcConversationScalarRelationFilter, AcConversationWhereInput>
  }

  export type AcMessageOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    conversationId?: SortOrder
    at?: SortOrder
    from?: SortOrder
    text?: SortOrder
    conversation?: AcConversationOrderByWithRelationInput
    _relevance?: AcMessageOrderByRelevanceInput
  }

  export type AcMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_id?: AcMessageTenantIdIdCompoundUniqueInput
    AND?: AcMessageWhereInput | AcMessageWhereInput[]
    OR?: AcMessageWhereInput[]
    NOT?: AcMessageWhereInput | AcMessageWhereInput[]
    tenantId?: StringFilter<"AcMessage"> | string
    conversationId?: StringFilter<"AcMessage"> | string
    at?: DateTimeFilter<"AcMessage"> | Date | string
    from?: EnumAcMessageFromFilter<"AcMessage"> | $Enums.AcMessageFrom
    text?: StringFilter<"AcMessage"> | string
    conversation?: XOR<AcConversationScalarRelationFilter, AcConversationWhereInput>
  }, "id" | "tenantId_id">

  export type AcMessageOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    conversationId?: SortOrder
    at?: SortOrder
    from?: SortOrder
    text?: SortOrder
    _count?: AcMessageCountOrderByAggregateInput
    _max?: AcMessageMaxOrderByAggregateInput
    _min?: AcMessageMinOrderByAggregateInput
  }

  export type AcMessageScalarWhereWithAggregatesInput = {
    AND?: AcMessageScalarWhereWithAggregatesInput | AcMessageScalarWhereWithAggregatesInput[]
    OR?: AcMessageScalarWhereWithAggregatesInput[]
    NOT?: AcMessageScalarWhereWithAggregatesInput | AcMessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AcMessage"> | string
    tenantId?: StringWithAggregatesFilter<"AcMessage"> | string
    conversationId?: StringWithAggregatesFilter<"AcMessage"> | string
    at?: DateTimeWithAggregatesFilter<"AcMessage"> | Date | string
    from?: EnumAcMessageFromWithAggregatesFilter<"AcMessage"> | $Enums.AcMessageFrom
    text?: StringWithAggregatesFilter<"AcMessage"> | string
  }

  export type AcAppointmentWhereInput = {
    AND?: AcAppointmentWhereInput | AcAppointmentWhereInput[]
    OR?: AcAppointmentWhereInput[]
    NOT?: AcAppointmentWhereInput | AcAppointmentWhereInput[]
    id?: StringFilter<"AcAppointment"> | string
    tenantId?: StringFilter<"AcAppointment"> | string
    leadId?: StringFilter<"AcAppointment"> | string
    service?: StringFilter<"AcAppointment"> | string
    startAt?: DateTimeFilter<"AcAppointment"> | Date | string
    durationMin?: IntFilter<"AcAppointment"> | number
    status?: EnumAcAppointmentStatusFilter<"AcAppointment"> | $Enums.AcAppointmentStatus
    createdAt?: DateTimeFilter<"AcAppointment"> | Date | string
    updatedAt?: DateTimeFilter<"AcAppointment"> | Date | string
    lead?: XOR<AcLeadScalarRelationFilter, AcLeadWhereInput>
  }

  export type AcAppointmentOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    leadId?: SortOrder
    service?: SortOrder
    startAt?: SortOrder
    durationMin?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lead?: AcLeadOrderByWithRelationInput
    _relevance?: AcAppointmentOrderByRelevanceInput
  }

  export type AcAppointmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_id?: AcAppointmentTenantIdIdCompoundUniqueInput
    AND?: AcAppointmentWhereInput | AcAppointmentWhereInput[]
    OR?: AcAppointmentWhereInput[]
    NOT?: AcAppointmentWhereInput | AcAppointmentWhereInput[]
    tenantId?: StringFilter<"AcAppointment"> | string
    leadId?: StringFilter<"AcAppointment"> | string
    service?: StringFilter<"AcAppointment"> | string
    startAt?: DateTimeFilter<"AcAppointment"> | Date | string
    durationMin?: IntFilter<"AcAppointment"> | number
    status?: EnumAcAppointmentStatusFilter<"AcAppointment"> | $Enums.AcAppointmentStatus
    createdAt?: DateTimeFilter<"AcAppointment"> | Date | string
    updatedAt?: DateTimeFilter<"AcAppointment"> | Date | string
    lead?: XOR<AcLeadScalarRelationFilter, AcLeadWhereInput>
  }, "id" | "tenantId_id">

  export type AcAppointmentOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    leadId?: SortOrder
    service?: SortOrder
    startAt?: SortOrder
    durationMin?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AcAppointmentCountOrderByAggregateInput
    _avg?: AcAppointmentAvgOrderByAggregateInput
    _max?: AcAppointmentMaxOrderByAggregateInput
    _min?: AcAppointmentMinOrderByAggregateInput
    _sum?: AcAppointmentSumOrderByAggregateInput
  }

  export type AcAppointmentScalarWhereWithAggregatesInput = {
    AND?: AcAppointmentScalarWhereWithAggregatesInput | AcAppointmentScalarWhereWithAggregatesInput[]
    OR?: AcAppointmentScalarWhereWithAggregatesInput[]
    NOT?: AcAppointmentScalarWhereWithAggregatesInput | AcAppointmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AcAppointment"> | string
    tenantId?: StringWithAggregatesFilter<"AcAppointment"> | string
    leadId?: StringWithAggregatesFilter<"AcAppointment"> | string
    service?: StringWithAggregatesFilter<"AcAppointment"> | string
    startAt?: DateTimeWithAggregatesFilter<"AcAppointment"> | Date | string
    durationMin?: IntWithAggregatesFilter<"AcAppointment"> | number
    status?: EnumAcAppointmentStatusWithAggregatesFilter<"AcAppointment"> | $Enums.AcAppointmentStatus
    createdAt?: DateTimeWithAggregatesFilter<"AcAppointment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AcAppointment"> | Date | string
  }

  export type AcSettingsWhereInput = {
    AND?: AcSettingsWhereInput | AcSettingsWhereInput[]
    OR?: AcSettingsWhereInput[]
    NOT?: AcSettingsWhereInput | AcSettingsWhereInput[]
    id?: StringFilter<"AcSettings"> | string
    tenantId?: StringFilter<"AcSettings"> | string
    businessName?: StringFilter<"AcSettings"> | string
    timezone?: StringFilter<"AcSettings"> | string
    hoursJson?: JsonNullableFilter<"AcSettings">
    servicesJson?: JsonNullableFilter<"AcSettings">
    faqsJson?: JsonNullableFilter<"AcSettings">
    qualQsJson?: JsonNullableFilter<"AcSettings">
    bookingJson?: JsonNullableFilter<"AcSettings">
    followupsJson?: JsonNullableFilter<"AcSettings">
    createdAt?: DateTimeFilter<"AcSettings"> | Date | string
    updatedAt?: DateTimeFilter<"AcSettings"> | Date | string
    followupSteps?: AcFollowupStepListRelationFilter
  }

  export type AcSettingsOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    businessName?: SortOrder
    timezone?: SortOrder
    hoursJson?: SortOrderInput | SortOrder
    servicesJson?: SortOrderInput | SortOrder
    faqsJson?: SortOrderInput | SortOrder
    qualQsJson?: SortOrderInput | SortOrder
    bookingJson?: SortOrderInput | SortOrder
    followupsJson?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    followupSteps?: AcFollowupStepOrderByRelationAggregateInput
    _relevance?: AcSettingsOrderByRelevanceInput
  }

  export type AcSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId?: string
    AND?: AcSettingsWhereInput | AcSettingsWhereInput[]
    OR?: AcSettingsWhereInput[]
    NOT?: AcSettingsWhereInput | AcSettingsWhereInput[]
    businessName?: StringFilter<"AcSettings"> | string
    timezone?: StringFilter<"AcSettings"> | string
    hoursJson?: JsonNullableFilter<"AcSettings">
    servicesJson?: JsonNullableFilter<"AcSettings">
    faqsJson?: JsonNullableFilter<"AcSettings">
    qualQsJson?: JsonNullableFilter<"AcSettings">
    bookingJson?: JsonNullableFilter<"AcSettings">
    followupsJson?: JsonNullableFilter<"AcSettings">
    createdAt?: DateTimeFilter<"AcSettings"> | Date | string
    updatedAt?: DateTimeFilter<"AcSettings"> | Date | string
    followupSteps?: AcFollowupStepListRelationFilter
  }, "id" | "tenantId">

  export type AcSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    businessName?: SortOrder
    timezone?: SortOrder
    hoursJson?: SortOrderInput | SortOrder
    servicesJson?: SortOrderInput | SortOrder
    faqsJson?: SortOrderInput | SortOrder
    qualQsJson?: SortOrderInput | SortOrder
    bookingJson?: SortOrderInput | SortOrder
    followupsJson?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AcSettingsCountOrderByAggregateInput
    _max?: AcSettingsMaxOrderByAggregateInput
    _min?: AcSettingsMinOrderByAggregateInput
  }

  export type AcSettingsScalarWhereWithAggregatesInput = {
    AND?: AcSettingsScalarWhereWithAggregatesInput | AcSettingsScalarWhereWithAggregatesInput[]
    OR?: AcSettingsScalarWhereWithAggregatesInput[]
    NOT?: AcSettingsScalarWhereWithAggregatesInput | AcSettingsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AcSettings"> | string
    tenantId?: StringWithAggregatesFilter<"AcSettings"> | string
    businessName?: StringWithAggregatesFilter<"AcSettings"> | string
    timezone?: StringWithAggregatesFilter<"AcSettings"> | string
    hoursJson?: JsonNullableWithAggregatesFilter<"AcSettings">
    servicesJson?: JsonNullableWithAggregatesFilter<"AcSettings">
    faqsJson?: JsonNullableWithAggregatesFilter<"AcSettings">
    qualQsJson?: JsonNullableWithAggregatesFilter<"AcSettings">
    bookingJson?: JsonNullableWithAggregatesFilter<"AcSettings">
    followupsJson?: JsonNullableWithAggregatesFilter<"AcSettings">
    createdAt?: DateTimeWithAggregatesFilter<"AcSettings"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AcSettings"> | Date | string
  }

  export type AcFollowupStepWhereInput = {
    AND?: AcFollowupStepWhereInput | AcFollowupStepWhereInput[]
    OR?: AcFollowupStepWhereInput[]
    NOT?: AcFollowupStepWhereInput | AcFollowupStepWhereInput[]
    id?: StringFilter<"AcFollowupStep"> | string
    tenantId?: StringFilter<"AcFollowupStep"> | string
    settingsId?: StringFilter<"AcFollowupStep"> | string
    stepKey?: StringFilter<"AcFollowupStep"> | string
    afterHours?: IntFilter<"AcFollowupStep"> | number
    message?: StringFilter<"AcFollowupStep"> | string
    enabled?: BoolFilter<"AcFollowupStep"> | boolean
    sortOrder?: IntFilter<"AcFollowupStep"> | number
    createdAt?: DateTimeFilter<"AcFollowupStep"> | Date | string
    updatedAt?: DateTimeFilter<"AcFollowupStep"> | Date | string
    settings?: XOR<AcSettingsScalarRelationFilter, AcSettingsWhereInput>
  }

  export type AcFollowupStepOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    settingsId?: SortOrder
    stepKey?: SortOrder
    afterHours?: SortOrder
    message?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    settings?: AcSettingsOrderByWithRelationInput
    _relevance?: AcFollowupStepOrderByRelevanceInput
  }

  export type AcFollowupStepWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_settingsId_stepKey?: AcFollowupStepTenantIdSettingsIdStepKeyCompoundUniqueInput
    AND?: AcFollowupStepWhereInput | AcFollowupStepWhereInput[]
    OR?: AcFollowupStepWhereInput[]
    NOT?: AcFollowupStepWhereInput | AcFollowupStepWhereInput[]
    tenantId?: StringFilter<"AcFollowupStep"> | string
    settingsId?: StringFilter<"AcFollowupStep"> | string
    stepKey?: StringFilter<"AcFollowupStep"> | string
    afterHours?: IntFilter<"AcFollowupStep"> | number
    message?: StringFilter<"AcFollowupStep"> | string
    enabled?: BoolFilter<"AcFollowupStep"> | boolean
    sortOrder?: IntFilter<"AcFollowupStep"> | number
    createdAt?: DateTimeFilter<"AcFollowupStep"> | Date | string
    updatedAt?: DateTimeFilter<"AcFollowupStep"> | Date | string
    settings?: XOR<AcSettingsScalarRelationFilter, AcSettingsWhereInput>
  }, "id" | "tenantId_settingsId_stepKey">

  export type AcFollowupStepOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    settingsId?: SortOrder
    stepKey?: SortOrder
    afterHours?: SortOrder
    message?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AcFollowupStepCountOrderByAggregateInput
    _avg?: AcFollowupStepAvgOrderByAggregateInput
    _max?: AcFollowupStepMaxOrderByAggregateInput
    _min?: AcFollowupStepMinOrderByAggregateInput
    _sum?: AcFollowupStepSumOrderByAggregateInput
  }

  export type AcFollowupStepScalarWhereWithAggregatesInput = {
    AND?: AcFollowupStepScalarWhereWithAggregatesInput | AcFollowupStepScalarWhereWithAggregatesInput[]
    OR?: AcFollowupStepScalarWhereWithAggregatesInput[]
    NOT?: AcFollowupStepScalarWhereWithAggregatesInput | AcFollowupStepScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AcFollowupStep"> | string
    tenantId?: StringWithAggregatesFilter<"AcFollowupStep"> | string
    settingsId?: StringWithAggregatesFilter<"AcFollowupStep"> | string
    stepKey?: StringWithAggregatesFilter<"AcFollowupStep"> | string
    afterHours?: IntWithAggregatesFilter<"AcFollowupStep"> | number
    message?: StringWithAggregatesFilter<"AcFollowupStep"> | string
    enabled?: BoolWithAggregatesFilter<"AcFollowupStep"> | boolean
    sortOrder?: IntWithAggregatesFilter<"AcFollowupStep"> | number
    createdAt?: DateTimeWithAggregatesFilter<"AcFollowupStep"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AcFollowupStep"> | Date | string
  }

  export type AcLeadCreateInput = {
    id?: string
    tenantId: string
    name: string
    phone?: string | null
    email?: string | null
    stage?: $Enums.AcLeadStage
    notes?: string | null
    nextFollowUpAt?: Date | string | null
    ai?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: AcConversationCreateNestedManyWithoutLeadInput
    appointments?: AcAppointmentCreateNestedManyWithoutLeadInput
  }

  export type AcLeadUncheckedCreateInput = {
    id?: string
    tenantId: string
    name: string
    phone?: string | null
    email?: string | null
    stage?: $Enums.AcLeadStage
    notes?: string | null
    nextFollowUpAt?: Date | string | null
    ai?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: AcConversationUncheckedCreateNestedManyWithoutLeadInput
    appointments?: AcAppointmentUncheckedCreateNestedManyWithoutLeadInput
  }

  export type AcLeadUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: EnumAcLeadStageFieldUpdateOperationsInput | $Enums.AcLeadStage
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    nextFollowUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ai?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: AcConversationUpdateManyWithoutLeadNestedInput
    appointments?: AcAppointmentUpdateManyWithoutLeadNestedInput
  }

  export type AcLeadUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: EnumAcLeadStageFieldUpdateOperationsInput | $Enums.AcLeadStage
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    nextFollowUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ai?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: AcConversationUncheckedUpdateManyWithoutLeadNestedInput
    appointments?: AcAppointmentUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type AcLeadCreateManyInput = {
    id?: string
    tenantId: string
    name: string
    phone?: string | null
    email?: string | null
    stage?: $Enums.AcLeadStage
    notes?: string | null
    nextFollowUpAt?: Date | string | null
    ai?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AcLeadUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: EnumAcLeadStageFieldUpdateOperationsInput | $Enums.AcLeadStage
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    nextFollowUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ai?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcLeadUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: EnumAcLeadStageFieldUpdateOperationsInput | $Enums.AcLeadStage
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    nextFollowUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ai?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcConversationCreateInput = {
    id?: string
    tenantId: string
    channel: string
    unreadCount?: number
    lastAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    lead: AcLeadCreateNestedOneWithoutConversationsInput
    messages?: AcMessageCreateNestedManyWithoutConversationInput
  }

  export type AcConversationUncheckedCreateInput = {
    id?: string
    tenantId: string
    leadId: string
    channel: string
    unreadCount?: number
    lastAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: AcMessageUncheckedCreateNestedManyWithoutConversationInput
  }

  export type AcConversationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    unreadCount?: IntFieldUpdateOperationsInput | number
    lastAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lead?: AcLeadUpdateOneRequiredWithoutConversationsNestedInput
    messages?: AcMessageUpdateManyWithoutConversationNestedInput
  }

  export type AcConversationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    unreadCount?: IntFieldUpdateOperationsInput | number
    lastAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: AcMessageUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type AcConversationCreateManyInput = {
    id?: string
    tenantId: string
    leadId: string
    channel: string
    unreadCount?: number
    lastAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AcConversationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    unreadCount?: IntFieldUpdateOperationsInput | number
    lastAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcConversationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    unreadCount?: IntFieldUpdateOperationsInput | number
    lastAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcMessageCreateInput = {
    id?: string
    tenantId: string
    at?: Date | string
    from: $Enums.AcMessageFrom
    text: string
    conversation: AcConversationCreateNestedOneWithoutMessagesInput
  }

  export type AcMessageUncheckedCreateInput = {
    id?: string
    tenantId: string
    conversationId: string
    at?: Date | string
    from: $Enums.AcMessageFrom
    text: string
  }

  export type AcMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    at?: DateTimeFieldUpdateOperationsInput | Date | string
    from?: EnumAcMessageFromFieldUpdateOperationsInput | $Enums.AcMessageFrom
    text?: StringFieldUpdateOperationsInput | string
    conversation?: AcConversationUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type AcMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    at?: DateTimeFieldUpdateOperationsInput | Date | string
    from?: EnumAcMessageFromFieldUpdateOperationsInput | $Enums.AcMessageFrom
    text?: StringFieldUpdateOperationsInput | string
  }

  export type AcMessageCreateManyInput = {
    id?: string
    tenantId: string
    conversationId: string
    at?: Date | string
    from: $Enums.AcMessageFrom
    text: string
  }

  export type AcMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    at?: DateTimeFieldUpdateOperationsInput | Date | string
    from?: EnumAcMessageFromFieldUpdateOperationsInput | $Enums.AcMessageFrom
    text?: StringFieldUpdateOperationsInput | string
  }

  export type AcMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    at?: DateTimeFieldUpdateOperationsInput | Date | string
    from?: EnumAcMessageFromFieldUpdateOperationsInput | $Enums.AcMessageFrom
    text?: StringFieldUpdateOperationsInput | string
  }

  export type AcAppointmentCreateInput = {
    id?: string
    tenantId: string
    service: string
    startAt: Date | string
    durationMin: number
    status?: $Enums.AcAppointmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    lead: AcLeadCreateNestedOneWithoutAppointmentsInput
  }

  export type AcAppointmentUncheckedCreateInput = {
    id?: string
    tenantId: string
    leadId: string
    service: string
    startAt: Date | string
    durationMin: number
    status?: $Enums.AcAppointmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AcAppointmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    service?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMin?: IntFieldUpdateOperationsInput | number
    status?: EnumAcAppointmentStatusFieldUpdateOperationsInput | $Enums.AcAppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lead?: AcLeadUpdateOneRequiredWithoutAppointmentsNestedInput
  }

  export type AcAppointmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    service?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMin?: IntFieldUpdateOperationsInput | number
    status?: EnumAcAppointmentStatusFieldUpdateOperationsInput | $Enums.AcAppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcAppointmentCreateManyInput = {
    id?: string
    tenantId: string
    leadId: string
    service: string
    startAt: Date | string
    durationMin: number
    status?: $Enums.AcAppointmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AcAppointmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    service?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMin?: IntFieldUpdateOperationsInput | number
    status?: EnumAcAppointmentStatusFieldUpdateOperationsInput | $Enums.AcAppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcAppointmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    service?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMin?: IntFieldUpdateOperationsInput | number
    status?: EnumAcAppointmentStatusFieldUpdateOperationsInput | $Enums.AcAppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcSettingsCreateInput = {
    id?: string
    tenantId: string
    businessName?: string
    timezone?: string
    hoursJson?: NullableJsonNullValueInput | InputJsonValue
    servicesJson?: NullableJsonNullValueInput | InputJsonValue
    faqsJson?: NullableJsonNullValueInput | InputJsonValue
    qualQsJson?: NullableJsonNullValueInput | InputJsonValue
    bookingJson?: NullableJsonNullValueInput | InputJsonValue
    followupsJson?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    followupSteps?: AcFollowupStepCreateNestedManyWithoutSettingsInput
  }

  export type AcSettingsUncheckedCreateInput = {
    id?: string
    tenantId: string
    businessName?: string
    timezone?: string
    hoursJson?: NullableJsonNullValueInput | InputJsonValue
    servicesJson?: NullableJsonNullValueInput | InputJsonValue
    faqsJson?: NullableJsonNullValueInput | InputJsonValue
    qualQsJson?: NullableJsonNullValueInput | InputJsonValue
    bookingJson?: NullableJsonNullValueInput | InputJsonValue
    followupsJson?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    followupSteps?: AcFollowupStepUncheckedCreateNestedManyWithoutSettingsInput
  }

  export type AcSettingsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    hoursJson?: NullableJsonNullValueInput | InputJsonValue
    servicesJson?: NullableJsonNullValueInput | InputJsonValue
    faqsJson?: NullableJsonNullValueInput | InputJsonValue
    qualQsJson?: NullableJsonNullValueInput | InputJsonValue
    bookingJson?: NullableJsonNullValueInput | InputJsonValue
    followupsJson?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    followupSteps?: AcFollowupStepUpdateManyWithoutSettingsNestedInput
  }

  export type AcSettingsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    hoursJson?: NullableJsonNullValueInput | InputJsonValue
    servicesJson?: NullableJsonNullValueInput | InputJsonValue
    faqsJson?: NullableJsonNullValueInput | InputJsonValue
    qualQsJson?: NullableJsonNullValueInput | InputJsonValue
    bookingJson?: NullableJsonNullValueInput | InputJsonValue
    followupsJson?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    followupSteps?: AcFollowupStepUncheckedUpdateManyWithoutSettingsNestedInput
  }

  export type AcSettingsCreateManyInput = {
    id?: string
    tenantId: string
    businessName?: string
    timezone?: string
    hoursJson?: NullableJsonNullValueInput | InputJsonValue
    servicesJson?: NullableJsonNullValueInput | InputJsonValue
    faqsJson?: NullableJsonNullValueInput | InputJsonValue
    qualQsJson?: NullableJsonNullValueInput | InputJsonValue
    bookingJson?: NullableJsonNullValueInput | InputJsonValue
    followupsJson?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AcSettingsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    hoursJson?: NullableJsonNullValueInput | InputJsonValue
    servicesJson?: NullableJsonNullValueInput | InputJsonValue
    faqsJson?: NullableJsonNullValueInput | InputJsonValue
    qualQsJson?: NullableJsonNullValueInput | InputJsonValue
    bookingJson?: NullableJsonNullValueInput | InputJsonValue
    followupsJson?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcSettingsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    hoursJson?: NullableJsonNullValueInput | InputJsonValue
    servicesJson?: NullableJsonNullValueInput | InputJsonValue
    faqsJson?: NullableJsonNullValueInput | InputJsonValue
    qualQsJson?: NullableJsonNullValueInput | InputJsonValue
    bookingJson?: NullableJsonNullValueInput | InputJsonValue
    followupsJson?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcFollowupStepCreateInput = {
    id?: string
    tenantId: string
    stepKey: string
    afterHours: number
    message: string
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    settings: AcSettingsCreateNestedOneWithoutFollowupStepsInput
  }

  export type AcFollowupStepUncheckedCreateInput = {
    id?: string
    tenantId: string
    settingsId: string
    stepKey: string
    afterHours: number
    message: string
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AcFollowupStepUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    stepKey?: StringFieldUpdateOperationsInput | string
    afterHours?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settings?: AcSettingsUpdateOneRequiredWithoutFollowupStepsNestedInput
  }

  export type AcFollowupStepUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    settingsId?: StringFieldUpdateOperationsInput | string
    stepKey?: StringFieldUpdateOperationsInput | string
    afterHours?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcFollowupStepCreateManyInput = {
    id?: string
    tenantId: string
    settingsId: string
    stepKey: string
    afterHours: number
    message: string
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AcFollowupStepUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    stepKey?: StringFieldUpdateOperationsInput | string
    afterHours?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcFollowupStepUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    settingsId?: StringFieldUpdateOperationsInput | string
    stepKey?: StringFieldUpdateOperationsInput | string
    afterHours?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumAcLeadStageFilter<$PrismaModel = never> = {
    equals?: $Enums.AcLeadStage | EnumAcLeadStageFieldRefInput<$PrismaModel>
    in?: $Enums.AcLeadStage[]
    notIn?: $Enums.AcLeadStage[]
    not?: NestedEnumAcLeadStageFilter<$PrismaModel> | $Enums.AcLeadStage
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AcConversationListRelationFilter = {
    every?: AcConversationWhereInput
    some?: AcConversationWhereInput
    none?: AcConversationWhereInput
  }

  export type AcAppointmentListRelationFilter = {
    every?: AcAppointmentWhereInput
    some?: AcAppointmentWhereInput
    none?: AcAppointmentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AcConversationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AcAppointmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AcLeadOrderByRelevanceInput = {
    fields: AcLeadOrderByRelevanceFieldEnum | AcLeadOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AcLeadTenantIdIdCompoundUniqueInput = {
    tenantId: string
    id: string
  }

  export type AcLeadCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    stage?: SortOrder
    notes?: SortOrder
    nextFollowUpAt?: SortOrder
    ai?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AcLeadMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    stage?: SortOrder
    notes?: SortOrder
    nextFollowUpAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AcLeadMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    stage?: SortOrder
    notes?: SortOrder
    nextFollowUpAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumAcLeadStageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AcLeadStage | EnumAcLeadStageFieldRefInput<$PrismaModel>
    in?: $Enums.AcLeadStage[]
    notIn?: $Enums.AcLeadStage[]
    not?: NestedEnumAcLeadStageWithAggregatesFilter<$PrismaModel> | $Enums.AcLeadStage
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAcLeadStageFilter<$PrismaModel>
    _max?: NestedEnumAcLeadStageFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type AcLeadScalarRelationFilter = {
    is?: AcLeadWhereInput
    isNot?: AcLeadWhereInput
  }

  export type AcMessageListRelationFilter = {
    every?: AcMessageWhereInput
    some?: AcMessageWhereInput
    none?: AcMessageWhereInput
  }

  export type AcMessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AcConversationOrderByRelevanceInput = {
    fields: AcConversationOrderByRelevanceFieldEnum | AcConversationOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AcConversationTenantIdIdCompoundUniqueInput = {
    tenantId: string
    id: string
  }

  export type AcConversationCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    leadId?: SortOrder
    channel?: SortOrder
    unreadCount?: SortOrder
    lastAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AcConversationAvgOrderByAggregateInput = {
    unreadCount?: SortOrder
  }

  export type AcConversationMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    leadId?: SortOrder
    channel?: SortOrder
    unreadCount?: SortOrder
    lastAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AcConversationMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    leadId?: SortOrder
    channel?: SortOrder
    unreadCount?: SortOrder
    lastAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AcConversationSumOrderByAggregateInput = {
    unreadCount?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumAcMessageFromFilter<$PrismaModel = never> = {
    equals?: $Enums.AcMessageFrom | EnumAcMessageFromFieldRefInput<$PrismaModel>
    in?: $Enums.AcMessageFrom[]
    notIn?: $Enums.AcMessageFrom[]
    not?: NestedEnumAcMessageFromFilter<$PrismaModel> | $Enums.AcMessageFrom
  }

  export type AcConversationScalarRelationFilter = {
    is?: AcConversationWhereInput
    isNot?: AcConversationWhereInput
  }

  export type AcMessageOrderByRelevanceInput = {
    fields: AcMessageOrderByRelevanceFieldEnum | AcMessageOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AcMessageTenantIdIdCompoundUniqueInput = {
    tenantId: string
    id: string
  }

  export type AcMessageCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    conversationId?: SortOrder
    at?: SortOrder
    from?: SortOrder
    text?: SortOrder
  }

  export type AcMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    conversationId?: SortOrder
    at?: SortOrder
    from?: SortOrder
    text?: SortOrder
  }

  export type AcMessageMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    conversationId?: SortOrder
    at?: SortOrder
    from?: SortOrder
    text?: SortOrder
  }

  export type EnumAcMessageFromWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AcMessageFrom | EnumAcMessageFromFieldRefInput<$PrismaModel>
    in?: $Enums.AcMessageFrom[]
    notIn?: $Enums.AcMessageFrom[]
    not?: NestedEnumAcMessageFromWithAggregatesFilter<$PrismaModel> | $Enums.AcMessageFrom
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAcMessageFromFilter<$PrismaModel>
    _max?: NestedEnumAcMessageFromFilter<$PrismaModel>
  }

  export type EnumAcAppointmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AcAppointmentStatus | EnumAcAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AcAppointmentStatus[]
    notIn?: $Enums.AcAppointmentStatus[]
    not?: NestedEnumAcAppointmentStatusFilter<$PrismaModel> | $Enums.AcAppointmentStatus
  }

  export type AcAppointmentOrderByRelevanceInput = {
    fields: AcAppointmentOrderByRelevanceFieldEnum | AcAppointmentOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AcAppointmentTenantIdIdCompoundUniqueInput = {
    tenantId: string
    id: string
  }

  export type AcAppointmentCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    leadId?: SortOrder
    service?: SortOrder
    startAt?: SortOrder
    durationMin?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AcAppointmentAvgOrderByAggregateInput = {
    durationMin?: SortOrder
  }

  export type AcAppointmentMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    leadId?: SortOrder
    service?: SortOrder
    startAt?: SortOrder
    durationMin?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AcAppointmentMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    leadId?: SortOrder
    service?: SortOrder
    startAt?: SortOrder
    durationMin?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AcAppointmentSumOrderByAggregateInput = {
    durationMin?: SortOrder
  }

  export type EnumAcAppointmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AcAppointmentStatus | EnumAcAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AcAppointmentStatus[]
    notIn?: $Enums.AcAppointmentStatus[]
    not?: NestedEnumAcAppointmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AcAppointmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAcAppointmentStatusFilter<$PrismaModel>
    _max?: NestedEnumAcAppointmentStatusFilter<$PrismaModel>
  }

  export type AcFollowupStepListRelationFilter = {
    every?: AcFollowupStepWhereInput
    some?: AcFollowupStepWhereInput
    none?: AcFollowupStepWhereInput
  }

  export type AcFollowupStepOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AcSettingsOrderByRelevanceInput = {
    fields: AcSettingsOrderByRelevanceFieldEnum | AcSettingsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AcSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    businessName?: SortOrder
    timezone?: SortOrder
    hoursJson?: SortOrder
    servicesJson?: SortOrder
    faqsJson?: SortOrder
    qualQsJson?: SortOrder
    bookingJson?: SortOrder
    followupsJson?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AcSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    businessName?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AcSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    businessName?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type AcSettingsScalarRelationFilter = {
    is?: AcSettingsWhereInput
    isNot?: AcSettingsWhereInput
  }

  export type AcFollowupStepOrderByRelevanceInput = {
    fields: AcFollowupStepOrderByRelevanceFieldEnum | AcFollowupStepOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AcFollowupStepTenantIdSettingsIdStepKeyCompoundUniqueInput = {
    tenantId: string
    settingsId: string
    stepKey: string
  }

  export type AcFollowupStepCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    settingsId?: SortOrder
    stepKey?: SortOrder
    afterHours?: SortOrder
    message?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AcFollowupStepAvgOrderByAggregateInput = {
    afterHours?: SortOrder
    sortOrder?: SortOrder
  }

  export type AcFollowupStepMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    settingsId?: SortOrder
    stepKey?: SortOrder
    afterHours?: SortOrder
    message?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AcFollowupStepMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    settingsId?: SortOrder
    stepKey?: SortOrder
    afterHours?: SortOrder
    message?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AcFollowupStepSumOrderByAggregateInput = {
    afterHours?: SortOrder
    sortOrder?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type AcConversationCreateNestedManyWithoutLeadInput = {
    create?: XOR<AcConversationCreateWithoutLeadInput, AcConversationUncheckedCreateWithoutLeadInput> | AcConversationCreateWithoutLeadInput[] | AcConversationUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: AcConversationCreateOrConnectWithoutLeadInput | AcConversationCreateOrConnectWithoutLeadInput[]
    createMany?: AcConversationCreateManyLeadInputEnvelope
    connect?: AcConversationWhereUniqueInput | AcConversationWhereUniqueInput[]
  }

  export type AcAppointmentCreateNestedManyWithoutLeadInput = {
    create?: XOR<AcAppointmentCreateWithoutLeadInput, AcAppointmentUncheckedCreateWithoutLeadInput> | AcAppointmentCreateWithoutLeadInput[] | AcAppointmentUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: AcAppointmentCreateOrConnectWithoutLeadInput | AcAppointmentCreateOrConnectWithoutLeadInput[]
    createMany?: AcAppointmentCreateManyLeadInputEnvelope
    connect?: AcAppointmentWhereUniqueInput | AcAppointmentWhereUniqueInput[]
  }

  export type AcConversationUncheckedCreateNestedManyWithoutLeadInput = {
    create?: XOR<AcConversationCreateWithoutLeadInput, AcConversationUncheckedCreateWithoutLeadInput> | AcConversationCreateWithoutLeadInput[] | AcConversationUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: AcConversationCreateOrConnectWithoutLeadInput | AcConversationCreateOrConnectWithoutLeadInput[]
    createMany?: AcConversationCreateManyLeadInputEnvelope
    connect?: AcConversationWhereUniqueInput | AcConversationWhereUniqueInput[]
  }

  export type AcAppointmentUncheckedCreateNestedManyWithoutLeadInput = {
    create?: XOR<AcAppointmentCreateWithoutLeadInput, AcAppointmentUncheckedCreateWithoutLeadInput> | AcAppointmentCreateWithoutLeadInput[] | AcAppointmentUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: AcAppointmentCreateOrConnectWithoutLeadInput | AcAppointmentCreateOrConnectWithoutLeadInput[]
    createMany?: AcAppointmentCreateManyLeadInputEnvelope
    connect?: AcAppointmentWhereUniqueInput | AcAppointmentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumAcLeadStageFieldUpdateOperationsInput = {
    set?: $Enums.AcLeadStage
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AcConversationUpdateManyWithoutLeadNestedInput = {
    create?: XOR<AcConversationCreateWithoutLeadInput, AcConversationUncheckedCreateWithoutLeadInput> | AcConversationCreateWithoutLeadInput[] | AcConversationUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: AcConversationCreateOrConnectWithoutLeadInput | AcConversationCreateOrConnectWithoutLeadInput[]
    upsert?: AcConversationUpsertWithWhereUniqueWithoutLeadInput | AcConversationUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: AcConversationCreateManyLeadInputEnvelope
    set?: AcConversationWhereUniqueInput | AcConversationWhereUniqueInput[]
    disconnect?: AcConversationWhereUniqueInput | AcConversationWhereUniqueInput[]
    delete?: AcConversationWhereUniqueInput | AcConversationWhereUniqueInput[]
    connect?: AcConversationWhereUniqueInput | AcConversationWhereUniqueInput[]
    update?: AcConversationUpdateWithWhereUniqueWithoutLeadInput | AcConversationUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: AcConversationUpdateManyWithWhereWithoutLeadInput | AcConversationUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: AcConversationScalarWhereInput | AcConversationScalarWhereInput[]
  }

  export type AcAppointmentUpdateManyWithoutLeadNestedInput = {
    create?: XOR<AcAppointmentCreateWithoutLeadInput, AcAppointmentUncheckedCreateWithoutLeadInput> | AcAppointmentCreateWithoutLeadInput[] | AcAppointmentUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: AcAppointmentCreateOrConnectWithoutLeadInput | AcAppointmentCreateOrConnectWithoutLeadInput[]
    upsert?: AcAppointmentUpsertWithWhereUniqueWithoutLeadInput | AcAppointmentUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: AcAppointmentCreateManyLeadInputEnvelope
    set?: AcAppointmentWhereUniqueInput | AcAppointmentWhereUniqueInput[]
    disconnect?: AcAppointmentWhereUniqueInput | AcAppointmentWhereUniqueInput[]
    delete?: AcAppointmentWhereUniqueInput | AcAppointmentWhereUniqueInput[]
    connect?: AcAppointmentWhereUniqueInput | AcAppointmentWhereUniqueInput[]
    update?: AcAppointmentUpdateWithWhereUniqueWithoutLeadInput | AcAppointmentUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: AcAppointmentUpdateManyWithWhereWithoutLeadInput | AcAppointmentUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: AcAppointmentScalarWhereInput | AcAppointmentScalarWhereInput[]
  }

  export type AcConversationUncheckedUpdateManyWithoutLeadNestedInput = {
    create?: XOR<AcConversationCreateWithoutLeadInput, AcConversationUncheckedCreateWithoutLeadInput> | AcConversationCreateWithoutLeadInput[] | AcConversationUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: AcConversationCreateOrConnectWithoutLeadInput | AcConversationCreateOrConnectWithoutLeadInput[]
    upsert?: AcConversationUpsertWithWhereUniqueWithoutLeadInput | AcConversationUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: AcConversationCreateManyLeadInputEnvelope
    set?: AcConversationWhereUniqueInput | AcConversationWhereUniqueInput[]
    disconnect?: AcConversationWhereUniqueInput | AcConversationWhereUniqueInput[]
    delete?: AcConversationWhereUniqueInput | AcConversationWhereUniqueInput[]
    connect?: AcConversationWhereUniqueInput | AcConversationWhereUniqueInput[]
    update?: AcConversationUpdateWithWhereUniqueWithoutLeadInput | AcConversationUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: AcConversationUpdateManyWithWhereWithoutLeadInput | AcConversationUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: AcConversationScalarWhereInput | AcConversationScalarWhereInput[]
  }

  export type AcAppointmentUncheckedUpdateManyWithoutLeadNestedInput = {
    create?: XOR<AcAppointmentCreateWithoutLeadInput, AcAppointmentUncheckedCreateWithoutLeadInput> | AcAppointmentCreateWithoutLeadInput[] | AcAppointmentUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: AcAppointmentCreateOrConnectWithoutLeadInput | AcAppointmentCreateOrConnectWithoutLeadInput[]
    upsert?: AcAppointmentUpsertWithWhereUniqueWithoutLeadInput | AcAppointmentUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: AcAppointmentCreateManyLeadInputEnvelope
    set?: AcAppointmentWhereUniqueInput | AcAppointmentWhereUniqueInput[]
    disconnect?: AcAppointmentWhereUniqueInput | AcAppointmentWhereUniqueInput[]
    delete?: AcAppointmentWhereUniqueInput | AcAppointmentWhereUniqueInput[]
    connect?: AcAppointmentWhereUniqueInput | AcAppointmentWhereUniqueInput[]
    update?: AcAppointmentUpdateWithWhereUniqueWithoutLeadInput | AcAppointmentUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: AcAppointmentUpdateManyWithWhereWithoutLeadInput | AcAppointmentUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: AcAppointmentScalarWhereInput | AcAppointmentScalarWhereInput[]
  }

  export type AcLeadCreateNestedOneWithoutConversationsInput = {
    create?: XOR<AcLeadCreateWithoutConversationsInput, AcLeadUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: AcLeadCreateOrConnectWithoutConversationsInput
    connect?: AcLeadWhereUniqueInput
  }

  export type AcMessageCreateNestedManyWithoutConversationInput = {
    create?: XOR<AcMessageCreateWithoutConversationInput, AcMessageUncheckedCreateWithoutConversationInput> | AcMessageCreateWithoutConversationInput[] | AcMessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: AcMessageCreateOrConnectWithoutConversationInput | AcMessageCreateOrConnectWithoutConversationInput[]
    createMany?: AcMessageCreateManyConversationInputEnvelope
    connect?: AcMessageWhereUniqueInput | AcMessageWhereUniqueInput[]
  }

  export type AcMessageUncheckedCreateNestedManyWithoutConversationInput = {
    create?: XOR<AcMessageCreateWithoutConversationInput, AcMessageUncheckedCreateWithoutConversationInput> | AcMessageCreateWithoutConversationInput[] | AcMessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: AcMessageCreateOrConnectWithoutConversationInput | AcMessageCreateOrConnectWithoutConversationInput[]
    createMany?: AcMessageCreateManyConversationInputEnvelope
    connect?: AcMessageWhereUniqueInput | AcMessageWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AcLeadUpdateOneRequiredWithoutConversationsNestedInput = {
    create?: XOR<AcLeadCreateWithoutConversationsInput, AcLeadUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: AcLeadCreateOrConnectWithoutConversationsInput
    upsert?: AcLeadUpsertWithoutConversationsInput
    connect?: AcLeadWhereUniqueInput
    update?: XOR<XOR<AcLeadUpdateToOneWithWhereWithoutConversationsInput, AcLeadUpdateWithoutConversationsInput>, AcLeadUncheckedUpdateWithoutConversationsInput>
  }

  export type AcMessageUpdateManyWithoutConversationNestedInput = {
    create?: XOR<AcMessageCreateWithoutConversationInput, AcMessageUncheckedCreateWithoutConversationInput> | AcMessageCreateWithoutConversationInput[] | AcMessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: AcMessageCreateOrConnectWithoutConversationInput | AcMessageCreateOrConnectWithoutConversationInput[]
    upsert?: AcMessageUpsertWithWhereUniqueWithoutConversationInput | AcMessageUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: AcMessageCreateManyConversationInputEnvelope
    set?: AcMessageWhereUniqueInput | AcMessageWhereUniqueInput[]
    disconnect?: AcMessageWhereUniqueInput | AcMessageWhereUniqueInput[]
    delete?: AcMessageWhereUniqueInput | AcMessageWhereUniqueInput[]
    connect?: AcMessageWhereUniqueInput | AcMessageWhereUniqueInput[]
    update?: AcMessageUpdateWithWhereUniqueWithoutConversationInput | AcMessageUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: AcMessageUpdateManyWithWhereWithoutConversationInput | AcMessageUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: AcMessageScalarWhereInput | AcMessageScalarWhereInput[]
  }

  export type AcMessageUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: XOR<AcMessageCreateWithoutConversationInput, AcMessageUncheckedCreateWithoutConversationInput> | AcMessageCreateWithoutConversationInput[] | AcMessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: AcMessageCreateOrConnectWithoutConversationInput | AcMessageCreateOrConnectWithoutConversationInput[]
    upsert?: AcMessageUpsertWithWhereUniqueWithoutConversationInput | AcMessageUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: AcMessageCreateManyConversationInputEnvelope
    set?: AcMessageWhereUniqueInput | AcMessageWhereUniqueInput[]
    disconnect?: AcMessageWhereUniqueInput | AcMessageWhereUniqueInput[]
    delete?: AcMessageWhereUniqueInput | AcMessageWhereUniqueInput[]
    connect?: AcMessageWhereUniqueInput | AcMessageWhereUniqueInput[]
    update?: AcMessageUpdateWithWhereUniqueWithoutConversationInput | AcMessageUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: AcMessageUpdateManyWithWhereWithoutConversationInput | AcMessageUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: AcMessageScalarWhereInput | AcMessageScalarWhereInput[]
  }

  export type AcConversationCreateNestedOneWithoutMessagesInput = {
    create?: XOR<AcConversationCreateWithoutMessagesInput, AcConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: AcConversationCreateOrConnectWithoutMessagesInput
    connect?: AcConversationWhereUniqueInput
  }

  export type EnumAcMessageFromFieldUpdateOperationsInput = {
    set?: $Enums.AcMessageFrom
  }

  export type AcConversationUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<AcConversationCreateWithoutMessagesInput, AcConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: AcConversationCreateOrConnectWithoutMessagesInput
    upsert?: AcConversationUpsertWithoutMessagesInput
    connect?: AcConversationWhereUniqueInput
    update?: XOR<XOR<AcConversationUpdateToOneWithWhereWithoutMessagesInput, AcConversationUpdateWithoutMessagesInput>, AcConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type AcLeadCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<AcLeadCreateWithoutAppointmentsInput, AcLeadUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: AcLeadCreateOrConnectWithoutAppointmentsInput
    connect?: AcLeadWhereUniqueInput
  }

  export type EnumAcAppointmentStatusFieldUpdateOperationsInput = {
    set?: $Enums.AcAppointmentStatus
  }

  export type AcLeadUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: XOR<AcLeadCreateWithoutAppointmentsInput, AcLeadUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: AcLeadCreateOrConnectWithoutAppointmentsInput
    upsert?: AcLeadUpsertWithoutAppointmentsInput
    connect?: AcLeadWhereUniqueInput
    update?: XOR<XOR<AcLeadUpdateToOneWithWhereWithoutAppointmentsInput, AcLeadUpdateWithoutAppointmentsInput>, AcLeadUncheckedUpdateWithoutAppointmentsInput>
  }

  export type AcFollowupStepCreateNestedManyWithoutSettingsInput = {
    create?: XOR<AcFollowupStepCreateWithoutSettingsInput, AcFollowupStepUncheckedCreateWithoutSettingsInput> | AcFollowupStepCreateWithoutSettingsInput[] | AcFollowupStepUncheckedCreateWithoutSettingsInput[]
    connectOrCreate?: AcFollowupStepCreateOrConnectWithoutSettingsInput | AcFollowupStepCreateOrConnectWithoutSettingsInput[]
    createMany?: AcFollowupStepCreateManySettingsInputEnvelope
    connect?: AcFollowupStepWhereUniqueInput | AcFollowupStepWhereUniqueInput[]
  }

  export type AcFollowupStepUncheckedCreateNestedManyWithoutSettingsInput = {
    create?: XOR<AcFollowupStepCreateWithoutSettingsInput, AcFollowupStepUncheckedCreateWithoutSettingsInput> | AcFollowupStepCreateWithoutSettingsInput[] | AcFollowupStepUncheckedCreateWithoutSettingsInput[]
    connectOrCreate?: AcFollowupStepCreateOrConnectWithoutSettingsInput | AcFollowupStepCreateOrConnectWithoutSettingsInput[]
    createMany?: AcFollowupStepCreateManySettingsInputEnvelope
    connect?: AcFollowupStepWhereUniqueInput | AcFollowupStepWhereUniqueInput[]
  }

  export type AcFollowupStepUpdateManyWithoutSettingsNestedInput = {
    create?: XOR<AcFollowupStepCreateWithoutSettingsInput, AcFollowupStepUncheckedCreateWithoutSettingsInput> | AcFollowupStepCreateWithoutSettingsInput[] | AcFollowupStepUncheckedCreateWithoutSettingsInput[]
    connectOrCreate?: AcFollowupStepCreateOrConnectWithoutSettingsInput | AcFollowupStepCreateOrConnectWithoutSettingsInput[]
    upsert?: AcFollowupStepUpsertWithWhereUniqueWithoutSettingsInput | AcFollowupStepUpsertWithWhereUniqueWithoutSettingsInput[]
    createMany?: AcFollowupStepCreateManySettingsInputEnvelope
    set?: AcFollowupStepWhereUniqueInput | AcFollowupStepWhereUniqueInput[]
    disconnect?: AcFollowupStepWhereUniqueInput | AcFollowupStepWhereUniqueInput[]
    delete?: AcFollowupStepWhereUniqueInput | AcFollowupStepWhereUniqueInput[]
    connect?: AcFollowupStepWhereUniqueInput | AcFollowupStepWhereUniqueInput[]
    update?: AcFollowupStepUpdateWithWhereUniqueWithoutSettingsInput | AcFollowupStepUpdateWithWhereUniqueWithoutSettingsInput[]
    updateMany?: AcFollowupStepUpdateManyWithWhereWithoutSettingsInput | AcFollowupStepUpdateManyWithWhereWithoutSettingsInput[]
    deleteMany?: AcFollowupStepScalarWhereInput | AcFollowupStepScalarWhereInput[]
  }

  export type AcFollowupStepUncheckedUpdateManyWithoutSettingsNestedInput = {
    create?: XOR<AcFollowupStepCreateWithoutSettingsInput, AcFollowupStepUncheckedCreateWithoutSettingsInput> | AcFollowupStepCreateWithoutSettingsInput[] | AcFollowupStepUncheckedCreateWithoutSettingsInput[]
    connectOrCreate?: AcFollowupStepCreateOrConnectWithoutSettingsInput | AcFollowupStepCreateOrConnectWithoutSettingsInput[]
    upsert?: AcFollowupStepUpsertWithWhereUniqueWithoutSettingsInput | AcFollowupStepUpsertWithWhereUniqueWithoutSettingsInput[]
    createMany?: AcFollowupStepCreateManySettingsInputEnvelope
    set?: AcFollowupStepWhereUniqueInput | AcFollowupStepWhereUniqueInput[]
    disconnect?: AcFollowupStepWhereUniqueInput | AcFollowupStepWhereUniqueInput[]
    delete?: AcFollowupStepWhereUniqueInput | AcFollowupStepWhereUniqueInput[]
    connect?: AcFollowupStepWhereUniqueInput | AcFollowupStepWhereUniqueInput[]
    update?: AcFollowupStepUpdateWithWhereUniqueWithoutSettingsInput | AcFollowupStepUpdateWithWhereUniqueWithoutSettingsInput[]
    updateMany?: AcFollowupStepUpdateManyWithWhereWithoutSettingsInput | AcFollowupStepUpdateManyWithWhereWithoutSettingsInput[]
    deleteMany?: AcFollowupStepScalarWhereInput | AcFollowupStepScalarWhereInput[]
  }

  export type AcSettingsCreateNestedOneWithoutFollowupStepsInput = {
    create?: XOR<AcSettingsCreateWithoutFollowupStepsInput, AcSettingsUncheckedCreateWithoutFollowupStepsInput>
    connectOrCreate?: AcSettingsCreateOrConnectWithoutFollowupStepsInput
    connect?: AcSettingsWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type AcSettingsUpdateOneRequiredWithoutFollowupStepsNestedInput = {
    create?: XOR<AcSettingsCreateWithoutFollowupStepsInput, AcSettingsUncheckedCreateWithoutFollowupStepsInput>
    connectOrCreate?: AcSettingsCreateOrConnectWithoutFollowupStepsInput
    upsert?: AcSettingsUpsertWithoutFollowupStepsInput
    connect?: AcSettingsWhereUniqueInput
    update?: XOR<XOR<AcSettingsUpdateToOneWithWhereWithoutFollowupStepsInput, AcSettingsUpdateWithoutFollowupStepsInput>, AcSettingsUncheckedUpdateWithoutFollowupStepsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumAcLeadStageFilter<$PrismaModel = never> = {
    equals?: $Enums.AcLeadStage | EnumAcLeadStageFieldRefInput<$PrismaModel>
    in?: $Enums.AcLeadStage[]
    notIn?: $Enums.AcLeadStage[]
    not?: NestedEnumAcLeadStageFilter<$PrismaModel> | $Enums.AcLeadStage
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumAcLeadStageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AcLeadStage | EnumAcLeadStageFieldRefInput<$PrismaModel>
    in?: $Enums.AcLeadStage[]
    notIn?: $Enums.AcLeadStage[]
    not?: NestedEnumAcLeadStageWithAggregatesFilter<$PrismaModel> | $Enums.AcLeadStage
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAcLeadStageFilter<$PrismaModel>
    _max?: NestedEnumAcLeadStageFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumAcMessageFromFilter<$PrismaModel = never> = {
    equals?: $Enums.AcMessageFrom | EnumAcMessageFromFieldRefInput<$PrismaModel>
    in?: $Enums.AcMessageFrom[]
    notIn?: $Enums.AcMessageFrom[]
    not?: NestedEnumAcMessageFromFilter<$PrismaModel> | $Enums.AcMessageFrom
  }

  export type NestedEnumAcMessageFromWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AcMessageFrom | EnumAcMessageFromFieldRefInput<$PrismaModel>
    in?: $Enums.AcMessageFrom[]
    notIn?: $Enums.AcMessageFrom[]
    not?: NestedEnumAcMessageFromWithAggregatesFilter<$PrismaModel> | $Enums.AcMessageFrom
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAcMessageFromFilter<$PrismaModel>
    _max?: NestedEnumAcMessageFromFilter<$PrismaModel>
  }

  export type NestedEnumAcAppointmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AcAppointmentStatus | EnumAcAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AcAppointmentStatus[]
    notIn?: $Enums.AcAppointmentStatus[]
    not?: NestedEnumAcAppointmentStatusFilter<$PrismaModel> | $Enums.AcAppointmentStatus
  }

  export type NestedEnumAcAppointmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AcAppointmentStatus | EnumAcAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AcAppointmentStatus[]
    notIn?: $Enums.AcAppointmentStatus[]
    not?: NestedEnumAcAppointmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AcAppointmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAcAppointmentStatusFilter<$PrismaModel>
    _max?: NestedEnumAcAppointmentStatusFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type AcConversationCreateWithoutLeadInput = {
    id?: string
    tenantId: string
    channel: string
    unreadCount?: number
    lastAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: AcMessageCreateNestedManyWithoutConversationInput
  }

  export type AcConversationUncheckedCreateWithoutLeadInput = {
    id?: string
    tenantId: string
    channel: string
    unreadCount?: number
    lastAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: AcMessageUncheckedCreateNestedManyWithoutConversationInput
  }

  export type AcConversationCreateOrConnectWithoutLeadInput = {
    where: AcConversationWhereUniqueInput
    create: XOR<AcConversationCreateWithoutLeadInput, AcConversationUncheckedCreateWithoutLeadInput>
  }

  export type AcConversationCreateManyLeadInputEnvelope = {
    data: AcConversationCreateManyLeadInput | AcConversationCreateManyLeadInput[]
    skipDuplicates?: boolean
  }

  export type AcAppointmentCreateWithoutLeadInput = {
    id?: string
    tenantId: string
    service: string
    startAt: Date | string
    durationMin: number
    status?: $Enums.AcAppointmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AcAppointmentUncheckedCreateWithoutLeadInput = {
    id?: string
    tenantId: string
    service: string
    startAt: Date | string
    durationMin: number
    status?: $Enums.AcAppointmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AcAppointmentCreateOrConnectWithoutLeadInput = {
    where: AcAppointmentWhereUniqueInput
    create: XOR<AcAppointmentCreateWithoutLeadInput, AcAppointmentUncheckedCreateWithoutLeadInput>
  }

  export type AcAppointmentCreateManyLeadInputEnvelope = {
    data: AcAppointmentCreateManyLeadInput | AcAppointmentCreateManyLeadInput[]
    skipDuplicates?: boolean
  }

  export type AcConversationUpsertWithWhereUniqueWithoutLeadInput = {
    where: AcConversationWhereUniqueInput
    update: XOR<AcConversationUpdateWithoutLeadInput, AcConversationUncheckedUpdateWithoutLeadInput>
    create: XOR<AcConversationCreateWithoutLeadInput, AcConversationUncheckedCreateWithoutLeadInput>
  }

  export type AcConversationUpdateWithWhereUniqueWithoutLeadInput = {
    where: AcConversationWhereUniqueInput
    data: XOR<AcConversationUpdateWithoutLeadInput, AcConversationUncheckedUpdateWithoutLeadInput>
  }

  export type AcConversationUpdateManyWithWhereWithoutLeadInput = {
    where: AcConversationScalarWhereInput
    data: XOR<AcConversationUpdateManyMutationInput, AcConversationUncheckedUpdateManyWithoutLeadInput>
  }

  export type AcConversationScalarWhereInput = {
    AND?: AcConversationScalarWhereInput | AcConversationScalarWhereInput[]
    OR?: AcConversationScalarWhereInput[]
    NOT?: AcConversationScalarWhereInput | AcConversationScalarWhereInput[]
    id?: StringFilter<"AcConversation"> | string
    tenantId?: StringFilter<"AcConversation"> | string
    leadId?: StringFilter<"AcConversation"> | string
    channel?: StringFilter<"AcConversation"> | string
    unreadCount?: IntFilter<"AcConversation"> | number
    lastAt?: DateTimeFilter<"AcConversation"> | Date | string
    createdAt?: DateTimeFilter<"AcConversation"> | Date | string
    updatedAt?: DateTimeFilter<"AcConversation"> | Date | string
  }

  export type AcAppointmentUpsertWithWhereUniqueWithoutLeadInput = {
    where: AcAppointmentWhereUniqueInput
    update: XOR<AcAppointmentUpdateWithoutLeadInput, AcAppointmentUncheckedUpdateWithoutLeadInput>
    create: XOR<AcAppointmentCreateWithoutLeadInput, AcAppointmentUncheckedCreateWithoutLeadInput>
  }

  export type AcAppointmentUpdateWithWhereUniqueWithoutLeadInput = {
    where: AcAppointmentWhereUniqueInput
    data: XOR<AcAppointmentUpdateWithoutLeadInput, AcAppointmentUncheckedUpdateWithoutLeadInput>
  }

  export type AcAppointmentUpdateManyWithWhereWithoutLeadInput = {
    where: AcAppointmentScalarWhereInput
    data: XOR<AcAppointmentUpdateManyMutationInput, AcAppointmentUncheckedUpdateManyWithoutLeadInput>
  }

  export type AcAppointmentScalarWhereInput = {
    AND?: AcAppointmentScalarWhereInput | AcAppointmentScalarWhereInput[]
    OR?: AcAppointmentScalarWhereInput[]
    NOT?: AcAppointmentScalarWhereInput | AcAppointmentScalarWhereInput[]
    id?: StringFilter<"AcAppointment"> | string
    tenantId?: StringFilter<"AcAppointment"> | string
    leadId?: StringFilter<"AcAppointment"> | string
    service?: StringFilter<"AcAppointment"> | string
    startAt?: DateTimeFilter<"AcAppointment"> | Date | string
    durationMin?: IntFilter<"AcAppointment"> | number
    status?: EnumAcAppointmentStatusFilter<"AcAppointment"> | $Enums.AcAppointmentStatus
    createdAt?: DateTimeFilter<"AcAppointment"> | Date | string
    updatedAt?: DateTimeFilter<"AcAppointment"> | Date | string
  }

  export type AcLeadCreateWithoutConversationsInput = {
    id?: string
    tenantId: string
    name: string
    phone?: string | null
    email?: string | null
    stage?: $Enums.AcLeadStage
    notes?: string | null
    nextFollowUpAt?: Date | string | null
    ai?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AcAppointmentCreateNestedManyWithoutLeadInput
  }

  export type AcLeadUncheckedCreateWithoutConversationsInput = {
    id?: string
    tenantId: string
    name: string
    phone?: string | null
    email?: string | null
    stage?: $Enums.AcLeadStage
    notes?: string | null
    nextFollowUpAt?: Date | string | null
    ai?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AcAppointmentUncheckedCreateNestedManyWithoutLeadInput
  }

  export type AcLeadCreateOrConnectWithoutConversationsInput = {
    where: AcLeadWhereUniqueInput
    create: XOR<AcLeadCreateWithoutConversationsInput, AcLeadUncheckedCreateWithoutConversationsInput>
  }

  export type AcMessageCreateWithoutConversationInput = {
    id?: string
    tenantId: string
    at?: Date | string
    from: $Enums.AcMessageFrom
    text: string
  }

  export type AcMessageUncheckedCreateWithoutConversationInput = {
    id?: string
    tenantId: string
    at?: Date | string
    from: $Enums.AcMessageFrom
    text: string
  }

  export type AcMessageCreateOrConnectWithoutConversationInput = {
    where: AcMessageWhereUniqueInput
    create: XOR<AcMessageCreateWithoutConversationInput, AcMessageUncheckedCreateWithoutConversationInput>
  }

  export type AcMessageCreateManyConversationInputEnvelope = {
    data: AcMessageCreateManyConversationInput | AcMessageCreateManyConversationInput[]
    skipDuplicates?: boolean
  }

  export type AcLeadUpsertWithoutConversationsInput = {
    update: XOR<AcLeadUpdateWithoutConversationsInput, AcLeadUncheckedUpdateWithoutConversationsInput>
    create: XOR<AcLeadCreateWithoutConversationsInput, AcLeadUncheckedCreateWithoutConversationsInput>
    where?: AcLeadWhereInput
  }

  export type AcLeadUpdateToOneWithWhereWithoutConversationsInput = {
    where?: AcLeadWhereInput
    data: XOR<AcLeadUpdateWithoutConversationsInput, AcLeadUncheckedUpdateWithoutConversationsInput>
  }

  export type AcLeadUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: EnumAcLeadStageFieldUpdateOperationsInput | $Enums.AcLeadStage
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    nextFollowUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ai?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AcAppointmentUpdateManyWithoutLeadNestedInput
  }

  export type AcLeadUncheckedUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: EnumAcLeadStageFieldUpdateOperationsInput | $Enums.AcLeadStage
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    nextFollowUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ai?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AcAppointmentUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type AcMessageUpsertWithWhereUniqueWithoutConversationInput = {
    where: AcMessageWhereUniqueInput
    update: XOR<AcMessageUpdateWithoutConversationInput, AcMessageUncheckedUpdateWithoutConversationInput>
    create: XOR<AcMessageCreateWithoutConversationInput, AcMessageUncheckedCreateWithoutConversationInput>
  }

  export type AcMessageUpdateWithWhereUniqueWithoutConversationInput = {
    where: AcMessageWhereUniqueInput
    data: XOR<AcMessageUpdateWithoutConversationInput, AcMessageUncheckedUpdateWithoutConversationInput>
  }

  export type AcMessageUpdateManyWithWhereWithoutConversationInput = {
    where: AcMessageScalarWhereInput
    data: XOR<AcMessageUpdateManyMutationInput, AcMessageUncheckedUpdateManyWithoutConversationInput>
  }

  export type AcMessageScalarWhereInput = {
    AND?: AcMessageScalarWhereInput | AcMessageScalarWhereInput[]
    OR?: AcMessageScalarWhereInput[]
    NOT?: AcMessageScalarWhereInput | AcMessageScalarWhereInput[]
    id?: StringFilter<"AcMessage"> | string
    tenantId?: StringFilter<"AcMessage"> | string
    conversationId?: StringFilter<"AcMessage"> | string
    at?: DateTimeFilter<"AcMessage"> | Date | string
    from?: EnumAcMessageFromFilter<"AcMessage"> | $Enums.AcMessageFrom
    text?: StringFilter<"AcMessage"> | string
  }

  export type AcConversationCreateWithoutMessagesInput = {
    id?: string
    tenantId: string
    channel: string
    unreadCount?: number
    lastAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    lead: AcLeadCreateNestedOneWithoutConversationsInput
  }

  export type AcConversationUncheckedCreateWithoutMessagesInput = {
    id?: string
    tenantId: string
    leadId: string
    channel: string
    unreadCount?: number
    lastAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AcConversationCreateOrConnectWithoutMessagesInput = {
    where: AcConversationWhereUniqueInput
    create: XOR<AcConversationCreateWithoutMessagesInput, AcConversationUncheckedCreateWithoutMessagesInput>
  }

  export type AcConversationUpsertWithoutMessagesInput = {
    update: XOR<AcConversationUpdateWithoutMessagesInput, AcConversationUncheckedUpdateWithoutMessagesInput>
    create: XOR<AcConversationCreateWithoutMessagesInput, AcConversationUncheckedCreateWithoutMessagesInput>
    where?: AcConversationWhereInput
  }

  export type AcConversationUpdateToOneWithWhereWithoutMessagesInput = {
    where?: AcConversationWhereInput
    data: XOR<AcConversationUpdateWithoutMessagesInput, AcConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type AcConversationUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    unreadCount?: IntFieldUpdateOperationsInput | number
    lastAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lead?: AcLeadUpdateOneRequiredWithoutConversationsNestedInput
  }

  export type AcConversationUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    unreadCount?: IntFieldUpdateOperationsInput | number
    lastAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcLeadCreateWithoutAppointmentsInput = {
    id?: string
    tenantId: string
    name: string
    phone?: string | null
    email?: string | null
    stage?: $Enums.AcLeadStage
    notes?: string | null
    nextFollowUpAt?: Date | string | null
    ai?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: AcConversationCreateNestedManyWithoutLeadInput
  }

  export type AcLeadUncheckedCreateWithoutAppointmentsInput = {
    id?: string
    tenantId: string
    name: string
    phone?: string | null
    email?: string | null
    stage?: $Enums.AcLeadStage
    notes?: string | null
    nextFollowUpAt?: Date | string | null
    ai?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: AcConversationUncheckedCreateNestedManyWithoutLeadInput
  }

  export type AcLeadCreateOrConnectWithoutAppointmentsInput = {
    where: AcLeadWhereUniqueInput
    create: XOR<AcLeadCreateWithoutAppointmentsInput, AcLeadUncheckedCreateWithoutAppointmentsInput>
  }

  export type AcLeadUpsertWithoutAppointmentsInput = {
    update: XOR<AcLeadUpdateWithoutAppointmentsInput, AcLeadUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<AcLeadCreateWithoutAppointmentsInput, AcLeadUncheckedCreateWithoutAppointmentsInput>
    where?: AcLeadWhereInput
  }

  export type AcLeadUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: AcLeadWhereInput
    data: XOR<AcLeadUpdateWithoutAppointmentsInput, AcLeadUncheckedUpdateWithoutAppointmentsInput>
  }

  export type AcLeadUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: EnumAcLeadStageFieldUpdateOperationsInput | $Enums.AcLeadStage
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    nextFollowUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ai?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: AcConversationUpdateManyWithoutLeadNestedInput
  }

  export type AcLeadUncheckedUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: EnumAcLeadStageFieldUpdateOperationsInput | $Enums.AcLeadStage
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    nextFollowUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ai?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: AcConversationUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type AcFollowupStepCreateWithoutSettingsInput = {
    id?: string
    tenantId: string
    stepKey: string
    afterHours: number
    message: string
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AcFollowupStepUncheckedCreateWithoutSettingsInput = {
    id?: string
    tenantId: string
    stepKey: string
    afterHours: number
    message: string
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AcFollowupStepCreateOrConnectWithoutSettingsInput = {
    where: AcFollowupStepWhereUniqueInput
    create: XOR<AcFollowupStepCreateWithoutSettingsInput, AcFollowupStepUncheckedCreateWithoutSettingsInput>
  }

  export type AcFollowupStepCreateManySettingsInputEnvelope = {
    data: AcFollowupStepCreateManySettingsInput | AcFollowupStepCreateManySettingsInput[]
    skipDuplicates?: boolean
  }

  export type AcFollowupStepUpsertWithWhereUniqueWithoutSettingsInput = {
    where: AcFollowupStepWhereUniqueInput
    update: XOR<AcFollowupStepUpdateWithoutSettingsInput, AcFollowupStepUncheckedUpdateWithoutSettingsInput>
    create: XOR<AcFollowupStepCreateWithoutSettingsInput, AcFollowupStepUncheckedCreateWithoutSettingsInput>
  }

  export type AcFollowupStepUpdateWithWhereUniqueWithoutSettingsInput = {
    where: AcFollowupStepWhereUniqueInput
    data: XOR<AcFollowupStepUpdateWithoutSettingsInput, AcFollowupStepUncheckedUpdateWithoutSettingsInput>
  }

  export type AcFollowupStepUpdateManyWithWhereWithoutSettingsInput = {
    where: AcFollowupStepScalarWhereInput
    data: XOR<AcFollowupStepUpdateManyMutationInput, AcFollowupStepUncheckedUpdateManyWithoutSettingsInput>
  }

  export type AcFollowupStepScalarWhereInput = {
    AND?: AcFollowupStepScalarWhereInput | AcFollowupStepScalarWhereInput[]
    OR?: AcFollowupStepScalarWhereInput[]
    NOT?: AcFollowupStepScalarWhereInput | AcFollowupStepScalarWhereInput[]
    id?: StringFilter<"AcFollowupStep"> | string
    tenantId?: StringFilter<"AcFollowupStep"> | string
    settingsId?: StringFilter<"AcFollowupStep"> | string
    stepKey?: StringFilter<"AcFollowupStep"> | string
    afterHours?: IntFilter<"AcFollowupStep"> | number
    message?: StringFilter<"AcFollowupStep"> | string
    enabled?: BoolFilter<"AcFollowupStep"> | boolean
    sortOrder?: IntFilter<"AcFollowupStep"> | number
    createdAt?: DateTimeFilter<"AcFollowupStep"> | Date | string
    updatedAt?: DateTimeFilter<"AcFollowupStep"> | Date | string
  }

  export type AcSettingsCreateWithoutFollowupStepsInput = {
    id?: string
    tenantId: string
    businessName?: string
    timezone?: string
    hoursJson?: NullableJsonNullValueInput | InputJsonValue
    servicesJson?: NullableJsonNullValueInput | InputJsonValue
    faqsJson?: NullableJsonNullValueInput | InputJsonValue
    qualQsJson?: NullableJsonNullValueInput | InputJsonValue
    bookingJson?: NullableJsonNullValueInput | InputJsonValue
    followupsJson?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AcSettingsUncheckedCreateWithoutFollowupStepsInput = {
    id?: string
    tenantId: string
    businessName?: string
    timezone?: string
    hoursJson?: NullableJsonNullValueInput | InputJsonValue
    servicesJson?: NullableJsonNullValueInput | InputJsonValue
    faqsJson?: NullableJsonNullValueInput | InputJsonValue
    qualQsJson?: NullableJsonNullValueInput | InputJsonValue
    bookingJson?: NullableJsonNullValueInput | InputJsonValue
    followupsJson?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AcSettingsCreateOrConnectWithoutFollowupStepsInput = {
    where: AcSettingsWhereUniqueInput
    create: XOR<AcSettingsCreateWithoutFollowupStepsInput, AcSettingsUncheckedCreateWithoutFollowupStepsInput>
  }

  export type AcSettingsUpsertWithoutFollowupStepsInput = {
    update: XOR<AcSettingsUpdateWithoutFollowupStepsInput, AcSettingsUncheckedUpdateWithoutFollowupStepsInput>
    create: XOR<AcSettingsCreateWithoutFollowupStepsInput, AcSettingsUncheckedCreateWithoutFollowupStepsInput>
    where?: AcSettingsWhereInput
  }

  export type AcSettingsUpdateToOneWithWhereWithoutFollowupStepsInput = {
    where?: AcSettingsWhereInput
    data: XOR<AcSettingsUpdateWithoutFollowupStepsInput, AcSettingsUncheckedUpdateWithoutFollowupStepsInput>
  }

  export type AcSettingsUpdateWithoutFollowupStepsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    hoursJson?: NullableJsonNullValueInput | InputJsonValue
    servicesJson?: NullableJsonNullValueInput | InputJsonValue
    faqsJson?: NullableJsonNullValueInput | InputJsonValue
    qualQsJson?: NullableJsonNullValueInput | InputJsonValue
    bookingJson?: NullableJsonNullValueInput | InputJsonValue
    followupsJson?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcSettingsUncheckedUpdateWithoutFollowupStepsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    hoursJson?: NullableJsonNullValueInput | InputJsonValue
    servicesJson?: NullableJsonNullValueInput | InputJsonValue
    faqsJson?: NullableJsonNullValueInput | InputJsonValue
    qualQsJson?: NullableJsonNullValueInput | InputJsonValue
    bookingJson?: NullableJsonNullValueInput | InputJsonValue
    followupsJson?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcConversationCreateManyLeadInput = {
    id?: string
    tenantId: string
    channel: string
    unreadCount?: number
    lastAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AcAppointmentCreateManyLeadInput = {
    id?: string
    tenantId: string
    service: string
    startAt: Date | string
    durationMin: number
    status?: $Enums.AcAppointmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AcConversationUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    unreadCount?: IntFieldUpdateOperationsInput | number
    lastAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: AcMessageUpdateManyWithoutConversationNestedInput
  }

  export type AcConversationUncheckedUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    unreadCount?: IntFieldUpdateOperationsInput | number
    lastAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: AcMessageUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type AcConversationUncheckedUpdateManyWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    unreadCount?: IntFieldUpdateOperationsInput | number
    lastAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcAppointmentUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    service?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMin?: IntFieldUpdateOperationsInput | number
    status?: EnumAcAppointmentStatusFieldUpdateOperationsInput | $Enums.AcAppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcAppointmentUncheckedUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    service?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMin?: IntFieldUpdateOperationsInput | number
    status?: EnumAcAppointmentStatusFieldUpdateOperationsInput | $Enums.AcAppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcAppointmentUncheckedUpdateManyWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    service?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMin?: IntFieldUpdateOperationsInput | number
    status?: EnumAcAppointmentStatusFieldUpdateOperationsInput | $Enums.AcAppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcMessageCreateManyConversationInput = {
    id?: string
    tenantId: string
    at?: Date | string
    from: $Enums.AcMessageFrom
    text: string
  }

  export type AcMessageUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    at?: DateTimeFieldUpdateOperationsInput | Date | string
    from?: EnumAcMessageFromFieldUpdateOperationsInput | $Enums.AcMessageFrom
    text?: StringFieldUpdateOperationsInput | string
  }

  export type AcMessageUncheckedUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    at?: DateTimeFieldUpdateOperationsInput | Date | string
    from?: EnumAcMessageFromFieldUpdateOperationsInput | $Enums.AcMessageFrom
    text?: StringFieldUpdateOperationsInput | string
  }

  export type AcMessageUncheckedUpdateManyWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    at?: DateTimeFieldUpdateOperationsInput | Date | string
    from?: EnumAcMessageFromFieldUpdateOperationsInput | $Enums.AcMessageFrom
    text?: StringFieldUpdateOperationsInput | string
  }

  export type AcFollowupStepCreateManySettingsInput = {
    id?: string
    tenantId: string
    stepKey: string
    afterHours: number
    message: string
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AcFollowupStepUpdateWithoutSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    stepKey?: StringFieldUpdateOperationsInput | string
    afterHours?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcFollowupStepUncheckedUpdateWithoutSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    stepKey?: StringFieldUpdateOperationsInput | string
    afterHours?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcFollowupStepUncheckedUpdateManyWithoutSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    stepKey?: StringFieldUpdateOperationsInput | string
    afterHours?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}