import request from 'supertest';
import { app } from '../index';
import mongoose from 'mongoose';
import User from '../models/userModel';

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/mydb');
});

afterAll(async () => {
  //await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

const endpoint = "/auth/"

describe('POST /register', () => {
  it('Deberia registrar un nuevo usuario', async () => {
    const response = await request(app)
      .post(endpoint + 'register')
      .send({ email: 'testuser@example.com', password: 'password123' });

    await User.deleteOne({ email: 'testuser@example.com' });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Usuario registrado satisfactoriamente');
  });

  it('Deberia retornar 400 si el usuario existe', async () => {
    await new User({ email: 'testuser@example.com', password: 'password123' }).save();

    const response = await request(app)
      .post(endpoint + 'register')
      .send({ email: 'testuser@example.com', password: 'newpassword' });

    await User.deleteOne({ email: 'testuser@example.com' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('El usuario ya existe');
  });

  it('Deberia retornar 500 si hay algun error', async () => {
    const mockError = jest.spyOn(User.prototype, 'save').mockImplementationOnce(() => {
      return Promise.reject(new Error('Database error'));
    });

    const response = await request(app)
      .post(endpoint + 'register')
      .send({ email: 'testuser@example1.com', password: 'password123' });

    expect(response.status).toBe(500);
    expect(response.body.error).toBeDefined();

    mockError.mockRestore();
  });
});

describe('POST /login', () => {
  it('Deberia iniciar sesion y retornar un token', async () => {
    const user = new User({ email: 'testuser@example.com', password: 'password123' });
    await user.save(); 

    const response = await request(app)
      .post(endpoint + 'login')
      .send({ email: 'testuser@example.com', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined(); 

    await User.deleteOne({ email: 'testuser@example.com' }); 
  });

  it('Deberia retornar 400 si la contraseña o el email son incorrectos', async () => {
    const response = await request(app)
      .post(endpoint + 'login')
      .send({ email: 'nonexistentuser@example.com', password: 'wrongpassword' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email o contraseña invalida');
  });
});

describe('POST /change-password', () => {
  it('should update the password successfully', async () => {
    const user = new User({ email: 'testuser@example.com', password: 'password123' });
    await user.save(); // Guardar usuario

    const response = await request(app)
      .post(endpoint + 'change-password')
      .send({ email: 'testuser@example.com', oldPassword: 'password123', newPassword: 'newpassword123' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Contraseña actualizada correctamente');

    // Verificar si la contraseña fue cambiada
    const updatedUser = await User.findOne({ email: 'testuser@example.com' });
    const isPasswordValid = await updatedUser?.comparePassword('newpassword123');
    expect(isPasswordValid).toBe(true);

    await User.deleteOne({ email: 'testuser@example.com' }); // Limpiar después del test
  });

  it('should return 400 if the old password is invalid', async () => {
    const user = new User({ email: 'testuser@example.com', password: 'password123' });
    await user.save(); // Guardar usuario

    const response = await request(app)
      .post(endpoint + 'change-password')
      .send({ email: 'testuser@example.com', oldPassword: 'wrongpassword', newPassword: 'newpassword123' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Credenciales invalidas');

    await User.deleteOne({ email: 'testuser@example.com' }); // Limpiar después del test
  });
});
