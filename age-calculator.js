`use stict`;



const submitBtn = document.querySelector(`.submit-btn`);

const dayInp = document.querySelector(`#day`);
const monthInp = document.querySelector(`#month`);
const yearInp = document.querySelector(`#year`);

const daySpan = document.querySelector(`.span-day`);
const monthSpan = document.querySelector(`.span-month`);
const yearSpan = document.querySelector(`.span-year`);

const errorRequired = Array.from(document.getElementsByClassName(`error-required`));
const errorValid = Array.from(document.getElementsByClassName(`error-valid`));
const errorValidDate = document.querySelector(`.error-valid-date`);

const inputs = [dayInp, monthInp, yearInp]


let day;
let month;
let year;

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const currentDay = new Date().getDate();

const daysInMonth = new Map([
    [1, 31],
    [2, [28, 29]],
    [3, 31],
    [4, 30],
    [5, 31],
    [6, 30],
    [7, 31],
    [8, 31],
    [9, 30],
    [10, 31],
    [11, 30],
    [12, 31],
])


const checkIfinputsAreFilled = function() {
    inputs.forEach((el, ind) => {
        if(el.value === ``) {
            errorRequired[ind].classList.add(`display-block`)
            el.classList.add(`red-border`)

        } else {
            errorRequired[ind].classList.remove(`display-block`)
            el.classList.remove(`red-border`)

        }
    })

    if(dayInp.value !== `` && monthInp.value !== `` && yearInp.value !== ``) {
        return true
    } else {
        return false
    }
}

const checkIfYearIsInThePast = function (el) {
    if (el >= currentYear) {
        errorValid[2].classList.add(`display-block`)
        // yearInp.classList.add(`red-border`)
        yearInp.style.border =`1px solid #FF5959`        
       return false
    } else {
        errorValid[2].classList.remove(`display-block`)
        yearInp.style.border =``  
        return true
    }
}

const checkifMonthIsValid = function (el) {
    if(el > 12 || el < 1) {
        errorValid[1].classList.add(`display-block`);
        monthInp.style.border = `1px solid #FF5959`

        return false
    } else {
        errorValid[1].classList.remove(`display-block`);
        monthInp.style.border = ``

        return true
    }
}


const checkValidDay = function () {

    let a;

    let x;
    let y;

    if(month === 2 && year % 4 === 0) {
        [x, y] = daysInMonth.get(month)

        if (day > y) {
            errorValid[0].classList.add(`display-block`)
            dayInp.style.border = `1px solid #FF5959`

            return false
        } else {
            errorValid[0].classList.remove(`display-block`)
            dayInp.style.border = ``

            return true
        }

    } else if (month === 2 && year % 4 !== 0) {
        [x, y] = daysInMonth.get(month)

        if (day > x) {
            errorValid[0].classList.add(`display-block`)
            dayInp.style.border = `1px solid #FF5959`

            return false
            
        } else {
            errorValid[0].classList.remove(`display-block`)
            dayInp.style.border = ``

            return true
        }
    } else {
        a = daysInMonth.get(month) 
        if(day > a) {
            errorValid[0].classList.add(`display-block`)
            dayInp.style.border = `1px solid #FF5959`
            
            return false

        } else {
            errorValid[0].classList.remove(`display-block`)
            dayInp.style.border = ``

            return true
        }        
    }
}

const checkFirstLetter = function(stringMonth, stringDay) {

    stringMonth = String(monthInp.value);
    stringDay = String(dayInp.value);


    if(Number(stringMonth[0]) === 0 || Number(stringDay[0]) === 0) {
        errorValidDate.classList.add(`display-block`)
        dayInp.style.border = `1px solid #FF5959`
        monthInp.style.border = `1px solid #FF5959`
        yearInp.style.border = `1px solid #FF5959`

        return false
    } else {
        errorValidDate.classList.remove(`display-block`)

        dayInp.style.border = ``
        monthInp.style.border = ``
        yearInp.style.border = ``

        return true
    }

}

// const currentYear = new Date().getFullYear()


