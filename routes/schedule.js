const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const request = require('request');
const { val } = require('cheerio/lib/api/attributes');
const { on } = require('events');

var user_data = [];
var user_data_sort = [];

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
                                    "서버": server,
                                    "캐릭터명": character_name,
                                    "직업": class_name,
                                    "레벨": level,
                                    "전투레벨": char_level,
                                    "길드": guild
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
                user_data_sort = user_data.sort(function(a,b){
                    return b.레벨 - a.레벨;
                });      
                res.redirect('/schedule/main');
            }, 2000);
        }
    })
});

router.post('/update', (req, res) => {
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
                                    "서버": server,
                                    "캐릭터명": character_name,
                                    "직업": class_name,
                                    "레벨": level,
                                    "전투레벨": char_level,
                                    "길드": guild
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
                user_data_sort = user_data.sort(function(a,b){
                    return b.레벨 - a.레벨;
                });      
                res.redirect('/schedule/main');
            }, 2000);
        }
    })
});

module.exports = router;