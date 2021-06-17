import { mathMethod } from './math';

// This function will convert many cases like: -a - (-b), a + (-b)
// to normal form (e.g: b - a or a - b).

export default function getResult(first, second, option) {
  // Remove "+" in front of input if any
  let firstVal = first.slice();
  let secondVal = second.slice();
  if (firstVal[0] === '+') firstVal = firstVal.substr(1);
  if (secondVal[0] === '+') secondVal = secondVal.substr(1);

  switch (option) {
    case '+':
      // Adding here
      if (firstVal[0] === '-' && secondVal[0] === '-') {
        // Remove unary op
        firstVal = firstVal.substr(1);
        secondVal = secondVal.substr(1);
        // result = - (firstVal + secondVal)
        return `-${mathMethod.findSum(firstVal, secondVal)}`;
      } if (firstVal[0] === '-') {
        // This means result = secondVal - firstVal
        // Remove unary op "-"
        firstVal = firstVal.substr(1);
        // If secondVal < firstVal, result = - (firstVal - secondVal)
        if (mathMethod.isSmaller(secondVal, firstVal)) {
          return `-${mathMethod.findDifference(firstVal, secondVal)}`;
        }
        // If secondVal >= firstVal, result = secondVal - firstVal
        return mathMethod.findDifference(secondVal, firstVal);
      } if (secondVal[0] === '-') {
        // This means result = firstVal - secondVal
        // Remove unary op "-"
        secondVal = secondVal.substr(1);
        // If firstVal < secondVal, result = - (secondVal - firstVal)
        if (mathMethod.isSmaller(firstVal, secondVal)) {
          return `-${mathMethod.findDifference(secondVal, firstVal)}`;
        }
        // If firstVal >= secondVal, result = firstVal - secondVal
        return mathMethod.findDifference(firstVal, secondVal);
      }
      // Normal sum, result = firstVal + secondVal
      return mathMethod.findSum(firstVal, secondVal);

    case '-':
      // Subtracting here
      // result = secondVal - firstVal
      if (firstVal[0] === '-' && secondVal[0] === '-') {
        // Remove unary op "-"
        firstVal = firstVal.substr(1);
        secondVal = secondVal.substr(1);

        // If secondVal < firstVal, result = - (firstVal - secondVal)
        if (mathMethod.isSmaller(secondVal, firstVal)) {
          return `-${mathMethod.findDifference(firstVal, secondVal)}`;
        }
        // If secondVal >= firstVal, result = secondVal - firstVal
        return mathMethod.findDifference(secondVal, firstVal);
      } if (firstVal[0] === '-') {
        // result = - (firstVal + secondVal)
        firstVal = firstVal.substr(1);
        return `-${mathMethod.findSum(firstVal, secondVal)}`;
      } if (secondVal[0] === '-') {
        // result = firstVal + secondVal
        secondVal = secondVal.substr(1);
        return mathMethod.findSum(firstVal, secondVal);
      }
      // result = firstVal - secondVal
      // If firstVal < secondVal, result = - (secondVal - firstVal)
      if (mathMethod.isSmaller(firstVal, secondVal)) {
        return `-${mathMethod.findDifference(secondVal, firstVal)}`;
      }
      // If firstVal >= secondVal, result = firstVal - secondVal
      return mathMethod.findDifference(firstVal, secondVal);

    case '*':
      // Multiplying here
      if (firstVal[0] === '-' && secondVal[0] === '-') {
        // Remove unary op
        firstVal = firstVal.substr(1);
        secondVal = secondVal.substr(1);
        // Normal multiplying
        return mathMethod.findProduct(firstVal, secondVal);
      } if (firstVal[0] === '-') {
        // Remove unary op
        firstVal = firstVal.substr(1);
        // Add unary op later
        return `-${mathMethod.findProduct(firstVal, secondVal)}`;
      } if (secondVal[0] === '-') {
        // Remove unary op
        secondVal = secondVal.substr(1);
        // Add unary op later
        return `-${mathMethod.findProduct(firstVal, secondVal)}`;
      }
      // Normal product, result = firstVal * secondVal
      return mathMethod.findProduct(firstVal, secondVal);

    default:
      break;
  }
  return 0;
}
