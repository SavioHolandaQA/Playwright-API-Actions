const { test, expect } = require('@playwright/test');

test('Fluxo CRUD Completo de Reservas', async ({ request }) => {
  // 1️⃣ - Autenticação para obter token
  const authResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
    data: {
      username: "admin",
      password: "password123"
    }
  });
  
  expect(authResponse.status()).toBe(200);
  const { token } = await authResponse.json();
  console.log('🔑 Token obtido:', token);

  // 2️⃣ - Criar nova reserva
  const bookingData = {
    firstname: "Savio",
    lastname: "QA",
    totalprice: 222,
    depositpaid: true,
    bookingdates: {
      checkin: "2024-01-01",
      checkout: "2024-01-05"
    },
    additionalneeds: "Breakfast"
  };

  const createResponse = await request.post('https://restful-booker.herokuapp.com/booking', {
    data: bookingData,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  // Ajuste: API retorna 200 em vez de 201
  expect(createResponse.status()).toBe(200);
  const { bookingid: bookingId } = await createResponse.json();
  console.log('🆔 Reserva criada com ID:', bookingId);

  // 3️⃣ - Consultar reserva criada
  const getResponse = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`);
  
  expect(getResponse.status()).toBe(200);
  const bookingDetails = await getResponse.json();
  console.log('📋 Detalhes da reserva:', bookingDetails);
  expect(bookingDetails.firstname).toBe("Savio");

  // 4️⃣ - Atualizar reserva (PUT)
  const updatedData = {
    firstname: "Savio",
    lastname: "QA Atualizado",
    totalprice: 300,
    depositpaid: false,
    bookingdates: {
      checkin: "2024-01-01",
      checkout: "2024-01-10"
    },
    additionalneeds: "Dinner"
  };

  const updateResponse = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Cookie': `token=${token}`
    },
    data: updatedData
  });
  
  expect(updateResponse.status()).toBe(200);
  const updatedBooking = await updateResponse.json();
  console.log('🔄 Reserva atualizada:', updatedBooking);
  expect(updatedBooking.lastname).toBe("QA Atualizado");

  // 5️⃣ - Deletar reserva
  const deleteResponse = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `token=${token}`
    }
  });
  
  expect(deleteResponse.status()).toBe(201);
  console.log('🗑️ Reserva deletada com sucesso!');

  // Verificar se a reserva foi realmente deletada
  const verifyDeleteResponse = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`);
  expect(verifyDeleteResponse.status()).toBe(404);
});