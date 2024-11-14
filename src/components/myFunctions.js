import countriesListJson from '../data/Countries_List.json'
import countryRules from '../data/CountryRules.json'


// date object, value validation
export function dateValidation (date) {
  let value = false;

  value = isNaN(date) !== true && true; 
  value = date !== null && true;
  if (date !== null) {
    value = date.$y > 1970 && true;
  }

  return value
}


// API date object, value validation
export function apiDateValidation (date) {
  let value = false;
  let currDate = new Date();

  if (dateValidation(date) === true) {
    value = date.$d > currDate ? false : true;
  };

  return value
}


// Calculate days total number between dates. Take only days, not time value from obj.
export function daysTotalCount (dateStart, dateEnd) {
  var value = null;
  if (dateStart !== null && dateEnd !== null) {
    let startDate = dateStart.set('hour',0).set('minute',0);
    let endDate = dateEnd.set('hour',0).set('minute',1);
    value = Math.ceil( endDate.diff(startDate, 'day', true));
  } else {value = null}

  return value
}


// Calculate and create list of days per country
export function listOfDays (dateStart, dateEnd, xCountry, idCnt = 0) {
  let hrs = 0;
  let mins = 0;

  if ((dateStart.format('YYYY-MM-DD')) === (dateEnd.format('YYYY-MM-DD'))) {
    hrs = timeHrs(dateStart, dateEnd);
    mins = timeConvert(dateStart, dateEnd, 'm');
    // eslint-disable-next-line
    var dates = [{id: idCnt++, country: xCountry, date: dateEnd.format('YYYY-MM-DD'), h: hrs, m: mins, brfst: false, din: false, sup: false, dish: 0, prcnt: 0}];

    return dates

  } else {
    let date = dateStart;
    hrs = timeHrs(date, date.endOf('day'));
    mins = timeConvert(date, date.endOf('day'), 'm');
    // eslint-disable-next-line
    var dates = [{id: idCnt++, country: xCountry, date: date.format('YYYY-MM-DD'), h: hrs, m: mins, brfst: false, din: false, sup: false, dish: 0, prcnt: 0}];
    do {
      date = date.add(1, 'day');
      hrs = (date.format('YYYY-MM-DD') === dateEnd.format('YYYY-MM-DD')) ? 
              timeHrs(date.startOf('day'), dateEnd)
              : 
              timeHrs(date.startOf('day'), date.endOf('day'));

      mins = (date.format('YYYY-MM-DD') === dateEnd.format('YYYY-MM-DD')) ? 
              timeConvert(date.startOf('day'), dateEnd, 'm')
              : 
              timeConvert(date.startOf('day'), date.endOf('day'), 'm');
      dates.push({id: idCnt++, country: xCountry, date: date.format('YYYY-MM-DD'), h: hrs, m: mins, brfst: false, din: false, sup: false, dish: 0, prcnt: 0});
    } while (date.isBefore(dateEnd.format('YYYY-MM-DD')));

    return dates
  }
}


export function timeHrs (dateStart, dateEnd) {
  // Calculate date diff in minutes
  let num = ((dateEnd - dateStart)/ 60_000);
  let hours = (num / 60);
  
  return hours.toFixed(2)
}


export function timeConvert (dateStart, dateEnd, funCalc = 'value', dateStart2 = 0, dateEnd2 = 0) {
  // Calculate date diff in minutes
  var num2 = ((dateEnd2 - dateStart2)/ 60_000);
  var num = ((dateEnd - dateStart)/ 60_000) + num2;
  // Calculate the total hours by dividing the number of minutes by 60
  var hours = (num / 60);
  // Round down the total hours to get the number of full hours
  var rhours = Math.floor(hours);
  // days
  var days = Math.floor((rhours / 24));
  // Round down left hours
  var zhours = Math.floor((rhours - (days * 24)));
  // Calculate the remaining minutes after subtracting the full hours from the total hours
  var minutes = Math.round((hours - rhours) * 60);

  // if (minutes === 60.00 && zhours === 23) {zhours = zhours + 1; minutes = 0};
  if (minutes === 60.00) {zhours = zhours + 1; minutes = 0};
      
  // Construct and return a string representing the conversion result
  var returnValue = {d: days, h: zhours, m: minutes, value: (days + 'd:' + zhours + 'h:' + minutes + 'm'), minsValue: (zhours + 'h:' + minutes + 'm')} 

  // possible results return, based on input arg 'funCalc'
  switch(funCalc) {
    case 'm':
      return returnValue.minsValue;
      // break;
    case 'dhm':
      return [returnValue];
      // break;
    default:
      return returnValue.value;
  }
    
}


// Get selected country data from Countries json file
export function countryData (countryName) {
  const record = countriesListJson
                  .filter((data) => {
                    const Countries = (data.Country_EN);
                    return Countries.includes(countryName);
                  });
  return record
}


