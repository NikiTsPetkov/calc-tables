import './src/styles.css';
import articles from './src/articles.json';
import readXlsxFile from 'read-excel-file';

let input = document.getElementById('input');
let date = document.querySelector('.date');
let date2 = document.querySelector('.date2');
let totalFuel = document.querySelector('.totalFuel');
let totalDiesel = document.querySelector('.totalDiesel');
let totalBenzin = document.querySelector('.totalBenzin');
let mmDiesel = document.querySelector('.mmDiesel');
let mm100 = document.querySelector('.mm100');
let mm95 = document.querySelector('.mm95');
let fresh = document.querySelector('.fresh');
let foodDry = document.querySelector('.foodDry');
let bevareges = document.querySelector('.bevareges');
let hotDrinks = document.querySelector('.hotDrinks');
let sandwiches = document.querySelector('.sandwiches');
let sandPcs = document.querySelector('.sandPcs');
let backShopAndOthers = document.querySelector('.backShopAndOthers');
let backShopAndOthersPcs = document.querySelector('.backShopAndOthersOcs');
let shop = document.querySelector('.shop');
let gastro = document.querySelector('.gastro');
let loader = document.querySelector('.loader');
let load = document.querySelector('.load');
let container = document.querySelector('.container');
let shopWoGastroEl = document.querySelector('.shopTotal');
let showTable1 = document.querySelector('.showTable');
let mainTable = document.querySelector('.mainTable');
// console.log(typeof articles.articles[0].group);
let count = 1,
  counter = 0,
  freshCalc = 0,
  foodDryCalc = 0,
  bevaragesCalc = 0,
  hotDrinksCalc = 0,
  sandwichesCalc = 0,
  backShopAndOthersCalc = 0,
  pieces = 0,
  maxxMotionDiesel = 0,
  maxxMotion100 = 0,
  a95 = 0,
  shopTotal = 0,
  shopWoGastro = 0,
  gastroTotal = 0;

showTable1.addEventListener('click', function () {
  if (mainTable.style.display === 'block') {
    mainTable.style.display = 'none';
    showTable1.innerText = 'виж таблица';
  } else {
    mainTable.style.display = 'block';
    showTable1.innerText = 'скрий таблица';
  }
});

