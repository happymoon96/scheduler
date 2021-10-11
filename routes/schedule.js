const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const request = require('request');
const { val } = require('cheerio/lib/api/attributes');
const { on } = require('events');

var user_data = [];
var user_data_sort = [];
var update_user_data = [];
var update_user_data_sort = [];
// var time_value = new Date().getDay() + new Date().getHours()/100

/* GET users listing. */
router.get('/', (req, res) => {
    res.render('schedule_index');
});

router.get('/main', (req, res) => {
    res.render('schedule', {userdata : user_data_sort});
});

router.get('/edit', (req, res) =>{
    res.render('schedule_edit', {userdata : user_data_sort})
})

router.get('/update', (req, res) =>{
    res.render('schedule_update', {update : update_user_data_sort})
})

router.post('/name_post', (req, res, next) => {
    user_data = [];
    user_data_sort = [];
    const user_name = req.body.user;
    function searchInfo(user_name){
        var url = 'https://lostark.game.onstove.com/Profile/Character/'+encodeURI(user_name);

        return new Promise(resolve=>{
            request(url,(err, res, body) => {
                if (err) throw err;
                let $ = cheerio.load(body);
                const server_number = Object.keys($('#expand-character-list > strong')).length - 4;

                if($("#lostark-wrapper > div > main > div").children()[0].name == "h2"){
                    search_result = "re-try"
                    resolve(search_result)
                    // 유저 데이터가 없을 경우

                }else{
                    for(var i = 1; i <= server_number; i++){
                        const num = i*2;
                        const server = $('.profile-character-list__server:nth-child('+num+')').text().replace('@','');
                        const character_number = Object.keys($('#expand-character-list > ul:nth-child('+(num+1)+') > li')).length - 4;
                
                        for(var j = 1; j <= character_number; j++){
                            const character_name = $('#expand-character-list > ul:nth-child('+(num+1)+') > li:nth-child('+`${j}`+') > span > button > span').text();
                            const encode_name = encodeURI(character_name);
                            url = 'https://lostark.game.onstove.com/Profile/Character/'+encode_name;
                            request(url,(err, res, body) => {
                                let $$ = cheerio.load(body);
                                const class_name = $$('#lostark-wrapper > div > main > div > div.profile-character-info > img').attr("alt");
                                const level = parseFloat($$('#lostark-wrapper > div > main > div > div.profile-ingame > div.profile-info > div.level-info2 > div.level-info2__expedition > span:nth-child(2)').text().replace('Lv.','').replace(',',''));
                                const char_level = parseInt($$('#lostark-wrapper > div > main > div > div.profile-ingame > div.profile-info > div.level-info > div.level-info__item > span:nth-child(2)').text().replace('Lv.',''))
                                const guild = $$('#lostark-wrapper > div > main > div > div.profile-ingame > div.profile-info > div.game-info > div.game-info__guild > span:nth-child(2)').text()
                                const each_char = {
                                    "server": server,
                                    "name": character_name,
                                    "class": class_name,
                                    "level": level,
                                    "char_level": char_level,
                                    "guild": guild,
                                    "toggle": "on",
                                    "date": 0,
                                    "week": 0,
                                    "t1": 0,
                                    "t2": 0,
                                    "d1": 0,
                                    "d2": 0,
                                    "d3": 0,
                                    "d4": 0,
                                    "d5": 0,
                                    "d6": 0,
                                    "d7": 0,
                                    "d8": [0,0],
                                    "d9": 0,
                                    "d10": 0,
                                    "d11": 0,
                                    "d12": 0,
                                    "d13": 0,
                                    "d14": 0,
                                    "d15": 0,
                                    "d16": 0,
                                    "d17": 0,
                                    "d18": 0,
                                    "d19": 0,
                                    "d20": 0,
                                    "w1": 0,
                                    "w2": 0,
                                    "w3": 0,
                                    "w4": 0,
                                    "w5": 0,
                                    "w6": 0,
                                    "w7": 0,
                                    "w8": 0,
                                    "w9": 0,
                                    "w10": 0,
                                    "w11": 0,
                                    "w12": 0,
                                    "w13": 0,
                                    "w14": 0,
                                    "w15": 0,
                                    "w16": 0,
                                    "w17": 0,
                                    "w18": 0,
                                    "w19": 0,
                                    "w20": 0,
                                };
                                user_data.push(each_char);
                            })
                        }
                    }
                    search_result = "good"
                    resolve(search_result)
                }                
            });
        })
    }
    searchInfo(user_name).then(function(result){
        if(result == "re-try"){
            res.write("<script>alert('Please check again.')</script>");
            res.write("<script>window.location=\"/schedule\"</script>");
        }else{
            setTimeout(() => { 
                user_data_name_sort =  user_data.sort(function(a,b){
                    return a.name - b.name;
                });      
                user_data_sort = user_data_name_sort.sort(function(a,b){
                    return b.level - a.level;
                });      
                res.redirect('/schedule/main');
            }, 2000);
        }
    })
});

