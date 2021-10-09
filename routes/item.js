// const express = require('express');
// const router = express.Router();

// const puppeteer = require('puppeteer');
// const cheerio = require('cheerio');

// var LifeResult = []
// var BattleResult = []
// var OrehaResult = []
// var time;

// /* GET home page. */
// router.get('/', (req, res, next) => {
//   res.render('item',{a:LifeResult,b:BattleResult,c:OrehaResult,time:time});
// });

// router.get('/error', (req, res, next) => {
//   res.render('item_error');
// });

// const crawler = async () => {
//     //브라우저를 띄우고
//   const browser = await puppeteer.launch({headless: true});
//   // 페이지를 띄우고
//   const page = await browser.newPage();
//   // 페이지 이동 
//   await page.goto('https://m-lostark.game.onstove.com/Market');
//   // 로스트아크 아이디 값 입력
//   await page.type( '#user_id', 'tw_k7@naver.com' );
//   // 로스트아크 패스워드 패스워드 값 입력
//   await page.type( '#user_pwd', 'qhfkao!!11' );
//   // 로스트아크 로그인 버튼 클릭
//   await page.click( '#btnLogin > span' );

//   await page.waitForTimeout(2000);

//   let content = await page.content();
//   const $ = cheerio.load(content, {decodeEntities: true});
//   var toggle = $('#lostark-wrapper > div > main > div > div.deal-wrapper > div.deal-fixed > form > fieldset > div > div.detail > button').html();
//   if(toggle == null){
//     error = "off";
//     crawler();
//   }
//   //거래소 검색
//     await page.click( '#lostark-wrapper > div > main > div > div.deal-wrapper > div.deal-fixed > form > fieldset > div > div.detail > button');
  
//   await page.waitForTimeout(1000);
//     await page.click( '#lostark-wrapper > div > main > div > div.deal-wrapper > div.category > div > div > div > ul > li:nth-child(8) > a');
  
//   await page.waitForTimeout(1000);
//     await page.click( '#lostark-wrapper > div > main > div > div.deal-wrapper > div.category > div > div > div > ul > li.is-active > ul > li:nth-child(1) > a');
  
//   await page.waitForTimeout(1000);
//   await autoScroll(page)
//   let life_content = await page.content();
//   const life_$ = cheerio.load(life_content, {decodeEntities: true});
//   var regex = /[^0-9]/g;
//   var life_length = parseInt(life_$('#lostark-wrapper > div > main > div > div.deal-wrapper > div.deal-fixed.is-fixed > div.sort > span').html().replace(regex,""));
  
//   LifeResult = []

//   const life_search_length = life_length/10 + life_length
//   for(var i = 1; i <= life_search_length; i++){
//     if(i == 11 || i == 22 || i == 33 ){
//       continue;
//     }
//     var item_name = life_$('#tbodyItemList > li:nth-child('+i+') > div.list__grade > span.name').html();
//     var item_price = parseInt(life_$('#tbodyItemList > li:nth-child('+i+') > div.list__detail > table > tbody > tr:nth-child(1) > td > div > em').html().replace(",",""))
//     var item_unit;
//     if(life_$('#tbodyItemList > li:nth-child('+i+') > div.list__grade > span.count > em').html() == null){
//       item_unit = 1;
//     }else{
//       item_unit = parseInt(life_$('#tbodyItemList > li:nth-child('+i+') > div.list__grade > span.count > em').html().replace(regex,""));
//     }
//     var item = {
//       Name:item_name,
//       Price:item_price,
//       Unit:item_unit
//     }
//     LifeResult.push(item)
//   }

//   await page.waitForTimeout(1000);
//   await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });

//   await page.click( '#lostark-wrapper > div > main > div > div.deal-wrapper > div.deal-fixed > form > fieldset > div > div.detail > button');
  
//   await page.waitForTimeout(1000);
//     await page.click( '#lostark-wrapper > div > main > div > div.deal-wrapper > div.category > div > div > div > ul > li:nth-child(6) > a');
  
