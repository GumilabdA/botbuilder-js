/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { Expression } from '../expression';
import { ExpressionEvaluator } from '../expressionEvaluator';
import { ExpressionType } from '../expressionType';
import { FunctionUtils } from '../functionUtils';
import { MemoryInterface } from '../memory/memoryInterface';
import { Options } from '../options';
import { ReturnType } from '../returnType';

/**
 * Check whether at least one expression is true.
 * Return true if at least one expression is true, or return false if all are false.
 */
export class Or extends ExpressionEvaluator {
    public constructor() {
        super(ExpressionType.Or, Or.evaluator, ReturnType.Boolean, FunctionUtils.validateAtLeastOne);
    }

    private static evaluator(expression: Expression, state: MemoryInterface, options: Options): { value: any; error: string } {
        let result = false;
        let error: string;
        for (const child of expression.children) {
            const newOptions = new Options(options);
            newOptions.nullSubstitution = undefined;
            ({ value: result, error } = child.tryEvaluate(state, newOptions));
            if (!error) {
                if (FunctionUtils.isLogicTrue(result)) {
                    result = true;
                    break;
                }
            } else {
                error = undefined;
            }
        }

        return { value: result, error };
    }
}