// src/components/ui/ComplexityTable.tsx
interface ComplexityData {
  approach: string;
  time: string;
  space: string;
}

interface ComplexityTableProps {
  data: ComplexityData[];
}

export const ComplexityTable: React.FC<ComplexityTableProps> = ({ data }) => (
  <div className="w-full overflow-x-auto">
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-white/20">
          <th className="px-4 py-3 text-left text-primary font-semibold">Approach</th>
          <th className="px-4 py-3 text-left text-primary font-semibold">Time</th>
          <th className="px-4 py-3 text-left text-primary font-semibold">Space</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-b border-white/10 hover:bg-white/5 transition-colors">
            <td className="px-4 py-3 font-mono text-sm">{row.approach}</td>
            <td className="px-4 py-3 font-mono text-secondary">{row.time}</td>
            <td className="px-4 py-3 font-mono text-accent">{row.space}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);