export function truncAddress(address, beginLen, endLen, separator)  {
	if(address === undefined || address === null) return "";
    return address.substring(0, beginLen) + separator + address.substring(address.length - endLen);
}

export function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export function amountCent(amount)  {
    return parseInt(amount / 10**18) + "." + parseInt((amount / 10**16) % 100);
}

export function formatSize(value)  {
    let formatedSize = value + " bytes";
    if (value > 1024) {
        formatedSize = Math.floor(value / 1024) + " Kb";
    }
    if (value > (1024**2)) {
        formatedSize = Math.floor(value / (1024**2)) + " Mb";
    }
    if (value > (1024**3)) {
        formatedSize = Math.floor(value / (1024**3)) + " Gb";
    }
    return formatedSize;
}
