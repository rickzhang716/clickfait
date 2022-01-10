module.exports = (sequelize, Sequelize) => {
    const Headline = sequelize.define("headline", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        },
        clickbait: {
            type: Sequelize.STRING
        },
        sentiment: {
            type: Sequelize.STRING
        }

    });

    return Headline;
};