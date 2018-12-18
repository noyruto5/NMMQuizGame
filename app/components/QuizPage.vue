<template>
    <Page class="page" actionBarHidden="true">
        <StackLayout class="home-panel quiz-content">
            <StackLayout orientation="horizontal">
                <Label id="timer">{{timeCount}}</Label>
                <Label text="Score:" id="label-score"/>
                <Label id="actual-score">{{actualScore}}</Label>
                <Label text=" / " id="score-divider"/>
                <Label id="max-score">{{numberOfQuestions}}</Label>
            </StackLayout>

            <Label v-bind:text="question" class="question" textWrap="true"/>
            <Label text="Choices:" class="choice-label" />
            <ListView for="choice in choices" class="list-group" @itemTap="onItemTap">
                <v-template>
                    <FlexboxLayout flexDirection="row" class="list-group-item">
                        <Label :text="choice" class="list-group-item-heading"/>
                    </FlexboxLayout>
                </v-template>
            </ListView>
        </StackLayout>
    </Page>
</template>

<script>
import Quiz from '@/assets/quiz/easy.json';
import Levels from "./Levels";
import { setInterval, clearInterval } from 'tns-core-modules/timer';

export default {
    props: [
        'level'
    ],
    
    data () {
        return {
            quizData: Quiz.data,
            question: '',
            answer: '',
            choices: '',
            selectedAnswer: '',
            usedQuestions: [],
            numberOfQuestions: 0,
            actualScore: 0,
            timeCount: 0,
            countDown: 0
        }
    },

    methods: {
        selectQuestion () {
            let randomId;
            randomId = Math.floor((Math.random() * 30) + 1) - 1; // Minu 1 because the array index is from 0 - 29

            if (this.usedQuestions.length < this.numberOfQuestions) {
                while (this.usedQuestions.includes(randomId)) {
                    randomId = Math.floor((Math.random() * 30) + 1) -1;
                }

                this.usedQuestions.push(randomId);
                console.log(this.usedQuestions);
                this.question = this.quizData[randomId].question;
                this.answer = this.quizData[randomId].answer;
                this.choices = this.quizData[randomId].choices;

                var currentIndex = this.choices.length, temporaryValue, randomIndex;
                // While there remain elements to shuffle...
                while (0 !== currentIndex) {
                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;
                    // And swap it with the current element.
                    temporaryValue = this.choices[currentIndex];
                    this.choices[currentIndex] = this.choices[randomIndex];
                    this.choices[randomIndex] = temporaryValue;
                }
            }
            else {
                console.log("All questions are used up.")
            }     
        },

        onItemTap (args) {
            this.selectedAnswer = this.choices[args.index];
            let result = '';
            let title = '';

            if (this.selectedAnswer == this.answer) {
                result = 'correct';
                ++this.actualScore
            } else {
                result = 'wrong';
                title = 'GAME OVER';
                clearInterval(this.countDown);
            }

            alert({
                title: title,
                message: 'Your answer is ' + result + '.',
                okButtonText: "OK"
            }).then(() => {
                if (this.selectedAnswer != this.answer) {
                    this.$navigateTo(Levels);
                }
                else if (this.usedQuestions.length < this.numberOfQuestions) {
                    this.selectQuestion();
                }
                else if (this.usedQuestions.length == this.numberOfQuestions) {
                    clearInterval(this.countDown);

                    alert({
                        title: 'CONGRATS',
                        message: 'You passed this level.',
                        okButtonText: "OK"
                    }).then(() => {
                        switch (this.level) {
                            case 'easy':
                                localStorage.setItem('averageLevel', 'true');
                                break;
                            case 'average':
                                localStorage.setItem('hardLevel', 'true');
                                break;
                        }
                        this.$navigateTo(Levels);
                    });
                }
            });
        },

        startTimer () {
            this.timeCount = 60;
            this.countDown = setInterval(() =>  {
                --this.timeCount;
                if (this.timeCount == 0) {
                    clearInterval(this.countDown);
                    alert({
                        title: 'GAME OVER',
                        message: 'Time is out. You lose.',
                        okButtonText: "OK"
                    }).then(() => {
                        this.$navigateTo(Levels);
                    });
                }
            }, 1000);
        }
    },

    created () {
        switch (this.level) {
            case 'easy':
                this.numberOfQuestions = 5;
                break;
            case 'average':
                this.numberOfQuestions = 10;
                break;
            case 'hard':
                this.numberOfQuestions = 15;
                break;
        }
        this.selectQuestion();
        this.startTimer();
    }, 

    destroyed () {
        clearInterval(this.countDown);
    }
}
</script>

<style scoped>
.home-panel {
    margin: 10;
}
.quiz-content {
    height: 85%;
}
Button {
    height: 10%;
}
.question, .choice-label, #timer, #label-score, #actual-score, #score-divider, #max-score{
    font-size: 20;
}
.question {
    margin-top: 30;
    margin-bottom: 80;
}
.choice-label {
    margin-bottom: 10;
}
#timer {
    margin-left: 5%;
}
#label-score {
    margin-left: 50%;
    margin-right: 10;
}
.page {
    background-color: #FFFFFF;
    color: #3D4852;
}
</style>
