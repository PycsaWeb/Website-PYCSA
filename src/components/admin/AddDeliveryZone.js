import React, { useState } from 'react';
import { supabase } from '../../SupabaseClient';
import DeliveryZoneForm from './DeliveryZoneForm';

export default function AddDeliveryZone({ onDeliveryZoneAdded }) {
  const [loading, setLoading] = useState(false);

  const handleAddDeliveryZone = async (formData) => {
    setLoading(true);

    try {
      const zoneData = {
        province: formData.province,
        area: formData.area || null,
        cost: parseFloat(formData.cost),
        estimated_time: formData.estimated_time || null,
      };

      const { data, error: insertError } = await supabase
        .from('delivery_zones')
        .insert([zoneData])
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      console.log('Delivery Zone added:', data);
      if (onDeliveryZoneAdded) {
        onDeliveryZoneAdded(data);
      }
    } catch (err) {
      console.error('Error adding delivery zone:', err);
      throw new Error(`Error al agregar la zona: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-5">
        Agregar Nueva Zona de Entrega
      </h2>
      <DeliveryZoneForm
        onSubmit={handleAddDeliveryZone}
        isLoading={loading}
        submitButtonText="Agregar Zona"
      />
    </div>
  );
}
