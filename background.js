const queryTabs = () => {

    console.log('Querying tabs');
    /**
     * Query open tabs and save to a JSON file
     */

    chrome.tabs.query({}, (tabs) => {
        console.log('tabs: ', tabs);

        const openTabs = tabs.map((tab) => ({
            title: tab.title,
            url: tab.url,
            private: tab.incognito
        }));

        const privateTabs = tabs.filter((tab) => {
            // if (tab.incognito) {
            //     return {
            //         title: tab.title,
            //         url: tab.url,
            //         incognito: tab.incognito
            //     }
            // }
            return tab.incognito;
        });

        console.log('Private: ', privateTabs);
        console.log('Open Tabs: ', openTabs);

        return chrome.tabs.executeScript({
            code: `
                var tabsInfo = ${JSON.stringify(openTabs)};
                var date = new Date();
                var fullDate = date.toDateString().split(' ').join('-');

                function saveText(text, filename) {
                    var a = document.createElement('a');
                    a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));
                    a.setAttribute('download', filename);
                    a.click();
                }
                saveText(JSON.stringify(tabsInfo, null, 2), 'tabs-' + fullDate + '.json');
            `,
        });
    });
}

/** Called when user clicks on the browser action */
chrome.browserAction.onClicked.addListener((tab) => {
    /** No tabs or host permissions needed! */

    // chrome.bookmarks.getTree((myBookmarks) => {
    //     console.log(myBookmarks);
    // });

    // chrome.bookmarks.getTree(scanBookmarks);


    console.log(tab);

    queryTabs();


    /**
     * Query open tabs and save to a JSON file
     */

    // chrome.tabs.query({}, (tabs) => {
    //     console.log('tabs: ', tabs);

    //     const openTabs = tabs.map((tab) => ({
    //         title: tab.title,
    //         url: tab.url,
    //         private: tab.incognito
    //     }));

    //     const privateTabs = tabs.filter((tab) => {
    //         // if (tab.incognito) {
    //         //     return {
    //         //         title: tab.title,
    //         //         url: tab.url,
    //         //         incognito: tab.incognito
    //         //     }
    //         // }
    //         return tab.incognito;
    //     });

    //     console.log('Private: ', privateTabs);
    //     console.log('Open Tabs: ', openTabs);

    //     chrome.tabs.executeScript({
    //         code: `
    //             var tabsInfo = ${JSON.stringify(openTabs)};
    //             var date = new Date();
    //             var fullDate = date.toDateString().split(' ').join('-');

    //             function saveText(text, filename) {
    //                 var a = document.createElement('a');
    //                 a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));
    //                 a.setAttribute('download', filename);
    //                 a.click();
    //             }
    //             saveText(JSON.stringify(tabsInfo, null, 2), 'tabs-' + fullDate + '.json');
    //         `,
    //     });
    // });

    // if (tab.url.search('chrome://')) {
    //     // window.alert('please try another page!');
    //     chrome.browserAction.setPopup({
    //         popup: "popup-error.html"
    //     })
    // }

});