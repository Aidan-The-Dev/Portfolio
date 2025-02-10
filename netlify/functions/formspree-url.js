exports.handler = async function(event, context) {
    return {
        statusCode: 200,
        body: process.env.FORMSPREE_URL,
    };
};