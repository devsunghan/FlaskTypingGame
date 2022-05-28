'use strict';
{
    let words = [

    ];
    wordSetting();
    function wordSetting() {
        $.ajax({
                type: "GET",
                url: "/quiz/start",
                data: {},
                success: function (response) {
                    let receiveWords = response['word'];
                    for (let i = 0; i < receiveWords.length; i++) {
                        words.push(receiveWords[i]);
                    }
                    // console.log(words);
                }
            })
    }

    setTimeout(() => {
    // console.log(words);
    let word = words[Math.floor(Math.random() * words.length)];
    let loc = 0;
    let score = 0;
    let miss = 0;
    const timeLimit = 40 * 1000; // millisecond
    let startTime;
    let isPlaying = false;
    let exam = 0

    let myRank = true;

    const target = document.getElementById('__target');
    const scoreLabel = document.getElementById('__score');
    const missLabel = document.getElementById('__miss');
    const timerLabel = document.getElementById('__timer');

    // target.textContent = word;


    const pythonWords = $("#__words");
    pythonWords.hide();
    const ranking_box = document.getElementById("__words-box");
    ranking_box.innerText = "랭킹 확인";
    let ranking_bool = false;

    ranking_box.onclick = function() {Ranking()};
    document.getElementById("__myRanking").onclick = function() {MyRanking()}
    function Ranking(){
            //     if (!ranking_bool) {
            //         $("#__words").show();
            //         ranking_box.innerText = "랭킹 박스 닫기";
            //         ranking_bool = true;
            //     } else {
            //         $("#__words").hide();
            //         $("#__words-box").innerText = "랭킹 박스 열기";
            //         ranking_bool = false;
            //     }
            $.ajax({
                type: "GET",
                url: "/quiz/rank",
                data: {},
                success: function (response) {

                    let message = ''
                    console.log(response['rank'])
                    for (let i = 0; i < response['rank'].length; i++) {
                        for (let j = 0; j < response['rank'][i].length; j++) {
                            response['rank'][i][0] /= 1000
                            response['rank'][i][0] = (40 - response['rank'][i][0]).toFixed(3);
                            message += response['rank'][i][j]
                            message += '\t\t'
                        }
                        message += '\n';
                    }
                    console.log(message);
                    alert('클리어 타임     오타     단어 수        유저 닉네임      클리어한 시간 \n' + message);
                    //window.location.reload();
                }
            })

             }

     function MyRanking(){
            $.ajax({
                type: "POST",
                url: "/quiz/rank",
                data: {myRank:11},
                success: function (response) {

                    let message = ''
                    console.log(response['rank'])
                    for (let i = 0; i < response['rank'].length; i++) {
                        for (let j = 0; j < response['rank'][i].length; j++) {
                            response['rank'][i][0] /= 1000
                            response['rank'][i][0] = (40 - response['rank'][i][0]).toFixed(3);
                            message += response['rank'][i][j]
                            message += '\t\t'
                        }
                        message += '\n';
                    }
                    console.log(message);
                    alert('클리어 타임     오타     단어 수        유저 닉네임      클리어한 시간 \n' + message);
                    //window.location.reload();
                }
            })

             }

    document.getElementById('__desc').onclick = function() {
        alert('타이핑 게임입니다.\n' +
            '40초 안에 5개 단어를 타이핑하면 됩니다.\n' +
            '로그인 후, 게임을 클리어하면 기록이 저장됩니다.');
    }

    function updateTarget() {
        let placeholder = '';
        for (let i = 0; i < loc; i++) {
            placeholder += '_';
        }
        target.textContent = placeholder + word.substring(loc);
    }

    function updateTimer() {
        const timeLeft = startTime + timeLimit - Date.now();
        timerLabel.textContent = (timeLeft/1000).toFixed(2);

        const timeOutId = setTimeout(() => {
            if (exam >= 5) {
                clearTimeout(timeOutId);
                alert('Game Clear!');

                // 코드추가 5/25 ajax
                // $(document).ready(function () {
                saveData();
                // });

        function saveData() {
            let timeScore = timeLeft
            let wordScore = score
            let missScore = miss
            $.ajax({
                type: "POST",
                url: "/quiz/save",
                data: {timeScore_give:timeScore, wordScore_give: wordScore, missScore_give:missScore},
                success: function (response) {
                    alert(response["msg"]);
                    window.location.reload();
                }
            })
        }
                // 추가코드 종료 5/25 ajax



            } else {
                updateTimer();
            }

        }, 10);

        if (timeLeft < 0) {

            isPlaying = false;

            clearTimeout(timeOutId);
            timerLabel.textContent = '0.00';

        }
    }

    document.getElementById("__target").addEventListener('click', gameStart);


    function gameStart() {
        if (isPlaying === true) {
            return;
        }

        isPlaying = true;
        target.textContent = word;
        startTime = Date.now();
        updateTimer();
    }

    window.addEventListener('keydown', (e)=> {
        if (isPlaying !== true) {
            return;
        }

        if (e.key === word[loc]) {
            loc++;
            if (loc === word.length) {
                word = words[Math.floor(Math.random() * words.length)];
                loc = 0;
                exam++;
                console.log(exam);
            }
            updateTarget();
            score++;
            scoreLabel.textContent = score;
        } else {
            miss++;
            missLabel.textContent = miss;
        }
    });
    }, 300)
}