describe("ng-device-detector", function () {
    var deviceDetector;

    function loadDetector(userAgent) {
        module("ng.deviceDetector");
        inject(["$window", function ($window) {
            var __originalNavigator = $window.navigator;
            $window.navigator = {};
            $window.navigator.__proto__ = __originalNavigator;
            $window.navigator.__defineGetter__('userAgent', function () { return userAgent; });
        }]);
        inject(["deviceDetector", function (deviceDetectorI) {
            deviceDetector = deviceDetectorI;
        }]);
    }

    it("should load", function () {
        loadDetector("");
        expect(deviceDetector).not.toBeNull();
    });

    describe("with empty user-agent", function () {
        beforeEach(function () {
            loadDetector("");
        });

        it("should read empty", function () {
            expect(deviceDetector.raw.userAgent).toBe("");
        });
    });

    describe("with dummy user-agent", function () {
        beforeEach(function () {
            loadDetector("dummy");
        });

        it("should read dummy", function () {
            expect(deviceDetector.raw.userAgent).toBe("dummy");
        });
    });

    describe("with user-agent", function () {

        function describeUserAgent(userAgent,os,browser,device) {
            describe(userAgent, function () {
                beforeEach(function () {
                    loadDetector(userAgent);
                });

                it("should detect os = "+os, function () {
                    expect(deviceDetector.os).toBe(os);
                });
                it("should detect browser = "+browser, function () {
                    expect(deviceDetector.browser).toBe(browser);
                });
                it("should detect device = "+device, function () {
                    expect(deviceDetector.device).toBe(device);
                });
            });
        }

        // Chrome
        describeUserAgent("Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
            "windows","chrome","unknown");

        describeUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1664.3 Safari/537.36",
            "mac","chrome","unknown");

        describeUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.21 (KHTML, like Gecko) Chrome/19.0.1042.0 Safari/535.21",
            "linux","chrome","unknown");


        // Firefox
        describeUserAgent("Mozilla/5.0 (Windows NT 5.1; rv:31.0) Gecko/20100101 Firefox/31.0",
            "windows","firefox","unknown");

        describeUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:25.0) Gecko/20100101 Firefox/25.0",
            "mac","firefox","unknown");

        describeUserAgent("Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0",
            "linux","firefox","unknown");

        // Safari
        describeUserAgent("Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25",
            "ios","safari","ipad");

        describeUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.13+ (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2",
            "mac","safari","unknown");

        describeUserAgent("Mozilla/5.0 (X11; U; Linux x86_64; en-us) AppleWebKit/531.2+ (KHTML, like Gecko) Version/5.0 Safari/531.2+",
            "linux","safari","unknown");


        // Issue #10
        describeUserAgent("Mozilla/5.0 (iPad; CPU OS 8_0_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) CriOS/38.0.2125.59 Mobile/12A405 Safari/600.1.4 (000767)",
            "ios","chrome","ipad");

    });
});
