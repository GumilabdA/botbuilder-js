/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { ExpressionEvaluator } from '../expressionEvaluator';
import { Expression } from '../expression';
import { ReturnType } from '../returnType';
import { ExpressionType } from '../expressionType';
import { FunctionUtils } from '../functionUtils';
import { MemoryInterface } from '../memory/memoryInterface';
import { Options } from '../options';

/**
 * Convert ticks to hours number.
 */
export class TicksToHours extends ExpressionEvaluator {

    private static readonly TicksPerHour: number = 60 * 60 * 10000000;

    public constructor(){
        super(ExpressionType.TicksToHours, TicksToHours.evaluator, ReturnType.Number, FunctionUtils.validateUnaryNumber);
    }

    private static evaluator(expr: Expression, state: MemoryInterface, options: Options): {value: any; error: string} {
        let value: any;
        let error: string;
        let args: any[];
        ({args, error} = FunctionUtils.evaluateChildren(expr, state, options));
        if (!error) {
            if (Number.isInteger(args[0])) {
                value = args[0] / TicksToHours.TicksPerHour;
            } else {
                error = `${expr} should contain an integer of ticks`;
            }
        }

        return {value, error};
    }
}