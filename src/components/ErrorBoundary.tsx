import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props { children: React.ReactNode; }
interface State { error: Error | null; }

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error) { return { error }; }

  render() {
    if (this.state.error) {
      return (
        <div className="flex items-center justify-center h-full min-h-[400px] p-8">
          <div className="bg-white border border-red-200 rounded-2xl p-8 max-w-lg shadow-lg text-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-sm text-gray-500 mb-2 font-mono bg-red-50 p-3 rounded-lg text-left overflow-auto max-h-32">{this.state.error.message}</p>
            <button onClick={() => { this.setState({ error: null }); window.location.reload(); }}
              className="inline-flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-lg font-bold hover:bg-accent-dark transition-all mt-4">
              <RefreshCw className="w-4 h-4" /> Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