// Diet calculations Domestic country
export function dietCalculationDom(data) {
  const rules = countryRules[0];
  var dataObj = data[0];
  var dietQty = rules.shortTrip_less_8

  if (dataObj.d === 0) {
    dietQty = (dataObj.h >= 8 && dataObj.h < 12) ? rules.shortTrip_btween_8and12 : dietQty;
    dietQty = dataObj.h >= 12 ? rules.shortTrip_day : dietQty;
  } else {
    dietQty = dataObj.h < 8 ? (dataObj.d + rules.longTrip_less_8) : dietQty;
    dietQty = dataObj.h >= 8 ? (dataObj.d + rules.longTrip_over_8) : dietQty;
  } 

  return dietQty
}


// Diet calculations other countries
export function dietCalculation(data) {
  const rules = countryRules[1];
  var dataObj = data[0];
  var dietQty = rules.shortTrip_less_8

  if (dataObj.d === 0) {
    dietQty = (dataObj.h >= 8 && dataObj.h < 12) ? rules.shortTrip_btween_8and12 : dietQty;
    dietQty = dataObj.h >= 12 ? rules.shortTrip_day : dietQty;
  } else {
    dietQty = dataObj.h < 8 ? (dataObj.d + dietQty) : dietQty;
    dietQty = (dataObj.h >= 8 && dataObj.h < 12) ? (dataObj.d + rules.shortTrip_btween_8and12) : dietQty;
    // dietQty = dataObj.h >= 12 ? (dataObj.d + rules.longTrip_over_8) : dietQty;
    dietQty = dataObj.h >= 12 ? (dataObj.d + rules.shortTrip_day) : dietQty;
  }
  
  return dietQty
}


// Final calculations
export function dietFinalCalculation(data, idCnt = 0) {
  let currencyVal = data.Currency;
  let ver2or1 = data.countryTimes.extCountry2Start !== '' ? true : false;
  var dCountryData = null;
  var dietsVal = 0;
  var dietsValDom = 0;

  var countryData = dishCutting(data.daysList, data.country);
  if (ver2or1 === true) {
    // more than one country
    dCountryData = dishCutting(data.daysList, data.dCountry);
    dietsVal = Number(((data.countryDiet - countryData[0].totalSum) * (data.countryData[0].Kwota_diety)).toFixed(2));
    dietsValDom = Number(((data.dCountryDiet - dCountryData[0].totalSum) * (data.dCountryRec[0].Kwota_diety)).toFixed(2));
    dietsValDom = dietsValDom < 0 ? 0 : dietsValDom;
  } else {
    // only one, domestic country
    dCountryData = countryData;
    dietsVal = Number(((data.countryDiet - countryData[0].totalSum) * (data.countryData[0].Kwota_diety)).toFixed(2));
    dietsValDom = Number(((data.dCountryDiet - countryData[0].totalSum) * (data.dCountryRec[0].Kwota_diety)).toFixed(2));
    dietsValDom = dietsValDom < 0 ? 0 : dietsValDom;
  };

  let listFinalCalc = [{
    id: idCnt++,
    date: ver2or1 !== false ? data.countryTimes.extCountry2Start.format('YYYY-MM-DD') : '',
    curr: data.CurrencyCode,
    diets: ver2or1 !== false ? dietsVal.toFixed(2) : 0, // 151.25,
    ratePLN: currencyVal,
    valuePLN: ver2or1 !== false ? (dietsVal * currencyVal).toFixed(2) : 0,
    dateSettl: data.apiCurrencyDate,
    dietCutt: countryData[0].totalSum === 0 ? 0 : -countryData[0].totalSum,
  },
  {
    id: 1,
    date: data.countryTimes.domCountry1Start.format('YYYY-MM-DD'),
    curr: data.dCountryRec[0].Waluta,
    diets: dietsValDom === 0 ? 0 : dietsValDom.toFixed(2), // "22,50",
    ratePLN: 1,
    valuePLN: dietsValDom === 0 ? 0 : dietsValDom.toFixed(2),
    dateSettl: "",
    dietCutt: dCountryData[0].totalSum === 0 ? 0 : -dCountryData[0].totalSum,
  },]

  return listFinalCalc
}


// Count dishes cutting per country and country rules from json files
function dishCutting(data, selCountry) {
  let dietCutTotal = 0;
  let countryData = data.filter(row => row.country === selCountry);
  let rules = countryRules.filter(row => row.country === selCountry);
  if (rules.length === 0) {rules = countryRules.filter(row => row.country === 'other')};

  // eslint-disable-next-line
  countryData.map((row) => {
    let dietCut = 0;
    if (row.brfst === true) {dietCut = dietCut + rules[0].breakfast};
    if (row.din === true) {dietCut = dietCut + rules[0].dinner};
    if (row.sup === true) {dietCut = dietCut + rules[0].supper};
    row.prcnt = dietCut.toFixed(2);
    dietCutTotal = Number((dietCutTotal + dietCut));
  });

  return [{value: countryData, totalSum: dietCutTotal}]
}