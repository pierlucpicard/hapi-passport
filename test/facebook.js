"use strict";

var facebook = require("passport-facebook"),
    Lab = require("Lab"),
    test = Lab.test,
    nodemock = require("nodemock"),
    expect = Lab.expect;

Lab.experiment("Making sure that the passport-facebook works as expected", function () {
    test("regular auth?", function (done) {
        var redirectMock = nodemock.mock("redirect").takes("https://www.facebook.com/dialog/oauth?response_type=code&redirect_uri=&client_id=myClientId"),
            facebookImpl = new facebook({
                clientID: "myClientId",
                clientSecret: "myClientSecret"
            }, "http://callback");

        facebookImpl.redirect = redirectMock.redirect;
        facebookImpl.authenticate({}, {});
        redirectMock.assert();
        done();
    });
});