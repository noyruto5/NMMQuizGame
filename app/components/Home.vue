<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" text="NMMQuizGame"></Label>
        </ActionBar>

        <StackLayout>
            <StackLayout class="header-div">
                <Label text="Welcome" />
                <Label text="to" />
                <Label text="NONESCOST Multi Media Quiz Game" />
            </StackLayout>
            <Button text="New Game" class="button btn-newgame" @tap="newGame"/>
            <Button text="Continue" class="button btn-contgame" @tap="continueGame"/>
            <Button text="Tutorials" class="button btn-tutorial" @tap="goToTutorials"/>
        </StackLayout>
    </Page>
</template>

<script>
    import Levels from "./Levels";
    
    export default {
        computed: {
            message() {
                return '';
            }
        },

        methods: {
            newGame() {
                localStorage.clear();
                this.$navigateTo(Levels);
            },
            continueGame() {
                this.$navigateTo(Levels);
            },
            goToTutorials() {
                console.log('Tutorials button was pressed.');
            }
        }
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables

    // Custom styles
    .fa {
        color: $accent-dark;
    }
    .info {
        font-size: 20;
    }
    .button {
        color: white;
        height: 25%;
    }
    .btn-newgame {
        background-color: #2779BD;
    }
    .btn-contgame {
        background-color: #38A89D;
    }
    .btn-tutorial {
        background-color: #606F7B;
    }
    .header-div {
        padding: 10;
        font-size: 20;
        color: #DE751F;
        height: 25%;
    }
</style>
