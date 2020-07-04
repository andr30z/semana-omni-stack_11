const generate = require('../../src/utils/generateUniqueID')
describe('Generate Unique ID',()=>{
 it('DEVE GERAR UM ID UNICO',()=>{
   const id = generate.generateUniqueID();
   expect(id).toHaveLength(8)
 })
});