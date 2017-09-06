const logger = () => {
    global.log = log => {
        console.log(
            '>>>'.gray,
            `${log}`.yellow,
            '\n----------------------------------------\n'
        );
    };
};

export default logger;
