const express = require('express');
const router = express.Router();
const randomUseragent = require('random-useragent');
const rua = randomUseragent.getRandom();
const cheerio = require('cheerio');
const axios = require('axios');
const matchdata = require('../utlis/app.json');
const { dummydata } = require('../utlis/error.js');
const { errormsg } = require('../utlis/msg.js');


router.get('/', function (req, res) {

    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('X-Frame-Options', 'DENY');
    res.header('X-XSS-Protection', '1; mode=block');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('Strict-Transport-Security', 'max-age=63072000');
    res.setHeader('Content-Type', 'application/json');

    const match_url = req.query.url;

    let str = match_url || '';
    // let live_url = str.replace('www', 'm');
    live_url = str;
    axios({
        method: 'GET',
        url: live_url,
        headers: {
            'User-Agent': rua
        }
    }).then(function (response) {

        $ = cheerio.load(response.data);

        var team1_name = $("div.team.team-a > div.team-info > span").text();
        var team1_score = $("div.team.team-a > div.team-score > div > span.score").text();

        var team2_name = $("div.team.team-b > div.team-info > span").text();
        var team2_score = $(" div.team.team-b > div.team-score.won > div > span.score").text();

        if(team2_score){
            var temp2 = team2_name;
            team2_name = team1_name;
            team1_name = temp2;
            var temp = team2_score;
            team2_score = team1_score;
            team1_score = temp;
        }


        // var title = $("h4.ui-header").text();
        // var update = $("div.cbz-ui-status").text();
        // var bowlTeamScore = $('div.cb-list-item:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1)').text();
        // var currentscore = $('div.cb-list-item:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1)').text();
        // var batsman = $('span.bat-bowl-miniscore').eq(0).text();
        // var batsmanrun = $('td[class="cbz-grid-table-fix "]').eq(6).text();
        // var ballsfaced = $('span[style="font-weight:normal"]').eq(0).text();
        // var fours = $('td[class="cbz-grid-table-fix "]').eq(7).text();
        // var sixes = $('td[class="cbz-grid-table-fix "]').eq(8).text();
        // var sr = $('td[class="cbz-grid-table-fix "]').eq(9).text();
        // var batsmantwo = $('td[class="cbz-grid-table-fix "]').eq(10).text();
        // var batsmantworun = $('td[class="cbz-grid-table-fix "]').eq(11).text();
        // var batsmantwoballsfaced = $('span[style="font-weight:normal"]').eq(1).text();
        // var batsmantwofours = $('td[class="cbz-grid-table-fix "]').eq(12).text();
        // var batsmantwosixes = $('td[class="cbz-grid-table-fix "]').eq(16).text();
        // var batsmantwosr = $('td[class="cbz-grid-table-fix "]').eq(14).text();
        // var bowler = $('span.bat-bowl-miniscore').eq(2).text();
        // var bowlerover = $('td[class="cbz-grid-table-fix "]').eq(21).text();
        // var bowlerruns = $('td[class="cbz-grid-table-fix "]').eq(23).text();
        // var bowlerwickets = $('td[class="cbz-grid-table-fix "]').eq(24).text();
        // var bowlermaiden = $('td[class="cbz-grid-table-fix "]').eq(22).text();
        // var bowlertwo = $('span.bat-bowl-miniscore').eq(3).text();
        // var bowletworover = $('td[class="cbz-grid-table-fix "]').eq(26).text();
        // var bowlertworuns = $('td[class="cbz-grid-table-fix "]').eq(28).text();
        // var bowlertwowickets = $('td[class="cbz-grid-table-fix "]').eq(29).text();
        // var bowlertwomaiden = $('td[class="cbz-grid-table-fix "]').eq(27).text();
        // var partnership = $("span[style='color:#333']").eq(0).text();
        // var recentballs = $("span[style='color:#333']").eq(2).text();
        // var lastwicket = $("span[style='color:#333']").eq(1).text();
        // var runrate = $("span[class='crr']").eq(0).text();
        // var commentary = $("p[class='commtext']").text();

        var livescore = ({
            team1_name: team1_name || "Data Not Found",
            team1_score: team1_score || "Data Not Found",
            team2_name: team2_name || "Data Not Found",
            team2_score: team2_score || "Data Not Found",

            // title: title || "Data Not Found",
            // update: update || "Data Not Found",
            // current: currentscore || "Data Not Found",
            // bowlTeam: bowlTeamScore || "Data Not Found",
            // batsman: batsman || "Data Not Found",
            // batsmanrun: batsmanrun || "Data Not Found",
            // ballsfaced: ballsfaced || "Data Not Found",
            // fours: fours || "Data Not Found",
            // sixes: sixes || "Data Not Found",
            // sr: sr || "Data Not Found",
            // batsmantwo: batsmantwo || "Data Not Found",
            // batsmantworun: batsmantworun || "Data Not Found",
            // batsmantwoballsfaced: batsmantwoballsfaced || "Data Not Found",
            // batsmantwofours: batsmantwofours || "Data Not Found",
            // batsmantwosixes: batsmantwosixes || "Data Not Found",
            // batsmantwosr: batsmantwosr || "Data Not Found",
            // bowler: bowler || "Data Not Found",
            // bowlerover: bowlerover || "Data Not Found",
            // bowlerruns: bowlerruns || "Data Not Found",
            // bowlerwickets: bowlerwickets || "Data Not Found",
            // bowlermaiden: bowlermaiden || "Data Not Found",
            // bowlertwo: bowlertwo || "Data Not Found",
            // bowletworover: bowletworover || "Data Not Found",
            // bowlertworuns: bowlertworuns || "Data Not Found",
            // bowlertwowickets: bowlertwowickets || "Data Not Found",
            // bowlertwomaiden: bowlertwomaiden || "Data Not Found",
            // partnership: partnership || "Data Not Found",
            // recentballs: recentballs || "Data Not Found",
            // lastwicket: lastwicket || "Data Not Found",
            // runrate: runrate || "Data Not Found",
            // commentary: commentary || "Data Not Found"
        });

        res.send(JSON.stringify(livescore, null, 4));

    }).catch(function (error) {
        if (!error.response) {
            res.json(errormsg());
        } else {
            res.json(errormsg());
        }
    });

});

module.exports = router;