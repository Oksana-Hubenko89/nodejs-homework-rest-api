const guard=require('../helper/guard')
const { HttpCode } = require('../helper/constants')
const {User} =require('../model/__mocks__/data')

const passport = require('passport')


describe('Unit test: helper/guard', ()=>{
    const req ={
        get:jest.fn((header)=>`Bearer ${User.token}`),
        user:User}
    const res={
    status: jest.fn().mockReturnThis(),
    json: jest.fn((response)=>response),
    }
    passport.use=jest.fn()
    const next=jest.fn()
    //const token=null
    test ('run function without token',()=>{
        passport.authenticate = jest.fn(
            (authType, options, callback) => (req, res, next) => {
              callback(null, false)
            },
          )
          guard(req, res, next)
          expect(req.get).toHaveBeenCalled()
          expect(res.status).toHaveBeenCalled()
          expect(res.json).toHaveBeenCalled()
          expect(res.json).toHaveReturnedWith({
            status: 'error',
            code: HttpCode.UNAUTHORIZED,
            message: 'Not authorized',
          })
    })

    test ('run function with rigt token',()=>{
        passport.authenticate=jest.fn((authType,options,callback)=>()=>{
            callback(null,User)
        })
        guard(req,res,next),
        expect(next).toHaveBeenCalled()
    })

    test ('run function with wrong token',()=>{
        passport.authenticate = jest.fn(
            (authType, options, callback) => (req, res, next) => {
              callback(null, {token:null})
            },
          )
        guard(req, res, next)
        expect(req.get).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
        expect(res.json).toHaveReturnedWith({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Not authorized',
      })
    
    })
    })