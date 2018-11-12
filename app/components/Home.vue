<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" text="NMMQuizGame"></Label>
        </ActionBar>

        <StackLayout margin="10">
            <Button text="New Game" class="button blue" @tap="newGame"/>
            <Button text="Continue" class="button green" @tap="continueGame"/>
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
                console.log('Button new game was pressed.');
                this.$navigateTo(Levels);
            },
            continueGame() {
                console.log('Button continue game was pressed.');
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
        height: 10%;
    }
    .blue {
        background-color: blue;
    }
    .green {
        background-color: green;
    }
</style>