const calcYears = function(year) {

    // const currentYear = new Date().getFullYear()

    const youAreYears = currentYear - year
    yearSpan.textContent = `${youAreYears - 1}`
}



const calcMonth= function (month) {
        if(currentDay > dayInp.value) {
            monthSpan.textContent = `${12 - Math.abs(currentMonth - month)}` 
        } else {

            monthSpan.textContent = `${12 - Math.abs((currentMonth - month- 1))}`

            // return 12 - Math.abs((currentMonth - Number(monthInp.value)- 1))
        }
    }


function daysInLastMonth() {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();
      
        
        const currentMonthStart = new Date(currentYear, currentMonth, 1);            
        const lastDayOfLastMonth = new Date(currentMonthStart - 1);
      
        
        return lastDayOfLastMonth.getDate();
}

const claclDay = function (day) {

        if (currentDay < day) {
            daySpan.textContent = `${(daysInLastMonth() - day) + currentDay}`
        } else {
            daySpan.textContent = `${currentDay - day}`
        }

    }





submitBtn.addEventListener(`click`, (e) => {

    e.preventDefault();

    year = Number(yearInp.value);
    month = Number(monthInp.value);
    day = Number(dayInp.value);


    if (checkIfinputsAreFilled()) {
        checkFirstLetter()

        if(checkFirstLetter()) {
            checkIfYearIsInThePast(year);

            if(checkIfYearIsInThePast(year)) {
                checkifMonthIsValid(month);

                if(checkifMonthIsValid(month)) {
                    checkValidDay();

                    if(checkValidDay()) {
                        calcYears(year)
                        calcMonth(month)
                        claclDay(day)
                    }
                }
            }
        }
    }
})






// checkIfinputsAreFilled();

    
//     let yearInpValue = Number(yearInp.value);

//     year = checkIfYearIsInThePast(yearInpValue);


//     checkIfinputsAreFilled();


//     if(dayInp.value !== `` && monthInp.value !== `` && yearInpValue !== `` && year < currentYear 
//        && year !== 0
//     ) {

//         month = Number(monthInp.value);
//         day = Number(dayInp.value);
        
//         let m;
//         let x;
//         let y;


//         if(month !== 2 && year && month <=12 && month > 0) {



        
//                 m = daysInMonth.get(month)

//                 if(day > m ) {
//                     errorValidDate.classList.add(`display-block`)
//                     dayInp.style.border = `1px solid red`
//                     monthInp.style.border = `1px solid red`
//                     yearInp.style.border = `1px solid red`
//                 } else {
//                     errorValidDate.classList.remove(`display-block`)
//                     dayInp.style.border = ``
//                     monthInp.style.border = ``
//                     yearInp.style.border = ``
//                 }
            

//         m = daysInMonth.get(month)

//         if(day > m ) {
//             errorValidDate.classList.add(`display-block`)
//             dayInp.style.border = `1px solid red`
//             monthInp.style.border = `1px solid red`
//             yearInp.style.border = `1px solid red`
//         } else {
//             errorValidDate.classList.remove(`display-block`)
//             dayInp.style.border = ``
//             monthInp.style.border = ``
//             yearInp.style.border = ``
//         }

//     } else if (month === 2 && year % 4 === 0 && (month <=12 && month > 0)) {

//         [x,y] = daysInMonth.get(month)
//         m = y

//         if(day > m ) {
//             errorValidDate.classList.add(`display-block`)
//             dayInp.style.border = `1px solid red`
//             monthInp.style.border = `1px solid red`
//             yearInp.style.border = `1px solid red`
            
//         } else {
//             errorValidDate.classList.remove(`display-block`)
//             dayInp.style.border = ``
//             monthInp.style.border = ``
//             yearInp.style.border = ``
//         }
        
//     } else if (month === 2 && year % 4 !== 0 && (month <=12 && month > 0)) {

//         [x,y] = daysInMonth.get(month)
//         m = x

