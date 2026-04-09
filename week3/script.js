function Swap(first, second) {
    let temp = first;
    first = second;
    second = temp;
    console.log(first, second);
}
function Compare(num1, num2) {
    if(num1 > num2) {
        return num1;
    }
    else if(num2 > num1) {
        return num2;
    }
    else {
        return 'equal';
    }
}
function isEven(num) {
    return num % 2 === 0 ? true : false;
}
function Average(num_list) {
    let sum = 0;
    /*for(let i = 0; i < num_list.length; i++) {
        //sum = sum + num_list[i];
        sum += num_list[i];
    }*/
    for(num of num_list) {
        sum += num;
    }
    return sum / num_list.length;
}
function Max(num_list) {
    try {
        let max = num_list[0];
        for(num of num_list) {
            if(num > max)
                max = num;
        }
        return max;
    }
    catch(err) {
        return 'Error: ' + err.message;
    }
}
function WhichMonth(month) {
    let month_name = '';
    switch(month) {
        case 1:
            month_name = 'January';
            break;
        case 2:
            month_name = "February";
            break;
        default:
            month_name = 'invalid month number';
            break;
    }
    return month_name;
}
const num_list = [1, 4, 32, -43, 32.4, 212, 121, -431321, 411, 3114, 5, 45, 562, -12121, 750];
console.log(Max(-1));
