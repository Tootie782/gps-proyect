import { SyncStatus } from './SyncStatus';

export function Topbar() {
  return (
    <header className="h-16 px-6 flex items-center justify-between bg-white border-b border-gray-200 shadow-sm">
      <h1 className="text-lg font-medium text-gray-800">Panel Principal</h1>
      <div className="flex items-center gap-6">
        <SyncStatus />
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Admin</span>
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    </header>
  );
}
