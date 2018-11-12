<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" text="Levels"></Label>
        </ActionBar>

        <StackLayout margin="10">
            <Button text="EASY" @tap="goToEasy"/>
            <Button text="AVERAGE" @tap="goToAverage" :isEnabled="averageLevel"/>
            <Button text="HARD" @tap="goToHard" :isEnabled="hardLevel"/>
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
            averageLevel: false,
            hardLevel: false
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
            alert({message: 'Items needed to perfect: 10', okButtonText: "OK"})
            .then(() => {
                this.$navigateTo(QuizPage, {
                    props: {
                        level: 'average'
                    }
                });
            });
        },
        goToHard() {
            alert({message: 'Items needed to perfect: 15', okButtonText: "OK"})
            .then(() => {
                this.$navigateTo(QuizPage, {
                    props: {
                        level: 'hard'
                    }
                });
            });
        }
    },

    created () {
        switch (this.level) {
            case 'average':
                this.averageLevel = true;
                break;
            case 'hard':
                this.hardLevel = true;
                break;
        }

        console.log(this.averageLevel);
        console.log(this.hardLevel);
    }
}
</script>
