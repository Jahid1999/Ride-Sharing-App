import { StrContract } from './str-contract';
/**
 * Creates a new  providing chainable string operations. This new
 * instance clones the original string and works with the clone.
 * It won’t modify the original string value.
 *
 * @param value - `value` is the value being wrapped into an `Str` instance
 */
declare const strings: StrContract;
export = strings;
