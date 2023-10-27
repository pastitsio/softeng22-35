process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


let chai = require('chai');
let chaiHttp = require('chai-http');

chai.use(chaiHttp)
const expect = chai.expect

describe("/admin/healthcheck", () => {
  it("perform a system healthcheck (end-to-end connectivity with database)", (done) => {
    chai.request("https://localhost:4000")
      .get('/admin/healthcheck')
      // .set('x-observatory-auth', token)
      .end((err, res) => {
        console.log(res.body)
        expect(res).to.have.status(200);
        expect(res.body).to.eql({
          status: 'OK',
          dbconnection: 'Database connected and ready to use.'
        });
        done();
      });
  });
});