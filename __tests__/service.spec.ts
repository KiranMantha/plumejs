// import { Component, Service, html, getService } from '../index';
describe("Plumejs Service", () => {
  it('should work', () => {

  })
})
// describe("Plumejs Service", () => {
//   let service1:any,service2:any;
//   beforeAll(()=>{
//     @Service({
//       name:"testservice"
//     })
//     class testservice {
//       greet(){
//         return 'hello';
//       }
//     }
//     service1 = getService('testservice');
//   });
//   it('sample factory test', () => {
//     expect(service1.greet()).toBe('hello');
//   });
//   describe('testing service dependency', () => {
//     beforeAll(()=>{
//       @Service({
//         name: 'testservice1',
//         providers: ['testservice']
//       })
//       class testservice1 {
//         constructor(private ts:any){}
//         greet(){
//           return this.ts.greet();
//         }
//       }
//       service2 = getService('testservice1');
//     });
//     it('should return hello from testservice', () => {
//       expect(service2.greet()).toBe('hello');
//     });
//   })
// });