router.post('/update', (req, res) => {
    update_user_data = [];
    update_user_data_sort = [];
    const user_name = req.body.user;
    function searchInfo(user_name){
        var url = 'https://lostark.game.onstove.com/Profile/Character/'+encodeURI(user_name);

        return new Promise(resolve=>{
            request(url,(err, res, body) => {
                if (err) throw err;
                let $ = cheerio.load(body);
                const server_number = Object.keys($('#expand-character-list > strong')).length - 4;

                if($("#lostark-wrapper > div > main > div").children()[0].name == "h2"){
                    search_result = "re-try"
                    resolve(search_result)
                    // 유저 데이터가 없을 경우

                }else{
                    for(var i = 1; i <= server_number; i++){
                        const num = i*2;
                        const server = $('.profile-character-list__server:nth-child('+num+')').text().replace('@','');
                        const character_number = Object.keys($('#expand-character-list > ul:nth-child('+(num+1)+') > li')).length - 4;
                
                        for(var j = 1; j <= character_number; j++){
                            const character_name = $('#expand-character-list > ul:nth-child('+(num+1)+') > li:nth-child('+`${j}`+') > span > button > span').text();
                            const encode_name = encodeURI(character_name);
                            url = 'https://lostark.game.onstove.com/Profile/Character/'+encode_name;
                            request(url,(err, res, body) => {
                                let $$ = cheerio.load(body);
                                const class_name = $$('#lostark-wrapper > div > main > div > div.profile-character-info > img').attr("alt");
                                const level = parseFloat($$('#lostark-wrapper > div > main > div > div.profile-ingame > div.profile-info > div.level-info2 > div.level-info2__expedition > span:nth-child(2)').text().replace('Lv.','').replace(',',''));
                                const char_level = parseInt($$('#lostark-wrapper > div > main > div > div.profile-ingame > div.profile-info > div.level-info > div.level-info__item > span:nth-child(2)').text().replace('Lv.',''))
                                const guild = $$('#lostark-wrapper > div > main > div > div.profile-ingame > div.profile-info > div.game-info > div.game-info__guild > span:nth-child(2)').text()
                                const each_char = {
                                    "server": server,
                                    "name": character_name,
                                    "class": class_name,
                                    "level": level,
                                    "char_level": char_level,
                                    "guild": guild
                                };
                                update_user_data.push(each_char);
                            })
                        }
                    }
                    search_result = "good"
                    resolve(search_result)
                }                
            });
        })
    }
    searchInfo(user_name).then(function(result){
        if(result == "re-try"){
            res.write("<script>alert('Please check again.')</script>");
            res.write("<script>window.location=\"/schedule/main\"</script>");
        }else{
            setTimeout(() => {  
                update_user_data_name_sort =  update_user_data.sort(function(a,b){
                    return a.name - b.name;
                });      
                update_user_data_sort = update_user_data_name_sort.sort(function(a,b){
                    return b.level - a.level;
                });      
                res.redirect('/schedule/update');
            }, 2000);
        }
    })
});

module.exports = router;