input.addEventListener('change', function () {
  readXlsxFile(input.files[0], { getSheets: true }).then((sheets) => {
    while (count <= Object.keys(sheets).length) {
      readXlsxFile(input.files[0], { sheet: `Sheet${count}` }).then(function (
        result
      ) {
        // console.log(typeof result[0][1]);
        result.forEach((data) => {
          if (data[8] === 'TG КроасанМасло2бр') {
            pieces = data[47];
          }
          if (data[0] === 'Горива - Rimos') {
            const td = document.createElement('td');
            td.innerText = data[15].toFixed(2);
            totalFuel.appendChild(td);
          } else if (data[8] === 'MaxxMotionDiesel') {
            const td = document.createElement('td');
            td.innerText = data[47].toFixed(2);
            maxxMotionDiesel = data[47].toFixed(2);
            mmDiesel.appendChild(td);
          } else if (data[8] === 'OMV Diesel') {
            const td = document.createElement('td');
            let tDiesel1 = Number(data[47].toFixed(2));
            let tDiesel2 = Number(maxxMotionDiesel);
            let total = Number(tDiesel1) + Number(tDiesel2);
            td.innerText = total.toFixed(2);
            totalDiesel.appendChild(td);
          } else if (data[8] === 'OMV Super 95H') {
            a95 = data[47].toFixed(2);
          } else if (data[8] === 'MaxxMotion100') {
            const td = document.createElement('td');
            maxxMotion100 = td.innerText = data[47].toFixed(2);
            mm100.appendChild(td);
            // console.log(mm100);
          } else if (data[8] === 'MaxxMotion 95') {
            const td = document.createElement('td');
            td.innerText = data[47].toFixed(2);
            mm95.appendChild(td);
            let t1 = Number(data[47].toFixed(2));
            let t2 = Number(maxxMotion100);
            let t3 = Number(a95);
            let total2 = Number(t1) + Number(t2) + Number(t3);
            const td2 = document.createElement('td');
            td2.innerText = total2.toFixed(2);
            totalBenzin.appendChild(td2);
          } else if (data[0] === 'Студени Сандвичи') {
            counter++;
            const td = document.createElement('td');
            td.innerText = data[15];
            sandPcs.appendChild(td);
            console.log(data[15]);
          } else if (data[0] === 'Солени Печива') {
            const td = document.createElement('td');
            td.innerText = ((pieces + data[15]) / 2).toFixed(0);
            backShopAndOthersPcs.appendChild(td);
          } else if (
            data[0] === 'Магазин – Rimos' ||
            data[0] === 'Магазин&Ресторант Rimos'
          ) {
            shopWoGastro += data[17];
          } else if (data[0] === 'България' || data[0] === 'пътни') {
            shopWoGastro -= data[17];
          }

          if (data[0] !== 'Студени Сандвичи' && !data[0]) {
            counter += 0;
          }
          for (const property in articles.articles) {
            if (
              data[1] === articles.articles[property].sku.toString() &&
              articles.articles[property].group.substring(0, 3) === '910'
            ) {
              freshCalc += data[48];
            } else if (
              data[1] === articles.articles[property].sku.toString() &&
              articles.articles[property].group.substring(0, 3) === '915'
            ) {
              foodDryCalc += data[48];
            } else if (
              data[1] === articles.articles[property].sku.toString() &&
              articles.articles[property].group.substring(0, 7) === '9351099'
            ) {
              shopWoGastro += data[48];
            } else if (
              data[1] === articles.articles[property].sku.toString() &&
              articles.articles[property].group.substring(0, 3) === '920'
            ) {
              bevaragesCalc += data[48];
            } else if (
              data[1] === articles.articles[property].sku.toString() &&
              articles.articles[property].group.substring(0, 3) === '950'
            ) {
              if (
                articles.articles[property].group.substring(0, 5) === '95011'
              ) {
                hotDrinksCalc += data[48];
              } else if (
                articles.articles[property].group.substring(0, 5) === '95014'
              ) {
                sandwichesCalc += data[48];
                console.log(data[48]);
              } else if (
                articles.articles[property].group.substring(0, 5) === '95010' ||
                articles.articles[property].group.substring(0, 5) === '95012' ||
                articles.articles[property].group.substring(0, 5) === '95013' ||
                articles.articles[property].group.substring(0, 5) === '95015' ||
                articles.articles[property].group.substring(0, 5) === '95016' ||
                articles.articles[property].group.substring(0, 5) === '95017'
              ) {
                backShopAndOthersCalc += data[48];
              }
            }
          }
        });
        if (!counter) {
          const td = document.createElement('td');
          td.innerText = 0;
          sandPcs.appendChild(td);
        }
        let td = document.createElement('td');
        td.innerText = shopWoGastro.toFixed(2);
        shopWoGastroEl.appendChild(td);
        td = document.createElement('td');
        td.innerText = freshCalc.toFixed(2);
        td.classList.add('numbers');
        fresh.appendChild(td);
        td = document.createElement('td');
        td.innerText = foodDryCalc.toFixed(2);
        td.classList.add('numbers');
        foodDry.appendChild(td);
        td = document.createElement('td');
        td.innerText = bevaragesCalc.toFixed(2);
        td.classList.add('numbers');
        bevareges.appendChild(td);
        td = document.createElement('td');
        shopTotal =
          Number(freshCalc) + Number(foodDryCalc) + Number(bevaragesCalc);
        td.innerText = shopTotal.toFixed(2);
        td.classList.add('numbers');
        shop.appendChild(td);
        td = document.createElement('td');
        td.innerText = hotDrinksCalc.toFixed(2);
        td.classList.add('numbers');
        hotDrinks.appendChild(td);
        td = document.createElement('td');
        td.innerText = sandwichesCalc.toFixed(2);
        td.classList.add('numbers');
        sandwiches.appendChild(td);
        td = document.createElement('td');
        td.innerText = backShopAndOthersCalc.toFixed(2);
        td.classList.add('numbers');
        backShopAndOthers.appendChild(td);
        td = document.createElement('td');
        gastroTotal =
          Number(sandwichesCalc) +
          Number(hotDrinksCalc) +
          Number(backShopAndOthersCalc);
        td.innerText = gastroTotal.toFixed(2);
        td.classList.add('numbers');
        gastro.appendChild(td);
        shopWoGastro = 0;
        shopTotal = 0;
        gastroTotal = 0;
        freshCalc = 0;
        foodDryCalc = 0;
        bevaragesCalc = 0;
        hotDrinksCalc = 0;
        sandwichesCalc = 0;
        backShopAndOthersCalc = 0;
        pieces = 0;
        counter = 0;
      });
      const th = document.createElement('th');
      th.innerText = count;
      date.appendChild(th);
      const th2 = document.createElement('th');
      th2.innerText = count;
      date2.appendChild(th2);
      count++;
    }
    loader.classList.add('hide');
    load.classList.add('hide');
    container.classList.remove('hide');
  });
});

input.addEventListener('change', function () {
  loader.classList.remove('hide');
  load.classList.remove('hide');
  container.classList.add('hide');
});
