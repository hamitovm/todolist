describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        //Ниже ссылка на компоненту из сторибука, открытая в отдельном окне через "Open canvas in new tab"
        await page.goto('http://localhost:9009/iframe.html?args=&id=additemform-component--base-example&viewMode=story')
        const image = await page.screenshot()

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot()
    })
})
//После запуска теста через yarn test:integration  в папке integration появится папка image snapshots,
//в котором зафиксируется снепшот как эталонный, если произвести изменения в компоненте снепшота, снова запустить тест,
// то при наличии разницы нового снепшота с эталонным, то появися папка diff output,
// в котором будет снепшот с разницей.

//Для работы снепшот теста, сам тест должен лежать в папке integration, в котором нужно создать файлы
// jest.config.js  и setupTests.js c соответствующим содержимым.

// Обновить эталонный снепшот: yarn run jest:integration --updateSnapshot