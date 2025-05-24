//src/supabaseUtils.js
import { supabase } from './SupabaseClient';

const STORAGE_BUCKET = 'pycsa-image';

/**
 * Sube un archivo de imagen a Supabase Storage.
 * @param {File} file - El archivo a subir.
 * @returns {Promise<string>} - La URL pública de la imagen subida.
 * @throws {Error} - Si ocurre un error durante la subida.
 */
export const uploadImage = async (file) => {
  if (!file) return null;

  try {
    const fileExt = file.name.split('.').pop();
    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const fileName = `${uniqueId}.${fileExt}`;

    const filePath = `public/${fileName}`;

    console.log(`📤 Subiendo archivo a: ${filePath}`);

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('❌ Error al subir la imagen:', uploadError);
      throw new Error(`Error al subir la imagen: ${uploadError.message}`);
    }

    console.log('✅ Archivo subido:', uploadData?.path);

    const { data: publicUrlData, error: publicUrlError } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(filePath);

    if (publicUrlError || !publicUrlData?.publicUrl) {
      console.error('❌ Error al obtener la URL pública:', publicUrlError);
      throw new Error('No se pudo obtener la URL pública de la imagen.');
    }

    console.log('🌎 URL pública obtenida:', publicUrlData.publicUrl);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('❌ Error en uploadImage:', error);
    throw error;
  }
};

/**
 * Borra una imagen de Supabase Storage usando su URL pública.
 * @param {string} imageUrl - La URL pública de la imagen a borrar.
 * @returns {Promise<void>}
 * @throws {Error} - Si ocurre un error durante el borrado.
 */
export const deleteImage = async (imageUrl) => {
  if (!imageUrl) return;

  try {
    const parsedUrl = new URL(imageUrl);
    const pathSegments = parsedUrl.pathname.split('/');
    const bucketIndex = pathSegments.indexOf(STORAGE_BUCKET);

    if (bucketIndex === -1) {
      console.warn('⚠️ No se pudo encontrar el bucket en la URL:', imageUrl);
      return;
    }

    const filePath = pathSegments.slice(bucketIndex + 1).join('/');

    if (!filePath.startsWith('public/')) {
      console.warn('⚠️ FilePath inválido extraído:', filePath);
      return;
    }

    console.log(`🗑️ Intentando borrar archivo: ${filePath}`);

    const { error: deleteError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([filePath]);

    if (deleteError) {
      if (deleteError.message !== 'The resource was not found') {
        console.error('❌ Error al borrar la imagen:', deleteError);
        throw new Error(`Error al borrar la imagen: ${deleteError.message}`);
      } else {
        console.log('ℹ️ El archivo ya no existía en Storage:', filePath);
      }
    } else {
      console.log('✅ Imagen borrada exitosamente:', filePath);
    }
  } catch (error) {
    console.error('❌ Error procesando la URL para borrar imagen:', error);
    throw error;
  }
};
