import React from 'react';

interface ComplexityData {
  approach: string;
  time: string;
  space: string;
}

interface ComplexityTableProps {
  data: ComplexityData[];
  className?: string; // Add className prop
}

export const ComplexityTable: React.FC<ComplexityTableProps> = ({ data, className }) => {
  return (
    <div className={`w-full ${className}`}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Approach</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Time</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Space</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b border-white/10 hover:bg-white/5">
              <td className="px-4 py-3 text-sm text-gray-200">{row.approach}</td>
              <td className="px-4 py-3 text-sm font-mono text-primary">{row.time}</td>
              <td className="px-4 py-3 text-sm font-mono text-secondary">{row.space}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};