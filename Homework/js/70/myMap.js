function myMap(array, callback) {
    const newArry = [];
    for (let i = 0; i < array.length; i++) {
        newArry.push(callback(array[i], i, array));
        let array1 = array

    }
    return newArry;
};