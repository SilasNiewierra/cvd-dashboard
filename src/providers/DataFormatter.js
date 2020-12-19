class DataFormatter {
    numberWithSeperator(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        // Directly return the joined string
        return splitStr.join(' ');
    }

    formatDate(unformattedDate){
        var dateString = unformattedDate;
        dateString = dateString.split('T')[0];
        let split = dateString.split('-');
        dateString = split[2]+"."+split[1]+"."+split[0];
        return dateString;
    }
}

export default DataFormatter;