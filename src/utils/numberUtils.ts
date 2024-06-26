const numberToLetter = (num) => {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    } else {
        return num;
    }
};

function toFixedIfNecessary(value, dp): number {
    return value ? +parseFloat(value).toFixed(dp) : 0;
}
function removeUnecessaryZero(value, dp) {
    return +parseFloat(value).toFixed(dp);
}

const sum = (array, keyword?: string, defaultValue?) => {
    return (
        array?.reduce((total, item) => {
            let temp = parseInt(keyword ? item[keyword] : item);
            if (isNaN(temp)) temp = 0;
            return total + (temp || defaultValue);
        }, 0) || 0
    );
};

export function formatPrice(price) {
    return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export function formatNumberToMK(num: number, float?: number) {
    if (num >= 1000 && num < 1000000) {
        return (num / 1000).toFixed(float || 1) + 'K';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(float || 1) + 'm';
    } else {
        return float ? num.toFixed(float) : num.toString();
    }
}
/**
 * @returns Minimum value = 0
 */
const max = (array, keyword?: string) => {
    if (!array?.length) return 0;
    else
        return array.reduce((maxVal, item) => {
            if (keyword) {
                if (item[keyword] > maxVal) maxVal = item[keyword];
            } else {
                if (item > maxVal) maxVal = item;
            }
            return maxVal;
        }, -1);
    // let res = -1
    // array?.forEach(ele => {
    //     if (keyword) {
    //         if (ele[keyword] > res)
    //             res = ele[keyword]
    //     } else {
    //         if (ele > res)
    //             res = ele
    //     }
    // });
    // return res
};

const calcDecimal = (value: number, decimal: number) => {
    let res = value;
    for (let i = 0; i < decimal; i++) {
        res /= 10;
    }
    return res;
};

export { numberToLetter, toFixedIfNecessary, sum, max, calcDecimal };

export function fillArrayWithNumbers(n) {
    var arr = Array.apply(null, Array(n));
    return arr.map(function (x, i) {
        return i;
    });
}
