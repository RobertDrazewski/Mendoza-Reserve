import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // Importante para saber quién compra
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CartPage = () => {
  const { cart, clearCart, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Calcular el total con dos decimales
  const total = cart.reduce((acc, item) => acc + (parseFloat(item.precio) || 0), 0);

  const finalizarCompra = async () => {
    // 1. Verificación de Seguridad
    if (!user) {
      alert('Debes iniciar sesión para finalizar la compra');
      navigate('/login');
      return;
    }

    if (cart.length === 0) return;

    try {
      // 2. Enviar la orden al backend incluyendo el ID del usuario
      await axios.post('http://localhost:5000/api/orders', {
        usuario_id: user.id, // Vinculamos la orden al usuario
        productos: cart,
        total: total,
        fecha: new Date().toISOString().slice(0, 19).replace('T', ' ') // Formato MySQL
      });
      
      alert('¡Orden de compra generada con éxito! La bodega Mendoza Reserve ha recibido tu pedido.');
      clearCart(); 
      navigate('/'); // Redirigir al inicio tras el éxito
    } catch (error) {
      console.error("Error al generar la orden", error);
      alert('Hubo un problema al procesar tu orden. Por favor, intenta más tarde.');
    }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '900px', margin: 'auto', minHeight: '70vh' }}>
      <h2 style={{ color: '#722f37', borderBottom: '2px solid #722f37', paddingBottom: '10px' }}>
        🍷 Resumen de tu Pedido
      </h2>

      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <p style={{ fontSize: '18px' }}>Tu carrito está vacío.</p>
          <button onClick={() => navigate('/catalogo')} style={secondaryButtonStyle}>
            Ver Catálogo
          </button>
        </div>
      ) : (
        <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cart.map((item, index) => (
              <li key={index} style={listItemStyle}>
                <div>
                  <strong style={{ fontSize: '16px' }}>{item.nombre}</strong>
                  <br />
                  <small style={{ color: '#666' }}>{item.cepa}</small>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <span style={{ fontWeight: 'bold' }}>${parseFloat(item.precio).toLocaleString('es-AR')}</span>
                  <button 
                    onClick={() => removeFromCart(index)} 
                    style={{ color: '#dc3545', border: '1px solid #dc3545', background: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: '30px', borderTop: '2px solid #ddd', paddingTop: '20px', textAlign: 'right' }}>
            <h3 style={{ margin: '0 0 20px 0' }}>Total a Pagar: <span style={{ color: '#722f37' }}>${total.toLocaleString('es-AR')}</span></h3>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={clearCart} style={{ ...secondaryButtonStyle, backgroundColor: '#6c757d' }}>
                Vaciar Carrito
              </button>
              <button onClick={finalizarCompra} style={primaryButtonStyle}>
                Confirmar Orden de Compra
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Estilos rápidos en objetos
const listItemStyle = {
  borderBottom: '1px solid #eee',
  padding: '15px 0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const primaryButtonStyle = {
  backgroundColor: '#722f37',
  color: 'white',
  padding: '12px 25px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '16px'
};

const secondaryButtonStyle = {
  backgroundColor: '#722f37',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

export default CartPage;