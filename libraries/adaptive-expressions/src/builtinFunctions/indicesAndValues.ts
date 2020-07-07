import { ExpressionEvaluator, EvaluateExpressionDelegate } from '../expressionEvaluator';
import { ReturnType, Expression } from '../expression';
import { ExpressionType } from '../expressionType';
import { FunctionUtils } from '../functionUtils';
import { Options } from '../options';

export class IndicesAndValues extends ExpressionEvaluator {
    public constructor(){
        super(ExpressionType.IndicesAndValues, IndicesAndValues.evaluator, ReturnType.Array, FunctionUtils.validateUnary);
    }

    private static evaluator(expression: Expression, state: any, options: Options): {value: any; error: string} {
        let result: object = undefined;
        let error: string = undefined;
        let value: any = undefined;
        ({value, error} = expression.children[0].tryEvaluate(state, options));
        if (error === undefined) {
            if (Array.isArray(value)) {
                const tempList = [];
                for (let i = 0; i < value.length; i++) {
                    tempList.push({index: i, value: value[i]});
                }

                result = tempList;
            } else if (typeof value === 'object') {
                const tempList = [];
                for (let [index, val] of Object.entries(value)) {
                    tempList.push({index: index, value: val});
                }

                result = tempList;
            } else {
                error = `${expression.children[0]} is not array or object.`;
            }
        }

        return {value: result, error};
    }
}