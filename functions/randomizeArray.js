/**
 * Function   :   Randomize Array
 *
 * Description:   Randomizes the order of an array's content
 *
 * Parameters :   Array
 *
 * Returns    :   Randomized Array
 */

const randomizeArray = (arrayIn) => {
  for (let i = arrayIn.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = arrayIn[i];
    arrayIn[i] = arrayIn[j];
    arrayIn[j] = temp;
  }

  const arrayOut = arrayIn;

  return arrayOut;
};

module.exports = randomizeArray;
