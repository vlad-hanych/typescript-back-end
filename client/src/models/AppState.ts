export default interface AppState{
    loggedInUser: {
        name: string;
    } | null;
}