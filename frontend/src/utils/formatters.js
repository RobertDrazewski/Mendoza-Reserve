export const translateStatus = (status) => {
    const statuses = {
        'Pendiente': 'Pending',
        'Preparado': 'Prepared',
        'Enviado': 'Shipped'
    };
    return statuses[status] || status;
};

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
    }).format(amount);
};