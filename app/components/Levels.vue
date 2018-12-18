<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" text="Levels"></Label>
        </ActionBar>

        <StackLayout>
            <Button text="EASY" class="button btn-levelEasy" @tap="goToEasy"/>
            <Button text="AVERAGE" class="button btn-levelAverage" @tap="goToAverage"/>
            <Button text="HARD" class="button btn-levelHard" @tap="goToHard"/>
        </StackLayout>
    </Page>
</template>

<script>
import QuizPage from './QuizPage';

export default {
    props: [
        'level'
    ],

    data () {
        return {
        }
    },

    methods: {
        goToEasy() {
            alert({message: 'Items needed to perfect: 5', okButtonText: "OK"})
            .then(() => {
                this.$navigateTo(QuizPage, {
                    props: {
                        level: 'easy'
                    }
                });
            });
            
        },
        goToAverage() {
            if (localStorage.getItem('averageLevel') === 'true') {
                alert({message: 'Items needed to perfect: 10', okButtonText: "OK"})
                .then(() => {
                    this.$navigateTo(QuizPage, {
                        props: {
                            level: 'average'
                        }
                    });
                });
            } else {
                alert({message: 'You must pass the Easy level first.', okButtonText: "OK"});
            }
        },
        goToHard() {
            if (localStorage.getItem('hardLevel') === 'true') {
                alert({message: 'Items needed to perfect: 15', okButtonText: "OK"})
                .then(() => {
                    this.$navigateTo(QuizPage, {
                        props: {
                            level: 'hard'
                        }
                    });
                });
            } else {
                alert({message: 'You must pass the Average level first.', okButtonText: "OK"});
            }
        }
    },

    created () {
        
    }
}
</script>

<style scoped>
    .button, {
        color: white;
        height: 33.3%;
    }
    .btn-levelEasy{
        background-color: #2779BD;
    }
    .btn-levelAverage {
        background-color: #38A89D;
    }
    .btn-levelHard {
        background-color: #606F7B;
    }
</style>
