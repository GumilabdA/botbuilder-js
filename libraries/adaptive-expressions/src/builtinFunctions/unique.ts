/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { ExpressionEvaluator, EvaluateExpressionDelegate } from '../expressionEvaluator';
import { Expression } from '../expression';
import { ReturnType } from '../returnType';
import { ExpressionType } from '../expressionType';
import { FunctionUtils } from '../functionUtils';

/**
 * Remove all duplicates from an array.
 */
export class Unique extends ExpressionEvaluator {
    public constructor(){
        super(ExpressionType.Unique, Unique.evaluator(), ReturnType.Array, Unique.validator);
    }

    private static evaluator(): EvaluateExpressionDelegate {
        return FunctionUtils.apply((args: any[]): any[] => [... new Set(args[0])]);
    }

    private static validator(expression: Expression): void {
        FunctionUtils.validateOrder(expression, [], ReturnType.Array);
    }
}