//         if(day > m ) {
//             errorValidDate.classList.add(`display-block`)
//             dayInp.style.border = `1px solid red`
//             monthInp.style.border = `1px solid red`
//             yearInp.style.border = `1px solid red`
//         } else {
//             errorValidDate.classList.remove(`display-block`)
//             dayInp.style.border = ``
//             monthInp.style.border = ``
//             yearInp.style.border = ``
//         }
//     } else {
//         errorValidDate.classList.add(`display-block`)
//         dayInp.style.border = `1px solid red`
//         monthInp.style.border = `1px solid red`
//         yearInp.style.border = `1px solid red`
//     }


//     }
















// month = months.get(Number(monthInp.value));


// submitBtn.addEventListener(`click`, (e) => {
//     e.preventDefault();

//     let x = [];

//     let m;

//     month = months.get(Number(monthInp.value));

//     if (month = [28, 29]) {
//         if(x > 5) {
//             m = month[0]
//         } else {
//             m = month[1]
//         }
//     }

//     console.log(month)
//     console.log(m)
// })


// let x= 2024
// let y = 1990

// while(y< 1990) {
//     console.log(y)
// }






// const currentYear = new Date().getFullYear();
// const currentMonth = new Date().getMonth() + 1;
// const currentDay = new Date().getDate();




// const checkRequired = function() {
//     inputs.forEach((el, ind) => {

//         if(el.value === ``) {
//             errorRequired[ind].classList.add(`display-block`)
//             el.style.border = `1px solid red`
//         } else {
//             errorRequired[ind].classList.remove(`display-block`)
//             el.style.border = ``
//         }
//     } )
// }


// const checkValidation = function () {

//     if((dayInp.value > 31 || dayInp.value < 1) && dayInp.value !== ``) {
//         errorValid[0].classList.add(`display-block`)
//         dayInp.classList.add(`red-border`)
//     } else {
//         errorValid[0].classList.remove(`display-block`)
//         dayInp.classList.remove(`red-border`)
//     }


//     if((monthInp.value > 12 || monthInp.value < 1) && monthInp.value !==``) {
//         errorValid[1].classList.add(`display-block`)
//         monthInp.classList.add(`red-border`)
//     } else {
//         errorValid[1].classList.remove(`display-block`)
//         monthInp.classList.remove(`red-border`)
//     }


//     if((yearInp.value >= currentYear) && yearInp.value !== ``) {
//         errorValid[2].classList.add(`display-block`)
//         yearInp.classList.add(`red-border`)
//     } else {
//         errorValid[2].classList.remove(`display-block`)
//         yearInp.classList.remove(`red-border`)
//     }



// }








// const daysInCurrentMonth = function () {
    
//     const now = new Date();
//     const currentYear = now.getFullYear();
//     const currentMonth = now.getMonth();
  
//     const nextMonth = new Date(currentYear, currentMonth + 1, 1);
  
//     const lastDayOfCurrentMonth = new Date(nextMonth - 1);
  
//     return lastDayOfCurrentMonth.getDate();
// }

// const daysInLastMonth = function () {

//     const now = new Date();
//     const currentYear = now.getFullYear();
//     const currentMonth = now.getMonth();

//     const currentMonthStart = new Date(currentYear, currentMonth, 1);
  
//     const lastDayOfLastMonth = new Date(currentMonthStart - 1);
  
//     return lastDayOfLastMonth.getDate();

// }
  

// submitBtn.addEventListener(`click`, (e) => {

//     e.preventDefault();


//     checkValidation();
//     checkRequired();

//     year = currentYear - Number(yearInp.value) - 1;
//     month = function () {
//         if(currentDay > dayInp.value) {
//             return 12 - Math.abs((currentMonth - Number(monthInp.value)))
//         } else {
//             return 12 - Math.abs((currentMonth - Number(monthInp.value)- 1))
//         }
//     }

//     day = function () {

//         if (currentDay < dayInp.value) {
//             return (daysInLastMonth() - dayInp.value) + currentDay;
//         } else {
//             return currentDay - dayInp.value;
//         }

//     }

//     yearSpan.textContent = `${year}`;
//     monthSpan.textContent = `${month()}`;
//     daySpan.textContent = `${day()}`

// })



