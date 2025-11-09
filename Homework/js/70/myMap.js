(function () {
    function myMap(array, callback) {
        const newArry = [];
        for (let i = 0; i < array.length; i++) {
            newArry.push(callback(array[i]));

        }
        return newArry;
    };

    function double(x) {
        return x * 2;
    }
    const nums = [3, 6, 9, 12];
    console.log(myMap(nums, double));
}());