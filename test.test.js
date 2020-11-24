const app = require('./server')


app.listen(3000)

const supertest = require('supertest')
const request = supertest(app)

//USERS
it('gets the test endpoint', async done => {
    const response = await request.get('/user')

    expect(response.status).toBe(200)
    done()
})

it('POST the test endpoint', async done => {
    const response = await request.post('/user').send({ email: 'anthonymmarinbolivar@gmail.com', role:'0' })

    expect(response.status).toBe(200)
    done()
})

it('PUT the test endpoint', async done => {
    const response = await request.put('/user').send({ email: 'anthonymmarinbolivar@gmail.com', role: '1' })

    expect(response.status).toBe(200)
    done()
})

it('Delete the test endpoint', async done => {
    const response = await request.delete('/user').send({ email: 'anthonymmarinbolivar@gmail.com' })

    expect(response.status).toBe(200)
    done()
})
//Inventario

it('gets the test endpoint', async done => {
    const response = await request.get('/inventario')

    expect(response.status).toBe(200)
    done()
})


it('POST the test endpoint', async done => {
    const response = await request.post('/inventario').send({ id: "1", raza: "negro", edad: "12", numero: "12", apartado: "1-1", url: "url.com", estado: "en_finca"})

    expect(response.status).toBe(200)
    done()
})

it('PUT the test endpoint', async done => {
    const response = await request.put('/inventario').send({ id: "1", raza: "negro", edad: "12", numero: "12", apartado: "1-1", url: "url.com", estado: "en_finca"  })

    expect(response.status).toBe(200)
    done()
})

it('Delete the test endpoint', async done => {
    const response = await request.delete('/inventario').send({ id: '1' })

    expect(response.status).toBe(200)
    done()
})

//Apartado
it('gets the test endpoint', async done => {
    const response = await request.get('/apartado')

    expect(response.status).toBe(200)
    done()
})


it('POST the test endpoint', async done => {
    const response = await request.post('/apartado').send({ id: "1", nombre: "apartado 1", mt2: "54" })

    expect(response.status).toBe(200)
    done()
})

it('PUT the test endpoint', async done => {
    const response = await request.put('/apartado').send({ id: "1", nombre: "nombre", mt2: "54" })

    expect(response.status).toBe(200)
    done()
})

it('Delete the test endpoint', async done => {
    const response = await request.delete('/apartado').send({ id: '1' })

    expect(response.status).toBe(200)
    done()
})
