module.exports = {
    preset: 'jest-puppeteer',
    //Будет смотреть только файлы с окончанием на  test.js в этой же папке
    testRegex: './*\\.test\\.js$',
    setupFilesAfterEnv: ['./setupTests.js']
};