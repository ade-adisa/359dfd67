export const parseDate = (date) => {
    let newDate = new Date();
    if (!date) {
      return undefined;
    }
    if (Array.isArray(date)) {
      newDate = date[0];
    } else if (date instanceof Date) {
      newDate = date;
    } else if (typeof date === "string") {
      if (date.slice(-1) !== "Z") {
        newDate = new Date(date);
      } else {
        newDate = new Date(date.slice(0, date.length-1));
      }
    }
    return newDate;
  }

  const shortMonthOption = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  const shortTimeOption = {
    hour: "numeric",
    minute: "numeric",
  };
  
  export const FormatDate = (date) => {
    let newDate;
  
    if (date && date !== null) {
      newDate = parseDate(date)?.toLocaleDateString("en-US", shortMonthOption);
    }
  
    return newDate;
  }

  export const FormatTime = (date) => {
    let newDate;
  
    if (date) {
      newDate = parseDate(date)?.toLocaleTimeString("en-US", shortTimeOption);
    }
  
    return newDate;
  }
