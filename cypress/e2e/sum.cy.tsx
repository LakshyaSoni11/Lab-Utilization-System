import {sum} from "../../src/sum";

describe("sum checking" ,()=>{
    it("adds two numbers correctly",()=>{
        expect(sum(1,2)).to.equal(3)
        expect(sum(-1,1)).to.equal(0)
    })
    it("handles negative numbers" ,()=>{
        it("negative numbers sum",()=>{
            expect(sum(-1,1)).to.equal(0)
        })
    })
})