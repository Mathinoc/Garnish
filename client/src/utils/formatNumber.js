export function fractionView (value) {
  const valueString = value.toString();
  if (valueString.match('.').length) {
    console.log(valueString);
    console.log(valueString.match('.').length)
    let finalNumber = valueString.slice(0, valueString.indexOf('.'));
    if (finalNumber === '0') {
      finalNumber = []
    } else {
      finalNumber = [finalNumber]
    }
    const decimalPart = valueString.indexOf('.') !== '-1' && valueString.slice(valueString.indexOf('.')+1)
    let decimalFraction;
      if( decimalPart.slice(0,2) === '66'){
        console.log('ihi')
      	decimalFraction = '2/3';
        finalNumber.push('2/3');
        console.log(finalNumber)
      }
      else if (decimalPart.slice(0,2) === '33'){
        decimalFraction = '1/3';
        finalNumber.push('1/3');
      }
      else if (decimalPart.slice(0,1) === '5'){
        decimalFraction = '1/2';
        finalNumber.push('1/2');
      }
      else if (decimalPart.slice(0,2) === '25'){
        decimalFraction = '1/4';
        finalNumber.push('1/4');
      }
      else if (decimalPart.slice(0,2) === '75'){
        decimalFraction = '3/4';
        finalNumber.push('3/4');
      } else {
        return valueString
      }
      return finalNumber.join(' ')
    } else {
    	return valueString
    } 
}
