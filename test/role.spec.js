const role=require('../helper/role')
const { HttpCode, Subscription } = require('../helper/constants')
const {User} =require('../model/__mocks__/data')
describe('Unit test: helper/role', ()=>{
    const req ={user:User}
    const res={
    status: jest.fn().mockReturnThis(),
    json: jest.fn((response)=>response),
    }
    const next=jest.fn()

    test ('run function with rigt role',()=>{
        role(Subscription.PRO)(req,res,next)
        expect(next).toHaveBeenCalled()
    })
    test ('run function with wrong role',()=>{
       const result= role(Subscription.BUSINESS)(req,res,next)
    expect(result.status).toEqual('error')
    expect(result.code).toEqual(HttpCode.FORBIDDEN)
    expect(result.message).toEqual('Access is denied')
    })
})