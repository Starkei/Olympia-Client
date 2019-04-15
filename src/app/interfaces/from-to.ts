/**
 * @description member from can be higher than member to
 * @example let fromTo: FromTo<number> = {from: 3, to: 5};
 * @param from - contains value of from with passed type "T"
 * @param to - contains value of to with passed type "T"
 * @export
 * @interface FromTo
 * @template T - type of members {from} and {to}
 */
export interface FromTo<T> {
  from: T;
  to: T;
}
