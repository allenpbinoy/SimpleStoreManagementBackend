import sinon from 'sinon';
import chai from 'chai';
import mongoose from 'mongoose'
import 'sinon-mongoose';

import ProductDetails from '../models/productDetails.js';

var expect = chai.expect;



describe("Get all products", function(){
    it("Should return all products",function(done){
        var productMock = sinon.mock(ProductDetails);
        var expectedResult = {status:true, pname:[]}
        productMock.expects('find').yields(null,expectedResult);
        ProductDetails.find(function (err, result) {
            productMock.verify();
            productMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });

    it("should return error", function(done){
        var productMock = sinon.mock(ProductDetails);
        var expectedResult = {status: false, error: "Something went wrong"};
        productMock.expects('find').yields(expectedResult, null);
        ProductDetails.find(function (err, result) {
            productMock.verify();
            productMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });



})