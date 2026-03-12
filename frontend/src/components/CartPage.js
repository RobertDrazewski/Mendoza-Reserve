import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CartPage = () => {
  const { cart, clearCart, removeFromCart } = useCart();
  const { user } = useAuth();
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + (parseFloat(item.precio) || 0), 0);

  const t = {
    title: lang === 'es' ? '🍷 Resumen de tu Pedido' : '🍷 Order Summary',
    empty: lang === 'es' ? 'Tu carrito está vacío.' : 'Your cart is empty.',
    viewCatalog: lang === 'es' ? 'Ver Catálogo' : 'View Catalog',
    delete: lang === 'es' ? 'Eliminar' : 'Remove',
    totalText: lang === 'es' ? 'Total a Pagar:' : 'Total:',
    clear: lang === 'es' ? 'Vaciar Carrito' : 'Clear Cart',
    confirm: lang === 'es' ? 'Confirmar Orden de Compra' : 'Confirm Order',
    success: lang === 'es' ? '¡Orden generada con éxito!' : 'Order generated successfully!'
  };

  const finalizarCompra = async () => {
    if (!user) {
      alert(lang === 'es' ? 'Debes iniciar sesión' : 'Please login');
      navigate('/login');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/orders', {
        usuario_id: user.id,
        productos: cart,
        total: total,
        fecha: new Date().toISOString().slice(0, 19).replace('T', ' ')
      });
      alert(t.success);
      clearCart();
      navigate('/');
    } catch (error) {
      console.error("Error", error);
      alert('Error.');
    }
  };

  return (
    <div className="page-container cart-page">
      <h2 className="section-title">{t.title}</h2>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <p>{t.empty}</p>
          <button onClick={() => navigate('/catalogo')} className="btn-primary">{t.viewCatalog}</button>
        </div>
      ) : (
        <div className="cart-content">
          <ul className="cart-list">
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <div>
                  <strong>{item.nombre}</strong><br />
                  <small>{item.cepa}</small>
                </div>
                <div className="item-actions">
                  <span className="price">${parseFloat(item.precio).toLocaleString('es-AR')}</span>
                  <button onClick={() => removeFromCart(index)} className="btn-delete">{t.delete}</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-footer">
            <h3>{t.totalText} <span>${total.toLocaleString('es-AR')}</span></h3>
            <div className="footer-actions">
              <button onClick={clearCart} className="btn-secondary">{t.clear}</button>
              <button onClick={finalizarCompra} className="btn-primary">{t.confirm}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;