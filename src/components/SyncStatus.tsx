export function SyncStatus() {
  const isSynced = true; // Cambiar a false para simular desconexión
  const lastSync = '21 jun 2025 14:43';

  return (
    <div className="text-sm font-medium text-gray-500">
      {isSynced ? (
        <span className="text-green-600">🟢 Última sincronización: hace 2 minutos</span>
      ) : (
        <span className="text-red-500">🔴 Sin conexión — Última sync: {lastSync}</span>
      )}
    </div>
  );
}
