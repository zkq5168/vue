module.exports = {
    lintOnSave: false,
    devServer: {
        port: 8001,
        proxy: {
            '^/apis': {
                target: 'http://localhost:8080/',
                pathRewrite: {
                    '^/apis': '/'
                }
            }
        }
    }
}