//   await page.waitForTimeout(1000);
//   await page.click( '#lostark-wrapper > div > main > div > div.deal-wrapper > div.category > div > div > div > ul > li.is-active > ul > li:nth-child(1) > a');
    
//   await page.waitForTimeout(1000);
//   await autoScroll(page)

//   let battle_content = await page.content();
//   const battle_$ = cheerio.load(battle_content, {decodeEntities: true});
//   var regex = /[^0-9]/g;
//   var battle_length = parseInt(battle_$('#lostark-wrapper > div > main > div > div.deal-wrapper > div.deal-fixed > div.sort > span > em').html());

//   BattleResult = []
//   const battle_search_length = battle_length/10 + battle_length
//   for(var i = 1; i <= battle_search_length; i++){
//     if(i == 11 || i == 22 || i == 33 || i == 44 || i == 55){
//       continue;
//     }
//     var item_name = battle_$('#tbodyItemList > li:nth-child('+i+') > div.list__grade > span.name').html();
//     var item_price = parseInt(battle_$('#tbodyItemList > li:nth-child('+i+') > div.list__detail > table > tbody > tr:nth-child(1) > td > div > em').html().replace(",",""))
//     var item_unit;
//     if(battle_$('#tbodyItemList > li:nth-child('+i+') > div.list__grade > span.count > em').html() == null){
//       item_unit = 1;
//     }else{
//       item_unit = parseInt(battle_$('#tbodyItemList > li:nth-child('+i+') > div.list__grade > span.count > em').html().replace(regex,""));
//     }
//     var item = {
//       Name:item_name,
//       Price:item_price,
//       Unit:item_unit
//     }
//     BattleResult.push(item)
//   }

//   await page.waitForTimeout(1000);
//   await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });

//   await page.type( '#txtItemName', '오레하 융화 재료' );
    
//   await page.waitForTimeout(1000);
//   await page.click( '#lostark-wrapper > div > main > div > div.deal-wrapper > div.deal-fixed > form > fieldset > div > div.name > button.button.button--deal-submit');
    
//   await page.waitForTimeout(1000);
  
//   let oreha_content = await page.content();
//   const oreha_$ = cheerio.load(oreha_content, {decodeEntities: true});

//   OrehaResult = []
//   const oreha_search_length = 3;
//   for(var i = 1; i <= oreha_search_length; i++){
//     var item_name = oreha_$('#tbodyItemList > li:nth-child('+i+') > div.list__grade > span.name').html();
//     var item_price = parseInt(oreha_$('#tbodyItemList > li:nth-child('+i+') > div.list__detail > table > tbody > tr:nth-child(1) > td > div > em').html().replace(",",""))
//     var item_unit;
//     if(oreha_$('#tbodyItemList > li:nth-child('+i+') > div.list__grade > span.count > em').html() == null){
//       item_unit = 1;
//     }else{
//       item_unit = parseInt(oreha_$('#tbodyItemList > li:nth-child('+i+') > div.list__grade > span.count > em').html().replace(regex,""));
//     }
//     var item = {
//       Name:item_name,
//       Price:item_price,
//       Unit:item_unit
//     }
//     OrehaResult.push(item)
//   }
//   console.log("완료")
//   time = new Date();
//   //브라우저를 종료한다 
//   await browser.close();
//   }
//   crawler();
//   // setInterval(function() {
//   //   crawler();
//   // },300000)
  
  
//   module.exports = router;
  
  
//   async function autoScroll(page){
//     await page.evaluate(async () => {
//         await new Promise((resolve, reject) => {
//             var totalHeight = 0;
//             var distance = 100;
//             var timer = setInterval(() => {
//                 var scrollHeight = document.body.scrollHeight;
//                 window.scrollBy(0, distance);
//                 totalHeight += distance;
  
//                 if(totalHeight >= scrollHeight){
//                     clearInterval(timer);
//                     resolve();
//                 }
//             }, 100);
//         });
//     });
//   }
  