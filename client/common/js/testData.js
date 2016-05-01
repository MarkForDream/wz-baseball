var MOCKED_SERVER = {
    takeRequest: function(url) {

        var dataFromMockedServer;

        switch (url) {
            case '/api/frontend/getOrderSteps':
                dataFromMockedServer = {
                    status: "ok",
                    result: {
                        orderSteps: {
                            stepOne: {

                                stepDescription: "皮革等級",

                                leatherType: [{
                                    leatherId: "1",
                                    title: "美國嚴選牛革",
                                    img: "base64",
                                    description: "好牛革",
                                    colors: [{
                                        id: "1",
                                        colorTitle: "藍色",
                                        colorCode: "#4f4f4f"
                                    }]

                                }, {

                                    leatherId: "2",
                                    title: "高級美國小牛革",
                                    img: "base64",
                                    description: "好牛革",
                                    colors: [{
                                        id: "2",
                                        colorTitle: "紅色",
                                        colorCode: "#DE7856"
                                    }]

                                }, ]
                            },

                            stepTwo: {

                                stepDescription: "布標選擇",

                                logoType: [{
                                    logoId: "1",
                                    title: "金大標",
                                    img: "Base64",
                                    description: "日製頂級小牛革限定"

                                }, {
                                    logoId: "2",
                                    title: "金銀大標",
                                    img: "Base64",
                                    description: "日製頂級小牛革限定"

                                }]
                            },

                            stepThree: {

                                stepDescription: "基本型選擇",

                                handersType: [{
                                    handerId: "1",
                                    title: "右投用",
                                    img: "Base64",
                                    description: "右投用"

                                }, {
                                    handerId: "2",
                                    title: "左投用",
                                    img: "Base64",
                                    description: "左投用"

                                }],

                                sportsType: [{
                                    sportId: "1",
                                    title: "棒球用",
                                    description: "棒球用"

                                }, {
                                    sportId: "2",
                                    title: "壘球用",
                                    description: "壘球用"

                                }],
                            },

                            stepSix: {

                                stepDescription: "滾邊顏色",

                                bindColors: [{
                                    bindColorId: "1",
                                    colorTitle: "紅色",
                                    colorCode: "#DE7856"
                                }]

                            },

                            stepSeven: {

                                stepDescription: "帶皮顏色",

                                regularLaceColors: [{
                                    regularLaceColorId: "1",
                                    colorTitle: "紅色",
                                    colorCode: "#DE7856"
                                }],

                                whiteLaceColors: [{
                                    whiteLaceColorId: "2",
                                    colorTitle: "紅色",
                                    colorCode: "#DE7856"
                                }],


                            },

                            stepEight: {

                                stepDescription: "車縫顏色",

                                stitchingColors: [{
                                    stitchingColorId: "1",
                                    colorTitle: "紅色",
                                    colorCode: "#DE7856"
                                }]

                            },

                            stepNine: {

                                stepDescription: "夾條顏色",

                                smoothStitchingColors: [{
                                    smoothStitchingColorId: "1",
                                    colorTitle: "紅色",
                                    colorCode: "#DE7856"
                                }],

                                secondStitchingColors: [{
                                    secondStitchingColorId: "2",
                                    colorTitle: "紅色",
                                    colorCode: "#DE7856"
                                }],


                            },

                            stepTen: {

                                stepDescription: "食指部分",

                                fingerType: [{
                                    fingerId: "1",
                                    title: "護指墊",
                                    img: "Base64",
                                    description: "護指墊"
                                }, {
                                    fingerId: "2",
                                    title: "護指套",
                                    img: "Base64",
                                    description: "護指套"
                                }]
                            },

                            stepEleven: {

                                stepDescription: "內裡選擇",

                                hideLiningColors: [{
                                    hideLiningColorId: "牛革內裡",
                                    colorTitle: "紅色",
                                    colorCode: "#DE7856"
                                }],

                                deerLiningColors: [{
                                    deerLiningColorId: "鹿革內裡",
                                    colorTitle: "紅色",
                                    colorCode: "#DE7856"
                                }],


                            },

                            stepTweleve: {

                                stepDescription: "掌心厚薄選擇",

                                palmPaddingType: [{
                                    palmPaddingId: "1",
                                    title: "削薄",
                                    description: "削薄"
                                }, {
                                    palmPaddingId: "2",
                                    title: "一般",
                                    description: "一般"
                                }]
                            },

                            stepThirteen: {

                                stepDescription: "特殊要求",

                                specialRequirements: [{
                                    requirementId: "1",
                                    title: "大小指加硬",
                                    img: "Base64",
                                    description: "大小指加硬"
                                }, {
                                    requirementId: "2",
                                    title: "重量減輕",
                                    img: "Base64",
                                    description: "重量減輕"
                                }]
                            },

                            stepFourteen: {

                                stepDescription: "球檔選擇",

                                webStyles: [{
                                    webStyletId: "1",
                                    title: "A",
                                    img: "Base64",
                                    description: "A"
                                }, {
                                    webStyletId: "2",
                                    title: "B",
                                    img: "Base64",
                                    description: "B"
                                }]
                            },

                            stepFifteen: {

                                stepDescription: "刺繡內容"

                            },

                            stepSixteen: {

                                stepDescription: "收件人資訊"

                            },

                        }
                    }
                };
                break;

        }

        return dataFromMockedServer;
    }
};
