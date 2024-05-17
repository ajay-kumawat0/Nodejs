const app = require('./app');
const supertest = require('supertest');

it('show error when author name is not passes in query', async () => {
    const response = await supertest(app).get('/getAuthorName');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
})

it('show the quotes when search a Mahatama Gandhi', async () => {
    const response = await supertest(app).get('/getAuthorName').query({
        author : 'Mahatama Gandhi'
    })
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
})