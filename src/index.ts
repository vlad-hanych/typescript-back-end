import app from "./app";

const server = app.listen('3434', () => {
    console.log(
        "  App is running at http://localhost:3434 in %s mode",
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});

// export default server;