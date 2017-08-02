var elsewherePopulation
function pick(options) {
    /*
       pick() expects a two-column array with names on the left and weights on
       the right. It returns a single name, chosen weighted-randomly. For
       example:
         pick([["foo",1],["bar",2]])
       will return "foo" 1/3 of the time and "bar" the other 2/3.
       If the last number is negative, it will be interpreted as (the negative of)
       the desired sum-of-weights. For example:
         pick([["foo",1],["bar",-3]])
       is equivalent to the first example.
    */

    if (options.length == 1) {
        return options[0][0]
    }

    var tmp = options // Work on a copy.

    for (i=1; i<tmp.length; i++) {
        if (tmp[i][1] >= 0) {
            tmp[i][1] = tmp[i][1] + tmp[i-1][1]
        } else {
            if (i<tmp.length-1) {
                throw 'PickNegativeNonlastWeight'
            } else if (0-tmp[i][1] < tmp[i-1][1]) {
                throw 'PickTotalOverflow'
            } else {
                tmp[i][1] = 0 - tmp[i][1]
            }
        }
    }

    if (tmp[tmp.length-1][0] == 'elsewhere') {
        elsewherePopulation = tmp[tmp.length-1][1] - tmp[tmp.length-2][1]
    }

    var total = tmp[tmp.length-1][1]
    var roll = Math.random()*total
    for (i=0; i<tmp.length; i++) {
        if (roll < tmp[i][1]) {
            return tmp[i][0]
        }
    }
}


countriesDataSource = 'https://docs.google.com/spreadsheets/d/1u9HIF6hJkgBWRDp5rx0BjSzFNZQXlCwSKNucrmcsBh0/edit'
country = [ //               bbMMMttt...
    ['Alavet',                  32000000],
    ['Anitam',                 600000000],
    ['Arva',                   130000000],
    ['Baravi',                 160000000],
    ['Calado',                  65000000],
    ['Cene',                   800000000],
    ['DUS',                     45000000],
    ['Elaan',                   90000000],
    ['Ereith',                  30000000],
    ['Foyayra',                 80000000],
    ['Kiasu Avivei',            16000000],
    ['the Maniten Republic',    10500000],
    ['Mesezza',                 28000000],
    ['Met',                      1100000], // "I'm imagining it as, like, Luxembourg or something"
    ['the Free State of Oakh', 110000000],
    ['Oyand',                   40000000],
    ['Rivik',                    3000000],
    ['Selinde',                 40000000],
    ['Surefet',                 90000000],
    ['Tapa',                  1200000000],
    ['Tuviri',                 700000000],
    ['Vidalat',                  8000000],
    ['Voa',                   1200000000],
    ['elsewhere',           -13000000000]  // World population: 13 billion
]

caste = [
    ['blue',    0.5],
    ['green',  10  ],
    ['yellow', 21  ],
    ['grey',    8  ],
    ['orange',  8  ],
    ['purple', 52  ],
    ['red',     0.5]
]

mixed = [
    ['mixed-caste', 2],
    ['non-mixed-caste', -100]
]

sex = [
    ['male', 1],
    ['female', 1]
]

trans = [
    ['trans', 1],
    ['cis', -10000]
]



myCountry = pick(country)

document.body.innerText = 'You are a '+
    pick(trans)+' '+pick(sex)+' '+
    Math.ceil(Math.random()*40)+'-year-old '+
    pick(mixed)+' '+pick(caste)+' '+
    'from '+myCountry+'.'

if (myCountry == 'elsewhere') {
    var listCountries = country.map(function(row){return row[0]}).slice(0,-1).join(', ')

    document.body.innerHTML += '<hr><small><i><p>' +
        'You are <strong>not</strong> from any of the following countries:<br>' +
        listCountries +
        '.<p>Those are all the countries included in this version of this page, but not all the countries on Amenta; you\'re one of the approximately '+
        elsewherePopulation.toLocaleString() +' ('+ Math.round(1000*elsewherePopulation/country[country.length-1][1])/10 +
        '%) from one of the many others. See <a href="'+countriesDataSource+'">the spreadsheet</a> for a more complete list.</p></i></small>'
}
