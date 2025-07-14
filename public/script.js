document.getElementById('emailForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const to = document.getElementById('to').value;
  const subject = document.getElementById('subject').value;

  const response = await fetch('/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, to, subject })
  });

  const resultDiv = document.getElementById('result');
  if (response.ok) {
    resultDiv.innerText = "✅ Correo enviado correctamente.";
    resultDiv.style.color = 'green';

    // 🧼 Limpiar formulario
    document.getElementById('emailForm').reset();
  } else {
    resultDiv.innerText = "❌ Error al enviar el correo.";
    resultDiv.style.color = 'red';
  }
});

